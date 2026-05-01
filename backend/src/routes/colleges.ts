import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { AppError } from '../middleware/errorHandler';
import { uploadMultiple } from '../middleware/upload';

const router = Router();

// Get college profile
router.get('/profile', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    let college = await prisma.college.findUnique({
      where: { userId },
      include: {
        user: true,
        evaluations: {
          orderBy: { createdAt: 'desc' },
          take: 1
        }
      }
    });

    if (!college) {
      throw new AppError('College profile not found', 404);
    }

    res.json({ college });
  } catch (error) {
    console.error('Error fetching college profile:', error);
    throw new AppError('Failed to fetch college profile', 500);
  }
});

// Create or update college profile
router.post('/profile', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;
    const { name, type, location, establishedYear, accreditation, studentCount } = req.body;

    const college = await prisma.college.upsert({
      where: { userId },
      update: {
        name,
        type,
        location,
        establishedYear: establishedYear ? parseInt(establishedYear) : null,
        accreditation,
        studentCount: studentCount ? parseInt(studentCount) : null,
      },
      create: {
        userId,
        name,
        type,
        location,
        establishedYear: establishedYear ? parseInt(establishedYear) : null,
        accreditation,
        studentCount: studentCount ? parseInt(studentCount) : null,
      },
    });

    res.json({ college });
  } catch (error) {
    console.error('Error creating/updating college profile:', error);
    throw new AppError('Failed to save college profile', 500);
  }
});

// Start evaluation
router.post('/evaluations', async (req: Request, res: Response) => {
  try {
    const userId = req.userId!;

    const college = await prisma.college.findUnique({
      where: { userId },
    });

    if (!college) {
      throw new AppError('College profile not found. Please create a profile first.', 404);
    }

    const evaluation = await prisma.collegeEvaluation.create({
      data: {
        collegeId: college.id,
        status: 'PENDING',
      },
    });

    res.status(201).json({ evaluation });
  } catch (error) {
    console.error('Error creating evaluation:', error);
    throw new AppError('Failed to create evaluation', 500);
  }
});

// Upload documents for evaluation
router.post('/evaluations/:evaluationId/documents', uploadMultiple('documents', 20), async (req: Request, res: Response) => {
  try {
    const { evaluationId } = req.params;
    const { type } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new AppError('No files uploaded', 400);
    }

    const evaluation = await prisma.collegeEvaluation.findUnique({
      where: { id: evaluationId },
    });

    if (!evaluation) {
      throw new AppError('Evaluation not found', 404);
    }

    const documents = await Promise.all(
      files.map(file =>
        prisma.evaluationDocument.create({
          data: {
            evaluationId,
            type: type || 'OTHER',
            fileName: file.originalname,
            fileUrl: `/uploads/${file.filename}`,
            fileSize: file.size,
            mimeType: file.mimetype,
          },
        })
      )
    );

    res.status(201).json({ documents });
  } catch (error) {
    console.error('Error uploading documents:', error);
    throw new AppError('Failed to upload documents', 500);
  }
});

// Upload photos for evaluation
router.post('/evaluations/:evaluationId/photos', uploadMultiple('photos', 50), async (req: Request, res: Response) => {
  try {
    const { evaluationId } = req.params;
    const { category } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      throw new AppError('No files uploaded', 400);
    }

    const evaluation = await prisma.collegeEvaluation.findUnique({
      where: { id: evaluationId },
    });

    if (!evaluation) {
      throw new AppError('Evaluation not found', 404);
    }

    const photos = await Promise.all(
      files.map(file =>
        prisma.evaluationPhoto.create({
          data: {
            evaluationId,
            category: category || 'CAMPUS',
            fileName: file.originalname,
            fileUrl: `/uploads/${file.filename}`,
            fileSize: file.size,
          },
        })
      )
    );

    res.status(201).json({ photos });
  } catch (error) {
    console.error('Error uploading photos:', error);
    throw new AppError('Failed to upload photos', 500);
  }
});

// Get evaluation results
router.get('/evaluations/:evaluationId', async (req: Request, res: Response) => {
  try {
    const { evaluationId } = req.params;

    const evaluation = await prisma.collegeEvaluation.findUnique({
      where: { id: evaluationId },
      include: {
        documents: true,
        photos: true,
        college: {
          include: { user: true }
        }
      }
    });

    if (!evaluation) {
      throw new AppError('Evaluation not found', 404);
    }

    res.json({ evaluation });
  } catch (error) {
    console.error('Error fetching evaluation:', error);
    throw new AppError('Failed to fetch evaluation', 500);
  }
});

// Update evaluation status (for AI processing)
router.patch('/evaluations/:evaluationId', async (req: Request, res: Response) => {
  try {
    const { evaluationId } = req.params;
    const { status, overallScore, infrastructureScore, facultyScore, accreditationScore, recommendations, analysisData } = req.body;

    const evaluation = await prisma.collegeEvaluation.update({
      where: { id: evaluationId },
      data: {
        status,
        overallScore,
        infrastructureScore,
        facultyScore,
        accreditationScore,
        recommendations: recommendations ? JSON.parse(recommendations) : undefined,
        analysisData: analysisData ? JSON.parse(analysisData) : undefined,
        completedAt: status === 'COMPLETED' ? new Date() : undefined,
      },
    });

    res.json({ evaluation });
  } catch (error) {
    console.error('Error updating evaluation:', error);
    throw new AppError('Failed to update evaluation', 500);
  }
});

export default router;

