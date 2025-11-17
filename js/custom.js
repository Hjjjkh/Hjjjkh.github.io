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

  // Append to body
  document.body.appendChild(meting);
});

