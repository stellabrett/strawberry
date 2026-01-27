<script setup lang="ts">
import { ref } from 'vue'

interface Feature {
  icon: string
  title: string
  description: string
}

const features = ref<Feature[]>([
  {
    icon: '📱',
    title: 'Mobile-First',
    description: 'Optimized for mobile devices with touch-friendly interactions'
  },
  {
    icon: '⚡',
    title: 'Fast & Responsive',
    description: 'Built with Vue 3 and Vite for lightning-fast performance'
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    description: 'Beautiful, customizable design with utility-first CSS'
  },
  {
    icon: '📦',
    title: 'PWA Ready',
    description: 'Installable app with offline support and push notifications'
  }
])

const showWelcome = ref(true)
</script>

<template>
  <div class="p-4 pb-8">
    <!-- Welcome Banner -->
    <Transition name="slide-up">
      <div 
        v-if="showWelcome"
        class="card mb-6 bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <h2 class="text-lg font-bold text-gray-900 mb-1">Welcome! 👋</h2>
            <p class="text-sm text-gray-700">
              Your mobile-first PWA is ready to use
            </p>
          </div>
          <button
            @click="showWelcome = false"
            class="p-1 rounded-lg hover:bg-pink-100 active:bg-pink-200 no-tap-highlight"
            aria-label="Close"
          >
            <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button class="btn btn-primary w-full">
          Get Started
        </button>
      </div>
    </Transition>
    
    <!-- Features Grid -->
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Features</h3>
      <div class="grid grid-cols-1 xs:grid-cols-2 gap-4">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="card hover:shadow-md transition-shadow duration-200"
        >
          <div class="text-3xl mb-2">{{ feature.icon }}</div>
          <h4 class="font-semibold text-gray-900 mb-1">{{ feature.title }}</h4>
          <p class="text-sm text-gray-600">{{ feature.description }}</p>
        </div>
      </div>
    </div>
    
    <!-- Quick Actions -->
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
      <div class="space-y-2">
        <button class="btn btn-primary w-full flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <span>Create New Item</span>
        </button>
        <button class="btn btn-secondary w-full flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Search</span>
        </button>
      </div>
    </div>
    
    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-3">
      <div class="card text-center">
        <div class="text-2xl font-bold text-blue-600">24</div>
        <div class="text-xs text-gray-600 mt-1">Items</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-green-600">12</div>
        <div class="text-xs text-gray-600 mt-1">Active</div>
      </div>
      <div class="card text-center">
        <div class="text-2xl font-bold text-purple-600">98%</div>
        <div class="text-xs text-gray-600 mt-1">Score</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
</style>
