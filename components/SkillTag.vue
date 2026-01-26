<template>
  <span 
    class="px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-default"
    :class="colorClasses[color]"
  >
    {{ name }}
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
}>()

const colorClasses = {
  blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
  green: 'bg-green-50 text-green-600 hover:bg-green-100',
  yellow: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100',
  red: 'bg-red-50 text-red-600 hover:bg-red-100',
  purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
}
</script>
