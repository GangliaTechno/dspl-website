import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';

const Contact = () => {
  useSEO(
    'Contact Us | Dashapatmaja Solutions, Manipal',
    'Talk to Dashapatmaja Solutions about branding, marketing, or e-commerce. Based in Manipal, India. Call +91 88619 42440 or email director@dashapatmaja.in.'
  );

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    helpType: '',
    message: '',
    websiteConfirm: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }
    if (!formData.helpType) tempErrors.helpType = 'Please select what you need help with';
    if (!formData.message.trim()) tempErrors.message = 'Message is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.websiteConfirm && formData.websiteConfirm.trim() !== '') {
      setSubmitted(true);
      return;
    }

    if (validate()) {
      setIsSubmitting(true);
      setSubmitError('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

      const payload = {
        access_key: accessKey,
        subject: `New Contact Message: ${formData.firstName} ${formData.lastName}`,
        from_name: `${formData.firstName} ${formData.lastName}`,
        fullName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        helpType: formData.helpType,
        message: formData.message
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
          setFormData({ firstName: '', lastName: '', email: '', helpType: '', message: '' });
          
          if (window.gtag) {
            window.gtag('event', 'generate_lead', {
              event_category: 'contact_form',
              event_label: formData.helpType
            });
          }
        } else {
          setSubmitError(result.message || 'Failed to send message. Please check your access key or try again.');
        }
      } catch {
        setSubmitError('Failed to connect to the Web3Forms server. Please check your internet connection.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-page fade-in">
      {/* Background Glows */}
      <div className="glow-bg">
        <div className="glow-circle glow-circle-1"></div>
        <div className="glow-circle glow-circle-2"></div>
      </div>

      {/* Header Block */}
      <section className="section contact-hero">
        <div className="container">
          <span className="section-subtitle">Get in Touch</span>
          <h1 className="contact-title">Contact us</h1>
          <p className="contact-description">
            Have a brand to build, a store to improve, or a campaign to run? Tell us what you need. We reply within 24 hours.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section contact-grid-section glass-top-border">
        <div className="container">
          <div className="contact-layout">
            
            {/* Column 1: Details */}
            <div className="details-column">
              <h2 className="contact-subheading">Our Headquarters</h2>
              
              <div className="contact-detail-card glass">
                <MapPin className="detail-icon" />
                <div className="detail-info">
                  <h4>Address</h4>
                  <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal 576104</p>
                </div>
              </div>

              <div className="contact-detail-card glass">
                <Phone className="detail-icon" />
                <div className="detail-info">
                  <h4>Phone Call</h4>
                  <p><a href="tel:+918861942440">+91 88619 42440</a></p>
                  <p><a href="tel:+919072556665">+91 90725 56665</a></p>
                </div>
              </div>

              <div className="contact-detail-card glass">
                <Mail className="detail-icon" />
                <div className="detail-info">
                  <h4>Email Support</h4>
                  <p><a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a></p>
                  <p><a href="mailto:dsplmanipal@gmail.com">dsplmanipal@gmail.com</a></p>
                </div>
              </div>
            </div>

            {/* Column 2: Form */}
            <div className="form-column glass">
              {submitted ? (
                <div className="success-state">
                  <CheckCircle2 className="success-icon" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out to Dashapatmaja Solutions. We will review your message and respond within 24 hours.</p>
                  <button className="btn btn-primary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="form-title">Send a Message</h3>
                  
                  <div className="form-row">
                    <div className="form-group half-width">
                      <label className="form-label" htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={`form-input ${errors.firstName ? 'form-input-error' : ''}`}
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        required
                      />
                      {errors.firstName && <span id="firstName-error" className="error-text" role="alert">{errors.firstName}</span>}
                    </div>

                    <div className="form-group half-width">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={`form-input ${errors.lastName ? 'form-input-error' : ''}`}
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                        required
                      />
                      {errors.lastName && <span id="lastName-error" className="error-text" role="alert">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className="error-text" role="alert">{errors.email}</span>}
                  </div>

                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="websiteConfirm"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={formData.websiteConfirm}
                    onChange={handleChange}
                    style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                  />

                  <div className="form-group">
                    <label className="form-label" htmlFor="helpType">What do you need help with?</label>
                    <select
                      id="helpType"
                      name="helpType"
                      className={`form-input form-select ${errors.helpType ? 'form-input-error' : ''}`}
                      value={formData.helpType}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled hidden>Select an option...</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Branding">Branding</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="New brand">New brand</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.helpType && <span className="error-text">{errors.helpType}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-input ${errors.message ? 'form-input-error' : ''}`}
                      placeholder="Enter your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  {submitError && (
                    <div className="submit-error-banner" style={{ color: '#ff3333', fontSize: '0.85rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={14} /> {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                    style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <style>{`
        .contact-page {
          padding-top: 5rem;
          position: relative;
        }

        .contact-hero {
          text-align: center;
          padding: 6rem 0 4rem;
          max-width: 700px;
          margin: 0 auto;
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          letter-spacing: -0.04em;
          color: var(--text-heading);
        }

        .contact-description {
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-secondary);
        }

        .glass-top-border {
          border-top: 1px solid var(--border-color);
        }

        /* Layout Grid */
        .contact-layout {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 4rem;
          align-items: start;
          max-width: 1000px;
          margin: 0 auto;
        }

        .contact-subheading {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 2rem;
        }

        .details-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-detail-card {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 2.25rem 2.5rem;
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-detail-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-border-alpha);
          box-shadow: var(--shadow-lg);
        }

        .detail-icon {
          color: var(--accent);
          flex-shrink: 0;
          width: 24px;
          height: 24px;
        }

        .detail-info h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-heading);
        }

        .detail-info p {
          font-size: 0.925rem;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .detail-info a:hover {
          color: var(--accent);
          text-decoration: underline;
        }

        /* Form Column */
        .form-column {
          background: #ffffff;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 3.5rem;
          box-shadow: var(--shadow-lg);
        }

        .form-title {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .form-row {
          display: flex;
          gap: 1.5rem;
        }

        .half-width {
          flex: 1;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238d9365' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
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
          display: block;
          font-size: 0.8rem;
          color: #ef4444;
          font-weight: 500;
          margin-top: 0.35rem;
        }

        .submit-btn {
          width: 100%;
          padding: 0.875rem;
          font-size: 1rem;
          margin-top: 1rem;
        }

        /* Success State */
        .success-state {
          text-align: center;
          padding: 2rem 0;
        }

        .success-icon {
          width: 60px;
          height: 60px;
          color: var(--accent-light);
          margin-bottom: 1.5rem;
        }

        .success-state h3 {
          font-size: 1.75rem;
          font-weight: 800;
          color: var(--text-heading);
          margin-bottom: 1rem;
        }

        .success-state p {
          font-size: 1rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        @media (max-width: 900px) {
          .contact-layout {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          .form-column {
            padding: 2.5rem;
          }
        }

        @media (max-width: 576px) {
          .form-row {
            flex-direction: column;
            gap: 0;
          }
          .form-column {
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Contact;
