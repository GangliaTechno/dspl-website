import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BlogPost from '../BlogPost';
import { createBlogPostMetadata } from '../blogPostModel';
import useSEO from '../../hooks/useSEO';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));
vi.mock('../../utils/analytics', () => ({
  trackEvent: vi.fn(),
  sanitizePath: (p) => p || '/',
}));

const mockPost = (slug) => ({
  _id: `id-${slug}`,
  slug,
  category: 'Branding',
  title: 'A structured brand system',
  description: 'How repeatable brand decisions are documented.',
  publishedAt: '2026-08-20',
  _updatedAt: '2026-08-20',
  readingTime: { minutes: 5, text: '5 min read', wordCount: 1000 },
  headings: [
    { blockKey: 'h1', id: 'start-with-decisions', text: 'Start with decisions', level: 2 },
    { blockKey: 'h2', id: 'make-it-usable', text: 'Make it usable', level: 2 },
  ],
  body: [
    {
      _key: 'h1',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 's1', _type: 'span', text: 'Start with decisions' }],
    },
    {
      _key: 'b1',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 's2', _type: 'span', text: 'Write the decision down.' }],
    },
    {
      _key: 'h2',
      _type: 'block',
      style: 'h2',
      children: [{ _key: 's3', _type: 'span', text: 'Make it usable' }],
    },
    {
      _key: 'b2',
      _type: 'block',
      style: 'normal',
      children: [{ _key: 's4', _type: 'span', text: 'Test the system in application.' }],
    },
  ],
});

const renderPost = (slug, posts) =>
  render(
    <MemoryRouter initialEntries={[`/blogs/${slug}`]}>
      <Routes>
        <Route path="/blogs/:slug" element={<BlogPost posts={posts} />} />
      </Routes>
    </MemoryRouter>,
  );

