---
title: 'A Generative AI Framework for Inferring Consistent Ocean Statistics at Depth Using Sea Surface Data'
authors:
  - A. N. Souza
  - S. Silvestri
  - K. Deck
  - T. Bischoff
  - G. R. Flierl
  - R. Ferrari

date: '2026-09-25T00:00:00Z'
doi: "10.1175/JPO-D-25-0093.1"

# Schedule page publish date (NOT publication's date).
publishDate: '2025-04-29T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: '*Journal of Physical Oceanography*, early online release (25 September 2026)'
publication_short: ''

abstract: "Understanding subsurface ocean dynamics is essential for quantifying oceanic heat and mass transport, but direct observations at depth remain sparse due to logistical and technological constraints. In contrast, satellite missions provide rich surface datasets—such as sea surface height, temperature, and salinity—that offer indirect but potentially powerful constraints on the ocean interior. Here, we present a probabilistic framework based on score-based diffusion models to reconstruct three-dimensional subsurface velocity and buoyancy fields, including the energetic ocean eddy field, from surface observations. Using a 15-level primitive equation simulation of an idealized double-gyre system, we evaluate the skill of the model in inferring the mean circulation and the mesoscale variability at depth under varying levels of surface information. We find that the generative model successfully recovers key dynamical structures and provides physically meaningful uncertainty estimates, with predictive skill diminishing systematically as the surface resolution decreases or the inference depth increases. These results demonstrate the potential of generative approaches for ocean state estimation and uncertainty quantification, particularly in regimes where traditional deterministic methods are underconstrained or ill-posed."

# Summary. An optional shortened abstract.
summary: >-
  This paper explores how observations of the ocean surface can constrain currents and buoyancy deep below it.
  A score-based diffusion model generates three-dimensional interior states conditioned on surface information.
  The method is evaluated in an idealized double-gyre simulation with 15 vertical levels, testing both mean circulation and mesoscale variability.
  Its reconstructions include uncertainty estimates, with skill decreasing as observations become coarser or the target depth increases.
  Readers get a probabilistic approach to an underdetermined ocean-observation problem and a controlled demonstration of its potential before application to real-world observations.

tags:
  - Generative AI
  - Ocean Interior Inference
  - Diffusion Models
  - Score-Based Learning
  - Oceanography
featured: false

links:
  - name: "arXiv preprint (Surface to Seafloor)"
    url: https://arxiv.org/abs/2504.15308
url_pdf: '/files/s2s.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.1175/JPO-D-25-0093.1'
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

The PDF linked here is the earlier arXiv manuscript, titled *Surface to Seafloor*. The final proofed journal PDF is not yet available.
