import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';

const router = Router();

// Get teacher dashboard data
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    // Get or create teacher profile
    let teacher = await prisma.teacher.findUnique({
      where: { userId },
      include: {
        user: true,
        courses: {
          include: {
            enrollments: {
              include: {
                student: {
                  include: { user: true }
                }
              }
            }
          }
        }
      }
    });

    if (!teacher) {
      teacher = await prisma.teacher.create({
        data: {
          userId,
        },
        include: {
          user: true,
          courses: {
            include: {
              enrollments: {
                include: {
                  student: {
                    include: { user: true }
                  }
                }
              }
            }
          }
        }
      });
    }

    // Calculate metrics
    const totalStudents = teacher.courses.reduce(
      (sum, course) => sum + course.enrollments.length,
      0
    );

    // Get class engagement data
    const engagementData = await Promise.all(
      teacher.courses.map(async (course) => {
        const enrollments = course.enrollments;
        const totalStudents = enrollments.length;

        // Calculate attendance percentage
        const attendanceRecords = await prisma.attendance.findMany({
          where: {
            courseId: course.id,
            status: 'PRESENT'
          }
        });
        const totalAttendance = await prisma.attendance.count({
          where: { courseId: course.id }
        });
        const attendancePercentage = totalAttendance > 0
          ? (attendanceRecords.length / totalAttendance) * 100
          : 0;

        // Calculate assignment completion
        const assignments = await prisma.assignment.findMany({
          where: { courseId: course.id }
        });
        const submissions = await prisma.assignmentSubmission.findMany({
          where: {
            assignmentId: { in: assignments.map(a => a.id) },
            submittedAt: { not: null }
          }
        });
        const assignmentCompletion = assignments.length > 0 && totalStudents > 0
          ? (submissions.length / (assignments.length * totalStudents)) * 100
          : 0;

        return {
          course: course.name,
          attendance: Math.round(attendancePercentage),
          assignments: Math.round(assignmentCompletion),
          students: totalStudents,
        };
      })
    );

    res.json({
      teacher: {
        id: teacher.id,
        name: `${teacher.user.firstName || ''} ${teacher.user.lastName || ''}`.trim(),
        email: teacher.user.email,
        department: teacher.department,
      },
      metrics: {
        activeClasses: teacher.courses.length,
        totalStudents,
      },
      courses: teacher.courses.map(course => ({
        id: course.id,
        name: course.name,
        code: course.code,
        students: course.enrollments.length,
      })),
      engagement: engagementData,
    });
  } catch (error) {
    console.error('Error fetching teacher dashboard:', error);
    throw new AppError('Failed to fetch teacher dashboard', 500);
  }
});

// Get teacher's students
router.get('/students', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { courseId } = req.query;

    const teacher = await prisma.teacher.findUnique({
      where: { userId },
    });

    if (!teacher) {
      throw new AppError('Teacher profile not found', 404);
    }

    const where: any = { teacherId: teacher.id };
    if (courseId) where.id = courseId;

    const courses = await prisma.course.findMany({
      where,
      include: {
        enrollments: {
          include: {
            student: {
              include: { user: true }
            }
          }
        }
      }
    });

    const students = courses.flatMap(course =>
      course.enrollments.map(e => ({
        id: e.student.id,
        name: `${e.student.user.firstName || ''} ${e.student.user.lastName || ''}`.trim(),
        email: e.student.user.email,
        course: course.name,
        courseId: course.id,
      }))
    );

    res.json({ students });
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new AppError('Failed to fetch students', 500);
  }
});

export default router;

