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
    <div class="modal-box">
      <form @submit.prevent="handleLogin">
        <h3 class="mb-4 text-lg font-bold">登录</h3>

        <div class="mb-3">
          <input
            v-model="username"
            type="text"
            placeholder="用户名"
            class="input input-bordered w-full"
            required
          >
        </div>

        <div class="mb-3">
          <input
            v-model="password"
            type="password"
            placeholder="密码"
            class="input input-bordered w-full"
            required
          >
        </div>

        <p v-if="error" class="mb-2 text-sm text-red-600">{{ error }}</p>

        <button type="submit" class="btn btn-primary w-full" :disabled="auth.loading">
          <span v-if="auth.loading" class="loading loading-spinner" />
          登录
        </button>
      </form>
    </div>

    <form method="dialog" class="modal-backdrop">
      <button @click="ui.closeLoginModal">关闭</button>
    </form>
  </dialog>
</template>
