<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { rest } from '../api'
import type { Topic } from '../api'

const topics = ref<Topic[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const res = await rest.topics.list({ limit: 20, offset: 0 })
    topics.value = res.topics ?? res
  } catch (e: any) {
    error.value = e.message ?? '加载失败'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="layout">
    <div class="main-col">
      <div class="card">
        <div v-if="loading" class="state-box">加载中...</div>
        <div v-else-if="error" class="state-box">{{ error }}</div>
        <div v-else-if="topics.length === 0" class="state-box">暂无话题</div>
        <ul v-else class="topic-list">
          <li v-for="topic in topics" :key="topic.id" class="topic-item">
            <RouterLink :to="`/topics/${topic.id}`" class="topic-main">
              <img
                :src="topic.user.avatar_url"
                :alt="topic.user.login"
                class="avatar"
              />
              <div class="topic-body">
                <h3 class="topic-title">{{ topic.title }}</h3>
                <p class="topic-meta">
                  {{ topic.user.name }}
                  <span class="dot">&middot;</span>
                  {{ new Date(topic.created_at).toLocaleDateString() }}
                </p>
              </div>
            </RouterLink>
            <div class="reply-count">{{ topic.replies_count }}</div>
          </li>
        </ul>
      </div>
    </div>
    <aside class="side-col">
      <div class="card">
        <div class="side-header">热门标签</div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  padding: 0 0.5rem;
}

@media (min-width: 768px) {
  .layout {
    flex-direction: row;
  }
  .main-col {
    width: 75%;
  }
  .side-col {
    width: 25%;
    padding-left: 1rem;
  }
}

.card {
  background: #fff;
  border-radius: 0.5rem;
  overflow: hidden;
}

.state-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;
  color: #a1a1aa;
  font-size: 0.875rem;
}

.topic-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.topic-item {
  display: flex;
  align-items: center;
  padding: 0 0.75rem;
  border-bottom: 1px solid #e4e4e7;
}

.topic-item:last-child {
  border-bottom: none;
}

.topic-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  padding: 0.75rem 0;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.topic-body {
  flex: 1;
  min-width: 0;
}

.topic-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1d4ed8;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.topic-title:hover {
  text-decoration: underline;
}

.topic-meta {
  font-size: 0.8125rem;
  color: #71717a;
  margin: 0.25rem 0 0;
}

.dot {
  margin: 0 0.25rem;
}

.reply-count {
  width: 3rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #71717a;
}

.side-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 3.5rem;
  padding: 0 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: #18181b;
  border-bottom: 1px solid #e4e4e7;
}
</style>
