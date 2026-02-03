<template>
  <component 
    :is="isLink ? 'a' : 'div'" 
    :href="href"
    :target="isLink ? '_blank' : undefined"
    class="flex items-center p-4 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 group"
    :class="{ 'cursor-pointer hover:border-blue-200': isLink }"
  >
    <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-xl mr-4 group-hover:scale-110 transition-transform">
      <Icon :name="icon" class="text-blue-600" />
    </div>
    <div>
      <div class="text-sm text-gray-400 mb-0.5">{{ label }}</div>
      <div class="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
        {{ value }}
      </div>
    </div>
    <div v-if="isLink" class="ml-auto text-gray-300 group-hover:text-blue-400">
      ↗
    </div>
  </component>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  value: string
  icon: string
  isLink?: boolean
  href?: string
}>()
</script>
