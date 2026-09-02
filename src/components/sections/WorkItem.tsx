import { forwardRef } from 'react';
import { ProjectItem } from '../../types';

interface WorkItemProps {
  project: ProjectItem;
  delayIndex?: number;
  isSelected?: boolean;
  isPassed?: boolean;
  onSelect?: () => void;
}

export const WorkItem = forwardRef<HTMLElement, WorkItemProps>(
  ({ project, isSelected = false, isPassed = false, onSelect }, ref) => {
    const statusClass = isSelected ? ' is-selected' : isPassed ? ' is-passed' : ' is-upcoming';

    return (
      <article
        ref={ref}
        className={`work-item${statusClass}`}
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
