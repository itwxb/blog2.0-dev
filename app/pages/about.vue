<template>
  <div class="max-w-4xl mx-auto space-y-8">
    <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <div class="flex flex-col items-center mb-10">
        <img 
          src="https://s2.loli.net/2022/11/27/QhkmBtI7xK2LGNb.jpg" 
          alt="avatar" 
          class="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4"
        >
        <h1 class="text-3xl font-bold text-gray-900">关于我</h1>
        <p class="text-gray-500 mt-2">王勇博 (Arbor)</p>
      </div>

      <div class="space-y-10">
        <!-- 基本信息 -->
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-blue-600 rounded-full"/>
            基本信息
          </h2>
          <div class="bg-gray-50 rounded-xl p-6 text-gray-700 leading-relaxed space-y-2">
            <p>你好，欢迎来到我的博客。</p>
            <p>我是王勇博，男，170cm / 80kg，生于 2002.11。</p>
            <p>家乡河南许昌，单身，不抽烟不喝酒。</p>
            <p>大专学历，现在上海电子厂里打螺丝。</p>
            <p class="text-sm text-gray-400 pt-4 border-t border-gray-200 mt-4">
              此信息更新时间为 2024.10.20
            </p>
          </div>
        </section>

        <!-- 社交平台 -->
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-blue-600 rounded-full"/>
            社交平台
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SocialCard label="微信" value="wyb2017n" icon="ri:wechat-fill" />
            <SocialCard label="QQ" value="3035931836" icon="ri:qq-fill" />
            <SocialCard label="Email" value="arborxb@163.com" icon="lucide:mail" is-link href="mailto:arborxb@163.com" />
            <SocialCard label="交流Q群" value="828789351" icon="lucide:users" />
            
            <SocialCard 
              label="BiliBili" 
              value="偶尔录制点测评视频" 
              icon="ri:bilibili-fill" 
              is-link 
              href="https://space.bilibili.com/688238053" 
            />
            
            <SocialCard 
              label="抖音" 
              value="无聊我就刷抖音" 
              icon="ri:tiktok-fill" 
              is-link 
              href="https://v.douyin.com/iDTnsanr" 
            />
            
            <SocialCard 
              label="GitHub" 
              value="全球最大的同性交友网站" 
              icon="lucide:github" 
              is-link 
              href="https://github.com/itwxb" 
            />
          </div>
        </section>

        <!-- 专业技能 -->
        <section>
          <h2 class="text-xl font-bold text-blue-600 mb-4 flex items-center gap-2">
            <span class="w-1 h-6 bg-blue-600 rounded-full"/>
            专业技能
          </h2>
          <div class="flex flex-wrap gap-3">
            <SkillTag name="前端开发 - Vue" color="green" />
            <SkillTag name="自动化脚本开发 - Python" color="blue" />
            <SkillTag name="浏览器脚本开发 - JS" color="yellow" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '关于我 - 王勇博的博客'
})
</script>
