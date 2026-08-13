import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import Blogs from '../Blogs';
import RawRadicles from '../RawRadicles';
import StartProject from '../StartProject';
import TermsOfUse from '../TermsOfUse';

const renderPage = (Page, path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Page />
    </MemoryRouter>,
  );

describe('new route page shells', () => {
  it.each([
    [RawRadicles, '/brands/raw-radicles', 'Raw Radicles'],
    [StartProject, '/start', 'Start a Project'],
    [TermsOfUse, '/terms', 'Terms of Use'],
    [Blogs, '/blogs', 'Insights from building and supporting brands'],
  ])('renders one accessible heading for %s', (Page, path, heading) => {
    renderPage(Page, path);

    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });

  it('keeps the staged Blog honest while no posts are approved', () => {
    renderPage(Blogs, '/blogs');

    expect(
      screen.getByText(/We are preparing evidence-backed articles/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
