---
title: Hexo 博客 SEO 优化实践指南
date: 2025-11-15 14:00:00
categories:
  - 博客搭建
  - Hexo SEO
tags:
  - Hexo
  - SEO
  - 优化
  - Fluid
description: 一份实用的 Hexo 博客 SEO 优化指南，涵盖 Sitemap、robots.txt、关键词、链接优化、CDN 加速等方面，帮助你的博客在搜索引擎中获得更好的排名。
keywords: Hexo SEO, Hexo 优化, Fluid 主题, Sitemap, robots.txt, 搜索引擎优化, 博客优化
cover: /img/default.png
---

## 前言

搭建一个 Hexo 博客只是第一步，如何让更多人通过搜索引擎找到你的内容，才是提升博客价值的关键。SEO (Search Engine Optimization) 就是我们实现这一目标的利器。本文将详细记录我是如何一步步对我的 Hexo 博客进行终极 SEO 优化的，希望能为你的博客带来更多流量。

<!-- more -->

## 1. 基础配置：让搜索引擎“认识”你

首先，我们需要在 Hexo 的主配置文件 `_config.yml` 中，完善网站的基础信息。这些信息是搜索引擎了解你网站的第一窗口。

```yaml
# _config.yml

title: 李国强的技术博客
subtitle: '分享Java、数据结构与算法的学习之旅'
description: '记录编程学习、项目实践和技术成长，专注于Java后端开发、数据结构与算法、Spring Boot等技术分享'
keywords: Java, 数据结构, 算法, 后端开发, 编程学习, Spring Boot, 技术博客, 李国强
author: 李国强
language: zh-CN
url: https://Hjjjkh.github.io
root: /
```

- **`title`, `description`, `keywords`**: 这是网站的“三围”，务必认真填写，它们会作为你网站的默认元数据。
- **`url`**: 必须填写你博客的最终访问地址，这对生成正确的站点地图和规范链接至关重要。

## 2. 优化 URL 结构 (Permalink)

一个简洁、语义化的 URL 结构对 SEO 非常友好。Hexo 默认的 `/:year/:month/:day/:title/` 结构层级太深，且包含非 ASCII 字符时可能出现问题。

我们通过安装 `hexo-abbrlink` 插件，生成一个独一无二的短链接。

**安装插件**:
```bash
pnpm install hexo-abbrlink --save
```

**配置 `_config.yml`**:
```yaml
# _config.yml

permalink: posts/:abbrlink.html

abbrlink:
  alg: crc32  # 算法
  rep: hex    # 进制
```

这样，你的文章链接就会变成 `https://your.domain/posts/a1b2c3d4.html`，既美观又对 SEO 友好。

## 3. 生成站点地图 (Sitemap)

Sitemap (站点地图) 是一个 XML 文件，它告诉搜索引擎你的网站上有哪些页面可以抓取。这对于新网站尤其重要，可以大大加快收录速度。

**安装插件**:
```bash
pnpm install hexo-generator-sitemap hexo-generator-baidu-sitemap --save
```

**配置 `_config.yml`**:
```yaml
# _config.yml

# Sitemap
sitemap:
  path: sitemap.xml

# 百度 Sitemap
baidusitemap:
  path: baidusitemap.xml
```

生成博客后，你会在根目录找到 `sitemap.xml` 和 `baidusitemap.xml`。记得将这两个文件的链接提交到 Google Search Console 和百度站长平台。

## 4. 创建 `robots.txt`

`robots.txt` 文件用于告诉爬虫哪些内容可以抓取，哪些需要忽略。一个好的 `robots.txt` 可以避免爬虫在不重要的页面（如后台、CSS/JS 文件）上浪费时间和资源。

在 `source` 目录下创建一个 `robots.txt` 文件：

```txt
# /source/robots.txt

User-agent: *
Allow: /

Disallow: /js/
Disallow: /css/
Disallow: /img/

Sitemap: https://Hjjjkh.github.io/sitemap.xml
Sitemap: https://Hjjjkh.github.io/baidusitemap.xml
```

这个配置允许所有爬虫抓取所有页面，但忽略了静态资源目录，并指明了站点地图的位置。

## 5. 优化文章的 SEO 元数据

除了全局配置，每一篇文章都应该有自己独立的 `description` 和 `keywords`。这能让搜索引擎更精确地了解每一页的内容。

在每篇文章的 Front-matter 中添加：

```yaml
---
title: Hexo 博客终极 SEO 优化指南
date: 2025-11-15 14:00:00
description: 一份全面的 Hexo 博客 SEO 优化指南，涵盖 Sitemap、robots.txt、关键词、链接优化等方面，帮助你的博客获得更好的排名。
keywords: Hexo SEO, Hexo 优化, Sitemap, robots.txt
---
```

- **`description`**: 100-160 字，是对文章内容的精准概括。
- **`keywords`**: 3-5 个与文章内容最相关的关键词。

## 6. Fluid 主题的 SEO 增强功能

我们使用的 Fluid 主题内置了许多强大的 SEO 功能，只需要在 `_config.fluid.yml` 中开启即可。

- **规范链接 (Canonical)**: 避免因 URL 参数等问题导致的内容重复收录。
  ```yaml
  # _config.fluid.yml
  canonical:
    enable: true
  ```

- **Open Graph (OG) 协议**: 优化你的内容在社交媒体（如微信、Facebook）分享时的展示效果。
  ```yaml
  # _config.fluid.yml
  open_graph:
    enable: true
    twitter_card: summary_large_image
  ```

- **强制 HTTPS**: 提升网站安全性，也是 Google 排名的一个因素。
  ```yaml
  # _config.fluid.yml
  force_https: true
  ```

## 总结

通过以上六个步骤，我们已经为 Hexo 博客建立了一个非常坚实的 SEO 基础。SEO 是一个持续优化的过程，但做好这些基础工作，你的博客就已经领先于很多人了。接下来，你需要做的就是持续创作高质量的内容！

在下一篇文章中，我将分享如何进一步优化博客的加载速度，敬请期待！
