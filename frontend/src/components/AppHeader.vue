<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

interface Emits {
  (e: 'logout'): void
}

const emit = defineEmits<Emits>()
const router = useRouter()
const authStore = useAuthStore()
const isMenuOpen = ref(false)
const currentTime = ref('')
let intervalId: number | null = null

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onMounted(() => {
  updateTime()
  intervalId = setInterval(updateTime, 60000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const goToProfile = () => {
  router.push({ name: 'Settings' })
  isMenuOpen.value = false
}

const handleLogout = () => {
  isMenuOpen.value = false
  emit('logout')
}
</script>

<template>
  <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div class="px-4 py-3">
      <div class="flex items-center justify-between">
        <!-- Logo/Brand -->
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 rounded-lg flex items-center justify-center">
            <span class="text-white text-xl">🍓</span>
          </div>
          <h1 class="text-xl font-bold text-gray-900">Strawberry</h1>
        </div>
        
        <!-- Right side - user info and menu -->
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600 hidden xs:block">{{ currentTime }}</span>
          <div v-if="authStore.hasUser" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {{ authStore.user?.name?.charAt(0).toUpperCase() }}
            </div>
          </div>
          <button 
            @click="toggleMenu"
            class="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 no-tap-highlight"
            aria-label="Menu"
          >
            <svg 
              class="w-6 h-6 text-gray-700" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Dropdown menu -->
    <Transition name="slide-down">
      <div 
        v-if="isMenuOpen" 
        class="border-t border-gray-200 bg-white"
      >
        <nav class="px-4 py-2">
          <button
            @click="goToProfile"
            class="w-full text-left block py-3 text-gray-700 hover:text-indigo-600 active:bg-gray-50 rounded px-2"
          >
            👤 Profil
          </button>
          <button
            @click="handleLogout"
            class="w-full text-left block py-3 text-red-600 hover:bg-red-50 active:bg-red-100 rounded px-2 font-semibold"
          >
            🚪 Abmelden
          </button>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.2s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
