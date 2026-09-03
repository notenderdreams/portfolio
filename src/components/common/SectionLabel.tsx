import React from 'react';

interface SectionLabelProps {
  label: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ label }) => {
  return (
    <div className="section-header-outer">
      <div className="section-label">{label}</div>
    </div>
  );
};
