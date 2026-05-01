import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get student dashboard data
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    // Get or create student profile
    let student = await prisma.student.findUnique({
      where: { userId },
      include: {
        user: true,
        enrollments: {
          include: {
            course: {
              include: {
                teacher: {
                  include: { user: true }
                }
              }
            }
          }
        }
      }
    });

    if (!student) {
      // Create student profile if it doesn't exist
      student = await prisma.student.create({
        data: {
          userId,
        },
        include: {
          user: true,
          enrollments: {
            include: {
              course: {
                include: {
                  teacher: {
                    include: { user: true }
                  }
                }
              }
            }
          }
        }
      });
    }

    // Get attendance stats
    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        studentId: student.id,
        status: 'PRESENT'
      }
    });

    const totalClasses = await prisma.attendance.count({
      where: { studentId: student.id }
    });

    const attendancePercentage = totalClasses > 0 
      ? (attendanceRecords.length / totalClasses) * 100 
      : 0;

    // Get assignment stats
    const assignments = await prisma.assignmentSubmission.findMany({
      where: { studentId: student.id },
      include: { assignment: true }
    });

    const completedAssignments = assignments.filter(a => a.submittedAt !== null).length;
    const totalAssignments = assignments.length;

    // Get recent feedback
    const recentFeedback = await prisma.feedback.findMany({
      where: { studentId: student.id },
      include: {
        teacher: {
          include: { user: true }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 5
    });

    // Get upcoming deadlines
    const upcomingAssignments = await prisma.assignment.findMany({
      where: {
        course: {
          enrollments: {
            some: { studentId: student.id }
          }
        },
        dueDate: {
          gte: new Date()
        }
      },
      include: {
        course: true,
        submissions: {
          where: { studentId: student.id }
        }
      },
      orderBy: { dueDate: 'asc' },
      take: 10
    });

    res.json({
      student: {
        id: student.id,
        name: `${student.user.firstName || ''} ${student.user.lastName || ''}`.trim(),
        email: student.user.email,
      },
      metrics: {
        attendance: {
          percentage: Math.round(attendancePercentage),
          totalClasses,
          present: attendanceRecords.length,
        },
        assignments: {
          completed: completedAssignments,
          total: totalAssignments,
          percentage: totalAssignments > 0 
            ? Math.round((completedAssignments / totalAssignments) * 100) 
            : 0,
        },
      },
      courses: student.enrollments.map(e => ({
        id: e.course.id,
        name: e.course.name,
        code: e.course.code,
        teacher: e.course.teacher.user.firstName 
          ? `${e.course.teacher.user.firstName} ${e.course.teacher.user.lastName || ''}`.trim()
          : 'Unknown',
        enrollmentDate: e.enrollmentDate,
      })),
      recentFeedback: recentFeedback.map(f => ({
        id: f.id,
        content: f.content,
        teacher: f.teacher.user.firstName 
          ? `${f.teacher.user.firstName} ${f.teacher.user.lastName || ''}`.trim()
          : 'Unknown',
        createdAt: f.createdAt,
      })),
      upcomingDeadlines: upcomingAssignments.map(a => ({
        id: a.id,
        title: a.title,
        course: a.course.name,
        dueDate: a.dueDate,
        submitted: a.submissions.length > 0,
      })),
    });
  } catch (error) {
    console.error('Error fetching student dashboard:', error);
    throw new AppError('Failed to fetch student dashboard', 500);
  }
});

// Get student courses
router.get('/courses', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    
    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const enrollments = await prisma.enrollment.findMany({
      where: { studentId: student.id },
      include: {
        course: {
          include: {
            teacher: {
              include: { user: true }
            }
          }
        }
      }
    });

    res.json({
      courses: enrollments.map(e => ({
        id: e.course.id,
        name: e.course.name,
        code: e.course.code,
        description: e.course.description,
        teacher: e.course.teacher.user.firstName 
          ? `${e.course.teacher.user.firstName} ${e.course.teacher.user.lastName || ''}`.trim()
          : 'Unknown',
        enrollmentDate: e.enrollmentDate,
        status: e.status,
      })),
    });
  } catch (error) {
    console.error('Error fetching student courses:', error);
    throw new AppError('Failed to fetch courses', 500);
  }
});

// Get student attendance
router.get('/attendance', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { courseId, startDate, endDate } = req.query;

    const student = await prisma.student.findUnique({
      where: { userId },
    });

    if (!student) {
      throw new AppError('Student profile not found', 404);
    }

    const where: any = { studentId: student.id };
    if (courseId) where.courseId = courseId;
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date.gte = new Date(startDate as string);
      if (endDate) where.date.lte = new Date(endDate as string);
    }

    const attendance = await prisma.attendance.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    res.json({ attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    throw new AppError('Failed to fetch attendance', 500);
  }
});

export default router;

