<template>
  <div 
    class="mx-auto transition-all duration-500 ease-in-out"
    :class="isSidebarCollapsed ? 'max-w-6xl' : 'max-w-4xl'"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:code-2" class="text-3xl text-blue-600" />
        技术笔记
      </h1>
      <div class="text-sm text-gray-500">
        记录学习过程中的点滴
      </div>
    </div>

    <!-- 加载状态 (初次加载) -->
    <div v-if="pending && page === 1" class="space-y-4">
      <SkeletonCard v-for="i in 5" :key="i" />
    </div>

    <!-- Error State (Initial) -->
    <div v-else-if="error && page === 1" class="text-center py-20 bg-white rounded-2xl border border-red-100">
      <div class="text-red-500 mb-4 flex flex-col items-center gap-2">
        <Icon name="lucide:alert-circle" class="text-4xl" />
        <span>加载失败: {{ error.message }}</span>
      </div>
      <button 
        @click="refresh()" 
        class="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
      >
        重试一下
      </button>
    </div>

    <!-- Article List Container -->
    <div v-else class="space-y-4">
      <div v-if="posts.length > 0" class="space-y-4">
        <template v-for="post in posts" :key="post.number">
          <NuxtLink 
            :to="`/article/${post.number}`"
            class="block group"
          >
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 border-l-4 border-l-transparent hover:border-l-blue-600">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {{ post.title }}
                </h2>
                <span class="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                  #{{ post.number }}
                </span>
              </div>
              <div class="flex items-center gap-4 text-sm text-gray-500">
                <span class="flex items-center gap-1">
                  <Icon name="lucide:calendar" class="w-4 h-4" />
                  {{ new Date(post.created_at).toLocaleDateString() }}
                </span>
                <span v-if="post.comments > 0" class="flex items-center gap-1 text-blue-500 font-medium">
                  <Icon name="lucide:message-square" class="w-4 h-4" />
                  {{ post.comments }} 条评论
                </span>
              </div>
            </div>
          </NuxtLink>
        </template>
      </div>

      <!-- Bottom States -->
      <div v-if="!isEnd" ref="sentinelRef" class="pt-4">
        <!-- Loading More -->
        <div v-if="pending" class="space-y-4">
          <SkeletonCard v-for="i in 2" :key="i" />
        </div>
        <!-- Error Loading More -->
        <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 flex items-center justify-center gap-4">
          <span>加载失败，请重试</span>
          <button @click="refresh" class="px-4 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm">
            重试
          </button>
        </div>
      </div>

      <!-- 到底提示 -->
      <div v-if="isEnd && posts.length > 0" class="flex justify-center pt-12 pb-6">
        <div class="inline-flex items-center gap-2 px-6 py-2 bg-gray-50 text-gray-400 text-sm rounded-full border border-gray-100">
          <Icon name="lucide:sparkles" class="w-4 h-4" />
          已经看到最后啦，去别的栏目看看吧
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="posts.length === 0 && !pending" class="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
        <Icon name="lucide:file-question" class="text-6xl text-gray-200 mb-4 mx-auto" />
        <p class="text-gray-400">还没有发布技术笔记呢 ~</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const page = ref(1)
const size = 10
const posts = ref<any[]>([])
const isEnd = ref(false)

// 响应侧边栏状态
const { isSidebarCollapsed } = useSidebar()

const { data, pending, error, refresh } = await useFetch('/api/posts', {
  query: { 
    page, 
    size, 
    labels: 'study'
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
  title: '技术笔记 - 王勇博的博客'
})
</script>
