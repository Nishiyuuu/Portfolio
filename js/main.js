document.addEventListener("DOMContentLoaded", () => {
  const langSels = [...document.querySelectorAll(".lang-selector")];
  const themeSels = [...document.querySelectorAll(".theme-selector")];

  let translations = {};

  /* ---------------- i18n ---------------- */

  const applyTranslations = (lang) => {
    const dict = translations[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
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
