<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">生活笔记</h2>
        <p class="text-gray-500 mt-1">记录生活点滴与思考</p>
      </div>
      <div class="hidden md:block text-blue-100">
        <Icon v-if="isUnlocked" name="lucide:notebook-pen" class="text-5xl text-blue-500" />
        <Icon v-else name="lucide:lock" class="text-5xl text-gray-300" />
      </div>
    </div>

    <!-- Lock Screen -->
    <div v-if="!isUnlocked" class="bg-white rounded-3xl p-12 shadow-sm border border-gray-100 text-center space-y-6">
      <div class="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon name="lucide:lock" class="text-4xl text-blue-500" />
      </div>
      <div>
        <h3 class="text-xl font-bold text-gray-800">内容已加密</h3>
        <p class="text-gray-500 mt-2">这是一块私密领地，请输入密码查看</p>
      </div>
      
      <div class="max-w-xs mx-auto space-y-4">
        <div class="relative">
          <input 
            v-model="password" 
            type="password" 
            placeholder="请输入访问密码" 
            :class="[
              'w-full px-4 py-3 rounded-xl border outline-none transition-all text-center tracking-[0.5em] font-bold',
              showError ? 'border-red-500 bg-red-50 shake shadow-lg shadow-red-100' : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            ]"
            @keyup.enter="checkPassword"
          >
        </div>
        
        <button 
          @click="checkPassword"
          class="w-full py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
        >
          <Icon name="lucide:key-round" class="w-4 h-4" />
          解锁笔记
        </button>

        <div class="relative py-2">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-100"></div>
          </div>
          <div class="relative flex justify-center text-xs uppercase">
            <span class="bg-white px-2 text-gray-400">或者</span>
          </div>
        </div>

        <button 
          @click="goToRandomPage"
          class="w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-medium hover:bg-gray-100 transition-all flex items-center justify-center gap-2 border border-gray-100"
        >
          <Icon name="lucide:shuffle" class="w-4 h-4" />
          随便逛逛
        </button>
      </div>
    </div>

    <!-- Article Content (Visible only when unlocked) -->
    <template v-else>
      <!-- Loading State (Initial) -->
      <div v-if="pending && page === 1" class="flex flex-col gap-4">
        <SkeletonCard v-for="i in 3" :key="i" />
      </div>

      <!-- Error State (Initial) -->
      <div v-else-if="error && page === 1" class="bg-red-50 text-red-600 p-8 rounded-xl text-center border border-red-100">
        <Icon name="lucide:alert-circle" class="text-4xl mb-2 mx-auto" />
        <p>获取文章失败，请稍后再试。</p>
        <button @click="refresh" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          重试
        </button>
      </div>

      <!-- Article List Container -->
      <div v-else class="space-y-6">
        <div v-if="posts.length > 0" class="grid gap-6">
          <article 
            v-for="post in posts" 
            :key="post.id" 
            class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
          >
            <NuxtLink :to="`/article/${post.number}`" class="block">
              <div class="flex items-start justify-between">
                <h3 class="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {{ post.title }}
                </h3>
                <span class="text-sm text-gray-400 whitespace-nowrap ml-4 flex items-center gap-1">
                  <Icon name="lucide:calendar" class="w-4 h-4" />
                  {{ formatDate(post.created_at) }}
                </span>
              </div>
              
              <p class="mt-3 text-gray-600 line-clamp-3 leading-relaxed">
                {{ getSummary(post.body) }}
              </p>
              
              <div class="mt-4 flex items-center gap-3">
                <div class="flex flex-wrap gap-2">
                  <span 
                    v-for="label in post.labels" 
                    :key="label.id"
                    class="px-2 py-0.5 rounded-md text-xs font-medium"
                    :style="{ backgroundColor: `#${label.color}15`, color: `#${label.color}` }"
                  >
                    {{ label.name }}
                  </span>
                </div>
                <div class="ml-auto flex items-center text-sm text-gray-400 gap-4">
                  <span class="flex items-center gap-1">
                    <Icon name="lucide:message-circle" class="w-4 h-4" /> {{ post.comments }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </article>
        </div>

        <!-- Bottom States (Loading / Error / End) -->
        <div v-if="!isEnd" ref="sentinelRef" class="py-4">
          <!-- Loading More -->
          <div v-if="pending" class="space-y-6">
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
        
        <!-- No More Data -->
        <div v-if="isEnd && posts.length > 0" class="text-center py-12">
          <div class="inline-flex items-center gap-2 px-6 py-2 bg-gray-50 text-gray-400 text-sm rounded-full border border-gray-100">
            <Icon name="lucide:smile" class="w-4 h-4" />
            已经到底啦，去看看别的吧 ~
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="posts.length === 0 && !pending" class="text-center py-32 bg-white rounded-3xl border border-dashed border-gray-200">
          <Icon name="lucide:book-open" class="text-6xl text-gray-200 mb-4 mx-auto" />
          <p class="text-gray-400">这里还没有文章呢 ~</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { NAV_ITEMS } from '~/utils/constants'

const page = ref(1)
const size = 10
const isEnd = ref(false)
const posts = ref<any[]>([])

const router = useRouter()

// 锁定状态逻辑
const isUnlocked = ref(false)
const password = ref('')
const showError = ref(false)

onMounted(() => {
  if (sessionStorage.getItem('diary_unlocked') === 'true') {
    isUnlocked.value = true
  }
})

function goToRandomPage() {
  const paths = NAV_ITEMS.filter(item => item.path !== '/article').map(item => item.path)
  const randomPath = paths[Math.floor(Math.random() * paths.length)]
  router.push(randomPath)
}

function checkPassword() {
  if (password.value === '2626') {
    isUnlocked.value = true
    sessionStorage.setItem('diary_unlocked', 'true')
    showError.value = false
  } else {
    showError.value = true
    password.value = ''
    // 0.5秒后重置错误状态（配合抖动动画时长）
    setTimeout(() => {
      showError.value = false
    }, 500)
  }
}

const { data, pending, error, refresh } = await useFetch('/api/posts', {
  query: {
    page,
    size,
    labels: 'article' 
  },
  watch: [page]
})

// 无限滚动逻辑
const { sentinelRef } = useInfiniteScroll(() => {
  if (!pending.value && !isEnd.value) {
    page.value++
  }
})

// 当数据返回时，如果是第一页则覆盖，否则追加
watch(data, (newData: any) => {
  if (newData) {
    if (newData.length < size) {
      isEnd.value = true
    }
    if (page.value === 1) {
      posts.value = newData
    } else {
      posts.value.push(...newData)
    }
  }
}, { immediate: true })

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function getSummary(body: string) {
  if (!body) return ''
  // 简单的移除 Markdown 符号，截取前 100 字
  return body.replace(/[#*`>]/g, '').slice(0, 150) + '...'
}

useHead({
  title: '生活笔记 - 王勇博的博客'
})
</script>

<style scoped>
.shake {
  animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
}

@keyframes shake {
  10%, 90% { transform: translate3d(-1px, 0, 0); }
  20%, 80% { transform: translate3d(2px, 0, 0); }
  30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
  40%, 60% { transform: translate3d(4px, 0, 0); }
}
</style>
