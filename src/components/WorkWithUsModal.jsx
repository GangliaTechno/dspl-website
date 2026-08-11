import './WorkWithUsModal.css';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';
import { FORM_SUBMISSION_ERROR } from '../utils/formMessages';
import { WORK_MODAL_EVENT } from '../utils/workModal';
import {
  createInitialLeadForm,
  createLeadPayload,
  validateAttachment,
  validateLead,
} from './work-with-us/formModel';

const WorkWithUsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState(createInitialLeadForm);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const modalRef = useRef(null);
  const lastActiveElement = useRef(null);

  useEffect(() => {
    const handleOpen = () => {
      lastActiveElement.current = document.activeElement;
      setIsOpen(true);
    };

    window.addEventListener(WORK_MODAL_EVENT, handleOpen);

    return () => {
      window.removeEventListener(WORK_MODAL_EVENT, handleOpen);
    };
  }, []);

  const handleResetForm = () => {
    setFormData(createInitialLeadForm());
    setSelectedFile(null);
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError('');
  };

  const handleClose = () => {
    setIsOpen(false);
    handleResetForm();
    if (lastActiveElement.current) {
      lastActiveElement.current.focus();
    }
  };

  // Keyboard navigation & Focus trap inside modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
        handleResetForm();
        if (lastActiveElement.current) {
          lastActiveElement.current.focus();
        }
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => {
        const firstInput = modalRef.current?.querySelector('input[name="fullName"], button');
        firstInput?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (serviceName) => {
    setFormData((prev) => {
      const services = prev.services.includes(serviceName)
        ? prev.services.filter((s) => s !== serviceName)
        : [...prev.services, serviceName];
      
      if (errors.services && services.length > 0) {
        setErrors((prevErr) => ({ ...prevErr, services: '' }));
      }

      return { ...prev, services };
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const attachmentError = validateAttachment(file);
      if (attachmentError) {
        setErrors((prev) => ({ ...prev, file: attachmentError }));
        return;
      }
      setSelectedFile(file);
      setFormData((prev) => ({ ...prev, fileName: file.name }));
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: '' }));
      }
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFormData((prev) => ({ ...prev, fileName: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.websiteConfirm && formData.websiteConfirm.trim() !== '') {
      // Silent abort for automated spam bots
      setSubmitted(true);
      return;
    }

    const validationErrors = validateLead(formData);
    setErrors(validationErrors);
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      setIsSubmitting(true);
      setSubmitError('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
      if (!accessKey) {
        setSubmitError(FORM_SUBMISSION_ERROR);
        setIsSubmitting(false);
        return;
      }

      const formPayload = createLeadPayload(
        formData,
        accessKey,
        selectedFile,
      );

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formPayload
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setSubmitted(true);
          const modalBody = document.querySelector('.work-modal-body-scroll');
          if (modalBody) {
            modalBody.scrollTop = 0;
          }
          
          trackEvent({
            category: 'work_with_us_modal',
            action: 'generate_lead',
            label: formData.services.join(', ')
          });
        } else {
          setSubmitError(FORM_SUBMISSION_ERROR);
        }
      } catch {
        setSubmitError(FORM_SUBMISSION_ERROR);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const firstErrorKey = Object.keys(validationErrors)[0];
      if (firstErrorKey) {
        const errEl = document.getElementById(`modal-${firstErrorKey}`);
        if (errEl && typeof errEl.scrollIntoView === 'function') {
          errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="work-modal-overlay" onClick={handleClose}>
      <div 
        ref={modalRef}
        className="work-modal-container glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-id"
      >
        {/* Modal Header */}
        <div className="work-modal-header">
          <div>
            <span className="work-modal-subtitle">Project Planner</span>
            <h2 id="modal-title-id" className="work-modal-title">Work with us</h2>
          </div>
          <button type="button" className="work-modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="work-modal-body-scroll">
          {submitted ? (
            <div className="work-modal-success-state" role="alert" aria-live="polite">
              <CheckCircle2 className="work-modal-success-icon" />
              <h3>Project details received</h3>
              <p className="work-modal-success-message">
                Thank you. We have received your project details and will review them before contacting you.
              </p>

              <button type="button" className="btn btn-secondary work-modal-reset-btn" onClick={handleResetForm}>
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="work-modal-form-intro-text">Please fill out all the sections below. Required fields are marked with *</p>
              
              {/* SECTION 1 – Basic Info */}
              <div className="work-modal-form-section" id="modal-fullName">
                <h3 className="work-modal-section-header-title">Contact details</h3>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name <span className="work-modal-required-asterisk">*</span></label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="Enter your first and last name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    required
                  />
                  {errors.fullName && <span id="fullName-error" className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} /> {errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Company / Brand Name</label>
                  <input
                    id="companyName"
                    type="text"
                    name="companyName"
                    className="form-input"
                    placeholder="Name of your business or project (optional)"
                    value={formData.companyName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="work-modal-form-row">
                  <div className="form-group" id="modal-email">
                    <label className="form-label" htmlFor="email">Email Address <span className="work-modal-required-asterisk">*</span></label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="form-input"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>

                  <div className="form-group" id="modal-phone">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp Number <span className="work-modal-required-asterisk">*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="form-input"
                      placeholder="Used for direct scheduling and follow-ups"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      required
                    />
                    {errors.phone && <span id="phone-error" className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} /> {errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="website">Website or Instagram Handle</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    className="form-input"
                    placeholder="Helps us audit your brand before our call (optional)"
                    value={formData.website}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* SECTION 2 – Project Details */}
              <div className="work-modal-form-section" id="modal-services">
                <h3 className="work-modal-section-header-title">Project details</h3>

                <fieldset className="form-group work-modal-checkbox-fieldset">
                  <legend className="form-label">Service Interested In (select all that apply) <span className="work-modal-required-asterisk">*</span></legend>
                  <div className="work-modal-checkbox-grid">
                    {[
                      'Branding',
                      'Marketing',
                      'Social Media',
                      'Website',
                      'E-commerce',
                      'Other'
                    ].map((service) => (
                      <label key={service} className="work-modal-checkbox-label">
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                          aria-invalid={Boolean(errors.services)}
                          aria-describedby={errors.services ? 'services-error' : undefined}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && <span id="services-error" className="form-error-text work-modal-form-error" role="alert"><AlertCircle size={12} /> {errors.services}</span>}
                </fieldset>

                <div className="form-group">
                  <label className="form-label" htmlFor="projectGoal">Tell us about your project or goal</label>
                  <textarea
                    id="projectGoal"
                    name="projectGoal"
                    className="form-input form-textarea"
                    placeholder="What are you trying to achieve? The more detail, the better we can help."
                    value={formData.projectGoal}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* SECTION 3 – Additional Info */}
              <div className="work-modal-form-section work-modal-form-section--borderless">
                <h3 className="work-modal-section-header-title">Preferences</h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="referralSource">How did you hear about us?</label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    className="form-input"
                    value={formData.referralSource}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled hidden>Select source...</option>
                    <option value="Google">Google</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Preferred Contact Method</label>
                  <div className="work-modal-radio-grid">
                    {[
                      { label: 'Call', value: 'Call' },
                      { label: 'WhatsApp', value: 'WhatsApp' },
                      { label: 'Email', value: 'Email' }
                    ].map((method) => (
                      <label key={method.value} className="work-modal-radio-label">
                        <input
                          type="radio"
                          name="preferredContact"
                          value={method.value}
                          checked={formData.preferredContact === method.value}
                          onChange={handleInputChange}
                        />
                        <span>{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Attach File / Brand Brief (Optional, max 5MB)</label>
                  {formData.fileName ? (
                    <div className="work-modal-file-selected-box">
                      <span className="work-modal-file-name-text">📄 {formData.fileName}</span>
                      <button type="button" onClick={removeFile} className="work-modal-file-remove-btn">Remove</button>
                    </div>
                  ) : (
                    <label className="work-modal-file-upload-dropzone">
                      <span className="work-modal-file-dropzone-text">Click to attach project brief or document</span>
                      <input type="file" onChange={handleFileUpload} className="work-modal-file-input-hidden" accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                    </label>
                  )}
                  {errors.file && <span className="work-modal-file-error-text" role="alert">{errors.file}</span>}
                </div>

                {/* Honeypot Spam Protection Field - Offscreen text input */}
                <input 
                  type="text" 
                  name="websiteConfirm" 
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="work-modal-honeypot-field"
                  value={formData.websiteConfirm} 
                  onChange={handleInputChange} 
                />
              </div>

              <p className="work-modal-privacy-notice">
                Information submitted through this form is handled as described in our{' '}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>

              {submitError && (
                <div className="work-modal-submit-error-banner" role="alert">
                  <AlertCircle size={14} /> {submitError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary work-modal-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Send My Project Details'}
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

export default WorkWithUsModal;
