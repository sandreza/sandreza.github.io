---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: hero
    content:
      title: |
        Souza Research
      image:
        filename: eel_pond.jpg
      text: |
        <br>
        
        I am an applied mathematician interested in solving challenges in modeling complex data. My research is in generative AI, scientific computing, Bayesian methods, and geophysics. [Google Scholar]

  - block: collection
    content:
      title: Latest Preprints
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article'
    design:
      view: citation
      columns: '1'

  - block: collection
    content:
      title: Latest News
      subtitle:
      text:
      count: 1
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'
      
  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Meet the team →" %}}
    design:
      columns: '1'
---

[Google Scholar]: https://scholar.google.com/citations?user=FoK_ufEAAAAJ&hl=en