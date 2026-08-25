export const CONTACT_HELP_OPTIONS = Object.freeze([
  'Branding',
  'Marketing and SEO',
  'E-commerce and marketplaces',
  'Packaging and FSSAI compliance',
  'New consumer brand',
  'Something else',
]);

export const createInitialContact = () => ({
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

const isValidWebsiteOrHandle = (value) => {
  const candidate = value.trim();
  if (/^@[a-z0-9._-]{2,}$/i.test(candidate)) return true;

  let urlCandidate = candidate;
  if (!urlCandidate.startsWith('http://') && !urlCandidate.startsWith('https://')) {
    urlCandidate = 'https://' + urlCandidate;
  }

  try {
    const url = new URL(urlCandidate);
    return ['http:', 'https:'].includes(url.protocol) && Boolean(url.hostname);
  } catch {
    return false;
  }
};

export const validateContact = (data) => {
  const errors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  if (data.phone.trim()) {
    const digits = data.phone.replace(/\D/g, '');
    if (digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number';
    }
  }
  if (data.website.trim() && !isValidWebsiteOrHandle(data.website)) {
    errors.website = 'Enter a full website URL or public social handle';
  }
  if (!data.helpType) errors.helpType = 'Please select what you need help with';
  if (!data.message.trim()) errors.message = 'Message is required';
  return errors;
};

export const createContactPayload = (data, accessKey) => {
  const fullName = `${data.firstName} ${data.lastName}`.trim();

  return {
    access_key: accessKey,
    subject: `New Contact Message: ${fullName}`,
    from_name: fullName,
    fullName,
    ...data,
  };
};
