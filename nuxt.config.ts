// 启动检测 GITHUB_TOKEN
if (!process.env.GITHUB_TOKEN) {
  console.warn('\x1b[33m%s\x1b[0m', '⚠️  [配置警告] 未检测到 GITHUB_TOKEN！')
  console.warn('\x1b[33m%s\x1b[0m', '   GitHub API 请求次数将受限，部分功能可能无法正常工作。')
  console.warn('\x1b[33m%s\x1b[0m', '   请创建 .env 文件并设置 GITHUB_TOKEN。参考 .env.example 文件。')
}

export default defineNuxtConfig({
  compatibilityDate: '2026-02-03',
  future: {
    compatibilityVersion: 4,
  },
  ssr: true,
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'], // 引入全局样式 防止首屏闪烁
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/eslint'
  ],
  app: {
    head: {
      title: '王勇博的博客',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '王勇博的博客，记录我的生活' }
      ]
    }
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
    githubClientId: process.env.GITHUB_CLIENT_ID || '',
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    public: {
      githubOwner: process.env.GITHUB_OWNER || 'itwxb',
      githubRepo: process.env.GITHUB_REPO || 'blog'
    }
  }
})
