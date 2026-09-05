# Andre Souza - Personal Portfolio

Interactive portfolio for Andre Nogueira de Souza, an applied mathematician and scientific machine learning engineer working across physical simulation, generative modeling, and GPU/HPC computing.

## Public site

The published homepage is **Navigator** in the **Cobalt Aurora** palette. It presents four continuous sections with persistent, scroll-linked navigation:

- Overview
- Selected Work
- Academic Research
- Background

Public deep links remain URL-addressable, for example:

- `/?view=work&story=mclaren-gtc#psb-work`
- `/?view=papers#psb-papers`
- `/?view=background#psb-background`

Navigator keeps all four sections in one continuous page while its persistent rail follows the active section. Academic Research is searchable and organized by year; Selected Work combines research, software, and industry context in a shareable master-detail story reader.

## Publication status

Publication status is intentional and explicit:

- `publication_types: ['article-journal']` is peer-reviewed, published work.
- `publication_types: ['preprint']` is a preprint or working paper.
- The homepage displays published work and preprints in separate sections.
- The `doi` front matter field stores the DOI identifier only (for example, `10.1029/2025MS005558`) so Hugo Blox generates a valid DOI link.
- `url_DOI` stores the complete `https://doi.org/...` URL.

## Local preview

This site uses Hugo Extended 0.125.7+ and Hugo modules. Install Hugo and Go once on macOS if they are not already available:

```bash
brew install hugo go
```

Install the React dependencies:

```bash
npm install
```

Start the React bundle watcher in one terminal:

```bash
npm run watch:react
```

Then start Hugo in another terminal:

```bash
hugo server --buildFuture
```

Then open `http://localhost:1313/`.

## Key files

- `data/portfolio.yaml` - shared professional, project, and publication content
- `src/portfolio/` - the production React app, Navigator, work stories, and citation dialog
- `layouts/partials/portfolio/document.html` - the Hugo document shell and content-data bridge
- `static/css/final-shell.css` - production resets, accessibility, signature, and Lorenz shell styles
- `static/css/navigation-phase.css` - Navigator persistent navigation and phase-space visual system
- `static/js/react-portfolio.js` - generated production React browser bundle committed for GitHub Pages
- `content/publication/` - publication archive
- `static/files/andre-souza-cv.pdf` - downloadable CV

## Paper summaries and publication refresh

Each publication has a five-sentence reading guide in `data/portfolio.yaml` and
the matching archive page's `summary` field. The homepage reveals it through an
accessible native “About this paper” disclosure, preserving the compact list.
Summaries are written from the linked PDFs and describe the problem, approach,
evidence, scope, and what a reader can learn.

On September 4, 2026, NORi was moved from preprints to published articles using
the [JAMES version of record](https://doi.org/10.1029/2025MS005667): first published
September 2, 2026, volume 18, issue 9, article e2025MS005667. The publisher's
46-page PDF replaces `static/files/nori.pdf`; the homepage, archive, and BibTeX
use the journal DOI. The original arXiv link remains as the source-history link.
The other five preprints were checked against arXiv and author/lab publication
lists; no additional journal version was confirmed during this refresh.

## Periodic orbits

The Lorenz overview and Thomas, Rössler, and Chen dividers use the same vector
fields for the chaotic traces and their highlighted periodic solutions.
`src/portfolio/periodic-orbits.json` records initial conditions and periods found
by numerical shooting: solve `flow(initial, T) - initial = 0` together with a
phase condition transverse to the flow. Close returns supplied initial guesses
for shooting; the rendered highlights are integrations of the solved orbits.
No endpoint is snapped back to the starting point and no closing segment is added.

Parameters are Lorenz `(sigma, rho, beta) = (10, 28, 8/3)`, Rössler
`(a, b, c) = (0.2, 0.2, 5.7)`, Thomas `b = 0.208186`, and
[Chen and Ueta](https://doi.org/10.1142/S0218127499001024)
`(a, b, c) = (35, 3, 28)`. Periods are in each model's own time units.

Run `node scripts/check-periodic-orbits.mjs` to check the actual renderer's RK4
integration, endpoint closure, time-step refinement, and nonstationary motion.
For an independent adaptive integration and Floquet stability check, install
NumPy/SciPy and run `python3 scripts/verify-periodic-orbits.py`. All four orbits
close within `1e-7` in three-dimensional state space and have an unstable
Floquet multiplier. This is numerical verification, not a rigorous
interval-arithmetic proof of existence.
