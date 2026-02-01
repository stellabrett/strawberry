<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const agreeToTerms = ref(false)

const handleRegister = async () => {
  if (!name.value || !email.value || !password.value || !passwordConfirmation.value || !agreeToTerms.value) {
    return
  }

  if (password.value !== passwordConfirmation.value) {
    authStore.error = 'Passwörter stimmen nicht überein'
    return
  }

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value,
    })

    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Registration failed:', error)
  }
}

const goToLogin = () => {
  router.push({ name: 'Login' })
}

const goToInviteRegister = () => {
  router.push({ name: 'InviteRegister' })
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Registrierung</h1>
      <p class="text-gray-600 mb-8">Erstellen Sie ein neues Konto</p>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            placeholder="Max Mustermann"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="name@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Passwort</label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-10"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-2.5 text-gray-600 hover:text-gray-800"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
        </div>

        <div>
          <label for="password-confirm" class="block text-sm font-medium text-gray-700 mb-2">Passwort wiederholen</label>
          <input
            id="password-confirm"
            v-model="passwordConfirmation"
            :type="showPassword ? 'text' : 'password'"
            required
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            v-model="agreeToTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-700">
            Ich akzeptiere die
            <a href="#" class="text-indigo-600 hover:text-indigo-700 font-semibold">Bedingungen</a>
          </label>
        </div>

        <button
          type="submit"
          :disabled="authStore.isLoading"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {{ authStore.isLoading ? 'Wird registriert...' : 'Registrieren' }}
        </button>
      </form>

      <div v-if="authStore.error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700 text-sm">{{ authStore.error }}</p>
      </div>

      <div class="mt-6 space-y-3 text-center text-sm">
        <p class="text-gray-600">
          Haben Sie bereits ein Konto?
          <button
            @click="goToLogin"
            class="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Jetzt anmelden
          </button>
        </p>
        <p class="text-gray-600 border-t pt-3">
          Haben Sie einen Einladungs-Code?
          <button
            @click="goToInviteRegister"
            class="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Mit Einladung registrieren
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
