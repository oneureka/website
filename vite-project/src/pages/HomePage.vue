<script setup lang="ts"></script>

<template>
  <div>
    <section class="relative overflow-hidden bg-base-200/30">
      <div class="container mx-auto px-4 py-20 md:py-28">
        <div class="max-w-2xl mx-auto text-center">
          <span
            class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-6"
          >
            EST. 2024
          </span>
          <h1
            class="text-4xl md:text-5xl font-light leading-tight tracking-wide text-base-content mb-6"
          >
            品质 · 创新 · 匠心
          </h1>
          <p class="text-base-content/60 leading-relaxed max-w-lg mx-auto">
            专注于为客户提供优质的产品与服务，以匠心精神打磨每一个细节。
          </p>
          <div class="mt-10 flex gap-4 justify-center">
            <router-link
              to="/products"
              class="btn btn-outline btn-sm rounded-none tracking-wider px-8"
            >
              了解更多
            </router-link>
            <router-link
              to="/contact"
              class="btn btn-ghost btn-sm tracking-wider px-8"
            >
              联系我们
            </router-link>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-base-content/10 to-transparent"
      />
    </section>

    <section class="container mx-auto px-4 py-16 md:py-20">
      <div class="text-center mb-12">
        <span
          class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3"
          >PRODUCTS</span
        >
        <h2 class="text-2xl font-light tracking-wide text-base-content">
          产品系列
        </h2>
        <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="i in 4"
          :key="i"
          class="group card bg-base-100 border border-base-200/50 rounded-none hover:border-base-content/20 transition-all duration-500"
        >
          <figure class="px-6 pt-6">
            <div
              class="w-full aspect-[4/3] bg-base-200/50 flex items-center justify-center text-base-content/20 text-sm"
            >
              IMAGE
            </div>
          </figure>
          <div class="card-body px-6 pt-4 pb-6">
            <h3 class="card-title text-sm font-normal tracking-wide">
              产品系列 {{ i }}
            </h3>
            <p class="text-xs text-base-content/50 leading-relaxed">
              简约而不简单，用心打造每一件产品。
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-base-200/20">
      <div class="container mx-auto px-4 py-16 md:py-20">
        <div class="text-center mb-12">
          <span
            class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3"
            >NEWS</span
          >
          <h2 class="text-2xl font-light tracking-wide text-base-content">
            新闻动态
          </h2>
          <div class="w-8 h-px bg-base-content/20 mx-auto mt-4" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <article
            v-for="i in 3"
            :key="i"
            class="group card bg-base-100 border border-base-200/50 rounded-none hover:border-base-content/20 transition-all duration-500"
          >
            <figure class="px-6 pt-6">
              <div
                class="w-full aspect-video bg-base-200/50 flex items-center justify-center text-base-content/20 text-xs"
              >
                IMAGE
              </div>
            </figure>
            <div class="card-body px-6 pt-4 pb-6">
              <time class="text-xs text-base-content/40">2024.01.0{{ i }}</time>
              <h3 class="card-title text-sm font-normal tracking-wide mt-1">
                新闻标题 {{ i }}
              </h3>
              <p
                class="text-xs text-base-content/50 leading-relaxed line-clamp-2"
              >
                这里是新闻简介内容，以简洁的文字传达核心信息。
              </p>
            </div>
          </article>
        </div>

        <div class="text-center mt-10">
          <router-link
            to="/news"
            class="btn btn-outline btn-sm rounded-none tracking-wider px-10"
          >
            查看全部
          </router-link>
        </div>
      </div>
    </section>

    <section class="container mx-auto px-4 py-16 md:py-20">
      <div class="max-w-2xl mx-auto text-center">
        <span
          class="inline-block text-xs tracking-[0.3em] text-base-content/40 mb-3"
          >ABOUT</span
        >
        <h2 class="text-2xl font-light tracking-wide text-base-content mb-6">
          关于我们
        </h2>
        <div class="w-8 h-px bg-base-content/20 mx-auto mb-6" />
        <p class="text-base-content/60 leading-relaxed">
          一家专注于创新的科技公司，自成立以来，始终坚持以客户需求为导向，以技术创新为驱动，致力于为全球客户提供优质的产品与服务。
        </p>
        <div class="mt-8">
          <router-link
            to="/about"
            class="btn btn-outline btn-sm rounded-none tracking-wider px-10"
          >
            深入了解
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
