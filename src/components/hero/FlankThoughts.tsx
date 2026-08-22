import React from 'react';
import { ThoughtAnnotation } from '../../types';
import { DoodleIcon } from './DoodleIcon';

interface FlankThoughtsProps {
  thoughts: ThoughtAnnotation[];
  side: 'left' | 'right';
}

export const FlankThoughts: React.FC<FlankThoughtsProps> = ({ thoughts, side }) => {
  return (
    <aside className={`hero-flank hero-flank-${side}`} aria-hidden="true">
      {thoughts.map((note) => (
        <div
          key={note.id}
          className={`flank-note ${note.isSmall ? 'note-small' : ''} ${note.tiltClass || ''}`.trim()}
        >
          {note.doodlePosition === 'left' && (
            <DoodleIcon src={note.doodleSrc} className={note.doodleClass} />
          )}
          <span>{note.text}</span>
          {note.doodlePosition === 'right' && (
            <DoodleIcon src={note.doodleSrc} className={note.doodleClass} />
          )}
        </div>
      ))}
    </aside>
  );
};
