---
title: 'A GPU-based ocean dynamical core for routine mesoscale-resolving climate simulations'
authors:
  - S. Silvestri
  - G. L. Wagner
  - N. C. Constantinou
  - C. N. Hill
  - J.-M. Campin
  - A. N. Souza
  - S. Bishnu
  - V. Churavy
  - J. C. Marshall
  - R. Ferrari

date: '2024-05-01T00:00:00Z'
doi: 'https://doi.org/10.22541/essoar.171708158.82342448/v1'

# Schedule page publish date (NOT publication's date).
publishDate: '2024-05-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: '*JAMES*'
publication_short: ''

abstract: We describe an ocean hydrostatic dynamical core implemented in Oceananigans optimized for Graphical Processing Unit (GPU) architectures. On 64 A100 GPUs, equivalent to 16 computational nodes in current state-of-the-art supercomputers, our dynamical core can simulate a decade of near-global ocean dynamics per wall-clock day at an 8-km horizontal resolution; a resolution adequate to resolve the ocean's mesoscale eddy field. Such efficiency, achieved with relatively modest hardware resources, suggests that climate simulations on GPUs can incorporate fully eddy-resolving ocean models. This removes a major source of systematic bias in current IPCC coupled model projections, the parameterization of ocean eddies, and represents a major advance in climate modeling. We discuss the computational strategies, focusing on GPU-specific optimization and numerical implementation details that enable such high performance.

# Summary. An optional shortened abstract.
summary: 

tags:
  - GPU-based Ocean Core
  - Mesoscale-resolving Simulations
  - Climate Modeling
  - Preprint
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/mesoscale_for_all.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.22541/essoar.171708158.82342448/v1'
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
