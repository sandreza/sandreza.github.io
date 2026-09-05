---
title: 'NORi: An ML-Augmented Ocean Boundary Layer Parameterization'
authors:
  - X. K. Lee
  - A. Ramadhan
  - A. Souza
  - G. L. Wagner
  - S. Silvestri
  - J. Marshall
  - R. Ferrari

date: '2026-09-02T00:00:00Z'
doi: "10.1029/2025MS005667"

# Schedule page publish date (NOT publication's date).
publishDate: '2025-12-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: '*Journal of Advances in Modeling Earth Systems*, 18(9), e2025MS005667'
publication_short: 'JAMES'

abstract: "NORi is a machine learning (ML) parameterization of ocean boundary layer (BL) turbulence that is physics‐based and augmented with neural networks. NORi stands for neural ordinary differential equations Richardson number (Ri) closure. The physical parameterization is controlled by a Richardson number‐dependent diffusivity and viscosity. The neural ODEs are trained to capture the entrainment through the base of the BL, which cannot be represented with a local diffusive closure. The parameterization is trained using large‐eddy simulations in an a posteriori fashion, where parameters are calibrated with a loss function that explicitly depends on the actual time‐integrated variables of interest rather than the instantaneous subgrid fluxes, which are inherently noisy. NORi conserves tracers by design, uses realistic nonlinear thermodynamics, and demonstrates excellent prediction and generalization capabilities in capturing entrainment dynamics under different convective strengths, background stratifications, rotation, and wind forcings. NORi is shown to simulate the seasonal evolution of the BL at Ocean Weather Station Papa with similar performance to the state‐of‐the‐art two-equation k-epsilon closure. When implemented in a double‐gyre simulation, it is numerically stable for at least 100 years, despite only being trained on 2‐day horizons, and can be run with time steps as long as 1 hr. Combining highly expressive neural networks with a physically grounded base closure proves to be a robust paradigm for designing parameterizations for climate models: data required and training cost are drastically reduced, inference performance can be directly optimized as a primary objective, and numerical stability is implicitly promoted through training."

# Summary. An optional shortened abstract.
summary: >-
  NORi combines a physics-based ocean boundary-layer mixing scheme with neural networks that learn the entrainment missing from a local diffusive closure.
  It trains against the evolution of temperature and salinity in large-eddy simulations while conserving tracers by construction.
  Tests examine unfamiliar forcing conditions and seasonal mixing at Ocean Weather Station Papa, where performance is comparable to established closures.
  An idealized double-gyre experiment remains numerically stable for 100 years despite training on two-day trajectories, although this does not establish accuracy in a realistic global ocean.
  Readers get a detailed example of designing, training, and evaluating a hybrid physics-and-ML parameterization that targets missing processes while retaining a simple physical foundation.

tags:
  - Ocean Modeling
  - Machine Learning
  - Boundary Layer
  - Parameterization
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/nori.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.1029/2025MS005667'
url_project: ''
url_slides: ''
url_source: 'https://arxiv.org/abs/2512.04452'
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: ''
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
