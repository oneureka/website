import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { rest } from '@js-sdk'
import type { User } from '@api-client'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<User | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)

  function init() {
    const saved = localStorage.getItem('access_token')
    if (saved) {
      token.value = saved
      rest.setToken(saved)
    }
  }

  async function login(username: string, password: string) {
    loading.value = true
    try {
      const { token: t } = await rest.request(
        { method: 'POST', url: '/sessions' },
        { data: { username, password } },
      )
      token.value = t
      localStorage.setItem('access_token', t)
      rest.setToken(t)
      await fetchCurrentUser()
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('access_token')
    rest.revokeToken()
  }

  async function fetchCurrentUser() {
    try {
      user.value = await rest.users.current()
    } catch {
      user.value = null
    }
  }

  return { token, user, loading, isAuthenticated, init, login, logout, fetchCurrentUser }
})
