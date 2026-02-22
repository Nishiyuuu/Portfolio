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
    // update select value
    langSel.value = lang;
    // update texts
    applyTranslations(lang);
    // persist
    try {
      localStorage.setItem("siteLang", lang);
    } catch (e) {}
  }

  // load translations and init
  fetch("./lang/lang.json")
    .then((res) => res.json())
    .then((json) => {
      translations = json || {};
      // restore saved or detect
      const saved = localStorage.getItem("siteLang");
      const defaultLang =
        saved || (navigator.language || "en").slice(0, 2) || "en";
      const lang = translations[defaultLang] ? defaultLang : "en";
      // options show flags only; no label update needed
      setLanguage(lang);
    })
    .catch((err) => {
      console.warn("Could not load translations:", err);
    });

  langSel.addEventListener("change", () => {
    const item = langSel.value;
    setLanguage(item);
  });
  console.log("i18n initialized");
});
