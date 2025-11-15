# 部署检查清单

在推送代码到 GitHub 之前，请确保完成以下检查。

## ✅ 推送前检查

### 1. 本地测试
```bash
# 清理缓存
npx hexo clean

# 生成静态文件
npx hexo generate

# 本地预览
npx hexo server

# 访问 http://localhost:4000 检查网站
```

### 2. 配置检查

#### _config.yml
```yaml
# 确保 URL 配置正确
url: https://hjjjkh.github.io
root: /
```

### 3. 文件检查
```bash
# 检查是否有未提交的更改
git status

# 确保在 source 分支
git checkout source
```

## 🔧 GitHub 设置检查

### 1. Actions 权限
- 访问：Settings → Actions → General
- 设置：Workflow permissions → Read and write permissions
- ✅ 保存设置

### 2. Pages 设置
- 访问：Settings → Pages
- Source: Deploy from a branch
- Branch: main / (root)
- ✅ 保存设置

## 📋 部署流程

### 1. 提交更改
```bash
# 添加所有更改
git add .

# 提交
git commit -m "feat: Add new blog post"

# 推送到 source 分支
git push origin source
```

### 2. 监控部署
1. 访问：https://github.com/Hjjjkh/Hjjjkh.github.io/actions
2. 查看最新的工作流运行
3. 等待所有步骤完成（通常 1-3 分钟）

### 3. 验证部署
1. 访问：https://hjjjkh.github.io
2. 按 Ctrl+Shift+R 强制刷新
3. 检查更改是否生效

## 🐛 常见问题

### 部署失败（8-15 秒内）
**原因：** 环境设置或依赖安装失败

**解决方案：**
1. 检查 Actions 日志中的错误信息
2. 确保 package.json 中包含所有必需的依赖
3. 检查 Node.js 版本兼容性

### 部署成功但网站 404
**原因：** GitHub Pages 配置错误或部署未完成

**解决方案：**
1. 检查 Pages 设置
2. 等待 5-10 分钟
3. 检查 _config.yml 配置

## 📝 提交信息规范

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构

---

**最后更新：** 2025-11-15

