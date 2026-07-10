<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { User } from '@api-client'
import { rest } from '@js-sdk'
import UserProfileLayout from '@components/UserProfileLayout.vue'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import UserAvatar from '@components/UserAvatar.vue'

const route = useRoute()
const login = computed(() => String(route.params.login))

const { data, isLoading } = useQuery({
  queryKey: ['user-followers', login],
  queryFn: () => rest.users.listFollowers({ id: login.value as any }) as Promise<{ users: User[] }>,
})

const users = computed(() => data.value?.users ?? [])
</script>

<template>
  <UserProfileLayout>
    <Card>
      <div class="divide-y px-4">
        <Loader v-if="isLoading" />
        <EmptyState v-else-if="users.length === 0" message="暂无粉丝" />
        <RouterLink
          v-for="u in users"
          :key="u.id"
          :to="`/${u.login}`"
          class="flex items-center gap-3 px-0 py-3 no-underline"
        >
          <UserAvatar :src="u.avatar_url" :alt="u.name" size="sm" class="shrink-0" />
          <div class="min-w-0 flex-1">
            <div class="font-medium text-base-content">{{ u.name }}</div>
            <p v-if="u.tagline" class="truncate text-sm text-base-300">{{ u.tagline }}</p>
          </div>
          <span class="text-xs text-base-300">{{ u.followers_count }} 粉丝</span>
        </RouterLink>
      </div>
    </Card>
  </UserProfileLayout>
</template>
