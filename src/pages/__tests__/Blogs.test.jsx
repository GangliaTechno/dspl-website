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
      mockPost('brand-systems', 'Branding', 'Coordinating Brand, Market, and Commerce'),
      mockPost('commerce-ops', 'E-commerce', 'From Packaging to Purchase'),
    ]);

    expect(screen.getByRole('heading', { level: 1, name: 'Insights' })).toBeInTheDocument();
    expect(screen.getByText('Thinking from the work of building brands.')).toBeInTheDocument();

    const articles = screen.getAllByRole('article');
    expect(articles).toHaveLength(2);

    // Feature article
    const feature = articles[0];
    expect(within(feature).getByText('01')).toBeInTheDocument();
    expect(within(feature).getByText('Branding')).toBeInTheDocument();
    expect(within(feature).getByText('5 min read')).toBeInTheDocument();
    expect(within(feature).getByText('Coordinating Brand, Market, and Commerce')).toBeInTheDocument();
    expect(within(feature).getByText('August 20, 2026')).toBeInTheDocument();
    expect(within(feature).getByRole('link', { name: /Coordinating Brand/i })).toHaveAttribute(
      'href',
      '/blogs/brand-systems',
    );

    // Supporting article
    const supporting = articles[1];
    expect(within(supporting).getByText('02')).toBeInTheDocument();
    expect(within(supporting).getByText('E-commerce')).toBeInTheDocument();
    expect(within(supporting).getByText('From Packaging to Purchase')).toBeInTheDocument();
    expect(within(supporting).getByRole('link', { name: /From Packaging to Purchase/i })).toHaveAttribute(
      'href',
      '/blogs/commerce-ops',
    );

    // Does not show unnecessary search or category filter pills for 2 posts
    expect(screen.queryByRole('button', { name: 'All' })).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();

    expect(useSEO).toHaveBeenCalledWith(
      expect.objectContaining({ robots: 'index, follow' }),
    );
  });
});
