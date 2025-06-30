# Kaplita - Water Tracker App

## Overview

Kaplita is a beautiful matrioshka-themed water tracking application built as a full-stack web app. The application helps users track their daily water consumption with an intuitive glass-filling interface and celebrates when users reach their hydration goals.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React hooks with local state
- **Animations**: Framer Motion for smooth interactions
- **Routing**: Wouter for lightweight client-side routing
- **Data Fetching**: TanStack Query (React Query) for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (via Neon Database)
- **Session Management**: PostgreSQL-based sessions
- **Build Tool**: Vite for frontend, esbuild for backend

### UI Component System
- **Base**: shadcn/ui components built on Radix UI primitives
- **Theme**: New York style with custom Kaplita color scheme
- **Responsive**: Mobile-first design with responsive breakpoints

## Key Components

### Frontend Components
1. **MatrioshkaLogo** - Detailed SVG matrioshka doll in water drop shape with face, nested layers, and traditional patterns
2. **WaterGlass** - Realistic 3D glass with gradients, highlights, shadows, and smooth water animation
3. **ProgressRing** - Circular progress indicator showing daily progress
4. **Home Page** - Main application interface with 8-glass tracking system

### Backend Structure
- **Routes** - RESTful API endpoints (currently placeholder)
- **Storage** - Abstracted storage interface with in-memory implementation
- **Database Schema** - User management with Drizzle ORM

### Database Schema
```typescript
users: {
  id: serial (primary key)
  username: text (unique, not null)
  password: text (not null)
}
```

## Data Flow

1. **Client-Side State**: Glass states managed locally with React useState
2. **Progress Calculation**: Consumed glasses tracked and percentage calculated
3. **Celebration Logic**: Triggers when all 8 glasses are consumed
4. **Toast Notifications**: Success feedback via shadcn/ui toast system
5. **Animation System**: Framer Motion handles glass interactions and celebrations

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, ReactDOM, React Query
- **UI/UX**: Radix UI primitives, Framer Motion, Lucide icons
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Backend**: Express.js, Drizzle ORM, Neon Database client
- **Development**: TypeScript, Vite, ESBuild

### Design System
- **Component Library**: shadcn/ui (New York variant)
- **Icons**: Lucide React
- **Fonts**: Inter font family
- **Colors**: Custom Kaplita theme with blue/red/gold palette

## Deployment Strategy

### Development
- **Frontend**: Vite dev server with HMR
- **Backend**: tsx for TypeScript execution
- **Database**: Drizzle migrations via `db:push` command

### Production Build
- **Frontend**: Vite build to `dist/public`
- **Backend**: esbuild bundle to `dist/index.js`
- **Deployment**: Node.js production server

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Environment mode (development/production)

## Changelog
- June 30, 2025. Initial setup
- June 30, 2025. Enhanced MatrioshkaLogo with detailed SVG matrioshka doll design featuring face, nested layers, and traditional patterns
- June 30, 2025. Improved WaterGlass component with realistic 3D appearance, gradients, highlights, and shadows
- June 30, 2025. Flipped matrioshka logo orientation to traditional shape (narrow head at top, wider body below)
- June 30, 2025. Added daily water tracking with persistent storage and API integration

## User Preferences

Preferred communication style: Simple, everyday language.