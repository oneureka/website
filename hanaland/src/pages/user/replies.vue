<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { Reply } from '@api-client'
import { rest } from '@js-sdk'
import UserProfileLayout from '@components/UserProfileLayout.vue'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import UserAvatar from '@components/UserAvatar.vue'

const route = useRoute()
const login = computed(() => String(route.params.login))

const { data, isLoading } = useQuery({
  queryKey: ['user-replies', login],
  queryFn: () => rest.users.listReplies({ id: login.value as any }) as Promise<{ replies: Reply[] }>,
})

const replies = computed(() => data.value?.replies ?? [])
</script>

<template>
  <UserProfileLayout>
    <Card>
      <div class="divide-y px-4">
        <Loader v-if="isLoading" />
        <EmptyState v-else-if="replies.length === 0" message="暂无回复" />
        <div
          v-for="reply in replies"
          :key="reply.id"
          class="flex gap-3 px-0 py-4"
        >
          <UserAvatar
            :src="reply.user?.avatar_url"
            :alt="reply.user?.name"
            size="sm"
            class="shrink-0"
          />
          <div class="min-w-0 flex-1">
            <div class="mb-1 text-sm text-base-300">
              <RouterLink
                :to="`/${reply.user?.login}`"
                class="font-medium text-base-300 no-underline hover:underline"
              >
                {{ reply.user?.name }}
              </RouterLink>
              <span class="ml-2">{{ reply?.created_at }}</span>
              <RouterLink
                :to="`/topics/${reply.topic_id}`"
                class="ml-2 text-primary no-underline hover:underline"
              >
                {{ reply.topic_title }}
              </RouterLink>
            </div>
            <div
              v-if="reply?.body_html"
              class="prose prose-sm max-w-none overflow-x-auto [&_img]:max-w-full"
              v-html="reply?.body_html"
            />
            <div v-else class="text-sm text-base-content">{{ reply?.body }}</div>
          </div>
        </div>
      </div>
    </Card>
  </UserProfileLayout>
</template>
