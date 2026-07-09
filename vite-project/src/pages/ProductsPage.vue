<script setup lang="ts">
import { ref } from 'vue'

const series = ['系列一', '系列二', '系列三']
const activeSeries = ref(0)
</script>

<template>
  <div class="container mx-auto px-4 py-16 md:py-20">
    <div class="text-center mb-12">
      <span class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3">PRODUCTS</span>
      <h1 class="text-3xl font-light tracking-wide text-base-content">产品展示</h1>
      <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
    </div>

    <div class="max-w-5xl mx-auto">
      <div class="flex justify-center gap-8 mb-12">
        <button
          v-for="(s, index) in series"
          :key="index"
          class="text-sm tracking-wide transition-all duration-300 pb-1 border-b-2"
          :class="activeSeries === index
            ? 'text-base-content border-base-content'
            : 'text-base-content/40 border-transparent hover:text-base-content/70'"
          @click="activeSeries = index"
        >
          {{ s }}
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="i in 8"
          :key="i"
          class="group card bg-base-100 border border-base-200/50 rounded-none hover:border-base-content/20 transition-all duration-500"
        >
          <figure class="px-6 pt-6">
            <div class="w-full aspect-square bg-base-200/50 flex items-center justify-center text-base-content/20 text-sm">
              IMAGE
            </div>
          </figure>
          <div class="card-body px-6 pt-4 pb-6">
            <h3 class="card-title text-sm font-normal tracking-wide">
              产品名称 {{ i }}
            </h3>
            <p class="text-xs text-base-content/50 leading-relaxed line-clamp-2">
              产品简要描述，突出核心特点与优势。
            </p>
            <div class="mt-3">
              <span class="text-xs tracking-wider text-base-content/40">了解更多 →</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
