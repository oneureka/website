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
      <div class="flex items-center justify-between border-b border-dashed border-accent/40 px-4 py-3">
        <span class="section-prefix">NOTIFICATIONS</span>
        <div class="flex gap-2">
          <button
            class="label-mono text-xs text-base-300 hover:text-neutral"
            @click="markAllReadMutation.mutate()"
          >
            全部已读
          </button>
          <button
            class="label-mono text-xs text-base-300 hover:text-neutral"
            @click="clearMutation.mutate()"
          >
            清空
          </button>
        </div>
      </div>

      <div class="flex gap-0 border-b border-accent/40">
        <button
          class="label-mono relative flex h-9 items-center px-4 text-xs text-base-300 hover:text-neutral"
          :class="{ 'text-neutral': activeTab === 'all' }"
          @click="activeTab = 'all'"
        >
          全部
          <span v-if="activeTab === 'all'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral" />
        </button>
        <button
          class="label-mono relative flex h-9 items-center px-4 text-xs text-base-300 hover:text-neutral"
          :class="{ 'text-neutral': activeTab === 'unread' }"
          @click="activeTab = 'unread'"
        >
          未读
          <span v-if="activeTab === 'unread'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral" />
        </button>
        <button
          class="label-mono relative flex h-9 items-center px-4 text-xs text-base-300 hover:text-neutral"
          :class="{ 'text-neutral': activeTab === 'read' }"
          @click="activeTab = 'read'"
        >
          已读
          <span v-if="activeTab === 'read'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral" />
        </button>
      </div>

      <Loader v-if="isLoading" />
      <EmptyState v-else-if="filtered.length === 0" message="暂无通知" />

      <div v-else class="divide-y divide-dashed divide-accent/40">
        <div
          v-for="n in filtered"
          :key="n.id"
          class="flex items-start gap-3 px-4 py-3"
          :class="{ 'bg-neutral/[0.03]': !n.read }"
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
                class="font-medium text-base-content no-underline hover:text-neutral"
              >
                {{ n.actor?.name }}
              </RouterLink>
              <span class="text-base-300"> {{ typeLabel(n.type) }}</span>
            </div>
            <div class="label-mono mt-0.5 text-xs text-base-300">{{ n.created_at }}</div>
          </div>
          <button
            class="label-mono shrink-0 text-xs text-base-300 hover:text-neutral"
            @click.stop="deleteMutation.mutate(n.id)"
          >
            删除
          </button>
        </div>
      </div>

      <div
        v-if="hasMore && activeTab === 'all'"
        class="flex justify-center border-t border-dashed border-accent/40 py-3"
      >
        <button
          class="label-mono text-xs text-base-300 hover:text-neutral"
          @click="loadMore"
        >
          加载更多
        </button>
      </div>
    </Card>
  </div>
</template>
