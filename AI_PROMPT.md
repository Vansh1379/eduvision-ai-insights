# EduVision AI Insights - Quick Reference for AI Assistants

## Project Summary

EduVision AI Insights is an educational platform with AI-powered coaching for students and teachers. Built with React + TypeScript frontend and Express + Prisma backend.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Shadcn UI, Clerk Auth, React Query, Recharts
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, Clerk SDK, Gemini API
- **AI**: Google Gemini 2.5 Flash (v1beta API)
- **Database**: PostgreSQL (Neon cloud)

## Key Features

1. **Student Portal** (`/student`): Dashboard, course progress, AI chat mentor, attendance tracking, deadlines
2. **Teacher Portal** (`/teacher`): Class analytics, assignment management, AI coaching, student feedback
3. **College Evaluation** (`/college/evaluation`): Infrastructure and faculty analysis
4. **AI Chat**: Gemini-powered personalized guidance with context-aware responses

## Recent Fixes

- ✅ Updated Gemini model from `gemini-1.5-flash-latest` to `gemini-2.5-flash` (v1beta API)
- ✅ Added `VITE_GEMINI_API_KEY` to frontend `.env`
- ✅ Enhanced chat UI with avatars, styled bubbles, loading indicators
- ✅ Fixed Header to show UserButton when logged in
- ✅ Improved ProtectedRoute with dev mode bypass and better error messages
- ✅ Installed backend dependencies and generated Prisma client

## Current State

- **Status**: ✅ Fully functional
- **Frontend**: Running on port 8080 (or 5173)
- **Backend**: Running on port 3001
- **Auth**: Clerk with role-based access (student/teacher/admin)
- **AI Model**: `gemini-2.5-flash` via `v1beta` endpoint

## Important Files

- `frontend/src/pages/StudentPortal.tsx` - Student dashboard with AI chat
- `frontend/src/pages/TeacherPortal.tsx` - Teacher dashboard
- `frontend/src/components/ProtectedRoute.tsx` - Route protection with role checking
- `frontend/src/components/Header.tsx` - Navigation with auth state
- `backend/src/routes/aiChat.ts` - AI chat API routes
- `backend/src/middleware/auth.ts` - Clerk authentication middleware

## Environment Variables

**Frontend**: `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_GEMINI_API_KEY`
**Backend**: `DATABASE_URL`, `CLERK_SECRET_KEY`, `GEMINI_API_KEY`, `PORT`, `FRONTEND_URL`

## Common Issues & Solutions

1. **Can't access teacher portal**: Set role in Clerk Dashboard → Users → Metadata → `{"role": "teacher"}`
2. **Gemini API 404**: Use `gemini-2.5-flash` with `v1beta` API (already fixed)
3. **Missing dependencies**: Run `npm install` in both frontend and backend
4. **Prisma errors**: Run `npm run prisma:generate` after schema changes

## Development Notes

- Role-based access: Users need `publicMetadata.role` set in Clerk
- Dev mode bypass: In development, users without roles can access portals
- AI Chat: Frontend calls Gemini API directly (not through backend proxy)
- Database: Uses Prisma ORM with PostgreSQL

## Next Steps

- Add database persistence for chat messages
- Implement file uploads for assignments
- Add real-time updates with WebSockets
- Enhance mobile responsiveness
- Add error monitoring
