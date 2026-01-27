<script setup lang="ts">
import { ref } from 'vue'

interface Setting {
  id: string
  label: string
  description: string
  type: 'toggle' | 'select'
  value: boolean | string
  options?: string[]
}

const settings = ref<Setting[]>([
  {
    id: 'notifications',
    label: 'Push Notifications',
    description: 'Receive notifications about updates',
    type: 'toggle',
    value: true
  },
  {
    id: 'darkMode',
    label: 'Dark Mode',
    description: 'Use dark theme (coming soon)',
    type: 'toggle',
    value: false
  },
  {
    id: 'offline',
    label: 'Offline Mode',
    description: 'Cache content for offline access',
    type: 'toggle',
    value: true
  },
  {
    id: 'language',
    label: 'Language',
    description: 'Select your preferred language',
    type: 'select',
    value: 'en',
    options: ['en', 'es', 'fr', 'de']
  }
])

const toggleSetting = (id: string) => {
  const setting = settings.value.find(s => s.id === id)
  if (setting && setting.type === 'toggle') {
    setting.value = !setting.value
  }
}

const updateSetting = (id: string, value: string) => {
  const setting = settings.value.find(s => s.id === id)
  if (setting) {
    setting.value = value
  }
}
</script>

<template>
  <div class="p-4 pb-8">
    <!-- Header -->
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
      <p class="text-sm text-gray-600">
        Customize your app experience
      </p>
    </div>
    
    <!-- Settings List -->
    <div class="space-y-3 mb-6">
      <div 
        v-for="setting in settings" 
        :key="setting.id"
        class="card"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1 mr-3">
            <h3 class="font-semibold text-gray-900 mb-1">{{ setting.label }}</h3>
            <p class="text-sm text-gray-600">{{ setting.description }}</p>
          </div>
          
          <!-- Toggle Switch -->
          <button
            v-if="setting.type === 'toggle'"
            @click="toggleSetting(setting.id)"
            class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none no-tap-highlight"
            :class="setting.value ? 'bg-blue-600' : 'bg-gray-200'"
            role="switch"
            :aria-checked="!!setting.value"
          >
            <span
              class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              :class="setting.value ? 'translate-x-5' : 'translate-x-0'"
            />
          </button>
          
          <!-- Select Dropdown -->
          <select
            v-else-if="setting.type === 'select'"
            :value="setting.value"
            @change="updateSetting(setting.id, ($event.target as HTMLSelectElement).value)"
            class="block rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option 
              v-for="option in setting.options" 
              :key="option"
              :value="option"
            >
              {{ option.toUpperCase() }}
            </option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- Account Section -->
    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-900 mb-4">Account</h3>
      <div class="space-y-2">
        <button class="card w-full text-left hover:bg-gray-50 active:bg-gray-100 transition-colors">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center">
                <span class="text-white text-lg">👤</span>
              </div>
              <div>
                <div class="font-semibold text-gray-900">Guest User</div>
                <div class="text-sm text-gray-600">guest@example.com</div>
              </div>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>
      </div>
    </div>
    
    <!-- App Info -->
    <div class="card">
      <h3 class="font-bold text-gray-900 mb-3">App Information</h3>
      <div class="space-y-2 text-sm">
        <div class="flex justify-between">
          <span class="text-gray-600">Version</span>
          <span class="text-gray-900 font-medium">1.0.0</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Build</span>
          <span class="text-gray-900 font-medium">2024.01</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Cache Size</span>
          <span class="text-gray-900 font-medium">2.4 MB</span>
        </div>
      </div>
    </div>
    
    <!-- Action Buttons -->
    <div class="mt-6 space-y-2">
      <button class="btn btn-secondary w-full">
        Clear Cache
      </button>
      <button class="btn w-full text-red-600 hover:bg-red-50 active:bg-red-100">
        Sign Out
      </button>
    </div>
  </div>
</template>
