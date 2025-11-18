// 自定义 JavaScript

// 等待页面加载完成后初始化 APlayer
document.addEventListener('DOMContentLoaded', function() {
  // 创建播放器容器
  const metingEl = document.createElement('meting-js');
  
  // 设置播放器属性
  metingEl.setAttribute('server', 'netease');
  metingEl.setAttribute('type', 'playlist');
  metingEl.setAttribute('id', '2829883282');
  metingEl.setAttribute('fixed', 'true');
  metingEl.setAttribute('autoplay', 'false');
  metingEl.setAttribute('loop', 'all');
  metingEl.setAttribute('order', 'random');
  metingEl.setAttribute('preload', 'auto');
  metingEl.setAttribute('list-folded', 'true');
  metingEl.setAttribute('lrc-type', '3');
  
  // 将播放器添加到页面
  document.body.appendChild(metingEl);
});

