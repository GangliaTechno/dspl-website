import { act, render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WorkWithUsModal from '../WorkWithUsModal';
import { openWorkModal } from '../../utils/workModal';

describe('WorkWithUsModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
  });

  it('opens when open-work-modal event is dispatched and closes on Escape key', () => {
    render(<WorkWithUsModal />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    act(() => openWorkModal('modal-test'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Work with us')).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('displays validation errors when required fields are missing', () => {
    render(<WorkWithUsModal />);
    act(() => openWorkModal('modal-test'));

    const submitBtn = screen.getByText('Send My Project Details');
    fireEvent.click(submitBtn);

    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Phone / WhatsApp number is required')).toBeInTheDocument();
    expect(screen.getByText('Please select at least one service')).toBeInTheDocument();
  });

  it('silently aborts submission when honeypot field is filled', async () => {
    render(<WorkWithUsModal />);
    act(() => openWorkModal('modal-test'));

    // Fill honeypot field
    const honeypotInput = document.querySelector('input[name="websiteConfirm"]');
    fireEvent.change(honeypotInput, { target: { name: 'websiteConfirm', value: 'bot-fill-attempt' } });

    const submitBtn = screen.getByText('Send My Project Details');
    fireEvent.click(submitBtn);

    // Should show success state without sending network request
    expect(await screen.findByText('Thank You!')).toBeInTheDocument();
  });

  it('keeps the form open and reports missing Web3Forms configuration', async () => {
    render(<WorkWithUsModal />);
    act(() => openWorkModal('test'));

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Asha Rao' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'asha@example.test' },
    });
    fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp Number/i), {
      target: { value: '9876543210' },
    });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Branding' }));
    fireEvent.click(
      screen.getByRole('button', { name: 'Send My Project Details' }),
    );

    expect(
      await screen.findByText(/Web3Forms access key is missing/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
