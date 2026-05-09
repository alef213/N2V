# N2V — Mike Johnson Authority Site

> Authority site + ebook funnel for Mike Johnson — 35-year teacher, 20 years learning support for neurodivergent kids. Brand: **N2V** (Neurodivergent → Valedictorian). Domain: **n2ved.com**. Delivered via Alex Foster, handoff-ready static site deployed to Cloudflare Pages.

## Stack

- Astro 5 + Tailwind CSS v4 + DaisyUI (content-first authority site)
- TypeScript, Astro content collections for blog/ebooks
- Nano Banana Pro for framework diagrams
- Cloudflare Pages (static, `wrangler pages deploy dist`)

## File Structure

```
mikey-site/
├── src/
│   ├── pages/           # Landing, /about, /blog, /videos, /ebooks, /ebooks/[slug]/thanks
│   ├── layouts/         # Layout.astro (shared shell)
│   ├── components/      # Header, Footer, Nav, Hero, SectionBlock, Card, CTA, EbookGate
│   ├── content/         # Markdown content collections (blog stubs, ebooks)
│   └── styles/          # tokens.css (palette + type scale)
├── public/              # /images/* (with "placeholder" watermarks on stock)
├── astro.config.mjs
├── tailwind.config.ts
├── package.json
└── _CONTEXT.md / CLAUDE.md
```

## Pages

- `/` — Hero (transformation), Problem (parent pain), The System (3-step framework), Proof strip, Ebook CTA, Newsletter opt-in
- `/about` — Mike's 35-year story, credibility bullets, photo placeholder
- `/blog` — Substack RSS cards (placeholder Substack URL)
- `/videos` — YouTube thumbnail grid (placeholder channel URL)
- `/ebooks` — 2–3 gated guides with email-capture form
- `/ebooks/[slug]/thanks` — post-opt-in confirmation + download link

## Brand Tokens (locked to Mikey's guidelines)

- Palette: navy `#0F2847`, charcoal `#1E2A36`, off-white `#F7F5F0` (80–90% base) + muted teal `#2D8F8F`, soft green `#6B9B7A`, gold `#C9A96E` (10–20% accent)
- Type: serif headlines (Fraunces), Inter body, 3+ size levels
- Layout: structured grid, predictable top→problem→system→proof→offer flow
- Tone: academic credibility first, transformation second — never hype

## Quick Start

```bash
cd rooms/engineering/mikey-site
npm install
npm run dev          # preview at localhost:4321
npm run build        # outputs dist/
npx wrangler pages deploy dist --project-name=mikey-site
```

## Status

- **2026-04-23**: Phase 1 scaffold deployed to https://mikey-site.pages.dev. Substack/YouTube URLs = placeholders. Email platform TBD (form stub only). All stock/placeholder images watermarked "placeholder."
- **2026-05-06**: Brand finalized → **N2V**, domain → **n2ved.com**. 3 real testimonials wired (Samantha, Warren, Robin from Vancouver). Mike's headshot integrated into /about. Still pending: client bio (4–6 sentences), credentials/awards, ebook content, YouTube channel ID (verification in progress, ETA +72h), Substack alternative decision.

> Relationships: `graph_manager.py query --used-by mikey-site`
