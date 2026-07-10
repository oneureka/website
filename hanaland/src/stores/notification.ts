import { defineStore } from 'pinia'
import { ref } from 'vue'
import { rest } from '@js-sdk'
import type { Notification } from '@api-client'

export const useNotificationStore = defineStore('notification', () => {
  const unreadCount = ref(0)
  const notifications = ref<Notification[]>([])
  const loading = ref(false)

  async function fetchUnreadCount() {
    try {
      const data = await rest.notifications.unreadCount()
      unreadCount.value = data.count
    } catch {
      unreadCount.value = 0
    }
  }

  async function fetchList(params?: { offset?: number; limit?: number }) {
    loading.value = true
    try {
      const data = await rest.notifications.list(params)
      notifications.value = data.notifications
    } finally {
      loading.value = false
    }
  }

  async function markAsRead(ids: number[]) {
    await rest.notifications.markAsRead({ ids })
    unreadCount.value = Math.max(0, unreadCount.value - ids.length)
  }

  async function markAllAsRead() {
    await rest.notifications.markAsRead({})
    unreadCount.value = 0
  }

  async function remove(id: number) {
    await rest.notifications.destroy({ id })
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  async function clearAll() {
    await rest.notifications.clear()
    notifications.value = []
    unreadCount.value = 0
  }

  return { unreadCount, notifications, loading, fetchUnreadCount, fetchList, markAsRead, markAllAsRead, remove, clearAll }
})
