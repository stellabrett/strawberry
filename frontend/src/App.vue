<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import { onMounted } from 'vue'
import MobileLayout from './layouts/MobileLayout.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  // Load user on app startup if token exists
  if (authStore.token && !authStore.hasUser) {
    await authStore.loadUser()
  }
})
</script>

<template>
  <MobileLayout />
</template>
