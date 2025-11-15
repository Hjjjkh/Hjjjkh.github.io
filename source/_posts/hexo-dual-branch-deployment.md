---
title: Hexo 博客双分支部署实战：源码与部署分离的最佳实践
date: 2025-11-15 14:20:23
tags:
  - Hexo
  - GitHub Pages
  - CI/CD
  - Git
categories:
  - 博客搭建
  - Hexo 部署
sticky: 100
---

## 前言

在使用 Hexo + GitHub Pages 搭建博客时，我们经常会遇到一个问题：如何同时管理源代码和部署文件？传统的做法是将源代码和生成的静态文件混在一起，或者使用两个仓库分别管理。今天，我将分享一个更优雅的解决方案：**使用双分支策略，实现源码与部署的完美分离**。

<!-- more -->

## 为什么需要双分支？

### 传统方案的痛点

1. **源码和部署文件混在一起**
   - 仓库体积臃肿
   - 难以区分哪些是源文件，哪些是生成文件
   - 容易误操作删除重要文件

2. **使用两个仓库**
   - 管理复杂，需要维护两个仓库
   - 同步麻烦
   - 不够优雅

### 双分支方案的优势

- ✅ **清晰的职责分离**：`source` 分支存放源码，`main` 分支存放部署文件
- ✅ **自动化部署**：通过 GitHub Actions 实现推送即部署
- ✅ **单仓库管理**：所有内容在一个仓库中，便于管理
- ✅ **历史记录清晰**：源码和部署的提交历史互不干扰

## 实施步骤

### 1. 创建 source 分支

首先，我们需要创建一个新分支来存放源代码：

```bash
# 确保在博客根目录
cd your-blog-directory

# 创建并切换到 source 分支
git checkout -b source

# 推送到远程仓库
git push -u origin source
```

### 2. 修改 GitHub 仓库默认分支

这一步很重要！我们需要将仓库的默认分支改为 `source`，这样：
- 克隆仓库时会自动获取源代码
- Pull Request 默认合并到 source 分支
- 新手不会误操作 main 分支

**操作步骤：**
1. 访问 GitHub 仓库页面
2. 点击 `Settings` → `Branches`
3. 在 `Default branch` 部分，将默认分支改为 `source`
4. 点击 `Update` 并确认

### 3. 清理 main 分支

现在我们需要清理 main 分支，让它成为一个纯净的部署分支：

```bash
# 切换到 main 分支
git checkout main

# 删除所有文件（保留 .git）
git rm -rf .

# 从 public 目录复制部署文件
# Windows PowerShell
Copy-Item -Path "public\*" -Destination "." -Recurse -Force

# Linux/Mac
cp -r public/* .

# 移除不需要的文件
git rm --cached -rf .deploy_git public db.json node_modules

# 创建新的 .gitignore
cat > .gitignore << EOF
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
.deploy_git*/
.idea
*.iml
.vscode
EOF

# 提交更改
git add -A
git commit -m "Clean main branch - keep only deployment files"

# 强制推送到远程（覆盖原有内容）
git push -f origin main
```

### 4. 配置 GitHub Actions

创建或修改 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy Hexo Blog to GitHub Pages

on:
  push:
    branches:
      - source  # 当推送到 source 分支时触发

  # 允许手动触发工作流
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限
permissions:
  contents: write
  pages: write
  id-token: write

# 只允许一个并发部署
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout 代码
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 获取所有历史记录
      
      - name: 设置 Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
      
      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8
      
      - name: 获取 pnpm store 目录
        id: pnpm-cache
        shell: bash
        run: |
          echo "STORE_PATH=$(pnpm store path)" >> $GITHUB_OUTPUT
      
      - name: 设置 pnpm 缓存
        uses: actions/cache@v3
        with:
          path: ${{ steps.pnpm-cache.outputs.STORE_PATH }}
          key: ${{ runner.os }}-pnpm-store-${{ hashFiles('**/pnpm-lock.yaml') }}
          restore-keys: |
            ${{ runner.os }}-pnpm-store-
      
      - name: 安装依赖
        run: pnpm install --frozen-lockfile
      
      - name: 清理缓存
        run: pnpm hexo clean
      
      - name: 生成静态文件
        run: pnpm hexo generate
      
      - name: 部署到 GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: main  # 部署到 main 分支
          force_orphan: true  # 使用孤立分支，每次全新部署
          user_name: 'github-actions[bot]'
          user_email: 'github-actions[bot]@users.noreply.github.com'
          commit_message: 'Deploy: ${{ github.event.head_commit.message }}'
