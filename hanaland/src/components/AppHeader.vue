<script setup lang="ts">
import { onMounted } from 'vue'
import { useNotificationStore } from '@stores/notification'
import { useAuthStore } from '@stores/auth'
import UserMenu from './UserMenu.vue'
import LoginModal from './LoginModal.vue'

const notification = useNotificationStore()
const auth = useAuthStore()

onMounted(() => {
  if (auth.isAuthenticated) {
    notification.fetchUnreadCount()
  }
})
</script>

<template>
  <header class="bg-neutral shadow-sm text-neutral-content">
    <div class="navbar mx-auto max-w-5xl px-2">
      <div class="flex-1">
        <RouterLink
          to="/topics"
          class="flex h-14 w-12 items-center justify-center text-xl no-underline"
        >
          💎
        </RouterLink>
      </div>

      <div class="flex items-center gap-2">
        <RouterLink
          to="/notifications"
          class="btn btn-ghost relative h-14 px-3 text-neutral-content/70 hover:text-neutral-content"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0" />
          </svg>
          <span
            v-if="notification.unreadCount > 0"
            class="badge badge-error badge-xs absolute right-1 top-1"
          >
            {{ notification.unreadCount > 99 ? '99+' : notification.unreadCount }}
          </span>
        </RouterLink>

        <UserMenu />
      </div>
    </div>
  </header>

  <LoginModal />
</template>
