---
title: 'A New WENO-Based Momentum Advection Scheme for Simulations of Ocean Mesoscale Turbulence'
authors:
  - S. Silvestri
  - G. L. Wagner
  - J. M. Campin
  - N. C. Constantinou
  - C. N. Hill
  - A. Souza
  - R. Ferrari

date: '2024-01-01T00:00:00Z'
doi: 'https://doi.org/10.1029/2023MS004130'

# Schedule page publish date (NOT publication's date).
publishDate: '2024-06-06T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: '*Journal of Advances in Modeling Earth Systems, 16(7), e2023MS004130*'
publication_short: ''

abstract: Current eddy-permitting and eddy-resolving ocean models require dissipation to prevent a spurious accumulation of enstrophy at the grid scale. We introduce a new numerical scheme for momentum advection in large-scale ocean models that involves upwinding through a weighted essentially non-oscillatory (WENO) reconstruction. The new scheme provides implicit dissipation and thereby avoids the need for an additional explicit dissipation that may require calibration of unknown parameters. This approach uses the rotational, vector invariant formulation of the momentum advection operator that is widely employed by global general circulation models. A novel formulation of the WENO smoothness indicators is key for avoiding excessive numerical dissipation of kinetic energy and enstrophy at grid-resolved scales. We test the new advection scheme against a standard approach that combines explicit dissipation with a dispersive discretization of the rotational advection operator in two scenarios: (a) two-dimensional turbulence and (b) three-dimensional baroclinic equilibration. In both cases, the solutions are stable, free from dispersive artifacts, and achieve increased effective resolution compared to other approaches commonly used in ocean models. 

# Summary. An optional shortened abstract.
summary: 

tags:
  - Numerical Modeling
  - Mesoscale Ocean Turbulence
  - Eddy-Permitting Simulations
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/oceananigans_weno.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.1029/2023MS004130'
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

