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

  it('renders the editorial Insights publication with 2 launch articles in asymmetric layout', () => {
    renderBlogs([
      mockPost(
        'coordinating-brand-market-commerce',
        'Branding',
        'Coordinating Brand, Market, and Commerce as One System',
      ),
      mockPost(
        'from-packaging-to-purchase',
        'E-commerce',
        'From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter',
      ),
    ]);

    expect(screen.getByRole('heading', { level: 1, name: 'Insights' })).toBeInTheDocument();
    expect(screen.getByText('Thinking from the work of building brands.')).toBeInTheDocument();
    const masthead = screen.getByRole('banner');
    const headingGroup = masthead.querySelector('.blogs-heading-group');
    expect(headingGroup).not.toBeNull();
    expect(within(headingGroup).getByText('Publication')).toBeInTheDocument();
    expect(within(headingGroup).getByRole('heading', { level: 1, name: 'Insights' })).toBeInTheDocument();
    expect(within(headingGroup).getByText('Thinking from the work of building brands.')).toBeInTheDocument();
    expect(masthead.querySelector('.blogs-intro')).not.toBe(headingGroup);
    expect(masthead.querySelector('.blogs-intro')).toHaveTextContent(
      'Notes on branding, market execution, commerce, and the operating decisions that connect them.',
    );

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    // Feature article
    const feature = articles[0];
    expect(within(feature).getByText('01')).toBeInTheDocument();
    expect(within(feature).getByText('Branding')).toBeInTheDocument();
    expect(within(feature).getByText('5 min read')).toBeInTheDocument();
    expect(within(feature).getByText('Coordinating Brand, Market, and Commerce as One System')).toBeInTheDocument();
    expect(within(feature).getByText('August 20, 2026')).toBeInTheDocument();
    expect(within(feature).getByRole('link', { name: /Coordinating Brand/i })).toHaveAttribute(
      'href',
      '/blogs/coordinating-brand-market-commerce',
    );

    // Supporting article
    const supporting = articles[1];
    expect(within(supporting).getByText('02')).toBeInTheDocument();
    expect(within(supporting).getByText('E-commerce')).toBeInTheDocument();
    expect(within(supporting).getByText('From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter')).toBeInTheDocument();
    expect(within(supporting).getByRole('link', { name: /From Packaging to Purchase/i })).toHaveAttribute(
      'href',
      '/blogs/from-packaging-to-purchase',
    );

    // Does not show unnecessary search or category filter pills for 2 posts
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();

    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({ robots: 'index, follow' }),
    );
  });

  it('maps approved artwork by canonical slug with responsive image delivery attributes', () => {
    renderBlogs([
      mockPost(
        'coordinating-brand-market-commerce',
        'Branding',
        'Coordinating Brand, Market, and Commerce as One System',
      ),
      mockPost(
        'from-packaging-to-purchase',
        'E-commerce',
        'From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter',
      ),
    ]);

    const feature = screen
      .getByRole('heading', { name: /Coordinating Brand/i })
      .closest('article');
    const featureImage = within(feature).getByRole('img', {
      name: 'Abstract signal geometry connecting brand, market, and commerce systems',
    });
    expect(featureImage).toHaveAttribute(
      'src',
      expect.stringContaining('insights-brand-market-commerce-1440'),
    );
    expect(featureImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-brand-market-commerce-640'),
    );
    expect(featureImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-brand-market-commerce-960'),
    );
    expect(featureImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-brand-market-commerce-1440'),
    );
    expect(featureImage).toHaveAttribute('width', '1440');
    expect(featureImage).toHaveAttribute('height', '810');
    expect(featureImage).toHaveAttribute('loading', 'eager');
    expect(featureImage).toHaveAttribute('fetchpriority', 'high');
    expect(featureImage).toHaveAttribute('decoding', 'async');
    expect(featureImage).toHaveAttribute(
      'sizes',
      '(max-width: 900px) calc(100vw - 3rem), 640px',
    );

    const supporting = screen
      .getByRole('heading', { name: /From Packaging/i })
      .closest('article');
    const supportingImage = within(supporting).getByRole('img', {
      name: 'Abstract signal geometry tracing a consumer-brand launch from packaging to purchase',
    });
    expect(supportingImage).toHaveAttribute(
      'src',
      expect.stringContaining('insights-packaging-to-purchase-960'),
    );
    expect(supportingImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-packaging-to-purchase-640'),
    );
    expect(supportingImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-packaging-to-purchase-960'),
    );
    expect(supportingImage).toHaveAttribute(
      'srcset',
      expect.stringContaining('insights-packaging-to-purchase-1440'),
    );
    expect(supportingImage).toHaveAttribute('width', '1440');
    expect(supportingImage).toHaveAttribute('height', '810');
    expect(supportingImage).toHaveAttribute('loading', 'lazy');
    expect(supportingImage).toHaveAttribute('decoding', 'async');
    expect(supportingImage).toHaveAttribute(
      'sizes',
      '(max-width: 900px) calc(100vw - 3rem), 440px',
    );
  });

  it('keeps canonical artwork mapped correctly when launch stories are reversed', () => {
    renderBlogs([
      mockPost(
        'from-packaging-to-purchase',
        'E-commerce',
        'From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter',
      ),
      mockPost(
        'coordinating-brand-market-commerce',
        'Branding',
        'Coordinating Brand, Market, and Commerce as One System',
      ),
    ]);

    const packagingStory = screen
      .getByRole('heading', { name: /From Packaging to Purchase/i })
      .closest('article');
    expect(within(packagingStory).getByRole('img')).toHaveAttribute(
      'alt',
      'Abstract signal geometry tracing a consumer-brand launch from packaging to purchase',
    );
    expect(within(packagingStory).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('insights-packaging-to-purchase-960'),
    );

    const brandStory = screen
      .getByRole('heading', { name: /Coordinating Brand/i })
      .closest('article');
    expect(within(brandStory).getByRole('img')).toHaveAttribute(
      'alt',
      'Abstract signal geometry connecting brand, market, and commerce systems',
    );
    expect(within(brandStory).getByRole('img')).toHaveAttribute(
      'src',
      expect.stringContaining('insights-brand-market-commerce-1440'),
    );
  });

  it('keeps future unmapped posts usable as text-only stories', () => {
    renderBlogs([
      mockPost(
        'coordinating-brand-market-commerce',
        'Branding',
        'Coordinating Brand, Market, and Commerce as One System',
      ),
      mockPost(
        'from-packaging-to-purchase',
        'E-commerce',
        'From Packaging to Purchase: Why Consumer-Brand Launch Handoffs Matter',
      ),
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
});
