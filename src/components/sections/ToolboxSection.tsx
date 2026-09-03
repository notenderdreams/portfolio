import React from 'react';
import { languages, toolTableGroups, creativeTools } from '../../data/toolbox';
import { SectionLabel } from '../common/SectionLabel';

export const ToolboxSection: React.FC = () => {
  return (
    <section id="toolbox" className="container section-spacer scroll-reveal">
      <SectionLabel label="03 / drawer inventory" />

      {/* Languages Heading */}
      <h4 className="toolbox-subheading">languages</h4>

      {/* Languages Table Grid: Partitioned square cells with high columns count */}
      <div className="languages-table-wrap">
        <div className="languages-grid-table">
          {languages.map((lang) => (
            <div key={lang.name} className="language-grid-cell" title={lang.name}>
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
          ))}
        </div>
      </div>

      {/* Core Dependencies Heading */}
      <h4 className="toolbox-subheading">core dependencies</h4>

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
      <h4 className="toolbox-subheading">creative suite</h4>

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
    </section>
  );
};


