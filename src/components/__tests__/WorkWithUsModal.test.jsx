import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WorkWithUsModal from '../WorkWithUsModal';

describe('WorkWithUsModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('opens when open-work-modal event is dispatched and closes on Escape key', () => {
    render(<WorkWithUsModal />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // Trigger custom open event
    fireEvent(window, new CustomEvent('open-work-modal'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Work with us')).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays validation errors when required fields are missing', () => {
    render(<WorkWithUsModal />);
    fireEvent(window, new CustomEvent('open-work-modal'));

    const submitBtn = screen.getByText('Send My Project Details');
    fireEvent.click(submitBtn);

    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Phone / WhatsApp number is required')).toBeInTheDocument();
    expect(screen.getByText('Please select at least one service')).toBeInTheDocument();
  });

  it('silently aborts submission when honeypot field is filled', async () => {
    render(<WorkWithUsModal />);
    fireEvent(window, new CustomEvent('open-work-modal'));

    // Fill honeypot field
    const honeypotInput = document.querySelector('input[name="websiteConfirm"]');
    fireEvent.change(honeypotInput, { target: { name: 'websiteConfirm', value: 'bot-fill-attempt' } });

    const submitBtn = screen.getByText('Send My Project Details');
    fireEvent.click(submitBtn);

    // Should show success state without sending network request
    expect(await screen.findByText('Thank You!')).toBeInTheDocument();
  });
});
