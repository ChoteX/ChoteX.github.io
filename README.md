# Dachi Tchotashvili — Personal Website

Minimalist engineering portfolio for **Dachi Tchotashvili** (AI Engineering @ MBZUAI · Founder @ [Sherekilebi Labs](https://sherekilebi-labs.github.io/)).

## Structure

- **First Screen (`src/components/HeroSection.tsx`)**: Clean typographic introduction and direct links (Sherekilebi Labs, GitHub, LinkedIn, Email, CV).
- **Integrated Projects View (`src/components/ProjectsSection.tsx`)**: Unified master–detail interface ordered by priority (`Embedded & C/C++`, `Artificial Intelligence`, `Data Science & Physics`) with inline accordion behavior on mobile, sticky detail pane on desktop, architecture diagrams (`src/components/SystemSchematic.tsx`), and lazy-loaded 3D `.glb` previews (`src/components/CadViewport.tsx`).
- **Animated Experience & Honours Timeline (`src/components/TimelineSection.tsx`)**: Chronological scroll-animated timeline uniting research, leadership, academic milestones, and international olympiad medals with high-contrast institution logos.
- **High-Level Skills (`src/components/SkillsSection.tsx`)**: Concise 12-item technical stack with recognizable vector logos.

## Color Tokens

- Background: `rgb(45, 45, 45)` (`#2d2d2d`)
- Primary text: `#ddd2d0`
- Slim accents: `#fb8472`

## Commands

```bash
npm install
npm run dev
npm run build
```

Edit content in `src/data/portfolioData.ts`. Static assets live in `public/media/`.
