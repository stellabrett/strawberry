<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppHeader from '../components/AppHeader.vue'
import AppNav from '../components/AppNav.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  await authStore.logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="flex flex-col h-screen bg-gray-50">
    <!-- Header with safe area for notch -->
    <div class="safe-area-top bg-white shadow-sm">
      <AppHeader @logout="handleLogout" />
    </div>

    <!-- Main content area - scrollable -->
    <main class="flex-1 overflow-y-auto">
      <RouterView v-slot="{ Component }" class="w-full">
        <Transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </main>

    <!-- Bottom navigation with safe area -->
    <AppNav class="safe-area-bottom bg-white border-t border-gray-200" />
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
