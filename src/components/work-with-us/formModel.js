export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
export const PROJECT_SERVICES = Object.freeze([
  'Branding',
  'Marketing',
  'Social Media',
  'Website',
  'E-commerce',
  'Compliance',
  'Other',
]);

const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  'pdf',
  'doc',
  'docx',
  'png',
  'jpg',
  'jpeg',
]);

export function createInitialLeadForm() {
  return {
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    services: [],
    projectGoal: '',
    referralSource: '',
    preferredContact: '',
    fileName: '',
    websiteConfirm: '',
  };
}

export const createInitialLead = createInitialLeadForm;

export function validateLead(data) {
  const errors = {};

  if (!data.fullName.trim()) errors.fullName = 'Full Name is required';

  if (!data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneValue = data.phone?.trim() || '';
  const preferredContact = data.preferredContact?.toLowerCase() || '';
  const requiresPhone = preferredContact === 'phone' || preferredContact === 'whatsapp';

  if (requiresPhone && !phoneValue) {
    errors.phone = 'Phone / WhatsApp number is required when phone or WhatsApp contact is requested';
  } else if (phoneValue && phoneValue.replace(/[^0-9]/g, '').length < 8) {
    errors.phone = 'Please enter a valid phone number (minimum 8 digits)';
  }

  if (data.services.length === 0) {
    errors.services = 'Please select at least one service';
  }

  return errors;
}

export function classifyLead(data) {
  const tags = [...data.services];
  const hasEstablishedBusiness = Boolean(data.companyName && data.website);
  const projectGoal = data.projectGoal?.toLowerCase() || '';
  const hasUrgentTimeline =
    projectGoal.includes('urgent') || projectGoal.includes('asap');
  const isPriorityLead = hasEstablishedBusiness || hasUrgentTimeline;

  return {
    tags,
    priority: isPriorityLead ? 'VIP' : 'NORMAL',
    priorityReason: isPriorityLead
      ? 'Established business or urgent timeline'
      : '',
  };
}

export function validateAttachment(file) {
  if (!file) return '';
  if (file.size > MAX_ATTACHMENT_BYTES) return 'File size exceeds 5MB limit';

  const extension = file.name?.split('.').pop()?.toLowerCase();
  if (!extension || !ALLOWED_ATTACHMENT_EXTENSIONS.has(extension)) {
    return 'File type is not supported';
  }

  return '';
}

export function createLeadPayload(
  data,
  accessKey,
  file,
  source = 'project-planner',
) {
  const classification = classifyLead(data);
  const payload = new FormData();

  payload.append('access_key', accessKey);
  payload.append(
    'subject',
    `New Project Lead: ${data.fullName} - ${data.companyName || 'No Company'}`,
  );
  payload.append('from_name', data.fullName);
  payload.append('fullName', data.fullName);
  payload.append('companyName', data.companyName || '');
  payload.append('email', data.email);
  payload.append('phone', data.phone || '');
  payload.append('website', data.website || '');
  payload.append('services', data.services.join(', '));
  payload.append('projectGoal', data.projectGoal || '');
  payload.append('referralSource', data.referralSource || '');
  payload.append('preferredContact', data.preferredContact || '');
  payload.append('priority', classification.priority);
  payload.append('source', source);
  payload.append('websiteConfirm', data.websiteConfirm || '');

  if (file) payload.append('attachment', file);

  return payload;
}
