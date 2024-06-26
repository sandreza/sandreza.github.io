---
title: 'The Flux-Differencing Discontinuous Galerkin Method Applied to an Idealized Fully Compressible Nonhydrostatic Dry Atmosphere'
authors:
  - A. N. Souza
  - J. He
  - T. Bischoff
  - M. Waruszewski
  - L. Novak
  - V. Barra
  - T. Gibson
  - A. Sridhar
  - S. Kandala
  - S. Byrne
  - L. C. Wilcox
  - J. Kozdon
  - F. X. Giraldo
  - O. Knoth
  - J. Marshall
  - R. Ferrari
  - T. Schneider

date: '2023-01-01T00:00:00Z'
doi: 'https://doi.org/10.1029/2022MS003527'

# Schedule page publish date (NOT publication's date).
publishDate: '2023-01-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: '*Journal of Advances in Modeling Earth Systems, 15, e2022MS003527*'
publication_short: ''

abstract: Dynamical cores used to study the circulation of the atmosphere employ various numerical methods ranging from finite-volume, spectral element, global spectral, and hybrid methods. In this work, we explore the use of Flux-Differencing Discontinuous Galerkin (FDDG) methods to simulate a fully compressible dry atmosphere at various resolutions. We show that the method offers a judicious compromise between high-order accuracy and stability for large-eddy simulations and simulations of the atmospheric general circulation. In particular, filters, divergence damping, diffusion, hyperdiffusion, or sponge-layers are not required to ensure stability; only the numerical dissipation naturally afforded by FDDG is necessary. We apply the method to the simulation of dry convection in an atmospheric boundary layer and in a global atmospheric dynamical core in the standard benchmark of Held and Suarez.

# Summary. An optional shortened abstract.
summary: 

tags:
  - Atmospheric Dynamics
  - Numerical Modeling
  - Atmospheric Sciences
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/flux-differencing.pdf'
url_code: 'https://github.com/sandreza/DryAtmosphereFluxDifferencingVisualization'
url_dataset: ''
url_DOI: 'https://doi.org/10.1029/2022MS003527'
url_project: ''
url_slides: ''
url_source: ''
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
