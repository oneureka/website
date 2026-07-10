<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center py-12 text-zinc-400">
    <p>{{ message ?? '暂无数据' }}</p>
  </div>
</template>
