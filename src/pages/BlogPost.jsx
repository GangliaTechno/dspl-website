import './BlogPost.css';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import {
  blogPosts,
  hasPublishableBlog,
  getBlogPostSummary,
  loadBlogPostContent,
} from '../content/publication';
import useSEO from '../hooks/useSEO';
import NotFound from './NotFound';
import { createBlogPostMetadata, normalizeBlogSlug } from './blogPostModel';
import PortableTextBody from '../components/blog/PortableTextBody';
import FAQAccordion from '../components/FAQAccordion';
import {
  formatPublicationDate,
  buildHeadingMap,
} from '../utils/publicationUtils';

const BlogPost = ({ posts = blogPosts, initialArticle = null }) => {
  const { slug = '' } = useParams();
  const normalizedSlug = normalizeBlogSlug(slug || initialArticle?.slug || '');
  const isBlogOpen = hasPublishableBlog(posts);

  const summary = getBlogPostSummary(normalizedSlug, posts) || initialArticle;
  const [loadedArticle, setLoadedArticle] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (summary && !summary.body && !initialArticle) {
      loadBlogPostContent(normalizedSlug).then((fullContent) => {
        if (isMounted && fullContent) {
          setLoadedArticle(fullContent);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [normalizedSlug, summary, initialArticle]);

  const effectiveArticle =
    (initialArticle?.slug === normalizedSlug ? initialArticle : null) ||
    (summary?.body ? summary : null) ||
    (loadedArticle?.slug === normalizedSlug ? loadedArticle : null) ||
    summary;

  useSEO(
    effectiveArticle && isBlogOpen
      ? createBlogPostMetadata(effectiveArticle, true)
      : null,
  );

  if (!isBlogOpen || !summary) {
    return <NotFound />;
  }

  const headings = summary.headings || [];
  const { keyToId } = buildHeadingMap(effectiveArticle?.body || []);

  const relatedPost = posts.find(
    (p) => normalizeBlogSlug(p.slug) !== normalizedSlug,
  );

  return (
    <div className="blog-post-page fade-in">
      <article className="section blog-post-section">
        <div className="container blog-post-container">
          {/* Breadcrumb Navigation */}
          <nav className="blog-breadcrumb" aria-label="Breadcrumbs">
            <Link to="/blogs" className="blog-breadcrumb-link">
              Insights
            </Link>
            <span className="blog-breadcrumb-divider" aria-hidden="true">
              /
            </span>
            <span className="blog-breadcrumb-current">{summary.category}</span>
          </nav>

          {/* Article Header */}
          <header className="blog-post-header">
            <h1 className="blog-post-title">{summary.title}</h1>
            <p className="blog-post-lead">{summary.description}</p>

            {effectiveArticle?.authors?.length > 0 && (
              <div className="blog-post-byline">
                <p className="blog-post-byline-line">
                  {'By '}
                  {effectiveArticle.authors.map((a, i, arr) => (
                    <span key={a.name}>
                      {i > 0 && (i === arr.length - 1 ? ' and ' : ', ')}
                      {a.name}
                    </span>
                  ))}
                </p>
                {effectiveArticle.authors.some((a) => a.role) && (
                  <ul className="blog-post-byline-roles">
                    {effectiveArticle.authors
                      .filter((a) => a.role)
                      .map((a) => (
                        <li key={a.name} className="blog-post-byline-role">
                          <span className="blog-post-author-name">{a.name}</span>
                          {' · '}
                          <span className="blog-post-author-role">{a.role}</span>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}

            <div className="blog-post-meta">
              <time
                className="blog-post-date"
                dateTime={summary.publishedAt}
              >
                {formatPublicationDate(summary.publishedAt)}
              </time>
              <span className="blog-post-meta-divider">·</span>
              <span className="blog-post-readtime">
                {summary.readingTime?.text || '5 min read'}
              </span>
            </div>
          </header>

          {/* Editorial Content Layout */}
          <div className="blog-post-layout">
            {/* Table of Contents Sidebar (Desktop) */}
            {headings.length > 0 && (
              <aside className="blog-toc-sidebar" aria-label="Table of Contents">
                <div className="blog-toc-sticky">
                  <h2 className="blog-toc-heading">On this page</h2>
                  <nav className="blog-toc-nav" aria-label="Table of Contents">
                    <ul className="blog-toc-list">
                      {headings.map((heading) => (
                        <li key={heading.id} className="blog-toc-item">
                          <a href={`#${heading.id}`} className="blog-toc-link">
                            {heading.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}

            {/* Reading Column */}
            <div className="blog-reading-column">
              <PortableTextBody
                value={effectiveArticle?.body || []}
                keyToId={keyToId}
              />

              {/* FAQs Section */}
              {effectiveArticle?.faqs?.length > 0 && (
                <section className="blog-faq-section" aria-labelledby="blog-faq-heading">
                  <h2 id="blog-faq-heading" className="blog-body-h2">
                    Frequently asked questions
                  </h2>
                  <FAQAccordion
                    faqs={effectiveArticle.faqs.map((f) => ({ q: f.question, a: f.answer }))}
                    namespace={`article-faq-${normalizedSlug}`}
                  />
                </section>
              )}

              {/* References Section */}
              {effectiveArticle?.references?.length > 0 && (
                <section className="blog-references-section" aria-labelledby="blog-refs-heading">
                  <h2 id="blog-refs-heading" className="blog-body-h2">
                    References
                  </h2>
                  <ol className="blog-references-list">
                    {effectiveArticle.references.map((ref, i) => (
                      <li key={ref._key || i} className="blog-reference-item">
                        {ref.url ? (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-body-link"
                          >
                            {ref.text}
                          </a>
                        ) : (
                          ref.text
                        )}
                      </li>
                    ))}
                  </ol>
                </section>
              )}

              {/* End of Article: Continue Reading & Start Project */}
              <footer className="blog-post-footer">
                {relatedPost && (
                  <div className="blog-related-section">
                    <span className="section-subtitle">Continue reading</span>
                    <article className="blog-related-card">
                      <Link
                        to={`/blogs/${relatedPost.slug}`}
                        className="blog-related-link"
                        aria-label={`Read ${relatedPost.title}`}
                      >
                        <p className="blog-story-meta">
                          <span>{relatedPost.category}</span>
                          <span>·</span>
                          <span>{relatedPost.readingTime?.text || '5 min read'}</span>
                        </p>
                        <h3 className="blog-related-title">{relatedPost.title}</h3>
                        <p className="blog-related-description">{relatedPost.description}</p>
                        <span className="blog-story-action">
                          Read article <span aria-hidden="true">→</span>
                        </span>
                      </Link>
                    </article>
                  </div>
                )}

                <div className="blog-start-project-bridge">
                  <div className="blog-bridge-copy">
                    <span className="section-subtitle">Start a project</span>
                    <h3 className="blog-bridge-title">
                      {effectiveArticle?.closingCta?.heading || 'Ready to coordinate your growth system?'}
                    </h3>
                    <p className="blog-bridge-text">
                      {effectiveArticle?.closingCta?.text ||
                        'Share your brand, marketing, e-commerce, or compliance-coordination context with our team.'}
                    </p>
                  </div>
                  <div className="blog-bridge-action">
                    <Link
                      to={effectiveArticle?.closingCta?.href || '/start'}
                      className="btn btn-primary"
                    >
                      {effectiveArticle?.closingCta?.label || 'Start a project'}
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
