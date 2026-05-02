import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response, type NextFunction } from 'express';

import { authMiddleware } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

// Routes
import aiChatRoutes from './routes/aiChat';
import assignmentRoutes from './routes/assignments';
import attendanceRoutes from './routes/attendance';
import collegeRoutes from './routes/colleges';
import courseRoutes from './routes/courses';
import feedbackRoutes from './routes/feedback';
import healthRoutes from './routes/health';
import studentRoutes from './routes/students';
import teacherRoutes from './routes/teachers';

dotenv.config();

const app = express();

const parsePort = (value: string | undefined): number => {
  const fallbackPort = 3001;
  if (!value) return fallbackPort;

  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1 || parsed > 65535) {
    throw new Error(`Invalid PORT value: ${value}`);
  }

  return parsed;
};

const PORT = parsePort(process.env.PORT);
const FRONTEND_URL = process.env.FRONTEND_URL ?? 'http://localhost:5173';

// Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check (no auth required)
app.use('/api/health', healthRoutes);

const protectedRoutes = [
  ['/api/students', studentRoutes],
  ['/api/teachers', teacherRoutes],
  ['/api/colleges', collegeRoutes],
  ['/api/courses', courseRoutes],
  ['/api/assignments', assignmentRoutes],
  ['/api/attendance', attendanceRoutes],
  ['/api/feedback', feedbackRoutes],
  ['/api/ai-chat', aiChatRoutes],
] as const;

for (const [path, route] of protectedRoutes) {
  app.use(path, authMiddleware, route);
}

app.use((req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;
