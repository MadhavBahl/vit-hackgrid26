#!/usr/bin/env python3
"""Dev server for the deck.

Identical to `python3 -m http.server` except it tells the browser never to
cache. Plain http.server sends no Cache-Control at all, which lets Chrome
heuristically cache slides.js and serve you a stale deck after an edit.

    ./tools/serve.py [port]        # default 8000
"""
import functools, os, sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass  # quiet


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    handler = functools.partial(NoCacheHandler, directory=root)
    print("Serving %s\n  http://127.0.0.1:%d/index.html" % (root, port), flush=True)
    ThreadingHTTPServer(("127.0.0.1", port), handler).serve_forever()
