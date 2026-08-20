import { PortableText } from '@portabletext/react';
import { Link } from 'react-router';
import { slugifyHeading } from '../../utils/publicationUtils';

/**
 * Custom Portable Text Renderer for DSPL Insights Articles.
 * Enforces DSPL typography, spacing, and anchor synchronization for Table of Contents.
 *
 * @param {{ value: Array<object>, keyToId?: Record<string, string> }} props
 */
export default function PortableTextBody({ value = [], keyToId = {} }) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  const components = {
    block: {
      normal: ({ children }) => <p className="blog-body-p">{children}</p>,
      h2: ({ value: blockValue, children }) => {
        const id = keyToId[blockValue?._key] || slugifyHeading(blockValue?.children?.[0]?.text || '');
        return (
          <h2 id={id} className="blog-body-h2">
            {children}
          </h2>
        );
      },
      h3: ({ value: blockValue, children }) => {
        const id = keyToId[blockValue?._key] || slugifyHeading(blockValue?.children?.[0]?.text || '');
        return (
          <h3 id={id} className="blog-body-h3">
            {children}
          </h3>
        );
      },
      blockquote: ({ children }) => (
        <blockquote className="blog-body-quote">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="blog-body-list blog-body-list-bullet">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="blog-body-list blog-body-list-number">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="blog-body-list-item">{children}</li>
      ),
      number: ({ children }) => (
        <li className="blog-body-list-item">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="blog-body-strong">{children}</strong>
      ),
      em: ({ children }) => <em className="blog-body-em">{children}</em>,
      link: ({ value: markValue, children }) => {
        const href = markValue?.href || '#';
        const isInternal = href.startsWith('/') || href.startsWith('#');

        if (isInternal && !href.startsWith('#')) {
          return (
            <Link to={href} className="blog-body-link">
              {children}
            </Link>
          );
        }

        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="blog-body-link"
          >
            {children}
          </a>
        );
      },
    },
  };

  return (
    <div className="portable-text-content">
      <PortableText value={value} components={components} />
    </div>
  );
}
