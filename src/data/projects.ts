import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'voidcrate',
    num: '01',
    title: 'VoidCrate',
    titleSegments: [
      { text: 'Void', hasSpaceAfter: false },
      { text: 'Crate', hasSpaceAfter: false },
    ],
    description: 'High-performance Unreal Engine asset manager solving asset duplication, disk bloat, and cache optimization across large development pipelines.',
    tags: ['UE5', 'Tauri', 'Rust'],
    category: 'Asset Infrastructure',
    githubUrl: 'https://github.com/notenderdreams/Voidcrate',
    isPrototype: true,
    prototypeLabel: 'Early Prototype Build',
    prototypeImages: [
      {
        src: '/images/projects/voidcrate_home.png',
        alt: 'VoidCrate Home Dashboard Prototype',
        title: 'Home & Storage Analytics',
        caption: 'Storage overview, duplicate detection, and quick-launch workspaces.',
      },
      {
        src: '/images/projects/voidcrate_assets.png',
        alt: 'VoidCrate Asset Library Prototype',
        title: 'Asset Library & Cache Engine',
        caption: 'Asset inspection, dependency tracking, and cross-project asset resolution.',
      },
      {
        src: '/images/projects/voidcrate_projects.png',
        alt: 'VoidCrate Projects Pipeline Prototype',
        title: 'Project Pipeline & Sync',
        caption: 'Multi-project repository synchronization with centralized cache management.',
      },
    ],
  },
  {
    id: 'rtqlate',
    num: '02',
    title: 'RTQLATE',
    description: 'Hybrid task manager and mind map engineered for AI workflows. Recursively decomposes complex objectives into persistent sub-tasks across autonomous sessions.',
    tags: ['Rust', 'Tauri', 'TypeScript', 'AI Workflows'],
    category: 'Task Management',
    githubUrl: 'https://github.com/notenderdreams/rtqlate',
  },
  {
    id: 'cinnabar',
    num: '03',
    title: 'Cinnabar',
    titleSegments: [
      { text: 'Cinna', hasSpaceAfter: false },
      { text: 'bar', hasSpaceAfter: false },
    ],
    description: 'Ultra-lightweight PDF reader (<10MB binary) and dual-page workspace with built-in AI assistance for querying selected passages directly.',
    tags: ['Rust', 'Tauri', 'AI Assistance'],
    category: 'PDF & Annotation Engine',
    githubUrl: 'https://github.com/notenderdreams/Cinnabar',
  },
  {
    id: 'nour',
    num: '04',
    title: 'NOUR',
    description: 'High-performance incremental build system written in C. Engineered for minimal overhead, fast dependency graph resolution, and low-level compilation workflows.',
    tags: ['C', 'Build System', 'Systems Programming'],
    category: 'Low-Level Systems',
    githubUrl: 'https://github.com/notenderdreams/nour-prototype',
  },
  {
    id: 'miruku',
    num: '05',
    title: 'Project Miruku',
    description: 'HTML-based presentation maker that renders clean, responsive slide decks and compiles pixel-perfect presentation exports to standalone PDF files.',
    tags: ['Web Engineering', 'PDF Renderer', 'TypeScript'],
    category: 'Document Engineering',
    githubUrl: 'https://github.com/notenderdreams/ProjectMiruku',
  },
];