```

### 5. 配置 GitHub Pages

最后，确保 GitHub Pages 设置正确：

1. 访问仓库的 `Settings` → `Pages`
2. 在 `Source` 部分，选择 `Deploy from a branch`
3. 选择 `main` 分支和 `/ (root)` 目录
4. 点击 `Save`

## 常见问题与解决方案

### 问题 1：GitHub Actions 部署失败

**错误信息：** `Error: Action failed with "The process '/usr/bin/git' failed with exit code 1"`

**原因：** 当设置 `force_orphan: false` 时，如果 main 分支已有内容，可能会产生冲突。

**解决方案：** 将 `force_orphan` 设置为 `true`，这样每次都会创建一个全新的提交，避免冲突。

```yaml
force_orphan: true  # 使用孤立分支，每次全新部署
```

### 问题 2：推送后没有触发部署

**检查清单：**
1. 确认工作流文件在 `.github/workflows/` 目录下
2. 确认触发分支设置为 `source`
3. 检查 GitHub Actions 是否启用（Settings → Actions → General）
4. 查看 Actions 页面的错误日志

### 问题 3：部署成功但网站没有更新

**可能原因：**
1. GitHub Pages 缓存问题：等待几分钟或强制刷新（Ctrl+F5）
2. 部署到了错误的分支：检查 GitHub Pages 设置
3. DNS 缓存：清除浏览器缓存

## 新的工作流程

配置完成后，你的日常工作流程将变得非常简单：

```bash
# 1. 确保在 source 分支
git checkout source

# 2. 创建新文章
hexo new post "my-new-post"

# 3. 本地预览（可选）
hexo server

# 4. 提交更改
git add .
git commit -m "Add new post: my-new-post"

# 5. 推送到远程，自动触发部署
git push origin source
```

就这么简单！推送后，GitHub Actions 会自动：
1. 检出 source 分支代码
2. 安装依赖
3. 生成静态文件
4. 部署到 main 分支
5. GitHub Pages 自动发布

## 分支职责说明

### source 分支（源码分支）
- **用途：** 存放所有源代码
- **包含内容：**
  - Hexo 配置文件（`_config.yml`）
  - 主题文件（`themes/`）
  - 文章源文件（`source/_posts/`）
  - 依赖配置（`package.json`）
  - GitHub Actions 工作流（`.github/workflows/`）
- **操作：** 日常开发、写文章、修改配置都在这个分支

### main 分支（部署分支）
- **用途：** 存放生成的静态网站文件
- **包含内容：**
  - HTML、CSS、JS 等静态文件
  - 图片、字体等资源文件
- **操作：** 由 GitHub Actions 自动更新，**不要手动修改**

## 优化建议

### 1. 添加部署状态徽章

在 README.md 中添加部署状态徽章，实时显示部署状态：

```markdown
![Deploy Status](https://github.com/username/username.github.io/workflows/Deploy%20Hexo%20Blog%20to%20GitHub%20Pages/badge.svg)
```

### 2. 配置 .gitignore

确保 source 分支的 `.gitignore` 包含：

```gitignore
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
.deploy_git*/
.idea
*.iml
.vscode
```

### 3. 使用 pnpm 加速构建

相比 npm，pnpm 可以显著减少安装时间和磁盘占用：

```bash
# 本地切换到 pnpm
npm install -g pnpm
pnpm install
```

## 总结

通过双分支策略，我们实现了：

1. **源码与部署的完美分离**：各司其职，互不干扰
2. **自动化部署流程**：推送即部署，省时省力
3. **清晰的版本管理**：源码和部署的历史记录独立管理
4. **优雅的仓库结构**：单仓库管理，简洁高效

这种方案不仅适用于 Hexo，也可以应用到其他静态网站生成器（如 Hugo、Jekyll、VuePress 等）。希望这篇文章能帮助你更好地管理你的博客！

## 参考资源

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
- [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages)

---

**相关文章推荐：**
- [Hexo 博客性能优化完全指南](/posts/hexo-performance-optimization/)
- [Hexo SEO 优化实战指南](/posts/hexo-seo-optimization-guide/)
- [Fluid 主题深度定制指南](/posts/fluid-theme-customization/)

如果你在实施过程中遇到任何问题，欢迎在评论区留言讨论！
