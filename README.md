# Frontend Developer Portfolio

[Live Demo](https://nishiyuuu.github.io/Portfolio/)

A high-performance, fully responsive, and multilingual personal portfolio website. Designed to showcase projects, technical skills, and professional experience, this project is built entirely with Vanilla JavaScript and Bootstrap 5, avoiding heavy frameworks to demonstrate a strong command of core web technologies and clean architecture.

## Table of Contents

- [Frontend Developer Portfolio](#frontend-developer-portfolio)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Technical Architecture](#technical-architecture)
  - [Performance](#performance)
  - [Project Structure](#project-structure)
  - [Local Development](#local-development)
    - [Prerequisites](#prerequisites)
    - [Installation \& Setup](#installation--setup)
  - [Future Improvements](#future-improvements)
  - [Contact](#contact)

## Key Features

- **Custom Internationalization (i18n):** Implemented a proprietary translation engine using Vanilla JavaScript. The site supports three languages (English, Ukrainian, Polish) dynamically fetched from a central "lang.json" file without requiring page reloads.
- **Dynamic Content Rendering:** The project details page (`project-details.html`) acts as a single, reusable template. It reads URL query parameters (e.g., `?id=portfolio`) and populates the DOM with specific project data from the JSON file, strictly adhering to the DRY (Don't Repeat Yourself) principle.
- **Advanced Filtering Engine:** The projects gallery features a real-time, client-side search and tag-based filtering mechanism.
- **Persistent Theming:** A built-in Light/Dark mode toggle utilizes CSS variables and browser `localStorage` to maintain user preferences seamlessly across sessions and page navigations.
- **Responsive Layout:** Developed with a mobile-first approach using Bootstrap 5, ensuring optimal viewing and interaction across all device resolutions.

## Technical Architecture

The core logic of the application revolves around asynchronous data fetching and dynamic DOM manipulation:

1. **Data Layer (`lang.json`):** Acts as a centralized database for both static UI translations and dynamic project content (descriptions, features, technologies).
2. **Routing Logic:** Instead of creating multiple static HTML files for each project, the application queries the JSON object based on URL parameters to render the appropriate content on the fly.
3. **State Management:** Browser `localStorage` is used to persist application state specifically for the selected language and visual theme.

## Performance

By bypassing large component-based frameworks (such as React or Angular) and relying on optimized Vanilla JavaScript and clean CSS, the application achieves near-instant load times. The architecture minimizes HTTP requests and ensures high scores in Google Lighthouse audits for Accessibility, Best Practices, and SEO.

## Project Structure

    ├── css/
    │   └── style.css            # Custom CSS overrides, animations, and variables
    ├── js/
    │   └── main.js              # Core logic (i18n engine, theme management)
    ├── lang/
    │   └── lang.json            # Centralized dictionary and project database
    ├── public/
    │   ├── projects/            # Project thumbnails and full-size images
    │   ├── certs/               # PDF files for certifications
    │   └── avatar.png           # Profile picture
    ├── index.html               # Main landing page
    ├── projects.html            # Projects gallery with search and filtering
    ├── project-details.html     # Dynamic template for individual project views
    ├── certificates.html        # Certifications and education timeline
    └── README.md                # Project documentation

## Local Development

Because the application uses the Fetch API to load local JSON files, opening the HTML files directly via the `file://` protocol will result in Cross-Origin Resource Sharing (CORS) policy errors in modern browsers. A local web server is strictly required.

### Prerequisites

- Code editor (e.g., VS Code)
- Local server environment (e.g., VS Code Live Server extension, Node.js http-server, or Python http.server)

### Installation & Setup

1. Clone the repository:

   git clone [https://github.com/Nishiyuuu/Portfolio.git](https://github.com/Nishiyuuu/Portfolio.git)

2. Navigate to the project directory:

   cd Portfolio

3. Start your local development server. If using the Live Server extension in VS Code, right-click `index.html` and select "Open with Live Server".

4. Open your browser and navigate to the provided local host address (typically [http://127.0.0.1:5500](http://127.0.0.1:5500)).

## Future Improvements

- Refactoring CSS into SCSS modules for better style encapsulation and maintainability.
- Adding automated unit testing for the i18n logic using Jest.
- Implementation of an Intersection Observer for lazy loading images and scroll animations.

## Contact

**Vladyslav Bychkovskyi** - Frontend Developer

- [LinkedIn](https://linkedin.com/in/vladyslav-bychkovskyi-b8a65a303)
- [GitHub](https://github.com/Nishiyuuu)
- Email: bickovskyijvlad53@gmail.com
