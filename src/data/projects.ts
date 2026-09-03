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
  },
  {
    id: 'rtqlate',
    num: '02',
    title: 'RTQLATE',
    description: 'Hybrid task manager and mind map engineered for AI workflows. Recursively decomposes complex objectives into persistent sub-tasks across autonomous sessions.',
    tags: ['Rust', 'Tauri', 'TypeScript', 'AI Workflows'],
    category: 'Task Management',
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
  },
  {
    id: 'nour',
    num: '04',
    title: 'NOUR',
    description: 'High-performance incremental build system written in C. Engineered for minimal overhead, fast dependency graph resolution, and low-level compilation workflows.',
    tags: ['C', 'Build System', 'Systems Programming'],
    category: 'Low-Level Systems',
  },
  {
    id: 'miruku',
    num: '05',
    title: 'Project Miruku',
    description: 'HTML-based presentation maker that renders clean, responsive slide decks and compiles pixel-perfect presentation exports to standalone PDF files.',
    tags: ['Web Engineering', 'PDF Renderer', 'TypeScript'],
    category: 'Document Engineering',
  },
];

