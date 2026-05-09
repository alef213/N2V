# Handoff — N2V (Mike Johnson)

> **To:** Alex Foster
> **From:** Zazu
> **Last updated:** 2026-05-08
> **Status:** All May 7 client revisions shipped. Site is live, feeds are pulling, all forms route to Mike's Substack. Ready for hosting transfer.

For step-by-step install, build, and deploy instructions, see **[HANDOFF_PACKAGE.md](./HANDOFF_PACKAGE.md)**.

---

## 1. Live URLs

| Environment | URL |
|---|---|
| **Production** | https://mikey-site.pages.dev |
| **Local dev** | http://localhost:4321 (after `npm run dev`) |

**Custom domain:** `n2ved.com` is owned but not yet pointed at Cloudflare. To wire up: Cloudflare Pages dashboard → mikey-site project → Custom domains → add `n2ved.com` and `www.n2ved.com`, then update the registrar's nameservers to Cloudflare's. SSL provisions automatically within ~5 minutes.

## 2. What's on the site

```
/                                       Landing — hero (with new tagline + Homepage1
                                          image), problem, 4-step system (Diagnosis →
                                          Discover → Build → Transformation), proof
                                          (3 real testimonials, 1,000+ stat),
                                          Strength-Based CTA, newsletter
/about                                  Mike's bio (his voice) + UBC/Carleton
                                          credentials (Timeline section removed
                                          per brief)
/blog                                   Live Substack feed (mjohnsonn2v) + Substack
                                          iframe subscribe block
/videos                                 Live YouTube feed (@n2ved) + YouTube subscribe
                                          CTA repeated at top + bottom
/blueprints                             Listing of both blueprints (was /ebooks)
/blueprints/strength-based/             Module 1 article (Strength-Based) + EmailGate
/blueprints/strength-based/thanks/      Confirmation + Strength-Based Parent Profile PDF
/blueprints/iep-launchkit/              IEP Launchkit article + EmailGate
/blueprints/iep-launchkit/thanks/       Confirmation + IEP Preparation Strategy Kit PDF

# 301 redirects in public/_redirects
/ebooks/*                  → /blueprints/*       (legacy URL preservation)
/ebooks/habit-blueprint    → /blueprints/strength-based/   (pre-pivot slug)
/ebooks/gift-audit         → /blueprints/strength-based/
/ebooks/failure-as-fuel    → /blueprints/iep-launchkit/
```

## 3. Design system (locked to Mike's brand guidelines)

- **Palette:** 80–90% base = navy `#0F2847`, charcoal `#1E2A36`, paper `#FBFAF6`, off-white `#F7F5F0`. 10–20% accent = teal `#2D8F8F`, green `#6B9B7A`, gold `#C9A96E`.
- **Typography:** Fraunces serif (headlines), Inter sans (body).
- **Layout:** structured grid, top→problem→system→proof→offer flow.
- **Tone:** academic credibility first, transformation second — never hype.

All tokens live in `src/styles/tokens.css`. Tailwind classes `bg-navy`, `text-gold`, `font-serif` etc. are auto-generated from them.

## 4. What's wired vs still placeholder

### Fully wired with real content
- **Brand wordmark** → N2V (full name as subtitle on desktop)
- **Nav** → About, Blog, Videos, Free Blueprints, Adaptive Tutor (links to socraticiq.org)
- **Footer** → social links, info@n2ved.com, copyright
- **Mike's headshot** → `public/images/mike-headshot.jpg`, rendered via Astro `<Image>` (auto-converted to WebP)
- **Hero image** → `public/images/homepage-hero.jpg` (the Homepage1 asset)
- **Mike's bio** → in his own voice, on /about Philosophy section
- **Academic credentials** → UBC M.Ed., Special Ed Diploma, B.Ed.; Carleton B.A.; varsity water polo
- **Testimonials** → 3 real quotes (Samantha, Warren, Robin) on landing
- **System steps** → 4 steps with brand-matched editorial illustrations (`public/images/system-step-{diagnosis,discover,build,transformation}.png`)
- **Substack** → `https://mjohnsonn2v.substack.com` (RSS pulled into `/blog` at build time, iframe subscribe wired into all email gates)
- **YouTube** → channel `UCxqQ0lkVfy7GTQAs8zXgH4g` (`@n2ved`) — Atom feed pulled into `/videos` at build time
- **Lead magnets** → 2 blueprints (Strength-Based, IEP Launchkit) with full Section 1–6 article body + checklist PDFs in `public/downloads/`
- **Blueprint thumbnails** → real Strategies1 + IEP1 images in `public/images/`

