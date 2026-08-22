import { ToolCategory } from '../types';

export const toolCategories: ToolCategory[] = [
  {
    title: 'Languages & Systems',
    tools: [
      { name: 'Rust', detail: 'audio DSP, systems, SIMD', isFavorite: true },
      { name: 'C / C++', detail: 'bare metal, kernels, graphics' },
      { name: 'Python', detail: 'scripting, automation, nodes' },
      { name: 'GLSL / HLSL', detail: 'shaders, raymarching, post-fx' },
      { name: 'Assembly', detail: 'x86_64, bootloaders' },
    ],
  },
  {
    title: 'Creative & Media',
    tools: [
      { name: 'Unreal Engine 5', detail: 'cinematic lighting, Nanite, Lumen', isFavorite: true },
      { name: 'Blender', detail: 'geometry nodes, procedural modeling' },
      { name: 'DaVinci Resolve', detail: 'ACES, film print emulation' },
      { name: 'Ableton Live 12', detail: 'sound design, generative synth' },
      { name: 'Figma', detail: 'minimal layout experiments' },
    ],
  },
];
