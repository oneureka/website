<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{{ $t('nav.products') }}</h1>

    <div class="tabs tabs-box mb-8">
      <a class="tab tab-active">系列一</a>
      <a class="tab">系列二</a>
      <a class="tab">系列三</a>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="card bg-base-200 shadow-sm">
        <div class="card-body items-center">
          <div class="w-full h-40 bg-base-300 rounded-box mb-4" />
          <h3 class="card-title">产品 {{ i }}</h3>
          <p class="text-sm text-base-content/60">产品描述</p>
        </div>
      </div>
    </div>
  </div>
</template>
