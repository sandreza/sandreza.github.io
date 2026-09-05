---
title: 'An EOF-Based Emulator of Means and Covariances of Monthly Climate Fields'
authors:
  - G. Geogdzhayev
  - A. N. Souza
  - R. Ferrari
  - G. R. Flierl

date: '2026-01-01T00:00:00Z'
doi: "10.5194/esd-17-235-2026"

# Schedule page publish date (NOT publication's date).
publishDate: '2026-01-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['article-journal']

# Publication name and optional abbreviated publication name.
publication: 'Earth System Dynamics'
publication_short: 'Earth Syst. Dynam.'

abstract: This published article introduces a statistical emulator designed to represent averaged climate fields. The emulator aims to efficiently replicate climate model outputs, enabling faster computations while preserving accuracy in climate predictions. The method is particularly useful for scenarios where detailed climate simulations are computationally expensive. This work demonstrates the emulator's effectiveness and provides a foundation for future improvements in climate modeling and statistical representation.

# Summary. An optional shortened abstract.
summary: >-
  This paper introduces a fast emulator for the means and covariances of spatially resolved monthly climate fields.
  It projects climate-model output onto empirical orthogonal functions and learns how the reduced statistics depend on global mean surface temperature.
  Transforming back to physical space allows the emulator to estimate changes in regional averages and their variability.
  Examples with surface temperature and relative humidity show how it can generate inexpensive projections for warming scenarios absent from training.
  Readers get an interpretable approach to emulating spatial climate uncertainty, including the assumptions that come with a reduced basis and a global-temperature predictor.

tags:
  - Statistical Emulator
  - Climate Modeling
  - Monthly Climate Fields
  - EOF
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: '/files/gosha_statistical_emulator.pdf'
url_code: ''
url_dataset: ''
url_DOI: 'https://doi.org/10.5194/esd-17-235-2026'
url_project: ''
url_slides: ''
url_source: 'https://esd.copernicus.org/articles/17/235/2026/'
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
