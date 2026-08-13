import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import StartProject from '../StartProject';

describe('StartProject', () => {
  it('renders the shared project planner as a page, not a dialog', () => {
    render(
      <MemoryRouter initialEntries={['/start']}>
        <StartProject />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { level: 1, name: 'Start a Project' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
    expect(screen.getByText(/prepare a useful first conversation/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'What happens next' })).toBeInTheDocument();
    expect(screen.getByText(/respond within one working day/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Tell us enough to begin well' })).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute('id', 'start-fullName');
    expect(screen.getByRole('checkbox', { name: 'Compliance' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
