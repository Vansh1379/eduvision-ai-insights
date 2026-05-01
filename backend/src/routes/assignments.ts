import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get assignments for a course
router.get('/course/:courseId', async (req: Request, res: Response) => {
  try {
    const { courseId } = req.params;

    const assignments = await prisma.assignment.findMany({
      where: { courseId },
      include: {
        submissions: true,
      },
      orderBy: { dueDate: 'asc' },
    });

    res.json({ assignments });
  } catch (error) {
    console.error('Error fetching assignments:', error);
    throw new AppError('Failed to fetch assignments', 500);
  }
});

// Create assignment (teacher only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { title, description, courseId, dueDate, maxScore } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const assignment = await prisma.assignment.create({
      data: {
        title,
        description,
        courseId,
        teacherId: teacher.id,
        dueDate: new Date(dueDate),
        maxScore: maxScore ? parseFloat(maxScore) : 100,
      },
    });

    res.status(201).json({ assignment });
  } catch (error) {
    console.error('Error creating assignment:', error);
    throw new AppError('Failed to create assignment', 500);
  }
});

// Submit assignment (student)
router.post('/:assignmentId/submit', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { assignmentId } = req.params;
    const { content, fileUrl } = req.body;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const submission = await prisma.assignmentSubmission.upsert({
      where: {
        assignmentId_studentId: {
          assignmentId,
          studentId: student.id,
        },
      },
      update: {
        content,
        fileUrl,
        submittedAt: new Date(),
      },
      create: {
        assignmentId,
        studentId: student.id,
        content,
        fileUrl,
        submittedAt: new Date(),
      },
    });

    res.status(201).json({ submission });
  } catch (error) {
    console.error('Error submitting assignment:', error);
    throw new AppError('Failed to submit assignment', 500);
  }
});

// Grade assignment (teacher)
router.patch('/:assignmentId/grade/:submissionId', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { assignmentId, submissionId } = req.params;
    const { score, feedback } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const submission = await prisma.assignmentSubmission.update({
      where: { id: submissionId },
      data: {
        score: score ? parseFloat(score) : null,
        feedback,
        gradedAt: new Date(),
      },
    });

    res.json({ submission });
  } catch (error) {
    console.error('Error grading assignment:', error);
    throw new AppError('Failed to grade assignment', 500);
  }
});

export default router;

