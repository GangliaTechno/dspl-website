import './BlogPost.css';
import { useParams } from 'react-router';
import { blogPosts, hasPublishableBlog } from '../content/publication';
import useSEO from '../hooks/useSEO';
import NotFound from './NotFound';
import { createBlogPostMetadata, normalizeBlogSlug } from './blogPostModel';

const BlogPost = ({ posts = blogPosts }) => {
  const { slug = '' } = useParams();
  const normalizedSlug = normalizeBlogSlug(slug);
  const isBlogOpen = hasPublishableBlog(posts);
  const post = posts.find(
    (item) => item.status === 'approved'
      && normalizeBlogSlug(item.slug) === normalizedSlug,
  );

  useSEO(post && isBlogOpen
    ? createBlogPostMetadata(post, true)
    : null);

  if (!isBlogOpen || !post) return <NotFound />;

  return (
    <article className="section blog-post-page fade-in">
      <div className="container blog-post-content">
        <p className="section-subtitle">
          <span>{post.category || 'Field notes'}</span>
          {' · '}
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </p>
        <h1 className="blog-post-title">{post.title}</h1>
        <p className="blog-post-lead">{post.description}</p>
        {post.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
};

export default BlogPost;
