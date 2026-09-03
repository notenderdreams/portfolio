import React, { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import { SectionLabel } from '../common/SectionLabel';
import { WorkItem } from './WorkItem';

export const SelectedWorks: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [displayIndex, setDisplayIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const calculateActiveProject = () => {
      const centerY = window.innerHeight / 2;
      const firstEl = itemRefs.current[0];
      const lastEl = itemRefs.current[itemRefs.current.length - 1];

      // If entirely above the works section
      if (firstEl) {
        const firstRect = firstEl.getBoundingClientRect();
        if (firstRect.top > centerY + 80) {
          setActiveIndex(-1);
          setDisplayIndex(0);
          ticking = false;
          return;
        }
      }

      // If entirely below the works section
      if (lastEl) {
        const lastRect = lastEl.getBoundingClientRect();
        if (lastRect.bottom < centerY - 80) {
          setActiveIndex(-1);
          setDisplayIndex(itemRefs.current.length - 1);
          ticking = false;
          return;
        }
      }

      let closestIndex = -1;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - centerY);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (closestIndex >= 0) {
        setActiveIndex(closestIndex);
        setDisplayIndex(closestIndex);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(calculateActiveProject);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    calculateActiveProject();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const scrollToProject = (index: number) => {
    setActiveIndex(index);
    setDisplayIndex(index);
    const target = itemRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const total = projects.length;
  const currentNum = displayIndex + 1;

  return (
    <section id="work" className="section-spacer selected-works-section">
      <SectionLabel label="03 / selected works" />

      <div className="works-outer-stage">
        {/* Left empty space: counter (e.g. 1/5) */}
        <aside className="works-flank works-flank-left" aria-label="Current project index">
          <div className="works-sticky-flank">
            <span className="works-counter-text">
              <span className="works-counter-current">{currentNum}</span>
              <span className="works-counter-sep">/</span>
              <span className="works-counter-total">{total}</span>
            </span>
          </div>
        </aside>

        {/* Center: project cards in continuous grid stroke */}
        <div className="works-center-track">
          <div className="works-list">
            {projects.map((project, index) => {
              const isSelected = index === activeIndex;
              return (
                <WorkItem
                  key={project.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  project={project}
                  isSelected={isSelected}
                  onSelect={() => scrollToProject(index)}
                />
              );
            })}
          </div>
        </div>

        {/* Right empty space: list of project names */}
        <aside className="works-flank works-flank-right" aria-label="Projects list">
          <nav className="works-sticky-flank">
            <ul className="works-names-list">
              {projects.map((project, index) => {
                const isSelected = index === activeIndex;
                return (
                  <li key={project.id}>
                    <button
                      type="button"
                      className={`works-name-btn${isSelected ? ' is-selected' : ''}`}
                      onClick={() => scrollToProject(index)}
                      data-cursor="pointer"
                    >
                      {project.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </section>
  );
};
