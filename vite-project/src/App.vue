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
      <nav class="navbar bg-base-100 shadow-sm border-b border-base-200">
        <div class="navbar-start">
          <label for="drawer" class="btn btn-ghost drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </label>
          <router-link to="/" class="btn btn-ghost text-xl">Oneureka</router-link>
        </div>

        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal px-1 gap-1">
            <li v-for="link in navLinks" :key="link.path">
              <router-link :to="link.path" :class="{ active: route.path === link.path }">
                {{ $t(link.label) }}
              </router-link>
            </li>
          </ul>
        </div>

        <div class="navbar-end" />
      </nav>

      <main class="flex-1">
        <router-view />
      </main>

      <footer class="footer footer-center bg-base-200 p-4 text-base-content/60 text-sm">
        <p>Copyright &copy; 2024 Oneureka. All rights reserved.</p>
      </footer>
    </div>

    <div class="drawer-side z-50">
      <label for="drawer" class="drawer-overlay" />
      <ul class="menu bg-base-100 min-h-full w-64 p-4 gap-1">
        <li v-for="link in navLinks" :key="link.path">
          <router-link :to="link.path" :class="{ active: route.path === link.path }">
            {{ $t(link.label) }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
