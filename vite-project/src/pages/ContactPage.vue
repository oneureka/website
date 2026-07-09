<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-16 md:py-20">
    <div class="text-center mb-12">
      <span class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3">CONTACT</span>
      <h1 class="text-3xl font-light tracking-wide text-base-content">联系我们</h1>
      <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
    </div>

    <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <h2 class="text-sm tracking-wide font-normal mb-6">在线留言</h2>
        <form class="space-y-5">
          <div class="form-control">
            <input
              type="text"
              placeholder="称呼"
              class="input input-bordered rounded-none text-sm border-base-200/60 focus:border-base-content/40 transition-colors"
            />
          </div>
          <div class="form-control">
            <input
              type="email"
              placeholder="邮箱"
              class="input input-bordered rounded-none text-sm border-base-200/60 focus:border-base-content/40 transition-colors"
            />
          </div>
          <div class="form-control">
            <input
              type="text"
              placeholder="标题"
              class="input input-bordered rounded-none text-sm border-base-200/60 focus:border-base-content/40 transition-colors"
            />
          </div>
          <div class="form-control">
            <textarea
              placeholder="内容"
              class="textarea textarea-bordered rounded-none text-sm h-32 border-base-200/60 focus:border-base-content/40 transition-colors"
            />
          </div>
          <button class="btn btn-outline rounded-none text-sm tracking-wider px-10">
            发送
          </button>
        </form>
      </div>

      <div>
        <h2 class="text-sm tracking-wide font-normal mb-6">联系方式</h2>
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <span class="text-xs text-base-content/40 min-w-[3em]">邮箱</span>
            <span class="text-sm text-base-content/70">contact@oneureka.com</span>
          </div>
          <div class="flex items-start gap-4">
            <span class="text-xs text-base-content/40 min-w-[3em]">电话</span>
            <span class="text-sm text-base-content/70">+86 000-0000-0000</span>
          </div>
          <div class="flex items-start gap-4">
            <span class="text-xs text-base-content/40 min-w-[3em]">地址</span>
            <span class="text-sm text-base-content/70">中国某市某区某路 123 号</span>
          </div>
        </div>

        <div class="mt-8">
          <h2 class="text-sm tracking-wide font-normal mb-4">位置</h2>
          <div class="w-full aspect-[16/9] bg-base-200/50 flex items-center justify-center text-base-content/20 text-sm">
            MAP
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
