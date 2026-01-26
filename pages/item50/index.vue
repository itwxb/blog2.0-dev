<template>
  <div class="max-w-6xl mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <Icon name="lucide:zap" class="text-3xl text-blue-600" />
          50个项目
        </h1>
        <div class="text-sm text-gray-500 mt-1">
          HTML/CSS/JS 练手小项目合集
        </div>
      </div>
      
      <div class="bg-blue-50 text-blue-700 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
        <Icon name="lucide:video" class="text-lg" />
        <span>以下所有项目我都在B站有讲解视频，如果感兴趣可以看下</span>
        <a 
          href="https://www.bilibili.com/video/BV1BN4y1j77w/?spm_id_from=333.999.0.0&vd_source=e8d2e64354b8c7c2e62d762225f0d052" 
          target="_blank"
          class="font-bold underline hover:text-blue-800"
        >
          点击前去观看
        </a>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <a 
        v-for="item in items" 
        :key="item.index"
        :href="item.link"
        target="_blank"
        class="block group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div class="aspect-video bg-gray-100 overflow-hidden relative">
          <img 
            :src="item.imgUrl" 
            :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          >
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span class="bg-white/90 text-gray-900 px-4 py-2 rounded-full text-sm font-medium shadow-sm transform translate-y-2 group-hover:translate-y-0 transition-all">
              点击前往
            </span>
          </div>
        </div>
        
        <div class="p-4">
          <h3 class="font-bold text-gray-800 mb-1 truncate" :title="item.title">
            {{ item.title }}
          </h3>
          <div class="flex justify-between items-center text-xs text-gray-500">
            <span>{{ item.index }}. {{ item.img }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const imgList = [
  { img: "expanding-cards", title: "扩展卡片" },
  { img: "progress-steps", title: "步骤器" },
  { img: "Rotating navigation animation", title: "旋转导航" },
  { img: "Hidden Search Widget", title: "隐藏搜索小部件" },
  { img: "Blurry Loading", title: "模糊加载" },
  { img: "Scroll Animation", title: "滚动动画" },
  { img: "Split Landing Page", title: "拆分登录页面" },
  { img: "Form Wave", title: "登录波浪动画" },
  { img: "Sound Board", title: "音板" },
  { img: "Dad Jokes", title: "随机笑话" },
  { img: "Event Keycodes", title: "键盘事件" },
  { img: "Faq Collapse", title: "答题卡" },
  { img: "Random Choice Picker", title: "随机选择器" },
  { img: "Animated Navigation", title: "动画导航" },
  { img: "Incrementing Counter", title: "递增计数器" },
  { img: "Drink Water", title: "喝水记录" },
  { img: "Movie App", title: "电影的应用" },
  { img: "Background Slider", title: "背景轮播" },
  { img: "Theme Clock", title: "主题时钟" },
  { img: "Button Ripple Effect", title: "按钮涟漪效果" },
  { img: "Drag N Drop", title: "拖放" },
  { img: "Drawing App", title: "画板" },
  { img: "Kinetic Loader", title: "动态加载" },
  { img: "Content Placeholder", title: "个人介绍" },
  { img: "Sticky Navbar", title: "固定导航页面" },
  { img: "Double Vertical Slider", title: "双向垂直滑块" },
  { img: "Toast Notification", title: "消息条通知" },
  { img: "Github Profiles", title: "Github API获取" },
  { img: "Double Click Heart", title: "双击出现红心" },
  { img: "Auto Text Effect", title: "文本自动出现" },
  { img: "Password Generator", title: "密码生成器" },
  { img: "Good Cheap Fast", title: "选择" },
  { img: "Notes App", title: "记事本" },
  { img: "Animated Countdown", title: "动画倒计时" },
  { img: "Image Carousel", title: "图像轮播" },
  { img: "Hoverboard", title: "鼠标滑过变效果" },
  { img: "Pokedex", title: "口袋妖怪图鉴" },
  { img: "Mobile Tab Navigation", title: "手机导航" },
  { img: "Password Strength Background", title: "输入密码背景变化" },
  { img: "3d Background Boxes", title: "3d背景框" },
  { img: "Verify Account Ui", title: "验证码输入" },
  { img: "Live User Filter", title: "在线搜索用户" },
  { img: "Feedback Ui Design", title: "反馈意见" },
  { img: "Custom Range Slider", title: "自定义范围滑块" },
  { img: "Netflix Mobile Navigation", title: "移动导航" },
  { img: "Quiz App", title: "移动导航" },
  { img: "Testimonial Box Switcher", title: "动画自动切换" },
  { img: "Random Image Feed", title: "随机图像" },
  { img: "Todo List", title: "TodoList" },
  { img: "Insect Catch Game", title: "捉虫游戏" },
]

const items = computed(() => {
  return imgList.map((item, index) => {
    const imgName = item.img.replace(/ /g, "-").toLowerCase()
    return {
      ...item,
      index: index + 1,
      imgUrl: `/assets/50Item-images/${index + 1}-${imgName}.png`,
      link: index + 1 === 17 ? '/50item/404/404.html' : `/50item/${index + 1}/index.html`
    }
  })
})

useHead({
  title: '50个项目 - 王勇博的博客'
})
</script>
