# 🚀 WYB Blog Next

> 一个基于 Nuxt 4 (Future Compatible) 构建的现代化、高性能个人博客系统。使用 GitHub Issues 作为无头 CMS (Headless CMS)。

[![Nuxt 4](https://img.shields.io/badge/Nuxt-4.x-00DC82?style=flat-square&logo=nuxt.svg)](https://nuxt.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3.x-4FC08D?style=flat-square&logo=vue.js)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

## ✨ 特性

- **现代化技术栈**：基于 Nuxt 4 + Vue 3 + Vite + TypeScript 构建，采用最新的 `app/` 目录结构，享受极致的开发体验和运行性能。
- **严格规范**：遵循最严格的代码规范，集成 ESLint 和 TypeScript 类型检查，确保代码质量。
- **无头 CMS**：直接使用 GitHub Issues 撰写和管理文章，无需搭建复杂的后台数据库。
- **安全可靠**：采用 Server API 代理模式，GitHub Token 仅在服务端流转，彻底杜绝前端密钥泄露风险。
- **极致性能**：
  - 支持服务端渲染 (SSR) 与静态生成 (SSG)。
  - 智能资源预取 (Smart Prefetching)。
  - 优化的图片加载与缓存策略。
- **精美 UI**：
  - 基于 Tailwind CSS 的原子化设计。
  - **智能侧边栏**：支持一键折叠，内容区域自适应扩充，享受沉浸式阅读。
  - **优雅导航**：集成粘性头部、面包屑导航与回到顶部功能。
  - 集成 Iconify 工业级图标库。
  - 响应式布局，完美适配移动端与桌面端。
- **功能丰富**：
  - 📝 文章管理 (支持 Markdown、标签分类)
  - 💬 评论系统 (集成 Valine)
  - 🛠️ 动态工具箱：从 GitHub 仓库远程加载，无需修改代码。
  - 📱 动态友链系统：支持远程数据加载。

## 🛠️ 技术栈

- **核心框架**: [Nuxt 4](https://nuxt.com/)
- **UI 框架**: [Tailwind CSS](https://tailwindcss.com/)
- **图标库**: [Nuxt Icon](https://github.com/nuxt-modules/icon) (基于 Iconify)
- **状态管理**: [Pinia](https://pinia.vuejs.org/)
- **代码规范**: ESLint + TypeScript
- **Markdown 解析**: [Marked](https://marked.js.org/)
- **评论系统**: [Valine](https://valine.js.org/)

## 🚀 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) ≥18.x（推荐 20.x+）
- 包管理器 (npm / yarn / pnpm)

### 1. 克隆项目

```bash
git clone https://gitee.com/itwxb/blog2.0-dev.git
git clone https://github.com/itwxb/blog2.0-dev.git
cd blog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

复制环境变量示例文件：

```bash
cp .env.example .env
```

编辑 `.env` 文件，填入您的配置信息：

```ini
# GitHub API Token (必需)
# 用于获取 Issues 数据，建议给予 repo:public_repo 权限
# 生成地址: https://github.com/settings/tokens
GITHUB_TOKEN=your_github_token_here

# 仓库所有者,默认是你的用户名
GITHUB_OWNER=itwxb
# 博客仓库名称
GITHUB_REPO=blog

# 写了token，就不需要client_id和client_secret,此选项几乎弃用,选择token即可
# Legacy Auth (Optional, Token is preferred)
GITHUB_CLIENT_ID=your_client_id_here 
GITHUB_CLIENT_SECRET=your_client_secret_here
```

### 4. 启动开发服务器

```bash
npm run dev
```

### 5. 内容管理 (CMS) 指南

本项目采用特殊的“无后台”管理模式，您可以通过修改 GitHub 仓库中的文件来更新博客内容：

- **文章管理**：在 `GITHUB_REPO` 配置的仓库中发布 **Issues** 即可。
- **工具收藏**：修改 `GITHUB_REPO` 仓库中的 `tools.md` 文件（我是新建了blogUse仓库）。
- **友情链接**：修改 `GITHUB_REPO` 仓库中的 `friends.md` 文件。
  - 格式：`[名称](链接) | 头像地址` (头像可选)

> **注意**：修改后博客会实时同步（可能有 GitHub API 缓存延迟），无需重新部署代码。

### 6. 访问项目

浏览器访问 [http://localhost:3000](http://localhost:3000) 即可看到效果。

## 📂 目录结构

```
├── app/               # Nuxt 4 源码目录
│   ├── assets/        # 静态资源 (CSS)
│   ├── components/    # Vue 组件
│   ├── composables/   # 组合式函数
│   ├── layouts/       # 页面布局
│   ├── pages/         # 页面路由
│   ├── utils/         # 工具函数、类型定义与常量
│   └── app.vue        # 应用入口
├── public/            # 公共静态文件 (图片、静态 HTML 等)
├── server/            # 服务端 API (Nitro)
│   └── api/           # 后端接口代理
├── nuxt.config.ts     # Nuxt 配置文件
└── package.json       # 项目依赖
```

## 💡 开发建议

为了保持代码的高质量和项目的长期可维护性，请遵循以下规范：

- **目录规范**：按照 Nuxt 4 标准，所有新页面、组件、组合式函数均需在 `app/` 目录下创建。
- **类型安全**：
  - 严格遵守 TypeScript 规范，避免使用 `any` 类型。
  - 优先复用 `app/utils/types.ts` 中定义的接口。
  - 新的数据结构应及时补充到类型定义文件中。
- **代码检查**：提交代码前请运行 `npm run lint`，确保符合项目定义的 ESLint 规范。
- **静态资源**：图片、第三方库等无需构建的文件请放置在 `public/` 目录下。

## 🚢 部署与构建

本项目支持多种部署方式。由于使用了 Server API 代理 GitHub 请求，**推荐使用 SSR 模式部署**（如 Vercel 或 Node.js 服务器）。

### 1. 生产环境构建

构建用于生产环境的 Node.js 服务端包：

```bash
npm run build
```

构建完成后，您可以使用以下命令在本地预览生产版本：

```bash
npm run preview
```

### 2. 静态生成 (SSG)

如果您的所有页面内容在构建时即可确定，且不需要实时服务端逻辑，可以将其导出为纯静态 HTML：

```bash
npm run generate
```

生成的静态文件将存放在 `.output/public` 目录中。

### 3. 部署平台推荐

- **Vercel (首选)**: 零配置部署。在 Vercel 导入仓库，并在项目设置中配置好 `.env` 中的环境变量，Vercel 会自动识别 Nuxt 3 并完成构建。
- **私有服务器 (Node.js)**: 将构建后的 `.output` 目录上传到服务器，使用 PM2 或直接执行 `node .output/server/index.mjs` 启动。
- **Docker**:
  ```bash
  docker build -t wyb-blog-next .
  ```

---

## 🤝 贡献

欢迎提交 Pull Request 或 Issue！

1. Fork 本仓库
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request

## 📄 版权

本项目采用 [MIT](LICENSE) 协议开源。

---

**Minecraft Server**: 梦想之都 MC Server - [官网](https://www.mxzd.games)

