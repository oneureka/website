<script setup lang="ts">
import { ref } from 'vue'

const showLoginModal = ref(false)
</script>

<template>
  <header class="app-header">
    <div class="header-inner">
      <RouterLink to="/topics" class="logo">
        💎
      </RouterLink>

      <button
        class="login-btn"
        @click="showLoginModal = true"
      >
        登录
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: #0f172a;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-inner {
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  padding: 0 0.5rem;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.5rem;
  width: 3rem;
  font-size: 1.5rem;
  text-decoration: none;
}

.login-btn {
  color: #a1a1aa;
  font-weight: 700;
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 3.5rem;
  padding: 0 0.75rem;
}

.login-btn:hover {
  color: #f4f4f5;
}
</style>
