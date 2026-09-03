export interface ThoughtAnnotation {
  id: string;
  text: string;
  doodleSrc: string;
  doodleClass?: string;
  tiltClass?: string;
  doodlePosition?: 'left' | 'right';
  isSmall?: boolean;
}

export interface TitleSegment {
  text: string;
  hasSpaceAfter?: boolean;
}

export interface ProjectPrototypeImage {
  src: string;
  alt: string;
  title?: string;
  caption?: string;
}

export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  titleSegments?: TitleSegment[];
  description: string;
  tags: string[];
  category: string;
  githubUrl?: string;
  isPrototype?: boolean;
  prototypeLabel?: string;
  prototypeImages?: ProjectPrototypeImage[];
}

export interface ToolItem {
  name: string;
  detail?: string;
  isFavorite?: boolean;
}

export interface ToolCategory {
  title: string;
  tools: ToolItem[];
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  isExternal?: boolean;
}
