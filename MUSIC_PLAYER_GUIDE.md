# 音乐播放器使用指南

## 功能特性

### ✨ 核心功能
- 🎵 支持网易云音乐歌单播放
- 📱 响应式设计，支持移动端和桌面端
- 🌓 完美适配暗色模式
- 🎨 与博客主题风格统一

### 🎯 交互功能
- **可拖拽移动**：点击播放器主体区域可拖动到任意位置
- **智能边缘吸附**：释放后自动吸附到左右边缘
- **垂直边界限制**：确保播放器始终在可视范围内
- **视觉反馈**：拖动时显示半透明效果和阴影增强

### 🎮 播放控制
- 播放/暂停
- 上一曲/下一曲
- 进度条拖动
- 音量调节
- 歌词显示
- 歌单列表

## 使用方法

### 基础操作

1. **播放音乐**
   - 点击播放按钮开始播放
   - 播放器会记住您的播放状态

2. **拖动播放器**
   - 鼠标按住播放器主体区域（避开按钮）
   - 拖动到想要的位置
   - 释放鼠标，播放器会自动吸附到最近的边缘

3. **切换歌曲**
   - 点击上一曲/下一曲按钮
   - 或点击歌单图标选择歌曲

4. **查看歌词**
   - 歌词会自动滚动显示
   - 支持逐行高亮

### 高级技巧

1. **快速定位**
   - 拖动播放器到屏幕左侧或右侧
   - 播放器会自动吸附到对应边缘

2. **避免遮挡内容**
   - 播放器可以移动到不影响阅读的位置
   - 建议放在屏幕底部左右两侧

3. **移动端使用**
   - 触摸拖动同样有效
   - 自动适配小屏幕尺寸

## 技术实现

### 文件结构

```
blog/
├── source/
│   ├── js/
│   │   └── custom.js          # 播放器初始化和拖拽逻辑
│   └── css/
│       └── custom.css         # 播放器样式
└── _config.fluid.yml          # 主题配置（引入 APlayer 和 MetingJS）
```

### 关键代码

#### 1. 依赖引入 (_config.fluid.yml)

```yaml
custom_head: |
  <!-- APlayer & MetingJS for Music Player -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>

custom_js:
  - /js/custom.js

custom_css:
  - /css/custom.css
```

#### 2. 播放器初始化 (custom.js)

```javascript
document.addEventListener('DOMContentLoaded', function() {
  // 创建 MetingJS 元素
  var meting = document.createElement('meting-js');
  meting.setAttribute('server', 'netease');      // 网易云音乐
  meting.setAttribute('type', 'playlist');       // 歌单类型
  meting.setAttribute('id', '2829883282');       // 歌单 ID
  meting.setAttribute('fixed', 'true');          // 固定显示
  meting.setAttribute('mini', 'true');           // 迷你模式
  meting.setAttribute('autoplay', 'false');      // 不自动播放
  meting.setAttribute('theme', '#49b1f5');       // 主题色
  
  document.body.appendChild(meting);
});
```

#### 3. 拖拽功能实现

**核心逻辑：**
- 使用 `MutationObserver` 监听播放器元素创建
- 监听 `mousedown`、`mousemove`、`mouseup` 事件
- 计算鼠标位置并更新播放器坐标
- 释放时判断位置并吸附到边缘

**边缘吸附算法：**
```javascript
// 判断播放器中心点在屏幕左侧还是右侧
if (rect.left + playerWidth / 2 > screenWidth / 2) {
  // 吸附到右边
  aplayer.style.left = (screenWidth - playerWidth - 15) + 'px';
} else {
  // 吸附到左边
  aplayer.style.left = '15px';
}
```

**垂直边界限制：**
```javascript
// 确保播放器不会超出屏幕上下边界
if (currentTop < 15) {
  aplayer.style.top = '15px';
} else if (currentTop + playerHeight > screenHeight - 15) {
  aplayer.style.top = (screenHeight - playerHeight - 15) + 'px';
}
```

### 样式优化 (custom.css)

```css
/* 拖拽光标 */
.aplayer.aplayer-fixed {
  cursor: grab;
  transition: all 0.3s ease;
}

.aplayer.aplayer-fixed:active {
  cursor: grabbing;
}

/* 拖动时的视觉反馈 */
.aplayer.aplayer-fixed.dragging {
  opacity: 0.9;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
```

## 自定义配置

### 更换歌单

