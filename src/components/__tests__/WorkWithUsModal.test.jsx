import { act, render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import WorkWithUsModal from '../WorkWithUsModal';
import { openWorkModal } from '../../utils/workModal';
import { FORM_SUBMISSION_ERROR } from '../../utils/formMessages';

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

  it('uses clear visitor-facing project planner labels without internal lead language', () => {
    render(<WorkWithUsModal />);
    act(() => openWorkModal('modal-copy-test'));

    expect(screen.getByRole('heading', { level: 4, name: 'Contact details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Project details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 4, name: 'Preferences' })).toBeInTheDocument();
    expect(screen.queryByText(/VIP LEAD|prioritized|contact you immediately|24 hours/i)).not.toBeInTheDocument();
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
    expect(await screen.findByRole('heading', { name: 'Project details received' })).toBeInTheDocument();
    expect(screen.getByText(
      'Thank you. We have received your project details and will review them before contacting you.',
    )).toBeInTheDocument();
    expect(screen.queryByText(/VIP LEAD|prioritized|contact you immediately|24 hours/i)).not.toBeInTheDocument();
  });

  it('keeps the form open and reports the shared recoverable submission error when configuration is unavailable', async () => {
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

    expect(await screen.findByText(FORM_SUBMISSION_ERROR)).toBeInTheDocument();
    expect(screen.queryByText(/access key|environment|Web3Forms/i)).not.toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('uses the shared recoverable submission error for a failed public request', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network unavailable')));

    render(<WorkWithUsModal />);
    act(() => openWorkModal('modal-request-error-test'));

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

    expect(await screen.findByText(FORM_SUBMISSION_ERROR)).toBeInTheDocument();
    expect(screen.queryByText(/access key|environment|Web3Forms/i)).not.toBeInTheDocument();
  });
});
