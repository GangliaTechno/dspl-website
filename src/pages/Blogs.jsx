import './Blogs.css';
import { Link } from 'react-router';
import { blogPosts, hasPublishableBlog } from '../content/publication';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { formatPublicationDate } from '../utils/publicationUtils';
import { resolvePublicationArtwork } from '../utils/publicationArtwork';

const StoryKicker = ({ category, readingTime }) => (
  <p className="blog-story-meta">
    <span className="blog-story-category">{category}</span>
    <span className="blog-story-meta-divider">·</span>
    <span className="blog-story-reading-time">
      {readingTime?.text || '5 min read'}
    </span>
  </p>
);

const StoryFooter = ({ publishedAt }) => (
  <div className="blog-story-footer">
    <time className="blog-story-date" dateTime={publishedAt}>
      {formatPublicationDate(publishedAt)}
    </time>
    <span className="blog-story-action">
      Read article <span className="blog-story-arrow" aria-hidden="true">→</span>
    </span>
  </div>
);

const FeaturedStory = ({ post }) => {
  const artwork = resolvePublicationArtwork(post.mainImage, post.title);

  return (
    <article className="blog-feature-story">
      <Link
        to={`/blogs/${post.slug}`}
        className={`blog-story-link-wrapper ${
          !artwork ? 'blog-story-link-wrapper--text-only' : ''
        }`}
        aria-label={`Read ${post.title}`}
      >
        {artwork && (
          <div className="blog-feature-artwork">
            <img
              src={artwork.src}
              srcSet={artwork.srcSet}
              sizes={artwork.srcSet ? '(max-width: 960px) calc(100vw - 3rem), 680px' : undefined}
              alt={artwork.alt}
              width={artwork.width || 1440}
              height={artwork.height || 810}
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        )}

        <div className="blog-feature-body">
          <StoryKicker category={post.category} readingTime={post.readingTime} />
          <h2 className="blog-feature-title">{post.title}</h2>
          <p className="blog-feature-description">{post.description}</p>
          <StoryFooter publishedAt={post.publishedAt} />
        </div>
      </Link>
    </article>
  );
};

const SupportingStory = ({ post }) => {
  const artwork = resolvePublicationArtwork(post.mainImage, post.title);

  return (
    <article className="blog-supporting-story">
      <Link
        to={`/blogs/${post.slug}`}
        className="blog-story-link-wrapper"
        aria-label={`Read ${post.title}`}
      >
        <StoryKicker category={post.category} readingTime={post.readingTime} />
        <h2 className="blog-supporting-title">{post.title}</h2>

        {artwork && (
          <div className="blog-supporting-artwork">
            <img
              src={artwork.src}
              srcSet={artwork.srcSet}
              sizes={artwork.srcSet ? '(max-width: 960px) calc(100vw - 3rem), 1160px' : undefined}
              alt={artwork.alt}
              width={artwork.width || 1440}
              height={artwork.height || 810}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <p className="blog-supporting-description">{post.description}</p>
        <StoryFooter publishedAt={post.publishedAt} />
      </Link>
    </article>
  );
};

const ArchiveStory = ({ post }) => {
  const artwork = resolvePublicationArtwork(post.mainImage, post.title);

  return (
    <article className="blog-archive-story">
      <Link
        to={`/blogs/${post.slug}`}
        className="blog-story-link-wrapper"
        aria-label={`Read ${post.title}`}
      >
        {artwork && (
          <div className="blog-archive-artwork">
            <img
              src={artwork.src}
              srcSet={artwork.srcSet}
              sizes={artwork.srcSet ? '(max-width: 960px) calc(100vw - 3rem), 440px' : undefined}
              alt={artwork.alt}
              width={artwork.width || 1440}
              height={artwork.height || 810}
              loading="lazy"
              decoding="async"
            />
          </div>
        )}

        <StoryKicker category={post.category} readingTime={post.readingTime} />
        <h2 className="blog-supporting-title">{post.title}</h2>
        <p className="blog-supporting-description">{post.description}</p>
        <StoryFooter publishedAt={post.publishedAt} />
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
              <span className="section-subtitle">Insights</span>
              <h1 className="blogs-title">Thinking from the work of building brands.</h1>
            </div>
            <p className="blogs-intro">
              Notes on branding, market execution, commerce, and the operating decisions that connect them.
            </p>
          </header>

          {isOpen ? (
            <div className="blogs-editorial-flow">
              {featurePost && <FeaturedStory post={featurePost} />}
              {supportingPost && <SupportingStory post={supportingPost} />}

              {remainingPosts.length > 0 && (
                <div className="blogs-additional-grid">
                  {remainingPosts.map((post) => (
                    <ArchiveStory key={post.slug} post={post} />
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
