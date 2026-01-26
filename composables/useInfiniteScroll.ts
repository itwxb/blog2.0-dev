import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

export function useInfiniteScroll(callback: () => void, options: { threshold?: number; rootMargin?: string } = {}) {
  const sentinelRef = ref<HTMLElement | null>(null)
  let observer: IntersectionObserver | null = null

  const initObserver = () => {
    if (observer) observer.disconnect()
    
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback()
      }
    }, {
      threshold: options.threshold || 0.1,
      rootMargin: options.rootMargin || '100px'
    })

    if (sentinelRef.value) {
      observer.observe(sentinelRef.value)
    }
  }

  onMounted(() => {
    initObserver()
  })

  // 监听 sentinelRef 的变化，处理 v-if 导致元素延迟出现的情况
  watch(sentinelRef, (newEl) => {
    if (newEl) {
      initObserver()
    }
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    sentinelRef
  }
}
