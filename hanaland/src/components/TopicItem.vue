<script setup lang="ts">
import type { Topic } from '@api-client'
import UserAvatar from './UserAvatar.vue'

defineProps<{
  topic: Topic
}>()
</script>

<template>
  <div class="flex items-center gap-3 px-3 py-3">
    <UserAvatar :src="topic.user.avatar_url" :alt="topic.user.name" size="sm" />

    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <RouterLink
        :to="`/topics/${topic.id}`"
        class="truncate text-primary no-underline hover:underline"
      >
        {{ topic.title }}
      </RouterLink>
      <div class="space-x-2 text-sm text-base-300">
        <RouterLink
          :to="`/${topic.user.login}`"
          class="text-base-300 no-underline hover:underline"
        >
          {{ topic.user.name }}
        </RouterLink>
        <span>&middot; 发布于 {{ topic.created_at }}</span>
        <template v-if="topic.replied_at">
          <span>&middot; 最后由
            <RouterLink
              :to="`/${topic.last_reply_user_login}`"
              class="text-base-300 no-underline hover:underline"
            >
              {{ topic.last_reply_user_login }}
            </RouterLink>
            回复于 {{ topic.replied_at }}</span>
        </template>
      </div>
    </div>

    <div class="badge badge-ghost badge-sm shrink-0">
      {{ topic.replies_count }}
    </div>
  </div>
</template>
