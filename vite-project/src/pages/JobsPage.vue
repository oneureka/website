<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 py-16 md:py-20">
    <div class="text-center mb-12">
      <span
        class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3"
        >JOBS</span
      >
      <h1 class="text-3xl font-light tracking-wide text-base-content">
        人才招聘
      </h1>
      <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
    </div>

    <div class="max-w-3xl mx-auto space-y-px bg-base-200/30">
      <div
        v-for="i in 4"
        :key="i"
        class="group bg-base-100 px-6 py-6 transition-all duration-300 hover:bg-base-200/20"
      >
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h3 class="card-title text-sm font-normal tracking-wide">
              职位名称 {{ i }}
            </h3>
            <p class="text-xs text-base-content/50 mt-2">
              部门名称 · 工作地点 · 全职
            </p>
          </div>
          <button class="btn btn-outline btn-xs rounded-none tracking-wider">
            投递简历
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
