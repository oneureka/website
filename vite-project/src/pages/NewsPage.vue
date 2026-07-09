<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{{ $t('nav.news') }}</h1>

    <div class="tabs tabs-box mb-8">
      <a class="tab tab-active">新闻资讯</a>
      <a class="tab">行业动态</a>
    </div>

    <div class="space-y-6">
      <div v-for="i in 6" :key="i" class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">新闻标题 {{ i }}</h3>
          <p class="text-sm text-base-content/60">2024-01-0{{ i }}</p>
          <p class="text-base-content/70 mt-2">新闻简介内容...</p>
        </div>
      </div>
    </div>
  </div>
</template>
