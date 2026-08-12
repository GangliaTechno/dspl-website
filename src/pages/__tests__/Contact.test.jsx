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
  it('keeps three peer contact cards with the verified contact routes', () => {
    const { container } = renderContact();
    const grid = container.querySelector('.contact-info-grid');
    const cards = grid?.querySelectorAll('.contact-info-card');

    expect(grid).toBeInTheDocument();
    expect(cards).toHaveLength(3);
    expect(Array.from(cards, (card) => card.querySelector('h3')?.textContent)).toEqual([
      'Address',
      'Phone',
      'Email',
    ]);
    expect(Array.from(
      cards,
      (card) => card.querySelector('.contact-info-summary')?.textContent,
    )).toEqual([
      'Headquarters in Manipal',
      'Direct contact',
      'General enquiries',
    ]);
    expect(screen.getByRole('link', { name: 'Call +91 88619 42440' }))
      .toHaveAttribute('href', '#phone');
    expect(screen.getByRole('link', { name: 'Call +91 90725 56665' }))
      .toHaveAttribute('href', '#phone');
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
    expect(screen.getByRole('link', { name: 'dsplmanipal@gmail.com' }))
      .toHaveAttribute('href', 'mailto:dsplmanipal@gmail.com');
  });

  it('presents the approved vertical hero, contact cards, and enquiry flow', () => {
    const { container } = renderContact();
    const hero = container.querySelector('.contact-hero');
    const information = container.querySelector('.contact-information-section');
    const enquiry = container.querySelector('.contact-enquiry-section');

    expect(hero).toBeInTheDocument();
    const heroImage = hero.querySelector('.contact-hero-image');
    expect(hero.querySelector('.contact-hero-picture')).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('alt', '');
    expect(heroImage).toHaveAttribute('loading', 'eager');
    expect(heroImage).toHaveAttribute('fetchpriority', 'high');
    expect(hero.querySelector('.section-subtitle')).toHaveTextContent('Contact');
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'Start a conversation.',
    })).toBeInTheDocument();
    expect(hero).toHaveTextContent(
      'For general enquiries, tell us what you need and how we can reach you. For a detailed project brief, use Work With Us in the header.',
    );
    expect(information).toBeInTheDocument();
    expect(enquiry).toBeInTheDocument();
    expect(hero.compareDocumentPosition(information) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(information.compareDocumentPosition(enquiry) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Contact details', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'General enquiry', level: 2 })).toBeInTheDocument();
    expect(enquiry.querySelector('.section-subtitle')).toHaveTextContent('Send a message');
    expect(enquiry.querySelector('.contact-enquiry-header')).toHaveTextContent(
      'Tell us what you need and how we can reach you.',
    );
    expect(enquiry.querySelector('.contact-form-panel')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Address', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Phone', level: 3 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Email', level: 3 })).toBeInTheDocument();
    expect(information.querySelector('svg')).not.toBeInTheDocument();
    expect(container.querySelector('.contact-enquiry-surface')).not.toBeInTheDocument();
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

    expect(document.activeElement).toBe(screen.getByLabelText('First Name'));
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
