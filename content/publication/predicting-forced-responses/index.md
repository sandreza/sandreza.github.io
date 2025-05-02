---
title: 'Predicting Forced Responses of Probability Distributions via the Fluctuation-Dissipation Theorem and Generative Modeling'
authors:
  - L. T. Giorgini
  - F. Falasca
  - A. N. Souza

date: '2025-04-20T00:00:00Z'
doi: 'https://arxiv.org/abs/2504.13333'

# Schedule page publish date (NOT publication's date).
publishDate: '2025-04-20T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ["article"]

# Publication name and optional abbreviated publication name.
publication: '*arXiv*'
publication_short: ''

abstract: We present a novel data-driven framework for estimating the response of higher-order moments of nonlinear stochastic systems to small external perturbations. The classical Generalized Fluctuation-Dissipation Theorem (GFDT) links the unperturbed steady-state distribution to the system's linear response. Standard implementations rely on Gaussian approximations, which can often accurately predict the mean response but usually introduce significant biases in higher-order moments, such as variance, skewness, and kurtosis. To address this limitation, we combine GFDT with recent advances in score-based generative modeling, which enable direct estimation of the score function from data without requiring full density reconstruction. Our method is validated on three reduced-order stochastic models relevant to climate dynamics: a scalar stochastic model for low-frequency climate variability, a slow-fast triad model mimicking key features of the El Nino-Southern Oscillation (ENSO), and a six-dimensional stochastic barotropic model capturing atmospheric regime transitions. In all cases, the approach captures strongly nonlinear and non-Gaussian features of the system's response, outperforming traditional Gaussian approximations.

# Summary. An optional shortened abstract.
summary: 

tags:
  - Fluctuation-Dissipation Theorem
  - Generative Modeling
  - Probability Distributions
  - Machine Learning
  - Preprint
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/higher_response.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://arxiv.org/abs/2504.13333'
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