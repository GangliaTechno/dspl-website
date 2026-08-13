import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import PackagingGallery from '../PackagingGallery';

const renderGallery = (props) =>
  render(
    <MemoryRouter>
      <PackagingGallery {...props} />
    </MemoryRouter>,
  );

describe('PackagingGallery', () => {
  it('renders an honest fallback when approved artwork is unavailable', () => {
    renderGallery({ items: [], fallbackActionHref: '/contact' });

    expect(
      screen.getByText(
        /Packaging imagery will be added after approved artwork is available/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /discuss packaging/i }),
    ).toHaveAttribute('href', '/contact');
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders only supplied packaging records', () => {
    renderGallery({
      items: [
        {
          image: '/approved-front.webp',
          backImage: '/approved-back.webp',
          sku: 'RR-60-CACAO',
          collection: 'Cacao Collection',
          description: 'Approved front and back packaging artwork.',
          alt: 'Raw Radicles cacao bar front packaging',
        },
      ],
      fallbackActionHref: '/contact',
    });

    expect(screen.getByText('RR-60-CACAO')).toBeInTheDocument();
    expect(screen.getByText('Cacao Collection')).toBeInTheDocument();
    expect(
      screen.getByText('Approved front and back packaging artwork.'),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText('Raw Radicles cacao bar front packaging'),
    ).toHaveAttribute('src', '/approved-front.webp');
    expect(screen.getByAltText(/back packaging/i)).toHaveAttribute(
      'src',
      '/approved-back.webp',
    );
    expect(
      screen.queryByText(/Packaging imagery will be added/i),
    ).not.toBeInTheDocument();
  });
});
