<script setup lang="ts">
import type { Topic } from '@api-client'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'
import UserAvatar from './UserAvatar.vue'
import { timeAgo } from '@utils/time'

defineProps<{
  topic: Topic
}>()

const auth = useAuthStore()
const ui = useUIStore()
</script>

<template>
  <div class="flex items-center gap-3 border-b border-dashed border-secondary/40 px-4 py-3 last:border-b-0">
    <UserAvatar :src="topic.user.avatar_url" :alt="topic.user.name" size="sm" />

    <div class="flex min-w-0 flex-1 flex-col gap-0.5">
      <RouterLink
        :to="`/topics/${topic.id}`"
        class="truncate font-medium text-base-content no-underline hover:text-primary"
      >
        {{ topic.title }}
      </RouterLink>
      <div class="flex flex-wrap items-baseline gap-x-3 text-xs text-base-300">
        <RouterLink
          :to="`/${topic.user.login}`"
          class="label-mono shrink-0 text-base-300 no-underline hover:text-primary"
        >
          {{ topic.user.name }}
        </RouterLink>
        <span class="label-mono">{{ timeAgo(topic.created_at) }}</span>
        <template v-if="topic.replied_at">
          <span class="label-mono">{{ topic.last_reply_user_login }} 回复于 {{ timeAgo(topic.replied_at) }}</span>
        </template>
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-3">
      <button
        class="label-mono flex items-center gap-1 text-base-300 hover:text-primary"
        @click="auth.isAuthenticated ? null : ui.openLoginModal()"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {{ topic.likes_count }}
      </button>
      <span class="label-mono flex items-center gap-1 text-base-300">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {{ topic.replies_count }}
      </span>
    </div>
  </div>
</template>
