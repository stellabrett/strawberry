<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { authService, type InviteValidationResponse } from '../services/authService'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const inviteCode = ref((route.query.code as string) || '')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const isValidating = ref(false)
const inviteInfo = ref<InviteValidationResponse | null>(null)
const agreeToTerms = ref(false)

const isCodeValid = computed(() => inviteInfo.value?.valid ?? false)
const inviteeEmail = computed(() => inviteInfo.value?.email || '')
const inviteeName = computed(() => inviteInfo.value?.name || '')

const validateInviteCode = async () => {
  if (!inviteCode.value.trim()) {
    return
  }

  isValidating.value = true
  try {
    const response = await authService.validateInviteCode(inviteCode.value)
    inviteInfo.value = response
    if (!response.valid) {
      authStore.error = response.message
    }
  } catch (error: any) {
    authStore.error = error.response?.data?.message || 'Fehler bei der Code-Validierung'
    inviteInfo.value = null
  } finally {
    isValidating.value = false
  }
}

const handleRegister = async () => {
  if (!inviteCode.value || !password.value || !passwordConfirmation.value || !agreeToTerms.value) {
    return
  }

  if (password.value !== passwordConfirmation.value) {
    authStore.error = 'Passwörter stimmen nicht überein'
    return
  }

  if (!isCodeValid.value) {
    authStore.error = 'Einladungs-Code ist ungültig'
    return
  }

  try {
    const name = inviteeName.value || inviteeEmail.value.split('@')[0]
    await authStore.register({
      name,
      email: inviteeEmail.value,
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

const goToRegister = () => {
  router.push({ name: 'Register' })
}

onMounted(() => {
  if (inviteCode.value) {
    validateInviteCode()
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Einladung annehmen</h1>
      <p class="text-gray-600 mb-8">Registrieren Sie sich mit Ihrem Einladungs-Code</p>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <!-- Invite Code Input -->
        <div>
          <label for="code" class="block text-sm font-medium text-gray-700 mb-2">Einladungs-Code</label>
          <div class="flex gap-2">
            <input
              id="code"
              v-model="inviteCode"
              type="text"
              placeholder="z.B. INV-ABC123XYZ"
              :disabled="isCodeValid"
              class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
            />
            <button
              type="button"
              @click="validateInviteCode"
              :disabled="isValidating || !inviteCode || isCodeValid"
              class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200 whitespace-nowrap"
            >
              {{ isValidating ? 'Prüfe...' : 'Prüfen' }}
            </button>
          </div>
        </div>

        <!-- Invite Status -->
        <div
          v-if="inviteInfo"
          :class="[
            'p-3 rounded-lg border',
            isCodeValid
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          ]"
        >
          <p :class="isCodeValid ? 'text-green-700' : 'text-red-700'" class="text-sm">
            {{ isCodeValid ? '✓ Code gültig!' : '✗ ' }}{{ inviteInfo.message }}
          </p>
          <div v-if="isCodeValid" class="mt-2 text-sm text-green-700">
            <p><strong>E-Mail:</strong> {{ inviteeEmail }}</p>
            <p v-if="inviteeName"><strong>Name:</strong> {{ inviteeName }}</p>
          </div>
        </div>

        <!-- Email Display (Read-only) -->
        <div v-if="isCodeValid">
          <label class="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
          <input
            type="email"
            :value="inviteeEmail"
            disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
          />
        </div>

        <!-- Name Display (Read-only) -->
        <div v-if="isCodeValid && inviteeName">
          <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
          <input
            type="text"
            :value="inviteeName"
            disabled
            class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
          />
        </div>

        <!-- Password -->
        <div v-if="isCodeValid">
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

        <!-- Password Confirmation -->
        <div v-if="isCodeValid">
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

        <!-- Terms -->
        <div v-if="isCodeValid" class="flex items-center">
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

        <!-- Register Button -->
        <button
          type="submit"
          :disabled="authStore.isLoading || !isCodeValid || !password || !passwordConfirmation"
          class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {{ authStore.isLoading ? 'Wird registriert...' : 'Registrieren' }}
        </button>
      </form>

      <!-- Error Message -->
      <div v-if="authStore.error && !inviteInfo?.valid" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p class="text-red-700 text-sm">{{ authStore.error }}</p>
      </div>

      <!-- Links -->
      <div class="mt-6 space-y-2 text-center text-sm">
        <p class="text-gray-600">
          Haben Sie einen Code?
          <button
            @click="goToRegister"
            class="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Normale Registrierung
          </button>
        </p>
        <p class="text-gray-600">
          Haben Sie bereits ein Konto?
          <button
            @click="goToLogin"
            class="text-indigo-600 hover:text-indigo-700 font-semibold"
          >
            Jetzt anmelden
          </button>
        </p>
      </div>
    </div>
  </div>
</template>
