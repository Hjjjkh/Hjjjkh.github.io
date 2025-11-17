document.addEventListener('DOMContentLoaded', function() {
  // --- MetingJS Player Initialization ---
  function initMetingPlayer() {
    if (document.querySelector('meting-js')) {
      return;
    }

    var meting = document.createElement('meting-js');
    meting.setAttribute('server', 'netease');
    meting.setAttribute('type', 'playlist');
    meting.setAttribute('id', '2829883282');
    meting.setAttribute('fixed', 'true');
    meting.setAttribute('mini', 'true');
    meting.setAttribute('autoplay', 'false');
    meting.setAttribute('loop', 'all');
    meting.setAttribute('order', 'random');
    meting.setAttribute('preload', 'auto');
    meting.setAttribute('list-folded', 'true');
    meting.setAttribute('lrc-type', '3');
    meting.setAttribute('theme', '#49b1f5');

    document.body.appendChild(meting);
  }

  // --- Draggable APlayer Logic ---
  function makePlayerDraggable() {
    const observer = new MutationObserver(function(mutations) {
      const aplayer = document.querySelector('.aplayer.aplayer-fixed');
      if (aplayer) {
        observer.disconnect(); // Player found, stop observing

        let isDragging = false;
        let offsetX, offsetY;

        // Set initial position using top and left for consistency
        aplayer.style.left = '15px';
        aplayer.style.top = (window.innerHeight - aplayer.offsetHeight - 15) + 'px';
        aplayer.style.bottom = 'auto';
        aplayer.style.right = 'auto';

        const onMouseDown = (e) => {
          if (e.target.closest('.aplayer-list, .aplayer-bar-wrap, .aplayer-button, .aplayer-volume-wrap, .aplayer-lrc')) {
            return;
          }
          e.preventDefault();
          isDragging = true;
          offsetX = e.clientX - aplayer.getBoundingClientRect().left;
          offsetY = e.clientY - aplayer.getBoundingClientRect().top;
          aplayer.style.transition = 'none';
          aplayer.classList.add('dragging');
        };

        const onMouseMove = (e) => {
          if (!isDragging) return;
          let x = e.clientX - offsetX;
          let y = e.clientY - offsetY;
          aplayer.style.left = x + 'px';
          aplayer.style.top = y + 'px';
        };

        const onMouseUp = () => {
          if (!isDragging) return;
          isDragging = false;
          aplayer.style.transition = 'all 0.3s ease';
          aplayer.classList.remove('dragging');

          const rect = aplayer.getBoundingClientRect();
          const screenWidth = window.innerWidth;
          const screenHeight = window.innerHeight;

          let finalLeft = rect.left;
          let finalTop = rect.top;

          // Snap to left/right edge
          if (rect.left + rect.width / 2 > screenWidth / 2) {
            finalLeft = screenWidth - rect.width - 15;
          } else {
            finalLeft = 15;
          }

          // Boundary check for top/bottom
          if (finalTop < 15) {
            finalTop = 15;
          } else if (finalTop + rect.height > screenHeight - 15) {
            finalTop = screenHeight - rect.height - 15;
          }

          aplayer.style.left = finalLeft + 'px';
          aplayer.style.top = finalTop + 'px';
        };

        aplayer.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  // --- Code Highlight Theme Toggler ---
  function initHighlightThemeToggler() {
    const lightTheme = document.getElementById('prism-theme-light');
    const darkTheme = document.getElementById('prism-theme-dark');
    if (!lightTheme || !darkTheme) return;

    const htmlEl = document.documentElement;

    function toggleHighlightTheme(isDark) {
      lightTheme.disabled = isDark;
      darkTheme.disabled = !isDark;
    }

    toggleHighlightTheme(htmlEl.getAttribute('data-user-color-scheme') === 'dark');

    const themeObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'data-user-color-scheme') {
          toggleHighlightTheme(htmlEl.getAttribute('data-user-color-scheme') === 'dark');
        }
      });
    });

    themeObserver.observe(htmlEl, { attributes: true });
  }

  // --- Main Execution ---
  initMetingPlayer();
  makePlayerDraggable();
  initHighlightThemeToggler();
});