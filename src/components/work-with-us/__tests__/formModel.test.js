import { describe, expect, it } from 'vitest';
import {
  classifyLead,
  createInitialLeadForm,
  createLeadPayload,
  PROJECT_BUDGET_RANGES,
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
      services: 'Please select at least one service',
    });
    expect(form).toEqual(original);
  });

  it('conditionally requires phone only when phone or WhatsApp is preferred contact', () => {
    const base = {
      fullName: 'Asha Rao',
      email: 'asha@example.test',
      services: ['Branding'],
    };

    expect(validateLead({ ...base, phone: '' })).toEqual({});
    expect(validateLead({ ...base, phone: '123' })).toEqual({
      phone: 'Please enter a valid phone number (minimum 8 digits)',
    });
    expect(validateLead({ ...base, preferredContact: 'Call', phone: '' })).toEqual({
      phone: 'Phone / WhatsApp number is required when Call or WhatsApp is selected',
    });
    expect(validateLead({ ...base, preferredContact: 'Phone', phone: '' })).toEqual({
      phone: 'Phone / WhatsApp number is required when Call or WhatsApp is selected',
    });
    expect(validateLead({ ...base, preferredContact: 'WhatsApp', phone: '' })).toEqual({
      phone: 'Phone / WhatsApp number is required when Call or WhatsApp is selected',
    });
    expect(validateLead({ ...base, preferredContact: 'Email', phone: '' })).toEqual({});
    expect(validateLead({ ...base, preferredContact: 'Call', phone: '+91 98765 43210' })).toEqual({});
    expect(validateLead({ ...base, preferredContact: 'Phone', phone: '+91 98765 43210' })).toEqual({});
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

  it('creates the cleaned Web3Forms field contract without stale fields', () => {
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
      'projectGoal',
      'budgetRange',
      'referralSource',
      'preferredContact',
    ]) {
      expect(payload.has(field)).toBe(true);
    }
    for (const staleField of [
      'businessDescription',
      'hasOnlinePresence',
      'newsletterOptIn',
    ]) {
      expect(payload.has(staleField)).toBe(false);
    }
  });

  it('uses the reviewed project service and budget choices', () => {
    expect(PROJECT_SERVICES).toEqual([
      'Branding',
      'Marketing',
      'Social Media',
      'Website',
      'E-commerce',
      'Packaging and FSSAI compliance',
      'Other',
    ]);
    expect(PROJECT_BUDGET_RANGES).toEqual([
      'Under Rs 1 lakh',
      'Rs 1 to 3 lakh',
      'Rs 3 to 10 lakh',
      'Above Rs 10 lakh',
      'Not decided yet',
    ]);
    expect(Object.isFrozen(PROJECT_SERVICES)).toBe(true);
    expect(Object.isFrozen(PROJECT_BUDGET_RANGES)).toBe(true);
  });

  it('rejects attachments over 5 MB and unsupported file types or disguised MIME types', () => {
    expect(validateAttachment({ name: 'brief.pdf', size: 1024 })).toBe('');
    expect(validateAttachment({ name: 'brief.pdf', size: 1024, type: 'application/pdf' })).toBe('');
    expect(validateAttachment({ name: 'brief.png', size: 1024, type: 'image/png' })).toBe('');
    expect(validateAttachment({ name: 'brief.pdf', size: 1024, type: 'application/x-msdownload' })).toMatch(/file type/i);
    expect(validateAttachment({ name: 'brief.exe', size: 1024 })).toMatch(/file type/i);
    expect(
      validateAttachment({ name: 'brief.pdf', size: 5 * 1024 * 1024 + 1 }),
    ).toMatch(/5MB/i);
  });
});
