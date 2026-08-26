import React from 'react';
import { projects } from '../../data/projects';
import { SectionLabel } from '../common/SectionLabel';
import { WorkItem } from './WorkItem';

export const SelectedWorks: React.FC = () => {
  return (
    <section id="work" className="container section-spacer scroll-reveal">
      <SectionLabel label="02 / selected works" />
      <div className="works-list">
        {projects.map((project, index) => (
          <WorkItem key={project.id} project={project} delayIndex={index} />
        ))}
      </div>
    </section>
  );
};
