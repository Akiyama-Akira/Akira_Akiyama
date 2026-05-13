
(function () {
  "use strict";

  const html       = document.documentElement;
  const navbar     = document.getElementById("navbar");
  const themeBtn   = document.getElementById("themeToggle");
  const burgerBtn  = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeLinks = document.querySelectorAll("[data-close]");
  const revealEls  = document.querySelectorAll(".reveal");

  const STORAGE_KEY = "aa-theme";

  function applyTheme(theme) {
    html.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
    themeBtn.setAttribute("aria-label", theme === "dark" ? "Светлая тема" : "Тёмная тема");
  }

  function initTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(prefersDark ? "dark" : "light");
    }
  }

  themeBtn.addEventListener("click", () => {
    const current = html.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  initTheme();

  let lastScrollY = 0;

  function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle("scrolled", y > 10);
    lastScrollY = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); 

  function openMenu() {
    mobileMenu.classList.add("open");
    burgerBtn.classList.add("open");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    burgerBtn.classList.remove("open");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  burgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  closeLinks.forEach(link => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActiveLink() {
    let current = "";
    sections.forEach((sec) => {
      const top = sec.offsetTop - 90;
      if (window.scrollY >= top) current = sec.getAttribute("id");
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  }

  window.addEventListener("scroll", updateActiveLink, { passive: true });

  const legalOverlay     = document.getElementById("legalOverlay");
  const legalTriggerBtn  = document.getElementById("legalTriggerBtn");
  const legalCloseBtn    = document.getElementById("legalCloseBtn");
  const legalCloseBtnBot = document.getElementById("legalCloseBtnBottom");

  function openLegal() {
    legalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeLegal() {
    legalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  legalTriggerBtn.addEventListener("click", openLegal);
  legalCloseBtn.addEventListener("click", closeLegal);
  legalCloseBtnBot.addEventListener("click", closeLegal);

  legalOverlay.addEventListener("click", (e) => {
    if (e.target === legalOverlay) closeLegal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLegal();
  });

})();
