import { useEffect } from 'react';

export function useScrollReveal(selector = '.scroll-reveal') {
  useEffect(() => {
    const observedElements = new WeakSet<Element>();

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.12,
      }
    );

    const observeNewElements = () => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((el) => {
        if (!observedElements.has(el)) {
          observedElements.add(el);
          observer.observe(el);
        }
      });
    };

    observeNewElements();

    const mutationObserver = new MutationObserver(() => {
      observeNewElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [selector]);
}
