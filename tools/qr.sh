#!/usr/bin/env bash
# Regenerate both QR codes after you edit the URLs in js/slides.js.
# Usage:  ./tools/qr.sh "<question-board-url>" "<links-url>"
set -euo pipefail
cd "$(dirname "$0")/.."
QUESTIONS="${1:?pass the question-board URL as arg 1}"
LINKS="${2:?pass your links URL as arg 2}"
swift tools/make-qr.swift "$QUESTIONS" assets/img/qr-questions.png 14
swift tools/make-qr.swift "$LINKS"     assets/img/qr-links.png 14
echo
echo "Now update meta.questionBoardUrl and meta.linksUrl in js/slides.js to match."
