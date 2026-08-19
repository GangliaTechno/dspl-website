import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProjectPlannerForm from '../ProjectPlannerForm';
import { FORM_SUBMISSION_ERROR } from '../../utils/formMessages';
import { trackEvent } from '../../utils/analytics';

vi.mock('../../utils/analytics', () => ({ trackEvent: vi.fn() }));

const renderForm = (props = {}) =>
  render(
    <MemoryRouter>
      <ProjectPlannerForm idPrefix="start" source="start-page" {...props} />
    </MemoryRouter>,
  );

const fillRequiredFields = () => {
  fireEvent.change(screen.getByLabelText(/Full Name/i), {
    target: { value: 'Asha Rao' },
  });
  fireEvent.change(screen.getByLabelText(/Email Address/i), {
    target: { value: 'asha@example.test' },
  });
  fireEvent.change(screen.getByLabelText(/Phone \/ WhatsApp Number/i), {
    target: { value: '9876543210' },
  });
  fireEvent.click(screen.getByRole('checkbox', { name: 'Compliance' }));
};

describe('ProjectPlannerForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', '');
  });

  it('renders prefixed accessible fields, Compliance, and the privacy notice', () => {
    const { container } = renderForm();

    expect(screen.getByLabelText(/Full Name/i)).toHaveAttribute('id', 'start-fullName');
    expect(screen.getByRole('checkbox', { name: 'Compliance' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute('href', '/privacy');
    expect(container.querySelector('input[name="websiteConfirm"]')).toHaveAttribute('tabindex', '-1');
  });

  it('reports all required fields and focuses the first invalid control', () => {
    renderForm();
    fireEvent.click(screen.getByRole('button', { name: 'Send My Project Details' }));

    expect(screen.getByText('Full Name is required')).toBeInTheDocument();
    expect(screen.getByText('Email address is required')).toBeInTheDocument();
    expect(screen.getByText('Please select at least one service')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toHaveFocus();
  });

  it('rejects an unsupported attachment before submission', () => {
    const { container } = renderForm();
    const input = container.querySelector('input[type="file"]');
    const file = new File(['unsafe'], 'brief.exe', { type: 'application/octet-stream' });

    fireEvent.change(input, { target: { files: [file] } });
    expect(screen.getByText(/file type is not supported/i)).toBeInTheDocument();
  });

  it('keeps the form open when public submission configuration is unavailable', async () => {
    renderForm();
    fillRequiredFields();
    fireEvent.click(screen.getByRole('button', { name: 'Send My Project Details' }));

    expect(await screen.findByText(FORM_SUBMISSION_ERROR)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send My Project Details' })).toBeInTheDocument();
  });

  it('submits the shared payload and records consent-gated analytics through the utility', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal('fetch', fetchMock);
    renderForm();
    fillRequiredFields();

    fireEvent.click(screen.getByRole('button', { name: 'Send My Project Details' }));

    expect(await screen.findByRole('heading', { name: 'Project brief received' })).toBeInTheDocument();
    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const payload = fetchMock.mock.calls[0][1].body;
    expect(payload.get('source')).toBe('start-page');
    expect(payload.get('services')).toBe('Compliance');
    expect(trackEvent).toHaveBeenCalledWith({
      category: 'project_planner',
      action: 'generate_lead',
      label: 'start-page',
    });
  });

  it('requires phone number when Call is selected as preferred contact and prevents submission', async () => {
    vi.stubEnv('VITE_WEB3FORMS_ACCESS_KEY', 'test-key');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    renderForm();
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'Asha Rao' },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'asha@example.test' },
    });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Compliance' }));
    fireEvent.click(screen.getByLabelText('Call'));

    fireEvent.click(screen.getByRole('button', { name: 'Send My Project Details' }));

    expect(
      await screen.findByText(
        'Phone / WhatsApp number is required when Call or WhatsApp is selected',
      ),
    ).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
