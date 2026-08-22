import React from 'react';
import { toolCategories } from '../../data/toolbox';
import { SectionLabel } from '../common/SectionLabel';

export const ToolboxSection: React.FC = () => {
  return (
    <section id="toolbox" className="container section-spacer scroll-reveal">
      <SectionLabel label="03 / drawer inventory" />
      <div className="toolbox-grid">
        {toolCategories.map((category) => (
          <div key={category.title} className="toolbox-column">
            <h4>{category.title}</h4>
            <ul className="tool-list">
              {category.tools.map((tool) => (
                <li key={tool.name}>
                  <b>{tool.name}</b> {tool.detail && `— ${tool.detail}`}
                  {tool.isFavorite && <span className="fav-star">★</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
