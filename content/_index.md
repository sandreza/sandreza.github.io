---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing
layout: portfolio

sections:
  - block: hero
    content:
      title: |
        Andre Souza
      image:
        filename: eel_pond.jpg
      text: |
        <br>
        
        I am a scientific machine learning and AI Physics engineer working across industrial simulation, surrogate modeling, generative AI, uncertainty quantification, and GPU/HPC computing.

  - block: collection
    content:
      title: Published Research
      text: ""
      count: 5
      filters:
        folders:
          - publication
        publication_type: 'article-journal'
    design:
      view: citation
      columns: '1'

  - block: collection
    content:
      title: Current Preprints
      text: "Active manuscripts are shown separately from peer-reviewed publications."
      count: 6
      filters:
        folders:
          - publication
        publication_type: 'preprint'
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
        {{% cta cta_link="./publication/" cta_text="View all publications →" %}}
    design:
      columns: '1'
---
