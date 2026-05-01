# EduVision AI Insights

A comprehensive educational platform with AI-powered insights for students, teachers, and colleges.

## Project Structure

```
eduvision-ai-insights/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express + Prisma backend
└── README.md
```

## Features

- 🎓 **Student Portal**: Track attendance, assignments, and get AI-powered study recommendations
- 👨‍🏫 **Teacher Portal**: Monitor class performance, provide feedback, and get teaching insights
- 🏫 **College Evaluation**: AI-powered analysis of infrastructure, faculty, and accreditation
- 🤖 **AI Integration**: Gemini-powered chat assistants for personalized guidance
- 📊 **Analytics**: Comprehensive dashboards and performance tracking

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Clerk (Authentication)
- React Query
- React Router

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Clerk SDK
- Gemini API

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Clerk account
- Gemini API key

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install

# Copy environment file
cp .env.example .env

# Edit .env and add your:
# - DATABASE_URL
# - CLERK_SECRET_KEY
# - GEMINI_API_KEY

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Start server
npm run dev
```

Backend will run on `http://localhost:3001`

## Environment Variables

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_GEMINI_API_KEY=your_gemini_key
VITE_API_URL=http://localhost:3001
```

### Backend (.env)
```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/eduvision
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=http://localhost:5173
```

## API Documentation

See [backend/README.md](./backend/README.md) for detailed API documentation.

## Development

### Running Both Frontend and Backend

Open two terminal windows:

**Terminal 1 (Frontend):**
```bash
cd frontend
npm run dev
```

**Terminal 2 (Backend):**
```bash
cd backend
npm run dev
```

## Project Status

✅ Frontend: Complete  
✅ Backend: Complete  
🔄 Integration: In Progress

## License

ISC
