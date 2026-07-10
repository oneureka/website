<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQuery, useMutation } from '@tanstack/vue-query'
import type { Node } from '@api-client'
import { rest } from '@js-sdk'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'
import Card from '@components/Card.vue'

const router = useRouter()
const auth = useAuthStore()
const ui = useUIStore()

const title = ref('')
const body = ref('')
const nodeId = ref<number | undefined>()
const imageUploading = ref(false)

const { data: nodesData } = useQuery({
  queryKey: ['nodes'],
  queryFn: () => rest.nodes.list(),
})

const nodes = computed(() => nodesData.value?.nodes ?? [])

const groupedNodes = computed(() => {
  const map = new Map<string, Node[]>()
  for (const node of nodes.value) {
    const group = map.get(node.section_name) ?? []
    group.push(node)
    map.set(node.section_name, group)
  }
  return Array.from(map.entries())
})

const createMutation = useMutation({
  mutationFn: () =>
    rest.topics.create({
      title: title.value,
      body: body.value,
      node_id: nodeId.value!,
    }),
  onSuccess: (topic: any) => {
    router.push(`/topics/${topic.id}`)
  },
})

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  imageUploading.value = true
  try {
    const { url } = await rest.photos.create({ image: file })
    body.value += `![${file.name}](${url})`
  } finally {
    imageUploading.value = false
    input.value = ''
  }
}

function submit() {
  if (!title.value.trim() || !body.value.trim() || !nodeId.value) return
  createMutation.mutate()
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 pt-5">
    <Card>
      <div class="px-4 py-4">
        <h1 class="mb-6 text-xl font-bold text-base-content">创建话题</h1>

        <form @submit.prevent="submit">
          <div class="mb-4">
            <input
              v-model="title"
              type="text"
              placeholder="标题"
              class="input input-bordered w-full"
              required
            />
          </div>

          <div class="mb-4">
            <select
              v-model="nodeId"
              class="select select-bordered w-full"
              required
            >
              <option :value="undefined" disabled>选择分类</option>
              <optgroup
                v-for="[section, sectionNodes] in groupedNodes"
                :key="section"
                :label="section"
              >
                <option
                  v-for="node in sectionNodes"
                  :key="node.id"
                  :value="node.id"
                >
                  {{ node.name }}
                </option>
              </optgroup>
            </select>
          </div>

          <div class="mb-4">
            <textarea
              v-model="body"
              class="textarea textarea-bordered h-64 w-full"
              placeholder="正文，支持 Markdown 格式"
              required
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              上传图片
              <input
                type="file"
                accept="image/*"
                class="hidden"
                @change="handleImageUpload"
              />
            </label>

            <div class="flex items-center gap-2">
              <span v-if="imageUploading" class="text-sm text-base-300">上传中...</span>
              <RouterLink to="/topics" class="btn btn-ghost btn-sm">取消</RouterLink>
              <button
                type="submit"
                class="btn btn-primary btn-sm"
                :disabled="!title.trim() || !body.trim() || !nodeId || createMutation.isPending"
              >
                <span v-if="createMutation.isPending" class="loading loading-spinner loading-xs" />
                发布话题
              </button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  </div>
</template>
