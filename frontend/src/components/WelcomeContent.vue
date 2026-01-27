<template>
  <div class="space-y-6">
    <!-- Welcome Card -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">
        Welcome to Strawberry! 🍓
      </h2>
      <p class="text-gray-600">
        This is a mobile-first PWA built with Vue 3, TypeScript, and Tailwind CSS.
      </p>
    </div>

    <!-- Feature Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="feature in features"
        :key="feature.title"
        class="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
      >
        <div class="text-4xl mb-3">{{ feature.icon }}</div>
        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          {{ feature.title }}
        </h3>
        <p class="text-sm text-gray-600">{{ feature.description }}</p>
      </div>
    </div>

    <!-- Install PWA Card -->
    <div
      v-if="showInstallPrompt"
      class="bg-purple-50 border-2 border-purple-200 rounded-lg p-6"
    >
      <div class="flex items-start justify-between">
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-purple-900 mb-2">
            📱 Install App
          </h3>
          <p class="text-sm text-purple-700 mb-4">
            Install Strawberry on your device for a better experience!
          </p>
          <button
            @click="installPWA"
            class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-sm font-medium"
          >
            Install Now
          </button>
        </div>
        <button
          @click="dismissInstall"
          class="text-purple-600 hover:text-purple-800 ml-4"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Responsive Image Grid -->
    <div>
      <h3 class="text-xl font-bold text-gray-900 mb-4">Gallery</h3>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        <div
          v-for="n in 8"
          :key="n"
          class="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"
        ></div>
      </div>
    </div>

    <!-- Info Section -->
    <div class="bg-gray-100 rounded-lg p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-3">
        Mobile-First Design Features
      </h3>
      <ul class="space-y-2 text-sm text-gray-700">
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Responsive layout optimized for mobile devices</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Touch-friendly interface with proper spacing</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>PWA support with offline capabilities</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>Safe area insets for notched devices</span>
        </li>
        <li class="flex items-start">
          <span class="text-green-500 mr-2">✓</span>
          <span>TypeScript for type safety</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '⚡',
    title: 'Fast',
    description: 'Built with Vite for lightning-fast development and builds.',
  },
  {
    icon: '📱',
    title: 'Mobile-First',
    description: 'Designed from the ground up for mobile devices.',
  },
  {
    icon: '🎨',
    title: 'Tailwind CSS',
    description: 'Utility-first CSS framework for rapid UI development.',
  },
  {
    icon: '🔒',
    title: 'TypeScript',
    description: 'Type-safe code with excellent developer experience.',
  },
  {
    icon: '📦',
    title: 'PWA Ready',
    description: 'Installable and works offline like a native app.',
  },
  {
    icon: '🚀',
    title: 'Vue 3',
    description: 'Modern Vue 3 with Composition API and script setup.',
  },
]

// BeforeInstallPromptEvent interface for PWA
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed'
    platform: string
  }>
  prompt(): Promise<void>
}

const showInstallPrompt = ref(false)
let deferredPrompt: BeforeInstallPromptEvent | null = null

onMounted(() => {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e as BeforeInstallPromptEvent
    showInstallPrompt.value = true
  })
})

const installPWA = async () => {
  if (!deferredPrompt) {
    return
  }

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    showInstallPrompt.value = false
  }

  deferredPrompt = null
}

const dismissInstall = () => {
  showInstallPrompt.value = false
}
</script>
