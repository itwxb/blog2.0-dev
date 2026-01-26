<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:wrench" class="text-3xl text-blue-600" />
        工具收藏
      </h1>
      <div class="text-sm text-gray-500">
        工欲善其事，必先利其器
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="text-center py-20">
      <div class="text-red-500 mb-4">加载失败: {{ error.message }}</div>
      <button 
        @click="refresh()" 
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        重试
      </button>
    </div>

    <!-- 工具列表 -->
    <div v-else class="space-y-4">
      <a 
        v-for="(item, index) in presentations" 
        :key="index"
        :href="item.url"
        target="_blank"
        class="block group"
      >
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200 border-l-4 border-l-transparent hover:border-l-blue-600 flex items-center justify-between">
          <span class="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
            {{ item.title }}
          </span>
          <span class="text-gray-300 group-hover:text-blue-400">↗</span>
        </div>
      </a>

      <!-- 空状态 -->
      <div v-if="presentations.length === 0" class="text-center py-20 text-gray-500">
        暂无内容
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const presentations = ref<any[]>([])

const { data, pending, error, refresh } = await useFetch('/api/content', {
  query: { 
    repo: 'blogUse', 
    path: 'tools.md' 
  }
})

watch(data, (newData) => {
  if (newData && newData.decodedContent) {
    const content = newData.decodedContent
    // 解析逻辑复用原有逻辑: split("***")[1] 然后解析 markdown link
    // 原逻辑: 
    // let content = b64ToUtf8(item.content).split("***")[1].split("\n");
    // 解析 [title](url)
    
    try {
      const parts = content.split('***')
      if (parts.length > 1) {
        const lines = parts[1].split('\n')
        const items = []
        
        for (const line of lines) {
          if (!line.trim()) continue
          
          // 简单解析markdown链接 [title](url)
          // 原逻辑: .replace("- [", "").replace("html)", "html").replace(")", "").split("](")
          // 我们用正则更稳健一点
          const match = line.match(/\[(.*?)\]\((.*?)\)/)
          if (match) {
            items.push({
              title: match[1],
              url: match[2]
            })
          }
        }
        presentations.value = items
      }
    } catch (e) {
      console.error('Error parsing content:', e)
    }
  }
}, { immediate: true })

useHead({
  title: '工具收藏 - 王勇博的博客'
})
</script>
