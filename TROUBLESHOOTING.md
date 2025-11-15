# 故障排查指南

本文档列出了常见问题及其解决方案。

## 📋 目录

- [部署问题](#部署问题)
- [本地开发问题](#本地开发问题)
- [常见错误](#常见错误)

## 🚀 部署问题

### GitHub Actions 部署失败

**症状：** 推送到 source 分支后，GitHub Actions 工作流失败。

**可能原因：**

1. **缺少 hexo-cli**
   ```bash
   # 解决方案
   pnpm add hexo-cli
   git add package.json pnpm-lock.yaml
   git commit -m "fix: Add hexo-cli"
   git push origin source
   ```

2. **权限不足**
   - 访问 Settings → Actions → General
   - 设置 "Workflow permissions" 为 "Read and write permissions"

3. **分支保护规则**
   - 检查 Settings → Branches
   - 确保 github-actions[bot] 可以推送到 main 分支

**调试步骤：**

1. 查看 [Actions 日志](https://github.com/Hjjjkh/Hjjjkh.github.io/actions)
2. 本地测试：
   ```bash
   hexo clean
   hexo generate
   ls public/
   ```

### 部署成功但网站 404

**解决方案：**

1. 检查 GitHub Pages 设置
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: main / (root)

2. 检查 _config.yml
   ```yaml
   url: https://hjjjkh.github.io
   root: /
   ```

3. 等待几分钟让 GitHub Pages 完成部署

## 💻 本地开发问题

### hexo 命令找不到

```bash
# 方案 1：使用 npx
npx hexo server

# 方案 2：使用 npm scripts
npm run server

# 方案 3：全局安装
npm install -g hexo-cli
```

### 端口被占用

```bash
# 使用不同端口
hexo server -p 5000

# Windows - 杀死进程
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### 文章不显示

1. 检查文件位置：`source/_posts/`
2. 检查 Front Matter（确保没有 `draft: true`）
3. 重新生成：
   ```bash
   hexo clean
   hexo generate
   ```

## 🐛 常见错误

### YAML 语法错误

**症状：** 生成失败，提示 YAML 解析错误

**解决方案：**
- 检查 _config.yml 和 _config.fluid.yml
- 确保缩进正确（使用空格，不要用 Tab）
- 使用 [YAML Lint](https://www.yamllint.com/) 验证语法

### 依赖安装失败

```bash
# 清除并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 样式丢失

1. 检查 URL 配置
2. 清理缓存：`hexo clean`
3. 重新生成：`hexo generate`

## 📞 获取帮助

- [Hexo 文档](https://hexo.io/zh-cn/docs/)
- [Fluid 主题文档](https://hexo.fluid-dev.com/docs/)
- [提交 Issue](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)

---

**最后更新：** 2025-11-15

