/**
 * Build-time feed parsers for Substack RSS (used by /blog) and YouTube Atom
 * (used by /videos). Pure functions — no Astro types, no DOM. Fixture-testable
 * with a string argument.
 *
 * The fetch wrappers `fetchSubstackPosts` and `fetchYoutubeVideos` apply a 5s
 * abort timeout and silently return an empty array on any failure (network,
 * timeout, parse error, non-2xx status). Pages decide whether to fall back to
 * a static array or render an empty state.
 */

// ─── Shared types ─────────────────────────────────────────────────────────────

export interface Post {
  title: string;
  excerpt: string;
  pubDate: string;
  link: string;
}

export interface VideoEntry {
  title: string;
  duration: string;
  published: string;
  videoId: string;
  thumbnailUrl?: string;
}

const FETCH_TIMEOUT_MS = 15000;

// ─── Substack RSS (parse + fetch) ─────────────────────────────────────────────

/**
 * Extract the text content of the first matching XML tag, stripping CDATA.
 */
function extractTag(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}(?:[^>]*)>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (!m) return '';
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
}

/**
 * Parse Substack RSS XML into a list of Posts. Items missing both title and
 * link are skipped. HTML in <description> is stripped and excerpt is capped at
 * 220 chars.
 */
export function parseSubstackRss(xml: string): Post[] {
  const itemMatches = xml.matchAll(/<item>([\s\S]*?)<\/item>/gi);
  const posts: Post[] = [];

  for (const match of itemMatches) {
    const item = match[1];
    const title = extractTag(item, 'title');
    const link = extractTag(item, 'link') || extractTag(item, 'guid');
    const pubDate = extractTag(item, 'pubDate');
    const rawExcerpt = extractTag(item, 'description');
    const excerpt = rawExcerpt
      .replace(/<[^>]+>/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 220);

    if (title && link) {
      posts.push({ title, excerpt, pubDate, link });
    }
  }

  return posts;
}

/**
 * Fetch and parse Substack RSS at build time. Returns [] on any failure.
 * Caller decides fallback behaviour.
 */
export async function fetchSubstackPosts(substackUrl: string): Promise<Post[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${substackUrl.replace(/\/$/, '')}/feed`, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; N2VBot/1.0; +https://n2ved.com)',
        'Accept': 'application/rss+xml, application/xml, text/xml, */*',
      },
    });
    if (!res.ok) {
      console.error('[SUBSTACK FETCH] HTTP', res.status, res.statusText);
      return [];
    }
    const xml = await res.text();
    return parseSubstackRss(xml);
  } catch (err) {
    console.error('[SUBSTACK FETCH FAILED]', err);
    return [];
  } finally {
    clearTimeout(timer);
  }
}

// ─── YouTube Atom (parse + fetch) ─────────────────────────────────────────────

function extractText(xml: string, tag: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

function extractAttr(xml: string, tag: string, attr: string): string {
  const m = xml.match(new RegExp(`<${tag}[^>]*\\s${attr}="([^"]*)"`, 'i'));
  return m ? m[1] : '';
}

/**
 * Parse a YouTube channel Atom feed XML into a list of VideoEntry. Duration
 * isn't present in Atom feeds and is left empty. Entries without a videoId or
 * title are skipped.
 */
export function parseYoutubeAtom(xml: string): VideoEntry[] {
  const entryRegex = /<entry[\s>]([\s\S]*?)<\/entry>/gi;
  const entries: VideoEntry[] = [];
  let match: RegExpExecArray | null;

  while ((match = entryRegex.exec(xml)) !== null) {
    const block = match[1];
    const videoId = extractText(block, 'yt:videoId');
    const title = extractText(block, 'title');
    const published = extractText(block, 'published').slice(0, 10); // YYYY-MM-DD
    const thumbnailUrl = extractAttr(block, 'media:thumbnail', 'url');

    if (!videoId || !title) continue;

    entries.push({
      videoId,
      title,
      published,
      duration: '',
      thumbnailUrl: thumbnailUrl || undefined,
    });
  }

  return entries;
}

/**
 * Fetch and parse a YouTube channel's Atom feed at build time. Returns [] on
 * any failure or if no channelId is provided. Caller decides fallback.
 */
export async function fetchYoutubeVideos(
  channelId: string | null | undefined,
): Promise<VideoEntry[]> {
  if (!channelId || channelId === 'PLACEHOLDER_CHANNEL_ID') return [];

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(
  `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
  {
    signal: controller.signal,
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; N2VBot/1.0; +https://n2ved.com)',
      'Accept': 'application/atom+xml, application/xml, text/xml, */*',
    },
  },
);
    if (!res.ok) return [];
    const xml = await res.text();
    return parseYoutubeAtom(xml);
  } catch {
    return [];
  } finally {
    clearTimeout(timer);
  }
}
