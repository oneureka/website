<script setup lang="ts">
defineProps<{
  message?: string
}>()
</script>

<template>
  <div class="flex items-center justify-center py-12 text-base-300">
    <p>{{ message ?? '暂无数据' }}</p>
  </div>
</template>
