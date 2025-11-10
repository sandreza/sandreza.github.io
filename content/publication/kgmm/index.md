---
title: 'KGMM: A K-means Clustering Approach to Gaussian Mixture Modeling for Score Function Estimation'
authors:
  - L. T. Giorgini
  - T. Bischoff
  - A. N. Souza

date: '2025-03-26T00:00:00Z'
doi: 'https://doi.org/10.48550/arXiv.2503.18054'

# Schedule page publish date (NOT publication's date).
publishDate: '2025-03-26T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["article"]

# Publication name and optional abbreviated publication name.
publication: '*arXiv preprint arXiv:2503.18054*'
publication_short: ''

abstract: We propose a hybrid method for accurately estimating the score function -- the gradient of the logarithm of a system's steady-state probability density function -- using Gaussian Mixture Model (GMM) in conjunction with a bisecting K-means clustering step. Our approach, which we call KGMM, offers a systematic way to combine statistical density estimation with a neural-network-based interpolation of the score, leveraging the strengths of both. We demonstrate its ability to accurately reconstruct the long-time statistical properties of several paradigmatic systems, including lower-dimensional potential systems and chaotic Lorenz-type models. Numerical experiments show that KGMM yields robust estimates of the score function, even for small values of the covariance amplitude in the GMM, where the standard GMM methods tend to fail because of noise amplification. These accurate estimates allow us to build effective stochastic reduced-order models that reproduce the invariant measures of the target dynamics.

# Summary. An optional shortened abstract.
summary: 

tags:
  - K-means Clustering
  - Gaussian Mixture Models
  - Score Function Estimation
  - Machine Learning
  - Preprint
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/kgmm.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.48550/arXiv.2503.18054'
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
image:
  caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/mathematics)'
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