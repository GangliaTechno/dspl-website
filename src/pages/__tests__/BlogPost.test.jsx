import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router';
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

    // Table of Contents (both desktop and mobile navigation)
    const tocs = screen.getAllByRole('navigation', { name: /Table of Contents/i });
    expect(tocs).toHaveLength(2);
    for (const toc of tocs) {
      expect(within(toc).getByRole('link', { name: 'Start with decisions' })).toHaveAttribute(
        'href',
        '#start-with-decisions',
      );
      expect(within(toc).getByRole('link', { name: 'Make it usable' })).toHaveAttribute(
        'href',
        '#make-it-usable',
      );
    }

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
        imageAlt:
          'Dashapatmaja Solutions Pvt Ltd — consumer brand building and growth',
        imageWidth: 1200,
        imageHeight: 630,
        structuredData: expect.objectContaining({
          '@context': 'https://schema.org',
          '@graph': expect.arrayContaining([
            expect.objectContaining({
              '@type': 'BlogPosting',
              headline: 'A structured brand system',
              datePublished: '2026-08-20',
              dateModified: '2026-08-20',
            }),
          ]),
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
        '@graph': expect.arrayContaining([
          expect.objectContaining({
            image: 'https://cdn.example.com/brand-systems-share.jpg',
          }),
        ]),
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
      image: 'https://dashapatmaja.in/images/brand-systems.jpg',
      imageAlt: 'Packaging and product study for a consumer brand',
      imageWidth: 1200,
      imageHeight: 800,
      structuredData: expect.objectContaining({
        '@graph': expect.arrayContaining([
          expect.objectContaining({
            image: 'https://dashapatmaja.in/images/brand-systems.jpg',
          }),
        ]),
      }),
    });
    expect(legacySeoImage).toMatchObject({
      image: 'https://cdn.example.com/legacy-share.jpg',
      imageAlt: 'Legacy editorial share image',
      structuredData: expect.objectContaining({
        '@graph': expect.arrayContaining([
          expect.objectContaining({
            image: 'https://cdn.example.com/legacy-share.jpg',
          }),
        ]),
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
        '@graph': expect.arrayContaining([
          expect.objectContaining({
            image: 'https://dashapatmaja.in/og-home-2026.jpg',
          }),
        ]),
      }),
    });
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
    expect(structuredData['@graph']).toHaveLength(4);

    const blogPosting = structuredData['@graph'].find((n) => n['@type'] === 'BlogPosting');
    const faqPage = structuredData['@graph'].find((n) => n['@type'] === 'FAQPage');
    const breadcrumbs = structuredData['@graph'].find((n) => n['@type'] === 'BreadcrumbList');
    const org = structuredData['@graph'].find((n) => n['@type']?.includes('Organization'));

    expect(org).toBeDefined();
    expect(breadcrumbs).toBeDefined();
    expect(blogPosting['@type']).toBe('BlogPosting');
    expect(blogPosting.author).toEqual([
      { '@type': 'Person', name: 'Namesh Malarout', jobTitle: 'Director, Dashapatmaja Solutions Pvt Ltd' },
      { '@type': 'Person', name: 'Pawan Shetty' },
    ]);
    expect(blogPosting.publisher).toEqual({
      '@id': 'https://dashapatmaja.in/#organization',
    });

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

  it('renders semantic hero figure with responsive srcSet and caption when mainImage is present', () => {
    const postWithHero = {
      ...mockPost('hero-post'),
      mainImage: {
        alt: 'Label inspection artwork',
        caption: 'Field review checklist for packaging compliance.',
        asset: {
          url: '/insights/fssai-labelling-v1-1440.webp',
          metadata: { dimensions: { width: 1440, height: 810 } },
        },
        responsive: {
          640: '/insights/fssai-labelling-v1-640.webp',
          960: '/insights/fssai-labelling-v1-960.webp',
          1440: '/insights/fssai-labelling-v1-1440.webp',
        },
      },
    };
    const secondPost = mockPost('second-post');
    const { container } = renderPost('hero-post', [postWithHero, secondPost]);

    const hero = container.querySelector('.blog-post-hero');
    expect(hero).toBeInTheDocument();

    const img = within(hero).getByRole('img', { name: 'Label inspection artwork' });
    expect(img).toHaveAttribute('src', '/insights/fssai-labelling-v1-1440.webp');
    expect(img).toHaveAttribute(
      'srcset',
      '/insights/fssai-labelling-v1-640.webp 640w, /insights/fssai-labelling-v1-960.webp 960w, /insights/fssai-labelling-v1-1440.webp 1440w',
    );
    expect(img).toHaveAttribute('sizes', '(max-width: 1199px) calc(100vw - 3rem), 1160px');
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img).toHaveAttribute('decoding', 'async');

    const caption = container.querySelector('.blog-post-hero-caption');
    expect(caption).toHaveTextContent('Field review checklist for packaging compliance.');
  });

  it('renders no hero figure when mainImage is absent', () => {
    const postWithoutHero = mockPost('no-hero');
    const secondPost = mockPost('second-post');
    const { container } = renderPost('no-hero', [postWithoutHero, secondPost]);

    expect(container.querySelector('.blog-post-hero')).not.toBeInTheDocument();
  });

  it('renders native mobile <details> TOC and desktop TOC with matching H2 headings and active link attributes', () => {
    const postWithHeadings = {
      ...mockPost('headings-post'),
      headings: [
        { blockKey: 'h1', id: 'section-one', text: 'Section One', level: 2 },
        { blockKey: 'h2', id: 'section-two', text: 'Section Two', level: 2 },
      ],
    };
    const secondPost = mockPost('second-post');
    const { container } = renderPost('headings-post', [postWithHeadings, secondPost]);

    // Desktop TOC
    const desktopToc = container.querySelector('.blog-toc-sidebar');
    expect(desktopToc).toBeInTheDocument();
    const desktopLinks = desktopToc.querySelectorAll('.blog-toc-link');
    expect(desktopLinks).toHaveLength(2);
    expect(desktopLinks[0]).toHaveAttribute('href', '#section-one');
    expect(desktopLinks[0]).toHaveAttribute('aria-current', 'location');
    expect(desktopLinks[1]).toHaveAttribute('href', '#section-two');
    expect(desktopLinks[1]).not.toHaveAttribute('aria-current');

    // Mobile TOC
    const mobileToc = container.querySelector('.blog-mobile-toc');
    expect(mobileToc).toBeInTheDocument();
    expect(mobileToc.querySelector('summary')).toHaveTextContent('On this page');
    const mobileLinks = mobileToc.querySelectorAll('.blog-toc-link');
    expect(mobileLinks).toHaveLength(2);
    expect(mobileLinks[0]).toHaveTextContent('Section One');
    expect(mobileLinks[1]).toHaveTextContent('Section Two');
  });

  it('keeps the mobile TOC active state in sync with the observed heading', async () => {
    let observerCallback;

    class MockIntersectionObserver {
      constructor(callback) {
        observerCallback = callback;
      }
      observe = vi.fn();
      disconnect = vi.fn();
    }

    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const postWithHeadings = {
      ...mockPost('mobile-active-post'),
    };
    const secondPost = mockPost('second-post');
    const { container } = renderPost('mobile-active-post', [postWithHeadings, secondPost]);

    act(() => {
      observerCallback([
        {
          isIntersecting: true,
          target: document.getElementById('make-it-usable'),
          boundingClientRect: { top: 100 },
        },
      ]);
    });

    await waitFor(() => {
      const mobileLinks = container.querySelector('.blog-mobile-toc').querySelectorAll('.blog-toc-link');
      expect(mobileLinks[1]).toHaveClass('is-active');
      expect(mobileLinks[1]).toHaveAttribute('aria-current', 'location');
      expect(mobileLinks[0]).not.toHaveAttribute('aria-current');
    });

    vi.unstubAllGlobals();
  });

  it('renders related article card with responsive artwork and self-contained classes', () => {
    const mainPost = mockPost('main-post');
    const relatedPost = {
      ...mockPost('related-post'),
      title: 'Related Article Title',
      category: 'Compliance',
      mainImage: {
        alt: 'Related cover image',
        asset: {
          url: '/insights/legal-metrology-v1-1440.webp',
          metadata: { dimensions: { width: 1440, height: 810 } },
        },
        responsive: {
          640: '/insights/legal-metrology-v1-640.webp',
          960: '/insights/legal-metrology-v1-960.webp',
          1440: '/insights/legal-metrology-v1-1440.webp',
        },
      },
    };

    const { container } = renderPost('main-post', [mainPost, relatedPost]);

    const relatedCard = container.querySelector('.blog-related-card');
    expect(relatedCard).toBeInTheDocument();
    expect(relatedCard.querySelector('.blog-related-title')).toHaveTextContent('Related Article Title');
    expect(relatedCard.querySelector('.blog-related-category')).toHaveTextContent('Compliance');

    const relatedImg = relatedCard.querySelector('.blog-related-artwork img');
    expect(relatedImg).toBeInTheDocument();
    expect(relatedImg).toHaveAttribute('src', '/insights/legal-metrology-v1-1440.webp');
    expect(relatedImg).toHaveAttribute('loading', 'lazy');
    expect(relatedImg).toHaveAttribute('alt', '');
    expect(relatedImg).toHaveAttribute('sizes', '(max-width: 768px) calc(100vw - 3rem), 720px');
  });

  it('resets activeHeadingId and updates aria-current when navigating to another article', async () => {
    const postOne = {
      ...mockPost('article-one'),
      title: 'Article One',
      headings: [
        { blockKey: 'h1', id: 'start-with-decisions', text: 'Start with decisions', level: 2 },
        { blockKey: 'h2', id: 'make-it-usable', text: 'Make it usable', level: 2 },
      ],
    };
    const postTwo = {
      ...mockPost('article-two'),
      title: 'Article Two',
      headings: [
        { blockKey: 'h1', id: 'article-two-start', text: 'Article Two Start', level: 2 },
        { blockKey: 'h2', id: 'article-two-end', text: 'Article Two End', level: 2 },
      ],
      body: [
        {
          _key: 'h1',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 's1', _type: 'span', text: 'Article Two Start' }],
        },
        {
          _key: 'h2',
          _type: 'block',
          style: 'h2',
          children: [{ _key: 's2', _type: 'span', text: 'Article Two End' }],
        },
      ],
    };

    const NavButton = () => {
      const navigate = useNavigate();
      return <button onClick={() => navigate('/blogs/article-two')}>Switch to Two</button>;
    };

    const { container } = render(
      <MemoryRouter initialEntries={['/blogs/article-one']}>
        <NavButton />
        <Routes>
          <Route
            path="/blogs/:slug"
            element={<BlogPost posts={[postOne, postTwo]} />}
          />
        </Routes>
      </MemoryRouter>,
    );

    // Initial article
    const desktopTocOne = container.querySelector('.blog-toc-sidebar');
    const linksOne = desktopTocOne.querySelectorAll('.blog-toc-link');
    expect(linksOne[0]).toHaveAttribute('href', '#start-with-decisions');
    expect(linksOne[0]).toHaveAttribute('aria-current', 'location');

    // Trigger navigation
    const switchBtn = screen.getByRole('button', { name: 'Switch to Two' });
    fireEvent.click(switchBtn);

    const desktopTocTwo = container.querySelector('.blog-toc-sidebar');
    const linksTwo = desktopTocTwo.querySelectorAll('.blog-toc-link');
    expect(linksTwo[0]).toHaveAttribute('href', '#article-two-start');
    expect(linksTwo[0]).toHaveAttribute('aria-current', 'location');
    expect(linksTwo[1]).toHaveAttribute('href', '#article-two-end');
    expect(linksTwo[1]).not.toHaveAttribute('aria-current');
  });

  it('attaches and disconnects IntersectionObserver on mount, async update, and unmount', () => {
    const observeMock = vi.fn();
    const disconnectMock = vi.fn();

    class MockIntersectionObserver {
      constructor(callback) {
        this.callback = callback;
      }
      observe = observeMock;
      disconnect = disconnectMock;
      unobserve = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const post = mockPost('observer-test');
    const secondPost = mockPost('second-post');

    const { unmount } = renderPost('observer-test', [post, secondPost]);

    expect(observeMock).toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();

    unmount();
    expect(disconnectMock).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });

  it('deterministically updates active TOC item on fast scroll using geometry resolver when IntersectionObserver does not intersect', async () => {
    class MockIntersectionObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const getBoundingClientRectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      if (this.id === 'start-with-decisions') {
        return { top: -250, bottom: -150, left: 0, right: 800, width: 800, height: 100 };
      }
      if (this.id === 'make-it-usable') {
        return { top: 90, bottom: 190, left: 0, right: 800, width: 800, height: 100 };
      }
      return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    });

    const post = mockPost('fast-scroll-test');
    const secondPost = mockPost('second-post');
    const { container } = renderPost('fast-scroll-test', [post, secondPost]);

    fireEvent.scroll(window);

    await waitFor(() => {
      const desktopLinks = container.querySelector('.blog-toc-sidebar').querySelectorAll('.blog-toc-link');
      expect(desktopLinks[1]).toHaveAttribute('aria-current', 'location');
      expect(desktopLinks[1]).toHaveClass('is-active');
      expect(desktopLinks[0]).not.toHaveAttribute('aria-current');

      const mobileLinks = container.querySelector('.blog-mobile-toc').querySelectorAll('.blog-toc-link');
      expect(mobileLinks[1]).toHaveAttribute('aria-current', 'location');
      expect(mobileLinks[1]).toHaveClass('is-active');
      expect(mobileLinks[0]).not.toHaveAttribute('aria-current');
    });

    getBoundingClientRectSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('updates active TOC item on hashchange and resize events matching heading geometry', async () => {
    class MockIntersectionObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const getBoundingClientRectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      if (this.id === 'start-with-decisions') {
        return { top: -400, bottom: -300, left: 0, right: 800, width: 800, height: 100 };
      }
      if (this.id === 'make-it-usable') {
        return { top: 50, bottom: 150, left: 0, right: 800, width: 800, height: 100 };
      }
      return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    });

    const post = mockPost('hashchange-resize-test');
    const secondPost = mockPost('second-post');
    const { container } = renderPost('hashchange-resize-test', [post, secondPost]);

    fireEvent(window, new Event('hashchange'));
    fireEvent(window, new Event('resize'));

    await waitFor(() => {
      const desktopLinks = container.querySelector('.blog-toc-sidebar').querySelectorAll('.blog-toc-link');
      expect(desktopLinks[1]).toHaveAttribute('aria-current', 'location');
      expect(desktopLinks[0]).not.toHaveAttribute('aria-current');

      const mobileLinks = container.querySelector('.blog-mobile-toc').querySelectorAll('.blog-toc-link');
      expect(mobileLinks[1]).toHaveAttribute('aria-current', 'location');
      expect(mobileLinks[0]).not.toHaveAttribute('aria-current');
    });

    getBoundingClientRectSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('falls back to first heading when all headings are below reading anchor', async () => {
    class MockIntersectionObserver {
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const getBoundingClientRectSpy = vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
      if (this.id === 'start-with-decisions') {
        return { top: 350, bottom: 450, left: 0, right: 800, width: 800, height: 100 };
      }
      if (this.id === 'make-it-usable') {
        return { top: 850, bottom: 950, left: 0, right: 800, width: 800, height: 100 };
      }
      return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
    });

    const post = mockPost('fallback-test');
    const secondPost = mockPost('second-post');
    const { container } = renderPost('fallback-test', [post, secondPost]);

    fireEvent.scroll(window);

    await waitFor(() => {
      const desktopLinks = container.querySelector('.blog-toc-sidebar').querySelectorAll('.blog-toc-link');
      expect(desktopLinks[0]).toHaveAttribute('aria-current', 'location');
      expect(desktopLinks[1]).not.toHaveAttribute('aria-current');

      const mobileLinks = container.querySelector('.blog-mobile-toc').querySelectorAll('.blog-toc-link');
      expect(mobileLinks[0]).toHaveAttribute('aria-current', 'location');
      expect(mobileLinks[1]).not.toHaveAttribute('aria-current');
    });

    getBoundingClientRectSpy.mockRestore();
    vi.unstubAllGlobals();
  });

  it('cleans up scroll, resize, hashchange listeners, IntersectionObserver, and scheduled animation frames on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const cancelAnimationFrameSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const disconnectMock = vi.fn();

    class MockIntersectionObserver {
      observe = vi.fn();
      disconnect = disconnectMock;
      unobserve = vi.fn();
    }
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver);

    const post = mockPost('cleanup-test');
    const secondPost = mockPost('second-post');

    const { unmount } = renderPost('cleanup-test', [post, secondPost]);

    fireEvent.scroll(window);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('hashchange', expect.any(Function));
    expect(disconnectMock).toHaveBeenCalled();
    expect(cancelAnimationFrameSpy).toHaveBeenCalled();

    removeEventListenerSpy.mockRestore();
    cancelAnimationFrameSpy.mockRestore();
    vi.unstubAllGlobals();
  });
});
