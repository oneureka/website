<script setup lang="ts">
import { ref, computed } from 'vue'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Notification } from '@api-client'
import { rest } from '@js-sdk'
import { useNotificationStore } from '@stores/notification'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import UserAvatar from '@components/UserAvatar.vue'

const queryClient = useQueryClient()
const notificationStore = useNotificationStore()

const activeTab = ref<'all' | 'read' | 'unread'>('all')
const limit = 20
const offset = ref(0)

const { data, isLoading } = useQuery({
  queryKey: ['notifications', offset],
  queryFn: () => rest.notifications.list({ offset: offset.value, limit }) as Promise<{ notifications: Notification[] }>,
})

const notifications = computed(() => data.value?.notifications ?? [])

const filtered = computed(() => {
  if (activeTab.value === 'read') return notifications.value.filter(n => n.read)
  if (activeTab.value === 'unread') return notifications.value.filter(n => !n.read)
  return notifications.value
})

const hasMore = computed(() => notifications.value.length >= limit)

const markReadMutation = useMutation({
  mutationFn: (ids: number[]) => rest.notifications.markAsRead({ ids }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
    notificationStore.fetchUnreadCount()
  },
})

const deleteMutation = useMutation({
  mutationFn: (id: number) => rest.notifications.destroy({ id }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
    notificationStore.fetchUnreadCount()
  },
})

const clearMutation = useMutation({
  mutationFn: () => rest.notifications.clear(),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
    notificationStore.fetchUnreadCount()
  },
})

const markAllReadMutation = useMutation({
  mutationFn: () => rest.notifications.markAsRead({}),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['notifications'] })
    notificationStore.fetchUnreadCount()
  },
})

function markAsRead(n: Notification) {
  if (!n.read) {
    markReadMutation.mutate([n.id])
  }
}

function loadMore() {
  offset.value += limit
}

function typeLabel(type: string) {
  const map: Record<string, string> = {
    Topic: '发布了话题',
    Reply: '回复了话题',
    Mention: '提到了你',
    Follow: '关注了你',
  }
  return map[type] ?? type
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 pt-5">
    <Card>
      <div class="flex h-14 items-center justify-between border-b border-base-200 px-4">
        <div class="flex gap-1">
          <button
            class="btn btn-ghost btn-sm rounded-full"
            :class="{ 'btn-primary': activeTab === 'all' }"
            @click="activeTab = 'all'"
          >
            全部
          </button>
          <button
            class="btn btn-ghost btn-sm rounded-full"
            :class="{ 'btn-primary': activeTab === 'unread' }"
            @click="activeTab = 'unread'"
          >
            未读
          </button>
          <button
            class="btn btn-ghost btn-sm rounded-full"
            :class="{ 'btn-primary': activeTab === 'read' }"
            @click="activeTab = 'read'"
          >
            已读
          </button>
        </div>
        <div class="flex gap-1">
          <button
            class="btn btn-ghost btn-xs text-primary"
            @click="markAllReadMutation.mutate()"
          >
            全部已读
          </button>
          <button
            class="btn btn-ghost btn-xs text-error"
            @click="clearMutation.mutate()"
          >
            清空
          </button>
        </div>
      </div>

      <Loader v-if="isLoading" />
      <EmptyState v-else-if="filtered.length === 0" message="暂无通知" />

      <div v-else class="divide-y">
        <div
          v-for="n in filtered"
          :key="n.id"
          class="flex items-start gap-3 px-4 py-3"
          :class="{ 'bg-primary/5': !n.read }"
          @click="markAsRead(n)"
        >
          <UserAvatar
            :src="n.actor?.avatar_url"
            :alt="n.actor?.name"
            size="sm"
            class="shrink-0 mt-1"
          />
          <div class="min-w-0 flex-1">
            <div class="text-sm">
              <RouterLink
                :to="`/${n.actor?.login}`"
                class="font-medium text-base-content no-underline hover:underline"
              >
                {{ n.actor?.name }}
              </RouterLink>
              <span class="text-base-300"> {{ typeLabel(n.type) }}</span>
            </div>
            <div class="mt-0.5 text-xs text-base-300">{{ n.created_at }}</div>
          </div>
          <button
            class="btn btn-ghost btn-xs text-base-300 hover:text-error shrink-0"
            @click.stop="deleteMutation.mutate(n.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-if="hasMore && activeTab === 'all'"
        class="flex justify-center py-3"
      >
        <button
          class="btn btn-ghost btn-sm"
          @click="loadMore"
        >
          加载更多
        </button>
      </div>
    </Card>
  </div>
</template>
