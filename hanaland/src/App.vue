<script setup lang="ts">
import AppShell from './components/AppShell.vue'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import ScrollToTop from './components/ScrollToTop.vue'
</script>

<template>
  <AppShell>
    <AppHeader />
    <main class="mx-auto w-full max-w-5xl flex-1 px-4 pt-5 md:px-2">
      <RouterView />
    </main>
    <AppFooter />
    <ScrollToTop />
  </AppShell>
</template>
