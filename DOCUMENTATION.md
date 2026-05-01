# EduVision AI Insights - Complete Documentation

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [AI Integration](#ai-integration)
7. [User Flows](#user-flows)
8. [Data Flow](#data-flow)
9. [Database Schema](#database-schema)
10. [API Endpoints](#api-endpoints)
11. [Authentication & Authorization](#authentication--authorization)
12. [File Upload System](#file-upload-system)

---

## Overview

EduVision AI Insights is a comprehensive educational platform that provides AI-powered insights for students, teachers, and colleges. The platform combines modern web technologies with AI capabilities to deliver personalized educational experiences.

### Key Features

- **Student Portal**: Track attendance, assignments, and receive AI-powered study recommendations
- **Teacher Portal**: Monitor class performance, provide feedback, and get teaching insights
- **College Evaluation**: AI-powered analysis of infrastructure, faculty, and accreditation
- **AI Chat Integration**: Gemini-powered chat assistants for personalized guidance
- **Analytics Dashboard**: Comprehensive performance tracking and visualization

---

## Technology Stack

### Frontend Technologies

#### Core Framework

- **React 18.3.1**: Modern UI library for building interactive user interfaces
- **TypeScript 5.5.3**: Type-safe JavaScript for better code quality and developer experience
- **Vite 5.4.1**: Fast build tool and development server

#### UI & Styling

- **Tailwind CSS 3.4.11**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: High-quality React components built on Radix UI primitives
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Beautiful icon library
- **Recharts 2.12.7**: Composable charting library for data visualization

#### State Management & Data Fetching

- **TanStack React Query 5.56.2**: Powerful data synchronization for React
- **React Router DOM 6.26.2**: Declarative routing for React applications

#### Forms & Validation

- **React Hook Form 7.53.0**: Performant forms with easy validation
- **Zod 3.23.8**: TypeScript-first schema validation
- **@hookform/resolvers 3.9.0**: Validation resolver for React Hook Form

#### Authentication

- **Clerk 5.55.0**: Complete authentication solution
  - `@clerk/clerk-react`: React components and hooks
  - `@clerk/clerk-js`: JavaScript SDK
  - `@clerk/types`: TypeScript types

#### Additional Libraries

- **date-fns 3.6.0**: Date utility library
- **sonner 1.5.0**: Toast notifications
- **next-themes 0.3.0**: Theme management

### Backend Technologies

#### Core Framework

- **Node.js 18+**: JavaScript runtime environment
- **Express 4.19.2**: Fast, unopinionated web framework
- **TypeScript 5.5.3**: Type-safe backend development

#### Database & ORM

- **PostgreSQL 14+**: Relational database
- **Prisma 5.19.0**: Next-generation ORM
  - Type-safe database client
  - Migration system
  - Database introspection

#### Authentication

- **Clerk SDK Node 5.0.0**: Server-side authentication verification
  - Session token validation
  - User data synchronization

#### AI Integration

- **Google Gemini API**: AI-powered chat and analysis
  - Model: `gemini-1.5-flash-latest`
  - Content generation
  - Context-aware responses

#### File Handling

- **Multer 1.4.5**: Middleware for handling multipart/form-data
  - File uploads
  - Document storage
  - Image processing

#### Validation & Utilities

- **Express Validator 7.0.1**: Request validation middleware
- **Zod 3.23.8**: Schema validation
- **CORS 2.8.5**: Cross-origin resource sharing
- **dotenv 16.4.5**: Environment variable management

---

## Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Student      │  │ Teacher      │  │ College      │     │
│  │ Portal       │  │ Portal       │  │ Evaluation   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Clerk Authentication                     │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────┘
                       │ HTTPS/REST API
                       │ (Bearer Token)
┌──────────────────────▼───────────────────────────────────────┐
│                    Backend (Express)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Auth         │  │ API Routes   │  │ File Upload  │       │
│  │ Middleware   │  │              │  │ Middleware   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              Gemini AI API Integration               │   │
│  └──────────────────────────────────────────────────────┘   │
└──────────────────────┬───────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
┌───────▼────┐  ┌──────▼─────┐  ┌───▼────────┐
│ PostgreSQL │  │ File System │  │ Gemini API │
│  Database  │  │  (uploads/) │  │  (External)│
└────────────┘  └─────────────┘  └────────────┘
```

### Request Flow

1. **User Request** → Frontend (React)
2. **Authentication Check** → Clerk (Client-side)
3. **API Call** → Backend (Express) with Bearer Token
4. **Token Verification** → Clerk SDK (Server-side)
5. **User Sync** → Database (Prisma)
6. **Business Logic** → Route Handlers
7. **Data Access** → Prisma ORM → PostgreSQL
8. **Response** → JSON → Frontend
9. **UI Update** → React Components

---

## Frontend Architecture

### Component Structure

```
frontend/src/
├── components/
│   ├── ui/              # Shadcn UI components (buttons, cards, etc.)
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── ProtectedRoute.tsx  # Route protection wrapper
│   └── ...
├── pages/
│   ├── Index.tsx        # Landing page
│   ├── Login.tsx        # Login page
│   ├── Signup.tsx       # Signup page
│   ├── StudentPortal.tsx    # Student dashboard
│   ├── TeacherPortal.tsx    # Teacher dashboard
│   ├── CollegeEvaluation.tsx # College evaluation flow
│   └── ...
├── hooks/
│   └── use-toast.ts    # Toast notification hook
├── lib/
│   └── utils.ts        # Utility functions
└── App.tsx             # Main app component with routing
```

### Key Frontend Patterns

#### 1. **Protected Routes**

```typescript
<ProtectedRoute allowedRoles={["student", "admin"]}>
  <StudentPortal />
</ProtectedRoute>
```

- Checks authentication via Clerk
- Validates user role from metadata
- Redirects unauthorized users

#### 2. **Data Fetching with React Query**

- Automatic caching and refetching
- Loading and error states
- Optimistic updates

#### 3. **Component Composition**

- Reusable UI components from Shadcn
- Custom hooks for business logic
- Separation of concerns

#### 4. **State Management**

- Local state with `useState` for UI state
- React Query for server state
- Context API for theme (via next-themes)

### Frontend Features

#### Student Portal

- **Dashboard Overview**: Attendance, performance metrics, course progress
- **AI Chat Interface**: Direct integration with Gemini API
- **Course Progress Tracking**: Visual progress indicators
- **Deadline Management**: Upcoming assignments and deadlines
- **Performance Charts**: Attendance and academic trends

#### Teacher Portal

- **Class Analytics**: Student engagement metrics
- **AI Coaching**: Teaching strategy recommendations
- **Student Highlights**: Top performers and improvement areas
- **Feedback Management**: Student feedback tracking
- **Course Management**: Assignment and attendance tracking

#### College Evaluation

- **Multi-step Form**: Information collection workflow
- **Document Upload**: Accreditation and credential documents
- **Photo Upload**: Infrastructure documentation
- **AI Analysis**: Automated evaluation processing
- **Results Dashboard**: Comprehensive scoring and recommendations

---

## Backend Architecture

### Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma    # Database schema definition
│   └── seed.ts          # Database seeding script
├── src/
│   ├── lib/
│   │   └── prisma.ts    # Prisma client singleton
│   ├── middleware/
│   │   ├── auth.ts      # Authentication middleware
│   │   ├── errorHandler.ts  # Global error handler
│   │   └── upload.ts    # File upload middleware
│   ├── routes/
│   │   ├── students.ts  # Student endpoints
│   │   ├── teachers.ts  # Teacher endpoints
│   │   ├── colleges.ts # College endpoints
│   │   ├── courses.ts   # Course endpoints
│   │   ├── assignments.ts # Assignment endpoints
│   │   ├── attendance.ts  # Attendance endpoints
│   │   ├── feedback.ts    # Feedback endpoints
│   │   ├── aiChat.ts      # AI chat endpoints
│   │   └── health.ts      # Health check
│   ├── utils/
│   │   └── roleCheck.ts  # Role-based access control
│   └── server.ts         # Express app setup
└── uploads/              # File storage directory
```

### Backend Patterns

#### 1. **Middleware Chain**

```
Request → CORS → JSON Parser → Auth Middleware → Route Handler → Error Handler → Response
```

#### 2. **Authentication Flow**

1. Extract Bearer token from Authorization header
2. Verify token with Clerk SDK
3. Get user data from Clerk
4. Sync user to database (upsert)
5. Attach user info to request object
6. Continue to route handler

#### 3. **Error Handling**

- Centralized error handler middleware
- Custom `AppError` class
- Consistent error response format
- Error logging

#### 4. **Database Access**

- Prisma Client for type-safe queries
- Transaction support
- Relationship handling
- Query optimization

---

## AI Integration

### Gemini AI Implementation

#### Architecture

```
Frontend (Student/Teacher Portal)
    │
    │ User Message + Context
    │
    ▼
Backend API Route (/api/ai-chat/gemini)
    │
    │ Format Request
    │ Add System Prompt
    │ Include Context
    │
    ▼
Gemini API (generativelanguage.googleapis.com)
    │
    │ Model: gemini-1.5-flash-latest
    │ Process with Context
    │
    ▼
Response (AI-generated text)
    │
    │ Parse & Extract
    │
    ▼
Backend → Frontend → Display
```

### How AI Works in the System

#### 1. **Student AI Mentor**

**Context Building:**

```typescript
const studentContext = {
  name: "Student Name",
  attendance: "94%",
  courses: [...],
  deadlines: [...],
  feedback: [...],
  performance: {...}
}
```

**System Prompt:**

```
You are EduVision AI Mentor, an educational coach who crafts personalized,
motivating, and actionable guidance for students.

Use the student-specific context below to ground every response. Provide
clear next steps, reference exact scores or deadlines when helpful, and
end with an encouraging takeaway.

Student Context:
[Student's attendance, courses, deadlines, feedback, performance data]
```

**Request Flow:**

1. Student types question in chat interface
2. Frontend sends message to Gemini API (via backend proxy or direct)
3. System prompt + context + conversation history sent to Gemini
4. Gemini generates personalized response
5. Response displayed in chat interface
6. Conversation history maintained for context

**Features:**

- Personalized study recommendations
- Deadline management advice
- Performance improvement strategies
- Course-specific guidance
- Motivational support

#### 2. **Teacher AI Coach**

**Context Building:**

```typescript
const teacherContext = {
  name: "Teacher Name",
  metrics: {...},
  classEngagement: [...],
  studentHighlights: [...],
  feedback: [...],
  goals: [...]
}
```

**System Prompt:**

```
You are EduVision AI Coach, an insightful assistant for educators. Craft
responses that reference classroom analytics, student highlights, and
goals provided in the context. Offer actionable strategies, tie them to
concrete metrics when possible, and conclude with an uplifting suggestion.

Teacher Context:
[Teacher's metrics, class data, student highlights, feedback, goals]
```

**Features:**

- Teaching strategy recommendations
- Student engagement insights
- Personalized feedback suggestions
- Class performance analysis
- Professional development guidance

#### 3. **College Evaluation AI**

**Process:**

1. **Document Analysis**: Uploaded documents (PDFs, images) analyzed
2. **Photo Analysis**: Infrastructure photos evaluated
3. **Scoring**: AI generates scores for:
   - Infrastructure (8.5/10)
   - Faculty qualifications (9.2/10)
   - Accreditation status (8.8/10)
4. **Recommendations**: AI-generated improvement suggestions
5. **Report Generation**: Comprehensive evaluation report

**Implementation:**

- Document processing via Gemini Vision API
- Image analysis for infrastructure assessment
- Text extraction and analysis
- Scoring algorithm based on multiple factors
- Recommendation generation

### AI API Integration Points

#### Frontend Direct Integration (Current)

- Student Portal: Direct Gemini API calls from frontend
- Teacher Portal: Direct Gemini API calls from frontend
- API key stored in environment variable (`VITE_GEMINI_API_KEY`)

#### Backend Proxy (Available)

- Route: `POST /api/ai-chat/gemini`
- Keeps API key secure on server
- Can add rate limiting and caching
- Better for production

### AI Context Management

**Student Context Includes:**

- Overall attendance percentage
- Academic growth metrics
- Course progress details
- Upcoming deadlines
- Recent teacher feedback
- Assignment completion status

**Teacher Context Includes:**

- Active classes count
- Average class ratings
- Student engagement metrics
- Student highlights
- Recent feedback
- Teaching goals

**Benefits:**

- Personalized responses
- Context-aware recommendations
- Data-driven insights
- Actionable advice

---

## User Flows

### 1. Student User Flow

```
1. Landing Page (/)
   │
   ├─> Sign Up / Login (Clerk)
   │
2. Authentication
   │
   ├─> Clerk verifies credentials
   │
   ├─> User metadata set (role: "student")
   │
3. Student Portal (/student)
   │
   ├─> ProtectedRoute checks authentication & role
   │
   ├─> Dashboard loads
   │   ├─> Fetch student data (GET /api/students/dashboard)
   │   ├─> Display metrics (attendance, assignments)
   │   ├─> Show course progress
   │   └─> Display upcoming deadlines
   │
4. AI Chat Interaction
   │
   ├─> Student types question
   │
   ├─> Frontend builds context (attendance, courses, deadlines)
   │
   ├─> Send to Gemini API with system prompt
   │
   ├─> Receive AI response
   │
   └─> Display personalized advice
   │
5. Course Management
   │
   ├─> View enrolled courses (GET /api/students/courses)
   │
   ├─> Check attendance (GET /api/students/attendance)
   │
   └─> Submit assignments (POST /api/assignments/:id/submit)
```

### 2. Teacher User Flow

```
1. Landing Page (/)
   │
   ├─> Sign Up / Login (Clerk)
   │
2. Authentication
   │
   ├─> Clerk verifies credentials
   │
   ├─> User metadata set (role: "teacher")
   │
3. Teacher Portal (/teacher)
   │
   ├─> ProtectedRoute checks authentication & role
   │
   ├─> Dashboard loads
   │   ├─> Fetch teacher data (GET /api/teachers/dashboard)
   │   ├─> Display class metrics
   │   ├─> Show student engagement
   │   └─> Display student highlights
   │
4. AI Coaching
   │
   ├─> Teacher asks for teaching strategies
   │
   ├─> Frontend builds context (metrics, students, goals)
   │
   ├─> Send to Gemini API with system prompt
   │
   ├─> Receive AI coaching response
   │
   └─> Display actionable recommendations
   │
5. Class Management
   │
   ├─> Create courses (POST /api/courses)
   │
   ├─> Create assignments (POST /api/assignments)
   │
   ├─> Mark attendance (POST /api/attendance)
   │
   ├─> Grade assignments (PATCH /api/assignments/:id/grade/:submissionId)
   │
   └─> Provide feedback (POST /api/feedback)
```

### 3. College Admin User Flow

```
1. Landing Page (/)
   │
   ├─> Sign Up / Login (Clerk)
   │
2. Authentication
   │
   ├─> Clerk verifies credentials
   │
   ├─> User metadata set (role: "college_admin")
   │
3. College Evaluation (/college/evaluation)
   │
   ├─> Step 1: College Information
   │   ├─> Enter college details
   │   └─> Save profile (POST /api/colleges/profile)
   │
   ├─> Step 2: Document Upload
   │   ├─> Upload accreditation documents
   │   ├─> Upload faculty credentials
   │   ├─> Upload infrastructure reports
   │   └─> Save (POST /api/colleges/evaluations/:id/documents)
   │
   ├─> Step 3: Infrastructure Photos
   │   ├─> Upload classroom photos
   │   ├─> Upload lab photos
   │   ├─> Upload library photos
   │   └─> Save (POST /api/colleges/evaluations/:id/photos)
   │
   ├─> Step 4: AI Analysis
   │   ├─> Start analysis
   │   ├─> Backend processes documents & photos
   │   ├─> Gemini AI analyzes content
   │   ├─> Generate scores and recommendations
   │   └─> Update evaluation (PATCH /api/colleges/evaluations/:id)
   │
   └─> Step 5: Results & Insights
       ├─> Display overall score
       ├─> Show category scores (infrastructure, faculty, accreditation)
       ├─> Display recommendations
       └─> Download report
```

### 4. Authentication Flow

```
1. User clicks "Sign Up" or "Login"
   │
2. Clerk Authentication
   │
   ├─> Email/Password or Social Login
   │
   ├─> Clerk verifies credentials
   │
   ├─> Creates session token
   │
3. Frontend receives session token
   │
4. User navigates to protected route
   │
5. ProtectedRoute component
   │
   ├─> Checks if user is signed in (Clerk)
   │
   ├─> Checks user role from metadata
   │
   ├─> Allows access if authorized
   │
   └─> Redirects if unauthorized
   │
6. API Request
   │
   ├─> Frontend includes Bearer token in header
   │
   ├─> Backend auth middleware verifies token
   │
   ├─> Clerk SDK validates session
   │
   ├─> User synced to database
   │
   └─> Request proceeds with user context
```

---

## Data Flow

### 1. Student Data Flow

```
┌─────────────┐
│   Student   │
│   Browser   │
└──────┬──────┘
       │
       │ 1. Request Dashboard
       │    GET /api/students/dashboard
       │    Headers: Authorization: Bearer <token>
       ▼
┌─────────────────────┐
│  Backend Server     │
│  ┌───────────────┐ │
│  │ Auth          │ │ Verify token with Clerk
│  │ Middleware    │ │ Sync user to DB
│  └───────┬───────┘ │
│          │         │
│  ┌───────▼───────┐ │
│  │ Student Route │ │
│  └───────┬───────┘ │
│          │         │
│  ┌───────▼───────┐ │
│  │ Prisma Client │ │ Query database
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 2. Database Queries
           │    - Get student profile
           │    - Get enrollments
           │    - Get attendance records
           │    - Get assignments
           │    - Get feedback
           │    - Get upcoming deadlines
           ▼
┌─────────────────────┐
│   PostgreSQL DB     │
│                     │
│  - users            │
│  - students         │
│  - enrollments      │
│  - attendance       │
│  - assignments      │
│  - feedback         │
└──────────┬──────────┘
           │
           │ 3. Return Data
           │
           ▼
┌─────────────────────┐
│  Backend Server     │
│  ┌───────────────┐ │
│  │ Format JSON   │ │ Aggregate data
│  │ Response      │ │ Calculate metrics
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 4. JSON Response
           │    {
           │      student: {...},
           │      metrics: {...},
           │      courses: [...],
           │      recentFeedback: [...],
           │      upcomingDeadlines: [...]
           │    }
           ▼
┌─────────────────────┐
│   Frontend React    │
│  ┌───────────────┐ │
│  │ React Query   │ │ Cache response
│  │ Component     │ │ Update UI
│  └───────────────┘ │
└─────────────────────┘
```

### 2. AI Chat Data Flow

```
┌─────────────┐
│   Student   │
│   Types     │
│   Question  │
└──────┬──────┘
       │
       │ 1. User Input
       │    "Help me improve my ML score"
       ▼
┌─────────────────────┐
│   Frontend React     │
│  ┌───────────────┐ │
│  │ Build Context │ │
│  │ - Attendance  │ │
│  │ - Courses     │ │
│  │ - Deadlines   │ │
│  │ - Feedback    │ │
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 2. Format Request
           │    {
           │      contents: [
           │        { role: "user", parts: [{ text: systemPrompt }] },
           │        { role: "user", parts: [{ text: context }] },
           │        { role: "user", parts: [{ text: question }] }
           │      ]
           │    }
           ▼
┌─────────────────────┐
│   Gemini API        │
│   (Direct Call)     │
│                     │
│  Model:             │
│  gemini-1.5-flash   │
└──────────┬──────────┘
           │
           │ 3. AI Processing
           │    - Analyze context
           │    - Understand question
           │    - Generate response
           │
           ▼
┌─────────────────────┐
│   Gemini Response    │
│   {                 │
│     candidates: [{   │
│       content: {    │
│         parts: [{   │
│           text: "..."│
│         }]          │
│       }             │
│     }]              │
│   }                 │
└──────────┬──────────┘
           │
           │ 4. Extract Text
           │
           ▼
┌─────────────────────┐
│   Frontend React    │
│  ┌───────────────┐ │
│  │ Update State  │ │ Add to messages
│  │ Display Chat  │ │ Show response
│  └───────────────┘ │
└─────────────────────┘
```

### 3. College Evaluation Data Flow

```
┌─────────────┐
│ College     │
│ Admin       │
└──────┬──────┘
       │
       │ 1. Upload Documents & Photos
       │    POST /api/colleges/evaluations/:id/documents
       │    POST /api/colleges/evaluations/:id/photos
       ▼
┌─────────────────────┐
│  Backend Server     │
│  ┌───────────────┐ │
│  │ Multer        │ │ Save files to uploads/
│  │ Middleware    │ │
│  └───────┬───────┘ │
│          │         │
│  ┌───────▼───────┐ │
│  │ Prisma        │ │ Store file metadata
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 2. Save to Database
           │    - evaluation_documents
           │    - evaluation_photos
           ▼
┌─────────────────────┐
│   PostgreSQL DB     │
└──────────┬──────────┘
           │
           │ 3. Start AI Analysis
           │    PATCH /api/colleges/evaluations/:id
           │    { status: "IN_PROGRESS" }
           ▼
┌─────────────────────┐
│  Backend Server     │
│  ┌───────────────┐ │
│  │ AI Processor   │ │
│  │ - Read files   │ │
│  │ - Extract text │ │
│  │ - Analyze      │ │
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 4. Send to Gemini
           │    - Documents as text/images
           │    - Photos for vision analysis
           │    - Generate scores
           │    - Create recommendations
           ▼
┌─────────────────────┐
│   Gemini API        │
│   (Vision + Text)    │
└──────────┬──────────┘
           │
           │ 5. AI Analysis Results
           │    - Infrastructure score: 8.5
           │    - Faculty score: 9.2
           │    - Accreditation score: 8.8
           │    - Recommendations: [...]
           ▼
┌─────────────────────┐
│  Backend Server     │
│  ┌───────────────┐ │
│  │ Update DB      │ │
│  │ - overallScore │ │
│  │ - categoryScores││
│  │ - recommendations││
│  │ - status: COMPLETED│
│  └───────┬───────┘ │
└──────────┼─────────┘
           │
           │ 6. Save Results
           ▼
┌─────────────────────┐
│   PostgreSQL DB     │
│   college_evaluations│
└──────────┬──────────┘
           │
           │ 7. Return Results
           │    GET /api/colleges/evaluations/:id
           ▼
┌─────────────────────┐
│   Frontend React    │
│  ┌───────────────┐ │
│  │ Display        │ │
│  │ - Scores       │ │
│  │ - Recommendations││
│  │ - Report       │ │
│  └───────────────┘ │
└─────────────────────┘
```

---

## Database Schema

### Entity Relationship Diagram

```
┌──────────┐
│   User   │
│──────────│
│ id (PK)  │
│ clerkId  │
│ email    │
│ role     │
└────┬─────┘
     │
     ├──────────────┬──────────────┐
     │              │              │
┌────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
│ Student  │  │  Teacher  │  │  College  │
│──────────│  │───────────│  │───────────│
│ id (PK)  │  │ id (PK)   │  │ id (PK)   │
│ userId   │  │ userId    │  │ userId    │
└────┬─────┘  └─────┬─────┘  └─────┬─────┘
     │              │              │
     │              │              │
     │        ┌─────▼─────┐       │
     │        │  Course   │       │
     │        │───────────│       │
     │        │ id (PK)   │       │
     │        │ teacherId │      │
     │        │ collegeId │      │
     │        └─────┬─────┘       │
     │              │              │
     │        ┌─────▼─────┐       │
     │        │Enrollment │       │
     │        │───────────│       │
     │        │studentId  │       │
     │        │courseId   │       │
     │        └───────────┘       │
     │                            │
┌────▼──────────┐         ┌──────▼──────────┐
│ Assignment    │         │CollegeEvaluation │
│───────────────│         │──────────────────│
│ id (PK)       │         │ id (PK)          │
│ courseId      │         │ collegeId         │
│ teacherId     │         │ status           │
└────┬──────────┘         │ scores           │
     │                    │ recommendations  │
┌─────▼──────────┐        └──────┬───────────┘
│Assignment      │                │
│Submission      │                │
│────────────────│                │
│ id (PK)        │        ┌───────▼────────┐
│ assignmentId   │        │EvaluationDoc   │
│ studentId      │        │EvaluationPhoto │
│ score          │        └────────────────┘
└────────────────┘

┌──────────────┐
│  Attendance  │
│──────────────│
│ id (PK)      │
│ studentId    │
│ courseId     │
│ date         │
│ status       │
└──────────────┘

┌──────────────┐
│  Feedback    │
│──────────────│
│ id (PK)      │
│ teacherId    │
│ studentId    │
│ content      │
└──────────────┘

┌──────────────┐
│   AIChat     │
│──────────────│
│ id (PK)      │
│ userId       │
│ role         │
│ messages     │
│ context      │
└──────────────┘
```

### Key Models

#### User

- Central user model synced with Clerk
- Roles: STUDENT, TEACHER, ADMIN, COLLEGE_ADMIN
- One-to-one relationships with Student, Teacher, or College

#### Student

- Student profile information
- Links to enrollments, assignments, attendance, feedback

#### Teacher

- Teacher profile and qualifications
- Manages courses and assignments
- Provides feedback to students

#### College

- Institution information
- Manages evaluations and courses

#### Course

- Course details and metadata
- Belongs to teacher and optionally college
- Has enrollments and assignments

#### Enrollment

- Many-to-many relationship between Student and Course
- Tracks enrollment status

#### Assignment

- Created by teachers for courses
- Has submissions from students

#### Attendance

- Daily attendance records
- Status: PRESENT, ABSENT, LATE, EXCUSED

#### Feedback

- Teacher feedback to students
- Types: GENERAL, ASSIGNMENT, PERFORMANCE, ATTENDANCE

#### CollegeEvaluation

- Evaluation process and results
- Stores scores, recommendations, analysis data
- Links to documents and photos

#### AIChat

- Chat session storage
- Stores message history and context
- Roles: STUDENT_MENTOR, TEACHER_COACH

---

## API Endpoints

### Authentication

All endpoints (except `/api/health`) require authentication via Bearer token in Authorization header.

### Student Endpoints

#### `GET /api/students/dashboard`

Get comprehensive student dashboard data.

**Response:**

```json
{
  "student": {
    "id": "uuid",
    "name": "Student Name",
    "email": "student@example.com"
  },
  "metrics": {
    "attendance": {
      "percentage": 94,
      "totalClasses": 50,
      "present": 47
    },
    "assignments": {
      "completed": 18,
      "total": 20,
      "percentage": 90
    }
  },
  "courses": [...],
  "recentFeedback": [...],
  "upcomingDeadlines": [...]
}
```

#### `GET /api/students/courses`

Get student's enrolled courses.

#### `GET /api/students/attendance`

Get attendance records with optional filters.

**Query Parameters:**

- `courseId` (optional)
- `startDate` (optional)
- `endDate` (optional)

### Teacher Endpoints

#### `GET /api/teachers/dashboard`

Get teacher dashboard data with class metrics.

#### `GET /api/teachers/students`

Get list of students for teacher's courses.

### College Endpoints

#### `GET /api/colleges/profile`

Get college profile information.

#### `POST /api/colleges/profile`

Create or update college profile.

**Body:**

```json
{
  "name": "College Name",
  "type": "engineering",
  "location": "City, State",
  "establishedYear": 2000,
  "accreditation": "NAAC A",
  "studentCount": 5000
}
```

#### `POST /api/colleges/evaluations`

Start a new evaluation.

#### `POST /api/colleges/evaluations/:id/documents`

Upload evaluation documents.

**Form Data:**

- `type`: Document type (ACCREDITATION, FACULTY_CREDENTIALS, etc.)
- `documents`: File(s)

#### `POST /api/colleges/evaluations/:id/photos`

Upload evaluation photos.

**Form Data:**

- `category`: Photo category (CLASSROOMS, LABORATORIES, etc.)
- `photos`: Image file(s)

#### `GET /api/colleges/evaluations/:id`

Get evaluation results.

#### `PATCH /api/colleges/evaluations/:id`

Update evaluation (for AI processing).

### Course Endpoints

#### `GET /api/courses`

Get all courses.

#### `POST /api/courses`

Create a new course (teacher only).

#### `POST /api/courses/:id/enroll`

Enroll in a course (student).

### Assignment Endpoints

#### `GET /api/assignments/course/:courseId`

Get assignments for a course.

#### `POST /api/assignments`

Create an assignment (teacher).

#### `POST /api/assignments/:id/submit`

Submit an assignment (student).

#### `PATCH /api/assignments/:id/grade/:submissionId`

Grade an assignment (teacher).

### Attendance Endpoints

#### `POST /api/attendance`

Mark attendance (teacher).

#### `GET /api/attendance/course/:courseId`

Get attendance for a course.

### Feedback Endpoints

#### `POST /api/feedback`

Create feedback (teacher).

#### `GET /api/feedback/student/:studentId`

Get feedback for a student.

### AI Chat Endpoints

#### `GET /api/ai-chat/session`

Get or create a chat session.

**Query Parameters:**

- `role`: STUDENT_MENTOR or TEACHER_COACH

#### `POST /api/ai-chat/session/:chatId/message`

Add a message to chat session.

#### `GET /api/ai-chat/session/:chatId`

Get chat history.

#### `POST /api/ai-chat/gemini`

Proxy for Gemini API (keeps API key secure).

### Health Check

#### `GET /api/health`

Check server and database status (no auth required).

---

## Authentication & Authorization

### Clerk Integration

#### Frontend

- **Clerk React SDK**: Provides authentication components
- **UserButton**: User profile and sign-out
- **ProtectedRoute**: Route protection wrapper
- **useUser**: Hook to access user data

#### Backend

- **Clerk SDK Node**: Server-side token verification
- **Auth Middleware**: Validates Bearer tokens
- **User Sync**: Automatically syncs users to database

### Authentication Flow

1. **User Signs In** → Clerk handles authentication
2. **Session Token Created** → Clerk generates JWT
3. **Token Stored** → In browser (Clerk manages)
4. **API Request** → Token sent in Authorization header
5. **Backend Verification** → Clerk SDK validates token
6. **User Data Retrieved** → From Clerk API
7. **Database Sync** → User upserted to database
8. **Request Proceeds** → With user context attached

### Role-Based Access Control

#### Roles

- **STUDENT**: Access to student portal
- **TEACHER**: Access to teacher portal
- **ADMIN**: Access to all portals
- **COLLEGE_ADMIN**: Access to college evaluation

#### Implementation

```typescript
// Frontend
<ProtectedRoute allowedRoles={["student", "admin"]}>
  <StudentPortal />
</ProtectedRoute>;

// Backend
router.post("/assignments", requireRole("teacher", "admin"), createAssignment);
```

### User Metadata

User roles stored in Clerk's `publicMetadata`:

```json
{
  "role": "student" // or "teacher", "admin", "college_admin"
}
```

---

## File Upload System

### Multer Configuration

#### Storage

- **Location**: `backend/uploads/` directory
- **Naming**: `{fieldname}-{timestamp}-{random}.{ext}`
- **Size Limit**: 10MB per file (configurable)

#### Supported File Types

- **Documents**: PDF, DOC, DOCX
- **Images**: JPEG, PNG, WebP

### Upload Endpoints

#### Document Upload

```
POST /api/colleges/evaluations/:id/documents
Content-Type: multipart/form-data

Form Data:
- type: DocumentType (ACCREDITATION, FACULTY_CREDENTIALS, etc.)
- documents: File[] (max 20 files)
```

#### Photo Upload

```
POST /api/colleges/evaluations/:id/photos
Content-Type: multipart/form-data

Form Data:
- category: PhotoCategory (CLASSROOMS, LABORATORIES, etc.)
- photos: File[] (max 50 files)
```

### File Storage Flow

1. **Client Uploads File** → Multipart form data
2. **Multer Middleware** → Validates and saves file
3. **File Metadata Saved** → To database (EvaluationDocument/EvaluationPhoto)
4. **File URL Stored** → `/uploads/{filename}`
5. **File Accessible** → Via static file serving

### File Processing

- Files stored on server filesystem
- Metadata stored in PostgreSQL
- File URLs used for AI analysis
- Can be extended to cloud storage (S3, etc.)

---

## Environment Variables

### Frontend (.env)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_GEMINI_API_KEY=your_gemini_key
VITE_API_URL=http://localhost:3001
```

### Backend (.env)

```env
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/eduvision
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=your_gemini_key
FRONTEND_URL=http://localhost:5173
MAX_FILE_SIZE=10485760
```

---

## Development Workflow

### Starting the Application

1. **Start Backend:**

   ```bash
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   npm run dev
   ```

2. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Seed database
npm run prisma:seed
```

### Testing API Endpoints

Use tools like:

- Postman
- Insomnia
- curl
- Thunder Client (VS Code extension)

Include Bearer token in Authorization header:

```
Authorization: Bearer <clerk_session_token>
```

---

## Security Considerations

### Authentication

- ✅ All API routes protected (except health check)
- ✅ Token verification on every request
- ✅ User data synced securely

### API Keys

- ⚠️ Gemini API key exposed in frontend (consider backend proxy)
- ✅ Clerk keys properly secured
- ✅ Database credentials in environment variables

### File Uploads

- ✅ File type validation
- ✅ File size limits
- ✅ Secure file storage
- ⚠️ Consider cloud storage for production

### CORS

- ✅ Configured for specific frontend URL
- ✅ Credentials enabled for cookies

---

## Future Enhancements

### Potential Improvements

1. **Backend AI Proxy**: Move Gemini API calls to backend for security
2. **Rate Limiting**: Add rate limiting to API endpoints
3. **Caching**: Implement Redis for frequently accessed data
4. **Cloud Storage**: Move file uploads to S3 or similar
5. **Real-time Updates**: Add WebSocket support for live updates
6. **Email Notifications**: Send notifications for deadlines, feedback
7. **Advanced Analytics**: More detailed performance analytics
8. **Mobile App**: React Native version
9. **Offline Support**: Service workers for offline functionality
10. **Multi-language**: Internationalization support

---

## Conclusion

EduVision AI Insights is a comprehensive educational platform that leverages modern web technologies and AI capabilities to provide personalized educational experiences. The system is designed with scalability, security, and user experience in mind.

### Key Strengths

- ✅ Modern tech stack (React, TypeScript, Prisma)
- ✅ Secure authentication (Clerk)
- ✅ AI-powered insights (Gemini)
- ✅ Comprehensive data model
- ✅ Role-based access control
- ✅ File upload support
- ✅ Real-time analytics

### Architecture Highlights

- Clean separation of concerns
- Type-safe development
- RESTful API design
- Component-based UI
- Middleware-based security
- Database-first approach

This documentation provides a complete overview of the system architecture, technology stack, user flows, and data flow. Use it as a reference for development, onboarding, and system understanding.
