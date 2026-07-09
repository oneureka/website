<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['新闻资讯', '行业动态']
const activeTab = ref(0)
</script>

<template>
  <div class="container mx-auto px-4 py-16 md:py-20">
    <div class="text-center mb-12">
      <span class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3">NEWS</span>
      <h1 class="text-3xl font-light tracking-wide text-base-content">新闻中心</h1>
      <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
    </div>

    <div class="max-w-4xl mx-auto">
      <div class="flex justify-center gap-8 mb-12">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="text-sm tracking-wide transition-all duration-300 pb-1 border-b-2"
          :class="activeTab === index
            ? 'text-base-content border-base-content'
            : 'text-base-content/40 border-transparent hover:text-base-content/70'"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <div class="space-y-px bg-base-200/30">
        <article
          v-for="i in 6"
          :key="i"
          class="group bg-base-100 px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 transition-all duration-300 hover:bg-base-200/20"
        >
          <time class="text-xs text-base-content/40 min-w-[100px] tracking-wider">
            2024.01.0{{ i }}
          </time>
          <div class="flex-1 min-w-0">
            <h3 class="card-title text-sm font-normal tracking-wide group-hover:text-base-content/80 transition-colors">
              新闻标题 {{ i }} — 简洁有力的资讯标题
            </h3>
          </div>
          <span class="text-xs text-base-content/30 group-hover:text-base-content/50 transition-colors">
            阅读 →
          </span>
        </article>
      </div>
    </div>
  </div>
</template>
