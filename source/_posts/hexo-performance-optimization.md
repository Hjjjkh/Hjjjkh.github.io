---
title: Hexo 博客性能优化实践：加载速度提升指南
date: 2025-11-15 14:30:00
categories:
  - 博客搭建
  - Hexo 性能优化
tags:
  - Hexo
  - 性能优化
  - CDN
  - 压缩
  - Fluid
description: 详细记录 Hexo 博客的性能优化实战过程，包括 DNS 预解析、资源压缩、CDN 加速、图片懒加载等技术，有效提升博客加载速度。
keywords: Hexo 性能优化, 网站加速, DNS 预解析, 资源压缩, CDN, 图片懒加载, hexo-neat
cover: /img/default.png
---

## 前言

一个加载缓慢的博客会让访客失去耐心，据统计，如果页面加载时间超过 3 秒，超过 50% 的用户会选择离开。本文将详细记录我是如何将 Hexo 博客的加载时间从 3 秒优化到 1 秒以内的完整过程，希望能为你的博客优化提供参考。

<!-- more -->

## 优化前的性能分析

在开始优化之前，我使用 Google PageSpeed Insights 对博客进行了测试：

- **首屏加载时间**: 3.2 秒
- **总资源大小**: 1.8 MB
- **请求数量**: 42 个
- **性能评分**: 68 分

主要问题：
1. DNS 查询时间过长（第三方资源）
2. CSS 和 JS 文件未压缩
3. 图片体积过大
4. 缺少资源缓存策略

## 优化 1：DNS 预解析

### 什么是 DNS 预解析？

当浏览器加载第三方资源（如 CDN、统计服务）时，需要先进行 DNS 查询来解析域名。DNS 预解析可以让浏览器在空闲时提前解析这些域名，从而减少实际请求时的延迟。

### 实施步骤

在 Fluid 主题配置文件 `_config.fluid.yml` 中添加自定义 HTML 头部：

```yaml
# _config.fluid.yml

custom_head: |
  <!-- DNS 预解析，提前解析第三方域名 -->
  <link rel="dns-prefetch" href="//lib.baomitu.com">
  <link rel="dns-prefetch" href="//busuanzi.ibruce.info">
  <link rel="dns-prefetch" href="//registry.npmmirror.com">
  <link rel="preconnect" href="//lib.baomitu.com" crossorigin>
  <link rel="preconnect" href="//busuanzi.ibruce.info" crossorigin>
```

**解释**：
- `dns-prefetch`: 仅进行 DNS 查询
- `preconnect`: 不仅进行 DNS 查询，还建立 TCP 连接和 TLS 握手（更彻底，但开销更大）

### 效果

- DNS 查询时间减少：50-100ms
- 首屏加载时间减少：约 200ms

## 优化 2：资源压缩

### 为什么要压缩？

未压缩的 HTML、CSS 和 JavaScript 文件包含大量空格、换行和注释，这些都会增加文件大小和传输时间。压缩可以减少 30-50% 的文件体积。

### 安装 hexo-neat 插件

```bash
pnpm install hexo-neat --save
```

### 配置压缩选项

在 Hexo 主配置文件 `_config.yml` 中添加：

```yaml
# _config.yml

# 资源压缩
neat_enable: true

neat_html:
  enable: true
  exclude:
    - '**/*.min.html'

neat_css:
  enable: true
  exclude:
    - '**/*.min.css'

neat_js:
  enable: true
  mangle: true
  compress:
    warnings: false
  exclude:
    - '**/*.min.js'
```

**配置说明**：
- `neat_html`: 压缩 HTML，移除空格和注释
- `neat_css`: 压缩 CSS
- `neat_js`: 压缩 JavaScript
  - `mangle`: 混淆变量名（进一步减小体积）
  - `compress.warnings: false`: 不显示压缩警告
- `exclude`: 排除已经压缩过的 `.min.*` 文件

### 效果

- HTML 文件减少：约 20%
- CSS 文件减少：约 35%
- JavaScript 文件减少：约 40%
- 总体积减少：从 1.8 MB 到 1.2 MB

## 优化 3：使用国内 CDN

### 为什么选择国内 CDN？

对于国内用户，使用国内 CDN（如百度 CDN）可以大幅提升资源加载速度，避免访问国外 CDN 时的网络延迟。

### 配置 Fluid 主题使用百度 CDN

在 `_config.fluid.yml` 中：

