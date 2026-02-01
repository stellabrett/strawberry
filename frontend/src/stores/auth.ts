import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type User, type LoginCredentials } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const hasUser = computed(() => !!user.value)

  async function login(credentials: LoginCredentials) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.login(credentials)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    isLoading.value = true
    try {
      await authService.logout()
    } finally {
      user.value = null
      token.value = null
      localStorage.removeItem('auth_token')
      isLoading.value = false
      error.value = null
    }
  }

  async function register(data: {
    name: string
    email: string
    password: string
    password_confirmation: string
  }) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.register(data)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function registerWithInvite(data: {
    code: string
    name: string
    password: string
    password_confirmation: string
  }) {
    isLoading.value = true
    error.value = null
    try {
      const response = await authService.registerWithInvite(data)
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      return response
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Invite registration failed'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function loadUser() {
    if (!token.value) {
      return
    }

    isLoading.value = true
    try {
      user.value = await authService.getCurrentUser()
    } catch (err: any) {
      console.error('Failed to load user:', err)
      token.value = null
      user.value = null
      localStorage.removeItem('auth_token')
    } finally {
      isLoading.value = false
    }
  }

  function setToken(newToken: string) {
    token.value = newToken
    localStorage.setItem('auth_token', newToken)
  }

  function clearAuth() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    error.value = null
  }

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    hasUser,
    login,
    logout,
    register,
    registerWithInvite,
    loadUser,
    setToken,
    clearAuth,
  }
})
