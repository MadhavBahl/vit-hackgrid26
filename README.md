# The Last Generation to Copy-Paste Code
**HackGrid'26 — Madhav Bahl**

A 146-slide HTML presentation. No build step, no dependencies, no network needed.

---

## Run it

```bash
open index.html
```

That's it. Double-click works too. Fonts, images and QR codes are all bundled
locally, so it runs fine on venue wifi — or no wifi at all.

### While editing

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open <http://127.0.0.1:8000/index.html>. Served this way the deck
**auto-reloads** whenever you save `slides.js`, `render.js`, `deck.js`,
`deck.css` or `index.html`, and lands you back on the slide you were looking at.
That watcher only runs on localhost — it's inert when you open the file
directly on talk day.

**Before you present:** press <kbd>F</kbd> for fullscreen, then <kbd>P</kbd> to
open the presenter window and drag it to your laptop screen while the deck
stays on the projector.

---

## Keyboard

Press <kbd>?</kbd> any time for this list on screen.

| | |
|---|---|
| <kbd>→</kbd> <kbd>space</kbd> | Next beat, then next slide |
| <kbd>←</kbd> | Back |
| <kbd>0</kbd>–<kbd>7</kbd> | Jump to act |
| <kbd>O</kbd> | Overview grid — click any slide to jump |
| <kbd>P</kbd> | Presenter window (second screen) |
| <kbd>S</kbd> | Speaker-notes strip along the bottom |
| <kbd>F</kbd> | Fullscreen |
| <kbd>.</kbd> | Blackout — kills the screen while you answer a question |
| <kbd>C</kbd> | Clean mode — hides the progress bar and HUD |
| <kbd>T</kbd> / <kbd>R</kbd> | Start-stop / reset the talk timer |
| <kbd>[</kbd> <kbd>]</kbd> | Target length −/+ 5 min (default 75) |
| <kbd>X</kbd> | **Trim mode** — drops the 7 optional slides |
| <kbd>Q</kbd> | Full-screen question-board QR |
| <kbd>B</kbd> | AI Buzzword Bingo card |
| <kbd>esc</kbd> | Close anything |

Clicking the slide also advances it, and swipe works on a touchscreen.

### Trim mode
<kbd>X</kbd> skips every slide the outline flagged as lowest-priority
(Tokens, Parameters, Pre-training, Grounding, Scaling Laws, and the two
optional closers). 146 → 139 slides, roughly 4 minutes back. Toggle it live if
Act 2 is running long — your position is preserved.

---

## Editing content

**Everything you say lives in [`js/slides.js`](js/slides.js).** One object per
slide, in order. Change the text, reorder, delete, duplicate — the deck rebuilds
itself. You never need to touch HTML.

```js
{
  act: 3, type: 'statement', size: 'xl',
  kicker: 'The new resume math',
  text: 'One shipped project beats <strong class="accent">half a CGPA point.</strong>',
  sub: 'Marks got you the test. Shipping gets you the job.',
  notes: 'Shows in presenter view, never on the projector.'
}
```

- `notes` — speaker notes. Every slide has them, written from the outline.
- `meme` — a meme suggestion. Shows in presenter view only, so you can decide
  per slide whether to add the real image.
- `beats: [...]` — items revealed one arrow-press at a time.
- `cut: true` — marks a slide as droppable by trim mode.

`type` picks the layout. The 31 available layouts are the functions in
[`js/render.js`](js/render.js) — `statement`, `concept`, `rule`, `verse`,
`roadmap`, `flow`, `timeline`, `versus`, `two-col`, `pyramid`, and so on. To
restyle one, edit its section in [`css/deck.css`](css/deck.css).

### Three things to do before the talk

1. **The copyrighted passages.** Slides 91, 111 and 113 (Kalam / Dinkar /
   Peterson) render a dashed "paste the full text here" slot. Those passages are
   in your existing deck — paste each into that slide's `text:` field in
   `js/slides.js` and the slot turns into a proper quote slide.

2. **Your URLs.** Update `meta.questionBoardUrl` and `meta.linksUrl` at the top
   of `js/slides.js`, then regenerate the QR codes:
   ```bash
   ./tools/qr.sh "https://your-question-board" "https://your-links"
   ```
   Also check the four social handles on the closing slide.

3. **Act 1 timeline.** Slide 17 has placeholder companies and dates. Swap in
   your real ones.

See [`assets/img/README.md`](assets/img/README.md) for optional images. Any
image the deck can't find shows a labelled drop-in slot rather than breaking, so
nothing looks wrong if you skip them.

---

## Files

```
index.html          the deck
presenter.html      second-screen view: notes, next slide, timer, pace
js/slides.js        ← all your content, this is the one you edit
js/render.js        one function per slide layout
js/deck.js          navigation, beats, overlays, timer, presenter sync
js/livereload.js    dev-only auto-reload; inert unless served from localhost
css/deck.css        design tokens + every layout
css/fonts.css       local webfaces, with system fallbacks
assets/img/         photos + generated QR codes
assets/fonts/       bundled woff2, so it works offline
tools/qr.sh         regenerate QR codes
tools/make-qr.swift generates a QR and verifies it by decoding it back
tools/get-fonts.sh  re-download the webfonts
talk-outline.md     the source outline this was built from
```

---

## Notes

- **Fixed 1280×720 stage**, scaled to fit any screen. What you see at your desk
  is exactly what hits the projector — no reflow surprises at a different
  resolution. Every slide is verified not to overflow it.
- **Your position is remembered** in `localStorage` and mirrored to the URL hash,
  so a refresh mid-talk puts you back where you were. `index.html#74` deep-links
  to slide 74.
- **Presenter sync** uses `BroadcastChannel`. Verified working in Chrome with both
  windows opened straight from disk. Just don't mix the two — if the deck is on
  `http://localhost` the presenter window must be too.
- **Act 0 shows no photo until slide 12.** That's deliberate — it protects the
  reveal. Don't add a face to slides 3–11.
