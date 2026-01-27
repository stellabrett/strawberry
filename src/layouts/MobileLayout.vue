<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppNav from '../components/AppNav.vue'
import HomePage from '../views/HomePage.vue'
import AboutPage from '../views/AboutPage.vue'
import SettingsPage from '../views/SettingsPage.vue'

const currentView = ref<'home' | 'about' | 'settings'>('home')

const navigateTo = (view: 'home' | 'about' | 'settings') => {
  currentView.value = view
}
</script>

<template>
  <div class="flex flex-col h-screen bg-gray-50">
    <!-- Header with safe area for notch -->
    <AppHeader class="safe-area-top" />
    
    <!-- Main content area - scrollable -->
    <main class="flex-1 overflow-y-auto">
      <Transition name="fade" mode="out-in">
        <HomePage v-if="currentView === 'home'" />
        <AboutPage v-else-if="currentView === 'about'" />
        <SettingsPage v-else-if="currentView === 'settings'" />
      </Transition>
    </main>
    
    <!-- Bottom navigation with safe area -->
    <AppNav 
      :current-view="currentView" 
      @navigate="navigateTo"
      class="safe-area-bottom"
    />
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
