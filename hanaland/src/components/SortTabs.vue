<script setup lang="ts">
defineProps<{
  active: string
}>()

const emit = defineEmits<{
  change: [type: string]
}>()

const tabs = [
  { key: 'last_actived', label: '默认话题' },
  { key: 'popular', label: '热门话题' },
  { key: 'excellent', label: '精华话题' },
  { key: 'recent', label: '最新发布' },
  { key: 'no_reply', label: '无人回复' },
]
</script>

<template>
  <div class="flex h-14 items-center gap-1 overflow-x-auto px-3">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="btn btn-ghost btn-sm rounded-full"
      :class="{ 'btn-primary': active === tab.key }"
      @click="emit('change', tab.key)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
