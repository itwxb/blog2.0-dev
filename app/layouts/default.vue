<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- 侧边栏 -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 bg-white shadow-lg transition-all duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen"
      :class="[
        isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64',
        isMobileMenuOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
      ]"
    >
      <div class="h-full flex flex-col overflow-hidden">
        <!-- Logo & Toggle 区域 -->
        <div class="h-16 flex items-center justify-between border-b border-gray-100 px-4 shrink-0 overflow-hidden group/sidebar-header">
          <div class="flex items-center min-w-max">
            <div class="relative w-10 h-10 flex items-center justify-center shrink-0">
              <!-- 呼吸灯底影 -->
              <div class="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg animate-pulse-slow"/>
              <!-- 背景渐变层 -->
              <div class="absolute inset-0 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-xl shadow-[0_4px_12px_rgba(37,99,235,0.3)] transition-transform duration-500 group-hover/sidebar-header:scale-110 group-hover/sidebar-header:rotate-6"/>
              <!-- 内部高光边缘 -->
              <div class="absolute inset-[1px] border border-white/20 rounded-[11px] z-10"/>
              <Icon name="lucide:rocket" class="relative z-20 text-white w-5 h-5 -rotate-12 transition-all duration-500 group-hover/sidebar-header:rotate-0 group-hover/sidebar-header:scale-110 animate-pulse-slow" />
            </div>
            <div 
              class="ml-3 flex items-baseline transition-all duration-300"
              :class="isSidebarCollapsed ? 'lg:opacity-0 lg:w-0 lg:ml-0' : 'opacity-100'"
            >
              <span class="text-lg font-black tracking-tighter text-slate-800 uppercase">
                wang<span class="text-blue-600">yongbo</span>
              </span>
              <span class="ml-0.5 text-xs font-bold text-slate-400">.com</span>
            </div>
          </div>
          
          <!-- 桌面端收起按钮 (移至顶部) -->
          <button 
            class="hidden lg:flex items-center justify-center p-1.5 rounded-md hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all duration-300"
            :class="isSidebarCollapsed ? 'rotate-180' : ''"
            @click="isSidebarCollapsed = !isSidebarCollapsed"
          >
            <Icon name="lucide:chevron-left" class="w-5 h-5" />
          </button>
        </div>
        
        <!-- 导航菜单 -->
        <nav class="flex-1 py-4 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <ul class="space-y-1.5 px-3">
            <li v-for="item in NAV_ITEMS" :key="item.path">
              <NuxtLink 
                :to="item.path" 
                class="flex items-center py-2.5 rounded-xl transition-all duration-200 group relative whitespace-nowrap"
                :class="[
                  isSidebarCollapsed ? 'px-2 justify-center' : 'px-4',
                  'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                ]"
                active-class="bg-blue-50 text-blue-600 font-semibold"
              >
                <Icon 
                  :name="item.icon" 
                  class="shrink-0 transition-all duration-300" 
                  :class="[
                    isSidebarCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3',
                    'text-gray-400 group-hover:text-blue-500 group-[.router-link-active]:text-blue-600'
                  ]" 
                />
                <span 
                  class="transition-all duration-300 overflow-hidden"
                  :class="isSidebarCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100 w-auto'"
                >
                  {{ item.text }}
                </span>
                
                <!-- 迷你模式下的 Tooltip -->
                <div 
                  v-if="isSidebarCollapsed"
                  class="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none z-50 whitespace-nowrap shadow-xl lg:block hidden"
                >
                  {{ item.text }}
                  <!-- Tooltip 小箭头 -->
                  <div class="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-right-gray-900 mr-[-1px]"/>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- 底部版权或辅助信息 (可选) -->
        <div 
          class="p-4 border-t border-gray-100 shrink-0 transition-all duration-300"
          :class="isSidebarCollapsed ? 'opacity-0 h-0 p-0 overflow-hidden' : 'opacity-100'"
        >
          <p class="text-[10px] text-gray-400 text-center uppercase tracking-widest">© 2026 WYB BLOG</p>
        </div>
      </div>
    </aside>

    <!-- 遮罩层 (移动端) -->
    <div 
      v-if="isMobileMenuOpen" 
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
      @click="isMobileMenuOpen = false"
    />

    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- 顶部导航栏 -->
      <header class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 h-16 flex items-center px-4 lg:px-8">
        <button 
          class="lg:hidden p-2 -ml-2 mr-2 rounded-lg hover:bg-gray-100 text-gray-600"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Icon name="lucide:menu" class="w-6 h-6" />
        </button>
        
        <div class="flex items-center gap-3">
          <img 
            src="https://s2.loli.net/2022/11/27/QhkmBtI7xK2LGNb.jpg" 
            alt="avatar" 
            class="w-9 h-9 rounded-full border border-gray-200 hidden sm:block"
          >
          <div class="flex flex-col">
            <h1 class="text-sm font-semibold text-gray-800 leading-none mb-1">王勇博的博客</h1>
            <div class="flex items-center gap-2 text-[10px] sm:text-xs font-medium leading-none">
              <div class="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100/50">
                <span class="relative flex h-1.5 w-1.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"/>
                  <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"/>
                </span>
                <span class="truncate max-w-[150px] sm:max-w-none">梦想之都 MC Server</span>
              </div>
              <span class="hidden sm:block w-px h-3 bg-gray-200 mx-1"/>
              <a 
                href="https://www.mxzd.games" 
                target="_blank" 
                class="flex items-center gap-1 text-gray-400 hover:text-emerald-600 transition-all duration-300 group/link"
              >
                <Icon name="lucide:external-link" class="w-3 h-3 group-hover/link:rotate-12 transition-transform" />
                <span class="hover:underline underline-offset-2">官网</span>
              </a>
            </div>
          </div>
        </div>

        <div class="ml-auto flex items-center gap-4">
          <a 
            href="https://github.com/itwxb" 
            target="_blank" 
            class="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          >
            <Icon name="lucide:github" class="w-6 h-6" />
          </a>
        </div>
      </header>

      <!-- 页面内容 -->
      <main class="p-4 lg:p-8 flex-1">
        <div 
          class="mx-auto transition-all duration-500 ease-in-out"
          :class="isSidebarCollapsed ? 'max-w-6xl' : 'max-w-4xl'"
        >
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from '~/utils/constants'

// 使用共享的侧边栏状态
const { isSidebarCollapsed } = useSidebar()

// 移动端菜单开关
const isMobileMenuOpen = ref(false)

// 路由变化时自动关闭移动端菜单
const route = useRoute()
watch(() => route.path, () => {
  isMobileMenuOpen.value = false
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 10px;
}
aside:hover .custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(0.95); }
}
</style>
