<template>
  <div 
    class="mx-auto space-y-6 transition-all duration-500 ease-in-out"
    :class="isSidebarCollapsed ? 'max-w-6xl' : 'max-w-4xl'"
  >
    <!-- Sticky Top Actions / Breadcrumbs -->
    <div id="detail-nav" class="sticky top-0 z-30 -mx-4 px-4 py-3 bg-gray-50/80 backdrop-blur-md border-b border-transparent transition-all">
      <div class="flex items-center justify-between">
        <button 
          class="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors group"
          @click="goBack"
        >
          <div class="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all">
            <Icon name="lucide:arrow-left" class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span class="text-sm font-medium">返回列表</span>
        </button>

        <div class="flex items-center gap-2 text-xs text-gray-400">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors">首页</NuxtLink>
          <Icon name="lucide:chevron-right" class="w-3 h-3" />
          <span class="text-gray-300 line-clamp-1 max-w-[150px] md:max-w-xs">{{ post?.title || '正文详情' }}</span>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[50vh]">
      <div v-if="pending" class="p-8 lg:p-12 space-y-6">
        <div class="h-10 bg-gray-50 rounded-lg w-3/4 animate-pulse"/>
        <div class="flex gap-4">
          <div class="h-4 bg-gray-50 rounded w-24 animate-pulse"/>
          <div class="h-4 bg-gray-50 rounded w-32 animate-pulse"/>
        </div>
        <div class="space-y-3 mt-10">
          <div v-for="i in 10" :key="i" :class="['h-4 bg-gray-50 rounded animate-pulse', i % 3 === 0 ? 'w-full' : 'w-5/6']"/>
        </div>
      </div>

      <div v-else-if="error" class="p-20 text-center flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <Icon name="lucide:alert-circle" class="w-8 h-8" />
        </div>
        <p class="text-gray-500">文章加载失败，可能已被删除或网络连接问题</p>
        <button class="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all" @click="router.back()">
          返回上一页
        </button>
      </div>

      <article v-else class="p-8 lg:p-12">
        <!-- Header -->
        <header class="mb-10 border-b border-gray-50 pb-10 max-w-4xl mx-auto">
          <div class="flex flex-wrap gap-2 mb-4">
            <span 
              v-for="label in post.labels" 
              :key="label.id"
              class="px-2.5 py-1 rounded-md text-xs font-medium"
              :style="{ backgroundColor: `#${label.color}15`, color: `#${label.color}` }"
            >
              {{ label.name }}
            </span>
          </div>
          
          <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {{ post.title }}
          </h1>
          
          <div class="flex items-center gap-6 text-sm text-gray-500">
            <div class="flex items-center gap-2">
              <img :src="post.user.avatar_url" class="w-8 h-8 rounded-full border border-gray-100" alt="author">
              <span class="font-medium text-gray-700">{{ post.user.login }}</span>
            </div>
            <div class="flex items-center gap-1.5">
              <Icon name="lucide:calendar" class="w-4 h-4" />
              <time>{{ new Date(post.created_at).toLocaleDateString() }}</time>
            </div>
            <div class="flex items-center gap-1.5 ml-auto">
              <a :href="post.html_url" target="_blank" class="flex items-center gap-1.5 text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
                <Icon name="lucide:github" class="w-3.5 h-3.5" />
                在 GitHub 查看
              </a>
            </div>
          </div>
        </header>

        <!-- Content -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div 
          class="prose prose-lg prose-blue prose-img:rounded-2xl prose-headings:text-gray-900 prose-a:no-underline hover:prose-a:underline max-w-4xl mx-auto" 
          v-html="renderedContent"
        />
        
        <!-- Footer Info -->
        <div class="mt-16 pt-8 border-t border-gray-50 flex items-center justify-between text-sm text-gray-400">
          <p>© {{ new Date().getFullYear() }} {{ post.user.login }} · 本文由 GitHub Issues 同步</p>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1"><Icon name="lucide:message-circle" class="w-4 h-4" /> {{ post.comments }} 评论</span>
          </div>
        </div>
      </article>
    </div>

    <!-- Back to Top FAB -->
    <button 
      v-show="showBackToTop"
      class="fixed bottom-8 right-8 w-12 h-12 bg-white shadow-xl border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-200 transition-all z-50 hover:-translate-y-1"
      title="回到顶部"
      @click="scrollToTop"
    >
      <Icon name="lucide:arrow-up" class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { marked } from 'marked'
import type { Post } from '~/utils/types'

const route = useRoute()
const router = useRouter()
const id = route.params.id
const showBackToTop = ref(false)

// 使用共享的侧边栏状态来动态调整宽度
const { isSidebarCollapsed } = useSidebar()

const { data: post, pending, error } = await useFetch<Post>(`/api/post/${id}`)

const renderedContent = computed(() => {
  if (!post.value?.body) return ''
  return marked.parse(post.value.body)
})

const goBack = () => {
  // 如果是直接打开的页面（没有历史记录），则跳转到列表页
  if (window.history.length <= 1) {
    router.push('/article')
  } else {
    router.back()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const handleScroll = () => {
    showBackToTop.value = window.scrollY > 500
    
    // 动态调整粘性导航栏的边框
    const nav = document.getElementById('detail-nav')
    if (nav) {
      if (window.scrollY > 20) {
        nav.classList.add('border-gray-100', 'shadow-sm')
      } else {
        nav.classList.remove('border-gray-100', 'shadow-sm')
      }
    }
  }
  
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})

useHead({
  title: computed(() => post.value ? `${post.value.title} - 王勇博的博客` : '加载中...')
})
</script>

<style>
/* 简单的 Markdown 样式修正，配合 Tailwind Typography 插件会更好，这里手动补一些 */
.prose h1 { @apply text-3xl font-bold mt-8 mb-4; }
.prose h2 { @apply text-2xl font-bold mt-6 mb-3; }
.prose p { @apply mb-4 leading-relaxed text-gray-700; }
.prose pre { @apply bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4; }
.prose code { @apply bg-gray-100 text-red-500 px-1 py-0.5 rounded text-sm font-mono; }
.prose pre code { @apply bg-transparent text-inherit p-0; }
.prose img { @apply max-w-full h-auto mx-auto; }
.prose blockquote { @apply border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4; }
.prose ul { @apply list-disc list-inside mb-4; }
.prose ol { @apply list-decimal list-inside mb-4; }
.prose a { @apply text-blue-600 hover:underline; }
</style>
