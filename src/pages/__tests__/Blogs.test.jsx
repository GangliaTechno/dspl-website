import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Blogs from '../Blogs';
import useSEO from '../../hooks/useSEO';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));

const post = (slug, category, status = 'approved') => ({
  slug,
  category,
  status,
  title: `${category} title`,
  description: `${category} description`,
  publishedAt: '2026-08-13',
  sections: [{ heading: 'Section', paragraphs: ['Paragraph'] }],
});

const renderBlogs = (posts) => render(
  <MemoryRouter initialEntries={['/blogs']}>
    <Blogs posts={posts} />
  </MemoryRouter>,
);

describe('Blogs publication gate', () => {
  beforeEach(() => vi.clearAllMocks());

  it.each([[[]], [[post('one', 'Branding')]]])('keeps %s approved posts closed', (posts) => {
    renderBlogs(posts);

    expect(screen.getByText(/preparing evidence-backed articles/i)).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
    expect(screen.queryByText(/Read article/i)).not.toBeInTheDocument();
    expect(useSEO).toHaveBeenCalledWith(expect.objectContaining({ robots: 'noindex, follow' }));
  });

  it('derives filters and cards only from approved records after two approvals', () => {
    renderBlogs([
      post('brand-systems', 'Branding'),
      post('commerce-ops', 'E-commerce'),
      post('draft-note', 'Marketing', 'draft'),
    ]);

    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Branding' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'E-commerce' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Marketing' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Read Branding title' }))
      .toHaveAttribute('href', '/blogs/brand-systems');

    fireEvent.click(screen.getByRole('button', { name: 'Branding' }));
    const card = screen.getByRole('article');
    expect(within(card).getByText('Branding title')).toBeInTheDocument();
    expect(screen.queryByText('E-commerce title')).not.toBeInTheDocument();
    expect(useSEO).toHaveBeenCalledWith(expect.objectContaining({ robots: 'index, follow' }));
  });
});
