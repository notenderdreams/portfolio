import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { languages, toolTableGroups, creativeTools } from '../../data/toolbox';
import { SectionLabel } from '../common/SectionLabel';

export const ToolboxSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      // 1. Section Header & Label
      const sectionLabel = section.querySelector('.section-label');
      if (sectionLabel) {
        gsap.fromTo(
          sectionLabel,
          { autoAlpha: 0, y: 20, filter: 'blur(10px)' },
          {
            autoAlpha: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 10%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      }

      // 2. Languages Block (Heading + Table Wrap + Staggered Cells)
      const langHeading = section.querySelector('.toolbox-subheading-languages');
      const langWrap = section.querySelector('.languages-table-wrap');
      const langInners = section.querySelectorAll('.language-cell-inner');

      if (langWrap) {
        const langTl = gsap.timeline({
          scrollTrigger: {
            trigger: langWrap,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        });

        if (langHeading) {
          langTl.fromTo(
            langHeading,
            { autoAlpha: 0, y: 12, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
            0
          );
        }

        langTl.fromTo(
          langWrap,
          { autoAlpha: 0, y: 16, filter: 'blur(10px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
          0.04
        );

        if (langInners.length > 0) {
          langTl.fromTo(
            langInners,
            { autoAlpha: 0, y: 12, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.035,
              ease: 'power2.out',
            },
            0.12
          );
        }
      }

      // 3. Core Dependencies Block (Heading + Table Wrap + Staggered Rows)
      const depsHeading = section.querySelector('.toolbox-subheading-dependencies');
      const depsWrap = section.querySelector('.tools-markdown-table-wrap');
      const depRows = section.querySelectorAll('.markdown-table-row');

      if (depsWrap) {
        const depsTl = gsap.timeline({
          scrollTrigger: {
            trigger: depsWrap,
            start: 'top 86%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        });

        if (depsHeading) {
          depsTl.fromTo(
            depsHeading,
            { autoAlpha: 0, y: 12, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
            0
          );
        }

        depsTl.fromTo(
          depsWrap,
          { autoAlpha: 0, y: 16, filter: 'blur(10px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power2.out' },
          0.04
        );

        if (depRows.length > 0) {
          depsTl.fromTo(
            depRows,
            { autoAlpha: 0, y: 14, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.07,
              ease: 'power2.out',
            },
            0.12
          );
        }
      }

      // 4. Creative Suite Block (Heading + Staggered Tool Items)
      const creativeHeading = section.querySelector('.toolbox-subheading-creative');
      const creativeStrip = section.querySelector('.creative-tools-strip');
      const creativeItems = section.querySelectorAll('.creative-tool-item');

      if (creativeStrip) {
        const creativeTl = gsap.timeline({
          scrollTrigger: {
            trigger: creativeStrip,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'play reverse play reverse',
          },
        });

        if (creativeHeading) {
          creativeTl.fromTo(
            creativeHeading,
            { autoAlpha: 0, y: 12, filter: 'blur(8px)' },
            { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' },
            0
          );
        }

        if (creativeItems.length > 0) {
          creativeTl.fromTo(
            creativeItems,
            { autoAlpha: 0, y: 14, filter: 'blur(8px)' },
            {
              autoAlpha: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.85,
              stagger: 0.045,
              ease: 'power2.out',
            },
            0.08
          );
        }
      }
    }, section);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="toolbox" className="section-spacer toolbox-section">
      <SectionLabel label="04 / drawer inventory" />

      <div className="container">
        {/* Languages Heading */}
        <h4 className="toolbox-subheading toolbox-subheading-languages">languages</h4>

        {/* Languages Table Grid: Partitioned square cells with high columns count */}
        <div className="languages-table-wrap">
          <div className="languages-grid-table">
            {languages.map((lang) => (
              <div key={lang.name} className="language-grid-cell" title={lang.name}>
                <div className="language-cell-inner">
                  <span className="language-icon-container" aria-hidden="true">
                    <img
                      src={`/icons/devicon/${lang.slug}.svg`}
                      alt=""
                      className={`lang-icon-img lang-icon-${lang.slug}`}
                      draggable={false}
                    />
                  </span>
                  <span className="language-cell-name">{lang.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Dependencies Heading */}
        <h4 className="toolbox-subheading toolbox-subheading-dependencies">core dependencies</h4>

        {/* Markdown-style Boxed Technical Grid Table (No Header) */}
        <div className="tools-markdown-table-wrap">
          <table className="tools-markdown-table" aria-label="Core Dependencies">
            <tbody>
              {toolTableGroups.map((group) => (
                <tr key={group.section} className="markdown-table-row">
                  <td className="markdown-table-section">
                    <span className="section-title">{group.section}</span>
                  </td>
                  <td className="markdown-table-tools">
                    <div className="tools-vertical-stack">
                      {group.tools.map((tool) => (
                        <div key={tool.name} className="tool-stack-item">
                          {tool.slug && (
                            <span className="tool-icon-wrap" aria-hidden="true">
                              <img
                                src={`/icons/devicon/${tool.slug}.svg`}
                                alt=""
                                className={`tool-icon-img tool-icon-${tool.slug}`}
                                draggable={false}
                              />
                            </span>
                          )}
                          <span className="tool-name-text">{tool.name}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Creative Suite Heading */}
        <h4 className="toolbox-subheading toolbox-subheading-creative">creative suite</h4>

        {/* Single clean line displaying creative tools: icons with names below, justified between */}
        <div className="creative-tools-strip">
          {creativeTools.map((tool) => (
            <div key={tool.name} className="creative-tool-item" title={tool.name}>
              {tool.slug && (
                <span className="creative-tool-icon-wrap" aria-hidden="true">
                  <img
                    src={`/icons/devicon/${tool.slug}.svg`}
                    alt={tool.name}
                    className={`creative-tool-img creative-tool-${tool.slug}`}
                    draggable={false}
                  />
                </span>
              )}
              <span className="creative-tool-name">{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


