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
      ? 'bg-neutral text-neutral-content border border-neutral'
      : 'text-base-300 border border-dashed border-accent/50 hover:border-neutral hover:text-neutral'"
    @click="emit('click')"
  >
    {{ name }}<span v-if="count !== undefined" class="opacity-60">{{ count }}</span>
  </button>
</template>
