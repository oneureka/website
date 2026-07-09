<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['公司简介', '企业文化', '合作方式']
const activeTab = ref(0)
</script>

<template>
  <div class="container mx-auto px-4 py-16 md:py-20">
    <div class="text-center mb-12">
      <span class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3">ABOUT</span>
      <h1 class="text-3xl font-light tracking-wide text-base-content">关于我们</h1>
      <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
    </div>

    <div class="max-w-3xl mx-auto">
      <div class="flex border-b border-base-200/50 mb-10">
        <button
          v-for="(tab, index) in tabs"
          :key="index"
          class="px-6 py-3 text-sm tracking-wide transition-all duration-300 border-b-2 -mb-px"
          :class="activeTab === index
            ? 'text-base-content border-base-content'
            : 'text-base-content/40 border-transparent hover:text-base-content/70'"
          @click="activeTab = index"
        >
          {{ tab }}
        </button>
      </div>

      <div class="min-h-[300px]">
        <div v-if="activeTab === 0" class="space-y-6">
          <div class="aspect-video bg-base-200/50 flex items-center justify-center text-base-content/20 text-sm">
            COMPANY IMAGE
          </div>
          <div class="space-y-4 text-base-content/60 leading-relaxed text-sm">
            <p>
              公司成立于 2024 年，总部位于中国，是一家专注于科技创新与产品研发的现代化企业。
              我们秉持"匠心品质、创新驱动"的理念，致力于为客户创造卓越价值。
            </p>
            <p>
              经过多年的行业深耕，我们已建立起完善的产品体系和服务网络，
              业务覆盖多个领域，赢得了广大客户的信赖与支持。
            </p>
          </div>
        </div>

        <div v-else-if="activeTab === 1" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="i in 3" :key="i" class="text-center p-6 border border-base-200/30">
              <div class="w-12 h-12 mx-auto mb-4 bg-base-200/50 flex items-center justify-center text-base-content/30 text-xs">
                ICON
              </div>
              <h3 class="text-sm font-medium tracking-wide mb-2">核心价值观 {{ i }}</h3>
              <p class="text-xs text-base-content/50 leading-relaxed">
                以匠心精神追求卓越，以创新思维驱动发展。
              </p>
            </div>
          </div>
        </div>

        <div v-else class="space-y-6 text-sm text-base-content/60 leading-relaxed">
          <p>
            我们期待与各界伙伴建立长期、稳定、互信的合作关系。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="i in 3" :key="i" class="p-6 border border-base-200/30 text-center">
              <div class="text-lg font-light mb-1">0{{ i }}</div>
              <div class="text-xs text-base-content/50">合作方式 {{ i }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
