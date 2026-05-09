# N2V — Neurodivergent → Valedictorian

Authority site + lead-magnet funnel for Mike Johnson — 35-year educator specializing in neurodivergent learners. Domain: **n2ved.com**. Hosted on Cloudflare Pages.

## Stack

- [Astro 5](https://astro.build) (static-output mode)
- Tailwind v4 + DaisyUI 5
- TypeScript, Markdown content collections

## Quick start

```bash
npm install
npm run dev          # local preview at http://localhost:4321
npm run build        # outputs to dist/
npm run astro check  # type-check + diagnostics
```

Node 20+ required. No `.env` file needed — the site is fully static.

## Deploy

```bash
CLOUDFLARE_ACCOUNT_ID=<account-id> \
CLOUDFLARE_API_TOKEN=<token> \
npx wrangler@4 pages deploy dist --project-name=mikey-site --branch=main
```

Or drop `dist/` on any static host (Vercel, Netlify, GitHub Pages — all work without code changes).

## Documentation

- **[HANDOFF.md](./HANDOFF.md)** — what's shipped, design system, swap-in recipes
- **[HANDOFF_PACKAGE.md](./HANDOFF_PACKAGE.md)** — full operational handoff (install/build/deploy/env/services)
- **[_CONTEXT.md](./_CONTEXT.md)** — project overview + status log
- **[CLAUDE.md](./CLAUDE.md)** — code-style rules for AI/IDE assistants

## Key files

| File | Purpose |
|---|---|
| `src/data/links.json` | Single source of truth for Substack URL, YouTube channel ID, embed URLs |
| `src/content/ebooks/*.md` | Blueprint articles (each becomes a `/blueprints/<slug>/` route) |
| `src/lib/feeds.ts` | Substack RSS + YouTube Atom parsers (pure, fixture-testable) |
| `src/styles/tokens.css` | Brand palette + typography tokens |
| `public/_redirects` | Cloudflare Pages 301 rules (legacy `/ebooks/*` → `/blueprints/*`) |
| `public/downloads/` | Checklist PDFs |
