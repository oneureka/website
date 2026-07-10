<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'

const router = useRouter()
const auth = useAuthStore()
const ui = useUIStore()

function handleLogout() {
  auth.logout()
  router.push('/topics')
}
</script>

<template>
  <div v-if="auth.isAuthenticated" class="dropdown dropdown-end">
    <button class="label-mono flex h-12 items-center px-3 text-primary-content/60 hover:text-primary-content">
      {{ auth.user?.name ?? auth.user?.login }}
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul class="dropdown-content menu rounded-sm z-10 w-44 bg-primary border border-primary p-1 shadow-lg">
      <li>
        <RouterLink
          :to="`/${auth.user?.login}`"
          class="label-mono text-primary-content/70 hover:text-primary-content"
        >
          个人资料
        </RouterLink>
      </li>
      <li>
        <a
          href="#"
          class="label-mono text-primary-content/70 hover:text-primary-content"
          @click.prevent="handleLogout"
        >
          登出
        </a>
      </li>
    </ul>
  </div>

  <button
    v-else
    class="label-mono flex h-12 items-center px-3 text-primary-content/60 hover:text-primary-content"
    @click="ui.openLoginModal"
  >
    登录
  </button>
</template>
