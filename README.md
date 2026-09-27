# BrisConnect

BrisConnect is a responsive community web platform prototype designed and developed as part of university interaction-design and web coursework. This cleaned portfolio version presents the final front-end implementation as a standalone static site.

## Overview

The project explores how a civic community platform could help Brisbane residents discover local events, find practical resources and understand ways to participate in community initiatives. The portfolio version focuses on the user-facing front-end, accessibility and responsive interaction patterns.

## Key Features

- Event search, category filtering and free-only filtering
- Resource search, type filtering, local-only filtering and preview feedback
- Static Community Voices page showing how story cards are displayed
- Contribution form with client-side validation, character count, file upload interaction and accessible feedback
- Newsletter form interaction on the home page
- Responsive layouts for desktop, tablet and mobile
- Accessibility considerations including semantic landmarks, skip links, visible focus states, labelled form controls and live status updates

## My Role

This repository represents UX/UI design, front-end implementation, information architecture, content organisation and accessibility-focused implementation work completed for an academic web project. It has been cleaned for portfolio review without preserving course-submission clutter.

## Technologies

- HTML
- CSS
- JavaScript

Figma was part of the design process in earlier coursework phases, but it is not a runtime dependency of this static site.

## Accessibility

The implementation uses semantic HTML, descriptive page titles, skip links, keyboard-operable controls, labelled inputs, helpful validation messages, `aria-live` status updates for dynamic results and visible focus states. The layout is responsive and avoids root-relative paths so it can work from a GitHub Pages subdirectory.

## Project Context

BrisConnect is an academic portfolio prototype, not a live commercial service. Course-only pages, private API credentials and submission metadata were removed from this public version.

## Running Locally

From the project folder, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

A local server is recommended because `community.html` loads static JSON from the `data/` folder.

## Deployment

The project is prepared for GitHub Pages as a static site. All internal paths are relative, so the site can be deployed from a repository subdirectory such as:

```text
https://username.github.io/brisconnect/
```

## Limitations

- This is a front-end prototype, not a production service.
- Community stories are static prototype examples, not stored user submissions.
- The contribution and newsletter forms validate input and show feedback, but they do not submit to a backend or persist data.
- The original university/course API dependency was removed for public deployment.
