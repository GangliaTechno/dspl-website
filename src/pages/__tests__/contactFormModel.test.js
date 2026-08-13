import { describe, expect, it } from 'vitest';
import {
  CONTACT_HELP_OPTIONS,
  createContactPayload,
  createInitialContact,
  validateContact,
} from '../contactFormModel';

describe('contactFormModel', () => {
  it('starts every displayed field with a safe value', () => {
    expect(createInitialContact()).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      phone: '',
      website: '',
      helpType: '',
      budgetBand: '',
      message: '',
      websiteConfirm: '',
    });
    expect(CONTACT_HELP_OPTIONS).toEqual([
      'Branding',
      'Marketing',
      'E-commerce',
      'Compliance',
      'Other',
    ]);
  });

  it('requires only first name, valid email, help type, and message', () => {
    expect(validateContact(createInitialContact())).toEqual({
      firstName: 'First name is required',
      email: 'Email is required',
      helpType: 'Please select what you need help with',
      message: 'Message is required',
    });

    expect(validateContact({
      ...createInitialContact(),
      firstName: 'Jane',
      email: 'jane@example.com',
      helpType: 'Branding',
      message: 'Please contact me.',
    })).toEqual({});
  });

  it('validates optional phone and website fields only when supplied', () => {
    const base = {
      ...createInitialContact(),
      firstName: 'Jane',
      email: 'jane@example.com',
      helpType: 'Marketing',
      message: 'Please contact me.',
    };

    expect(validateContact({ ...base, phone: '12', website: 'not a website' })).toEqual({
      phone: 'Please enter a valid phone number',
      website: 'Enter a full website URL or public social handle',
    });
    expect(validateContact({ ...base, phone: '+91 98765 43210', website: '@janebrands' })).toEqual({});
    expect(validateContact({ ...base, website: 'https://example.com' })).toEqual({});
  });

  it('includes every displayed value in the Web3Forms payload', () => {
    const data = {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      companyName: 'Jane Brands',
      phone: '+91 98765 43210',
      website: 'https://example.com',
      helpType: 'Compliance',
      budgetBand: 'Scope first',
      message: 'Please review the packaging workflow.',
      websiteConfirm: '',
    };

    expect(createContactPayload(data, 'test-key')).toEqual({
      access_key: 'test-key',
      subject: 'New Contact Message: Jane Doe',
      from_name: 'Jane Doe',
      fullName: 'Jane Doe',
      ...data,
    });
  });
});
