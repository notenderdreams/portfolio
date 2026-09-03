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
            {(project.titleSegments
              ? project.titleSegments.map((seg, sIdx, sArr) => ({
                  word: seg.text,
                  hasSpace: seg.hasSpaceAfter ?? sIdx < sArr.length - 1,
                }))
              : project.title.split(' ').map((w, wIdx, wArr) => ({
                  word: w,
                  hasSpace: wIdx < wArr.length - 1,
                }))
            ).map((item, wIndex) => {
              const isOdd = wIndex % 2 !== 0;
              const directionClass = isOdd ? 'roll-dir-down' : 'roll-dir-up';

              return (
                <span key={wIndex} className="roll-word">
                  <span className={`roll-box ${directionClass}`}>
                    <span
                      className="roll-line roll-line-1"
                      style={{ transitionDelay: `${wIndex * 0.08}s` }}
                    >
                      {item.word}
                    </span>
                    <span
                      className="roll-line roll-line-2"
                      aria-hidden="true"
                      style={{ transitionDelay: `${wIndex * 0.08}s` }}
                    >
                      {item.word}
                    </span>
                  </span>
                  {item.hasSpace && ' '}
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
