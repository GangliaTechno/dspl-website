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

  useSEO(
    summary && isBlogOpen ? createBlogPostMetadata(summary, true) : null,
  );

  if (!isBlogOpen || !summary) {
    return <NotFound />;
  }

  const effectiveArticle =
    (initialArticle?.slug === normalizedSlug ? initialArticle : null) ||
    (summary?.body ? summary : null) ||
    (loadedArticle?.slug === normalizedSlug ? loadedArticle : null) ||
    summary;

  const headings = summary.headings || [];
  const { keyToId } = buildHeadingMap(effectiveArticle.body || []);

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
                value={effectiveArticle.body || []}
                keyToId={keyToId}
              />

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
                    <h3 className="blog-bridge-title">Ready to coordinate your growth system?</h3>
                    <p className="blog-bridge-text">
                      Share your brand, marketing, e-commerce, or compliance-coordination context with our team.
                    </p>
                  </div>
                  <div className="blog-bridge-action">
                    <Link to="/start" className="btn btn-primary">
                      Start a project
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
