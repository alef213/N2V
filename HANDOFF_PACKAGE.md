# N2V Handoff Package

> Last updated: 2026-05-08 — final handoff state (post architecture deepening pass)

---

## 1. Project at a glance

- **Site:** N2V (Neurodivergent → Valedictorian) — Mike Johnson's authority site
- **Domain:** n2ved.com (DNS not yet pointed at hosting)
- **Live preview:** https://mikey-site.pages.dev (Cloudflare Pages)
- **Owner:** Mike Johnson — educator, 30+ years helping neurodivergent learners

---

## 2. Framework + build

| Layer | Detail |
|---|---|
| Framework | **Astro 5** (static-output mode — no SSR) |
| Styling | Tailwind v4 + DaisyUI 5 |
| Languages | TypeScript, Astro components, Markdown content collections |
| Node version | **20+** required |
| Package manager | npm |

---

## 3. Install + run

```bash
npm install
npm run dev          # local preview at http://localhost:4321
npm run build        # outputs to dist/
npm run astro check  # type-check + diagnostics
```

---

## 4. Deploy

Static site — the `dist/` folder is self-contained HTML/CSS/JS with no server required.

### Current setup: Cloudflare Pages

```bash
npm run build

CLOUDFLARE_ACCOUNT_ID=796886b8b7f6a58cf35c04012073960f \
  CLOUDFLARE_API_TOKEN=<your-token> \
  npx wrangler@4 pages deploy dist \
  --project-name=mikey-site \
  --branch=main \
  --commit-dirty=true
```

### To take over hosting

1. Create your own Cloudflare account (free tier works) and create a new Pages project, **or** choose another static host (Vercel, Netlify, GitHub Pages all work without code changes).
2. Set `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` in your environment (CI/CD or local shell).
3. Run the deploy command above, substituting your account ID and project name.
4. Point the domain once your project is confirmed working (see section 7).

> **Alternative hosts:** For Vercel — `vercel deploy --prebuilt dist/`. For Netlify — drag-and-drop the `dist/` folder in the Netlify UI, or use the Netlify CLI.

---

## 5. Environment variables

**No `.env` file exists — the site is fully static.** All content (copy, links, feed URLs) lives in:

- `src/data/links.json` — Substack URL, YouTube channel ID and handle, newsletter config
- `src/pages/*.astro` — feed-fetching logic runs at build time using values from `links.json`

No secrets, no API keys, no auth tokens required at build or runtime.

---

## 6. Third-party services

| Service | Role | Config location |
|---|---|---|
| **Cloudflare Pages** | Current host | Project name: `mikey-site`, Account ID: `796886b8b7f6a58cf35c04012073960f` |
| **Substack** | Blog feed (RSS, pulled at build time) | `src/data/links.json` → `substackUrl` |
| **YouTube** | Video feed (Atom RSS, pulled at build time) | `src/data/links.json` → `youtubeChannelId` |

No CMS, analytics, payment, or form integrations are currently active.

> **Feed update note:** Because the site is static, content from Substack and YouTube is fetched during `npm run build`. A new blog post or video will only appear on the live site after a rebuild and redeploy.

---

## 7. Custom domain wire-up (n2ved.com)

### Option A — Stay on Cloudflare Pages (recommended)

1. Go to Cloudflare Pages → `mikey-site` project → **Custom domains**
2. Add `n2ved.com` and `www.n2ved.com`
3. Update your domain registrar's nameservers to point to Cloudflare's nameservers (Cloudflare will show you the exact values)
4. SSL provisions automatically within ~5 minutes

### Option B — Different static host

Follow that host's custom domain instructions. The site has no hardcoded origin URLs, so it works on any domain without code changes.

---

## 8. Project structure

