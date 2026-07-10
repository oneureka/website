<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import type { Topic, Node } from '@api-client'
import { rest } from '@js-sdk'
import AppLayout from '@components/AppLayout.vue'
import Card from '@components/Card.vue'
import SortTabs from '@components/SortTabs.vue'
import TopicItem from '@components/TopicItem.vue'
import Pagination from '@components/Pagination.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import NodeSidebar from '@components/NodeSidebar.vue'
import { ref } from 'vue'

const activeType = ref('last_actived')
const page = ref(1)
const activeNodeId = ref<number | undefined>()
const limit = 20

const offset = computed(() => (page.value - 1) * limit)

const { data: topicsData, isLoading: topicsLoading, error: topicsError } = useQuery({
  queryKey: ['topics', activeType, activeNodeId, offset],
  queryFn: () =>
    rest.topics.list({
      type: activeType.value,
      ...(activeNodeId.value ? { node_id: activeNodeId.value } : {}),
      limit,
      offset: offset.value,
    }) as unknown as { topics: Topic[]; total?: number },
})

const { data: nodesData } = useQuery({
  queryKey: ['nodes'],
  queryFn: () => rest.nodes.list(),
})

const topics = computed(() => topicsData.value?.topics ?? [])
const total = computed(() => (topicsData.value as any)?.total ?? 0)
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / limit)))

const hotNodes = computed(() =>
  (nodesData.value?.nodes ?? []).filter((n: Node) => n.topics_count > 192),
)

function onTypeChange(type: string) {
  activeType.value = type
  page.value = 1
}

function onNodeSelect(nodeId: number | undefined) {
  activeNodeId.value = nodeId
  page.value = 1
}

function onPageChange(p: number) {
  page.value = p
}
</script>

<template>
  <AppLayout>
    <template #main>
      <Card>
        <SortTabs :active="activeType" @change="onTypeChange" />
        <Loader v-if="topicsLoading" />
        <EmptyState v-else-if="topicsError" message="加载失败" />
        <EmptyState v-else-if="topics.length === 0" />
        <template v-else>
          <TopicItem v-for="topic in topics" :key="topic.id" :topic="topic" />
          <Pagination
            v-if="pageCount > 1"
            :page="page"
            :page-count="pageCount"
            @change="onPageChange"
          />
        </template>
      </Card>
    </template>
    <template #sidebar>
      <NodeSidebar
        :nodes="hotNodes"
        :active-node-id="activeNodeId"
        @select="onNodeSelect"
      />
    </template>
  </AppLayout>
</template>
