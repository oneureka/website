<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="app-shell">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f4f4f5;
}

.main-content {
  flex: 1;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  padding-top: 1.25rem;
}
</style>
