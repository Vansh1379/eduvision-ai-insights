# EduVision Backend API

Backend API for EduVision AI Insights platform built with Node.js, Express, Prisma, PostgreSQL, and TypeScript.

## Features

- 🔐 Authentication with Clerk
- 📊 Student & Teacher Dashboards
- 🏫 College Evaluation System
- 📝 Course & Assignment Management
- 📅 Attendance Tracking
- 💬 AI Chat Demo with deterministic rule-based responses
- 📁 File Upload Support

## Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Clerk account (for authentication)

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and fill in:

   - `DATABASE_URL` - PostgreSQL connection string
   - `CLERK_SECRET_KEY` - Your Clerk secret key
   - `FRONTEND_URL` - Frontend URL (default: http://localhost:5173)

3. **Set up database:**

   ```bash
   # Generate Prisma Client
   npm run prisma:generate

   # Run migrations
   npm run prisma:migrate
   ```

4. **Start development server:**

   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:3001`

## API Endpoints

### Health Check

- `GET /api/health` - Check server and database status

### Students

- `GET /api/students/dashboard` - Get student dashboard data
- `GET /api/students/courses` - Get student's enrolled courses
- `GET /api/students/attendance` - Get attendance records

### Teachers

- `GET /api/teachers/dashboard` - Get teacher dashboard data
- `GET /api/teachers/students` - Get teacher's students

### Colleges

- `GET /api/colleges/profile` - Get college profile
- `POST /api/colleges/profile` - Create/update college profile
- `POST /api/colleges/evaluations` - Start new evaluation
- `POST /api/colleges/evaluations/:id/documents` - Upload documents
- `POST /api/colleges/evaluations/:id/photos` - Upload photos
- `GET /api/colleges/evaluations/:id` - Get evaluation results

### Courses

- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course (teacher)
- `POST /api/courses/:id/enroll` - Enroll in course (student)

### Assignments

- `GET /api/assignments/course/:id` - Get course assignments
- `POST /api/assignments` - Create assignment (teacher)
- `POST /api/assignments/:id/submit` - Submit assignment (student)
- `PATCH /api/assignments/:id/grade/:submissionId` - Grade assignment (teacher)

### Attendance

- `POST /api/attendance` - Mark attendance (teacher)
- `GET /api/attendance/course/:id` - Get course attendance

### Feedback

- `POST /api/feedback` - Create feedback (teacher)
- `GET /api/feedback/student/:id` - Get student feedback

### AI Chat

- `GET /api/ai-chat/session` - Get or create chat session
- `POST /api/ai-chat/session/:id/message` - Add message
- `GET /api/ai-chat/session/:id` - Get chat history
- `POST /api/ai-chat/gemini` - Demo AI response endpoint

## Database Schema

The database schema is defined in `prisma/schema.prisma`. Key models:

- **User** - Synced with Clerk authentication
- **Student** - Student profiles
- **Teacher** - Teacher profiles
- **College** - College/institution profiles
- **Course** - Courses
- **Enrollment** - Student-course relationships
- **Assignment** - Assignments
- **AssignmentSubmission** - Student submissions
- **Attendance** - Attendance records
- **Feedback** - Teacher feedback
- **CollegeEvaluation** - College evaluation data
- **AIChat** - AI chat sessions

## Development

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma      # Database schema
├── src/
│   ├── lib/
│   │   └── prisma.ts       # Prisma client
│   ├── middleware/
│   │   ├── auth.ts         # Authentication middleware
│   │   ├── errorHandler.ts # Error handling
│   │   └── upload.ts       # File upload middleware
│   ├── routes/
│   │   ├── students.ts     # Student routes
│   │   ├── teachers.ts     # Teacher routes
│   │   ├── colleges.ts     # College routes
│   │   ├── courses.ts      # Course routes
│   │   ├── assignments.ts # Assignment routes
│   │   ├── attendance.ts   # Attendance routes
│   │   ├── feedback.ts     # Feedback routes
│   │   ├── aiChat.ts       # AI chat routes
│   │   └── health.ts       # Health check
│   └── server.ts           # Express server
├── uploads/                 # Uploaded files
└── package.json
```

## Authentication

All API routes (except `/api/health`) require authentication. Include the Clerk session token in the Authorization header:

```
Authorization: Bearer <clerk_session_token>
```

## File Uploads

File uploads are stored in the `uploads/` directory. Configure `MAX_FILE_SIZE` in `.env` (default: 10MB).

Supported file types:

- Documents: PDF, DOC, DOCX
- Images: JPEG, PNG, WebP

## License

ISC
