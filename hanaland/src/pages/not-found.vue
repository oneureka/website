<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-24">
    <span class="section-prefix mb-4">ERROR</span>
    <h1 class="heading-section mb-4">404</h1>
    <p class="mb-8 text-sm text-base-300">
      {{ t('this_is_not_the_web_page_you_are_looking_for') }}
    </p>
    <RouterLink to="/topics" class="label-mono flex items-center gap-1 border border-primary px-4 py-2 text-xs text-primary hover:bg-primary hover:text-primary-content">
      返回首页
    </RouterLink>
  </div>
</template>
