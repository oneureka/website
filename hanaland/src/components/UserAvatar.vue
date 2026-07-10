<script setup lang="ts">
defineProps<{
  src: string
  alt?: string
  size?: 'sm' | 'md' | 'lg'
}>()
</script>

<template>
  <div
    class="avatar"
    :class="{
      'w-8': size === 'sm',
      'w-10': size === 'md' || !size,
      'w-16': size === 'lg',
    }"
  >
    <img
      :src="src"
      :alt="alt ?? ''"
      class="rounded-full"
    >
  </div>
</template>
