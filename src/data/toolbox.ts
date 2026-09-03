export interface LanguageItem {
  name: string;
  slug: string;
}

export interface ToolEntry {
  name: string;
  slug?: string;
}

export interface ToolTableGroup {
  section: string;
  tools: ToolEntry[];
}

export const languages: LanguageItem[] = [
  { name: 'Rust', slug: 'rust' },
  { name: 'C', slug: 'c' },
  { name: 'C++', slug: 'cpp' },
  { name: 'Zig', slug: 'zig' },
  { name: 'Go', slug: 'go' },
  { name: 'Python', slug: 'python' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Lua', slug: 'lua' },
  { name: 'SQL', slug: 'sql' },
  { name: 'Bash', slug: 'bash' },
  { name: 'Java', slug: 'java' },
];

export const toolTableGroups: ToolTableGroup[] = [
  {
    section: 'GUI & Native Frameworks',
    tools: [
      { name: 'Tauri', slug: 'tauri' },
      { name: 'Qt', slug: 'qt' },
      { name: 'Raylib', slug: 'raylib' },
      { name: 'SDL3', slug: 'sdl' },
      { name: 'Slint', slug: 'slint' },
      { name: 'egui', slug: 'egui' },
      { name: 'JavaFX', slug: 'javafx' },
      { name: 'Swing', slug: 'swing' },
    ],
  },
  {
    section: 'Terminal & TUI',
    tools: [
      { name: 'Ratatui', slug: 'ratatui' },
      { name: 'Bubble Tea', slug: 'bubbletea' },
    ],
  },
  {
    section: 'Web & Fullstack',
    tools: [
      { name: 'React', slug: 'react' },
      { name: 'Next.js', slug: 'nextjs' },
      { name: 'FastAPI', slug: 'fastapi' },
      { name: 'Flask', slug: 'flask' },
      { name: 'Actix-web', slug: 'actix' },
      { name: 'Tailwind CSS', slug: 'tailwind' },
      { name: 'Zustand', slug: 'zustand' },
    ],
  },
  {
    section: 'AI & Data Science',
    tools: [
      { name: 'LangChain', slug: 'langchain' },
      { name: 'NumPy', slug: 'numpy' },
      { name: 'Pandas', slug: 'pandas' },
    ],
  },
  {
    section: 'Databases & ORM',
    tools: [
      { name: 'PostgreSQL', slug: 'postgres' },
      { name: 'MongoDB', slug: 'mongodb' },
      { name: 'Redis', slug: 'redis' },
      { name: 'SQLite', slug: 'sqlite' },
      { name: 'Drizzle', slug: 'drizzle' },
      { name: 'Prisma', slug: 'prisma' },
      { name: 'SeaORM', slug: 'seaorm' },
    ],
  },
  {
    section: 'DevOps & Build Systems',
    tools: [
      { name: 'Cargo', slug: 'cargo' },
      { name: 'Bun', slug: 'bun' },
      { name: 'Docker', slug: 'docker' },
      { name: 'Git', slug: 'git' },
      { name: 'CMake', slug: 'cmake' },
      { name: 'Gradle', slug: 'gradle' },
      { name: 'Maven', slug: 'maven' },
    ],
  },
  {
    section: 'Cockpit & Crew',
    tools: [
      { name: 'Neovim', slug: 'nvim' },
      { name: 'Zed Editor', slug: 'zed' },
      { name: 'Ghostty', slug: 'ghostty' },
      { name: 'RustRover', slug: 'rustrover' },
      { name: 'Antigravity', slug: 'antigravity' },
      { name: 'VS Code', slug: 'vscode' },
      { name: 'Visual Studio', slug: 'visualstudio' },
      { name: 'Claude', slug: 'claude' },
      { name: 'Codex', slug: 'codex' },
      { name: 'Jupyter Notebook', slug: 'jupyter' },
    ],
  },
];

export const creativeTools: ToolEntry[] = [
  { name: 'Unreal Engine 5', slug: 'unreal' },
  { name: 'DaVinci Resolve', slug: 'davinci' },
  { name: 'Affinity', slug: 'affinity' },
  { name: 'Ableton Live', slug: 'ableton' },
  { name: 'Figma', slug: 'figma' },
  { name: 'After Effects', slug: 'aftereffects' },
  { name: 'Blender', slug: 'blender' },
  { name: 'Houdini', slug: 'houdini' },
];

