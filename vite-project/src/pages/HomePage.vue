<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <section class="mb-12">
      <div class="hero bg-base-200 rounded-box p-8">
        <div class="hero-content text-center">
          <div class="max-w-xl">
            <h1 class="text-4xl font-bold">{{ $t('nav.home') }}</h1>
            <p class="py-4 text-base-content/70">Banner 轮播区域</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">产品展示</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="i in 4" :key="i" class="card bg-base-200 shadow-sm">
          <div class="card-body items-center">
            <div class="w-full h-32 bg-base-300 rounded-box mb-4" />
            <h3 class="card-title">产品 {{ i }}</h3>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6">新闻动态</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="i in 3" :key="i" class="card bg-base-200 shadow-sm">
          <div class="card-body">
            <div class="w-full h-24 bg-base-300 rounded-box mb-2" />
            <h3 class="card-title">新闻 {{ i }}</h3>
            <p class="text-sm text-base-content/60">2024-01-0{{ i }}</p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="card bg-base-200 rounded-box p-8">
        <div class="card-body items-center text-center">
          <h2 class="card-title text-2xl">公司简介</h2>
          <p class="text-base-content/70 max-w-2xl">
            一家专注于创新的科技公司，致力于为客户提供优质的产品与服务。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
