import React from 'react';

interface DoodleIconProps {
  src: string;
  className?: string;
  alt?: string;
}

export const DoodleIcon: React.FC<DoodleIconProps> = ({ src, className = '', alt = '' }) => {
  return <img className={`doodle-icon ${className}`.trim()} src={src} alt={alt} />;
};
