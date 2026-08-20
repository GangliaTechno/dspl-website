import './Blogs.css';
import { Link } from 'react-router';
import { blogPosts, hasPublishableBlog } from '../content/publication';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { formatPublicationDate } from '../utils/publicationUtils';

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
            <span className="section-subtitle">Publication</span>
            <h1 className="blogs-title">Insights</h1>
            <p className="blogs-tagline">Thinking from the work of building brands.</p>
            <p className="blogs-intro">
              Notes on branding, market execution, commerce, and the operating decisions that connect them.
            </p>
          </header>

          {isOpen ? (
            <div className="blogs-editorial-grid">
              {/* Feature Article (Dominant) */}
              {featurePost && (
                <article className="blog-feature-story" key={featurePost.slug}>
                  <Link
                    to={`/blogs/${featurePost.slug}`}
                    className="blog-story-link-wrapper"
                    aria-label={`Read ${featurePost.title}`}
                  >
                    <div className="blog-story-header">
                      <span className="blog-story-index" aria-hidden="true">
                        01
                      </span>
                      <p className="blog-story-meta">
                        <span className="blog-story-category">{featurePost.category}</span>
                        <span className="blog-story-meta-divider">·</span>
                        <span className="blog-story-reading-time">
                          {featurePost.readingTime?.text || '5 min read'}
                        </span>
                      </p>
                    </div>

                    <h2 className="blog-feature-title">{featurePost.title}</h2>
                    <p className="blog-feature-description">{featurePost.description}</p>

                    <div className="blog-story-footer">
                      <time
                        className="blog-story-date"
                        dateTime={featurePost.publishedAt}
                      >
                        {formatPublicationDate(featurePost.publishedAt)}
                      </time>
                      <span className="blog-story-action">
                        Read article <span className="blog-story-arrow" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              )}

              {/* Supporting Article */}
              {supportingPost && (
                <article className="blog-supporting-story" key={supportingPost.slug}>
                  <Link
                    to={`/blogs/${supportingPost.slug}`}
                    className="blog-story-link-wrapper"
                    aria-label={`Read ${supportingPost.title}`}
                  >
                    <div className="blog-story-header">
                      <span className="blog-story-index" aria-hidden="true">
                        02
                      </span>
                      <p className="blog-story-meta">
                        <span className="blog-story-category">{supportingPost.category}</span>
                        <span className="blog-story-meta-divider">·</span>
                        <span className="blog-story-reading-time">
                          {supportingPost.readingTime?.text || '5 min read'}
                        </span>
                      </p>
                    </div>

                    <h2 className="blog-supporting-title">{supportingPost.title}</h2>
                    <p className="blog-supporting-description">{supportingPost.description}</p>

                    <div className="blog-story-footer">
                      <time
                        className="blog-story-date"
                        dateTime={supportingPost.publishedAt}
                      >
                        {formatPublicationDate(supportingPost.publishedAt)}
                      </time>
                      <span className="blog-story-action">
                        Read article <span className="blog-story-arrow" aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </article>
              )}

              {/* Scalability for future 3+ articles */}
              {remainingPosts.length > 0 && (
                <div className="blogs-additional-grid">
                  {remainingPosts.map((post, idx) => (
                    <article className="blog-supporting-story" key={post.slug}>
                      <Link
                        to={`/blogs/${post.slug}`}
                        className="blog-story-link-wrapper"
                        aria-label={`Read ${post.title}`}
                      >
                        <div className="blog-story-header">
                          <span className="blog-story-index" aria-hidden="true">
                            {String(idx + 3).padStart(2, '0')}
                          </span>
                          <p className="blog-story-meta">
                            <span className="blog-story-category">{post.category}</span>
                            <span className="blog-story-meta-divider">·</span>
                            <span className="blog-story-reading-time">
                              {post.readingTime?.text || '5 min read'}
                            </span>
                          </p>
                        </div>

                        <h2 className="blog-supporting-title">{post.title}</h2>
                        <p className="blog-supporting-description">{post.description}</p>

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
