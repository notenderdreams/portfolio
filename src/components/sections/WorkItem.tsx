import { forwardRef } from 'react';
import { ProjectItem } from '../../types';

interface WorkItemProps {
  project: ProjectItem;
  delayIndex?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const WorkItem = forwardRef<HTMLElement, WorkItemProps>(
  ({ project, isSelected = false, onSelect }, ref) => {
    return (
      <article
        ref={ref}
        className={`work-item${isSelected ? ' is-selected' : ''}`}
        onClick={onSelect}
      >
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
  }
);

WorkItem.displayName = 'WorkItem';
