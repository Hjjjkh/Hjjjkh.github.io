# 快速开始指南

## [object Object] 分钟快速部署

### 前置要求

确保你的系统已安装：
- Node.js >= 18.0.0
- pnpm >= 8.0.0（或 npm）
- Git

### 步骤 1：克隆仓库

```bash
# 克隆仓库（source 分支）
git clone -b source https://github.com/Hjjjkh/Hjjjkh.github.io.git
cd Hjjjkh.github.io
```

### 步骤 2：安装依赖

```bash
# 使用 pnpm（推荐）
pnpm install

# 或使用 npm
npm install
```

### 步骤 3：本地预览

```bash
# 启动本地服务器
npx hexo server

# 访问 http://localhost:4000
```

### 步骤 4：写作发布

```bash
# 创建新文章
hexo new post "我的第一篇文章"

# 编辑文章
# 文件位置：source/_posts/我的第一篇文章.md

# 提交并推送
git add .
git commit -m "Add new post"
git push origin source
```

### 步骤 5：自动部署

推送到 source 分支后，GitHub Actions 会自动：
1. 构建静态文件
2. 部署到 main 分支
3. 发布到 GitHub Pages

查看部署状态：https://github.com/Hjjjkh/Hjjjkh.github.io/actions

## 📝 常用命令

### Hexo 命令

```bash
# 清理缓存
hexo clean

# 生成静态文件
hexo generate
# 或简写
hexo g

# 启动本地服务器
hexo server
# 或简写
hexo s

# 部署到远程
hexo deploy
# 或简写
hexo d

# 创建新文章
hexo new post "文章标题"

# 创建新页面
hexo new page "页面名称"

# 创建草稿
hexo new draft "草稿标题"

# 发布草稿
hexo publish draft "草稿标题"
```

### Git 命令

```bash
# 查看状态
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "提交信息"

# 推送到远程
git push origin source

# 拉取最新代码
git pull origin source

# 查看提交历史
git log --oneline

# 查看分支
git branch -a
```

## 🎨 自定义配置

### 修改博客信息

编辑 `_config.yml`：

```yaml
# 网站信息
title: 你的博客名称
subtitle: 你的副标题
description: 博客描述
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai

# URL
url: https://你的用户名.github.io
```

### 修改主题配置

编辑 `_config.fluid.yml`：

```yaml
# 导航栏
navbar:
  blog_title: "你的博客名称"
  
# 首页
index:
  slogan:
    text: "你的个性签名"
    
# 关于页面
about:
  name: "你的名字"
  intro: "你的简介"
```

### 更换音乐歌单

编辑 `source/js/custom.js`：

```javascript
// 修改歌单 ID
meting.setAttribute('id', '你的歌单ID');

// 修改音乐平台
meting.setAttribute('server', 'netease'); // netease/tencent/kugou
```

获取网易云歌单 ID：
1. 打开网易云音乐网页版
2. 找到歌单
3. 复制 URL 中的数字 ID

例如：`https://music.163.com/#/playlist?id=2829883282`
歌单 ID 就是 `2829883282`

## 🎯 功能测试清单

部署后检查以下功能：

### 基础功能
- [ ] 首页正常显示
- [ ] 文章列表加载正常
- [ ] 文章详情页显示正常
- [ ] 归档页面正常
- [ ] 分类页面正常
- [ ] 标签页面正常
- [ ] 关于页面正常
- [ ] 友链页面正常

### 导航功能
- [ ] 顶部导航菜单正常
- [ ] 学习导航页面显示正常
- [ ] 下拉菜单功能正常
- [ ] 移动端菜单正常

### 音乐播放器
- [ ] 播放器正常显示
- [ ] 音乐可以播放
- [ ] 播放器可以拖拽
- [ ] 边缘吸附功能正常
- [ ] 播放控制按钮正常
- [ ] 歌词显示正常

### 搜索功能
- [ ] 搜索框正常显示
- [ ] 搜索结果正确
- [ ] 搜索高亮正常

### 评论系统
- [ ] Giscus 评论框显示
- [ ] 可以正常评论
- [ ] 暗色模式适配正常

### 响应式设计
- [ ] 桌面端显示正常
- [ ] 平板端显示正常
- [ ] 移动端显示正常
- [ ] 暗色模式切换正常

### 性能优化
- [ ] 图片懒加载生效
- [ ] 页面加载速度快
- [ ] 代码高亮正常
- [ ] 数学公式渲染正常

## 🐛 常见问题

### 1. 依赖安装失败

**问题**：`pnpm install` 报错

**解决方案**：
```bash
# 清理缓存
pnpm store prune

# 删除 node_modules 和 lock 文件
rm -rf node_modules pnpm-lock.yaml

# 重新安装
pnpm install
```

### 2. 本地服务器启动失败

**问题**：`hexo server` 报错

**解决方案**：
```bash
# 清理缓存
hexo clean

# 检查端口占用
# Windows
netstat -ano | findstr :4000

# Linux/Mac
lsof -i :4000

# 使用其他端口
hexo server -p 5000
```

### 3. 部署失败

**问题**：GitHub Actions 构建失败

**解决方案**：
1. 检查 Actions 日志
2. 确认 `_config.yml` 配置正确
3. 验证 GitHub Pages 设置
4. 检查分支权限

### 4. 音乐播放器不显示

**问题**：页面上看不到播放器

**解决方案**：
1. 检查浏览器控制台错误
2. 验证 CDN 是否可访问
3. 确认歌单 ID 正确
4. 检查 `custom.js` 是否正确引入

### 5. 样式显示异常

**问题**：页面样式错乱

**解决方案**：
```bash
# 清理缓存
hexo clean

# 重新生成
hexo generate

# 强制刷新浏览器（Ctrl + F5）
```

## 📚 学习资源

### 官方文档
- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Fluid 主题文档](https://hexo.fluid-dev.com/docs/)
- [Markdown 语法](https://markdown.com.cn/)

### 视频教程
- [Hexo 博客搭建教程](https://www.bilibili.com/video/BV1mU4y1j72n/)
- [GitHub Pages 使用教程](https://www.bilibili.com/video/BV1yo4y1d7Jq/)

### 社区资源
- [Hexo GitHub](https://github.com/hexojs/hexo)
- [Fluid GitHub](https://github.com/fluid-dev/hexo-theme-fluid)
- [Hexo 插件列表](https://hexo.io/plugins/)

## 🔗 相关链接

- **博客地址**：https://hjjjkh.github.io
- **GitHub 仓库**：https://github.com/Hjjjkh/Hjjjkh.github.io
- **问题反馈**：https://github.com/Hjjjkh/Hjjjkh.github.io/issues

## 💡 提示

1. **定期备份**：定期推送代码到 GitHub
2. **版本控制**：使用有意义的提交信息
3. **测试优先**：本地测试通过后再部署
4. **文档完善**：及时更新文档和注释
5. **性能优化**：注意图片大小和资源加载

## 🎉 开始你的博客之旅！

现在你已经掌握了基本操作，开始写作吧！

```bash
# 创建你的第一篇文章
hexo new post "Hello World"

# 编辑文章
# source/_posts/Hello-World.md

# 本地预览
hexo server

# 满意后提交
git add .
git commit -m "My first post"
git push origin source
```

几分钟后，你的文章就会出现在博客上！

---

**Happy Blogging! [object Object]

如有问题，欢迎提 [Issue](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)！

