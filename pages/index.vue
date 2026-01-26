<template>
  <div class="h-screen w-screen flex flex-col items-center justify-center bg-white p-4 relative overflow-hidden">
    <!-- 背景装饰 (可选) -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-50 to-white -z-10"></div>

    <h3 class="text-xl md:text-2xl font-medium text-blue-800/80 text-center max-w-3xl leading-relaxed animate-fade-in">
      {{ randomQuote }}
    </h3>
    
    <div class="w-24 h-1 bg-gray-200 my-8 rounded-full"></div>

    <div class="flex gap-4">
      <button 
        @click="goToRandomPage"
        class="px-8 py-2 bg-white border border-gray-100 text-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
      >
        Blog
      </button>
      <NuxtLink 
        to="/about" 
        class="px-8 py-2 bg-white border border-gray-100 text-gray-700 rounded-lg shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300"
      >
        关于我
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { QUOTES, NAV_ITEMS } from '~/utils/constants'

const router = useRouter()

// 这里的第二个参数（工厂函数）只会在状态不存在时执行一次
const randomQuote = useState('home-random-quote', () => QUOTES[Math.floor(Math.random() * QUOTES.length)])

function goToRandomPage() {
  // 随机跳转到除“生活笔记”以外的其他页面
  const paths = NAV_ITEMS.filter(item => item.path !== '/article').map(item => item.path)
  const randomPath = paths[Math.floor(Math.random() * paths.length)]
  router.push(randomPath)
}

definePageMeta({
  layout: false // 首页不使用默认布局
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
