/* ===========================================================================
   Dev-only auto-reload.

   Polls the source files and reloads when any of them changes on disk, so
   edits to slides.js / deck.css show up without touching the browser.

   Inert unless you're on localhost — opening index.html from disk, or hosting
   it anywhere real, skips all of this. Safe to leave in.
   =========================================================================== */

(function () {
  'use strict';

  var isLocal = ['localhost', '127.0.0.1', '[::1]'].indexOf(location.hostname) !== -1;
  if (!isLocal || location.protocol === 'file:') return;

  var WATCH = ['js/slides.js', 'js/render.js', 'js/deck.js', 'css/deck.css', 'index.html'];
  var stamps = Object.create(null);
  var failures = 0;

  function stamp(res) {
    return (res.headers.get('last-modified') || '') + '|' + (res.headers.get('content-length') || '');
  }

  function check() {
    Promise.all(WATCH.map(function (f) {
      return fetch(f + '?_=' + Date.now(), { method: 'HEAD', cache: 'no-store' })
        .then(function (r) { return r.ok ? f + '=' + stamp(r) : null; })
        .catch(function () { return null; });
    })).then(function (results) {
      var live = results.filter(Boolean);
      // Server went away (or every request failed) — don't reload into a dead page.
      if (!live.length) { failures++; return; }
      failures = 0;

      var changed = false, first = !Object.keys(stamps).length;
      live.forEach(function (entry) {
        var i = entry.indexOf('='), f = entry.slice(0, i), s = entry.slice(i + 1);
        if (stamps[f] !== undefined && stamps[f] !== s) changed = true;
        stamps[f] = s;
      });

      if (changed && !first) {
        // The deck restores its own position from the hash on boot, so a reload
        // lands you back on the slide you were looking at.
        location.reload();
      }
    });
  }

  check();
  setInterval(check, 1000);
  console.log('%c live-reload on ', 'background:#E08159;color:#2A1710;border-radius:3px',
              'watching ' + WATCH.length + ' files');
})();
