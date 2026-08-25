import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fontkit from 'fontkit';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const WIDTH = 1200;
const HEIGHT = 630;
const GOLD = '#F5A800';
const WHITE = '#FFFFFF';
const BACKGROUND_PATH = path.join(
  rootDir,
  'src',
  'assets',
  'home-rotation-03-1440.webp',
);
const LOGO_PATH = path.join(rootDir, 'public', 'logo.png');
const FONT_PATH = path.join(
  rootDir,
  'node_modules',
  '@fontsource-variable',
  'geist',
  'files',
  'geist-latin-wght-normal.woff2',
);
const OUTPUT_PATH = path.join(rootDir, 'public', 'og-home-2026.jpg');
const TEXT_WEIGHTS = Object.freeze({
  company: 700,
  headline: 700,
  secondary: 600,
  url: 500,
});

const formatNumber = (value) => {
  const rounded = Number(value.toFixed(4));
  return Object.is(rounded, -0) ? '0' : String(rounded);
};

const createFontResolver = (font) => {
  const variations = new Map();

  try {
    for (const weight of Object.values(TEXT_WEIGHTS)) {
      const variation = font.getVariation({ wght: weight });
      // Shape one representative glyph before accepting the instance. This
      // keeps the output deterministic on fontkit versions that parse the
      // axis metadata but cannot materialize a variable WOFF2 instance.
      variation.layout('W');
      variations.set(weight, variation);
    }
  } catch {
    // fontkit 2.0.4 currently cannot shape this variable WOFF2's cloned cmap.
    // Use the pinned font's default instance consistently rather than allowing
    // a system-font fallback to change the generated card across machines.
    return () => font;
  }

  return (weight) => variations.get(weight) || font;
};

const buildGlyphPaths = ({
  font,
  text,
  x,
  baseline,
  fontSize,
  letterSpacing,
  fill,
  fillOpacity,
}) => {
  let run;
  try {
    run = font.layout(text);
  } catch (cause) {
    throw new Error(`Unable to shape OG card text with the pinned Geist font: ${text}`, {
      cause,
    });
  }

  const scale = fontSize / font.unitsPerEm;
  let cursor = 0;

  return run.glyphs
    .map((glyph, index) => {
      if (!glyph?.path) {
        throw new Error(`Pinned Geist font has no outline for OG card text: ${text}`);
      }

      const position = run.positions[index];
      const translateX = x + cursor + position.xOffset * scale;
      const translateY = baseline - position.yOffset * scale;
      const pathData = glyph.path.toSVG();
      const opacity = fillOpacity === undefined ? '' : ` fill-opacity="${fillOpacity}"`;
      const path = `<path d="${pathData}" transform="translate(${formatNumber(translateX)} ${formatNumber(translateY)}) scale(${formatNumber(scale)} ${formatNumber(-scale)})" fill="${fill}"${opacity} />`;

      cursor += position.xAdvance * scale;
      if (index < run.glyphs.length - 1) {
        cursor += letterSpacing;
      }

      return path;
    })
    .join('');
};

const buildOverlay = ({ logoData, fontForWeight }) => {
  const company = buildGlyphPaths({
    font: fontForWeight(TEXT_WEIGHTS.company),
    text: 'DASHAPATMAJA SOLUTIONS PVT LTD',
    x: 180,
    baseline: 112,
    fontSize: 20,
    letterSpacing: 2,
    fill: GOLD,
  });
  const headline = buildGlyphPaths({
    font: fontForWeight(TEXT_WEIGHTS.headline),
    text: 'We build consumer brands.',
    x: 96,
    baseline: 320,
    fontSize: 68,
    letterSpacing: -1.5,
    fill: WHITE,
  });
  const secondary = buildGlyphPaths({
    font: fontForWeight(TEXT_WEIGHTS.secondary),
    text: 'We help businesses build theirs.',
    x: 98,
    baseline: 391,
    fontSize: 38,
    letterSpacing: -0.5,
    fill: GOLD,
  });
  const url = buildGlyphPaths({
    font: fontForWeight(TEXT_WEIGHTS.url),
    text: 'dashapatmaja.in',
    x: 98,
    baseline: 552,
    fontSize: 24,
    letterSpacing: 0.5,
    fill: WHITE,
    fillOpacity: 0.9,
  });

  return `
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="editorialShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#071014" stop-opacity="0.82" />
      <stop offset="0.55" stop-color="#071014" stop-opacity="0.58" />
      <stop offset="1" stop-color="#071014" stop-opacity="0.66" />
    </linearGradient>
    <linearGradient id="bottomShade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#071014" stop-opacity="0" />
      <stop offset="1" stop-color="#071014" stop-opacity="0.46" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#editorialShade)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bottomShade)" />
  <rect x="88" y="78" width="68" height="68" rx="8" fill="#071014" fill-opacity="0.35" stroke="${GOLD}" stroke-opacity="0.7" />
  <image x="98" y="88" width="48" height="48" preserveAspectRatio="xMidYMid meet" href="data:image/png;base64,${logoData}" />
  ${company}
  ${headline}
  ${secondary}
  <rect x="98" y="423" width="106" height="4" rx="2" fill="${GOLD}" />
  ${url}
</svg>`;
};

const renderOgCard = async () => {
  let fontBuffer;
  try {
    fontBuffer = await readFile(FONT_PATH);
  } catch (cause) {
    throw new Error(
      `Required Geist font file is missing at ${FONT_PATH}. Install dependencies before generating the OG card.`,
      { cause },
    );
  }

  let font;
  try {
    font = fontkit.create(fontBuffer);
  } catch (cause) {
    throw new Error(`Unable to parse the pinned Geist font at ${FONT_PATH}.`, { cause });
  }

  const logoBuffer = await sharp(LOGO_PATH)
    .resize(48, 48, { fit: 'contain' })
    .png()
    .toBuffer();
  const overlay = Buffer.from(
    buildOverlay({
      logoData: logoBuffer.toString('base64'),
      fontForWeight: createFontResolver(font),
    }),
  );

  return sharp(BACKGROUND_PATH)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .composite([{ input: overlay }])
    .jpeg({
      quality: 90,
      chromaSubsampling: '4:4:4',
      mozjpeg: true,
    })
    .toBuffer();
};

const generateOgCard = async ({ check = false } = {}) => {
  const rendered = await renderOgCard();

  if (check) {
    let existing;
    try {
      existing = await readFile(OUTPUT_PATH);
    } catch (cause) {
      throw new Error(
        `Cannot verify ${OUTPUT_PATH} because the generated card is missing. Run npm run generate:og first.`,
        { cause },
      );
    }

    if (!existing.equals(rendered)) {
      throw new Error(
        `OG card bytes differ from ${OUTPUT_PATH}. Run npm run generate:og to refresh the approved asset.`,
      );
    }

    const metadata = await sharp(rendered).metadata();
    console.log(
      `Verified ${path.relative(rootDir, OUTPUT_PATH)} (${metadata.width}x${metadata.height}, ${existing.length} bytes)`,
    );
    return;
  }

  await writeFile(OUTPUT_PATH, rendered);
  const metadata = await sharp(rendered).metadata();

  console.log(
    `Generated ${path.relative(rootDir, OUTPUT_PATH)} (${metadata.width}x${metadata.height}, ${rendered.length} bytes)`,
  );
};

await generateOgCard({ check: process.argv.includes('--check') });
