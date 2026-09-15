/* ===========================================================================
   Renders the homework terms as a scrollable page.

   Each term is the *same* slide the deck would show, drawn into its own
   1280x720 stage and scaled down to the column width — so there is exactly one
   copy of the content (js/slides.js) and it can never drift from the talk.
   =========================================================================== */

(function () {
  'use strict';

  var W = 1280;
  var items = window.DECK.slides.filter(function (s) { return s.inHomework; });
  var list = document.getElementById('hw-list');
  var stages = [];

  items.forEach(function (s, i) {
    var item = document.createElement('section');
    item.className = 'hw-item';

    var frame = document.createElement('div');
    frame.className = 'hw-frame';

    var stage = document.createElement('div');
    stage.className = 'stage hw-stage';

    var slide = document.createElement('div');
    slide.className = window.RENDER.classes(s) + ' is-active';
    slide.innerHTML = window.RENDER.html(s, {});

    stage.appendChild(slide);
    frame.appendChild(stage);
    item.appendChild(frame);

    // Speaker notes become the "why it matters" note for a reader.
    if (s.notes) {
      var note = document.createElement('p');
      note.className = 'hw-note';
      note.innerHTML = String(s.notes).replace(/\n/g, '<br>');
      item.appendChild(note);
    }

    list.appendChild(item);
    stages.push({ frame: frame, stage: stage });
  });

  document.getElementById('hw-count').textContent = items.length + ' terms';
  document.getElementById('hw-total').textContent =
    window.DECK.slides.filter(function (s) { return s.act === 2 && s.n; })
      .reduce(function (max, s) { return Math.max(max, s.n); }, 0);

  // Scale each stage to the column width and collapse the frame to match.
  function fit() {
    stages.forEach(function (o) {
      var scale = o.frame.clientWidth / W;
      o.stage.style.setProperty('--scale', scale);
      // The stage is unscaled in the layout, so read its natural height and
      // collapse the frame to the scaled equivalent.
      o.frame.style.height = Math.round(o.stage.offsetHeight * scale) + 'px';
    });
  }

  fit();
  window.addEventListener('resize', fit);
  // Webfonts can change wrapping after first paint.
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
})();
