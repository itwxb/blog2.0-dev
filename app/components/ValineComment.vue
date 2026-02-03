<template>
  <div id="vcomments"/>
</template>

<script setup>
import { onMounted } from 'vue'

const props = defineProps({
  path: {
    type: String,
    default: ''
  }
})

onMounted(async () => {
  try {
    const Valine = (await import('valine')).default
    new Valine({
      el: '#vcomments',
      appId: '9Vi8W59RcaXTWFKj9qAIKAh5-gzGzoHsz',
      appKey: 'DC9k7TUhdKx1nl3bzspQONqT',
      path: props.path || window.location.pathname,
      avatar: 'monsterid',
      placeholder: '欢迎留言...',
      visitor: true, // 阅读量统计
      recordIP: true
    })
  } catch (e) {
    console.error('Valine init failed', e)
  }
})
</script>

<style>
/* Valine Custom Styles if needed */
.v .vlist .vcard .vcontent {
  background-color: transparent !important;
}
</style>
