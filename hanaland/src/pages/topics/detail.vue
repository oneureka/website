<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Topic, Reply } from '@api-client'
import { rest } from '@js-sdk'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'
import AppLayout from '@components/AppLayout.vue'
import Card from '@components/Card.vue'
import Loader from '@components/Loader.vue'
import EmptyState from '@components/EmptyState.vue'
import UserAvatar from '@components/UserAvatar.vue'

const route = useRoute()
const queryClient = useQueryClient()
const auth = useAuthStore()
const ui = useUIStore()

const topicId = computed(() => Number(route.params.id))
const replyBody = ref('')
const replyOffset = ref(0)
const replyLimit = 20
const replying = ref(false)
const imageFile = ref<File | null>(null)
const imageUploading = ref(false)

const { data: topic, isLoading: topicLoading } = useQuery({
  queryKey: ['topic', topicId],
  queryFn: () => rest.topics.retrieve({ id: topicId.value }) as Promise<Topic>,
})

const {
  data: repliesData,
  isLoading: repliesLoading,
  fetchNextPage,
  isFetchingNextPage,
  hasNextPage,
} = useQuery({
  queryKey: ['replies', topicId, replyOffset],
  queryFn: () =>
    rest.replies.list({ topic_id: topicId.value, limit: replyLimit, offset: replyOffset.value }),
})

const replies = computed(() => repliesData.value?.replies ?? [])
const hasMoreReplies = computed(() => replies.value.length >= replyLimit)

function loadMoreReplies() {
  replyOffset.value += replyLimit
}

const likeReplyMutation = useMutation({
  mutationFn: ({ id, liked }: { id: number; liked: boolean }) =>
    liked ? rest.replies.unlike({ id, type: 'Reply' }) : rest.replies.like({ id, type: 'Reply' }),
})

function toggleReplyLike(reply: Reply) {
  if (!auth.isAuthenticated) {
    ui.openLoginModal()
    return
  }
  const liked = (reply as any).liked ?? false
  ;(reply as any).liked = !liked
  reply.likes_count += liked ? -1 : 1
  likeReplyMutation.mutate({ id: reply.id, liked })
}

async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  imageUploading.value = true
  try {
    const { url } = await rest.photos.create({ image: file })
    replyBody.value += `![${file.name}](${url})`
  } finally {
    imageUploading.value = false
    input.value = ''
  }
}

async function submitReply() {
  if (!replyBody.value.trim()) return
  replying.value = true
  try {
    await rest.replies.create({ topic_id: topicId.value, body: replyBody.value })
    replyBody.value = ''
    replyOffset.value = 0
    queryClient.invalidateQueries({ queryKey: ['replies', topicId] })
  } finally {
    replying.value = false
  }
}

const followMutation = useMutation({
  mutationFn: ({ userId, followed }: { userId: number; followed: boolean }) =>
    followed ? rest.users.unfollow({ id: userId }) : rest.users.follow({ id: userId }),
})

function toggleFollow(userId: number, followed: boolean) {
  if (!auth.isAuthenticated) {
    ui.openLoginModal()
    return
  }
  if (topic.value) {
    topic.value.user.followed = !followed
  }
  followMutation.mutate({ userId, followed })
}
</script>

