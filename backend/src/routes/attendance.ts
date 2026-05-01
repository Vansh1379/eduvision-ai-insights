import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Mark attendance (teacher)
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { studentId, courseId, date, status, notes } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const attendance = await prisma.attendance.upsert({
      where: {
        studentId_courseId_date: {
          studentId,
          courseId,
          date: new Date(date),
        },
      },
      update: {
        status,
        notes,
      },
      create: {
        studentId,
        courseId,
        date: new Date(date),
        status,
        notes,
      },
    });

    res.status(201).json({ attendance });
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw new AppError('Failed to mark attendance', 500);
  }
});

// Get attendance for a course
router.get('/course/:courseId', async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;
    const { startDate, endDate } = req.query;

    const where: any = { courseId };
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const attendance = await prisma.attendance.findMany({
      where,
      include: {
        student: {
          include: { user: true }
        }
      },
      orderBy: { date: 'desc' },
    });

    res.json({ attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw new AppError('Failed to fetch attendance', 500);
  }
});

export default router;