```
src/
  components/       # All UI components, organized by page section
    about/          # AboutHero, Philosophy, Credentials, AboutCta
    blog/           # BlogHero, PostGrid, BlogCta
    ebooks/         # EbooksHero, EbookCard, EbookList, FunnelHero,
                    # WhatsInside, WhoItsFor, FunnelFaq, EmailGate,
                    # BlueprintCover (single owner of the thumb resolver)
    landing/        # Hero, Problem, System, Proof, EbookCta, Newsletter
    videos/         # VideosHero, VideoGrid, VideosCta
    Header.astro    # Top nav (rendered on every page)
    Footer.astro    # Footer (rendered on every page)
    Button.astro    # Primary button primitive
    Card.astro
    PlaceholderImage.astro  # Fallback image when thumbnailFile is unset
  content/
    ebooks/         # 2 markdown files: strength-based.md, iep-launchkit.md
                    # (these power the /blueprints/[slug] dynamic routes)
  content.config.ts # Zod schema for the Blueprint frontmatter
  data/
    links.json      # ← IMPORTANT: all external URLs and channel IDs live here
                    # Single source of truth for Substack URL, YouTube ID,
                    # newsletter embed URL.
  layouts/
    Layout.astro    # Root HTML shell (head, nav, footer)
  lib/
    feeds.ts        # Substack RSS + YouTube Atom parsers and fetchers
                    # Pure functions — typed Post and VideoEntry exports
  pages/            # Astro file-based routing — each .astro becomes a route
    index.astro     # Homepage
    about.astro
    blog.astro      # Pulls Substack RSS at build via lib/feeds.ts
    videos.astro    # Pulls YouTube Atom feed at build via lib/feeds.ts
    blueprints/
      index.astro              # Listing of both blueprints
      [slug]/
        index.astro            # Article page (renders markdown body)
        thanks.astro           # Post-signup confirmation + checklist link
  styles/
    tokens.css      # CSS custom properties for the brand palette + type scale

public/
  _redirects        # Cloudflare Pages 301 rules (legacy /ebooks → /blueprints)
  downloads/        # Checklist PDFs (Strength-Based, IEP Launchkit)
  images/           # Site imagery — headshot, hero photo, system step icons,
                    # blueprint thumbnails
  favicon.svg

dist/               # Build output (generated; in .gitignore, not shipped)
```

Astro generates routes automatically from `src/pages/`. Each `.astro` file becomes an HTML page.

---

## 9. Status of forms + feeds (as of 2026-05-08)

### ✅ Resolved — live and working
- **Substack RSS** at `https://mjohnsonn2v.substack.com/feed` — wired into `/blog` at build time
- **YouTube Atom feed** for channel `UCxqQ0lkVfy7GTQAs8zXgH4g` (handle `@n2ved`) — wired into `/videos` at build time
- **Substack subscribe forms** on `/blog` and on every Blueprint email gate — wired to the Substack iframe embed; subscriptions land directly in Mike's Substack list
- **Legacy `/ebooks/*` URLs** — 301-redirect to `/blueprints/*` via `public/_redirects`

### Open items not blocking launch
| File | Item |
|---|---|
| `src/components/landing/EbookCta.astro` | Strength-Based section is now a CTA-button to `/blueprints/strength-based/` (no form) — kept simple per client brief |
| `src/components/videos/VideosCta.astro` | Bottom YouTube subscribe CTA is a button (no form) — per client brief |
| `src/pages/blueprints/[slug]/thanks.astro` | Course-waitlist form posts via `mailto:mjohnson@n2ved.com`. Marked `TODO: replace mailto with Formspree or backend endpoint when chosen` |
| `src/components/PlaceholderImage.astro` | Component is still in the codebase as a fallback for any future Blueprint thumbnail that's added before its image asset arrives — only renders if `thumbnailFile` frontmatter is unset |

---

## 11. Quick confirmation answers (per Alex's email)

| Question | Answer |
|---|---|
| Static site or web app? | **Static** — Astro `output: "static"`, no SSR, no server process |
| Reproducible from source files? | Yes — `npm install && npm run build` regenerates `dist/` entirely from `src/` |
| Build command | `npm run build` |
| Output directory | `dist/` |
| Requires any secrets/env vars? | No — fully static, no runtime secrets |
| Will content auto-update? | No — each Substack post or YouTube video requires a rebuild to appear |

---

## 12. How to rebuild + redeploy in 60 seconds

```bash
# Clone or unzip the project
cd mikey-site

# Install dependencies
npm install

# Build
npm run build

# Upload dist/ to any static host
# Example — Cloudflare Pages:
npx wrangler@4 pages deploy dist --project-name=mikey-site
```

That's it. No database migrations, no environment configuration, no build servers.
