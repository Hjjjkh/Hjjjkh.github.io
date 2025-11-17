document.addEventListener('DOMContentLoaded', function() {
  // --- 代码高亮主题切换逻辑 ---
  function initHighlightThemeToggler() {
    const lightTheme = document.getElementById('prism-theme-light');
    const darkTheme = document.getElementById('prism-theme-dark');
    if (!lightTheme || !darkTheme) return;

    const htmlEl = document.documentElement;

    function toggleHighlightTheme(isDark) {
      lightTheme.disabled = isDark;
      darkTheme.disabled = !isDark;
    }

    // 初始加载时检查一次
    toggleHighlightTheme(htmlEl.getAttribute('data-user-color-scheme') === 'dark');

    // 监听主题切换
    const themeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-user-color-scheme') {
          toggleHighlightTheme(htmlEl.getAttribute('data-user-color-scheme') === 'dark');
        }
      });
    });

    themeObserver.observe(htmlEl, { attributes: true });
  }

  // --- 主函数执行 ---
  initHighlightThemeToggler();
});
