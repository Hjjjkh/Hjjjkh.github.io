# 贡献指南

感谢你考虑为这个项目做出贡献！🎉

## 📋 目录

- [行为准则](#行为准则)
- [如何贡献](#如何贡献)
- [开发流程](#开发流程)
- [提交规范](#提交规范)
- [问题反馈](#问题反馈)

## 🤝 行为准则

参与此项目即表示你同意遵守我们的行为准则：

- 使用友好和包容的语言
- 尊重不同的观点和经验
- 优雅地接受建设性批评
- 关注对社区最有利的事情
- 对其他社区成员表示同理心

## 💡 如何贡献

### 报告 Bug

如果你发现了 Bug，请：

1. 检查 [Issues](https://github.com/Hjjjkh/Hjjjkh.github.io/issues) 确认问题是否已被报告
2. 如果没有，创建一个新的 Issue，使用 Bug 报告模板
3. 提供详细的复现步骤和环境信息
4. 如果可能，附上截图或错误日志

### 提出功能建议

如果你有好的想法：

1. 检查 [Issues](https://github.com/Hjjjkh/Hjjjkh.github.io/issues) 确认建议是否已存在
2. 创建一个新的 Issue，使用功能建议模板
3. 清晰地描述功能和使用场景
4. 解释为什么这个功能对项目有价值

### 提交代码

1. **Fork 仓库**
   ```bash
   # 在 GitHub 上点击 Fork 按钮
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Hjjjkh.github.io.git
   cd Hjjjkh.github.io
   git checkout source
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **进行修改**
   - 遵循项目的代码风格
   - 添加必要的注释
   - 确保代码可以正常运行

5. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某某功能"
   ```

6. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **创建 Pull Request**
   - 访问原仓库
   - 点击 "New Pull Request"
   - 选择你的分支
   - 填写 PR 模板
   - 提交 PR

## 🔄 开发流程

### 环境设置

```bash
# 安装依赖
pnpm install

# 启动本地服务器
pnpm hexo server

# 清理缓存
pnpm hexo clean

# 生成静态文件
pnpm hexo generate
```

### 分支策略

- `source` - 主开发分支，所有 PR 应该合并到这里
- `main` - 部署分支，由 GitHub Actions 自动维护
- `feature/*` - 功能分支
- `fix/*` - Bug 修复分支
- `docs/*` - 文档更新分支

### 测试

在提交 PR 之前，请确保：

1. **本地测试**
   ```bash
   # 启动本地服务器
   hexo server
   
   # 访问 http://localhost:4000 检查
   ```

2. **构建测试**
   ```bash
   # 清理并重新生成
   hexo clean
   hexo generate
   
   # 检查是否有错误
   ```

3. **链接检查**
   - 确保所有内部链接正常
   - 确保图片可以正常显示
   - 确保代码高亮正常

## 📝 提交规范

我们使用语义化的提交信息格式：

### 提交类型

- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整（不影响代码运行）
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建过程或辅助工具的变动
- `revert`: 回滚之前的提交

### 提交格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 示例

```bash
# 简单提交
git commit -m "feat: 添加暗色模式切换功能"

# 详细提交
git commit -m "fix: 修复移动端导航栏显示问题

- 调整导航栏在小屏幕上的布局
- 修复菜单按钮点击无响应的问题
- 优化动画效果

Closes #123"
```

## 🐛 问题反馈

### 报告 Bug

使用 [Bug 报告模板](https://github.com/Hjjjkh/Hjjjkh.github.io/issues/new?template=bug_report.md)

**必须包含：**
- 清晰的问题描述
- 复现步骤
- 期望行为
- 实际行为
- 环境信息（浏览器、操作系统等）
- 截图（如适用）

### 功能建议

使用 [功能建议模板](https://github.com/Hjjjkh/Hjjjkh.github.io/issues/new?template=feature_request.md)

**应该包含：**
- 功能描述
- 使用场景
- 预期效果
- 替代方案（如有）

## 📖 文档贡献

文档同样重要！你可以：

- 修正拼写或语法错误
- 改进现有文档的清晰度
- 添加缺失的文档
- 翻译文档

## 🎨 设计贡献

如果你擅长设计，可以：

- 改进 UI/UX
- 设计新的主题配色
- 优化响应式布局
- 提供图标或插图

## ✅ 代码审查

所有提交都需要经过代码审查：

- 保持代码简洁易读
- 遵循项目的代码风格
- 添加必要的注释
- 确保向后兼容
- 考虑性能影响

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

你的贡献将被记录在：
- [Contributors](https://github.com/Hjjjkh/Hjjjkh.github.io/graphs/contributors)
- 项目的 CHANGELOG

## 📧 联系方式

如有任何问题，欢迎通过以下方式联系：

- 创建 [Issue](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)
- 在文章下方评论

---

再次感谢你的贡献！🎉

