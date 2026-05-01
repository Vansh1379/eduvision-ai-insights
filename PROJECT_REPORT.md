# EduVision AI Insights - Project Report

## Project Overview

**EduVision AI Insights** is a comprehensive educational platform that provides AI-powered insights for students, teachers, and colleges. The platform features personalized AI coaching, performance analytics, attendance tracking, and institutional evaluation tools.

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5.4.1
- **Styling**: Tailwind CSS 3.4.11 with Shadcn UI components
- **Authentication**: Clerk (v5.55.0) - handles user authentication and role-based access
- **State Management**: TanStack React Query (v5.56.2)
- **Routing**: React Router DOM (v6.26.2)
- **Charts**: Recharts (v2.12.7)
- **Icons**: Lucide React (v0.462.0)
- **Form Handling**: React Hook Form (v7.53.0) with Zod validation

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js (v4.19.2) with TypeScript
- **Database**: PostgreSQL with Prisma ORM (v5.19.0)
- **Authentication**: Clerk SDK Node (v5.0.0)
- **AI Integration**: Google Gemini API (gemini-2.5-flash model)
- **File Upload**: Multer (v1.4.5-lts.1)
- **Validation**: Express Validator (v7.0.1) and Zod (v3.23.8)

## Project Structure

```
eduvision-ai-insights/
├── frontend/              # React + TypeScript frontend
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (StudentPortal, TeacherPortal, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities
│   └── public/
├── backend/              # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── middleware/   # Auth, error handling, file upload
│   │   ├── lib/          # Prisma client
│   │   └── utils/        # Helper functions
│   └── prisma/           # Database schema and migrations
└── DOCUMENTATION.md      # Detailed API documentation
```

## Key Features Implemented

### 1. Student Portal (`/student`)
- **Dashboard**: Overview cards showing attendance, academic growth, AI engagement score
- **Course Progress**: Track completion percentage, attendance, upcoming milestones
- **Performance Trends**: Line charts showing attendance and performance over time
- **AI Chat Assistant**: Gemini-powered mentor for personalized study guidance
- **Upcoming Deadlines**: List of assignments and project due dates
- **Faculty Feedback**: Display of teacher comments and feedback
- **Growth Milestones**: Achievement tracking

### 2. Teacher Portal (`/teacher`)
- **Class Analytics**: Student performance metrics and attendance tracking
- **Assignment Management**: Create and manage assignments
- **Feedback System**: Provide feedback to students
- **AI Coaching**: Get teaching strategies and insights
- **Student Overview**: View individual student progress

### 3. College Evaluation (`/college/evaluation`)
- **Infrastructure Analysis**: AI-powered evaluation of college facilities
- **Faculty Assessment**: Analysis of teaching quality
- **Accreditation Tracking**: Monitor accreditation status

### 4. Authentication & Authorization
- **Clerk Integration**: Complete authentication flow
- **Role-Based Access Control**: 
  - Students: Access to `/student`
  - Teachers: Access to `/teacher`
  - Admins: Access to all portals
- **Protected Routes**: Route-level access control with clear error messages

### 5. AI Integration
- **Gemini 2.5 Flash**: Latest stable model for AI chat
- **Context-Aware Responses**: AI uses student/teacher data for personalized responses
- **Chat Interface**: Modern, visually appealing chat UI with:
  - Message bubbles with avatars
  - Loading indicators
  - Error handling
  - Markdown-like formatting support

## Recent Fixes & Improvements

### 1. Gemini API Integration
- **Issue**: Model name `gemini-1.5-flash-latest` was deprecated/not found
- **Solution**: Updated to `gemini-2.5-flash` with `v1beta` API endpoint
- **Files Changed**: 
  - `frontend/src/pages/StudentPortal.tsx`
  - `frontend/src/pages/TeacherPortal.tsx`
  - `backend/src/routes/aiChat.ts`

### 2. Environment Variables
- **Issue**: Frontend missing `VITE_GEMINI_API_KEY`
- **Solution**: Created `.env` file in frontend with proper Vite-prefixed variables
- **Files Changed**: `frontend/.env`

### 3. Chat UI Enhancement
- **Issue**: Plain text messages looked unprofessional
- **Solution**: Redesigned chat interface with:
  - Avatar icons (Bot for AI, User for human)
  - Styled message bubbles (white for AI, blue gradient for user)
  - Scrollable container (max-height: 500px)
  - Loading animation with bouncing dots
  - Better error message display
  - Support for bullet points and numbered lists
- **Files Changed**: 
  - `frontend/src/pages/StudentPortal.tsx`
  - `frontend/src/pages/TeacherPortal.tsx`

### 4. Authentication State in Header
- **Issue**: Login button showed even when user was logged in
- **Solution**: Added Clerk `useUser()` hook to conditionally render UserButton or login buttons
- **Files Changed**: `frontend/src/components/Header.tsx`

### 5. Protected Route Access
- **Issue**: Users couldn't access teacher portal without proper role
- **Solution**: 
  - Added development mode bypass (allows access if no role set in dev)
  - Improved error messages with instructions
  - Shows current role and required roles
- **Files Changed**: `frontend/src/components/ProtectedRoute.tsx`

### 6. Backend Dependencies
- **Issue**: Missing `node_modules` causing "Cannot find module 'express'" error
- **Solution**: Ran `npm install` and `npm run prisma:generate`
- **Files Changed**: Backend dependencies installed

## Current Configuration

### Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_c29saWQtbGxhbWEtNTIuY2xlcmsuYWNjb3VudHMuZGV2JA
VITE_GEMINI_API_KEY=AIzaSyD9xrh4x63DEca9FRRSpDp0d_IS9QHrfRI
```

**Backend** (`backend/.env`):
```env
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://neondb_owner:npg_yTfG3YRjb9UK@ep-small-mountain-a4ivb2uc-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
CLERK_SECRET_KEY=sk_test_erVYdlKOVdDg0lGcQUDSHpGPwqEblfijViQRmRvCQa
GEMINI_API_KEY=AIzaSyD9xrh4x63DEca9FRRSpDp0d_IS9QHrfRI
FRONTEND_URL=http://localhost:8080
MAX_FILE_SIZE=10485760
UPLOAD_DIR=./uploads
```

## API Endpoints

### Health Check
- `GET /api/health` - Server health and database connection status

### Student Routes (Protected)
- `GET /api/students` - Get student data
- `GET /api/students/:id` - Get specific student

### Teacher Routes (Protected)
- `GET /api/teachers` - Get teacher data
- `GET /api/teachers/:id` - Get specific teacher

### Course Routes (Protected)
- `GET /api/courses` - List courses
- `POST /api/courses` - Create course

### Assignment Routes (Protected)
- `GET /api/assignments` - List assignments
- `POST /api/assignments` - Create assignment

### Attendance Routes (Protected)
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Mark attendance

### Feedback Routes (Protected)
- `GET /api/feedback` - Get feedback
- `POST /api/feedback` - Create feedback

### AI Chat Routes (Protected)
- `GET /api/ai-chat/session` - Get or create chat session
- `POST /api/ai-chat/session/:chatId/message` - Add message to chat
- `GET /api/ai-chat/session/:chatId` - Get chat history
- `POST /api/ai-chat/gemini` - Proxy to Gemini API

### College Routes (Protected)
- `GET /api/colleges` - List colleges
- `POST /api/colleges` - Create college

## Database Schema (Prisma)

Key models:
- **User**: Linked to Clerk user via `clerkId`
- **Student**: Student-specific data
- **Teacher**: Teacher-specific data
- **College**: Institution data
- **Course**: Course information
- **Assignment**: Assignment details
- **Attendance**: Attendance records
- **Feedback**: Teacher feedback
- **Chat**: AI chat sessions

## Setup Instructions

### Prerequisites
- Node.js 18+
- PostgreSQL database (or Neon database URL)
- Clerk account with API keys
- Gemini API key

### Frontend Setup
```bash
cd frontend
npm install
# Create .env file with VITE_CLERK_PUBLISHABLE_KEY and VITE_GEMINI_API_KEY
npm run dev
# Runs on http://localhost:5173 (or configured port)
```

### Backend Setup
```bash
cd backend
npm install
# Create .env file with DATABASE_URL, CLERK_SECRET_KEY, GEMINI_API_KEY
npm run prisma:generate
npm run prisma:migrate
npm run dev
# Runs on http://localhost:3001
```

## Known Issues & Solutions

### 1. Role-Based Access
- **Issue**: Users need role set in Clerk `publicMetadata`
- **Solution**: 
  - In development mode, users without roles can access portals
  - For production: Set role in Clerk Dashboard → Users → Metadata → Public Metadata → `{"role": "teacher"}` or `{"role": "student"}`

### 2. TypeScript Build Errors
- **Issue**: `prisma/seed.ts` not under `rootDir`
- **Status**: Non-blocking, seed file is separate from main build

### 3. Clerk SDK Deprecation
- **Warning**: `@clerk/clerk-sdk-node@5.1.6` is deprecated (EOL Jan 2025)
- **Recommendation**: Migrate to `@clerk/express` for Express users

## Development Notes

### Authentication Flow
1. User signs up/logs in via Clerk
2. Backend middleware (`auth.ts`) verifies Clerk session token
3. User is synced to database via `prisma.user.upsert()`
4. Role is extracted from Clerk `publicMetadata`
5. Protected routes check role against `allowedRoles` array

### AI Chat Flow
1. Frontend sends user message to Gemini API directly (using `VITE_GEMINI_API_KEY`)
2. System prompt includes student/teacher context (attendance, grades, feedback)
3. Response is formatted and displayed in chat UI
4. Messages are stored in local state (can be extended to persist in database)

### File Structure Conventions
- Components: PascalCase (`StudentPortal.tsx`)
- Utilities: camelCase (`utils.ts`)
- Routes: camelCase (`aiChat.ts`)
- Types: Defined inline or in component files

## Next Steps / Recommendations

1. **Database Persistence for Chat**: Currently chat messages are in-memory, should persist to database
2. **Real-time Updates**: Consider WebSockets for live attendance/grade updates
3. **File Upload**: Implement file upload for assignments (multer is configured)
4. **Email Notifications**: Add email alerts for deadlines and feedback
5. **Analytics Dashboard**: Enhanced analytics for teachers/admins
6. **Mobile Responsiveness**: Further optimize for mobile devices
7. **Testing**: Add unit tests and integration tests
8. **Error Monitoring**: Integrate error tracking (Sentry, etc.)
9. **Performance**: Optimize database queries, add caching
10. **Security**: Add rate limiting, input sanitization

## Contact & Support

For issues or questions:
- Check `DOCUMENTATION.md` for detailed API docs
- Review `backend/README.md` for backend-specific info
- Check Clerk dashboard for authentication issues
- Verify Gemini API key has proper permissions

---

**Last Updated**: November 2024
**Project Status**: ✅ Functional - Ready for development/testing
**Version**: 1.0.0

