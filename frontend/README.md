# Strawberry Frontend

A mobile-first Progressive Web App (PWA) built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 🍓 **Vue 3** with Composition API and `<script setup>`
- 📱 **Mobile-First Design** optimized for mobile devices
- 🎨 **Tailwind CSS** for rapid UI development
- 🔒 **TypeScript** for type safety
- ⚡ **Vite** for fast development and builds
- 📦 **PWA Support** with offline capabilities
- 🔄 **Auto-updating Service Worker**
- 📐 **Responsive Layout** with mobile navigation
- 🛡️ **Safe Area Insets** for notched devices

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Stylesheets and assets
│   │   └── main.css    # Tailwind CSS imports
│   ├── components/     # Vue components
│   │   └── WelcomeContent.vue
│   ├── layouts/        # Layout components
│   │   └── MobileLayout.vue
│   ├── App.vue         # Root component
│   ├── main.ts         # Application entry point
│   └── vite-env.d.ts   # TypeScript definitions
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
└── tsconfig.json       # TypeScript configuration
```

## PWA Features

The app includes:

- **Installable**: Can be installed on devices like a native app
- **Offline Support**: Works offline with cached assets
- **Auto-update**: Service worker updates automatically
- **Mobile Optimized**: Designed for mobile-first usage
- **Safe Areas**: Supports device notches and safe areas

## Mobile-First Design

The layout includes:

- Sticky header with mobile menu
- Bottom navigation for mobile devices
- Responsive grid layouts
- Touch-friendly interface
- Safe area insets for modern devices
- Optimized viewport settings

## Tech Stack

- **Vue 3.5+**: Progressive JavaScript framework
- **TypeScript 5.3+**: Type-safe JavaScript
- **Vite 5.0+**: Next-generation frontend tooling
- **Tailwind CSS 3.4+**: Utility-first CSS framework
- **vite-plugin-pwa**: PWA plugin for Vite
- **Workbox**: Service worker libraries

## License

ISC
