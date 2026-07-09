<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [
  { path: '/', label: 'nav.home' },
  { path: '/about', label: 'nav.about' },
  { path: '/products', label: 'nav.products' },
  { path: '/news', label: 'nav.news' },
  { path: '/contact', label: 'nav.contact' },
  { path: '/jobs', label: 'nav.jobs' },
]
</script>

<template>
  <div class="drawer">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col min-h-svh">
      <nav class="navbar bg-base-100 border-b border-base-200/50">
        <div class="navbar-start">
          <label for="drawer" class="btn btn-ghost drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <router-link to="/" class="btn btn-ghost text-xl font-normal tracking-widest">
            ONEUREKA
          </router-link>
        </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1 gap-px text-sm tracking-wide">
            <li v-for="link in navLinks" :key="link.path">
              <router-link
                :to="link.path"
                class="px-4 py-2 border-b-2 border-transparent transition-all duration-300"
                :class="route.path === link.path
                  ? 'text-base-content border-base-content'
                  : 'text-base-content/60 hover:text-base-content hover:border-base-content/20'"
              >
                {{ $t(link.label) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="navbar-end" />
      </nav>

      <main class="flex-1">
        <router-view v-slot="{ Component }">
          <transition name="page" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <footer class="border-t border-base-200/50 bg-base-100">
        <div class="container mx-auto px-4 py-10">
          <div class="flex flex-col items-center gap-2 text-center">
            <span class="tracking-[0.3em] text-base-content/30 text-xs">ONEUREKA</span>
            <p class="text-xs text-base-content/40">
              &copy; 2024 Oneureka. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>

    <div class="drawer-side z-50">
      <label for="drawer" class="drawer-overlay" />
      <ul class="menu bg-base-100 min-h-full w-64 p-6 gap-1 text-sm">
        <li class="mb-4">
          <span class="tracking-[0.3em] text-base-content/30 text-xs">NAV</span>
        </li>
        <li v-for="link in navLinks" :key="link.path" class="border-b border-base-200/30 pb-1">
          <router-link
            :to="link.path"
            class="py-3 tracking-wide"
            :class="route.path === link.path ? 'text-base-content font-medium' : 'text-base-content/60'"
          >
            {{ $t(link.label) }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
