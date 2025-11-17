document.addEventListener('DOMContentLoaded', function() {
  // Create MetingJS element for a fixed, foldable player
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

  // Draggable and edge-snapping functionality
  var observer = new MutationObserver(function(mutations) {
    var aplayer = document.querySelector('.aplayer.aplayer-fixed.aplayer-mini .aplayer-body');
    if (aplayer) {
      observer.disconnect(); // Stop observing once the player is found

      var isDragging = false;
      var offsetX, offsetY;

      aplayer.style.left = '15px';
      aplayer.style.bottom = '15px';
      aplayer.style.right = 'auto';
      aplayer.style.top = 'auto';

      aplayer.addEventListener('mousedown', function(e) {
        isDragging = true;
        offsetX = e.clientX - aplayer.getBoundingClientRect().left;
        offsetY = e.clientY - aplayer.getBoundingClientRect().top;
        aplayer.style.transition = 'none';
      });

      document.addEventListener('mousemove', function(e) {
        if (isDragging) {
          var x = e.clientX - offsetX;
          var y = e.clientY - offsetY;

          aplayer.style.left = x + 'px';
          aplayer.style.top = y + 'px';
          aplayer.style.bottom = 'auto';
          aplayer.style.right = 'auto';
        }
      });

      document.addEventListener('mouseup', function(e) {
        if (isDragging) {
          isDragging = false;
          aplayer.style.transition = 'all 0.3s ease';

          var screenWidth = window.innerWidth;
          var playerWidth = aplayer.offsetWidth;
          var finalLeft = aplayer.getBoundingClientRect().left;

          if (finalLeft + playerWidth / 2 > screenWidth / 2) {
            aplayer.style.left = (screenWidth - playerWidth - 15) + 'px';
          } else {
            aplayer.style.left = '15px';
          }
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
