<script setup lang="ts">
import type { Node } from '@api-client'
import NodeTag from './NodeTag.vue'

defineProps<{
  nodes: Node[]
  activeNodeId?: number
}>()

const emit = defineEmits<{
  select: [nodeId: number | undefined]
}>()
</script>

<template>
  <div class="divide-y rounded-box bg-base-100 shadow-sm">
    <div class="flex h-14 items-center justify-between p-3 font-medium">
      <span>热门标签</span>
      <button
        v-if="activeNodeId"
        class="text-error hover:text-error/80"
        @click="emit('select', undefined)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
    <div class="flex flex-wrap gap-2 p-3 pb-1">
      <NodeTag
        v-for="node in nodes"
        :key="node.id"
        :name="node.name"
        :count="node.topics_count"
        :active="node.id === activeNodeId"
        @click="emit('select', node.id)"
      />
    </div>
  </div>
</template>
