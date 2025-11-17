document.addEventListener('DOMContentLoaded', function() {
  // Create MetingJS element for a fixed, foldable player
  var meting = document.createElement('meting-js');
  meting.setAttribute('server', 'netease');
  meting.setAttribute('type', 'playlist');
  meting.setAttribute('id', '2829883282');
  meting.setAttribute('fixed', 'true');
  meting.setAttribute('mini', 'true'); // Set to mini mode
  meting.setAttribute('autoplay', 'false');
  meting.setAttribute('loop', 'all');
  meting.setAttribute('order', 'random');
  meting.setAttribute('preload', 'auto');
  meting.setAttribute('list-folded', 'true');
  meting.setAttribute('lrc-type', '3');
  meting.setAttribute('theme', '#49b1f5'); // Set theme color

  // Append to body
  document.body.appendChild(meting);

  // Inject CSS to move the player to the bottom left
  var style = document.createElement('style');
  style.innerHTML = `
    .aplayer.aplayer-fixed.aplayer-mini .aplayer-body {
      left: 15px !important;
      right: auto !important;
      bottom: 15px !important;
    }
  `;
  document.head.appendChild(style);
});
