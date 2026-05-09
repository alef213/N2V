# Newsletter Platform — Substack Alternatives

> **Context (2026-05-06):** Substack signup is blocked by a verification process for ~72 hours. While we wait, here are 4 viable alternatives ranked against Mike's needs.

## Mike's actual needs (from intake call)

1. **Free newsletter list** — capture parents from `/ebooks` opt-ins, send weekly tips
2. **Paid product layer eventually** — courses, ebook upsells, possible forum
3. **Personality-front** — Mike wants the brand front but is OK as a face
4. **Authority site primary** — newsletter is a satellite, not the front door
5. **Owns the list** — must be exportable; no platform lock-in

## Ranked recommendations

### 1. Beehiiv — RECOMMENDED if Mike wants growth + paid tier later
- **Free up to 2,500 subs**, then paid plans start ~$39/mo.
- Built-in **referral program** (huge for parent-to-parent word-of-mouth).
- Native **paid newsletter** + **boost network** (other newsletters pay to recommend you).
- Custom domain on free tier (e.g. `letters.n2ved.com`).
- One-line embed → drops directly into the existing 4 stub forms on n2v.
- **Why for Mike:** parent-network virality is a real lever for this niche; Beehiiv is the only platform that has referral built in for free. He's not a writer-first creator — he's a teacher who'll eventually upsell programs, which is exactly what Beehiiv optimizes for.

### 2. Kit (formerly ConvertKit) — RECOMMENDED if Mike wants tight ebook funnels
- **Free up to 10,000 subs** (huge runway).
- Best-in-class **lead-magnet automation** — auto-deliver the 3 ebook PDFs by tag.
- Visual sequence builder for the "ebook → 5-day email course → upsell" funnel Mike described.
- Tagging means we can segment by ebook ("Habit Blueprint readers" vs "Gift Audit readers").
- **Why for Mike:** if the lead-magnet → course funnel is the priority, Kit beats Beehiiv on automation. Slightly less polished public newsletter UI.

### 3. Ghost (self-hosted or Ghost Pro) — only if Mike wants a content fortress
- Open-source, owns the database, full design control.
- Ghost Pro starts at $9/mo for up to 500 members. Self-hosted = ~$5/mo VPS.
- Includes **paid memberships, courses, community gates** — closest to a one-platform-runs-everything setup.
- **Why NOT for Mike right now:** overkill for v1. Migrating later is straightforward (CSV export). Park this on the roadmap for when Mike adds the parent forum.

### 4. Substack — if the verification clears
- Frictionless to start, biggest discovery network for new writers.
- Limitations: no custom domain on free tier, **30 cents per email collected via referrals to revenue-share partners**, less suited for ebook funnels.
- **Verdict:** fine as a writing surface, weak as a lead-magnet funnel. If the verification clears, pair it with Kit (Substack publishes, Kit handles ebook delivery).

## Recommendation

**Pick Beehiiv now.** It satisfies the v1 needs (free list, embed forms, custom subdomain), is free up to 2,500 subs, and has the referral mechanic that compounds in a parent-network niche. The 4 stub forms in the codebase swap to a Beehiiv embed in ~10 minutes.

If Mike strongly prefers writing-first discovery (Substack-style network effects), do **Beehiiv for the list + Substack for public posts** once verification clears. They aren't mutually exclusive.

## Wire-up steps once a platform is picked

1. Create the publication, grab the embed/iframe HTML.
2. Edit `src/data/links.json` → add `newsletterEmbedUrl` and `newsletterPlatform`.
3. Replace the 4 stub `<form action="#">` blocks (search: `grep -rn "email platform" src/components/`).
4. Rebuild + redeploy. Live in <15 min.

## Open questions for Mike

- Does he want **paid tier on day 1** (Beehiiv shines), or just a free list?
- Are the **3 ebooks** the only lead magnets, or will he add more? (Affects whether Kit's tagging is worth the slightly clunkier UI.)
- Custom subdomain preference: `letters.n2ved.com`, `newsletter.n2ved.com`, or just `n2ved.com/newsletter`?
