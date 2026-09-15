#!/usr/bin/env bash
# Downloads the webfonts into assets/fonts/ so the deck works with no network
# at the venue. Safe to skip — the deck falls back to system fonts.
#
# Google serves one @font-face per unicode subset, so we pick the block whose
# unicode-range actually covers the characters we use (latin, or devanagari).
set -uo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/fonts
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36'

grab() { # grab <css-url> <output-name> <marker-codepoint>
  local css
  css=$(curl -sS -A "$UA" --max-time 25 "$1") || { echo "  ! fetch failed: $2"; return 1; }
  printf '%s' "$css" | UA="$UA" OUT="assets/fonts/$2" MARK="$3" python3 -c '
import os, re, sys, subprocess
css  = sys.stdin.read()
mark = int(os.environ["MARK"], 16)
out  = os.environ["OUT"]

def covers(rng):
    for part in rng.split(","):
        part = part.strip().replace("U+", "")
        if "-" in part:
            a, b = part.split("-")
            if int(a, 16) <= mark <= int(b, 16): return True
        elif part:
            # a wildcard range like 4??
            if "?" in part:
                a = int(part.replace("?", "0"), 16); b = int(part.replace("?", "F"), 16)
                if a <= mark <= b: return True
            elif int(part, 16) == mark: return True
    return False

blocks = css.split("@font-face")
pick = None
for b in blocks:
    m = re.search(r"url\((https://fonts\.gstatic\.com[^)]+\.woff2)\)", b)
    if not m: continue
    r = re.search(r"unicode-range:\s*([^;]+);", b)
    if r is None or covers(r.group(1)):
        pick = m.group(1); break
if not pick:
    print("  ! no subset covering U+%04X" % mark); sys.exit(1)
subprocess.run(["curl","-sS","-A",os.environ["UA"],"--max-time","25","-o",out,pick], check=True)
print("  ok  %s (%d bytes)" % (os.path.basename(out), os.path.getsize(out)))
'
}

echo "Fetching fonts…"
grab 'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap'            inter-variable.woff2         0041
grab 'https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap'               instrument-serif.woff2       0041
grab 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap'        instrument-serif-italic.woff2 0041
grab 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400..600&display=swap'   jetbrains-mono.woff2         0041
grab 'https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400..700&display=swap' noto-serif-devanagari.woff2 0915
echo "Done. Reload the deck."
