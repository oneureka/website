<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Node, User } from '@api-client'
import { rest } from '@js-sdk'
import AppLayout from '@components/AppLayout.vue'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import UserAvatar from '@components/UserAvatar.vue'

const { data: nodesData, isLoading: nodesLoading } = useQuery({
  queryKey: ['nodes'],
  queryFn: () => rest.nodes.list(),
})

const { data: usersData, isLoading: usersLoading } = useQuery({
  queryKey: ['users'],
  queryFn: () => rest.users.list(),
})

const nodes = computed(() => nodesData.value?.nodes ?? [])
const users = computed(() => usersData.value?.users ?? [])

const groupedNodes = computed(() => {
  const map = new Map<string, Node[]>()
  for (const node of nodes.value) {
    const group = map.get(node.section_name) ?? []
    group.push(node)
    map.set(node.section_name, group)
  }
  return Array.from(map.entries())
})

const sortedUsers = computed(() =>
  [...users.value].sort((a, b) => (b.followers_count ?? 0) - (a.followers_count ?? 0)),
)
</script>

<template>
  <AppLayout>
    <template #main>
      <Card>
        <div class="p-4">
          <span class="section-prefix mb-4">ALL NODES</span>
          <Loader v-if="nodesLoading" />
          <EmptyState v-else-if="nodes.length === 0" />
          <div v-else class="space-y-5">
            <div v-for="[section, sectionNodes] in groupedNodes" :key="section">
              <span class="label-mono mb-2 block text-xs text-base-300">{{ section }}</span>
              <div class="flex flex-wrap gap-2">
                <RouterLink
                  v-for="node in sectionNodes"
                  :key="node.id"
                  :to="`/topics?node_id=${node.id}`"
                  class="label-mono inline-flex items-center gap-1 border border-dashed border-accent/50 px-3 py-1.5 text-xs text-base-300 no-underline hover:border-neutral hover:text-neutral"
                >
                  {{ node.name }}
                  <span class="opacity-60">{{ node.topics_count }}</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </template>

    <template #sidebar>
      <Card>
        <div class="p-4">
          <span class="section-prefix mb-4">TOP USERS</span>
          <Loader v-if="usersLoading" />
          <EmptyState v-else-if="users.length === 0" />
          <div v-else class="space-y-3">
            <RouterLink
              v-for="u in sortedUsers.slice(0, 10)"
              :key="u.id"
              :to="`/${u.login}`"
              class="flex items-center gap-3 no-underline"
            >
              <UserAvatar :src="u.avatar_url" :alt="u.name" size="sm" />
              <div class="min-w-0 flex-1">
                <div class="truncate text-sm font-medium text-base-content hover:text-neutral">{{ u.name }}</div>
                <div class="label-mono text-xs text-base-300">{{ u.followers_count }} 关注者</div>
              </div>
            </RouterLink>
          </div>
        </div>
      </Card>
    </template>
  </AppLayout>
</template>
