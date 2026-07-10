<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import type { Topic } from '@api-client'
import { rest } from '@js-sdk'
import UserProfileLayout from '@components/UserProfileLayout.vue'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import TopicItem from '@components/TopicItem.vue'

const route = useRoute()
const login = computed(() => String(route.params.login))

const { data, isLoading } = useQuery({
  queryKey: ['user-favorites', login],
  queryFn: () => rest.users.listFavorites({ id: login.value as any }) as Promise<{ topics: Topic[] }>,
})

const topics = computed(() => data.value?.topics ?? [])
</script>

<template>
  <UserProfileLayout>
    <Card>
      <Loader v-if="isLoading" />
      <EmptyState v-else-if="topics.length === 0" message="暂无收藏" />
      <template v-else>
        <TopicItem v-for="topic in topics" :key="topic.id" :topic="topic" />
      </template>
    </Card>
  </UserProfileLayout>
</template>
