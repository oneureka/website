<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Topic } from '@api-client'
import { rest } from '@js-sdk'
import AppLayout from '../components/AppLayout.vue'
import Card from '../components/Card.vue'
import SortTabs from '../components/SortTabs.vue'
import TopicItem from '../components/TopicItem.vue'
import Pagination from '../components/Pagination.vue'
import Loader from '../components/Loader.vue'
import EmptyState from '../components/EmptyState.vue'
import NodeSidebar from '../components/NodeSidebar.vue'

const topics = ref<Topic[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const activeType = ref('last_actived')
const page = ref(1)
const pageCount = ref(1)
const activeNodeId = ref<number>()

onMounted(async () => {
  await fetchTopics()
})

async function fetchTopics() {
  loading.value = true
  try {
    const res = await rest.topics.list({ limit: 20, offset: 0 })
    topics.value = res.topics ?? res
  } catch (e: any) {
    error.value = e.message ?? '加载失败'
  } finally {
    loading.value = false
  }
}

function onTypeChange(type: string) {
  activeType.value = type
  page.value = 1
  fetchTopics()
}
</script>

<template>
  <AppLayout>
    <template #main>
      <Card>
        <SortTabs :active="activeType" @change="onTypeChange" />
        <Loader v-if="loading" />
        <EmptyState v-else-if="error" :message="error" />
        <EmptyState v-else-if="topics.length === 0" />
        <template v-else>
          <TopicItem v-for="topic in topics" :key="topic.id" :topic="topic" />
          <Pagination
            v-if="pageCount > 1"
            :page="page"
            :page-count="pageCount"
            @change="page = $event"
          />
        </template>
      </Card>
    </template>
    <template #sidebar>
      <NodeSidebar
        :nodes="[]"
        :active-node-id="activeNodeId"
        @select="activeNodeId = $event"
      />
    </template>
  </AppLayout>
</template>
