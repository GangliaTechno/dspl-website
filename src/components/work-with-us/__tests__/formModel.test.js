import { describe, expect, it } from 'vitest';
import {
  classifyLead,
  createInitialLeadForm,
  createLeadPayload,
  PROJECT_SERVICES,
  validateAttachment,
  validateLead,
} from '../formModel';

describe('lead form model', () => {
  it('reports every required field without mutating the form', () => {
    const form = createInitialLeadForm();
    const original = structuredClone(form);

    expect(validateLead(form)).toEqual({
      fullName: 'Full Name is required',
      email: 'Email address is required',
      phone: 'Phone / WhatsApp number is required',
      services: 'Please select at least one service',
    });
    expect(form).toEqual(original);
  });

  it('classifies an established business without inventing outcome claims', () => {
    const form = {
      ...createInitialLeadForm(),
      companyName: 'Example Foods',
      website: 'https://example.test',
      services: ['Branding'],
    };

    expect(classifyLead(form)).toEqual({
      tags: ['Branding'],
      priority: 'VIP',
      priorityReason: 'Established business or urgent timeline',
    });
  });

  it('creates the existing Web3Forms field contract', () => {
    const form = {
      ...createInitialLeadForm(),
      fullName: 'Asha Rao',
      email: 'asha@example.test',
      phone: '9876543210',
      services: ['Branding', 'E-commerce'],
    };

    const payload = createLeadPayload(
      form,
      'public-form-key',
      undefined,
      'start-page',
    );

    expect(payload.get('access_key')).toBe('public-form-key');
    expect(payload.get('services')).toBe('Branding, E-commerce');
    expect(payload.get('priority')).toBe('NORMAL');
    expect(payload.get('source')).toBe('start-page');
    expect(payload.get('websiteConfirm')).toBe('');
    for (const field of [
      'fullName',
      'companyName',
      'email',
      'phone',
      'website',
      'services',
      'businessDescription',
      'hasOnlinePresence',
      'projectGoal',
      'referralSource',
      'preferredContact',
      'newsletterOptIn',
    ]) {
      expect(payload.has(field)).toBe(true);
    }
  });

  it('includes Compliance in the immutable project service choices', () => {
    expect(PROJECT_SERVICES).toEqual([
      'Branding',
      'Marketing',
      'Social Media',
      'Website',
      'E-commerce',
      'Compliance',
      'Other',
    ]);
    expect(Object.isFrozen(PROJECT_SERVICES)).toBe(true);
  });

  it('rejects attachments over 5 MB and unsupported file types', () => {
    expect(validateAttachment({ name: 'brief.pdf', size: 1024 })).toBe('');
    expect(validateAttachment({ name: 'brief.exe', size: 1024 })).toMatch(/file type/i);
    expect(
      validateAttachment({ name: 'brief.pdf', size: 5 * 1024 * 1024 + 1 }),
    ).toMatch(/5MB/i);
  });
});
