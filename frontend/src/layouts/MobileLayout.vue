<template>
  <div class="min-h-full flex flex-col">
    <!-- Header - Sticky on mobile -->
    <header class="sticky top-0 z-50 bg-white shadow-sm safe-area-inset-top">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo/Title -->
          <div class="flex items-center">
            <h1 class="text-xl sm:text-2xl font-bold text-purple-600">
              🍓 Strawberry
            </h1>
          </div>

          <!-- Navigation - Hidden on mobile, shown on larger screens -->
          <nav class="hidden md:flex space-x-4">
            <a
              v-for="item in navItems"
              :key="item.name"
              :href="item.href"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors"
            >
              {{ item.name }}
            </a>
          </nav>

          <!-- Mobile menu button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-purple-600 hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg
              v-if="!mobileMenuOpen"
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              v-else
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
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

      <!-- Mobile menu, show/hide based on menu state -->
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.href"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
          >
            {{ item.name }}
          </a>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 overflow-y-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <slot />
      </div>
    </main>

    <!-- Bottom Navigation for mobile (optional, can be toggled) -->
    <nav
      v-if="showBottomNav"
      class="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom z-50"
    >
      <div class="grid grid-cols-4 gap-1 px-2 py-2">
        <button
          v-for="item in bottomNavItems"
          :key="item.name"
          class="flex flex-col items-center justify-center p-2 rounded-lg text-gray-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <span class="text-2xl mb-1">{{ item.icon }}</span>
          <span class="text-xs">{{ item.name }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface NavItem {
  name: string
  href: string
  icon?: string
}

const mobileMenuOpen = ref(false)
const showBottomNav = ref(true)

const navItems: NavItem[] = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Contact', href: '#' },
]

const bottomNavItems: NavItem[] = [
  { name: 'Home', href: '#', icon: '🏠' },
  { name: 'Search', href: '#', icon: '🔍' },
  { name: 'Add', href: '#', icon: '➕' },
  { name: 'Profile', href: '#', icon: '👤' },
]
</script>