```yaml
# _config.fluid.yml

static_prefix:
  # 内部静态
  internal_js: /js
  internal_css: /css
  internal_img: /img

  anchor: https://lib.baomitu.com/anchor-js/5.0.0/
  github_markdown: https://lib.baomitu.com/github-markdown-css/5.5.1/
  jquery: https://lib.baomitu.com/jquery/3.7.1/
  bootstrap: https://lib.baomitu.com/twitter-bootstrap/4.6.2/
  prismjs: https://lib.baomitu.com/prism/1.29.0/
  tocbot: https://lib.baomitu.com/tocbot/4.25.0/
  typed: https://lib.baomitu.com/typed.js/2.1.0/
  fancybox: https://lib.baomitu.com/fancybox/3.5.7/
  nprogress: https://lib.baomitu.com/nprogress/0.2.0/
  mathjax: https://lib.baomitu.com/mathjax/3.2.2/
  katex: https://lib.baomitu.com/KaTeX/0.16.9/
  busuanzi: https://busuanzi.ibruce.info/busuanzi/2.3/
```

### 效果

- 国内访问速度提升：50-80%
- CDN 响应时间：从 800ms 降至 150ms

## 优化 4：图片懒加载

### 什么是图片懒加载？

图片懒加载是指只有当图片进入浏览器可视区域时才开始加载，而不是一次性加载页面上的所有图片。这可以大幅减少首屏加载时间。

### 启用 Fluid 主题的懒加载功能

在 `_config.fluid.yml` 中：

```yaml
# _config.fluid.yml

lazyload:
  enable: true
  loading_img: /img/loading.gif
  onlypost: false
  offset_factor: 2
```

**配置说明**：
- `enable`: 启用懒加载
- `loading_img`: 图片加载时显示的占位图
- `onlypost`: 是否仅在文章页启用（false 表示全站启用）
- `offset_factor`: 提前加载的距离因子（2 表示提前 2 倍屏幕高度开始加载）

### 效果

- 首屏加载时间减少：约 500ms
- 首屏资源大小减少：约 40%

## 优化 5：代码高亮优化

### 问题

默认的代码高亮库（如 Highlight.js）体积较大，且会阻塞页面渲染。

### 解决方案

使用 Prism.js 并启用按需加载：

```yaml
# _config.fluid.yml

code:
  copy_btn: true
  highlight:
    enable: true
    line_number: true
    lib: "prismjs"
    prismjs:
      style: "default"
      preprocess: true
```

### 效果

- 代码高亮库体积减少：约 60%
- 页面渲染速度提升：约 200ms

## 优化 6：启用浏览器缓存

虽然 GitHub Pages 会自动设置一些缓存策略，但我们可以通过 Service Worker 进一步优化。

### 创建 Service Worker（可选）

在 `source` 目录下创建 `sw.js`：

```javascript
// /source/sw.js

const CACHE_NAME = 'blog-cache-v1';
const urlsToCache = [
  '/',
  '/css/main.css',
  '/js/boot.js',
  '/img/avatar.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

**注意**：Service Worker 是一个高级功能，需要谨慎使用，建议在充分测试后再启用。

## 优化结果对比

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首屏加载时间 | 3.2s | 0.9s | 72% |
| 总资源大小 | 1.8 MB | 1.0 MB | 44% |
| 请求数量 | 42 个 | 28 个 | 33% |
| PageSpeed 评分 | 68 分 | 94 分 | 38% |

## 性能监控工具推荐

1. **Google PageSpeed Insights**: https://pagespeed.web.dev/
   - 提供详细的性能报告和优化建议

2. **GTmetrix**: https://gtmetrix.com/
   - 可视化的性能分析和瀑布图

3. **WebPageTest**: https://www.webpagetest.org/
   - 多地域、多浏览器的性能测试

4. **Chrome DevTools**:
   - 按 F12 打开开发者工具
   - 切换到 "Network" 和 "Performance" 面板

## 后续优化建议

1. **图片格式优化**：
   - 使用 WebP 格式（体积比 JPEG 小 25-35%）
   - 使用图片压缩工具（如 TinyPNG）

2. **Critical CSS**：
   - 将首屏 CSS 内联到 HTML 中
   - 延迟加载非关键 CSS

3. **HTTP/2**：
   - GitHub Pages 已支持 HTTP/2
   - 利用多路复用特性

4. **预加载关键资源**：
   ```html
   <link rel="preload" href="/css/main.css" as="style">
   <link rel="preload" href="/js/boot.js" as="script">
   ```

## 总结

通过以上六个优化步骤，我们成功将博客的加载时间从 3.2 秒优化到 0.9 秒，性能评分从 68 分提升到 94 分。性能优化是一个持续的过程，需要根据实际情况不断调整和改进。

记住：**快速的网站不仅能提升用户体验，还能提高搜索引擎排名！**

在下一篇文章中，我将分享如何深度美化和增强 Fluid 主题，敬请期待！
