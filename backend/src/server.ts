import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';

// Routes
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';
import collegeRoutes from './routes/colleges';
import courseRoutes from './routes/courses';
import assignmentRoutes from './routes/assignments';
import attendanceRoutes from './routes/attendance';
import feedbackRoutes from './routes/feedback';
import aiChatRoutes from './routes/aiChat';
import healthRoutes from './routes/health';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (no auth required)
app.use('/api/health', healthRoutes);

// API Routes (protected)
app.use('/api/students', authMiddleware, studentRoutes);
app.use('/api/teachers', authMiddleware, teacherRoutes);
app.use('/api/colleges', authMiddleware, collegeRoutes);
app.use('/api/courses', authMiddleware, courseRoutes);
app.use('/api/assignments', authMiddleware, assignmentRoutes);
app.use('/api/attendance', authMiddleware, attendanceRoutes);
app.use('/api/feedback', authMiddleware, feedbackRoutes);
app.use('/api/ai-chat', authMiddleware, aiChatRoutes);

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
});

export default app;

