let translations = {};

document.addEventListener("DOMContentLoaded", () => {
  const langSels = [...document.querySelectorAll(".lang-selector")];
  const themeSels = [...document.querySelectorAll(".theme-selector")];

  /* ---------------- i18n ---------------- */

  const applyTranslations = (lang) => {
    const dict = translations[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (dict[key] !== undefined) el.placeholder = dict[key];
    });
    document.querySelectorAll("option[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
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
      const modal = document.getElementById("skillModal");
      if (modal) {
        const modalTitle = modal.querySelector(".modal-title");
        const modalBody = modal.querySelector(".modal-body p");
        const modalBtn = modal.querySelector(".modal-body a");

        document.querySelectorAll(".skill-circle").forEach((circle) => {
          circle.addEventListener("click", () => {
            const currentLang = localStorage.getItem("siteLang") || lang;
            const t = translations[currentLang] || {};
            const titleKey = circle.dataset.i18nTitle;
            const bodyKey = circle.dataset.i18nBody;
            const btnKey = circle.dataset.i18nBtn;

            if (modalTitle) modalTitle.textContent = t[titleKey] || "";
            if (modalBody) modalBody.textContent = t[bodyKey] || "";
            if (modalBtn) {
              modalBtn.textContent = t[btnKey] || "";
              modalBtn.href = circle.dataset.url || "#";
            }
          });
        });
      }
    })
    .catch((e) => console.warn("Translation load error:", e));

  langSels.forEach((s) =>
    s.addEventListener("change", (e) => setLanguage(e.target.value)),
  );

  /* ---------------- Theme ---------------- */

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

  console.log("i18n + theme initialized");
});

document.querySelectorAll("#mobileMenu .nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const href = link.getAttribute("href");

    const menuModal = bootstrap.Modal.getInstance(
      document.getElementById("mobileMenu"),
    );
    if (menuModal) menuModal.hide();

    setTimeout(() => {
      window.location.hash = href;
    }, 300);
  });
});
