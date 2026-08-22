import { ProjectItem } from '../types';

export const projects: ProjectItem[] = [
  {
    id: 'vapordsp',
    num: '01',
    title: 'VaporDSP Engine',
    description: 'A real-time SIMD audio synthesis engine built in Rust with C-ABI bindings for low-latency audio processing.',
    tags: ['Rust', 'C API'],
    category: 'Audio DSP / Systems',
  },
  {
    id: 'obsidian-citadel',
    num: '02',
    title: 'Obsidian Citadel',
    description: 'A cinematic 3D environment study created in Blender and rendered real-time in Unreal Engine 5 with Nanite & Lumen.',
    tags: ['UE5', 'Blender'],
    category: '3D Art / Shaders',
  },
  {
    id: 'microkernel',
    num: '03',
    title: 'MicroKernel / x86',
    description: 'Experimental bare-metal hobby kernel exploring virtual memory management, paging, and timer interrupts from scratch.',
    tags: ['C', 'x86 Assembly'],
    category: 'OS / Low-Level',
  },
  {
    id: 'aces-emulsion',
    num: '04',
    title: 'ACES Emulsion Grade',
    description: 'Film print emulation and color science pipeline for 16mm archival film scans in DaVinci Resolve.',
    tags: ['Resolve', 'Color'],
    category: 'Cinematography',
  },
  {
    id: 'granular-synth',
    num: '05',
    title: 'Granular MIDI Synth',
    description: 'Custom Max for Live device exploring asynchronous grain clouds and generative microtonal sequences in Ableton.',
    tags: ['Ableton', 'Max/MSP'],
    category: 'Sound Design',
  },
];
