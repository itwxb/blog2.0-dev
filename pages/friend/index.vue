<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:handshake" class="text-3xl text-blue-600" />
        友情链接
      </h1>
      <div class="text-sm text-gray-500">
        海内存知己，天涯若比邻
      </div>
    </div>

    <!-- 友链卡片 -->
    <div v-if="pending" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
    <div v-else-if="error" class="text-center py-20">
      <div class="text-red-500 mb-4">加载失败: {{ error.message }}</div>
      <button @click="refresh()" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">重试</button>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      <a 
        v-for="(item, index) in friends" 
        :key="index"
        :href="item.url"
        target="_blank"
        class="block group"
      >
        <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:border-blue-200 border-l-4 border-l-transparent hover:border-l-blue-600 flex items-center gap-4">
          <div class="relative shrink-0">
            <img 
              :src="item.avatar || 'https://ui-avatars.com/api/?name=' + item.name" 
              :alt="item.name"
              class="w-16 h-16 rounded-full object-cover border-2 border-gray-100 group-hover:border-blue-200 transition-colors bg-gray-50"
            >
            <div class="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
              <Icon name="lucide:link" class="w-3 h-3 text-gray-400" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
              {{ item.name }}
            </h3>
            <p class="text-xs text-gray-500 mt-1 truncate">
              {{ item.url.replace('https://', '').replace('http://', '').replace(/\/$/, '') }}
            </p>
          </div>
        </div>
      </a>
    </div>

    <!-- 感谢列表 -->
    <div class="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
      <h2 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Icon name="lucide:package" class="text-2xl text-blue-600" />
        主要依赖库
      </h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <a 
          v-for="(lib, index) in libs" 
          :key="index"
          :href="lib.url"
          target="_blank"
          class="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:scale-150 transition-transform"></span>
          {{ lib.name }}
        </a>
      </div>
    </div>

    <!-- 申请友链 -->
    <div class="mt-8 text-center text-gray-500 text-sm">
      申请友链请联系我
    </div>
  </div>
</template>

<script setup lang="ts">
const friends = ref<any[]>([])

const { data, pending, error, refresh } = await useFetch('/api/content', {
  query: { 
    repo: 'blogUse', 
    path: 'friends.md' 
  }
})

watch(data, (newData) => {
  if (newData && newData.decodedContent) {
    const content = newData.decodedContent
    try {
      const parts = content.split('***')
      if (parts.length > 1) {
        const lines = parts[1].split('\n')
        const items = []
        
        for (const line of lines) {
          const trimmedLine = line.trim()
          if (!trimmedLine) continue
          
          // 解析格式: [名称](链接) | 头像地址
          // 正则匹配 [name](url)
          const linkMatch = trimmedLine.match(/\[(.*?)\]\((.*?)\)/)
          if (linkMatch) {
            const name = linkMatch[1]
            const url = linkMatch[2]
            // 提取 | 之后的头像地址
            const avatarPart = trimmedLine.split('|')[1]
            const avatar = avatarPart ? avatarPart.trim() : ''
            
            items.push({ name, url, avatar })
          }
        }
        friends.value = items
      }
    } catch (e) {
      console.error('Error parsing friends:', e)
    }
  }
}, { immediate: true })

const libs = [
  { name: "Nuxt 3", url: "https://nuxt.com" },
  { name: "Vue 3", url: "https://vuejs.org" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "Marked", url: "https://github.com/markedjs/marked" },
  { name: "Valine", url: "https://valine.js.org" },
  { name: "Vite", url: "https://vitejs.dev" },
  { name: "Pinia", url: "https://pinia.vuejs.org" }
]

useHead({
  title: '友情链接 - 王勇博的博客'
})
</script>
