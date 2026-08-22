/* ==========================================================================
   SAJID AL NAHIAN — EDITORIAL PORTFOLIO LOGIC & SMOOTH ANIMATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Archive Dates
  const dateEl = document.getElementById('archive-date');
  const heroDateEl = document.getElementById('archive-hero-date');

  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const year = today.getFullYear().toString().slice(-2);

  const formatted = `${month} ${day} ${year}`;
  if (dateEl) dateEl.textContent = formatted;
  if (heroDateEl) heroDateEl.textContent = formatted;

  // 2. Smooth Scroll-Triggered Reveal Animations
  const revealElements = document.querySelectorAll(
    '.section-spacer, .work-item, .about-block, .toolbox-grid, .contact-block'
  );

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.12
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el, index) => {
    el.classList.add('scroll-reveal');
    // Add staggered delay for work items
    if (el.classList.contains('work-item')) {
      const itemIndex = Array.from(el.parentElement.children).indexOf(el);
      el.style.transitionDelay = `${itemIndex * 0.08}s`;
    }
    revealObserver.observe(el);
  });

  // 3. Subtle Parallax / Depth on Landing Image
  const banner = document.querySelector('.letterbox-banner');
  if (banner && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 800) {
            banner.style.transform = `translateY(${scrollY * 0.06}px) scale(${1 + scrollY * 0.0001})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // 4. Background Video Autoplay Guarantee
  const bgVideo = document.querySelector('.landing-bg-video');
  if (bgVideo) {
    bgVideo.muted = true;
    bgVideo.setAttribute('muted', '');
    bgVideo.setAttribute('playsinline', '');
    const playPromise = bgVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: trigger play on first interaction
        const startPlay = () => {
          bgVideo.play();
          window.removeEventListener('click', startPlay);
          window.removeEventListener('touchstart', startPlay);
          window.removeEventListener('scroll', startPlay);
        };
        window.addEventListener('click', startPlay, { once: true });
        window.addEventListener('touchstart', startPlay, { once: true });
        window.addEventListener('scroll', startPlay, { once: true });
      });
    }
  }
});
