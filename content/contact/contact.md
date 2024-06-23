---
# An instance of the Contact widget.
# Documentation: https://wowchemy.com/docs/page-builder/
widget: contact

# This file represents a page section.
headless: true

# Order that this section appears on the page.
weight: 10

title: Contact
subtitle:

content:
  # Contact (edit or remove options as required)

  email: sandre@mit.edu
  address:
    street: 21 Ames Street
    city: Cambridge
    region: MA
    postcode: '02142'
    country: United States
    country_code: US
  coordinates:
    latitude: '42.360431'
    longitude: '-71.089109'
  directions: Enter Green Building and take the elevators/stairs to Office 1624 on Floor 16

  autolink: true

  # Email form provider
  form:
    provider: netlify
    formspree:
      id:
    netlify:
      # Enable CAPTCHA challenge to reduce spam?
      captcha: false


design:
  columns: '1'
  
---

