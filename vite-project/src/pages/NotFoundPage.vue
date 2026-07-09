<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 py-24">
    <div class="max-w-md mx-auto text-center">
      <div class="text-8xl font-thin text-base-content/10 tracking-widest">
        404
      </div>
      <div class="w-8 h-px bg-base-content/20 mx-auto my-6" />
      <p class="text-sm text-base-content/50 mb-8 tracking-wide">
        お探しのページは見つかりませんでした
      </p>
      <p class="text-xs text-base-content/30 mb-10">您访问的页面不存在</p>
      <router-link
        to="/"
        class="btn btn-outline btn-sm rounded-none tracking-wider px-10"
      >
        返回首页
      </router-link>
    </div>
  </div>
</template>
