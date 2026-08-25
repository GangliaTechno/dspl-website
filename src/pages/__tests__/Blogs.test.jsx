import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Blogs from '../Blogs';
import useSEO from '../../hooks/useSEO';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));

const mockPost = (slug, category, title = `${category} title`) => ({
  slug,
  category,
  title,
  description: `Description for ${title}`,
  publishedAt: '2026-08-20',
  readingTime: { minutes: 5, text: '5 min read', wordCount: 1000 },
  headings: [{ blockKey: 'h1', id: 'section-1', text: 'Section 1', level: 2 }],
  body: [{ _key: 'b1', _type: 'block', children: [{ text: 'Body paragraph' }] }],
});

const fssaiPost = () => ({
  ...mockPost(
    'fssai-labelling-requirements-checklist-2026',
    'Compliance',
    'FSSAI Labelling Requirements for Packaged Food',
  ),
  readingTime: { minutes: 14, text: '14 min read', wordCount: 3500 },
  mainImage: {
    alt: 'Packaged food artwork and back-of-pack label panels arranged for a compliance review.',
    asset: {
      url: '/insights/fssai-labelling-v1-1440.webp',
      metadata: { dimensions: { width: 1440, height: 810, aspectRatio: 16 / 9 } },
    },
    responsive: {
      640: '/insights/fssai-labelling-v1-640.webp',
      960: '/insights/fssai-labelling-v1-960.webp',
      1440: '/insights/fssai-labelling-v1-1440.webp',
    },
  },
});

const legalPost = () => ({
  ...mockPost(
    'legal-metrology-packaged-commodity-rules-india',
    'Compliance',
    'Legal Metrology Packaged Commodity Rules',
  ),
  readingTime: { minutes: 15, text: '15 min read', wordCount: 3800 },
  mainImage: {
    alt: 'Pack artwork and packaged commodities being checked with precision measuring tools for declaration sizing.',
    asset: {
      url: '/insights/legal-metrology-v1-1440.webp',
      metadata: { dimensions: { width: 1440, height: 810, aspectRatio: 16 / 9 } },
    },
    responsive: {
      640: '/insights/legal-metrology-v1-640.webp',
      960: '/insights/legal-metrology-v1-960.webp',
      1440: '/insights/legal-metrology-v1-1440.webp',
    },
  },
});

const renderBlogs = (posts) =>
  render(
    <MemoryRouter initialEntries={['/blogs']}>
      <Blogs posts={posts} />
    </MemoryRouter>,
  );

