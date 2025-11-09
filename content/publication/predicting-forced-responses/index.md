---
title: 'Predicting Forced Responses of Probability Distributions via the Fluctuation-Dissipation Theorem and Generative Modeling'
authors:
  - L. T. Giorgini
  - F. Falasca
  - A. N. Souza

date: '2025-04-20T00:00:00Z'
doi: 'https://doi.org/10.1073/pnas.2509578122'

# Schedule page publish date (NOT publication's date).
publishDate: '2025-04-20T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: 'Proceedings of the National Academy of Sciences'
publication_short: 'PNAS'

abstract: >
  We present a flexible data-driven framework for estimating the response of higher-order moments of nonlinear stochastic systems to small external perturbations. The classical generalized fluctuation–dissipation theorem (GFDT) links the unperturbed steady-state distribution to the system’s linear response. While standard implementations relying on Gaussian approximations can predict the mean response, they often fail to capture changes in higher-order moments. To overcome this, we combine GFDT with score-based generative modeling to estimate the system’s score function directly from data. We demonstrate the framework’s versatility by employing two complementary score estimation techniques tailored to the system’s characteristics: i) a clustering-based algorithm (K-means Gaussian Mixture Modeling) for systems with low-dimensional effective dynamics, and ii) a denoising score matching method implemented with a U-Net architecture for high-dimensional, spatially extended systems where reduced-order modeling is not feasible. Our method is validated on several stochastic models relevant to climate dynamics: three reduced-order models of increasing complexity and a 2D Navier–Stokes model representing a turbulent flow with a localized perturbation. In all cases, the approach accurately captures strongly nonlinear and non-Gaussian features of the system’s response, significantly outperforming traditional Gaussian approximations.

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
url_DOI: 'https://doi.org/10.1073/pnas.2509578122'
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