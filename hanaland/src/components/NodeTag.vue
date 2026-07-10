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
    class="badge"
    :class="{
      'badge-primary': active,
      'badge-ghost': !active,
      'badge-lg': true,
    }"
    @click="emit('click')"
  >
    {{ name }}<span v-if="count !== undefined" class="ml-1 opacity-60">{{ count }}</span>
  </button>
</template>
