# 个人技术博客 - 部署分支

[![Deploy Status](https://github.com/Hjjjkh/Hjjjkh.github.io/workflows/Deploy%20Hexo%20Blog%20to%20GitHub%20Pages/badge.svg)](https://github.com/Hjjjkh/Hjjjkh.github.io/actions)
[![View Site](https://img.shields.io/badge/View%20Site-hjjjkh.github.io-blue.svg)](https://hjjjkh.github.io)

## 📖 项目简介

**这是一个自动部署分支，用于存放我的个人博客的静态网站文件。**

- **博客地址：** [https://hjjjkh.github.io](https://hjjjkh.github.io)
- **当前分支：** `main`

### ⚠️ 注意

- **请勿手动修改此分支**：所有内容均由 [GitHub Actions](https://github.com/Hjjjkh/Hjjjkh.github.io/actions) 自动生成和部署。
- **内容会被覆盖**：任何手动更改都会在下次部署时被覆盖。

## 🌿 源码分支

博客的源代码、文章和配置文件存放在 `source` 分支。

**如需查看源代码或贡献，请访问 `source` 分支：**

➡️ [**点击这里切换到 source 分支**](https://github.com/Hjjjkh/Hjjjkh.github.io/tree/source)

## 🚀 工作流程

1. **开发**：在 `source` 分支进行写作和开发。
2. **推送**：将代码推送到 `source` 分支。
3. **构建**：GitHub Actions 自动检出代码、安装依赖并生成静态文件。
4. **部署**：将生成的静态文件自动部署到 `main` 分支。
5. **发布**：GitHub Pages 自动发布 `main` 分支的内容。

---

感谢你的访问！
