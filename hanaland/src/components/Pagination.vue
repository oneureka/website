<script setup lang="ts">
defineProps<{
  page: number
  pageCount: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()
</script>

<template>
  <div class="flex items-center justify-center gap-4 border-t border-dashed border-accent/40 px-4 py-3">
    <button
      class="label-mono flex items-center gap-1 text-base-300 hover:text-neutral"
      :class="{ 'opacity-30': page <= 1 }"
      :disabled="page <= 1"
      @click="emit('change', page - 1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      上一页
    </button>

    <span class="label-mono text-base-300">{{ page }} / {{ pageCount }}</span>

    <button
      class="label-mono flex items-center gap-1 text-base-300 hover:text-neutral"
      :class="{ 'opacity-30': page >= pageCount }"
      :disabled="page >= pageCount"
      @click="emit('change', page + 1)"
    >
      下一页
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
    </button>
  </div>
</template>
