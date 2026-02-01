import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '../stores/auth'

export const authGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const authStore = useAuthStore()

  // Load user if token exists but user is not loaded
  if (authStore.token && !authStore.hasUser) {
    await authStore.loadUser()
  }

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const isAuthPage = to.matched.some((record) => record.meta.isAuthPage)

  if (requiresAuth) {
    if (authStore.isAuthenticated) {
      next()
    } else {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    }
  } else if (isAuthPage) {
    if (authStore.isAuthenticated) {
      next({ name: 'Home' })
    } else {
      next()
    }
  } else {
    next()
  }
}

export const publicGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  next()
}
