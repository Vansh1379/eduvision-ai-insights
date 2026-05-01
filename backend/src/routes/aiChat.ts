import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

const router = Router();

// Get or create chat session
router.get("/session", async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { role } = req.query; // 'STUDENT_MENTOR' or 'TEACHER_COACH'

    let chat = await prisma.aIChat.findFirst({
      where: {
        userId,
        role: role as any,
      },
      orderBy: { updatedAt: "desc" },
    });

    if (!chat) {
      chat = await prisma.aIChat.create({
        data: {
          userId,
          role: (role as any) || "STUDENT_MENTOR",
          messages: [],
        },
      });
    }

    res.json({ chat });
  } catch (error) {
    console.error("Error fetching chat session:", error);
    throw new AppError("Failed to fetch chat session", 500);
  }
});

// Add message to chat
router.post("/session/:chatId/message", async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { chatId } = req.params;
    const { role, content, context } = req.body;

    const chat = await prisma.aIChat.findUnique({
      where: { id: chatId },
    });

    if (!chat || chat.userId !== userId) {
      throw new AppError("Chat session not found", 404);
    }

    const messages = chat.messages as any[];
    const newMessage = {
      role,
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];

    const updatedChat = await prisma.aIChat.update({
      where: { id: chatId },
      data: {
        messages: updatedMessages,
        context: context ? JSON.parse(context) : chat.context,
      },
    });

    res.json({ chat: updatedChat, message: newMessage });
  } catch (error) {
    console.error("Error adding message:", error);
    throw new AppError("Failed to add message", 500);
  }
});

// Get chat history
router.get("/session/:chatId", async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { chatId } = req.params;

    const chat = await prisma.aIChat.findUnique({
      where: { id: chatId },
    });

    if (!chat || chat.userId !== userId) {
      throw new AppError("Chat session not found", 404);
    }

    res.json({ chat });
  } catch (error) {
    console.error("Error fetching chat:", error);
    throw new AppError("Failed to fetch chat", 500);
  }
});

// Proxy for Gemini API (to keep API key secure)
router.post("/gemini", async (req: Request, res: Response) => {
  try {
    const { contents } = req.body;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    if (!geminiApiKey) {
      throw new AppError("Gemini API key not configured", 500);
    }

    const model = "gemini-2.5-flash";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiApiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contents }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new AppError(`Gemini API error: ${error}`, response.status);
    }

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "I couldn't generate a response. Please try again.";

    res.json({ text, data });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new AppError("Failed to generate AI response", 500);
  }
});

export default router;
