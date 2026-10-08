#!/usr/bin/env python3
"""Check built local links, including React's data, against case-sensitive Git paths.

Run after Hugo: python3 scripts/check-site-links.py [public-directory]
No network or third-party packages are required.
"""
import json
from html.parser import HTMLParser
from pathlib import Path
import subprocess
import sys
from urllib.parse import unquote, urljoin, urlsplit

root = Path(__file__).resolve().parents[1]
public = Path(sys.argv[1]) if len(sys.argv) > 1 else root / 'public'
tracked = subprocess.check_output(['git', 'ls-files', '-z', 'static'], cwd=root).decode().split('\0')
static_paths = {'/' + p.removeprefix('static/') for p in tracked if p}
static_lower = {p.lower(): p for p in static_paths}
built_paths = {'/' + p.relative_to(public).as_posix() for p in public.rglob('*') if p.is_file()}
links = set()

class Links(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.in_data = False
        self.data = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('href', 'src', 'poster', 'data-filename'):
            if attrs.get(key):
                links.add((self.path, attrs[key]))
        if tag == 'script' and attrs.get('id') == 'portfolio-data':
            self.in_data = True

    def handle_data(self, text):
        if self.in_data:
            self.data.append(text)

    def handle_endtag(self, tag):
        if tag == 'script' and self.in_data:
            self.in_data = False
            def walk(value):
                if isinstance(value, dict):
                    for child in value.values(): walk(child)
                elif isinstance(value, list):
                    for child in value: walk(child)
                elif isinstance(value, str) and value.startswith(('/', 'https://sandreza.github.io/')):
                    links.add((self.path, value))
            walk(json.loads(''.join(self.data)))
            self.data = []

html_files = list(public.rglob('*.html'))
if not html_files:
    sys.exit('No built HTML found; build the site first.')
for file in html_files:
    parser = Links('/' + file.relative_to(public).as_posix())
    parser.feed(file.read_text())

errors = {}
checked = set()
for source, href in sorted(links):
    url = urlsplit(urljoin('https://sandreza.github.io' + source, href))
    if url.scheme not in ('http', 'https') or url.hostname not in ('sandreza.github.io', 'localhost', '127.0.0.1'):
        continue
    path = unquote(url.path)
    checked.add(path)
    # Prefer Git's exact spelling to a case-insensitive or stale local build.
    if path.lower() in static_lower:
        if path not in static_paths:
            errors.setdefault(path, (source, 'Git stores ' + static_lower[path.lower()]))
        continue
    candidates = {path, path.rstrip('/') + '/index.html'}
    if not candidates.intersection(built_paths):
        errors.setdefault(path, (source, 'missing from built site'))
if errors:
    for path, (source, reason) in sorted(errors.items()):
        print(f'{path}: {reason} (linked from {source})')
    sys.exit(f'FAIL: {len(errors)} broken local targets')
print(f'PASS: {len(checked)} local targets across {len(html_files)} HTML pages and embedded portfolio data; Git filename case verified.')
