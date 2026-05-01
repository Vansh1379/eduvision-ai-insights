import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          include: { user: true }
        },
        enrollments: {
          include: {
            student: {
              include: { user: true }
            }
          }
        }
      }
    });

    res.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw new AppError('Failed to fetch courses', 500);
  }
});

// Create course (teacher only)
router.post('/', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { name, code, description, semester, academicYear, collegeId } = req.body;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const course = await prisma.course.create({
      data: {
        name,
        code,
        description,
        teacherId: teacher.id,
        collegeId,
        semester: semester ? parseInt(semester) : null,
        academicYear,
      },
    });

    res.status(201).json({ course });
  } catch (error) {
    console.error('Error creating course:', error);
    throw new AppError('Failed to create course', 500);
  }
});

// Enroll student in course
router.post('/:courseId/enroll', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { courseId } = req.params;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        studentId: student.id,
        courseId,
      },
    });

    res.status(201).json({ enrollment });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw new AppError('Failed to enroll in course', 500);
  }
});

export default router;

