import './Blogs.css';
import { Link } from 'react-router';
import { blogPosts, hasPublishableBlog } from '../content/publication';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { formatPublicationDate } from '../utils/publicationUtils';
import brandMarketCommerce640 from '../assets/insights-brand-market-commerce-640.webp';
import brandMarketCommerce960 from '../assets/insights-brand-market-commerce-960.webp';
import brandMarketCommerce1440 from '../assets/insights-brand-market-commerce-1440.webp';
import packagingToPurchase640 from '../assets/insights-packaging-to-purchase-640.webp';
import packagingToPurchase960 from '../assets/insights-packaging-to-purchase-960.webp';
import packagingToPurchase1440 from '../assets/insights-packaging-to-purchase-1440.webp';

const editorialArtworkBySlug = Object.freeze({
  'coordinating-brand-market-commerce': {
    alt: 'Abstract signal geometry connecting brand, market, and commerce systems',
    src: brandMarketCommerce1440,
    srcSet: `${brandMarketCommerce640} 640w, ${brandMarketCommerce960} 960w, ${brandMarketCommerce1440} 1440w`,
  },
  'from-packaging-to-purchase': {
    alt: 'Abstract signal geometry tracing a consumer-brand launch from packaging to purchase',
    src: packagingToPurchase960,
    srcSet: `${packagingToPurchase640} 640w, ${packagingToPurchase960} 960w, ${packagingToPurchase1440} 1440w`,
  },
});

const BlogStory = ({ post, index, variant }) => {
  const artwork = editorialArtworkBySlug[post.slug];
  const isFeature = variant === 'feature';
  const titleClassName = isFeature ? 'blog-feature-title' : 'blog-supporting-title';
  const descriptionClassName = isFeature
    ? 'blog-feature-description'
    : 'blog-supporting-description';

  return (
    <article className={isFeature ? 'blog-feature-story' : 'blog-supporting-story'}>
      <Link
        to={`/blogs/${post.slug}`}
        className="blog-story-link-wrapper"
        aria-label={`Read ${post.title}`}
      >
        {artwork && (
          <div className="blog-story-artwork">
            <img
              src={artwork.src}
              srcSet={artwork.srcSet}
              sizes={isFeature
                ? '(max-width: 900px) calc(100vw - 3rem), 640px'
                : '(max-width: 900px) calc(100vw - 3rem), 440px'}
              alt={artwork.alt}
              width="1440"
              height="810"
              loading={isFeature ? 'eager' : 'lazy'}
              fetchPriority={isFeature ? 'high' : undefined}
              decoding="async"
            />
          </div>
        )}

        <div className="blog-story-header">
          <span className="blog-story-index" aria-hidden="true">
            {String(index).padStart(2, '0')}
          </span>
          <p className="blog-story-meta">
            <span className="blog-story-category">{post.category}</span>
            <span className="blog-story-meta-divider">·</span>
            <span className="blog-story-reading-time">
              {post.readingTime?.text || '5 min read'}
            </span>
          </p>
        </div>

        <h2 className={titleClassName}>{post.title}</h2>
        <p className={descriptionClassName}>{post.description}</p>

        <div className="blog-story-footer">
          <time className="blog-story-date" dateTime={post.publishedAt}>
            {formatPublicationDate(post.publishedAt)}
          </time>
          <span className="blog-story-action">
            Read article <span className="blog-story-arrow" aria-hidden="true">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
};

const Blogs = ({ posts = blogPosts }) => {
  const isOpen = hasPublishableBlog(posts);
  const publishedPosts = posts;

  useSEO({
    ...getRouteMetadata('/blogs'),
    robots: isOpen ? 'index, follow' : 'noindex, follow',
  });

  const featurePost = publishedPosts[0];
  const supportingPost = publishedPosts[1];
  const remainingPosts = publishedPosts.slice(2);

  return (
    <div className="blogs-page fade-in">
      <section className="section blogs-hero">
        <div className="container blogs-container">
          <header className="blogs-header">
            <div className="blogs-heading-group">
              <span className="section-subtitle">Publication</span>
              <h1 className="blogs-title">Insights</h1>
              <p className="blogs-tagline">Thinking from the work of building brands.</p>
            </div>
            <p className="blogs-intro">
              Notes on branding, market execution, commerce, and the operating decisions that connect them.
            </p>
          </header>

          {isOpen ? (
            <div className="blogs-editorial-grid">
              {featurePost && <BlogStory post={featurePost} index={1} variant="feature" />}
              {supportingPost && <BlogStory post={supportingPost} index={2} variant="supporting" />}

              {remainingPosts.length > 0 && (
                <div className="blogs-additional-grid">
                  {remainingPosts.map((post, idx) => (
                    <BlogStory key={post.slug} post={post} index={idx + 3} variant="supporting" />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="blogs-preparing" role="status">
              <p>
                We are preparing evidence-backed articles from our brand-building
                and client-support work. This section will open after two complete
                articles are approved for publication.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
