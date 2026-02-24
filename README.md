# Personal Portfolio Website

A professional, responsive, and highly dynamic personal portfolio website built to showcase my projects, skills, and experience as a Frontend Developer.

## Overview

This project is built without heavy JavaScript frameworks (like React or Vue) to demonstrate a strong understanding of core web technologies. It features a custom-built internationalization (i18n) system, dynamic content rendering, and persistent theme switching, all managed via Vanilla JavaScript.

## Key Features

- **Custom Internationalization (i18n):** Seamlessly switches between English, Ukrainian, and Polish. The translations are fetched dynamically from a central `lang.json` file, making content updates highly maintainable.
- **Dynamic Project Rendering:** The Project Details page uses a single HTML template (`project-details.html`). It reads URL parameters to fetch and render specific project data from the JSON file, adhering to the DRY (Don't Repeat Yourself) principle.
- **Advanced Filtering & Search:** The Projects gallery includes a real-time search engine and tag-based filtering system.
- **Theme Persistence:** Includes a Light/Dark mode toggle that utilizes CSS variables and `localStorage` to remember user preferences across sessions and page reloads.
- **Fully Responsive:** Built with a mobile-first approach using Bootstrap 5, ensuring a flawless user experience across all devices.

## Tech Stack

- **HTML5:** Semantic markup for better accessibility and SEO.
- **CSS3:** Custom styling, CSS variables for theming, and smooth transitions.
- **JavaScript (ES6+):** Async/await (Fetch API) for JSON data, DOM manipulation, and local storage management.
- **Bootstrap 5:** Grid system and UI components (modals, buttons, utilities).

## Project Structure

```text
├── css/
│   └── style.css            # Custom styles and overrides
├── js/
│   └── main.js              # Core logic (theme, i18n setup)
├── lang/
│   └── lang.json            # Translation and dynamic project data
├── public/
│   ├── projects/            # Project screenshots and thumbnails
│   ├── certs/               # PDF certificates
│   └── avatar.png           # Profile image
├── index.html               # Main landing page
├── projects.html            # Projects gallery with search/filter
├── project-details.html     # Dynamic template for project details
├── certificates.html        # Certificates page
└── README.md                # Project documentation
```
