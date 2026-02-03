<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:rocket" class="text-3xl text-blue-600" />
        我的项目
      </h1>
      <div class="text-sm text-gray-500">
        一些有趣的小作品
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <a 
        v-for="(item, index) in itemList" 
        :key="index"
        :href="item.url"
        target="_blank"
        class="block group"
      >
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200 border-l-4 border-l-transparent hover:border-l-blue-600 h-full flex flex-col justify-center">
          <h2 class="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors flex items-center gap-2">
            {{ item.title }}
            <span class="text-gray-300 group-hover:text-blue-400 text-sm">↗</span>
          </h2>
          <p v-if="item.desc" class="text-gray-500 text-sm mt-2">{{ item.desc }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const itemList = [
  {
    title: "随机数生成器",
    url: "/myitem/random/index.html",
    desc: "一个简单的随机数生成工具"
  },
  {
    title: "打造前程官网",
    url: "/firmWeb/index.html",
    desc: "企业官网静态页面展示"
  }
]

useHead({
  title: '我的项目 - 王勇博的博客'
})
</script>
