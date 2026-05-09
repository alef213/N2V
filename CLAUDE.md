# CLAUDE.md — Mikey Site

## Stack Constraints

- Astro 5, Tailwind v4, DaisyUI. TypeScript strict.
- Node 20+. Package manager: npm.
- Target: static output for Cloudflare Pages. No SSR, no server routes.

## Code Style

- Astro components < 200 lines. Split when bigger.
- Design tokens live ONLY in `src/styles/tokens.css` and `tailwind.config.ts`. Never hardcode hex.
- Use DaisyUI primitives + Tailwind utility classes. No custom CSS unless a token is missing.
- Images: always through `<Image>` from `astro:assets` for optimization. All placeholder images MUST have a visible "placeholder" watermark.
- Content in Markdown via content collections, not hardcoded JSX strings.

## Brand Voice

- Academic credibility first, transformation second. Never hype, never childish.
- Verbs lean declarative ("parents turn struggling learners into self-directed students"), not motivational ("unlock your child's potential").
- Copy priority: transformation hook → empathy → proof → offer.

## Post-Edit Commands

```bash
npm run build                    # must succeed with zero errors
npm run astro check              # TypeScript + Astro diagnostics
```

## Anti-Patterns

- No saturated neon, no agency-style asymmetry, no overlapping elements.
- No stock photos that feel like daycare / early-childhood.
- No placeholder text without a visible "placeholder" watermark.
- No hardcoded Substack/YouTube URLs in templates — pull from `src/data/links.json`.
