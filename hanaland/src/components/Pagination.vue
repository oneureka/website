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
  <div class="flex h-14 items-center justify-center gap-2 px-3">
    <button
      class="btn btn-ghost btn-sm"
      :disabled="page <= 1"
      @click="emit('change', page - 1)"
    >
      上一页
    </button>

    <span class="text-sm text-base-300">{{ page }} / {{ pageCount }}</span>

    <button
      class="btn btn-ghost btn-sm"
      :disabled="page >= pageCount"
      @click="emit('change', page + 1)"
    >
      下一页
    </button>
  </div>
</template>
