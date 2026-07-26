import { describe, expect, it } from 'vitest';
import {
  classifyLead,
  createInitialLeadForm,
  createLeadPayload,
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

    const payload = createLeadPayload(form, 'public-form-key');

    expect(payload.get('access_key')).toBe('public-form-key');
    expect(payload.get('services')).toBe('Branding, E-commerce');
    expect(payload.get('priority')).toBe('NORMAL');
  });
});