1. 打开网易云音乐网页版
2. 找到你喜欢的歌单
3. 复制 URL 中的歌单 ID
4. 修改 `custom.js` 中的 `id` 属性

```javascript
meting.setAttribute('id', '你的歌单ID');
```

### 更换音乐平台

支持的平台：
- `netease`：网易云音乐
- `tencent`：QQ 音乐
- `kugou`：酷狗音乐
- `xiami`：虾米音乐
- `baidu`：百度音乐

```javascript
meting.setAttribute('server', 'tencent'); // 切换到 QQ 音乐
```

### 调整主题色

```javascript
meting.setAttribute('theme', '#your-color'); // 自定义颜色
```

### 修改初始位置

在 `custom.js` 中修改：

```javascript
// 设置初始位置
aplayer.style.left = '15px';    // 左边距
aplayer.style.bottom = '15px';  // 底边距
```

### 调整吸附边距

```javascript
// 修改边距值（默认 15px）
var margin = 20; // 改为 20px

aplayer.style.left = margin + 'px';
// 或
aplayer.style.left = (screenWidth - playerWidth - margin) + 'px';
```

## 常见问题

### Q1: 播放器不显示？

**可能原因：**
1. CDN 加载失败
2. 歌单 ID 错误
3. JavaScript 错误

**解决方法：**
1. 检查浏览器控制台是否有错误
2. 验证歌单 ID 是否正确
3. 尝试更换 CDN 源

### Q2: 无法播放音乐？

**可能原因：**
1. 歌曲版权限制
2. 网络问题
3. API 限制

**解决方法：**
1. 选择无版权限制的歌单
2. 检查网络连接
3. 使用自己创建的歌单

### Q3: 拖拽不流畅？

**可能原因：**
1. 浏览器性能问题
2. 其他 JavaScript 冲突

**解决方法：**
1. 关闭浏览器的硬件加速
2. 检查是否有其他脚本冲突
3. 尝试在无痕模式下测试

### Q4: 移动端无法拖拽？

**说明：**
当前实现主要针对桌面端，移动端触摸事件需要额外处理。

**解决方法：**
可以添加触摸事件支持：

```javascript
// 添加触摸事件
playerBody.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('touchend', handleTouchEnd);
```

### Q5: 播放器遮挡内容？

**解决方法：**
1. 拖动播放器到不影响阅读的位置
2. 调整播放器的 z-index
3. 考虑使用迷你模式

## 性能优化

### 1. CDN 选择

使用国内 CDN 加速：
```html
<!-- jsDelivr（推荐） -->
<script src="https://cdn.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js"></script>

<!-- 或使用 unpkg -->
<script src="https://unpkg.com/aplayer@1.10.1/dist/APlayer.min.js"></script>
```

### 2. 懒加载

播放器在 `DOMContentLoaded` 后才初始化，不影响首屏加载。

### 3. 事件优化

使用事件委托和防抖，减少性能消耗：

```javascript
// 添加防抖函数
function debounce(func, wait) {
  var timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}
```

## 浏览器兼容性

### 支持的浏览器

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ⚠️ IE 11（部分功能不支持）

### 已知问题

1. **IE 11**：不支持 `MutationObserver`，需要 polyfill
2. **旧版 Safari**：拖拽可能有延迟
3. **移动端浏览器**：触摸事件需要额外处理

## 更新日志

### v1.2.0 (2025-11-17)
- ✨ 新增垂直边界限制
- ✨ 优化拖拽视觉反馈
- 🐛 修复按钮点击冲突
- 💄 改进暗色模式样式

### v1.1.0 (2025-11-15)
- ✨ 实现拖拽功能
- ✨ 添加边缘吸附
- 💄 优化播放器样式

### v1.0.0 (2025-11-10)
- 🎉 初始版本
- ✨ 基础播放功能
- ✨ 网易云音乐支持

## 参考资源

- [APlayer 官方文档](https://aplayer.js.org/)
- [MetingJS GitHub](https://github.com/metowolf/MetingJS)
- [网易云音乐 API](https://binaryify.github.io/NeteaseCloudMusicApi/)
- [MDN - 拖放 API](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)

## 贡献

欢迎提交 Issue 和 Pull Request！

### 开发建议

1. 本地测试：`hexo server`
2. 检查控制台错误
3. 测试多个浏览器
4. 验证移动端兼容性

## 许可证

MIT License

---

**享受音乐，享受编程！[object Object]

