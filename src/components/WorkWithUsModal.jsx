import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const WorkWithUsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    website: '',
    services: [],
    businessDescription: '',
    hasOnlinePresence: '',
    projectGoal: '',
    referralSource: '',
    preferredContact: '',
    fileName: '',
    newsletterOptIn: false,
    websiteConfirm: '' // Honeypot field for bot prevention
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [processedLeadInfo, setProcessedLeadInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const modalRef = useRef(null);
  const lastActiveElement = useRef(null);

  useEffect(() => {
    const handleOpen = () => {
      lastActiveElement.current = document.activeElement;
      setIsOpen(true);
    };

    window.addEventListener('open-work-modal', handleOpen);

    return () => {
      window.removeEventListener('open-work-modal', handleOpen);
    };
  }, []);

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      website: '',
      services: [],
      businessDescription: '',
      hasOnlinePresence: '',
      projectGoal: '',
      referralSource: '',
      preferredContact: '',
      fileName: '',
      newsletterOptIn: false,
      websiteConfirm: ''
    });
    setSelectedFile(null);
    setErrors({});
    setSubmitted(false);
    setProcessedLeadInfo(null);
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
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, file: 'File size exceeds 5MB limit' }));
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

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone / WhatsApp number is required';
    } else if (formData.phone.replace(/[^0-9]/g, '').length < 8) {
      newErrors.phone = 'Please enter a valid phone number (minimum 8 digits)';
    }
    if (formData.services.length === 0) {
      newErrors.services = 'Please select at least one service';
    }

    setErrors(newErrors);
    return newErrors;
  };

  const categorizeLead = (data) => {
    const tags = [];
    let priority = 'NORMAL';
    let priorityReason = '';

    data.services.forEach(service => tags.push(service));

    return { tags, priority, priorityReason };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.websiteConfirm && formData.websiteConfirm.trim() !== '') {
      // Silent abort for automated spam bots
      setSubmitted(true);
      return;
    }

    const validationErrors = validate();
    const isValid = Object.keys(validationErrors).length === 0;

    if (isValid) {
      const classification = categorizeLead(formData);
      setProcessedLeadInfo(classification);
      
      setIsSubmitting(true);
      setSubmitError('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
      if (!accessKey) {
        setSubmitError('Web3Forms access key is missing. Please configure VITE_WEB3FORMS_ACCESS_KEY in environment variables.');
        setIsSubmitting(false);
        return;
      }

      const formPayload = new FormData();
      formPayload.append('access_key', accessKey);
      formPayload.append('subject', `New Project Lead: ${formData.fullName} - ${formData.companyName || 'No Company'}`);
      formPayload.append('from_name', formData.fullName);
      formPayload.append('fullName', formData.fullName);
      formPayload.append('companyName', formData.companyName || '');
      formPayload.append('email', formData.email);
      formPayload.append('phone', formData.phone);
      formPayload.append('website', formData.website || '');
      formPayload.append('services', formData.services.join(', '));
      formPayload.append('businessDescription', formData.businessDescription || '');
      formPayload.append('hasOnlinePresence', formData.hasOnlinePresence || '');
      formPayload.append('projectGoal', formData.projectGoal || '');
      formPayload.append('referralSource', formData.referralSource || '');
      formPayload.append('preferredContact', formData.preferredContact || '');
      formPayload.append('newsletterOptIn', formData.newsletterOptIn ? 'Yes' : 'No');
      formPayload.append('priority', classification.priority);

      if (selectedFile) {
        formPayload.append('attachment', selectedFile);
      }

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formPayload
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setSubmitted(true);
          const modalBody = document.querySelector('.modal-body-scroll');
          if (modalBody) {
            modalBody.scrollTop = 0;
          }
          
          trackEvent({
            category: 'work_with_us_modal',
            action: 'generate_lead',
            label: formData.services.join(', ')
          });
        } else {
          setSubmitError(result.message || 'Failed to submit form. Please check your access key or try again.');
        }
      } catch {
        setSubmitError('Failed to connect to the Web3Forms server. Please check your internet connection.');
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
    <div className="modal-overlay" onClick={handleClose}>
      <div 
        ref={modalRef}
        className="modal-container glass" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-id"
      >
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-subtitle">Project Planner</span>
            <h2 id="modal-title-id" className="modal-title">Work with us</h2>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="modal-body-scroll">
          {submitted ? (
            <div className="success-state" role="alert" aria-live="polite">
              <CheckCircle2 className="success-icon" />
              <h3>Thank You!</h3>
              <p className="success-message">
                Thank you for your response. We appreciate you taking the time to share your project details. We will respond within 24 hours.
              </p>
              
              {processedLeadInfo && processedLeadInfo.priority === 'HIGH' && (
                <div className="priority-notice">
                  <span className="priority-badge">VIP LEAD</span>
                  <p>Your request has been prioritized due to your timeline and scope. We will contact you immediately.</p>
                </div>
              )}

              <button className="btn btn-secondary reset-btn" onClick={handleResetForm}>
                Submit Another Project
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <p className="form-intro-text">Please fill out all the sections below. Required fields are marked with *</p>
              
              {/* SECTION 1 – Basic Info */}
              <div className="form-section" id="modal-fullName">
                <h4 className="section-header-title">SECTION 1: Basic Info</h4>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">Full Name <span className="required-asterisk">*</span></label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                    placeholder="Enter your first and last name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    required
                  />
                  {errors.fullName && <span id="fullName-error" className="error-text" role="alert"><AlertCircle size={12} /> {errors.fullName}</span>}
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

                <div className="form-row">
                  <div className="form-group half-width" id="modal-email">
                    <label className="form-label" htmlFor="email">Email Address <span className="required-asterisk">*</span></label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                      placeholder="We will never share your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className="error-text" role="alert"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>

                  <div className="form-group half-width" id="modal-phone">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp Number <span className="required-asterisk">*</span></label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                      placeholder="Used for direct scheduling and follow-ups"
                      value={formData.phone}
                      onChange={handleInputChange}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'phone-error' : undefined}
                      required
                    />
                    {errors.phone && <span id="phone-error" className="error-text" role="alert"><AlertCircle size={12} /> {errors.phone}</span>}
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
              <div className="form-section" id="modal-services">
                <h4 className="section-header-title">SECTION 2: Project Details</h4>

                <div className="form-group">
                  <label className="form-label">Service Interested In (select all that apply) <span className="required-asterisk">*</span></label>
                  <div className="checkbox-grid">
                    {[
                      'Branding',
                      'Marketing',
                      'Social Media',
                      'Website',
                      'E-commerce',
                      'Other'
                    ].map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          name="services"
                          value={service}
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && <span className="error-text" role="alert"><AlertCircle size={12} /> {errors.services}</span>}
                </div>

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
              <div className="form-section border-none">
                <h4 className="section-header-title">SECTION 3: Additional Info</h4>

                <div className="form-group">
                  <label className="form-label" htmlFor="referralSource">How did you hear about us?</label>
                  <select
                    id="referralSource"
                    name="referralSource"
                    className="form-input form-select"
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
                  <div className="radio-grid">
                    {[
                      { label: 'Call', value: 'Call' },
                      { label: 'WhatsApp', value: 'WhatsApp' },
                      { label: 'Email', value: 'Email' }
                    ].map((method) => (
                      <label key={method.value} className="radio-label">
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
                    <div className="file-selected-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', wordBreak: 'break-all' }}>📄 {formData.fileName}</span>
                      <button type="button" onClick={removeFile} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer', fontSize: '0.85rem', padding: '0.2rem 0.5rem' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="file-upload-dropzone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', border: '2px dashed var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.02)' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Click to attach project brief or document</span>
                      <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                    </label>
                  )}
                  {errors.file && <span style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '0.4rem', display: 'block' }}>{errors.file}</span>}
                </div>

                {/* Honeypot Spam Protection Field - Offscreen text input */}
                <input 
                  type="text" 
                  name="websiteConfirm" 
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={formData.websiteConfirm} 
                  onChange={handleInputChange} 
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
              </div>

              {submitError && (
                <div className="submit-error-banner" role="alert" style={{ color: '#ff3333', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <AlertCircle size={14} /> {submitError}
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary submit-btn" 
                disabled={isSubmitting}
                style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
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
