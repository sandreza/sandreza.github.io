---
title: "Transforming Butterflies into Graphs: Statistics of Chaotic and Turbulent Systems"
authors:
- Andre N. Souza
date: "2024-06-07T00:00:00Z"
doi: 'https://doi.org/10.48550/arXiv.2304.03362'

# Schedule page publish date (NOT publication's date).
publishDate: "2023-04-01T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article"]

# Publication name and optional abbreviated publication name.
publication: ""
publication_short: ""

abstract: We formulate a data-driven method for constructing finite volume discretizations of a dynamical system's underlying Continuity / Fokker-Planck equation. A method is employed that allows for flexibility in partitioning state space, generalizes to function spaces, applies to arbitrarily long sequences of time-series data, is robust to noise, and quantifies uncertainty with respect to finite sample effects. After applying the method, one is left with Markov states (cell centers) and a random matrix approximation to the generator. When used in tandem, they emulate the statistics of the underlying system. We apply the method to the Lorenz equations (a three-dimensional ordinary differential equation) and a modified Held-Suarez atmospheric simulation (a Flux-Differencing Discontinuous Galerkin discretization of the compressible Euler equations with gravity and rotation on a thin spherical shell). We show that a coarse discretization captures many essential statistical properties of the system, such as steady state moments, time autocorrelations, and residency times for subsets of state space.
# Summary. An optional shortened abstract.
summary: 

tags:
- Source Themes
featured: false

links:
# - name: Custom Link
#   url: https://doi.org/10.48550/arXiv.2402.01029
url_pdf: /files/butterflies.pdf
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.48550/arXiv.2304.03362'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/s9CC2SKySJM)'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects:
- internal-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: ""
---