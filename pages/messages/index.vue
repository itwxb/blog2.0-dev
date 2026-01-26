<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
        <Icon name="lucide:message-square" class="text-3xl text-blue-600" />
        留言板
      </h1>
      <div class="text-sm text-gray-500">
        欢迎留下你的足迹
      </div>
    </div>

    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <ClientOnly>
        <ValineComment />
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '留言板 - 王勇博的博客'
})
</script>
