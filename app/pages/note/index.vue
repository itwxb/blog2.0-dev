<template>
  <div 
    class="mx-auto transition-all duration-500 ease-in-out"
    :class="isSidebarCollapsed ? 'max-w-6xl' : 'max-w-4xl'"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:star" class="text-3xl text-blue-600" />
        文章收藏
      </h1>
      <div class="text-sm text-gray-500">
        收集的一些有用的文章
      </div>
    </div>

    <!-- 加载状态 (初次加载) -->
    <div v-if="pending && page === 1" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div v-for="i in 6" :key="i" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse h-24"/>
    </div>

    <!-- Error State (Initial) -->
    <div v-else-if="error && page === 1" class="text-center py-20 bg-white rounded-2xl border border-red-100">
      <div class="text-red-500 mb-4 flex flex-col items-center gap-2">
        <Icon name="lucide:alert-circle" class="text-4xl" />
        <span>加载失败: {{ error.message }}</span>
      </div>
      <button 
        class="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100" 
        @click="refresh()"
      >
        重试一下
      </button>
    </div>

    <!-- Article List Container -->
    <div v-else class="space-y-4">
      <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <template v-for="post in posts" :key="post.number">
          <NuxtLink 
            :to="`/article/${post.number}`"
            class="block group"
          >
            <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 border-l-4 border-l-transparent hover:border-l-blue-600 h-full">
              <h2 class="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                {{ post.title }}
              </h2>
            </div>
          </NuxtLink>
        </template>
      </div>

      <!-- Bottom States -->
      <div v-if="!isEnd" ref="sentinelRef" class="pt-8">
        <!-- Loading More -->
        <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="i in 2" :key="i" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 animate-pulse h-24"/>
        </div>
        <!-- Error Loading More -->
        <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 flex items-center justify-center gap-4">
          <span>加载失败，请重试</span>
          <button class="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm" @click="refresh">
            重试
          </button>
        </div>
      </div>

      <!-- 到底提示 -->
      <div v-if="isEnd && posts.length > 0" class="flex justify-center pt-12 pb-6">
        <div class="inline-flex items-center gap-2 px-6 py-2 bg-gray-50 text-gray-400 text-sm rounded-full border border-gray-100">
          <Icon name="lucide:smile" class="w-4 h-4" />
          收藏夹到底啦 ~
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="posts.length === 0 && !pending" class="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
        <Icon name="lucide:star-off" class="text-6xl text-gray-200 mb-4 mx-auto" />
        <p class="text-gray-400">收藏夹空空如也 ~</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/utils/types'

const page = ref(1)
const size = 20
const posts = ref<Post[]>([])
const isEnd = ref(false)

// 响应侧边栏状态
const { isSidebarCollapsed } = useSidebar()

const { data, pending, error, refresh } = await useFetch('/api/posts', {
  query: { 
    page, 
    size, 
    labels: 'note'
  },
  watch: [page] 
})

// 无限滚动
const { sentinelRef } = useInfiniteScroll(() => {
  if (!pending.value && !isEnd.value) {
    page.value++
  }
})

// 监听数据变化
watch(data, (newData) => {
  if (newData) {
    if (newData.length < size) {
      isEnd.value = true
    }
    if (page.value === 1) {
      posts.value = newData
    } else {
      posts.value = [...posts.value, ...newData]
    }
  }
}, { immediate: true })

useHead({
  title: '文章收藏 - 王勇博的博客'
})
</script>
