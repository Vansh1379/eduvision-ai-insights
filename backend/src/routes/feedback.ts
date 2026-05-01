import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Create feedback (teacher to student)
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { studentId, courseId, content, type } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const feedback = await prisma.feedback.create({
      data: {
        teacherId: teacher.id,
        studentId,
        courseId,
        content,
        type: type || 'GENERAL',
      },
    });

    res.status(201).json({ feedback });
  } catch (error) {
    console.error('Error creating feedback:', error);
    throw new AppError('Failed to create feedback', 500);
  }
});

// Get feedback for a student
router.get('/student/:studentId', async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const feedback = await prisma.feedback.findMany({
      where: { studentId },
      include: {
        teacher: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ feedback });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    throw new AppError('Failed to fetch feedback', 500);
  }
});

export default router;

