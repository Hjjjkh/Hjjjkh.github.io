# 个人技术博客

[![Deploy Status](https://github.com/Hjjjkh/Hjjjkh.github.io/workflows/Deploy%20Hexo%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/Hjjjkh/Hjjjkh.github.io/actions)
[![Hexo Version](https://img.shields.io/badge/Hexo-7.3.0-blue.svg)](https://hexo.io)
[![Theme](https://img.shields.io/badge/Theme-Fluid-brightgreen.svg)](https://github.com/fluid-dev/hexo-theme-fluid)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> 基于 Hexo + Fluid 主题搭建的个人技术博客，专注于 Java、算法、前端等技术分享。

**博客地址：** [https://hjjjkh.github.io](https://hjjjkh.github.io)

## 📚 目录

- [项目简介](#项目简介)
- [分支说明](#分支说明)
- [快速开始](#快速开始)
- [写作指南](#写作指南)
- [部署流程](#部署流程)
- [项目结构](#项目结构)
- [技术栈](#技术栈)
- [优化特性](#优化特性)
- [常见问题](#常见问题)
- [贡献指南](#贡献指南)
- [许可证](#许可证)

## 项目简介

这是一个使用 Hexo 静态博客生成器搭建的个人技术博客，采用了现代化的双分支部署策略：

- **source 分支**：存放博客源代码（当前分支）
- **main 分支**：存放生成的静态网站文件（自动部署）

通过 GitHub Actions 实现自动化部署，推送到 source 分支后会自动构建并部署到 main 分支。

## 🌿 分支说明

### source 分支（源码分支）

**当前分支** - 这是博客的开发分支，包含所有源代码。

**包含内容：**
- Hexo 配置文件
- 主题文件
- Markdown 文章源文件
- 依赖配置
- GitHub Actions 工作流

**用途：**
- 日常开发和写作
- 修改博客配置
- 主题定制
- 文章管理

### main 分支（部署分支）

**部署分支** - 由 GitHub Actions 自动维护，存放生成的静态网站。

**包含内容：**
- HTML、CSS、JS 等静态文件
- 图片、字体等资源文件

**注意：**
- ⚠️ 不要手动修改此分支
- ⚠️ 所有内容由自动化流程生成

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- pnpm >= 8.0.0（推荐）或 npm
- Git

### 克隆仓库

```bash
# 克隆仓库（默认会克隆 source 分支）
git clone https://github.com/Hjjjkh/Hjjjkh.github.io.git
cd Hjjjkh.github.io

# 如果默认分支不是 source，手动切换
git checkout source
```

### 安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 本地预览

```bash
# 启动本地服务器
npx hexo server
# 或
npm run server

# 访问 http://localhost:4000
```

### 清理缓存

```bash
# 清理缓存和生成的文件
npx hexo clean

# 重新生成
npx hexo generate
```

## ✍️ 写作指南

### 创建新文章

```bash
# 创建新文章
hexo new post "文章标题"

# 创建草稿
hexo new draft "草稿标题"

# 将草稿发布为文章
hexo publish draft "草稿标题"
```

### 文章 Front Matter 模板

```yaml
---
title: 文章标题
date: 2025-11-15 14:20:23
updated: 2025-11-15 14:20:23
tags:
  - 标签1
  - 标签2
categories:
  - 分类名称
description: 文章摘要描述
keywords: 关键词1, 关键词2
top_img: /img/cover.jpg  # 文章顶部图片
cover: /img/cover.jpg     # 文章封面图片
comments: true            # 是否开启评论
toc: true                 # 是否显示目录
---
```

### 文章写作技巧

1. **使用摘要分隔符**
   ```markdown
   文章开头的摘要内容...
   
   <!-- more -->
   
   文章正文内容...
   ```

2. **插入图片**
   ```markdown
   # 使用相对路径
   ![图片描述](/img/example.jpg)
   
   # 使用外部链接
   ![图片描述](https://example.com/image.jpg)
   ```

3. **代码高亮**
   ````markdown
   ```javascript
   function hello() {
     console.log('Hello World!');
   }
   ```
   ````

4. **引用其他文章**
   ```markdown
   [文章标题](/posts/article-name/)
   ```

## 🔄 部署流程

### 自动部署（推荐）

只需推送到 source 分支，GitHub Actions 会自动完成部署：

```bash
# 1. 编写或修改文章
hexo new post "my-article"

# 2. 本地预览（可选）
hexo server

# 3. 提交更改
git add .
git commit -m "Add new post: my-article"

# 4. 推送到 source 分支
git push origin source
```

**部署流程：**
1. 推送代码到 source 分支
2. GitHub Actions 自动触发
3. 安装依赖并构建静态文件
4. 部署到 main 分支
5. GitHub Pages 自动发布

**查看部署状态：**
- 访问 [Actions 页面](https://github.com/Hjjjkh/Hjjjkh.github.io/actions)
- 查看工作流运行日志

### 手动部署（不推荐）

```bash
# 生成静态文件
hexo generate

# 部署到 GitHub Pages
hexo deploy
```

## 📁 项目结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 工作流
├── node_modules/               # 依赖包（不提交）
├── public/                     # 生成的静态文件（不提交）
├── scaffolds/                  # 文章模板
│   ├── draft.md               # 草稿模板
│   ├── page.md                # 页面模板
│   └── post.md                # 文章模板
├── source/                     # 源文件目录
│   ├── _posts/                # 文章目录
│   ├── about/                 # 关于页面
│   └── robots.txt             # SEO 配置
├── themes/                     # 主题目录
│   └── fluid/                 # Fluid 主题
├── .gitignore                 # Git 忽略配置
├── _config.yml                # Hexo 配置文件
├── _config.fluid.yml          # Fluid 主题配置
├── package.json               # 项目依赖配置
├── pnpm-lock.yaml            # pnpm 锁文件
└── README.md                  # 项目说明文档
```

## 🛠️ 技术栈

### 核心框架
- **[Hexo](https://hexo.io/)** - 快速、简洁且高效的博客框架
- **[Fluid](https://github.com/fluid-dev/hexo-theme-fluid)** - 优雅的 Material Design 风格主题

### 部署工具
- **[GitHub Actions](https://github.com/features/actions)** - 自动化 CI/CD
- **[GitHub Pages](https://pages.github.com/)** - 静态网站托管

### 包管理器
- **[pnpm](https://pnpm.io/)** - 快速、节省磁盘空间的包管理器

### 插件列表

```json
{
  "hexo-generator-archive": "归档页面生成",
  "hexo-generator-category": "分类页面生成",
  "hexo-generator-index": "首页生成",
  "hexo-generator-tag": "标签页面生成",
  "hexo-renderer-ejs": "EJS 模板渲染",
  "hexo-renderer-markdown-it": "Markdown 渲染",
  "hexo-renderer-stylus": "Stylus 样式渲染",
  "hexo-server": "本地服务器",
  "hexo-deployer-git": "Git 部署",
  "hexo-generator-sitemap": "站点地图生成",
  "hexo-generator-baidu-sitemap": "百度站点地图",
  "hexo-generator-feed": "RSS 订阅",
  "hexo-filter-nofollow": "外链 nofollow",
  "hexo-auto-canonical": "自动添加 canonical 标签"
}
```

## ⚡ 优化特性

### 性能优化
- ✅ 使用 pnpm 减少依赖安装时间
- ✅ GitHub Actions 缓存加速构建
- ✅ 图片懒加载
- ✅ 代码压缩

### SEO 优化
- ✅ 自动生成 sitemap.xml
- ✅ 百度站点地图支持
- ✅ RSS 订阅功能
- ✅ 外链自动添加 nofollow
- ✅ Canonical URL 支持
- ✅ 结构化数据标记

### 用户体验
- ✅ 响应式设计
- ✅ 暗色模式支持
- ✅ 本地搜索功能
- ✅ 代码高亮
- ✅ 数学公式支持（MathJax）
- ✅ 图表支持（Mermaid）

## ❓ 常见问题

### 1. 如何修改博客配置？

编辑以下文件：
- `_config.yml` - Hexo 基础配置
- `_config.fluid.yml` - Fluid 主题配置

### 2. 如何更换主题？

```bash
# 1. 安装新主题
npm install hexo-theme-xxx

# 2. 修改 _config.yml
theme: xxx

# 3. 如果主题有配置文件，创建对应的配置
# 例如：_config.xxx.yml
```

### 3. 如何添加新页面？

```bash
# 创建新页面
hexo new page "page-name"

# 编辑 source/page-name/index.md
```

### 4. 部署失败怎么办？

1. 检查 [Actions 页面](https://github.com/Hjjjkh/Hjjjkh.github.io/actions) 的错误日志
2. 确认 GitHub Actions 已启用
3. 检查 `deploy.yml` 配置是否正确
4. 查看 [部署文档](/posts/hexo-dual-branch-deployment/)

### 5. 如何备份博客？

source 分支本身就是备份，只需定期推送到 GitHub：

```bash
git push origin source
```

### 6. 如何迁移到新电脑？

```bash
# 克隆仓库
git clone https://github.com/Hjjjkh/Hjjjkh.github.io.git
cd Hjjjkh.github.io

# 切换到 source 分支
git checkout source

# 安装依赖
pnpm install

# 开始写作
hexo new post "new-article"
```

## 🤝 贡献指南

欢迎提出建议和改进！

### 贡献方式

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 提交信息使用中文，格式清晰
- 文章使用 Markdown 格式
- 代码遵循项目现有风格

## 📝 更新日志

### 2025-11-15
- ✨ 实现双分支部署策略
- 📝 添加详细的 README 文档
- 🚀 优化 GitHub Actions 工作流
- 📖 新增《Hexo 双分支部署实战》文章

### 历史更新
- 查看 [Commits](https://github.com/Hjjjkh/Hjjjkh.github.io/commits/source) 了解详细更新历史

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔗 相关链接

- **博客地址：** [https://hjjjkh.github.io](https://hjjjkh.github.io)
- **Hexo 官网：** [https://hexo.io](https://hexo.io)
- **Fluid 主题：** [https://github.com/fluid-dev/hexo-theme-fluid](https://github.com/fluid-dev/hexo-theme-fluid)
- **问题反馈：** [Issues](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)

## 📧 联系方式

如有问题或建议，欢迎通过以下方式联系：

- GitHub Issues: [提交问题](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)
- 博客评论: 在文章下方留言

---

⭐ 如果这个项目对你有帮助，欢迎 Star！

**Happy Blogging! 📝**
