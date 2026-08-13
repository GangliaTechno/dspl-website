import { useState } from 'react';
import './Blogs.css';
import { Link } from 'react-router';
import { blogPosts, hasPublishableBlog } from '../content/publication';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

const Blogs = ({ posts = blogPosts }) => {
  const isOpen = hasPublishableBlog(posts);
  const approvedPosts = posts.filter((post) => post.status === 'approved');
  const categories = ['All', ...new Set(approvedPosts.map((post) => post.category || 'General'))];
  const [activeCategory, setActiveCategory] = useState('All');
  const visiblePosts = activeCategory === 'All'
    ? approvedPosts
    : approvedPosts.filter((post) => (post.category || 'General') === activeCategory);

  useSEO({
    ...getRouteMetadata('/blogs'),
    robots: isOpen ? 'index, follow' : 'noindex, follow',
  });

  return (
    <div className="blogs-page fade-in">
      <section className="section blogs-hero">
        <div className="container blogs-content">
          <span className="section-subtitle">Field notes</span>
          <h1 className="blogs-title">Insights from building and supporting brands</h1>
          {isOpen ? (
            <>
              <div className="blog-filters" aria-label="Filter articles by category">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="blogs-grid">
                {visiblePosts.map((post) => (
                  <article className="blog-card" key={post.slug}>
                    <p className="blog-card-meta">
                      <span>{post.category || 'General'}</span>
                      <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                    </p>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <Link to={`/blogs/${post.slug}`} aria-label={`Read ${post.title}`}>
                      Read article
                    </Link>
                  </article>
                ))}
              </div>
            </>
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
