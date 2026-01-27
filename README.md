# 🍓 Strawberry - Mobile-First PWA

A modern, mobile-first Progressive Web App built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 📱 **Mobile-First Design** - Optimized for mobile devices with touch-friendly interactions
- ⚡ **Fast & Responsive** - Built with Vue 3 and Vite for lightning-fast performance
- 🎨 **Tailwind CSS** - Beautiful, customizable design with utility-first CSS
- 📦 **PWA Ready** - Installable app with offline support and service worker
- 🔒 **TypeScript** - Type-safe development experience
- 🎯 **Safe Area Support** - Handles notched devices with safe area insets

## Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Typed superset of JavaScript
- **Tailwind CSS 3** - Utility-first CSS framework
- **Vite** - Next generation frontend tooling
- **vite-plugin-pwa** - Zero-config PWA plugin for Vite

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
strawberry/
├── public/               # Static assets
├── src/
│   ├── components/      # Reusable Vue components
│   │   ├── AppHeader.vue
│   │   └── AppNav.vue
│   ├── layouts/         # Layout components
│   │   └── MobileLayout.vue
│   ├── views/           # Page components
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   └── SettingsPage.vue
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles with Tailwind
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
```

## Layout Features

### Mobile-Optimized Layout

- **Sticky Header** - Brand logo, time display, and menu button
- **Scrollable Content Area** - Main content with smooth transitions
- **Bottom Navigation** - Fixed bottom navigation with Home, About, and Settings tabs
- **Safe Area Insets** - Supports devices with notches and rounded corners

### Design System

- Minimum touch target size of 44px (iOS recommended)
- Active scale feedback on button interactions
- Smooth page transitions
- Card-based UI components
- Responsive grid layouts

## PWA Configuration

The app includes:

- **Service Worker** - Automatic offline caching
- **Web App Manifest** - Install prompt and app metadata
- **Workbox** - Smart caching strategies
- **Runtime Caching** - Cache external resources like fonts

## Development

The project uses:

- Vue 3 Composition API with `<script setup>`
- TypeScript for type safety
- Tailwind CSS utilities for styling
- Mobile-first responsive design approach

## Browser Support

- Modern browsers with ES2020+ support
- Mobile Safari (iOS 12+)
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)

## License

ISC