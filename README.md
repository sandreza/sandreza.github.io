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
