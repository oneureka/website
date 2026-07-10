<script setup lang="ts">
import { useAuthStore } from '@stores/auth'
import { useUIStore } from '@stores/ui'

const auth = useAuthStore()
const ui = useUIStore()
</script>

<template>
  <div v-if="auth.isAuthenticated" class="dropdown dropdown-end">
    <button class="btn btn-ghost h-14 px-3 font-bold text-zinc-400 hover:text-zinc-100">
      {{ auth.user?.name ?? auth.user?.login }}
      <svg xmlns="http://www.w3.org/2000/svg" class="ml-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <ul class="dropdown-content menu rounded-box z-10 w-44 bg-slate-900 p-2 shadow-lg">
      <li>
        <RouterLink
          :to="`/${auth.user?.login}`"
          class="text-zinc-400 hover:text-zinc-100"
        >
          个人资料
        </RouterLink>
      </li>
      <li>
        <a
          href="#"
          class="text-zinc-400 hover:text-zinc-100"
          @click.prevent="auth.logout"
        >
          登出
        </a>
      </li>
    </ul>
  </div>

  <button
    v-else
    class="btn btn-ghost h-14 px-3 font-bold text-zinc-400 hover:text-zinc-100"
    @click="ui.openLoginModal"
  >
    登录
  </button>
</template>
