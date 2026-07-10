<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'

const auth = useAuthStore()
const ui = useUIStore()

const username = ref('')
const password = ref('')
const error = ref('')

async function handleLogin() {
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    ui.closeLoginModal()
    username.value = ''
    password.value = ''
  } catch {
    error.value = '用户名或密码错误'
  }
}
</script>

<template>
  <dialog
    :open="ui.loginModalOpen"
    class="modal"
    @click.self="ui.closeLoginModal"
  >
    <div class="card-offset w-full max-w-sm">
      <div class="card-offset-shadow" />
      <div class="card-offset-inner p-6">
        <form @submit.prevent="handleLogin">
          <span class="section-prefix mb-4">LOGIN</span>

          <div class="mb-3">
            <input
              v-model="username"
              type="text"
              placeholder="USERNAME"
              class="w-full border border-neutral bg-base-100 px-3 py-2 font-mono text-sm text-base-content placeholder-base-300 outline-none focus:border-secondary"
              required
            >
          </div>

          <div class="mb-3">
            <input
              v-model="password"
              type="password"
              placeholder="PASSWORD"
              class="w-full border border-neutral bg-base-100 px-3 py-2 font-mono text-sm text-base-content placeholder-base-300 outline-none focus:border-secondary"
              required
            >
          </div>

          <p v-if="error" class="label-mono mb-2 text-xs text-error">{{ error }}</p>

          <button type="submit" class="label-mono flex w-full items-center justify-center bg-neutral px-4 py-2 text-sm text-neutral-content hover:bg-secondary" :disabled="auth.loading">
            <span v-if="auth.loading" class="loading loading-spinner loading-xs mr-1" />
            登录
          </button>
        </form>
      </div>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="ui.closeLoginModal">关闭</button>
    </form>
  </dialog>
</template>
