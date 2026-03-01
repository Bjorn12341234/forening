---
title: 'Kontakta oss'
subtitle: 'Vi blir jätteglada om du vill höra av dig!'
contact_image: '/user/themes/naturhansyn/images/content/email-blocks.jpeg'
metadata:
  description: 'Kontakta Föreningen NaturHänsyn. Har du frågor om medlemskap, tips om naturvård eller oro för hotade naturmiljöer? Hör av dig!'
form:
  name: kontaktformular
  action: /kontakta-oss
  fields:
    - name: name
      label: Namn
      type: text
      autocomplete: name
      validate:
        required: true
    - name: email
      label: E-post
      type: email
      autocomplete: email
      validate:
        required: true
    - name: subject
      label: Ämne
      type: text
    - name: message
      label: Meddelande
      type: textarea
      rows: 6
      validate:
        required: true
    - name: honeypot
      type: honeypot
  buttons:
    - type: submit
      value: Skicka meddelande
      classes: btn btn--primary
  process:
    - email:
        subject: "[NaturHänsyn] Nytt meddelande från {{ form.value.name|e }}"
        body: "{% include 'forms/data.html.twig' %}"
    - save:
        fileprefix: kontakt-
        dateformat: Ymd-His
        extension: txt
        body: "{% include 'forms/data.txt.twig' %}"
    - message: 'Tack för ditt meddelande! Vi återkommer så snart vi kan.'
---

Hör gärna av dig om du har:

- Frågor om medlemskap eller föreningsarbete
- Tips om samarbetspartners eller intressanta kurser
- Oro för hotade naturmiljöer i din närhet

Kontakta oss gärna!
