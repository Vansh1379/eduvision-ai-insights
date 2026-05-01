import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import { AppError } from "../middleware/errorHandler";

const router = Router();

const includesAny = (text: string, keywords: string[]) =>
  keywords.some((keyword) => text.includes(keyword));

const getRuleBasedAiResponse = (prompt: string) => {
  const text = prompt.toLowerCase();

  if (includesAny(text, ["teacher", "class", "student", "engagement"])) {
    return [
      "Based on the current class analytics, focus on one measurable classroom change this week.",
      "",
      "1. Use a short diagnostic quiz to identify the weakest concept.",
      "2. Pair high-progress students with peers for one guided activity.",
      "3. End the session with a one-question exit ticket and review the pattern before the next class.",
      "",
      "This keeps the AI coaching flow active while using deterministic demo insights.",
    ].join("\n");
  }

  if (includesAny(text, ["college", "infrastructure", "faculty", "accreditation"])) {
    return [
      "The institutional review indicates strong overall readiness with a few improvement priorities.",
      "",
      "1. Keep accreditation files centralized and current.",
      "2. Document faculty development outcomes by department.",
      "3. Add infrastructure maintenance evidence to the final quality report.",
      "",
      "Recommended next step: prepare a concise evidence checklist before the formal evaluation.",
    ].join("\n");
  }

  if (includesAny(text, ["deadline", "study", "assignment", "exam", "attendance"])) {
    return [
      "Your learning plan should prioritize the nearest deadline and the lowest-confidence topic.",
      "",
      "1. Complete the highest-impact assignment first.",
      "2. Use two 30-minute active-recall sessions for weak concepts.",
      "3. Keep attendance consistent so class explanations reinforce revision.",
      "",
      "Next step: block one focused study session today and one review session tomorrow.",
    ].join("\n");
  }

  return [
    "EduVision has generated a demo insight from the available academic context.",
    "",
    "1. Review the most urgent metric or deadline first.",
    "2. Choose one concrete action that can be completed today.",
    "3. Recheck progress after the next class or submission.",
    "",
    "This is a rule-based response used for the project demo flow.",
  ].join("\n");
};

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

// Demo AI response endpoint. It keeps the AI wrapper flow without external API calls.
router.post("/gemini", async (req: Request, res: Response) => {
  try {
    const { contents } = req.body;
    const prompt = Array.isArray(contents)
      ? contents
          .flatMap((item: any) => item?.parts || [])
          .map((part: any) => part?.text || "")
          .join("\n")
      : "";

    res.json({
      text: getRuleBasedAiResponse(prompt),
      data: {
        provider: "eduvision-demo-rules",
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error generating demo AI response:", error);
    throw new AppError("Failed to generate demo AI response", 500);
  }
});

export default router;
