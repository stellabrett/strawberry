import { createApp } from 'vue'
import './assets/main.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // The service worker is automatically registered by vite-plugin-pwa
  })
}
