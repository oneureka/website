<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">{{ $t('nav.contact') }}</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-xl mb-4">在线留言</h2>
          <form class="space-y-4">
            <label class="form-control w-full">
              <div class="label"><span class="label-text">称呼</span></div>
              <input type="text" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label"><span class="label-text">邮箱</span></div>
              <input type="email" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label"><span class="label-text">标题</span></div>
              <input type="text" class="input input-bordered w-full" />
            </label>
            <label class="form-control w-full">
              <div class="label"><span class="label-text">内容</span></div>
              <textarea class="textarea textarea-bordered h-24 w-full" />
            </label>
            <button class="btn btn-primary">提交</button>
          </form>
        </div>
      </div>

      <div class="card bg-base-200 shadow-sm">
        <div class="card-body">
          <h2 class="card-title text-xl mb-4">联系方式</h2>
          <div class="space-y-4">
            <div><strong>邮箱：</strong>contact@example.com</div>
            <div><strong>电话：</strong>+86 000-0000-0000</div>
            <div><strong>地址：</strong>中国某市某区某路 123 号</div>
          </div>
          <div class="mt-6 w-full h-64 bg-base-300 rounded-box flex items-center justify-center text-base-content/50">
            地图区域
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
