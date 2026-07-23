import { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const WorkWithUsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    botcheck: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [processedLeadInfo, setProcessedLeadInfo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const handleOpen = () => {
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
      newsletterOptIn: false
    });
    setErrors({});
    setSubmitted(false);
    setProcessedLeadInfo(null);
    setIsSubmitting(false);
    setSubmitError('');
  };

  const handleClose = () => {
    setIsOpen(false);
    handleResetForm();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        handleResetForm();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
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
      setFormData((prev) => ({ ...prev, fileName: file.name }));
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: '' }));
      }
    }
  };

  const removeFile = () => {
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
    return Object.keys(newErrors).length === 0;
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
    if (formData.botcheck) {
      // Silent abort for automated spam bots
      setSubmitted(true);
      return;
    }
    if (validate()) {
      const classification = categorizeLead(formData);
      setProcessedLeadInfo(classification);
      
      setIsSubmitting(true);
      setSubmitError('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

      const payload = {
        access_key: accessKey,
        subject: `New Project Lead: ${formData.fullName} - ${formData.companyName || 'No Company'}`,
        from_name: formData.fullName,
        fullName: formData.fullName,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        services: formData.services.join(', '),
        businessDescription: formData.businessDescription,
        hasOnlinePresence: formData.hasOnlinePresence,
        projectGoal: formData.projectGoal,
        referralSource: formData.referralSource,
        preferredContact: formData.preferredContact,
        fileName: formData.fileName,
        newsletterOptIn: formData.newsletterOptIn ? 'Yes' : 'No',
        priority: classification.priority,
        priorityReason: classification.priorityReason
      };

      try {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
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
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const errEl = document.getElementById(`modal-${firstErrorKey}`);
        if (errEl) {
          errEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div 
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
                Thank you for your response. We appreciate you taking the time to share your project details.
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
                    type="text"
                    name="fullName"
                    className={`form-input ${errors.fullName ? 'form-input-error' : ''}`}
                    placeholder="Enter your first and last name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  {errors.fullName && <span className="error-text"><AlertCircle size={12} /> {errors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="companyName">Company / Brand Name</label>
                  <input
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
                      type="email"
                      name="email"
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                      placeholder="We will never share your email address"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.email && <span className="error-text"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>

                  <div className="form-group half-width" id="modal-phone">
                    <label className="form-label" htmlFor="phone">Phone / WhatsApp Number <span className="required-asterisk">*</span></label>
                    <input
                      type="tel"
                      name="phone"
                      className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                      placeholder="Used for direct scheduling and follow-ups"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                    {errors.phone && <span className="error-text"><AlertCircle size={12} /> {errors.phone}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="website">Website or Instagram Handle</label>
                  <input
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
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxChange(service)}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.services && <span className="error-text"><AlertCircle size={12} /> {errors.services}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">What best describes your business?</label>
                  <div className="radio-grid">
                    {[
                      { label: 'New Business', value: 'New Business' },
                      { label: 'Existing Business', value: 'Existing Business' }
                    ].map((desc) => (
                      <label key={desc.value} className="radio-label">
                        <input
                          type="radio"
                          name="businessDescription"
                          value={desc.value}
                          checked={formData.businessDescription === desc.value}
                          onChange={handleInputChange}
                        />
                        <span>{desc.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Do you have an online presence right now?</label>
                  <div className="radio-grid">
                    {[
                      { label: 'Yes', value: 'Yes' },
                      { label: 'No', value: 'No' }
                    ].map((presence) => (
                      <label key={presence.value} className="radio-label">
                        <input
                          type="radio"
                          name="hasOnlinePresence"
                          value={presence.value}
                          checked={formData.hasOnlinePresence === presence.value}
                          onChange={handleInputChange}
                        />
                        <span>{presence.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="projectGoal">Tell us about your project or goal</label>
                  <textarea
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
                      <button type="button" onClick={removeFile} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.85rem', padding: '0.2rem 0.5rem' }}>Remove</button>
                    </div>
                  ) : (
                    <label className="file-upload-dropzone" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.25rem', border: '2px dashed var(--border-color)', borderRadius: '8px', cursor: 'pointer', background: 'rgba(255, 255, 255, 0.02)' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Click to attach project brief or document</span>
                      <input type="file" onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                    </label>
                  )}
                  {errors.file && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', display: 'block' }}>{errors.file}</span>}
                </div>

                {/* Honeypot Spam Protection Field */}
                <input 
                  type="checkbox" 
                  name="botcheck" 
                  className="hidden" 
                  style={{ display: 'none' }} 
                  value={formData.botcheck} 
                  onChange={handleInputChange} 
                />
              </div>

              {submitError && (
                <div className="submit-error-banner" style={{ color: '#ff3333', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

      <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: modalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-container {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          width: 100%;
          max-width: 680px;
          max-height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
          animation: modalSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 2rem 2.5rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
        }

        .modal-subtitle {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--accent);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.25rem;
        }

        .modal-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-heading);
          letter-spacing: -0.02em;
        }

        .modal-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          margin: -0.5rem;
          transition: color 0.2s ease;
        }

        .modal-close-btn:hover {
          color: var(--text-heading);
        }

        .modal-body-scroll {
          padding: 2rem 2.5rem 2.5rem;
          overflow-y: auto;
          flex-grow: 1;
        }

        .form-intro-text {
          font-size: 0.925rem;
          color: var(--text-secondary);
          margin-bottom: 2rem;
        }

        /* Form Sections */
        .form-section {
          padding-bottom: 2rem;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
        }

        .border-none {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 1rem;
        }

        .section-header-title {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent);
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .form-row {
          display: flex;
          gap: 1.25rem;
        }

        .half-width {
          flex: 1;
        }

        .required-asterisk {
          color: #ef4444;
          font-weight: 700;
          margin-left: 0.2rem;
        }

        .helper-text {
          display: block;
          font-size: 0.775rem;
          color: var(--text-secondary);
          margin-top: 0.35rem;
        }

        .text-above-control {
          margin-top: 0;
          margin-bottom: 0.65rem;
        }

        .form-textarea {
          min-height: 100px !important;
          resize: vertical;
        }

        /* Checkbox styles */
        .checkbox-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem 1.25rem;
          margin-top: 0.5rem;
        }

        .checkbox-label, .radio-label {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          user-select: none;
        }

        .checkbox-label input, .radio-label input {
          width: 16px;
          height: 16px;
          accent-color: var(--accent);
          cursor: pointer;
        }

        /* Radio Grid */
        .radio-grid {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          margin-top: 0.5rem;
        }

        .grid-2col {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.85rem 1.25rem;
        }

        /* File Upload */
        .file-upload-zone {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .file-hidden-input {
          display: none;
        }

        .file-upload-label {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.65rem 1rem;
          background: var(--bg-primary);
          border: 1px dashed var(--border-color);
          border-radius: 4px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-grow: 1;
        }

        .file-upload-label:hover {
          background: var(--bg-secondary);
          border-color: var(--accent);
          color: var(--text-primary);
        }

        .upload-icon {
          color: var(--accent);
        }

        .file-name {
          color: var(--text-primary);
          font-weight: 700;
        }

        .file-remove-btn {
          background: none;
          border: none;
          color: #ef4444;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          padding: 0.4rem;
        }

        .file-remove-btn:hover {
          text-decoration: underline;
        }

        .newsletter-checkbox {
          margin-top: 0.75rem;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23F5A800' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 1.25rem center;
          background-size: 1rem;
          padding-right: 3rem;
          color: var(--text-primary);
          cursor: pointer;
        }

        .form-select option {
          background: #ffffff;
          color: var(--text-primary);
        }

        .form-input-error {
          border-color: #ef4444 !important;
          box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.05) !important;
        }

        .error-text {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.775rem;
          color: #ef4444;
          font-weight: 500;
          margin-top: 0.35rem;
        }

        .submit-btn {
          width: 100%;
          padding: 0.95rem;
          font-size: 1rem;
          margin-top: 1.5rem;
        }

        /* Success & Priority Styles */
        .success-state {
          text-align: center;
          padding: 1.5rem 0;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          color: var(--accent);
          margin-bottom: 1.5rem;
        }

        .success-message {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .priority-notice {
          background: rgba(245, 168, 0, 0.06);
          border: 1px solid rgba(245, 168, 0, 0.3);
          border-radius: 4px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
          text-align: left;
        }

        .priority-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          background: var(--accent);
          color: #111111;
          padding: 0.2rem 0.5rem;
          border-radius: 3px;
          margin-bottom: 0.5rem;
          letter-spacing: 0.05em;
        }

        .priority-notice p {
          font-size: 0.85rem;
          line-height: 1.4;
          color: var(--text-primary);
        }

        .reset-btn {
          font-size: 0.85rem;
          padding: 0.5rem 1.25rem;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        @media (max-width: 768px) {
          .modal-overlay {
            padding: 1rem;
          }
          .modal-container {
            max-height: calc(100vh - 2rem);
          }
          .modal-header {
            padding: 1.5rem 1.75rem 1.25rem;
          }
          .modal-body-scroll {
            padding: 1.5rem 1.75rem 2rem;
          }
          .checkbox-grid, .grid-2col {
            grid-template-columns: 1fr;
          }
          .form-row {
            flex-direction: column;
            gap: 0;
          }
        }

        @media (max-width: 480px) {
          .modal-header {
            padding: 1.25rem 1.25rem 1rem;
          }
          .modal-body-scroll {
            padding: 1.25rem 1.25rem 1.5rem;
          }
          .radio-grid {
            flex-direction: column;
            gap: 0.65rem;
          }
          .file-upload-zone {
            flex-direction: column;
            align-items: stretch;
            gap: 0.65rem;
          }
        }
      `}</style>
    </div>
  );
};

export default WorkWithUsModal;
