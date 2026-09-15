/* ===========================================================================
   Slide templates. One function per `type` in js/slides.js.
   Each returns the inner HTML for a .slide element; the class list is built
   by buildSlide() at the bottom.
   =========================================================================== */

(function () {
  'use strict';

  var M = window.DECK.meta;
  var ACTS = window.DECK.acts;

  function actName(n) {
    for (var i = 0; i < ACTS.length; i++) if (ACTS[i].n === n) return ACTS[i].name;
    return '';
  }
  function actBlurb(n) {
    for (var i = 0; i < ACTS.length; i++) if (ACTS[i].n === n) return ACTS[i].blurb || '';
    return '';
  }

  /* Optional shared fragments ------------------------------------------- */
  function kicker(s)    { return s.kicker    ? '<div class="kicker">' + s.kicker + '</div>' : ''; }
  function sub(s)       { return s.sub       ? '<p class="sub">' + s.sub + '</p>' : ''; }
  function footnote(s)  { return s.footnote  ? '<p class="footnote">' + s.footnote + '</p>' : ''; }
  function punchline(s) { return s.punchline ? '<p class="punchline">' + s.punchline + '</p>' : ''; }
  function source(s)    { return s.source    ? '<p class="source">Source: ' + s.source + '</p>' : ''; }
  function meme(s)      { return s.meme      ? '<div class="meme-note">' + s.meme + '</div>' : ''; }
  // Small throwaway line pinned to the bottom of the slide. Works on any type.
  function aside(s)     { return s.aside     ? '<p class="slide-aside">' + s.aside + '</p>' : ''; }

  // Beats are revealed one arrow-press at a time.
  function beats(list, cls) {
    if (!list || !list.length) return '';
    return '<div class="beats ' + (cls || '') + '">' + list.map(function (b, i) {
      return '<div class="beat" data-beat="' + i + '">' + b + '</div>';
    }).join('') + '</div>';
  }

  // Full-bleed background image, blurred and dimmed so text stays readable.
  function bgLayer(s) {
    return s.bg ? '<div class="slide-bg"><img src="' + s.bg + '" alt=""></div>' : '';
  }

  // Any slide can pin the question-board QR bottom-right with `qr: true`.
  function cornerQr(s) {
    return s.qr ? '<div class="slide-qr">' +
      qrBlock(M.questionBoardUrl, 'Ask anything, anytime', boardImg()) + '</div>' : '';
  }

  function boardImg() { return M.questionBoardImage || 'assets/img/qr-menti.png'; }

  function qrBlock(url, caption, file) {
    return '<div class="qr-block">' +
      '<img class="qr-box" src="' + (file || boardImg()) + '" alt="QR code for ' + url + '" width="150" height="150" ' +
      'onerror="this.replaceWith(Object.assign(document.createElement(\'div\'),{className:\'qr-box\',style:\'width:150px;height:150px\'}))">' +
      '<div class="qr-cap">' + caption + '</div></div>';
  }

  /* ===================================================================== */

  var T = {};

  T.title = function (s) {
    return '<h1 class="title-main">' + s.title + '</h1>' +
      '<p class="title-sub">' + s.subtitle + '</p>' +
      '<div class="title-foot">' + s.footer + '</div>' +
      '<div class="title-speaker"><b>' + M.speaker + '</b>' + M.handle + '</div>';
  };

  T.statement = function (s) {
    return kicker(s) +
      '<h2 class="statement-text">' + s.text + '</h2>' +
      sub(s) +
      beats(s.beats, 'statement-beats') +
      footnote(s) + meme(s);
  };

  T.boy = function (s) {
    var body = '<span class="boy-tag">' + (s.boy === 1 ? 'The first boy' : 'The other boy') + '</span>' +
      '<h2 class="boy-text">' + s.text + '</h2>' +
      (s.sub ? '<p class="boy-sub">' + s.sub + '</p>' : '');
    // `tiles` squares off several photos into a grid beside the headline.
    if (s.tiles && s.tiles.length) {
      return '<div class="boy-body">' + body + '</div>' +
        '<div class="boy-tiles">' + s.tiles.map(function (t) {
          return '<figure class="tile" data-src="' + t.src + '">' +
            '<img src="' + t.src + '" alt="' + (t.alt || '') + '"' +
            (t.pos ? ' style="object-position:' + t.pos + '"' : '') + ' ' +
            'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>';
        }).join('') + '</div>';
    }
    // `images` (an array) lays artifacts out as an equal-height row beneath the
    // headline — handles mismatched aspect ratios far better than one side slot.
    if (s.images && s.images.length) {
      return body + '<div class="boy-gallery">' + s.images.map(function (im) {
        return '<figure class="gallery-item" data-src="' + im.src + '">' +
          '<img src="' + im.src + '" alt="' + (im.alt || '') + '" ' +
          'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>';
      }).join('') + '</div>';
    }
    if (!s.image) return body;
    // imagePos overrides the crop, e.g. imagePos: '60% 30%' — default suits a
    // roughly centred subject.
    var pos = s.imagePos ? ' style="object-position:' + s.imagePos + '"' : '';
    var shot = s.imageStyle === 'screenshot' ? ' is-screenshot' : '';
    return '<div class="boy-body">' + body + '</div>' +
      '<figure class="boy-photo' + shot + '" data-src="' + s.image + '">' +
      '<img src="' + s.image + '" alt=""' + pos + ' ' +
      'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>';
  };

  T.reveal = function (s) {
    return '<h2 class="reveal-text">' + s.text + '</h2>' +
      '<div class="reveal-photo"><img src="' + s.image + '" alt="' + M.speaker + '"></div>';
  };

  T.bullets = function (s) {
    return kicker(s) +
      (s.heading ? '<h2 class="statement-text" style="font-size:44px;max-width:26ch;margin-bottom:34px">' + s.heading + '</h2>' : '') +
      '<ul class="bullet-list">' + s.items.map(function (it, i) {
        return '<li class="beat" data-beat="' + i + '">' + it + '</li>';
      }).join('') + '</ul>' +
      '';
  };

  T.toc = function (s, ctx) {
    var cur = ctx && ctx.currentAct;
    return '<h2 class="statement-text" style="font-size:44px;margin-bottom:38px">' + s.heading + '</h2>' +
      '<ul class="toc-list">' + ACTS.map(function (a) {
        var cls = a.n === cur ? 'is-current' : (cur != null && a.n < cur ? 'is-done' : '');
        return '<li class="' + cls + '"><span class="toc-n">' + a.n + '</span>' + a.name + '</li>';
      }).join('') + '</ul>';
  };

  // A running index of the whole talk, shown on every act divider so the room
  // can see what is done, where we are, and what is still to come.
  function actIndex(current) {
    return '<ol class="act-index">' + ACTS.map(function (a) {
      var state = a.n < current ? 'is-done' : a.n === current ? 'is-now' : 'is-next';
      return '<li class="' + state + '">' +
        '<span class="ai-n">' + a.n + '</span>' +
        '<span class="ai-name">' + a.name + '</span>' +
        (a.n === current && a.blurb ? '<span class="ai-time">' + a.blurb + '</span>' : '') +
        '</li>';
    }).join('') + '</ol>';
  }

  T['act-divider'] = function (s) {
    return actIndex(s.act) +
      '<div class="act-num">' + s.act + '</div>' +
      '<h2 class="act-name">' + actName(s.act) + '</h2>' +
      (s.subtitle ? '<p class="act-sub">' + s.subtitle + '</p>' : '') +
      (s.kicker ? '<p class="act-kicker">' + s.kicker + '</p>' : '') +
      '';
  };

  T['section-card'] = function (s) {
    return '<div class="sc-label">' + s.label + '</div><h2 class="sc-text">' + s.text + '</h2>';
  };

  /* --- Act 2 ----------------------------------------------------------- */

  T.concept = function (s) {
    var body = '<div class="c-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term">' + s.term +
      (s.expand ? '<span class="c-expand">' + s.expand + '</span>' : '') + '</h2></div>' +
      (s.ref ? '<p class="c-ref">' + s.ref + '</p>' : '') +
      '<p class="c-script">' + s.script + '</p>';
    var cut = s.cut ? '<div class="c-cut">optional</div>' : '';

    // A detailed image with text inside it needs the full slide width, not the
    // side slot — otherwise its own labels are unreadable from the back.
    if (s.wideImage) {
      return cut + body +
        '<figure class="c-wide" data-src="' + s.wideImage + '">' +
        '<img src="' + s.wideImage + '" alt="' + (s.imageAlt || '') + '" ' +
        'onerror="this.closest(\'figure\').classList.add(\'img-missing\')">' +
        (s.credit ? '<figcaption>Image: <span class="cr-name">' + s.credit.label +
          '</span> &middot; ' + s.credit.url + '</figcaption>' : '') +
        '</figure>';
    }

    // A row of captioned panels — a two-up meme, where the pairing is the point.
    if (s.panels && s.panels.length) {
      return cut + body + '<div class="panel-row">' + s.panels.map(function (pn) {
        return '<figure class="panel" data-src="' + pn.src + '">' +
          '<img src="' + pn.src + '" alt="' + (pn.alt || '') + '" ' +
          'onerror="this.closest(\'figure\').classList.add(\'img-missing\')">' +
          (pn.caption ? '<figcaption>' + pn.caption + '</figcaption>' : '') +
          '</figure>';
      }).join('') + '</div>';
    }
    if (!s.image) return cut + body;
    // With a still, the reference becomes the picture — text left, image right.
    return cut + '<div class="c-body">' + body + '</div>' +
      '<figure class="c-photo' + (s.imageStyle === 'cutout' ? ' is-cutout' : '') +
      '" data-src="' + s.image + '">' +
      '<img src="' + s.image + '" alt="' + (s.imageAlt || '') + '" ' +
      'onerror="this.closest(\'figure\').classList.add(\'img-missing\')">' +
      (s.imageAlt ? '<figcaption>' + s.imageAlt + '</figcaption>' : '') +
      '</figure>';
  };

  // Hand-off to the homework page. The term list is generated from whatever is
  // actually marked `inHomework`, so it can never drift out of sync.
  T.homework = function (s) {
    var terms = window.DECK.slides
      .filter(function (x) { return x.inHomework && x.term; })
      .map(function (x) { return '<li>' + x.term + '</li>'; }).join('');
    return '<div class="hw-label">' + s.label + '</div>' +
      '<h2 class="hw-head">' + s.heading + '</h2>' +
      '<p class="hw-sub">' + s.sub + '</p>' +
      '<ul class="hw-terms">' + terms + '</ul>' +
      '<a class="hw-link" href="homework.html" target="_blank" rel="noopener">' +
      '<span class="hw-link-label">Read them here</span>' +
      '<span class="hw-link-url">' + (M.homeworkUrl || 'homework.html') + '</span></a>';
  };

  T.tier = function (s) {
    return '<div class="tier-label">' + s.label + '</div>' +
      '<h2 class="tier-head">' + s.heading + '</h2>' +
      '<div class="tier-dots">' + [1, 2, 3, 4, 5].map(function (i) {
        return '<i class="' + (i <= s.tier ? 'on' : '') + '"></i>';
      }).join('') + '</div>';
  };

  T['family-tree'] = function (s) {
    // Nested boxes, outermost first.
    var html = '';
    for (var i = s.layers.length - 1; i >= 0; i--) {
      html = '<div class="ft-layer d' + i + '"><span class="ft-name">' + s.layers[i] + '</span>' + html + '</div>';
    }
    return '<div class="ft-wrap"><div class="ft-boxes">' + html + '</div>' +
      '<div class="ft-side"><div class="c-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term" style="font-size:42px">' + s.term + '</h2></div>' +
      '<p class="c-ref" style="font-size:25px">' + s.ref + '</p>' +
      '<p class="c-script" style="font-size:25px">' + s.script + '</p></div></div>';
  };

  T.ladder = function (s) {
    // The literal thing going in, wired into the first column.
    var src = '';
    if (s.inputImage) {
      var iw = 132, ih = 66, ix = 20, iy = CY - ih / 2;
      var feed = cols[0].ys.map(function (y) {
        return '<line x1="' + (ix + iw) + '" y1="' + CY +
               '" x2="' + (cols[0].x - R) + '" y2="' + y + '" class="nn-edge"/>';
      }).join('');
      src = '<defs><clipPath id="nnimg"><rect x="' + ix + '" y="' + iy + '" width="' + iw +
            '" height="' + ih + '" rx="9"/></clipPath></defs>' +
            feed +
            '<image href="' + s.inputImage + '" x="' + ix + '" y="' + iy + '" width="' + iw +
            '" height="' + ih + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#nnimg)"/>' +
            '<rect x="' + ix + '" y="' + iy + '" width="' + iw + '" height="' + ih +
            '" rx="9" class="nn-img-frame"/>';
    }

    return '<div class="c-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term" style="font-size:44px">' + s.term + '</h2></div>' +
      '<div class="ladder">' + s.rungs.map(function (r) {
        return '<div class="rung ' + r.state + '">' +
          '<span class="rung-name">' + r.name + '</span>' +
          (r.img ? '<figure class="rung-img" data-src="' + r.img + '">' +
            '<img src="' + r.img + '" alt="' + (r.alt || '') + '" ' +
            'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>' : '') +
          '<span class="rung-desc">' + r.desc + '</span></div>';
      }).join('') + '</div>' +
      '<p class="c-script">' + s.script + '</p>';
  };

  /* --- Act 3 ----------------------------------------------------------- */

  T.stat = function (s) {
    return '<h2 class="stat-head">' + s.heading + '</h2>' +
      '<div class="stat-row">' + s.stats.map(function (st) {
        return '<div class="stat-item"><div class="stat-value">' + st.value + '</div>' +
          '<div class="stat-label">' + st.label + '</div></div>';
      }).join('') + '</div>' + punchline(s) + source(s);
  };

  T.versus = function (s) {
    return '<h2 class="vs-head">' + s.heading + '</h2>' +
      '<div class="vs-row">' +
      '<div class="vs-side"><div class="vs-label">' + s.left.label + '</div>' +
      '<p class="vs-text"><span class="vs-strike">' + s.left.text + '</span></p></div>' +
      '<div class="vs-side"><div class="vs-label">' + s.right.label + '</div>' +
      '<p class="vs-text"><span class="vs-strike">' + s.right.text + '</span></p></div>' +
      '</div>' + punchline(s);
  };

  T.buckets = function (s) {
    return '<h2 class="b-head">' + s.heading + '</h2><p class="b-sub">' + s.sub + '</p>' +
      '<div class="b-grid">' + s.items.map(function (b) {
        return '<div class="b-item"><div class="b-n">0' + b.n + '</div>' +
          '<div class="b-name">' + b.name + '</div>' +
          '<div class="b-detail">' + b.detail + '</div></div>';
      }).join('') + '</div>' + punchline(s) + meme(s);
  };

  T.flow = function (s) {
    return '<h2 class="f-head">' + s.heading + '</h2>' +
      '<div class="f-wrap"><div class="f-root">' + s.root + '</div>' +
      '<div class="f-spine"></div>' +
      '<div class="f-branches">' + s.branches.map(function (b) {
        return '<div class="f-branch"><span class="f-bn">' + b.n + '</span>' +
          '<span class="f-bname">' + b.name + '</span>' +
          '<span class="f-bdetail">' + b.detail + '</span></div>';
      }).join('') + '</div></div>' + punchline(s);
  };

  T.roadmap = function (s) {
    return '<h2 class="r-head">' + s.heading + '</h2>' +
      '<div class="r-grid">' + s.phases.map(function (p) {
        return '<div class="r-phase"><div class="r-pn">Phase ' + p.n + '</div>' +
          '<div class="r-pname">' + p.name + '</div>' +
          '<ul class="r-items">' + p.items.map(function (it) {
            var key = s.highlight && it.indexOf(s.highlight) !== -1;
            return '<li class="' + (key ? 'is-key' : '') + '">' + it + '</li>';
          }).join('') + '</ul></div>';
      }).join('') + '</div>';
  };

  /* --- Act 4 ----------------------------------------------------------- */

  var ARC_LABEL = { belief: 'Belief & destiny', duality: 'Duality & detachment', people: 'People & self-mastery' };

  T.rule = function (s) {
    return '<div class="rule-n">' + s.rule + '</div>' +
      (s.arc ? '<div class="rule-arc">' + ARC_LABEL[s.arc] + '</div>' : '') +
      '<h2 class="rule-text">' + s.text + '</h2>' +
      (s.sub ? '<p class="rule-sub">' + s.sub + '</p>' : '') +
      beats(s.beats);
  };

  T.hook = function (s) {
    var body = (s.pattern ? '<div class="hook-pattern">' + s.pattern + '</div>' : '') +
      '<h2 class="hook-text">' + s.text + '</h2>' +
      (s.sub ? '<p class="hook-sub">' + s.sub + '</p>' : '');
    if (!s.image) return body;
    return '<div class="hook-body">' + body + '</div>' +
      '<figure class="hook-photo' + (s.imageStyle === 'cutout' ? ' is-cutout' : '') +
      '" data-src="' + s.image + '">' +
      '<img src="' + s.image + '" alt="' + (s.imageNote || '') + '" ' +
      'onerror="this.closest(\'figure\').classList.add(\'img-missing\')">' +
      (s.imageNote ? '<figcaption>' + s.imageNote + '</figcaption>' : '') + '</figure>';
  };

  // Last-resort renderer: shows whatever text the slide carries.
  T._fallback = function (s) {
    var img = s.gif || s.image || (s.images && s.images[0] && s.images[0].src) ||
              (s.tiles && s.tiles[0] && s.tiles[0].src) || '';
    return (s.heading ? '<div class="kicker">' + s.heading + '</div>' : '') +
      '<h2 class="statement-text" style="font-size:52px;max-width:24ch">' +
      (s.text || s.caption || s.term || s.takeaway || '') + '</h2>' +
      (s.sub ? '<p class="sub">' + s.sub + '</p>' : '') +
      (img ? '<img src="' + img + '" alt="" style="margin-top:28px;max-height:260px;' +
             'width:auto;border-radius:12px">' : '');
  };

  // Mixing-board diagram for "parameters". Three banks of faders with rising
  // density carry both halves of the idea at once: what a parameter IS, and
  // what the 7B / 70B / 405B numbers are actually counting.
  T.faders = function (s) {
    var W = 1060, H = 232, TOP = 16, TRACK = 132, GAP = 46;
    var bankW = (W - GAP * (s.banks.length - 1)) / s.banks.length;

    // Deterministic pseudo-random knob heights — stable across reloads.
    var seed = 7;
    function rnd() { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; }

    var svg = s.banks.map(function (b, bi) {
      var x0 = bi * (bankW + GAP);
      var step = bankW / b.n;
      var tw = b.n > 24 ? 2 : b.n > 12 ? 3 : 4;      // thinner tracks when denser
      var kw = b.n > 24 ? 9 : b.n > 12 ? 13 : 18;
      var faders = '';
      for (var i = 0; i < b.n; i++) {
        var cx = x0 + step * (i + 0.5);
        var ky = TOP + 8 + rnd() * (TRACK - 24);
        var hot = (i % 5 === 2);
        faders += '<rect x="' + (cx - tw / 2) + '" y="' + TOP + '" width="' + tw +
                  '" height="' + TRACK + '" rx="' + (tw / 2) + '" class="fd-track"/>' +
                  '<rect x="' + (cx - kw / 2) + '" y="' + ky + '" width="' + kw +
                  '" height="9" rx="3" class="fd-knob' + (hot ? ' fd-hot' : '') + '"/>';
      }
      return faders +
        '<line x1="' + x0 + '" y1="' + (TOP + TRACK + 18) + '" x2="' + (x0 + bankW) +
        '" y2="' + (TOP + TRACK + 18) + '" class="fd-rule"/>' +
        '<text x="' + (x0 + bankW / 2) + '" y="' + (TOP + TRACK + 52) + '" class="fd-count">' + b.count + '</text>' +
        '<text x="' + (x0 + bankW / 2) + '" y="' + (TOP + TRACK + 74) + '" class="fd-label">' + b.label + '</text>';
    }).join('');

    return '<div class="c-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term">' + s.term + '</h2></div>' +
      (s.ref ? '<p class="c-ref fd-ref">' + s.ref + '</p>' : '') +
      '<svg class="fd" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="Three banks of mixing-desk faders, each denser than the last: 7B, 70B and 405B parameters">' +
      svg + '</svg>' +
      (s.eli6 ? '<div class="eli6"><p class="eli6-text">' + s.eli6 + '</p></div>' : '') +
      '<p class="nn-caption">' + s.caption + '</p>';
  };

  // A concept announced on its own, before the explanation that follows.
  T['concept-title'] = function (s) {
    return '<div class="c-head ct-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term">' + s.term + '</h2></div>';
  };

  // Neural-net diagram: columns of nodes, every node wired to the next column.
  // The dashed edges animate so the direction of travel is visible, which is
  // the whole point of the "passes a note up the chain" line.
  T.neural = function (s) {
    var W = 1060, H = 330, R = 15, CY = 168;
    // With a source image on the left, start the columns further in to make room.
    var X0 = s.inputImage ? 232 : 110, X1 = W - 110;
    var cols = s.layers.map(function (L, i) {
      var x = X0 + i * ((X1 - X0) / (s.layers.length - 1));
      var gap = 50, span = (L.n - 1) * gap;
      var ys = [];
      for (var k = 0; k < L.n; k++) ys.push(CY - span / 2 + k * gap);
      return { x: x, ys: ys, kind: L.kind };
    });

    var edges = '';
    for (var i = 0; i < cols.length - 1; i++) {
      cols[i].ys.forEach(function (y1) {
        cols[i + 1].ys.forEach(function (y2) {
          edges += '<line x1="' + (cols[i].x + R) + '" y1="' + y1 +
                   '" x2="' + (cols[i + 1].x - R) + '" y2="' + y2 + '" class="nn-edge"/>';
        });
      });
    }

    var nodes = cols.map(function (c) {
      return c.ys.map(function (y) {
        return '<circle cx="' + c.x + '" cy="' + y + '" r="' + R + '" class="nn-node nn-' + c.kind + '"/>';
      }).join('');
    }).join('');

    var heads = s.layers.map(function (L, i) {
      return '<text x="' + cols[i].x + '" y="22" class="nn-label">' + L.label.toUpperCase() + '</text>' +
             '<text x="' + cols[i].x + '" y="318" class="nn-eg">' + L.example + '</text>';
    }).join('');

    // The literal thing going in, wired into the first column.
    var src = '';
    if (s.inputImage) {
      var iw = 132, ih = 66, ix = 20, iy = CY - ih / 2;
      var feed = cols[0].ys.map(function (y) {
        return '<line x1="' + (ix + iw) + '" y1="' + CY +
               '" x2="' + (cols[0].x - R) + '" y2="' + y + '" class="nn-edge"/>';
      }).join('');
      src = '<defs><clipPath id="nnimg"><rect x="' + ix + '" y="' + iy + '" width="' + iw +
            '" height="' + ih + '" rx="9"/></clipPath></defs>' +
            feed +
            '<image href="' + s.inputImage + '" x="' + ix + '" y="' + iy + '" width="' + iw +
            '" height="' + ih + '" preserveAspectRatio="xMidYMid slice" clip-path="url(#nnimg)"/>' +
            '<rect x="' + ix + '" y="' + iy + '" width="' + iw + '" height="' + ih +
            '" rx="9" class="nn-img-frame"/>';
    }

    return '<div class="c-head"><span class="c-n">' + s.n + '</span>' +
      '<h2 class="c-term">' + s.term + '</h2></div>' +
      '<p class="nn-script">' + s.script + '</p>' +
      '<svg class="nn" viewBox="0 0 ' + W + ' ' + H + '" role="img" ' +
      'aria-label="Layers of nodes, each wired to the next, turning raw pixels into an answer">' +
      '<g class="nn-edges">' + edges + src + '</g>' + nodes + heads + '</svg>' +
      '<p class="nn-caption">' + s.caption + '</p>';
  };

  // Two mirrored statements with opposite outcomes. The verdict words carry it.
  T.verdict = function (s) {
    return '<div class="vd-list">' + s.lines.map(function (l) {
      return '<div class="vd-line vd-' + l.tone + '">' +
        '<span class="vd-text">' + l.text + '</span>' +
        '<span class="vd-word">will ' + l.verdict + '<i>for sure</i></span>' +
        '</div>';
    }).join('') + '</div>';
  };

  T.showcase = function (s) {
    return '<div class="showcase-row">' + s.images.map(function (im) {
      return '<figure class="showcase-item" data-src="' + im.src + '">' +
        '<img src="' + im.src + '" alt="' + (im.alt || '') + '" ' +
        'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>';
    }).join('') + '</div>' +
    '<p class="showcase-text">' + s.text + '</p>';
  };

  T.meme = function (s) {
    return '<h2 class="meme-head">' + s.heading + '</h2>' +
      '<figure class="meme-frame" data-src="' + s.gif + '">' +
      '<img src="' + s.gif + '" alt="' + String(s.caption || '').replace(/<[^>]+>/g, '') + '" ' +
      'onerror="this.closest(\'figure\').classList.add(\'img-missing\')"></figure>' +
      (s.caption ? '<p class="meme-caption">' + s.caption + '</p>' : '');
  };

  T.verse = function (s) {
    return '<p class="verse-text">' + s.sanskrit + '</p>' +
      '<p class="verse-tr">&ldquo;' + s.translation + '&rdquo;</p>' +
      '<div class="verse-src">' + s.source + '</div>';
  };

  T['quote-slot'] = function (s) {
    if (s.text && s.text.trim()) {
      return '<div class="q-mark">&ldquo;</div>' +
        '<p class="q-text">' + s.text + '</p>' +
        '<p class="q-attr"><b>' + s.attribution + '</b>' +
        (s.work ? ' &middot; <span class="q-work">' + s.work + '</span>' : '') + '</p>';
    }
    return '<div class="q-empty">' +
      '<p class="q-hint">' + s.hint + '</p>' +
      '<div class="q-todo">Paste the full text into this slide&rsquo;s <code>text</code> field in js/slides.js</div>' +
      '</div>' +
      '<p class="q-attr"><b>' + s.attribution + '</b>' +
      (s.work ? ' &middot; <span class="q-work">' + s.work + '</span>' : '') + '</p>';
  };

  T.creed = function (s) {
    return '<div class="creed-list">' + s.lines.map(function (l, i) {
      return '<div class="creed-line beat" data-beat="' + i + '">' +
        '<span class="creed-k">' + l.k + '</span>' +
        '<span class="creed-v">' + l.v + '</span></div>';
    }).join('') + '</div>';
  };

  /* --- Acts 1, 5, 6, 7 -------------------------------------------------- */

  T.timeline = function (s) {
    return '<h2 class="tl-head">' + s.heading + '</h2>' +
      '<div class="tl-track">' + s.nodes.map(function (n) {
        return '<div class="tl-node"><div class="tl-dot"></div>' +
          '<div class="tl-label">' + n.label + '</div>' +
          '<div class="tl-sub">' + n.sub + '</div></div>';
      }).join('') + '</div>' + punchline(s);
  };

  T.split = function (s) {
    return '<h2 class="sp-head">' + s.heading + '</h2>' +
      '<div class="sp-row">' + [s.left, s.right].map(function (c) {
        return '<div class="sp-col"><div class="sp-label">' + c.label + '</div>' +
          '<ul>' + c.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>' + punchline(s) + meme(s);
  };

  T['two-col'] = function (s) {
    return '<h2 class="tc-head">' + s.heading + '</h2>' +
      '<div class="tc-row">' + [s.left, s.right].map(function (c) {
        return '<div class="tc-col tone-' + c.tone + '"><div class="tc-label">' + c.label + '</div>' +
          '<ul>' + c.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul></div>';
      }).join('') + '</div>' + punchline(s) + meme(s);
  };

  T.pyramid = function (s) {
    var pyr = [60, 130, 210, 300, 380];
    var dia = [130, 250, 320, 250, 130];
    function shape(widths, cls, cap) {
      return '<div class="py-shape ' + cls + '">' +
        widths.map(function (w) { return '<b style="width:' + w + 'px"></b>'; }).join('') +
        '<div class="py-caption">' + cap + '</div></div>';
    }
    return '<h2 class="py-head">' + s.heading + '</h2>' +
      '<p class="py-sub">' + s.sub + '</p>' +
      '<div class="py-row">' + shape(pyr, 'py-pyramid', 'Then') +
      '<div class="py-arrow">&rarr;</div>' +
      shape(dia, 'py-diamond', 'Now') + '</div>' + punchline(s);
  };

  T.skills = function (s) {
    return '<h2 class="sk-head">' + s.heading + '</h2>' +
      '<div class="sk-grid">' + s.items.map(function (it) {
        return '<div class="sk-item"><div class="sk-name">' + it.name + '</div>' +
          '<div class="sk-detail">' + it.detail + '</div></div>';
      }).join('') + '</div>' + punchline(s) + footnote(s);
  };

  // "Human or AI?" — one piece of media, two hands-up options.
  T.vote = function (s) {
    var e = s.embed || {}, media = '';
    if (e.kind === 'iframe') {
      media = '<div class="vote-frame" style="width:' + e.w + 'px;height:' + e.h + 'px">' +
        '<iframe src="' + e.src + '" width="' + e.w + '" height="' + e.h + '" ' +
        'frameborder="0" allowfullscreen allow="clipboard-write" ' +
        'referrerpolicy="strict-origin-when-cross-origin" loading="lazy" ' +
        'title="' + (e.title || 'Embedded work') + '"></iframe>' +
        (e.host ? '<span class="vote-host">needs wifi &middot; ' + e.host + '</span>' : '') +
        '</div>';
    } else if (e.kind === 'audio') {
      media = '<div class="vote-audio">' +
        '<div class="va-title">' + (e.title || '') + '</div>' +
        '<audio controls preload="metadata" src="' + encodeURI(e.src) + '"></audio>' +
        '</div>';
    }
    return '<span class="ac-label">' + s.label + '</span>' +
      '<h2 class="vote-head">' + s.heading + '</h2>' +
      '<div class="vote-body">' + media +
      '<div class="vote-choices">' +
      '<span class="vc vc-human">Human</span>' +
      '<span class="vc-or">or</span>' +
      '<span class="vc vc-ai">AI</span>' +
      '</div></div>' +
      (s.instruction ? '<p class="ac-instruction">' + s.instruction + '</p>' : '');
  };

  T.activity = function (s) {
    // `options` are alternatives shown together; `steps` are an ordered
    // sequence revealed one at a time.
    if (s.options) {
      return '<span class="ac-label">' + s.label + '</span>' +
        '<h2 class="ac-head">' + s.heading + '</h2>' +
        '<div class="ac-options">' + s.options.map(function (o, i) {
          var last = i === s.options.length - 1;
          return '<span class="ac-opt' + (last ? ' is-last' : '') + '">' + o + '</span>';
        }).join('') + '</div>' +
        (s.instruction ? '<p class="ac-instruction">' + s.instruction + '</p>' : '');
    }
    return '<span class="ac-label">' + s.label + '</span>' +
      '<h2 class="ac-head">' + s.heading + '</h2>' +
      '<ol class="ac-steps">' + s.steps.map(function (st, i) {
        return '<li class="beat" data-beat="' + i + '">' + st + '</li>';
      }).join('') + '</ol>' +
      (s.instruction ? '<p class="ac-instruction">' + s.instruction + '</p>' : '') +
      punchline(s);
  };

  T.challenge = function (s) {
    return kicker(s) + '<h2 class="ch-text">' + s.text + '</h2>' +
      '<div class="ch-steps">' + s.steps.map(function (st, i) {
        return '<div class="ch-step beat" data-beat="' + i + '"><i>0' + (i + 1) + '</i>' + st + '</div>';
      }).join('') + '</div>';
  };

  T.close = function (s) {
    return '<h2 class="cl-takeaway">' + s.takeaway + '</h2>' +
      '<p class="cl-cta">' + s.cta + '</p>' +
      '<div class="cl-row"><div class="cl-handles">' + s.handles.map(function (h) {
        var name = h.url
          ? '<a class="cl-name" href="' + h.url + '" target="_blank" rel="noopener">' + h.handle + '</a>'
          : '<span class="cl-name">' + h.handle + '</span>';
        return '<div class="cl-handle"><span class="cl-platform">' + h.platform + '</span>' + name + '</div>';
      }).join('') + '</div></div>';
  };

  T.ama = function (s) {
    return '<h2 class="ama-head">' + s.heading + '</h2>' +
      '<p class="ama-sub">' + s.sub + '</p>' +
      '<div class="ama-qr">' + qrBlock(M.questionBoardUrl, 'Question board', boardImg()) + '</div>';
  };

  /* --- "define" box can decorate any statement slide -------------------- */
  var baseStatement = T.statement;
  T.statement = function (s) {
    var html = baseStatement(s);
    if (s.define) {
      html += '<div class="footnote" style="margin-top:30px">' +
        '<strong>' + s.define.term + '</strong><br>' + s.define.body + '</div>';
    }
    return html;
  };

  /* ===================================================================== */

  window.RENDER = {
    html: function (s, ctx) {
      var fn = T[s.type];
      // A missing renderer must never blank a slide mid-talk. Fall back to the
      // slide's own words so it stays presentable, and log for debugging.
      if (!fn) {
        if (window.console) console.warn('No renderer for slide type "' + s.type + '" — using fallback.');
        fn = T._fallback;
      }
      return bgLayer(s) + fn(s, ctx) + aside(s) + cornerQr(s);
    },
    classes: function (s) {
      var c = ['slide', 's-' + s.type, 'act-' + s.act];
      if (s.size) c.push('size-' + s.size);
      if (s.mood) c.push('mood-' + s.mood);
      if (s.boy) c.push('boy-' + s.boy);
      if (s.highlight) c.push('is-highlight');
      if (s.image && (s.type === 'hook' || s.type === 'boy' || s.type === 'concept')) c.push('has-image');
      if (s.imageStyle === 'screenshot') c.push('has-screenshot');
      if (s.panels && s.panels.length) c.push('has-panels');
      if (s.longScript) c.push('has-long-script');
      if (s.wideImage) c.push('has-wide-image');
      if (s.bg) c.push('has-bg');
      if (s.images && s.images.length) c.push('has-gallery');
      if (s.tiles && s.tiles.length) c.push('has-tiles');
      if (s.side) c.push('side-' + s.side);
      if (s.aside) c.push('has-aside');
      if (s.last) c.push('is-last');
      if (s.type === 'activity' && s.steps && s.steps.length === 1) c.push('single');
      return c.join(' ');
    },
    // Plain-text summary for the overview grid and presenter view.
    summary: function (s) {
      var t = s.text || s.heading || s.term || s.title || s.takeaway || s.tierHeading || '';
      if (!t && s.type === 'act-divider') t = 'Act ' + s.act + ' — ' + actName(s.act);
      if (!t && s.type === 'verse') t = s.translation;
      if (!t && s.type === 'quote-slot') t = s.attribution;
      if (!t && s.type === 'toc') t = s.heading;
      if (s.type === 'meme') t = s.heading + ' — ' + (s.caption || '');
      if (!t && s.type === 'creed') t = s.lines.map(function (l) { return l.k; }).join(' · ');
      return String(t).replace(/<[^>]+>/g, '').replace(/&[a-z]+;/g, ' ').trim();
    },
    actName: actName
  };
})();
