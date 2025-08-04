# Smart Announcement System

A full-stack web application built for Full-Stack Developer Technical Assessment. This project addresses the problem of students missing important announcements by providing a modern, real-time announcement system that's better than traditional email communication.

## Project Overview

**Time Limit:** 2 hours (strict)  
**Challenge:** Teachers reported that students keep missing important announcements and needed something better than email.

### Key Features Implemented

- **Teacher Features:**
- Create and publish announcements
- Real-time view of read statistics (e.g., "3/25 students read")
- Dashboard showing announcement performance

- **Student Features:**
- View all announcements in a modern interface
- Real-time notifications for new announcements
- Mark announcements as read with automatic tracking

- **Smart Features:**
- **Real-time notifications** via WebSocket - students get instant notifications when teachers post new announcements
- **Read tracking** - automatic tracking of who has read each announcement
- **Responsive design** - works perfectly on both desktop and mobile devices
- **Modern UI/UX** - clean, intuitive interface using shadcn/ui components

## Tech Stack

### Backend

- **Runtime:** Node.js with Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Session-based with secure cookies
- **Real-time:** Socket.IO for live notifications
- **Validation:** Zod for request/response validation
- **Password Hashing:** Argon2 for secure password storage

### Frontend

- **Framework:** Next.js 15 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI primitives)
- **State Management:** TanStack Query (React Query) for server state
- **Forms:** React Hook Form with Zod validation
- **Real-time:** Socket.IO client
- **Notifications:** Sonner for toast notifications
- **Icons:** Lucide React

### Shared

- **Type Safety:** Shared TypeScript types between frontend and backend
- **Validation:** Zod schemas for API contracts and form validation
- **Cross-platform:** Shared validation logic for both frontend and backend

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/Batocanin/smart-announcement-system.git
cd announcements-app
```

### 2. Install Dependencies

```bash
# Install root dependencies (required for shared Zod schemas)
npm install

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 3. Environment Setup

#### Backend Environment

Create `.env` file in the `backend` directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/announcements_db"

# Server
PORT=3000
NODE_ENV=development

# CORS
APPLICATION_URL="http://localhost:3000"
```

#### Frontend Environment

Create `.env` file in the `frontend` directory:

```env
# API
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"

# WebSocket
NEXT_PUBLIC_SOCKET_URL="http://localhost:4000"
```

### 4. Database Setup

```bash
# Navigate to backend
cd backend

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database with initial data
npm run seed
```

### 5. Start the Backend

```bash
# In a new terminal, navigate to backend
cd backend
# Install dependencies
npm install
npm run dev
```

### 6. Start the Frontend

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 7. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000

### Users

- Teachers and Students with role-based access
- Secure password hashing with Argon2
- Session management for authentication

### Announcements

- Title and content with rich text support
- Author tracking (teacher who created it)
- Timestamps for creation and updates

### Announcement Reads

- Tracks which students have read each announcement
- Automatic timestamp when marked as read
- Enables read statistics for teachers

### Sessions

- Secure session management
- Automatic expiration handling
- Cookie-based authentication

## Authentication & Security

- **Session-based authentication** with secure HTTP-only cookies
- **Role-based access control** (Teacher vs Student)
- **Password hashing** with Argon2
- **CORS protection** for cross-origin requests
- **Input validation** with Zod schemas
- **SQL injection protection** via Prisma ORM

## Smart Features Implemented

### 1. Real-time Notifications

- **WebSocket integration** with Socket.IO
- **Instant notifications** when teachers post new announcements
- **Live updates** without page refresh
- **Cross-tab synchronization** for multiple browser windows

### 2. Read Tracking System

- **Automatic tracking** of which students read each announcement
- **Real-time statistics** for teachers
- **Visual indicators** showing read status
- **Performance metrics** for announcement effectiveness

### 3. Modern UI/UX

- **Responsive design** that works on all devices
- **Dark/light theme** support
- **Skeleton loaders** for better perceived performance
- **Toast notifications** for user feedback
- **Modal dialogs** for detailed views

### 4. Developer Experience

- **Type safety** across the entire stack
- **Hot reload** for both frontend and backend
- **Shared types** between client and server
- **Comprehensive error handling**
- **Clean code architecture** with separation of concerns

## Mobile-First Design

The application is built with a mobile-first approach:

- **Responsive grid layout** that adapts to screen size
- **Touch-friendly interface** with proper button sizes
- **Optimized for mobile browsers**
- **Fast loading** with minimal bundle size

## Testing the Application

### Teacher Account

1. Login with teacher credentials from seed.ts
2. Create new announcements using the "Add Announcement" button
3. View read statistics for each announcement

### Student Account

1. Login with student credentials from seed.ts
2. View all announcements in the feed
3. Click on announcements to mark as read
4. Receive real-time notifications for new announcements

## Project Structure

```
announcements-app/
├── backend/                 # Express.js + TypeScript API
│   ├── src/
│   │   ├── components/     # Feature-based organization
│   │   │   ├── announcement/
│   │   │   └── auth/
│   │   ├── middlewares/    # Express middlewares
│   │   └── lib/           # Utilities and configurations
│   ├── prisma/            # Database schema and migrations
│   └── package.json
├── frontend/              # Next.js + TypeScript
│   ├── src/
│   │   ├── app/          # Next.js App Router
│   │   │   ├── (auth)/   # Authentication routes
│   │   │   └── (loggedIn)/ # Protected routes
│   │   ├── components/   # Reusable UI components
│   │   └── lib/          # Utilities and configurations
│   └── package.json
└── shared/               # Shared types and schemas
    ├── types/           # TypeScript type definitions
    └── schemas/         # Zod validation schemas
```

## Development Commands

### Backend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run seed         # Seed database with test data
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
```

## API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/session` - Get current session

### Announcements

- `GET /announcements` - Get paginated announcements
- `POST /announcements` - Create new announcement (teachers only)
- `POST /announcements/:id/read` - Mark announcement as read

## Contributing

This project was built as a technical assessment within a strict 2-hour time limit. The focus was on:

1. **Problem-solving approach** over perfect code
2. **Smart features** that improve upon email communication
3. **Real-time capabilities** for instant notifications
4. **Modern development practices** with TypeScript and modern tooling

## License

This project was created for Arcademy's Full-Stack Developer Technical Assessment.

---

**Built with ❤️ using Next.js, Express.js, TypeScript, Prisma, and Socket.IO**
