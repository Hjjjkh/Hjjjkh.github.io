# 我的技术博客

这是一个基于 Hexo 构建的技术博客，使用 Fluid 主题，主要分享 Java、数据结构与算法相关的学习笔记和项目实践。

## 🚀 快速开始

### 安装依赖

```bash
pnpm install
```

### 本地预览

```bash
pnpm hexo server
```

访问 http://localhost:4000 查看博客

### 生成静态文件

```bash
pnpm hexo generate
```

### 部署

```bash
pnpm hexo deploy
```

## 📝 写作

### 创建新文章

```bash
pnpm hexo new "文章标题"
```

### 创建草稿

```bash
pnpm hexo new draft "草稿标题"
```

### 发布草稿

```bash
pnpm hexo publish "草稿标题"
```

## 🎨 主题

本博客使用 [Fluid](https://github.com/fluid-dev/hexo-theme-fluid) 主题，一个优雅的 Material Design 风格 Hexo 主题。

## 📦 技术栈

- **框架**: Hexo 7.x
- **主题**: Fluid
- **包管理器**: pnpm
- **部署**: GitHub Pages + GitHub Actions

## 🔧 配置

主要配置文件：
- `_config.yml`: Hexo 站点配置
- `_config.fluid.yml`: Fluid 主题配置

## 📂 目录结构

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 自动部署
├── scaffolds/              # 文章模板
├── source/                 # 源文件
│   ├── _posts/            # 博客文章
│   └── about/             # 关于页面
├── themes/                 # 主题文件
├── _config.yml            # 站点配置
├── _config.fluid.yml      # 主题配置
└── package.json           # 依赖配置
```

## 📄 许可

本博客内容采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 许可协议。

## 🌟 致谢

- [Hexo](https://hexo.io/)
- [Fluid Theme](https://github.com/fluid-dev/hexo-theme-fluid)
- [GitHub Pages](https://pages.github.com/)

