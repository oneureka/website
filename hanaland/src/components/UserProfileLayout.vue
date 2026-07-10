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
  <div class="relative mx-auto flex w-full max-w-5xl flex-col md:flex-row">
    <div class="min-w-0 border-dashed-accent md:w-3/4 md:border-r">
      <Card class="!rounded-none !border-0">
        <div class="flex gap-0 border-b border-secondary/40">
          <RouterLink
            v-for="tab in tabs"
            :key="tab.to"
            :to="tab.to"
            class="label-mono relative flex h-10 items-center px-4 text-xs text-base-300 no-underline hover:text-secondary"
            :class="{ 'text-neutral': route.fullPath === tab.to }"
          >
            {{ tab.label }}
            <span v-if="route.fullPath === tab.to" class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
          </RouterLink>
        </div>
        <slot />
      </Card>
    </div>
    <div class="border-t border-dashed-accent md:w-1/4 md:border-t-0 md:pl-5">
      <Loader v-if="isLoading" />
      <EmptyState v-else-if="!user" message="用户不存在" />
      <Card v-else>
        <div class="flex flex-col items-center p-4 text-center">
          <span class="section-prefix mb-3">PROFILE</span>
          <UserAvatar :src="user?.avatar_url" :alt="user?.name" size="lg" class="mb-3" />
          <RouterLink
            :to="`/${user?.login}`"
            class="text-base font-medium text-base-content no-underline hover:text-secondary"
          >
            {{ user?.name }}
          </RouterLink>
          <p v-if="user?.tagline" class="mt-1 text-xs text-base-300">{{ user?.tagline }}</p>
          <div class="mt-3 flex w-full justify-around">
            <span class="label-mono text-xs text-base-300">{{ user?.topics_count }} 话题</span>
            <span class="label-mono text-xs text-base-300">{{ user?.replies_count }} 回复</span>
          </div>
          <div class="mt-1 flex w-full justify-around">
            <span class="label-mono text-xs text-base-300">{{ user?.followers_count }} 粉丝</span>
            <span class="label-mono text-xs text-base-300">{{ user?.following_count }} 关注</span>
          </div>
          <button
            v-if="auth.isAuthenticated && user?.login !== auth.user?.login"
            class="label-mono mt-3 w-full border border-neutral px-3 py-1.5 text-xs text-neutral hover:bg-neutral hover:text-neutral-content"
            @click="toggleFollow"
          >
            {{ user?.followed ? '取消关注' : '关注' }}
          </button>
        </div>
      </Card>
    </div>
  </div>
</template>
