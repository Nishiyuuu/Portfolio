document.addEventListener("DOMContentLoaded", () => {
  const langSel = document.querySelector("#lang");
  if (!langSel) {
    console.warn("Element #lang not found in DOM");
    return;
  }
  let translations = {};

  function applyTranslations(lang) {
    const dict = translations[lang] || {};
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (!key) return;
      const value = dict[key];
      if (value !== undefined) {
        el.textContent = value;
      }
    });
  }

  function setLanguage(lang) {
    if (!translations[lang]) {
      console.warn("No translations for", lang);
      return;
    }
    langSel.value = lang;
    applyTranslations(lang);
    try {
      localStorage.setItem("siteLang", lang);
    } catch (e) {}
  }

  fetch("./lang/lang.json")
    .then((res) => res.json())
    .then((json) => {
      translations = json || {};
      const saved = localStorage.getItem("siteLang");
      const defaultLang =
        saved || (navigator.language || "en").slice(0, 2) || "en";
      const lang = translations[defaultLang] ? defaultLang : "en";
      setLanguage(lang);
    })
    .catch((err) => {
      console.warn("Could not load translations:", err);
    });

  langSel.addEventListener("change", () => {
    const item = langSel.value;
    setLanguage(item);
  });
  const themeSel = document.querySelector("#theme");

  function applyTheme(theme) {
    const hdr = document.querySelector("header");
    const navLinks = document.querySelectorAll(".nav-link");
    const selects = document.querySelectorAll("#lang, #theme");
    if (theme === "dark") {
      document.body.classList.add("bg-dark", "text-light");
      document.body.classList.remove("bg-white", "text-dark");
      if (hdr) {
        hdr.classList.remove("bg-light");
        hdr.classList.add("bg-dark");
      }
      navLinks.forEach((a) => {
        a.classList.remove("text-dark");
        a.classList.add("text-light");
      });
      selects.forEach((s) => {
        s.classList.remove("bg-white", "text-primary", "border-primary");
        s.classList.add("bg-dark", "text-info", "border-info");
      });
    } else {
      document.body.classList.remove("bg-dark", "text-light");
      document.body.classList.add("bg-white", "text-dark");
      if (hdr) {
        hdr.classList.remove("bg-dark");
        hdr.classList.add("bg-light", "shadow-sm");
      }
      navLinks.forEach((a) => {
        a.classList.remove("text-light");
        a.classList.add("text-dark");
      });
      selects.forEach((s) => {
        s.classList.remove("bg-dark", "text-info", "border-info");
        s.classList.add("bg-white", "text-primary", "border-primary");
      });
    }
  }

  function setTheme(theme) {
    if (!theme) return;
    if (themeSel) themeSel.value = theme;
    applyTheme(theme);
    try {
      localStorage.setItem("siteTheme", theme);
    } catch (e) {}
  }

  if (themeSel) {
    const saved = localStorage.getItem("siteTheme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved || (prefersDark ? "dark" : "light");
    setTheme(initial);
    themeSel.addEventListener("change", () => {
      setTheme(themeSel.value);
    });
  } else {
    console.warn("Element #theme not found in DOM");
  }
  console.log("i18n initialized");
});
