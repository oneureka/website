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

const { data: user, isLoading: userLoading } = useQuery({
  queryKey: ['user', login],
  queryFn: () => rest.users.retrieve({ id: login.value as any }) as Promise<{ id: number }>,
})

const { data: topicsData, isLoading: topicsLoading } = useQuery({
  queryKey: ['user-topics', login],
  queryFn: () => rest.users.listTopics({ id: login.value as any }),
  enabled: !!user.value,
})

const topics = computed(() => topicsData.value?.topics ?? [])
</script>

<template>
  <UserProfileLayout>
    <Card>
      <Loader v-if="topicsLoading" />
      <EmptyState v-else-if="topics.length === 0" message="暂无话题" />
      <template v-else>
        <TopicItem v-for="topic in topics" :key="topic.id" :topic="topic" />
      </template>
    </Card>
  </UserProfileLayout>
</template>
