<script setup lang="ts">
defineProps<{
  name: string
  count?: number
  active?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="label-mono inline-flex items-center gap-1 px-3 py-1.5 text-xs"
    :class="active
      ? 'bg-primary text-primary-content border border-primary'
      : 'text-base-300 border border-dashed border-secondary/50 hover:border-secondary hover:text-primary'"
    @click="emit('click')"
  >
    {{ name }}<span v-if="count !== undefined" class="opacity-60">{{ count }}</span>
  </button>
</template>
