import React from 'react';
import { ProjectItem } from '../../types';

interface WorkItemProps {
  project: ProjectItem;
  delayIndex?: number;
}

export const WorkItem: React.FC<WorkItemProps> = ({ project, delayIndex = 0 }) => {
  return (
    <article
      className="work-item scroll-reveal"
      style={{ transitionDelay: `${delayIndex * 0.08}s` }}
    >
      <span className="work-num">{project.num}</span>
      <div className="work-title-group">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className="work-meta">
        <span className="fav-tag">{project.tags.join(' · ')}</span>
        <span>{project.category}</span>
      </div>
    </article>
  );
};
