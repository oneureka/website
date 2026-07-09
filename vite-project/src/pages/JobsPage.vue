<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{{ $t('nav.jobs') }}</h1>

    <div class="space-y-6">
      <div v-for="i in 3" :key="i" class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h3 class="card-title">职位名称 {{ i }}</h3>
          <p class="text-sm text-base-content/60">部门名称 · 工作地点</p>
          <p class="text-base-content/70 mt-2">职位描述和任职要求...</p>
          <div class="card-actions justify-end mt-4">
            <button class="btn btn-primary btn-sm">投递简历</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