### Open items (not blocking launch)
| Item | File | Notes |
|---|---|---|
| **Custom domain** `n2ved.com` | Cloudflare dashboard (no code change) | Add custom domain in Pages, point registrar nameservers |
| **Logo / wordmark** | `src/components/Header.astro` | Currently text wordmark "N2V" — swap for `<img src="/logo.svg">` if/when a designed mark exists |
| **Awards / press mentions** | `src/components/about/Credentials.astro` | Mike hasn't sent any; card is academic-credentials-only |
| **OG images / Twitter cards** | `src/layouts/Layout.astro` head | Add `<meta property="og:image">` once brand assets exist |
| **Favicon** | `public/favicon.svg` | Currently Astro's default — swap for Mike's mark |
| **Analytics** | `src/layouts/Layout.astro` head | Drop in Plausible/Fathom/GA4 script tag when ready |
| **Course waitlist** form | `src/pages/blueprints/[slug]/thanks.astro` | Posts via `mailto:mjohnson@n2ved.com` (per brief). TODO comment marks it for Formspree migration |

## 5. Quick swap-in recipes

### Replace the text wordmark with a logo
`src/components/Header.astro` — swap the `<span>N2V</span>` for `<img src="/logo.svg" alt="N2V" />`.

### Add OG images / favicon
1. Drop `public/og-image.jpg` (1200×630) and `public/favicon.svg` (your mark).
2. In `src/layouts/Layout.astro` `<head>`, add:
   ```html
   <meta property="og:image" content="/og-image.jpg" />
   <meta name="twitter:card" content="summary_large_image" />
   ```

### Replace the mailto waitlist form with Formspree (or any backend)
1. Create the Formspree form, copy its endpoint URL.
2. In `src/pages/blueprints/[slug]/thanks.astro`, find `action="mailto:mjohnson@n2ved.com"` and replace with the Formspree URL.
3. Remove the `enctype="text/plain"` attribute and the disclaimer text below the button.

### Add a third blueprint
1. Create `src/content/ebooks/<new-slug>.md` with frontmatter matching the existing two (title, subtitle, length, readTime, downloadFile, thumbnailTone, thumbnailFile, checklistName, order, highlights).
2. Drop the checklist PDF into `public/downloads/<new-slug>.pdf`.
3. Drop a thumbnail into `public/images/<new-thumb>.jpg`.
4. Run `npm run build` — Astro auto-generates `/blueprints/<new-slug>/` and `/blueprints/<new-slug>/thanks/` from the new markdown file.

## 6. Repo layout at a glance

```
mikey-site/
├── src/
│   ├── pages/                  Routes (homepage, about, blog, videos, blueprints/)
│   ├── layouts/Layout.astro    HTML shell
│   ├── components/
│   │   ├── Header, Footer, Button, Card, PlaceholderImage   (shared)
│   │   ├── landing/            Hero, Problem, System, Proof, EbookCta, Newsletter
│   │   ├── about/              AboutHero, Philosophy, Credentials, AboutCta
│   │   ├── blog/               BlogHero, PostGrid, BlogCta
│   │   ├── videos/             VideosHero, VideoGrid, VideosCta
│   │   └── ebooks/             EbooksHero, EbookCard, EbookList, FunnelHero,
│   │                            WhatsInside, WhoItsFor, FunnelFaq, EmailGate,
│   │                            BlueprintCover (single owner of thumb resolver)
│   ├── content/ebooks/         2 markdown files (strength-based, iep-launchkit)
│   ├── content.config.ts       Zod schema for blueprint frontmatter
│   ├── data/links.json         Single source of truth for external URLs
│   ├── lib/feeds.ts            Substack + YouTube parsers (pure, typed)
│   └── styles/tokens.css       Brand palette + type scale
├── public/
│   ├── _redirects              Cloudflare Pages 301 rules
│   ├── downloads/              Checklist PDFs
│   ├── images/                 All site imagery
│   └── favicon.svg
├── _CONTEXT.md                 Project overview
├── CLAUDE.md                   Code-style rules
├── HANDOFF.md                  This file (what's shipped + recipes)
├── HANDOFF_PACKAGE.md          Operational handoff (install/build/deploy)
├── NEWSLETTER_PLATFORM_OPTIONS.md  Background research (now moot — Substack live)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```
