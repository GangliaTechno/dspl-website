import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import Contact from '../Contact';
import { FORM_SUBMISSION_ERROR } from '../../utils/formMessages';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

const renderContact = () => render(
  <MemoryRouter initialEntries={['/contact']}>
    <Contact />
  </MemoryRouter>,
);

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } });
  fireEvent.change(screen.getByLabelText('Last Name'), { target: { value: 'Doe' } });
  fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'jane@example.com' } });
  fireEvent.change(screen.getByLabelText('What do you need help with?'), { target: { value: 'Branding' } });
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Please contact me about a brand project.' } });
};

const expectSafeSubmissionError = async () => {
  const alert = await screen.findByRole('alert');

  expect(alert).toHaveTextContent(FORM_SUBMISSION_ERROR);
  expect(alert).not.toHaveTextContent(/access key|Web3Forms|environment/i);
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe('Contact', () => {
  it('keeps one headquarters panel with the verified contact routes', () => {
    const { container } = renderContact();
    const panel = container.querySelector('.contact-details-panel');
    const rows = panel?.querySelectorAll('.contact-detail-row');

    expect(panel).toBeInTheDocument();
    expect(rows).toHaveLength(3);
    expect(screen.getByRole('link', { name: '+91 88619 42440' }))
      .toHaveAttribute('href', 'tel:+918861942440');
    expect(screen.getByRole('link', { name: '+91 90725 56665' }))
      .toHaveAttribute('href', 'tel:+919072556665');
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
    expect(screen.getByRole('link', { name: 'dsplmanipal@gmail.com' }))
      .toHaveAttribute('href', 'mailto:dsplmanipal@gmail.com');
  });

  it('presents an integrated enquiry layout in the approved reading order', () => {
    const { container } = renderContact();
    const section = container.querySelector('.contact-main-section');
    const layout = container.querySelector('.contact-layout');
    const surface = container.querySelector('.contact-enquiry-surface');
    const regions = Array.from(surface.children);
    const headings = screen.getAllByRole('heading', { level: 2 });

    expect(section).toBeInTheDocument();
    expect(container.querySelector('.contact-hero')).not.toBeInTheDocument();
    expect(layout.querySelector('.contact-intro .section-subtitle'))
      .toHaveTextContent('Contact');
    expect(layout.querySelector('.contact-intro-heading')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Start a conversation.',
    })).toBeInTheDocument();
    expect(layout.querySelector('.contact-intro')).toHaveTextContent(
      'For general enquiries, tell us what you need and how we can reach you. For a detailed project brief, use Work With Us in the header.',
    );
    expect(headings.map((heading) => heading.textContent)).toEqual([
      'General enquiry',
      'Headquarters',
    ]);
    expect(surface).toBeInTheDocument();
    expect(regions).toHaveLength(2);
    expect(regions[0]).toHaveClass('contact-form-column');
    expect(regions[1]).toHaveClass('contact-details-column');
    expect(regions[0].firstElementChild).toBe(headings[0]);
    expect(regions[0].lastElementChild).toHaveClass('contact-form-panel');
    expect(regions[1].firstElementChild).toBe(headings[1]);
    expect(regions[1].lastElementChild).toHaveClass('contact-details-panel');
    expect(screen.getByRole('heading', { name: 'Address', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Phone', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Email', level: 3 })).toBeInTheDocument();
    expect(container.querySelector('.contact-details-panel svg')).not.toBeInTheDocument();
    expect(container.querySelector('.contact-form-title')).not.toBeInTheDocument();
    expect(container.querySelector('.glow-bg')).not.toBeInTheDocument();
  });

  it('preserves the primary enquiry fields and choices', () => {
    const { container } = renderContact();

    expect(screen.getByLabelText('First Name')).toBeRequired();
    expect(screen.getByLabelText('Last Name')).toBeRequired();
    expect(screen.getByLabelText('Email Address')).toBeRequired();
    const helpType = screen.getByLabelText('What do you need help with?');

    expect(helpType).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(
      Array.from(helpType.options, (option) => option.textContent),
    ).toEqual([
      'Select an option...',
      'Marketing',
      'Branding',
      'E-commerce',
      'New brand',
      'Other',
    ]);
    expect(screen.getByRole('button', { name: /Send Message/i }))
      .toHaveAttribute('type', 'submit');
    expect(container.querySelector('.contact-privacy-notice')).toHaveTextContent(
      'Information submitted through this form is handled as described in our Privacy Policy.',
    );
    expect(screen.getByRole('link', { name: 'Privacy Policy' }))
      .toHaveAttribute('href', '/privacy');
  });

  it('announces a Message validation error with a linked alert', () => {
    renderContact();

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    const message = screen.getByLabelText('Message');
    const error = screen.getByText('Message is required');

    expect(message).toHaveAttribute('aria-invalid', 'true');
    expect(message).toHaveAttribute('aria-describedby', 'message-error');
    expect(error).toHaveAttribute('id', 'message-error');
    expect(error).toHaveAttribute('role', 'alert');
  });

  it('uses a safe shared error when the contact configuration is unavailable', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
    renderContact();
    fillValidForm();

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await expectSafeSubmissionError();
  });

  it('keeps rejected submission details private while preserving the request payload', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: 'Provider response with internal detail.' }),
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
          email: 'jane@example.com',
          helpType: 'Branding',
          message: 'Please contact me about a brand project.',
        }),
      }),
    );
  });

  it('uses the same safe error when the submission request cannot connect', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
    renderContact();
    fillValidForm();

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    await expectSafeSubmissionError();
  });

  it('shows the success state after a successful provider response and resets the form for another message', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-access-key');
    const gtag = vi.fn();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }));
    vi.stubGlobal('gtag', gtag);
    renderContact();
    fillValidForm();

    fireEvent.click(screen.getByRole('button', { name: /Send Message/i }));

    expect(await screen.findByRole('heading', { name: 'Message received' })).toBeInTheDocument();
    expect(screen.getByText('Thank you. We have received your message and will review it before contacting you.')).toBeInTheDocument();
    expect(gtag).toHaveBeenCalledWith('event', 'generate_lead', {
      event_category: 'contact_form',
      event_label: 'Branding',
    });

    fireEvent.click(screen.getByRole('button', { name: 'Send Another Message' }));

    expect(screen.getByLabelText('First Name')).toHaveValue('');
    expect(screen.getByLabelText('Last Name')).toHaveValue('');
    expect(screen.getByLabelText('Email Address')).toHaveValue('');
    expect(screen.getByLabelText('What do you need help with?')).toHaveValue('');
    expect(screen.getByLabelText('Message')).toHaveValue('');
  });
});
