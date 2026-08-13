import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import BlogPost from '../BlogPost';
import { createBlogPostMetadata } from '../blogPostModel';
import useSEO from '../../hooks/useSEO';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));
vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

const post = (slug, status = 'approved') => ({
  slug,
  category: 'Branding',
  status,
  title: 'A structured brand system',
  description: 'How repeatable brand decisions are documented.',
  publishedAt: '2026-08-13',
  sections: [
    { heading: 'Start with decisions', paragraphs: ['Write the decision down.'] },
    { heading: 'Make it usable', paragraphs: ['Test the system in application.'] },
  ],
});

const renderPost = (slug, posts) => render(
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
    ['missing', [post('one'), post('two')]],
    ['one', [post('one')]],
  ])('renders the normal 404 for unavailable slug %s', (slug, posts) => {
    renderPost(slug, posts);
    expect(screen.getByRole('heading', { level: 1, name: 'Page Not Found' })).toBeInTheDocument();
  });

  it('renders structured approved content without HTML injection', () => {
    renderPost('BRAND-SYSTEMS', [post('brand-systems'), post('second')]);

    expect(screen.getByRole('heading', { level: 1, name: 'A structured brand system' })).toBeInTheDocument();
    expect(screen.getByText('2026-08-13')).toBeInTheDocument();
    expect(screen.getByText('How repeatable brand decisions are documented.')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Start with decisions' })).toBeInTheDocument();
    expect(screen.getByText('Test the system in application.')).toBeInTheDocument();
    expect(document.querySelector('[dangerouslySetInnerHTML]')).not.toBeInTheDocument();
    expect(useSEO).toHaveBeenCalledWith(createBlogPostMetadata(post('brand-systems'), true));
  });

  it('creates canonical article metadata and remains noindex before the gate opens', () => {
    expect(createBlogPostMetadata(post('brand-systems'), false)).toEqual(expect.objectContaining({
      canonical: '/blogs/brand-systems',
      type: 'article',
      robots: 'noindex, follow',
      title: 'A structured brand system | Dashapatmaja Solutions Pvt Ltd',
    }));
  });
});
