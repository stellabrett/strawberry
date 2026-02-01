# Vue 3 Authentication Flow

## Setup

### 1. Installation
```bash
cd frontend
npm install
```

### 2. Environment Variables
Erstelle eine `.env.local` Datei basierend auf `.env.example`:
```bash
VITE_API_URL=http://localhost:8000/api
```

## Features

### Authentication Service (`src/services/authService.ts`)
- Login
- Register
- Logout
- Token refresh
- Get current user

### Auth Store (Pinia) (`src/stores/auth.ts`)
- Reactive authentication state
- Token management with localStorage persistence
- User state management
- Loading and error handling

### API Client (`src/services/api.ts`)
- Axios instance with JWT interceptors
- Automatic token injection in requests
- Token expiration handling
- Redirect to login on 401 errors

### Route Guards (`src/router/guards.ts`)
- `authGuard`: Protects authenticated routes
- Route metadata: `requiresAuth`, `isAuthPage`
- Automatic redirect to login for protected routes
- Redirect back to original page after login

### Router (`src/router/index.ts`)
Protected routes:
- `/` (Home)
- `/about` (About)
- `/settings` (Settings)

Public/Auth routes:
- `/login` (LoginPage)
- `/register` (RegisterPage)

## Components

### LoginPage (`src/views/LoginPage.vue`)
- Email und Passwort Eingabe
- Passwort-Sichtbarkeit Toggle
- Error-Handling
- Link zu Register-Seite
- Redirect nach erfolgreichem Login

### RegisterPage (`src/views/RegisterPage.vue`)
- Name, Email, Passwort Eingabe
- Passwort-Bestätigung
- Terms of Service Akzeptanz
- Error-Handling
- Link zu Login-Seite

## Flow Diagram

```
App Start
    ↓
Check stored token
    ↓
Load user if token exists
    ↓
Route Guard checks authentication
    ↓
Unauthenticated → Login/Register Pages
    ↓
Authenticated → Protected Pages
```

## API Endpoints Expected

- `POST /api/auth/login` - Login mit Email/Password
- `POST /api/auth/register` - Register neuer User
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/refresh` - Refresh token

## Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Token Storage

- JWT Token wird in `localStorage` gespeichert als `auth_token`
- Token wird automatisch bei 401 Response gelöscht
- Token wird automatisch in jedem Request hinzugefügt
