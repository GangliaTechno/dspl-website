/**
 * Resolves editorial publication artwork from a normalized mainImage object.
 *
 * Used across the Insights publication (/blogs listing cards, article hero,
 * and related story cards). Only produces a 3-entry srcSet when all three
 * responsive breakpoint URLs (640, 960, 1440) are valid non-empty strings.
 *
 * @param {object|null} mainImage
 * @param {string} [fallbackAlt='']
 * @returns {{ src: string, srcSet?: string, alt: string, caption?: string|null, width: number, height: number } | null}
 */
export function resolvePublicationArtwork(mainImage, fallbackAlt = '') {
  if (!mainImage?.asset?.url) return null;

  const alt = mainImage.alt || fallbackAlt || '';
  const caption = mainImage.caption || null;
  const dimensions = mainImage.asset.metadata?.dimensions;
  const width = dimensions?.width || 1440;
  const height = dimensions?.height || 810;

  let srcSet = undefined;
  const responsive = mainImage.responsive;
  if (
    responsive &&
    typeof responsive === 'object' &&
    typeof responsive['640'] === 'string' &&
    responsive['640'].trim().length > 0 &&
    typeof responsive['960'] === 'string' &&
    responsive['960'].trim().length > 0 &&
    typeof responsive['1440'] === 'string' &&
    responsive['1440'].trim().length > 0
  ) {
    srcSet = `${responsive['640']} 640w, ${responsive['960']} 960w, ${responsive['1440']} 1440w`;
  }

  return {
    src: mainImage.asset.url,
    ...(srcSet ? { srcSet } : {}),
    alt,
    caption,
    width,
    height,
  };
}
