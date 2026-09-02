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
          <h3>
            {project.title.split(' ').map((word, wIndex, arr) => {
              const isOdd = wIndex % 2 !== 0;
              const directionClass = isOdd ? 'roll-dir-down' : 'roll-dir-up';

              return (
                <span key={wIndex} className="roll-word">
                  <span className={`roll-box ${directionClass}`}>
                    <span
                      className="roll-line roll-line-1"
                      style={{ transitionDelay: `${wIndex * 0.08}s` }}
                    >
                      {word}
                    </span>
                    <span
                      className="roll-line roll-line-2"
                      aria-hidden="true"
                      style={{ transitionDelay: `${wIndex * 0.08}s` }}
                    >
                      {word}
                    </span>
                  </span>
                  {wIndex < arr.length - 1 && ' '}
                </span>
              );
            })}
          </h3>
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