describe('Blogs (Insights) Page', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([[[]], [[mockPost('one', 'Branding')]]])(
    'keeps publication closed when fewer than 2 posts exist',
    (posts) => {
      renderBlogs(posts);

      expect(screen.getByText(/preparing evidence-backed articles/i)).toBeInTheDocument();
      expect(screen.queryByRole('article')).not.toBeInTheDocument();
      expect(useSEO).toHaveBeenCalledWith(
        expect.objectContaining({ robots: 'noindex, follow' }),
      );
    },
  );

  it('renders the editorial Insights publication with 2 compliance articles in asymmetric layout', () => {
    renderBlogs([fssaiPost(), legalPost()]);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Thinking from the work of building brands.' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Insights')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Notes on branding, market execution, commerce, and the operating decisions that connect them.',
      ),
    ).toBeInTheDocument();

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    // Feature article — FSSAI
    const feature = articles[0];
    expect(within(feature).queryByText('01')).not.toBeInTheDocument();
    expect(within(feature).getByText('Compliance')).toBeInTheDocument();
    expect(within(feature).getByText('14 min read')).toBeInTheDocument();
    expect(
      within(feature).getByText('FSSAI Labelling Requirements for Packaged Food'),
    ).toBeInTheDocument();
    expect(within(feature).getByText('August 20, 2026')).toBeInTheDocument();
    expect(
      within(feature).getByRole('link', { name: /FSSAI/i }),
    ).toHaveAttribute('href', '/blogs/fssai-labelling-requirements-checklist-2026');

    // Supporting article — Legal Metrology
    const supporting = articles[1];
    expect(within(supporting).queryByText('02')).not.toBeInTheDocument();
    expect(within(supporting).getByText('15 min read')).toBeInTheDocument();
    expect(
      within(supporting).getByText('Legal Metrology Packaged Commodity Rules'),
    ).toBeInTheDocument();
    expect(
      within(supporting).getByRole('link', { name: /Legal Metrology/i }),
    ).toHaveAttribute('href', '/blogs/legal-metrology-packaged-commodity-rules-india');

    // Does not show search or category filter pills
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();

    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({ robots: 'index, follow' }),
    );
  });

  it('delivers a 3-entry srcSet from mainImage.responsive for featured compliance cover', () => {
    renderBlogs([fssaiPost(), legalPost()]);

    const featureImg = screen.getByRole('img', {
      name: 'Packaged food artwork and back-of-pack label panels arranged for a compliance review.',
    });

    expect(featureImg).toHaveAttribute('src', '/insights/fssai-labelling-v1-1440.webp');
    expect(featureImg).toHaveAttribute(
      'srcset',
      '/insights/fssai-labelling-v1-640.webp 640w, /insights/fssai-labelling-v1-960.webp 960w, /insights/fssai-labelling-v1-1440.webp 1440w',
    );
    expect(featureImg).toHaveAttribute('width', '1440');
    expect(featureImg).toHaveAttribute('height', '810');
    expect(featureImg).toHaveAttribute('loading', 'eager');
    expect(featureImg).toHaveAttribute('fetchpriority', 'high');
    expect(featureImg).toHaveAttribute('decoding', 'async');
    expect(featureImg).toHaveAttribute('sizes', '(max-width: 960px) calc(100vw - 3rem), 680px');
  });

  it('delivers a 3-entry srcSet from mainImage.responsive for supporting compliance cover', () => {
    renderBlogs([fssaiPost(), legalPost()]);

    const supportingImg = screen.getByRole('img', {
      name: 'Pack artwork and packaged commodities being checked with precision measuring tools for declaration sizing.',
    });

    expect(supportingImg).toHaveAttribute('src', '/insights/legal-metrology-v1-1440.webp');
    expect(supportingImg).toHaveAttribute(
      'srcset',
      '/insights/legal-metrology-v1-640.webp 640w, /insights/legal-metrology-v1-960.webp 960w, /insights/legal-metrology-v1-1440.webp 1440w',
    );
    expect(supportingImg).toHaveAttribute('width', '1440');
    expect(supportingImg).toHaveAttribute('height', '810');
    expect(supportingImg).toHaveAttribute('loading', 'lazy');
    expect(supportingImg).toHaveAttribute('decoding', 'async');
    expect(supportingImg).toHaveAttribute('sizes', '(max-width: 960px) calc(100vw - 3rem), 1160px');
  });

  it('keeps future unmapped posts usable as text-only stories in the archive grid', () => {
    renderBlogs([
      fssaiPost(),
      legalPost(),
      mockPost('future-unmapped-post', 'Operations', 'A future text-only insight'),
    ]);

    const futureStory = screen
      .getByRole('heading', { name: /A future text-only insight/i })
      .closest('article');
    expect(within(futureStory).getByText('A future text-only insight')).toBeInTheDocument();
    expect(within(futureStory).getByText(/Description for A future text-only insight/)).toBeInTheDocument();
    expect(within(futureStory).queryByRole('img')).not.toBeInTheDocument();
    expect(within(futureStory).getByRole('link', { name: /A future text-only insight/i })).toHaveAttribute(
      'href',
      '/blogs/future-unmapped-post',
    );
  });

  it('renders 4 published stories across feature, supporting, and archive grid', () => {
    const testPosts = [
      fssaiPost(),
      legalPost(),
      mockPost('brand', 'Branding', 'Coordinating Brand'),
      mockPost('packaging', 'E-commerce', 'From Packaging to Purchase'),
    ];
    renderBlogs(testPosts);

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(4);

    expect(articles[0]).toHaveClass('blog-feature-story');
    expect(articles[1]).toHaveClass('blog-supporting-story');
    expect(articles[2]).toHaveClass('blog-archive-story');
    expect(articles[3]).toHaveClass('blog-archive-story');

    expect(within(articles[0]).getByText('FSSAI Labelling Requirements for Packaged Food')).toBeInTheDocument();
    expect(within(articles[1]).getByText('Legal Metrology Packaged Commodity Rules')).toBeInTheDocument();
    expect(within(articles[2]).getByText('Coordinating Brand')).toBeInTheDocument();
    expect(within(articles[3]).getByText('From Packaging to Purchase')).toBeInTheDocument();
  });

  it('resolves content-first artwork with Sanity CDN src and no srcSet when no responsive map', () => {
    const postWithSanityImage = {
      ...mockPost('custom-artwork-post', 'Branding', 'Custom Artwork Post'),
      mainImage: {
        alt: 'Custom art photography',
        asset: {
          url: 'https://cdn.sanity.io/images/proj/dataset/custom.jpg',
          metadata: {
            dimensions: { width: 1200, height: 630 },
          },
        },
      },
    };
    const secondPost = mockPost('second-post', 'Marketing', 'Second Post');

    renderBlogs([postWithSanityImage, secondPost]);

    const feature = screen.getByRole('heading', { name: /Custom Artwork Post/i }).closest('article');
    const image = within(feature).getByRole('img', { name: 'Custom art photography' });

    expect(image).toHaveAttribute('src', 'https://cdn.sanity.io/images/proj/dataset/custom.jpg');
    expect(image).toHaveAttribute('width', '1200');
    expect(image).toHaveAttribute('height', '630');
    // No responsive map on raw mainImage → resolveArtwork returns undefined srcSet
    expect(image).not.toHaveAttribute('srcset');
  });
});
