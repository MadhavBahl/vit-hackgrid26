# Images

## Already here
- `madhav-now.png` / `madhav-now-zoom.png` — your headshot. `madhav-now.png` is used
  for the Act 0 reveal (slide 12).
- `qr-questions.png`, `qr-links.png` — generated. Regenerate after changing a URL:
  `./tools/qr.sh "<question-board-url>" "<links-url>"`

## Optional — drop these in and they appear automatically

_Nothing outstanding right now._
Any image the deck can't find shows a dashed "Drop <path> here" slot instead of
breaking, so nothing looks wrong if you skip them.


## Act 0 — the twist
Slides 3–11 deliberately show **no photo**, so the room can't tell the two boys
are the same person until slide 12. If you want a "before" photo on the boy-1
slides, add `image: 'assets/img/madhav-before.jpg'` to those slides in
`js/slides.js` — but only if it genuinely doesn't give the reveal away.

## Memes
Meme suggestions from the outline live in each slide's `meme:` field. They show
in presenter view (press S or P) rather than on the projector, so you can decide
per-slide whether to add the actual image.