describe('BlogPost', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([
    ['missing', []],
    ['missing', [mockPost('one'), mockPost('two')]],
    ['one', [mockPost('one')]], // only 1 post -> gate closed
  ])('renders the normal 404 for unavailable slug %s', (slug, posts) => {
    renderPost(slug, posts);
    expect(screen.getByRole('heading', { level: 1, name: 'Page Not Found' })).toBeInTheDocument();
  });

  it('renders structured Portable Text content and TOC anchor links without HTML injection', () => {
    const postRecord = mockPost('brand-systems');
    const secondRecord = {
      ...mockPost('second'),
      slug: 'second-article',
      title: 'Second Article',
      description: 'A distinct description for the second article.',
    };

    renderPost('BRAND-SYSTEMS', [postRecord, secondRecord]);

    expect(screen.getByRole('heading', { level: 1, name: 'A structured brand system' })).toBeInTheDocument();
    expect(screen.getByText('August 20, 2026')).toBeInTheDocument();
    expect(screen.getAllByText('5 min read').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('How repeatable brand decisions are documented.')).toBeInTheDocument();

    // Table of Contents
    const toc = screen.getByRole('navigation', { name: /Table of Contents/i });
    expect(within(toc).getByRole('link', { name: 'Start with decisions' })).toHaveAttribute(
      'href',
      '#start-with-decisions',
    );
    expect(within(toc).getByRole('link', { name: 'Make it usable' })).toHaveAttribute(
      'href',
      '#make-it-usable',
    );

    // Reading column
    expect(screen.getByRole('heading', { level: 2, name: 'Start with decisions' })).toHaveAttribute(
      'id',
      'start-with-decisions',
    );
    expect(screen.getByText('Write the decision down.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Make it usable' })).toHaveAttribute(
      'id',
      'make-it-usable',
    );
    expect(screen.getByText('Test the system in application.')).toBeInTheDocument();

    // Related article and Start a project bridge
    expect(screen.getByText('Continue reading')).toBeInTheDocument();
    expect(screen.getByText('Second Article')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/start');

    expect(document.querySelector('[dangerouslySetInnerHTML]')).not.toBeInTheDocument();
    expect(useSEO).toHaveBeenCalledWith(createBlogPostMetadata(postRecord, true));
  });

  it('creates canonical article metadata with BlogPosting schema including dateModified', () => {
    const metadata = createBlogPostMetadata(mockPost('brand-systems'), true);

    expect(metadata).toEqual(
      expect.objectContaining({
        canonical: '/blogs/brand-systems',
        type: 'article',
        robots: 'index, follow',
        title: 'A structured brand system | Dashapatmaja Solutions Pvt Ltd',
        imageAlt:
          'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
        imageWidth: 1200,
        imageHeight: 630,
        structuredData: expect.objectContaining({
          '@type': 'BlogPosting',
          headline: 'A structured brand system',
          datePublished: '2026-08-20',
          dateModified: '2026-08-20',
        }),
      }),
    );
  });

  it('normalizes a projected SEO image and uses its dimensions with a truthful title alt', () => {
    const metadata = createBlogPostMetadata(
      {
        ...mockPost('brand-systems'),
        mainImage: {
          alt: 'Packaging and product study for a consumer brand',
          asset: {
            url: 'https://cdn.example.com/brand-systems.jpg',
            metadata: { dimensions: { width: 1200, height: 800 } },
          },
        },
        seo: {
          ogImage: {
            asset: {
              url: 'https://cdn.example.com/brand-systems-share.jpg',
              metadata: { dimensions: { width: 1600, height: 900 } },
            },
          },
        },
      },
      true,
    );

    expect(metadata).toMatchObject({
      image: 'https://cdn.example.com/brand-systems-share.jpg',
      imageAlt: 'A structured brand system',
      imageWidth: 1600,
      imageHeight: 900,
      structuredData: expect.objectContaining({
        image: 'https://cdn.example.com/brand-systems-share.jpg',
      }),
    });
  });

  it('uses projected main-image alt text and preserves legacy string image URLs', () => {
    const projectedMainImage = createBlogPostMetadata(
      {
        ...mockPost('brand-systems'),
        mainImage: {
          alt: 'Packaging and product study for a consumer brand',
          asset: {
            url: '/images/brand-systems.jpg',
            metadata: { dimensions: { width: 1200, height: 800 } },
          },
        },
      },
      true,
    );
    const legacySeoImage = createBlogPostMetadata(
      {
        ...mockPost('legacy-image'),
        seo: {
          ogImage: 'https://cdn.example.com/legacy-share.jpg',
          ogImageAlt: 'Legacy editorial share image',
        },
      },
      true,
    );

    expect(projectedMainImage).toMatchObject({
      image: '/images/brand-systems.jpg',
      imageAlt: 'Packaging and product study for a consumer brand',
      imageWidth: 1200,
      imageHeight: 800,
      structuredData: expect.objectContaining({
        image: 'https://dashapatmaja.in/images/brand-systems.jpg',
      }),
    });
    expect(legacySeoImage).toMatchObject({
      image: 'https://cdn.example.com/legacy-share.jpg',
      imageAlt: 'Legacy editorial share image',
      structuredData: expect.objectContaining({
        image: 'https://cdn.example.com/legacy-share.jpg',
      }),
    });
    expect(legacySeoImage).not.toHaveProperty('imageWidth');
    expect(legacySeoImage).not.toHaveProperty('imageHeight');
  });

  it.each([
    ['SEO', { seo: { ogImage: { _type: 'image', asset: { _ref: 'image-unresolved' } } } }],
    ['main', { mainImage: { _type: 'image', asset: { _ref: 'image-unresolved' } } }],
  ])('safely falls back to the homepage image for an unresolved %s image reference', (_label, imageFields) => {
    const metadata = createBlogPostMetadata({ ...mockPost('unresolved-image'), ...imageFields }, true);

    expect(metadata).toMatchObject({
      image: 'https://dashapatmaja.in/og-home-2026.jpg',
      imageAlt: 'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
      imageWidth: 1200,
      imageHeight: 630,
      structuredData: expect.objectContaining({
        image: 'https://dashapatmaja.in/og-home-2026.jpg',
      }),
    });
  });
});
