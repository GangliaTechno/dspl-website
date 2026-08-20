import { describe, expect, it } from 'vitest';
import {
  buildHeadingMap,
  calculateReadingTime,
  extractHeadingsFromBlocks,
  formatPublicationDate,
  slugifyHeading,
} from '../publicationUtils';

describe('publicationUtils', () => {
  describe('slugifyHeading', () => {
    it('creates clean URL-safe slugs', () => {
      expect(slugifyHeading('Why the handoffs matter')).toBe('why-the-handoffs-matter');
      expect(slugifyHeading('Product Information & Packaging: The 100% Rule!')).toBe(
        'product-information-packaging-the-100-rule',
      );
      expect(slugifyHeading('   Coordinating Execution   ')).toBe('coordinating-execution');
    });

    it('handles duplicate slugs deterministically', () => {
      const existing = new Set();
      expect(slugifyHeading('Key takeaways', existing)).toBe('key-takeaways');
      expect(slugifyHeading('Key takeaways', existing)).toBe('key-takeaways-2');
      expect(slugifyHeading('Key takeaways', existing)).toBe('key-takeaways-3');
    });
  });

  describe('buildHeadingMap & extractHeadingsFromBlocks', () => {
    const blocks = [
      { _key: 'b1', _type: 'block', style: 'normal', children: [{ text: 'Intro' }] },
      { _key: 'h1', _type: 'block', style: 'h2', children: [{ text: 'First Section' }] },
      { _key: 'b2', _type: 'block', style: 'normal', children: [{ text: 'Body' }] },
      { _key: 'h2', _type: 'block', style: 'h3', children: [{ text: 'Subsection' }] },
      { _key: 'h3', _type: 'block', style: 'h2', children: [{ text: 'First Section' }] }, // Duplicate
    ];

    it('builds synchronized heading map and key-to-id dictionary', () => {
      const { headings, keyToId } = buildHeadingMap(blocks);

      expect(headings).toHaveLength(3);
      expect(headings[0]).toEqual({
        blockKey: 'h1',
        id: 'first-section',
        text: 'First Section',
        level: 2,
      });
      expect(headings[1]).toEqual({
        blockKey: 'h2',
        id: 'subsection',
        text: 'Subsection',
        level: 3,
      });
      expect(headings[2]).toEqual({
        blockKey: 'h3',
        id: 'first-section-2',
        text: 'First Section',
        level: 2,
      });

      expect(keyToId).toEqual({
        h1: 'first-section',
        h2: 'subsection',
        h3: 'first-section-2',
      });
    });

    it('extractHeadingsFromBlocks filters to H2s for TOC', () => {
      const tocHeadings = extractHeadingsFromBlocks(blocks);
      expect(tocHeadings).toHaveLength(2);
      expect(tocHeadings.map((h) => h.id)).toEqual(['first-section', 'first-section-2']);
    });
  });

  describe('calculateReadingTime', () => {
    it('calculates reading time at 200 words per minute', () => {
      const shortText = 'This is a short post with ten words in total.';
      expect(calculateReadingTime(shortText)).toEqual({
        minutes: 1,
        text: '1 min read',
        wordCount: 10,
      });

      // 450 words should be 3 min read (Math.ceil(450 / 200) = 3)
      const fourHundredFiftyWords = Array(450).fill('word').join(' ');
      expect(calculateReadingTime(fourHundredFiftyWords)).toEqual({
        minutes: 3,
        text: '3 min read',
        wordCount: 450,
      });
    });

    it('calculates reading time across Portable Text blocks', () => {
      const blocks = [
        { _type: 'block', children: [{ text: Array(250).fill('alpha').join(' ') }] },
        { _type: 'block', children: [{ text: Array(250).fill('beta').join(' ') }] },
      ];
      expect(calculateReadingTime(blocks)).toEqual({
        minutes: 3,
        text: '3 min read',
        wordCount: 500,
      });
    });
  });

  describe('formatPublicationDate', () => {
    it('formats ISO dates to human-readable format', () => {
      expect(formatPublicationDate('2026-08-20')).toBe('August 20, 2026');
      expect(formatPublicationDate('2026-08-20T08:00:00.000Z')).toBe('August 20, 2026');
      expect(formatPublicationDate('2024-01-05')).toBe('January 5, 2024');
    });

    it('handles empty or invalid inputs gracefully', () => {
      expect(formatPublicationDate('')).toBe('');
      expect(formatPublicationDate('invalid-date')).toBe('invalid-date');
    });
  });
});
