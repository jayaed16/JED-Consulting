// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ---- Year in footer ----
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---- Sticky header ----
  const header = document.querySelector(".site-header");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-sticky", window.scrollY > 10);
  };

  onScroll(); // run once on load
  window.addEventListener("scroll", onScroll, { passive: true });

    // ---- Mobile nav toggle ----
  const navToggle = document.querySelector(".nav-toggle");
  const primaryNav = document.getElementById("primary-nav");

  if (navToggle && header && primaryNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Optional: close menu when a nav link is clicked
    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }


  // ---- Reveal-on-scroll ----
  const els = document.querySelectorAll(
    ".section, .card, .hero-badges, .process-step"
  );

  els.forEach((el) => el.classList.add("reveal"));

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  els.forEach((el) => io.observe(el));
});
