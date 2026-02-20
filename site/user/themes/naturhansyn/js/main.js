// NaturHänsyn — main.js
// Sprint 2: scroll animations, image lazy fade, header scroll

(function () {
  'use strict';

  // ==========================================
  // Mobile menu toggle
  // ==========================================
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-active');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================
  // Header scroll effect
  // ==========================================
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 60) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ==========================================
  // Scroll animations (IntersectionObserver)
  // ==========================================
  if ('IntersectionObserver' in window) {
    var fadeElements = document.querySelectorAll('.fade-in, .fade-in-up');

    if (fadeElements.length > 0) {
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      fadeElements.forEach(function (el) {
        fadeObserver.observe(el);
      });
    }
  } else {
    // Fallback: show all elements immediately
    document.querySelectorAll('.fade-in, .fade-in-up').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  // ==========================================
  // Image lazy fade-in
  // ==========================================
  var lazyImages = document.querySelectorAll('img[loading="lazy"]');
  lazyImages.forEach(function (img) {
    if (img.complete) {
      img.classList.add('is-loaded');
    } else {
      img.addEventListener('load', function () {
        img.classList.add('is-loaded');
      });
    }
  });

})();
