<script setup lang="ts">
import { ref } from 'vue'

interface Technology {
  name: string
  version: string
  description: string
  link: string
}

const technologies = ref<Technology[]>([
  {
    name: 'Vue 3',
    version: '3.x',
    description: 'Progressive JavaScript framework',
    link: 'https://vuejs.org'
  },
  {
    name: 'TypeScript',
    version: '5.x',
    description: 'Typed superset of JavaScript',
    link: 'https://www.typescriptlang.org'
  },
  {
    name: 'Tailwind CSS',
    version: '3.x',
    description: 'Utility-first CSS framework',
    link: 'https://tailwindcss.com'
  },
  {
    name: 'Vite',
    version: '5.x',
    description: 'Next generation frontend tooling',
    link: 'https://vitejs.dev'
  }
])
</script>

<template>
  <div class="p-4 pb-8">
    <!-- Header -->
    <div class="mb-6">
      <div class="text-6xl mb-4 text-center">🍓</div>
      <h2 class="text-2xl font-bold text-gray-900 text-center mb-2">
        Strawberry App
      </h2>
      <p class="text-center text-gray-600 text-sm">
        A mobile-first Progressive Web App built with modern technologies
      </p>
    </div>
    
    <!-- Description Card -->
    <div class="card mb-6">
      <h3 class="font-bold text-gray-900 mb-2">About This App</h3>
      <p class="text-sm text-gray-700 leading-relaxed mb-3">
        This is a template for building mobile-first Progressive Web Apps using Vue 3, 
        TypeScript, and Tailwind CSS. It includes a responsive layout optimized for 
        mobile devices with touch-friendly interactions.
      </p>
      <div class="flex items-center space-x-2 text-xs text-gray-600">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>PWA Enabled</span>
      </div>
    </div>
    
    <!-- Technologies -->
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Built With</h3>
      <div class="space-y-3">
        <div 
          v-for="tech in technologies" 
          :key="tech.name"
          class="card hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-2 mb-1">
                <h4 class="font-semibold text-gray-900">{{ tech.name }}</h4>
                <span class="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {{ tech.version }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ tech.description }}</p>
            </div>
            <a 
              :href="tech.link" 
              target="_blank"
              rel="noopener noreferrer"
              class="ml-2 p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 no-tap-highlight"
              aria-label="Learn more"
            >
              <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Features List -->
    <div class="card">
      <h3 class="font-bold text-gray-900 mb-3">Key Features</h3>
      <ul class="space-y-2">
        <li class="flex items-start space-x-2">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm text-gray-700">Mobile-first responsive design</span>
        </li>
        <li class="flex items-start space-x-2">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm text-gray-700">Touch-optimized interactions</span>
        </li>
        <li class="flex items-start space-x-2">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm text-gray-700">Offline support via Service Worker</span>
        </li>
        <li class="flex items-start space-x-2">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm text-gray-700">Installable as a native app</span>
        </li>
        <li class="flex items-start space-x-2">
          <svg class="w-5 h-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="text-sm text-gray-700">Safe area support for notched devices</span>
        </li>
      </ul>
    </div>
  </div>
</template>