<template>
  <AppLayout>
    <template #main>
      <Loader v-if="topicLoading" />
      <EmptyState v-else-if="!topic" message="话题不存在" />

      <template v-else>
        <Card>
          <div class="p-4">
            <span class="section-prefix mb-3">TOPIC</span>
            <h1 class="heading-section mb-3">{{ topic?.title }}</h1>

            <div class="mb-4 flex items-center gap-2 text-xs text-base-300">
              <UserAvatar :src="topic?.user?.avatar_url" :alt="topic?.user?.name" size="sm" />
              <RouterLink
                :to="`/${topic?.user?.login}`"
                class="label-mono text-base-300 no-underline hover:text-secondary"
              >
                {{ topic?.user?.name }}
              </RouterLink>
              <span class="label-mono">{{ topic?.created_at }}</span>
            </div>

            <div
              v-if="topic?.body_html"
              class="prose prose-sm max-w-none overflow-x-auto [&_img]:max-w-full"
              v-html="topic?.body_html"
            />

            <div v-else class="text-sm text-base-content">
              {{ topic?.body }}
            </div>

            <div class="mt-4 flex items-center gap-4 label-mono text-xs text-base-300">
              <span>{{ topic?.hits }} 阅读</span>
              <span>{{ topic?.likes_count }} 点赞</span>
            </div>
          </div>
        </Card>

        <Card class="mt-4">
          <div class="p-4">
            <span class="section-prefix mb-3">REPLIES ({{ topic?.replies_count }})</span>

            <div v-if="!auth.isAuthenticated" class="mb-4">
              <button class="label-mono text-xs text-neutral hover:text-secondary" @click="ui.openLoginModal">
                登录后回复
              </button>
            </div>

            <form v-else class="mb-6" @submit.prevent="submitReply">
              <textarea
                v-model="replyBody"
                class="textarea textarea-bordered mb-2 h-24 w-full rounded-none border-neutral bg-base-100 text-sm focus:border-secondary focus:outline-none"
                placeholder="写下你的回复..."
              />
              <div class="flex items-center justify-between">
                <label class="label-mono flex cursor-pointer items-center gap-1 text-xs text-base-300 hover:text-secondary">
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
                  <span v-if="imageUploading" class="label-mono text-xs text-base-300">上传中...</span>
                  <button
                    type="submit"
                    class="label-mono flex items-center gap-1 bg-neutral px-4 py-1.5 text-xs text-neutral-content hover:bg-secondary"
                    :disabled="replying || !replyBody.trim()"
                  >
                    <span v-if="replying" class="loading loading-spinner loading-xs" />
                    回复
                  </button>
                </div>
              </div>
            </form>

            <Loader v-if="repliesLoading" />
            <EmptyState v-else-if="replies.length === 0" message="暂无回复" />

            <div v-else class="divide-y divide-dashed divide-secondary/40">
              <div
                v-for="reply in replies"
                :key="reply.id"
                class="flex gap-3 py-4"
              >
                <UserAvatar
                  :src="reply.user?.avatar_url"
                  :alt="reply.user?.name"
                  size="sm"
                  class="shrink-0"
                />
                <div class="min-w-0 flex-1">
                  <div class="mb-1 flex items-center gap-2">
                    <RouterLink
                      :to="`/${reply.user?.login}`"
                      class="label-mono text-xs text-base-300 no-underline hover:text-secondary"
                    >
                      {{ reply.user?.name }}
                    </RouterLink>
                    <span class="label-mono text-xs text-base-300">{{ reply?.created_at }}</span>
                  </div>
                  <div
                    v-if="reply?.body_html"
                    class="prose prose-sm max-w-none overflow-x-auto [&_img]:max-w-full"
                    v-html="reply?.body_html"
                  />
                  <div v-else class="text-sm text-base-content">{{ reply?.body }}</div>
                  <div class="mt-2">
                    <button
                      class="label-mono flex items-center gap-1 text-xs text-base-300 hover:text-secondary"
                      @click="toggleReplyLike(reply)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-3.5 w-3.5"
                        :class="(reply as any)?.liked ? 'text-secondary fill-current' : ''"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      {{ reply?.likes_count }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              v-if="hasMoreReplies"
              class="flex justify-center pt-3"
            >
              <button
                class="label-mono text-xs text-base-300 hover:text-secondary"
                :disabled="isFetchingNextPage"
                @click="loadMoreReplies"
              >
                <span v-if="isFetchingNextPage" class="loading loading-spinner loading-xs" />
                加载更多回复
              </button>
            </div>
          </div>
        </Card>
      </template>
    </template>

    <template #sidebar>
      <Card v-if="topic">
        <div class="p-4">
          <span class="section-prefix mb-3">AUTHOR</span>
          <div class="flex flex-col items-center text-center">
            <UserAvatar
              :src="topic?.user?.avatar_url"
              :alt="topic?.user?.name"
              size="lg"
              class="mb-2"
            />
            <RouterLink
              :to="`/${topic?.user?.login}`"
              class="font-medium text-base-content no-underline hover:text-secondary"
            >
              {{ topic?.user?.name }}
            </RouterLink>
            <p v-if="topic?.user?.tagline" class="mt-1 text-xs text-base-300">
              {{ topic?.user?.tagline }}
            </p>
            <button
              v-if="auth.isAuthenticated && topic?.user?.login !== auth.user?.login"
              class="label-mono mt-3 w-full border-neutral px-3 py-1.5 text-xs text-neutral hover:bg-neutral hover:text-neutral-content"
              @click="toggleFollow(topic?.user?.id, topic?.user?.followed)"
            >
              {{ topic?.user?.followed ? '取消关注' : '关注' }}
            </button>
          </div>
        </div>
      </Card>
    </template>
  </AppLayout>
</template>
