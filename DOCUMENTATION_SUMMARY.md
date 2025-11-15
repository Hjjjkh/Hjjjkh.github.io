# 📚 项目文档总览

本文档概述了项目中所有的文档和模板文件。

## 📋 文档结构

```
.
├── README.md                           # 主 README（source 分支）
├── source/README.md                    # 部署分支 README（会被复制到 main 分支）
├── LICENSE                             # MIT 许可证
├── CONTRIBUTING.md                     # 贡献指南
├── CHANGELOG.md                        # 更新日志
├── DOCUMENTATION_SUMMARY.md            # 本文档
└── .github/
    ├── workflows/
    │   └── deploy.yml                  # GitHub Actions 部署工作流
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.md              # Bug 报告模板
    │   └── feature_request.md         # 功能建议模板
    └── PULL_REQUEST_TEMPLATE.md       # PR 模板
```

## 📖 文档说明

### 1. README.md（source 分支）

**位置：** `/README.md`  
**用途：** source 分支的主文档，面向开发者

**包含内容：**
- 项目简介和徽章
- 分支说明（source vs main）
- 快速开始指南
- 写作指南
- 部署流程
- 项目结构
- 技术栈介绍
- 优化特性
- 常见问题解答
- 贡献指南
- 联系方式

**适用人群：**
- 想要了解项目结构的开发者
- 想要贡献代码的贡献者
- 想要 Fork 项目的用户

### 2. source/README.md（main 分支）

**位置：** `/source/README.md`  
**用途：** 会被 Hexo 复制到 main 分支，作为部署分支的说明

**包含内容：**
- 简短的项目介绍
- 部署分支说明
- 指向 source 分支的链接
- 工作流程说明

**适用人群：**
- 访问 main 分支的用户
- 想要查看源代码的访问者

### 3. LICENSE

**位置：** `/LICENSE`  
**用途：** MIT 开源许可证

**说明：**
- 允许自由使用、修改和分发
- 需要保留版权声明
- 不提供任何担保

### 4. CONTRIBUTING.md

**位置：** `/CONTRIBUTING.md`  
**用途：** 详细的贡献指南

**包含内容：**
- 行为准则
- 如何报告 Bug
- 如何提出功能建议
- 代码贡献流程
- 开发环境设置
- 分支策略
- 提交规范
- 测试要求
- 代码审查标准

**适用人群：**
- 想要贡献代码的开发者
- 想要报告问题的用户
- 想要提出建议的用户

### 5. CHANGELOG.md

**位置：** `/CHANGELOG.md`  
**用途：** 记录项目的所有重要变更

**格式：**
- 遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/) 规范
- 按版本号组织
- 包含变更类型（新增、修复、变更等）

**适用人群：**
- 想要了解项目历史的用户
- 需要追踪功能变更的开发者

### 6. GitHub Actions 工作流

**位置：** `/.github/workflows/deploy.yml`  
**用途：** 自动化部署配置

**功能：**
- 监听 source 分支的推送
- 自动安装依赖
- 生成静态文件
- 部署到 main 分支
- 触发 GitHub Pages 发布

**特性：**
- 使用 pnpm 缓存加速构建
- 支持手动触发
- 并发控制
- 权限配置

### 7. Issue 模板

#### Bug 报告模板

**位置：** `/.github/ISSUE_TEMPLATE/bug_report.md`  
**用途：** 标准化 Bug 报告格式

**包含字段：**
- Bug 描述
- 复现步骤
- 期望行为
- 截图
- 环境信息
- 附加信息

#### 功能建议模板

**位置：** `/.github/ISSUE_TEMPLATE/feature_request.md`  
**用途：** 标准化功能建议格式

**包含字段：**
- 功能描述
- 问题背景
- 解决方案
- 替代方案
- 附加信息

### 8. Pull Request 模板

**位置：** `/.github/PULL_REQUEST_TEMPLATE.md`  
**用途：** 标准化 PR 格式

**包含字段：**
- 变更说明
- 变更类型（Bug 修复、新功能等）
- 相关 Issue
- 变更清单
- 测试说明
- 截图
- 检查清单

## 🎯 使用指南

### 对于贡献者

1. **开始前**：阅读 `README.md` 和 `CONTRIBUTING.md`
2. **报告问题**：使用 Issue 模板创建问题
3. **提交代码**：遵循 `CONTRIBUTING.md` 中的流程
4. **创建 PR**：使用 PR 模板提交

### 对于维护者

1. **更新文档**：保持文档与代码同步
2. **审查 PR**：使用 PR 模板检查清单
3. **更新日志**：在 `CHANGELOG.md` 中记录变更
4. **发布版本**：遵循语义化版本规范

### 对于用户

1. **了解项目**：阅读 `README.md`
2. **查看变更**：查阅 `CHANGELOG.md`
3. **反馈问题**：使用 Issue 模板
4. **提出建议**：使用功能建议模板

## 📝 文档维护

### 更新频率

- **README.md**：功能变更时更新
- **CHANGELOG.md**：每次发布时更新
- **CONTRIBUTING.md**：流程变更时更新
- **模板文件**：根据需要调整

### 维护原则

1. **保持简洁**：避免冗余信息
2. **及时更新**：确保文档与代码同步
3. **清晰明了**：使用简单易懂的语言
4. **结构化**：使用标题和列表组织内容
5. **示例丰富**：提供实际的使用示例

## 🔗 相关链接

- **博客地址：** [https://hjjjkh.github.io](https://hjjjkh.github.io)
- **GitHub 仓库：** [https://github.com/Hjjjkh/Hjjjkh.github.io](https://github.com/Hjjjkh/Hjjjkh.github.io)
- **Issues：** [https://github.com/Hjjjkh/Hjjjkh.github.io/issues](https://github.com/Hjjjkh/Hjjjkh.github.io/issues)
- **Actions：** [https://github.com/Hjjjkh/Hjjjkh.github.io/actions](https://github.com/Hjjjkh/Hjjjkh.github.io/actions)

## ✅ 文档检查清单

在发布新版本前，确保：

- [ ] README.md 已更新
- [ ] CHANGELOG.md 已添加新版本记录
- [ ] 所有链接都有效
- [ ] 示例代码可以正常运行
- [ ] 截图是最新的
- [ ] 版本号已更新

---

**最后更新：** 2025-11-15  
**维护者：** Hjjjkh

