// Sample projects data
const projectsData = [
  {
    id: 1,
    title: "Weather App",
    description:
      "Real-time weather application with forecast using OpenWeather API. Responsive design with light/dark theme support.",
    date: "2024-11-15",
    image: "🌤️",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "API", "Responsive"],
  },
  {
    id: 2,
    title: "Todo List Manager",
    description:
      "Full-featured todo application with categories, filters, and local storage. Clean UI with smooth animations.",
    date: "2024-10-20",
    image: "✓",
    demoLink: "#",
    githubLink: "#",
    tags: ["JavaScript", "HTML/CSS", "LocalStorage"],
  },
  {
    id: 3,
    title: "E-commerce Store",
    description:
      "Modern e-commerce platform with product filtering, shopping cart, and checkout functionality.",
    date: "2024-09-10",
    image: "🛒",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "Bootstrap", "State Management"],
  },
  {
    id: 4,
    title: "Portfolio Website",
    description:
      "Beautiful personal portfolio with multiple pages, multi-language support, and dark mode.",
    date: "2024-08-05",
    image: "💼",
    demoLink: "#",
    githubLink: "#",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap"],
  },
  {
    id: 5,
    title: "Chat Application",
    description:
      "Real-time messaging app with user authentication, message history, and online status indicators.",
    date: "2024-07-25",
    image: "💬",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "Node.js", "WebSocket"],
  },
  {
    id: 6,
    title: "Task Analytics Dashboard",
    description:
      "Data visualization dashboard with charts, statistics, and project analytics. Real-time data updates.",
    date: "2024-06-15",
    image: "📊",
    demoLink: "#",
    githubLink: "#",
    tags: ["React", "Charts.js", "MongoDB"],
  },
];

let translations = {};
let allProjects = [...projectsData];

document.addEventListener("DOMContentLoaded", () => {
  const langSels = [...document.querySelectorAll(".lang-selector")];
  const themeSels = [...document.querySelectorAll(".theme-selector")];
  const searchInput = document.getElementById("searchInput");
  const projectsGrid = document.getElementById("projectsGrid");

  /* ============ i18n ============ */
  const applyTranslations = (lang) => {
    const dict = translations[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // Apply placeholder translations
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });
  };

  const setLanguage = (lang) => {
    if (!translations[lang]) return console.warn("No translations for", lang);

    langSels.forEach((s) => (s.value = lang));
    applyTranslations(lang);
    localStorage.setItem("siteLang", lang);
  };

  fetch("./lang/lang.json")
    .then((r) => r.json())
    .then((json) => {
      translations = json || {};
      const saved = localStorage.getItem("siteLang");
      const lang = translations[saved] ? saved : "en";
      setLanguage(lang);

      // Render projects after translations are loaded
      renderProjects(allProjects);
    })
    .catch((e) => console.warn("Translation load error:", e));

  langSels.forEach((s) =>
    s.addEventListener("change", (e) => setLanguage(e.target.value)),
  );

  /* ============ Theme ============ */
  const applyTheme = (theme) => {
    const isDark = theme === "dark";
    document.documentElement.setAttribute(
      "data-bs-theme",
      isDark ? "dark" : "light",
    );
  };

  const setTheme = (theme) => {
    if (!theme) return;
    themeSels.forEach((s) => (s.value = theme));
    applyTheme(theme);
    localStorage.setItem("siteTheme", theme);
  };

  const savedTheme = localStorage.getItem("siteTheme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  themeSels.forEach((s) =>
    s.addEventListener("change", (e) => setTheme(e.target.value)),
  );

  /* ============ Projects Rendering ============ */
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  function renderProjects(projects) {
    projectsGrid.innerHTML = "";

    if (projects.length === 0) {
      document.getElementById("noResults").style.display = "block";
      return;
    }

    document.getElementById("noResults").style.display = "none";

    projects.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className = "project-card";

      const tagsHTML = project.tags
        .map(
          (tag) =>
            `<span style="font-size: 0.75rem; background: #0d6efd; color: white; padding: 2px 8px; border-radius: 4px; margin: 2px;">${tag}</span>`,
        )
        .join("");

      projectCard.innerHTML = `
        <div class="project-image">${project.image}</div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <div class="project-date">${formatDate(project.date)}</div>
          <p class="project-description">${project.description}</p>
          <div style="margin-bottom: 12px; display: flex; gap: 5px; flex-wrap: wrap;">
            ${tagsHTML}
          </div>
          <div class="project-links">
            <a href="${project.demoLink}" class="btn-primary">Demo</a>
            <a href="${project.githubLink}" class="btn-secondary">Code</a>
          </div>
        </div>
      `;

      projectsGrid.appendChild(projectCard);
    });
  }

  /* ============ Search Functionality ============ */
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    const filteredProjects = allProjects.filter((project) => {
      const matchesTitle = project.title.toLowerCase().includes(searchTerm);
      const matchesDescription = project.description
        .toLowerCase()
        .includes(searchTerm);
      const matchesTags = project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm),
      );

      return matchesTitle || matchesDescription || matchesTags;
    });

    renderProjects(filteredProjects);
  });

  console.log("Projects page initialized");
});
