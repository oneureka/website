<template>
  <div class="mx-auto flex w-full max-w-5xl flex-col gap-4 px-2 pt-5 md:flex-row">
    <div class="min-w-0 md:w-3/4">
      <slot name="main" />
    </div>
    <div class="md:w-1/4 md:pl-4">
      <slot name="sidebar" />
    </div>
  </div>
</template>
