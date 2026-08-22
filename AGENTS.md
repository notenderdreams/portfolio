# AGENTS.md — Agent & Developer Instructions for `notenderdreams`

## 1. Core Runtime & Package Manager
- **ALWAYS use `bun` for all package management and scripting tasks.**
- Do **NOT** use `npm`, `pnpm`, or `yarn`.
- Common commands:
  - `bun install` — Install dependencies
  - `bun add <package>` / `bun add -d <package>` — Add dependencies
  - `bun dev` — Start dev server (bound to `0.0.0.0:8000` for Mac and local network/phone testing)
  - `bun run build` — Typecheck and build production bundle
  - `bun run preview` — Preview the production build

---

## 2. Project Overview & Identity
- **Project Name**: `notenderdreams`
- **Type**: Personal Portfolio & Creative Engineering Showcase
- **Owner**: Sajid Al Nahian (CSE undergraduate based in Dhaka, BD)
- **Focus Areas**:
  - Low-level systems programming (Rust, C, bare-metal kernels, SIMD audio DSP)
  - 3D worldbuilding & computer graphics (Unreal Engine 5, Blender geometry nodes, shaders)
  - Sound design & music composition (Ableton Live, Max/MSP, granular synthesis)
  - Cinematography & color science (DaVinci Resolve, ACES, film print emulation)
- **Design Aesthetic**:
  - Minimal, editorial, dark cinematic (`#050507`), quiet typography (`Newsreader`, `JetBrains Mono`, `Plus Jakarta Sans`, `Caveat`).
  - Authentic hand-annotated sketchbook thoughts and vector doodles framing the hero stage.
  - Looping atmospheric background video with radial/linear vignette overlays.
  - **No AI slop**: Keep copy grounded, honest, and technically authentic. Avoid generic corporate buzzwords or artificial philosophical filler.

---

## 3. Git Commit Conventions
All commit messages **MUST** follow the conventional prefix format:

```text
<prefix>: <msg>
```

### Allowed Prefixes:
| Prefix | Description | Example |
| :--- | :--- | :--- |
| `feat` | Add a new feature | `feat: add soundscape player component` |
| `fix` | Fix a bug | `fix: resolve mobile video autoplay policy issue` |
| `docs` | Documentation changes | `docs: add AGENTS.md guidelines` |
| `style` | Code style / formatting | `style: adjust doodle stroke brightness and font tilts` |
| `refactor` | Refactor code | `refactor: extract thought annotation into standalone hook` |
| `perf` | Performance improvement | `perf: convert background video to AV1 and fast-start MP4` |
| `test` | Add or update tests | `test: add unit test for date formatter` |
| `build` | Build system changes | `build: update vite config host binding` |
| `ci` | CI/CD changes | `ci: add bun build validation workflow` |
| `chore` | Maintenance / chores | `chore: update dependencies and remove unused assets` |
| `revert` | Revert a commit | `revert: restore previous hero layout` |
| `wip` | Work in progress | `wip: experiment with WebGL canvas background` |
| `none` | No category prefix | `none: initial sandbox setup` |

---

## 4. Architecture & Asset Guidelines
- **Framework**: React 18 + TypeScript + Vite
- **Source Structure (`src/`)**:
  - `components/hero/` — Hero stage, background video, top thoughts, flank annotations, doodle icons.
  - `components/sections/` — Selected works, about section, toolbox drawer, contact section.
  - `components/layout/` — Header, footer, film grain overlay.
  - `data/` — Single source of truth for all content (`thoughts.ts`, `projects.ts`, `toolbox.ts`, `metadata.ts`).
  - `hooks/` — Custom hooks (`useDynamicDate.ts`, `useScrollReveal.ts`, `useParallax.ts`).
  - `styles/` — Global design tokens, typography, and hardware-accelerated animations.
  - `types/` — Shared TypeScript models.
- **Public Assets (`public/`)**:
  - `doodles/` — Vector SVG arrows, stars, and shapes.
  - `images/` — Banner collage, poster fallbacks, still artwork.
  - `video/` — Looping, web-optimized MP4/WebM videos.
