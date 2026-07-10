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
  <div class="flex items-center gap-0 overflow-x-auto border-b border-secondary/40">
    <button
      v-for="tab in tabs"
      :key="tab.key"
      class="label-mono relative flex h-10 items-center px-4 text-base-300 hover:text-secondary"
      :class="{ 'text-neutral': active === tab.key }"
      @click="emit('change', tab.key)"
    >
      {{ tab.label }}
      <span
        v-if="active === tab.key"
        class="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
      />
    </button>
  </div>
</template>
