<template>
  <div class="relative mx-auto flex w-full max-w-5xl flex-col md:flex-row">
    <div class="min-w-0 border-dashed-secondary md:w-3/4 md:border-r">
      <slot name="main" />
    </div>
    <div class="border-t border-dashed-secondary md:w-1/4 md:border-t-0 md:pl-5">
      <slot name="sidebar" />
    </div>
  </div>
</template>
