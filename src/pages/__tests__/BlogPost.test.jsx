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

  it('renders authors byline, FAQs, references, and article closing CTA when present', () => {
    const compliancePost = {
      ...mockPost('compliance-article'),
      category: 'Compliance',
      title: 'FSSAI Labelling Requirements',
      authors: [
        { _key: 'a1', name: 'Namesh Malarout', role: 'Director, Dashapatmaja Solutions Pvt Ltd' },
        { _key: 'a2', name: 'Pawan Shetty' },
      ],
      faqs: [
        { _key: 'f1', question: 'Do I need FSSAI approval before printing?', answer: 'No, FSSAI does not pre-approve labels.' },
      ],
      references: [
        { _key: 'r1', text: 'FSSAI Labelling Regulations 2020', url: 'https://www.fssai.gov.in' },
        { _key: 'r2', text: 'Supreme Court Case 2023' },
      ],
      closingCta: {
        heading: 'Getting a pack ready for print?',
        text: 'We have taken six food SKUs through compliance.',
        label: 'Get pack reviewed',
        href: '/start',
      },
    };

    const secondPost = mockPost('second-post');
    const { container } = renderPost('compliance-article', [compliancePost, secondPost]);

    // Authors byline
    expect(container.querySelector('.blog-post-byline-line')).toHaveTextContent('By Namesh Malarout and Pawan Shetty');
    expect(container.querySelector('.blog-post-author-name')).toHaveTextContent('Namesh Malarout');
    expect(container.querySelector('.blog-post-author-role')).toHaveTextContent('Director, Dashapatmaja Solutions Pvt Ltd');

    // FAQs section
    expect(screen.getByRole('heading', { level: 2, name: 'Frequently asked questions' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Do I need FSSAI approval before printing?' })).toBeInTheDocument();

    // References section
    expect(screen.getByRole('heading', { level: 2, name: 'References' })).toBeInTheDocument();
    const linkRef = screen.getByRole('link', { name: 'FSSAI Labelling Regulations 2020' });
    expect(linkRef).toHaveAttribute('href', 'https://www.fssai.gov.in');
    expect(linkRef).toHaveAttribute('target', '_blank');
    expect(screen.getByText('Supreme Court Case 2023')).toBeInTheDocument();

    // Article closing CTA
    expect(screen.getByRole('heading', { level: 3, name: 'Getting a pack ready for print?' })).toBeInTheDocument();
    expect(screen.getByText('We have taken six food SKUs through compliance.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get pack reviewed' })).toHaveAttribute('href', '/start');
  });

  it('creates canonical article metadata with BlogPosting schema including dateModified', () => {
    const metadata = createBlogPostMetadata(mockPost('brand-systems'), true);

    expect(metadata).toEqual(
      expect.objectContaining({
        canonical: '/blogs/brand-systems',
        type: 'article',
        robots: 'index, follow',
        title: 'A structured brand system | Dashapatmaja Solutions Pvt Ltd',
        structuredData: expect.objectContaining({
          '@type': 'BlogPosting',
          headline: 'A structured brand system',
          datePublished: '2026-08-20',
          dateModified: '2026-08-20',
        }),
      }),
    );
  });

  it('creates @graph structured data with FAQPage and Person authors for compliance articles', () => {
    const post = {
      ...mockPost('fssai-post'),
      authors: [
        { name: 'Namesh Malarout', role: 'Director, Dashapatmaja Solutions Pvt Ltd' },
        { name: 'Pawan Shetty' },
      ],
      faqs: [
        { question: 'Q1?', answer: 'A1.' },
      ],
    };

    const metadata = createBlogPostMetadata(post, true);
    const structuredData = metadata.structuredData;

    expect(structuredData).toHaveProperty('@graph');
    expect(structuredData['@graph']).toHaveLength(2);

    const [blogPosting, faqPage] = structuredData['@graph'];
    expect(blogPosting['@type']).toBe('BlogPosting');
    expect(blogPosting.author).toEqual([
      { '@type': 'Person', name: 'Namesh Malarout', jobTitle: 'Director, Dashapatmaja Solutions Pvt Ltd' },
      { '@type': 'Person', name: 'Pawan Shetty' },
    ]);

    expect(faqPage).toEqual({
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Q1?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A1.',
          },
        },
      ],
    });
  });
});
