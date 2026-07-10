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
  <div class="card-offset mt-5 md:mt-0">
    <div class="card-offset-shadow" />
    <div class="card-offset-inner p-4">
      <div class="mb-3 flex items-center justify-between">
        <span class="section-prefix">TAGS</span>
        <button
          v-if="activeNodeId"
          class="label-mono text-xs text-base-300 hover:text-secondary"
          @click="emit('select', undefined)"
        >
          清除
        </button>
      </div>
      <div class="flex flex-wrap gap-2">
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
  </div>
</template>
