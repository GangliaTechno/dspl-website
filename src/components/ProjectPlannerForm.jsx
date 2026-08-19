import './WorkWithUsModal.css';
import './ProjectPlannerForm.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import {
  createInitialLeadForm,
  createLeadPayload,
  PROJECT_SERVICES,
  validateAttachment,
  validateLead,
} from './work-with-us/formModel';
import { FORM_SUBMISSION_ERROR } from '../utils/formMessages';
import { trackEvent } from '../utils/analytics';

const ProjectPlannerForm = ({
  idPrefix = 'planner',
  source = 'project-planner',
  onSuccess,
}) => {
  const [formData, setFormData] = useState(createInitialLeadForm);
  const [errors, setErrors] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);
  const id = (name) => `${idPrefix}-${name}`;

  const clearFieldError = (name) => {
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
    clearFieldError(name);
  };

  const handleServiceChange = (service) => {
    setFormData((current) => {
      const services = current.services.includes(service)
        ? current.services.filter((item) => item !== service)
        : [...current.services, service];
      return { ...current, services };
    });
    clearFieldError('services');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const attachmentError = validateAttachment(file);
    if (attachmentError) {
      setErrors((current) => ({ ...current, file: attachmentError }));
      event.target.value = '';
      return;
    }

    setSelectedFile(file);
    setFormData((current) => ({ ...current, fileName: file.name }));
    clearFieldError('file');
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFormData((current) => ({ ...current, fileName: '' }));
    clearFieldError('file');
  };

  const focusFirstError = (validationErrors) => {
    const firstError = Object.keys(validationErrors)[0];
    if (!firstError) return;

    const field = formRef.current?.elements.namedItem(firstError);
    const focusTarget = typeof field?.length === 'number' ? field[0] : field;
    focusTarget?.focus();

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

    document.getElementById(id(`${firstError}-group`))?.scrollIntoView?.({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'center',
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.websiteConfirm.trim()) {
      setSubmitted(true);
      onSuccess?.({ spam: true });
      return;
    }

    const validationErrors = validateLead(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      focusFirstError(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
    if (!accessKey) {
      setSubmitError(FORM_SUBMISSION_ERROR);
      setIsSubmitting(false);
      return;
    }

    const payload = createLeadPayload(formData, accessKey, selectedFile, source);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setSubmitError(FORM_SUBMISSION_ERROR);
        setIsSubmitting(false);
        return;
      }

      setSubmitted(true);
      setIsSubmitting(false);
      setFormData(createInitialLeadForm());
      setSelectedFile(null);
      onSuccess?.(data);
      trackEvent({
        category: 'project_planner',
        action: 'generate_lead',
        label: source,
      });
    } catch {
      setSubmitError(FORM_SUBMISSION_ERROR);
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="work-modal-success" role="status" aria-live="polite">
        <CheckCircle2 className="work-modal-success-icon" aria-hidden="true" />
        <h3 className="work-modal-success-title">Project brief received</h3>
        <p className="work-modal-success-text">
          Thank you. We have received your brief and will review your requirements
          before scheduling a focused first conversation.
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setSubmitted(false)}
        >
          Send Another Project Brief
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="work-modal-form">
      <section className="work-modal-form-section" aria-labelledby={id('contact-title')}>
        <h3 id={id('contact-title')} className="work-modal-section-header-title">Contact details</h3>

        <div className="form-group" id={id('fullName-group')}>
          <label className="form-label" htmlFor={id('fullName')}>Full Name *</label>
          <input id={id('fullName')} name="fullName" autoComplete="name" className="form-input" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your first and last name" aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? id('fullName-error') : undefined} required />
          {errors.fullName && <span id={id('fullName-error')} className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} aria-hidden="true" /> {errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={id('companyName')}>Company / Brand Name</label>
          <input id={id('companyName')} name="companyName" autoComplete="organization" className="form-input" value={formData.companyName} onChange={handleInputChange} placeholder="Name of your business or project (optional)" />
        </div>

        <div className="work-modal-form-row">
          <div className="form-group" id={id('email-group')}>
            <label className="form-label" htmlFor={id('email')}>Email Address *</label>
            <input id={id('email')} type="email" name="email" autoComplete="email" className="form-input" value={formData.email} onChange={handleInputChange} placeholder="name@example.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? id('email-error') : undefined} required />
            {errors.email && <span id={id('email-error')} className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} aria-hidden="true" /> {errors.email}</span>}
          </div>
          <div className="form-group" id={id('phone-group')}>
            <label className="form-label" htmlFor={id('phone')}>Phone / WhatsApp Number (optional)</label>
            <input id={id('phone')} type="tel" name="phone" autoComplete="tel" className="form-input" value={formData.phone} onChange={handleInputChange} placeholder="Used for direct scheduling and follow-ups" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? id('phone-error') : undefined} />
            {errors.phone && <span id={id('phone-error')} className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} aria-hidden="true" /> {errors.phone}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor={id('website')}>Website or Instagram Handle</label>
          <input id={id('website')} name="website" autoComplete="url" className="form-input" value={formData.website} onChange={handleInputChange} placeholder="Website or public social handle (optional)" />
        </div>
      </section>

      <section className="work-modal-form-section" aria-labelledby={id('project-title')}>
        <h3 id={id('project-title')} className="work-modal-section-header-title">Project details</h3>
        <fieldset className="form-group work-modal-checkbox-fieldset" id={id('services-group')}>
          <legend className="form-label">Service Interested In (select all that apply) *</legend>
          <div className="work-modal-checkbox-grid">
            {PROJECT_SERVICES.map((service) => (
              <label key={service} className="work-modal-checkbox-label">
                <input type="checkbox" name="services" value={service} checked={formData.services.includes(service)} onChange={() => handleServiceChange(service)} aria-invalid={Boolean(errors.services)} aria-describedby={errors.services ? id('services-error') : undefined} />
                <span>{service}</span>
              </label>
            ))}
          </div>
          {errors.services && <span id={id('services-error')} className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} aria-hidden="true" /> {errors.services}</span>}
        </fieldset>

        <div className="form-group">
          <label className="form-label" htmlFor={id('projectGoal')}>Tell us about your project or goal</label>
          <textarea id={id('projectGoal')} name="projectGoal" className="form-input form-textarea" value={formData.projectGoal} onChange={handleInputChange} placeholder="What are you trying to achieve?" />
        </div>
      </section>

      <section className="work-modal-form-section work-modal-form-section--borderless" aria-labelledby={id('preferences-title')}>
        <h3 id={id('preferences-title')} className="work-modal-section-header-title">Preferences</h3>
        <div className="form-group">
          <label className="form-label" htmlFor={id('referralSource')}>How did you hear about us?</label>
          <select id={id('referralSource')} name="referralSource" className="form-input" value={formData.referralSource} onChange={handleInputChange}>
            <option value="">Select source...</option>
            <option value="Google">Google</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <fieldset className="form-group work-modal-radio-fieldset">
          <legend className="form-label">Preferred Contact Method</legend>
          <div className="work-modal-radio-grid">
            {['Call', 'WhatsApp', 'Email'].map((method) => (
              <label key={method} className="work-modal-radio-label">
                <input type="radio" name="preferredContact" value={method} checked={formData.preferredContact === method} onChange={handleInputChange} />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="form-group" id={id('file-group')}>
          <label className="form-label" htmlFor={id('attachment')}>Attach File / Brand Brief (Optional, max 5MB)</label>
          {formData.fileName ? (
            <div className="work-modal-file-selected-box">
              <span className="work-modal-file-name-text">{formData.fileName}</span>
              <button type="button" onClick={removeFile} className="work-modal-file-remove-btn">Remove</button>
            </div>
          ) : (
            <input id={id('attachment')} type="file" onChange={handleFileUpload} className="form-input" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
          )}
          {errors.file && <span className="work-modal-file-error-text" role="alert">{errors.file}</span>}
        </div>

        <input type="text" name="websiteConfirm" tabIndex={-1} autoComplete="off" aria-hidden="true" className="work-modal-honeypot-field" value={formData.websiteConfirm} onChange={handleInputChange} />
      </section>

      <p className="work-modal-privacy-notice">
        Information submitted through this form is handled as described in our{' '}
        <Link to="/privacy">Privacy Policy</Link>.
      </p>

      {submitError && <div className="work-modal-submit-error-banner" role="alert"><AlertCircle size={14} aria-hidden="true" /> {submitError}</div>}

      <button type="submit" className="btn btn-primary work-modal-submit-btn" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Send My Project Details'}
      </button>
    </form>
  );
};

export default ProjectPlannerForm;
