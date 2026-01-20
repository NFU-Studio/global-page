# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Planning

Always try to create less verbose, concise plans, don't care much for grammar as long as plan is precise and as concise as possible.

## Package Manager

This project uses **Bun** as the package manager (evident from `bun.lock`). Always use `bun` commands:

```bash
bun run dev        # Start development server
bun run build      # Build for production (compiles i18n, then builds)
bun run preview    # Preview production build
bun run clean      # Clean build artifacts
bun install        # Install dependencies
```

## Build Process

The build process has two stages:

1. **ParaglideJS compilation**: `paraglide-js compile --project ./project.inlang --outdir ./src/paraglide`
2. **Astro build**: `astro build`

This is defined in the `build` script in package.json. When building, always run `bun run build` rather than `astro build` directly.

## Tech Stack

- **Astro 5** - Meta-framework with islands architecture for client-side interactivity
- **React 19** - Used for interactive components via `@astrojs/react` integration
- **TypeScript** - Strict mode enabled
- **TailwindCSS 4** - Styling with Vite plugin
- **ParaglideJS** - Type-safe internationalization

## Project Structure

```
src/
├── pages/          # Astro pages (file-based routing)
├── layouts/        # Layout components (RootLayout, AppHeader, AppFooter, Head)
├── components/     # Reusable components
│   ├── ui/        # Radix UI + Tailwind components (shadcn/ui style)
│   └── features/  # Feature-specific components (e.g., pricing-calculator)
├── sections/      # Page sections (hero, offer, testimonials, etc.)
├── stores/        # NanoStores for client-side state
├── lib/           # Utilities and business logic
├── data/          # Static data (pricing, navigation, etc.)
├── paraglide/     # Generated i18n runtime (DO NOT EDIT)
└── app-scripts/   # Client-side scripts (Lenis smooth scroll, etc.)
```

## Internationalization (i18n)

- **Base locale**: Polish (`pl`)
- **Supported locale**: English (`en`)
- Type-safe message imports: `import * as m from "@/paraglide/messages"`
- URL patterns are localized (e.g., `/cennik/` → `/pricing/` in English)
- URL patterns are defined in `astro.config.mjs`
- i18n settings in `project.inlang/settings.json`

## Component Patterns

### UI Components (`src/components/ui/`)

- Built with **Radix UI** primitives + **TailwindCSS**
- Use **Class Variance Authority (CVA)** for component variants
- Follow shadcn/ui conventions
- Example: Button, Slider, RadioGroup, Switch

### Feature Components

- Domain-specific interactive components (typically React)
- Example: `pricing-calculator` with real-time calculations

### Sections

- Page composition units (Hero, Offer, Testimonials, etc.)
- Can be Astro or React components

## State Management

- **NanoStores** is used for client-side state
- Stores are in `src/stores/`
- React integration via `@nanostores/react`

## Linting and Formatting

- **Biome** is used for linting and formatting (not ESLint/Prettier for JS/TS)
- Configuration: `biome.json`
- **Prettier** is used only for `.astro` files
- Biome settings:
  - Double quotes for JavaScript
  - Organize imports on save
  - Ignores: `*.css`, `*.astro`, `dist/`, `.astro/`

## Conventions

- `export const ComponentName = ...` ONLY this means:
  - no "barrel" index files
  - no `export default`
- create only one set of components - do not translate until asked to

## Path Aliases

Use `@/` as an alias for the `src/` directory in imports:

```ts
import { foo } from "@/lib/foo";
import * as m from "@/paraglide/messages";
```

## Key Dependencies

- **Motion** (`motion`) - Animation library
- **Lenis** - Smooth scrolling
- **Cobe** - 3D globe effect
- **Zod** - Schema validation
- **Lucide React** - Icons

## Configuration Files

- `astro.config.mjs` - Astro config with i18n, integrations, experimental fonts
- `tsconfig.json` - TypeScript config (extends Astro's strict config)
- `biome.json` - Linter and formatter
- `project.inlang/settings.json` - i18n configuration
