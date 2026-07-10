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
  <header class="bg-neutral text-neutral-content border-b-2 border-dashed border-accent">
    <div class="mx-auto flex h-12 max-w-5xl items-center px-2">
      <div class="flex items-center">
        <RouterLink
          to="/topics"
          class="label-mono flex h-12 items-center px-3 no-underline tracking-wider text-neutral-content/90 hover:text-neutral-content"
        >
          HANALAND
        </RouterLink>
        <div class="mx-2 h-5 w-px bg-neutral-content/20" />
        <RouterLink
          to="/topics"
          class="label-mono flex h-12 items-center px-2 no-underline text-neutral-content/60 hover:text-neutral-content"
        >
          TOPICS
        </RouterLink>
        <RouterLink
          to="/nodes"
          class="label-mono flex h-12 items-center px-2 no-underline text-neutral-content/60 hover:text-neutral-content"
        >
          NODES
        </RouterLink>
      </div>

      <div class="ml-auto flex items-center">
        <RouterLink
          to="/notifications"
          class="relative flex h-12 items-center px-3 text-neutral-content/60 hover:text-neutral-content"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0" />
          </svg>
          <span
            v-if="notification.unreadCount > 0"
            class="label-mono absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-sm bg-accent px-1 text-[0.625rem] leading-none text-accent-content"
          >
            {{ notification.unreadCount > 99 ? '99+' : notification.unreadCount }}
          </span>
        </RouterLink>

        <div class="mx-1 h-5 w-px bg-neutral-content/20" />

        <UserMenu />
      </div>
    </div>
  </header>

  <LoginModal />
</template>
