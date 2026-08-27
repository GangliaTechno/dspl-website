import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Contact from '../Contact';
import { FORM_SUBMISSION_ERROR } from '../../utils/formMessages';
import { trackEvent } from '../../utils/analytics';

vi.mock('../../hooks/useSEO', () => ({ default: vi.fn() }));
vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

const renderContact = () => render(
  <MemoryRouter initialEntries={['/contact']}>
    <Contact />
  </MemoryRouter>,
);

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText('Last Name (optional)'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText('Company / Brand Name (optional)'), { target: { value: 'Jane Brands' } });
  fireEvent.change(screen.getByLabelText('Phone Number (optional)'), { target: { value: '+91 98765 43210' } });
  fireEvent.change(screen.getByLabelText('Website or Social Handle (optional)'), { target: { value: 'https://example.com' } });
  fireEvent.change(screen.getByLabelText('What do you need help with?'), { target: { value: 'Packaging and FSSAI compliance' } });
  fireEvent.change(screen.getByLabelText('Budget band (optional)'), { target: { value: 'Scope first' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Please review the packaging workflow.' } });
};

const expectSafeSubmissionError = async () => {
  const alert = await screen.findByRole('alert');
  expect(alert).toHaveTextContent(FORM_SUBMISSION_ERROR);
  expect(alert).not.toHaveTextContent(/access key|Web3Forms|environment/i);
};

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Contact', () => {
  it('publishes verified response and enquiry messaging without unapproved claims', () => {
    const { container } = renderContact();

    expect(screen.getByText(/reply within one working day/i)).toBeInTheDocument();
    expect(container).not.toHaveTextContent(/WhatsApp/i);
  });

  it('directs detailed briefs to the Start page and exposes every enquiry field', () => {
    renderContact();

    expect(screen.getByRole('heading', { level: 1, name: 'Start a conversation.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /project planner/i })).toHaveAttribute('href', '/start');
    expect(screen.getByLabelText('First Name')).toBeRequired();
    expect(screen.getByLabelText('Last Name (optional)')).not.toBeRequired();
    expect(screen.getByLabelText('Email Address')).toBeRequired();
    expect(screen.getByLabelText('Company / Brand Name (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Website or Social Handle (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Budget band (optional)')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeRequired();

    const helpType = screen.getByLabelText('What do you need help with?');
    expect(Array.from(helpType.options, (option) => option.textContent)).toEqual([
      'Select an option...',
      'Branding',
      'Marketing and SEO',
      'E-commerce and marketplaces',
      'Packaging and FSSAI compliance',
      'New consumer brand',
      'Something else',
    ]);
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
  });

  it('focuses the first invalid field and links errors to their controls', () => {
    renderContact();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(document.activeElement).toBe(screen.getByLabelText('First Name'));
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-describedby', 'message-error');
    expect(screen.getByText('Message is required')).toHaveAttribute('role', 'alert');
  });

  it('uses the shared recoverable error when configuration is unavailable', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
    await expectSafeSubmissionError();
  });

  it('submits every displayed value without exposing provider rejection details', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Provider internal detail.' }),
    });
    vi.stubGlobal('fetch', fetchMock);
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await expectSafeSubmissionError();
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.web3forms.com/submit',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          access_key: 'test-access-key',
          subject: 'New Contact Message: Jane Doe',
          from_name: 'Jane Doe',
          fullName: 'Jane Doe',
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          companyName: 'Jane Brands',
          phone: '+91 98765 43210',
          website: 'https://example.com',
          helpType: 'Packaging and FSSAI compliance',
          budgetBand: 'Scope first',
          message: 'Please review the packaging workflow.',
          websiteConfirm: '',
        }),
      }),
    );
    expect(screen.queryByText('Provider internal detail.')).not.toBeInTheDocument();
  });

  it('uses the same safe error when the request cannot connect', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));
    await expectSafeSubmissionError();
  });

  it('announces success, tracks through the analytics utility, and resets safely', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }));
    renderContact();
    fillValidForm();
    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByRole('heading', { name: 'Message received' })).toBeInTheDocument();
    expect(screen.getByText(/reply within one working day, Monday to Saturday/i)).toBeInTheDocument();
    expect(trackEvent).toHaveBeenCalledWith('lead_form_submit_success', {
      form: 'contact',
      help_type: 'Packaging and FSSAI compliance',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Send Another Message' }));
    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Company / Brand Name (optional)')).toHaveValue('');
    expect(screen.getByLabelText('What do you need help with?')).toHaveValue('');
  });
});
