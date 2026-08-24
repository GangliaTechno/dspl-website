/**
 * Publication Utilities for DSPL Insights.
 * Handles deterministic heading slugification, TOC heading map generation,
 * reading-time calculation, and semantic date formatting.
 */

/**
 * Converts a heading string into a clean, URL-safe anchor slug.
 * Ensures duplicate slugs receive deterministic numeric suffixes (-2, -3, etc.).
 *
 * @param {string} text
 * @param {Set<string>} [existingIds=new Set()]
 * @returns {string}
 */
export function slugifyHeading(text = '', existingIds = new Set()) {
  const base = text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';

  let uniqueSlug = base;
  let counter = 2;
  while (existingIds.has(uniqueSlug)) {
    uniqueSlug = `${base}-${counter}`;
    counter += 1;
  }
  existingIds.add(uniqueSlug);
  return uniqueSlug;
}

/**
 * Extracts text from a block or span element.
 *
 * @param {object} block
 * @returns {string}
 */
function extractBlockText(block) {
  if (!block) return '';
  if (typeof block === 'string') return block;

  if (block._type === 'dataTable') {
    const headers = Array.isArray(block.headers)
      ? block.headers.join(' ')
      : '';

    const rows = Array.isArray(block.rows)
      ? block.rows
          .flatMap((row) => row.cells || [])
          .join(' ')
      : '';

    return `${block.caption || ''} ${headers} ${rows}`.trim();
  }

  if (Array.isArray(block.children)) {
    return block.children
      .map((child) => (typeof child === 'string' ? child : child?.text || ''))
      .join(' ');
  }
  return block.text || '';
}

/**
 * Builds a synchronized heading map and key-to-id dictionary from Portable Text blocks.
 * Used identically by PortableTextBody renderer and Table of Contents navigation.
 *
 * @param {Array<object>} [blocks=[]]
 * @returns {{ headings: Array<{ blockKey: string, id: string, text: string, level: number }>, keyToId: Record<string, string> }}
 */
export function buildHeadingMap(blocks = []) {
  const existingIds = new Set();
  const headings = [];
  const keyToId = {};

  if (!Array.isArray(blocks)) {
    return { headings, keyToId };
  }

  blocks.forEach((block, index) => {
    if (block?._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = extractBlockText(block).trim();
      if (!text) return;

      const level = block.style === 'h2' ? 2 : 3;
      const blockKey = block._key || `heading-block-${index}`;
      const id = slugifyHeading(text, existingIds);

      headings.push({ blockKey, id, text, level });
      keyToId[blockKey] = id;
    }
  });

  return { headings, keyToId };
}

/**
 * Extracts H2 headings from Portable Text blocks for the Table of Contents.
 *
 * @param {Array<object>} [blocks=[]]
 * @returns {Array<{ blockKey: string, id: string, text: string, level: number }>}
 */
export function extractHeadingsFromBlocks(blocks = []) {
  const { headings } = buildHeadingMap(blocks);
  return headings.filter((h) => h.level === 2);
}

/**
 * Deterministically calculates word count and estimated reading time from blocks.
 *
 * @param {Array<object>|string} content - Portable text blocks or string text
 * @param {number} [wordsPerMinute=200]
 * @returns {{ minutes: number, text: string, wordCount: number }}
 */
export function calculateReadingTime(content, wordsPerMinute = 200) {
  let fullText = '';

  if (typeof content === 'string') {
    fullText = content;
  } else if (Array.isArray(content)) {
    fullText = content.map(extractBlockText).join(' ');
  } else if (content && typeof content === 'object') {
    fullText = extractBlockText(content);
  }

  const words = fullText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));

  return {
    minutes,
    text: `${minutes} min read`,
    wordCount,
  };
}

/**
 * Formats an ISO date (YYYY-MM-DD or full timestamp) to a natural human-readable date.
 * E.g. "2026-08-20" -> "August 20, 2026"
 *
 * @param {string} isoDate
 * @returns {string}
 */
export function formatPublicationDate(isoDate) {
  if (!isoDate) return '';
  const dateObj = new Date(isoDate);
  if (Number.isNaN(dateObj.getTime())) return isoDate;

  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
