<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { User } from '@api-client'
import { rest } from '@js-sdk'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'
import Card from './Card.vue'
import Loader from './Loader.vue'
import EmptyState from './EmptyState.vue'
import UserAvatar from './UserAvatar.vue'

const route = useRoute()
const auth = useAuthStore()
const ui = useUIStore()

const login = computed(() => String(route.params.login))

const { data: user, isLoading } = useQuery({
  queryKey: ['user', login],
  queryFn: () => rest.users.retrieve({ id: login.value as any }) as Promise<User>,
})

const tabs = computed(() => [
  { label: '话题', to: `/${login.value}` },
  { label: '回复', to: `/${login.value}/replies` },
  { label: '收藏', to: `/${login.value}/favorites` },
  { label: '粉丝', to: `/${login.value}/followers` },
  { label: '关注', to: `/${login.value}/following` },
])

function toggleFollow() {
  if (!auth.isAuthenticated) {
    ui.openLoginModal()
    return
  }
  if (!user.value) return
  const followed = user.value.followed
  if (followed) {
    rest.users.unfollow({ id: user.value.id })
  } else {
    rest.users.follow({ id: user.value.id })
  }
  user.value.followed = !followed
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 pt-5 md:flex-row md:px-2">
    <div class="min-w-0 md:w-3/4">
      <slot />
    </div>
    <div class="md:w-1/4 md:pl-4">
      <Loader v-if="isLoading" />
      <EmptyState v-else-if="!user" message="用户不存在" />
      <Card v-else>
        <div class="flex flex-col items-center p-4 text-center">
          <UserAvatar :src="user?.avatar_url" :alt="user?.name" size="lg" class="mb-3" />
          <RouterLink
            :to="`/${user?.login}`"
            class="text-lg font-bold text-base-content no-underline hover:underline"
          >
            {{ user?.name }}
          </RouterLink>
          <p v-if="user?.tagline" class="mt-1 text-sm text-base-300">{{ user?.tagline }}</p>
          <div class="mt-3 flex w-full justify-around text-xs text-base-300">
            <span>{{ user?.topics_count }} 话题</span>
            <span>{{ user?.replies_count }} 回复</span>
          </div>
          <div class="mt-1 flex w-full justify-around text-xs text-base-300">
            <span>{{ user?.followers_count }} 粉丝</span>
            <span>{{ user?.following_count }} 关注</span>
          </div>
          <button
            v-if="auth.isAuthenticated && user?.login !== auth.user?.login"
            class="btn btn-outline btn-primary btn-sm mt-3 w-full"
            @click="toggleFollow"
          >
            {{ user?.followed ? '取消关注' : '关注' }}
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>
