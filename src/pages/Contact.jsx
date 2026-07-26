import './Contact.css';
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

const Contact = () => {
  useSEO(getRouteMetadata('/contact'));

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
      
      if (!accessKey) {
        setSubmitError('Configuration error: Missing access key.');
        setIsSubmitting(false);
        return;
      }

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
          setFormData({ firstName: '', lastName: '', email: '', helpType: '', message: '', websiteConfirm: formData.websiteConfirm });
          
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
                <div className="success-state" role="status" aria-live="polite">
                  <CheckCircle2 className="success-icon" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out to Dasha Patmaja Services. We will review your message and respond within 24 hours.</p>
                  <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
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
                    className="contact-honeypot"
                    value={formData.websiteConfirm}
                    onChange={handleChange}
                  />

                  <div className="form-group">
                    <label className="form-label" htmlFor="helpType">What do you need help with?</label>
                    <select
                      id="helpType"
                      name="helpType"
                      className={`form-input form-select ${errors.helpType ? 'form-input-error' : ''}`}
                      value={formData.helpType}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.helpType)}
                      aria-describedby={errors.helpType ? 'helpType-error' : undefined}
                      required
                    >
                      <option value="" disabled hidden>Select an option...</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Branding">Branding</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="New brand">New brand</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.helpType && <span id="helpType-error" className="error-text" role="alert">{errors.helpType}</span>}
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
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <span id="message-error" className="error-text">{errors.message}</span>}
                  </div>

                  {submitError && (
                    <div className="submit-error-banner" role="alert">
                      <AlertCircle size={14} /> {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
