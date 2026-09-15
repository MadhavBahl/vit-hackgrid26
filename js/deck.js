/* ===========================================================================
   Deck controller: navigation, beats, overlays, timer, presenter sync.
   =========================================================================== */

(function () {
  'use strict';

  var DECK = window.DECK, R = window.RENDER;
  var ALL = DECK.slides;

  var state = {
    i: 0,              // index into the visible list
    beat: 0,           // how many beats revealed on the current slide
    trim: false,       // skip slides flagged `cut`
    started: null,     // talk start timestamp
    target: 75 * 60    // target talk length, seconds (press [ and ] to adjust)
  };

  var els = {};
  var visible = [];    // indices into ALL that are currently shown

  /* --- visible list ----------------------------------------------------- */
  function rebuild() {
    var currentAbs = visible.length ? visible[state.i] : 0;
    visible = [];
    for (var k = 0; k < ALL.length; k++) {
      if (state.trim && ALL[k].cut) continue;
      visible.push(k);
    }
    // keep the closest slide to where we were
    var best = 0, bestD = Infinity;
    for (var j = 0; j < visible.length; j++) {
      var d = Math.abs(visible[j] - currentAbs);
      if (d < bestD) { bestD = d; best = j; }
    }
    state.i = best;
    document.body.classList.toggle('is-trim', state.trim);
  }

  function cur()    { return ALL[visible[state.i]]; }
  // Index the slide elements themselves — the stage also holds the skip button,
  // so child position is not the same as slide number.
  function slideEls() { return els.slides; }
  function curEl()  { return els.slides[visible[state.i]]; }
  function maxBeat(slide, el) { return el ? el.querySelectorAll('.beat').length : 0; }

  // Slides whose entire body is beats (the creed) would otherwise land blank.
  function entryBeat() { return ALL[visible[state.i]].autoBeat || 0; }

  /* --- build ------------------------------------------------------------ */
  function build() {
    var frag = document.createDocumentFragment();
    ALL.forEach(function (s, idx) {
      var d = document.createElement('section');
      d.className = R.classes(s);
      d.dataset.idx = idx;
      d.innerHTML = R.html(s, { currentAct: s.act });
      frag.appendChild(d);
    });
    els.stage.appendChild(frag);
    els.slides = els.stage.querySelectorAll('.slide');

    // Act rail segments
    els.rail.innerHTML = DECK.acts.map(function () {
      return '<span class="ar-seg"></span>';
    }).join('');
  }

  /* --- show ------------------------------------------------------------- */
  function show(opts) {
    opts = opts || {};
    var abs = visible[state.i];
    var slide = ALL[abs];

    Array.prototype.forEach.call(els.slides, function (el, idx) {
      el.classList.toggle('is-active', idx === abs);
      el.classList.toggle('is-past', idx < abs);
    });

    applyBeats();
    updateChrome();
    persist();
    broadcast();
  }

  function applyBeats() {
    var el = curEl();
    if (!el) return;
    var bs = el.querySelectorAll('.beat');
    Array.prototype.forEach.call(bs, function (b, n) {
      b.classList.toggle('is-shown', n < state.beat);
    });
  }

  function updateChrome() {
    var slide = cur();
    var pct = visible.length > 1 ? (state.i / (visible.length - 1)) * 100 : 100;
    els.bar.style.width = pct + '%';
    els.counter.textContent = (state.i + 1) + ' / ' + visible.length;
    els.hudAct.textContent = 'Act ' + slide.act + ' · ' + R.actName(slide.act);

    Array.prototype.forEach.call(els.rail.children, function (seg, n) {
      var a = DECK.acts[n].n;
      seg.className = 'ar-seg' + (a === slide.act ? ' now' : (a < slide.act ? ' done' : ''));
    });

    updateSkip();
    els.notesBody.innerHTML = slide.notes
      ? String(slide.notes).replace(/\n/g, '<br>')
      : '<em style="color:var(--ink-4)">No notes for this slide.</em>';
    els.notesMeme.textContent = slide.meme ? '🖼  ' + slide.meme : '';
    els.notesMeme.style.display = slide.meme ? '' : 'none';
  }

  /* --- navigation ------------------------------------------------------- */
  function next() {
    var el = curEl(), m = maxBeat(cur(), el);
    if (state.beat < m) { state.beat++; applyBeats(); broadcast(); return; }
    if (state.i < visible.length - 1) { state.i++; state.beat = entryBeat(); show(); }
  }
  function prev() {
    if (state.beat > 0) { state.beat--; applyBeats(); broadcast(); return; }
    if (state.i > 0) {
      state.i--;
      var el = els.slides[visible[state.i]];
      state.beat = maxBeat(ALL[visible[state.i]], el);   // land on a fully-revealed slide
      show();
    }
  }
  function goAbs(absIdx) {
    for (var j = 0; j < visible.length; j++) {
      if (visible[j] === absIdx) { state.i = j; state.beat = entryBeat(); show(); return; }
    }
    // slide is hidden by trim mode — turn trim off and go there
    state.trim = false; rebuild();
    for (var k = 0; k < visible.length; k++) {
      if (visible[k] === absIdx) { state.i = k; state.beat = entryBeat(); show(); return; }
    }
  }
  function goAct(n) {
    for (var k = 0; k < ALL.length; k++) {
      if (ALL[k].act === n) { goAbs(k); return; }
    }
  }

  /* --- persistence + deep links ---------------------------------------- */
  function persist() {
    try {
      localStorage.setItem('hg26.pos', JSON.stringify({ abs: visible[state.i], trim: state.trim }));
    } catch (e) {}
    var h = '#' + (visible[state.i] + 1);
    if (location.hash !== h) history.replaceState(null, '', h);
  }
  function restore() {
    var abs = null;
    var fromHash = parseInt((location.hash || '').slice(1), 10);
    if (fromHash >= 1 && fromHash <= ALL.length) abs = fromHash - 1;
    if (abs === null) {
      try {
        var saved = JSON.parse(localStorage.getItem('hg26.pos') || 'null');
        if (saved) { abs = saved.abs; state.trim = !!saved.trim; }
      } catch (e) {}
    }
    rebuild();
    if (abs != null) {
      for (var j = 0; j < visible.length; j++) if (visible[j] === abs) { state.i = j; break; }
    }
    state.beat = entryBeat();
  }

  /* --- timer ------------------------------------------------------------ */
  function fmt(sec) {
    var neg = sec < 0; sec = Math.abs(Math.round(sec));
    var m = Math.floor(sec / 60), s = sec % 60;
    return (neg ? '-' : '') + m + ':' + String(s).padStart(2, '0');
  }
  function tickTimer() {
    if (!state.started) { els.timer.textContent = '—:—'; els.timer.className = 'hud-timer'; return; }
    var elapsed = (Date.now() - state.started) / 1000;
    els.timer.textContent = fmt(elapsed);
    els.timer.className = 'hud-timer' +
      (elapsed > state.target ? ' over' : elapsed > state.target * 0.85 ? ' warn' : '');
    broadcast();
  }

  /* --- presenter sync --------------------------------------------------- */
  var chan = null;
  try { chan = new BroadcastChannel('hg26'); } catch (e) {}

  function broadcast() {
    if (!chan) return;
    var slide = cur(), nextSlide = visible[state.i + 1] != null ? ALL[visible[state.i + 1]] : null;
    chan.postMessage({
      type: 'state',
      i: state.i, total: visible.length, abs: visible[state.i],
      act: slide.act, actName: R.actName(slide.act),
      notes: slide.notes || '', meme: slide.meme || '',
      kicker: slide.kicker || slide.label || '',
      summary: R.summary(slide),
      nextSummary: nextSlide ? R.summary(nextSlide) : '— end of deck —',
      beat: state.beat, maxBeat: maxBeat(slide, curEl()),
      started: state.started, target: state.target, trim: state.trim
    });
  }
  if (chan) {
    chan.onmessage = function (e) {
      var m = e.data;
      if (!m) return;
      if (m.type === 'cmd') {
        if (m.cmd === 'next') next();
        else if (m.cmd === 'prev') prev();
        else if (m.cmd === 'goto') goAbs(m.abs);
        else if (m.cmd === 'timer') { toggleTimer(m.action); }
        else if (m.cmd === 'hello') broadcast();
      }
    };
  }

  function toggleTimer(action) {
    if (action === 'reset') { state.started = null; }
    else if (action === 'start' || !state.started) { state.started = Date.now(); }
    else { state.started = null; }
    tickTimer();
  }

  /* --- overlays --------------------------------------------------------- */
  function openOverlay(name) {
    closeOverlays();
    var o = document.getElementById('ov-' + name);
    if (!o) return;
    o.classList.add('is-open');
    if (name === 'overview') paintOverview();
  }
  function closeOverlays() {
    Array.prototype.forEach.call(document.querySelectorAll('.overlay'), function (o) {
      o.classList.remove('is-open');
    });
  }
  function anyOverlayOpen() { return !!document.querySelector('.overlay.is-open'); }

  function paintOverview() {
    var g = els.ovGrid, curAbs = visible[state.i];
    g.innerHTML = ALL.map(function (s, idx) {
      return '<div class="ov-card' + (idx === curAbs ? ' is-current' : '') + (s.cut ? ' is-cut' : '') +
        '" data-idx="' + idx + '">' +
        '<span class="ovc-act">A' + s.act + '</span>' +
        '<span class="ovc-n">' + (idx + 1) + '</span>' +
        '<div class="ovc-text">' + R.summary(s) + '</div>' +
        '<div class="ovc-type">' + s.type + '</div></div>';
    }).join('');
    var c = g.querySelector('.is-current');
    if (c) c.scrollIntoView({ block: 'center' });
  }

  /* --- bingo ------------------------------------------------------------ */
  var BINGO = ['AGI', 'LLM', 'Disrupt', '10x', 'Prompt engineer', 'Agentic', 'Hallucination', 'RAG', 'Game-changer'];
  function paintBingo() {
    var hits = {};
    try { hits = JSON.parse(localStorage.getItem('hg26.bingo') || '{}'); } catch (e) {}
    els.bingoGrid.innerHTML = BINGO.map(function (w, i) {
      return '<div class="bingo-cell' + (hits[i] ? ' is-hit' : '') + '" data-b="' + i + '">' + w + '</div>';
    }).join('');
  }

  /* --- keys ------------------------------------------------------------- */
  var KEYS = {
    next: ['ArrowRight', 'ArrowDown', ' ', 'PageDown', 'Enter'],
    prev: ['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace']
  };

  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    var k = e.key;

    if (k === 'Escape') { closeOverlays(); els.notes.classList.remove('is-open'); return; }
    if (anyOverlayOpen() && KEYS.next.indexOf(k) === -1 && KEYS.prev.indexOf(k) === -1) {
      if (k === '?' || k === 'o' || k === 'O' || k === 'q' || k === 'Q' || k === 'b' || k === 'B') closeOverlays();
      return;
    }

    if (KEYS.next.indexOf(k) !== -1) { e.preventDefault(); next(); return; }
    if (KEYS.prev.indexOf(k) !== -1) { e.preventDefault(); prev(); return; }

    switch (k) {
      case 'Home': state.i = 0; state.beat = entryBeat(); show(); break;
      case 'End':  state.i = visible.length - 1; state.beat = entryBeat(); show(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'o': case 'O': openOverlay('overview'); break;
      case '?': case '/': openOverlay('help'); break;
      case 'q': case 'Q': openOverlay('qr'); break;
      case 'b': case 'B': paintBingo(); openOverlay('bingo'); break;
      case 's': case 'S': els.notes.classList.toggle('is-open'); break;
      case 'c': case 'C': document.body.classList.toggle('is-clean'); break;
      case '.': document.body.classList.toggle('is-blackout'); break;
      case 'x': case 'X': state.trim = !state.trim; rebuild(); show(); break;
      case 'n': case 'N': {
        var t = skipTo[visible[state.i]];
        if (t != null && t >= 0) goAbs(t);
        break;
      }
      case 't': case 'T': toggleTimer(); break;
      case 'r': case 'R': toggleTimer('reset'); break;
      case 'p': case 'P':
        window.open('presenter.html', 'hg26presenter', 'width=1180,height=760');
        break;
      case '[': state.target = Math.max(300, state.target - 300); tickTimer(); break;
      case ']': state.target += 300; tickTimer(); break;
      default:
        if (/^[0-7]$/.test(k)) goAct(parseInt(k, 10));
    }
  }

  /* --- tier skipping ----------------------------------------------------
     Act 2 runs five tiers of buzzwords. If the room is not interested in the
     tier you are in, this jumps straight to the start of the next one.
     Concept slides do not record their own tier, so walk the deck once and
     stamp each Act 2 slide with the last tier divider seen. ------------- */
  var tierOf = [];      // slide index -> tier number (Act 2 only)
  var skipTo = [];      // slide index -> index to jump to, or -1

  function buildTiers() {
    var cur = 0;
    for (var i = 0; i < ALL.length; i++) {
      if (ALL[i].act !== 2) { tierOf[i] = 0; continue; }
      if (ALL[i].type === 'tier') cur = ALL[i].tier;
      tierOf[i] = cur;
    }
    for (var j = 0; j < ALL.length; j++) {
      skipTo[j] = -1;
      // Only inside a tier's run of concepts — not on the activity that closes
      // the act, where "skip ahead" would mean skipping the activity itself.
      if (ALL[j].act !== 2 || tierOf[j] < 2 || ALL[j].type === 'activity') continue;
      // the next tier divider…
      for (var k = j + 1; k < ALL.length; k++) {
        if (ALL[k].act === 2 && ALL[k].type === 'tier') { skipTo[j] = k; break; }
        // …or, past the last tier, whatever ends the act (the activity)
        if (ALL[k].act !== 2) { skipTo[j] = k; break; }
        if (ALL[k].type === 'activity') { skipTo[j] = k; break; }
      }
    }
  }

  function tierLabel(idx) {
    var t = ALL[idx];
    if (t.type === 'tier') {
      return 'Tier ' + t.tier + ' · ' + String(t.heading).replace(/<[^>]+>/g, '');
    }
    return t.heading || R.summary(t);
  }

  function updateSkip() {
    var btn = els.skip;
    if (!btn) return;
    var abs = visible[state.i], target = skipTo[abs];
    if (target == null || target < 0) {
      btn.hidden = true;
      els.stage.classList.remove('has-skip');
      return;
    }
    btn.hidden = false;
    els.stage.classList.add('has-skip');
    btn.querySelector('.st-target').textContent = tierLabel(target);
    btn.dataset.target = target;
  }

  /* --- fullscreen ------------------------------------------------------- */
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      if (document.exitFullscreen) document.exitFullscreen();
    } else if (document.documentElement.requestFullscreen) {
      // Rejects if the call didn't come from a user gesture — nothing to do.
      var p = document.documentElement.requestFullscreen();
      if (p && p.catch) p.catch(function () {});
    }
  }

  function syncFullscreenUI() {
    var on = !!document.fullscreenElement;
    document.body.classList.toggle('is-fs', on);
    var btn = document.getElementById('btn-fullscreen');
    if (btn) btn.setAttribute('aria-label', on ? 'Exit fullscreen' : 'Enter fullscreen');
  }

  /* --- stage scaling ---------------------------------------------------- */
  function fit() {
    var s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    els.stage.style.setProperty('--scale', s);
  }

  /* --- boot ------------------------------------------------------------- */
  function boot() {
    els.stage     = document.getElementById('stage');
    els.bar       = document.querySelector('.progress > i');
    els.rail      = document.querySelector('.act-rail');
    els.counter   = document.getElementById('hud-counter');
    els.hudAct    = document.getElementById('hud-act');
    els.timer     = document.getElementById('hud-timer');
    els.notes     = document.getElementById('notes-strip');
    els.notesBody = document.querySelector('.ns-body');
    els.notesMeme = document.querySelector('.ns-meme');
    els.ovGrid    = document.getElementById('ov-grid');
    els.bingoGrid = document.getElementById('bingo-grid');
    els.skip      = document.getElementById('btn-skip-tier');

    buildTiers();
    build();
    restore();
    fit();
    show();

    window.addEventListener('resize', fit);
    document.addEventListener('keydown', onKey);
    document.addEventListener('fullscreenchange', syncFullscreenUI);
    if (els.skip) els.skip.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var t = parseInt(els.skip.dataset.target, 10);
      if (t >= 0) goAbs(t);
    });

    var fsBtn = document.getElementById('btn-fullscreen');
    if (fsBtn) fsBtn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      toggleFullscreen();
    });
    syncFullscreenUI();
    setInterval(tickTimer, 1000);

    // Click / tap to advance — but not on interactive chrome.
    els.stage.addEventListener('click', function (e) {
      if (e.target.closest('a, button, .bingo-cell')) return;
      next();
    });

    document.addEventListener('click', function (e) {
      var card = e.target.closest('.ov-card');
      if (card) { closeOverlays(); goAbs(+card.dataset.idx); return; }

      var cell = e.target.closest('.bingo-cell');
      if (cell) {
        var hits = {};
        try { hits = JSON.parse(localStorage.getItem('hg26.bingo') || '{}'); } catch (err) {}
        hits[cell.dataset.b] = !hits[cell.dataset.b];
        try { localStorage.setItem('hg26.bingo', JSON.stringify(hits)); } catch (err) {}
        paintBingo();
        return;
      }

      if (e.target.closest('.ov-close')) { closeOverlays(); return; }
      if (e.target.closest('#bingo-reset')) {
        try { localStorage.removeItem('hg26.bingo'); } catch (err) {}
        paintBingo();
      }
    });

    // Swipe on a touch screen / trackpad-enabled laptop.
    var x0 = null;
    document.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    document.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      x0 = null;
    }, { passive: true });

    window.addEventListener('hashchange', function () {
      var n = parseInt((location.hash || '').slice(1), 10);
      if (n >= 1 && n <= ALL.length && visible[state.i] !== n - 1) goAbs(n - 1);
    });

    broadcast();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
