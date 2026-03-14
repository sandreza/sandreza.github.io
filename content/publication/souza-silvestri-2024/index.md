---
title: 'A modified bisecting K-means for approximating transfer operators'
authors:
  - A. N. Souza
  - S. Silvestri

date: '2026-01-01T00:00:00Z'
doi: 'https://doi.org/10.1016/j.physd.2026.135173'

# Schedule page publish date (NOT publication's date).
publishDate: '2026-01-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: 'Physica D: Nonlinear Phenomena'
publication_short: 'Physica D'

abstract: We investigate the convergence behavior of data-driven discretizations of the Perron-Frobenius operator for chaotic systems using a hierarchical partitioning approach based on a modified bisecting K-means algorithm. The operator is constructed using an Ulam-like method with piecewise constant basis functions defined on data-informed Voronoi-like cells. We examine how the resulting operator approximates the invariant measure, Koopman eigenfunctions, and temporal autocorrelations as the number of partitions increases, applying the method to both the Lorenz system and the Kuramoto-Sivashinsky equations. Our results show first-order convergence for steady-state statistics in the Lorenz system and quarter-order convergence for the higher-dimensional Kuramoto-Sivashinsky system. The hierarchical algorithm achieves improved statistical consistency by maintaining uniform sampling across clusters, which results in improved statistical sampling of the overall operator. For the Kuramoto-Sivashinsky equations, we demonstrate that the purely irreversible component of the operator provides superior approximation of temporal autocorrelations at high resolution. These findings clarify how transfer operator estimates behave under refinement for chaotic systems across different dimensional regimes.

# Summary. An optional shortened abstract.
summary: 

tags:
  - Bisecting K-Means
  - Transfer Operators
  - Lorenz Equations
  - Dynamic Mode Decomposition
  - Chaotic Dynamics
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/bisecting.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.1016/j.physd.2026.135173'
url_project: ''
url_slides: ''
url_source: 'https://www.sciencedirect.com/science/article/pii/S0167278926000710'
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/ocean)'
  focal_point: ''
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides:
---
