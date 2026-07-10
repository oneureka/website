<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24">
    <h1 class="mb-4 text-6xl font-bold text-base-300">404</h1>
    <p class="mb-8 text-base text-base-content">
      {{ t('this_is_not_the_web_page_you_are_looking_for') }}
    </p>
    <RouterLink to="/topics" class="btn btn-primary">
      返回首页
    </RouterLink>
  </div>
</template>
