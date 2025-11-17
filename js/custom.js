document.addEventListener('DOMContentLoaded', function() {
  // Create MetingJS element
  var meting = document.createElement('meting-js');
  meting.setAttribute('server', 'netease');
  meting.setAttribute('type', 'playlist');
  meting.setAttribute('id', '2829883282');
  meting.setAttribute('fixed', 'true');
  meting.setAttribute('autoplay', 'false');
  meting.setAttribute('loop', 'all');
  meting.setAttribute('order', 'random');
  meting.setAttribute('preload', 'auto');
  meting.setAttribute('list-folded', 'true');
  meting.setAttribute('lrc-type', '3');
  meting.setAttribute('theme', '#49b1f5'); // Set theme color

  // Append to body and apply custom styles for left alignment
  document.body.appendChild(meting);
  var style = document.createElement('style');
  style.innerHTML = `
    .aplayer.aplayer-fixed .aplayer-body {
      left: 0 !important;
      right: auto !important;
    }
  `;
  document.head.appendChild(style);
});

