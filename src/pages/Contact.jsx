import './Contact.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { FORM_SUBMISSION_ERROR } from '../utils/formMessages';
import contactHero960 from '../assets/contact-hero-960.webp';
import contactHero1440 from '../assets/contact-hero-1440.webp';
import contactHeroMobile from '../assets/contact-hero-mobile.webp';
import PhoneObfuscated from '../components/PhoneObfuscated';


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
  const formRef = useRef(null);

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
    return tempErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.websiteConfirm && formData.websiteConfirm.trim() !== '') {
      setSubmitted(true);
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitError('');

      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';
      
      if (!accessKey) {
        setSubmitError(FORM_SUBMISSION_ERROR);
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
          setSubmitError(FORM_SUBMISSION_ERROR);
        }
      } catch {
        setSubmitError(FORM_SUBMISSION_ERROR);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const field = formRef.current?.elements.namedItem(firstErrorKey);
      const focusTarget = typeof field?.length === 'number' ? field[0] : field;
      focusTarget?.focus();
    }
  };

  return (
    <div className="contact-page fade-in">
      <section className="contact-hero">
        <picture className="contact-hero-picture" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet={contactHeroMobile} />
          <source
            srcSet={`${contactHero960} 960w, ${contactHero1440} 1440w`}
            sizes="100vw"
          />
          <img
            className="contact-hero-image"
            src={contactHero1440}
            alt=""
            width="1440"
            height="810"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="container contact-hero-content">
          <span className="section-subtitle">Contact</span>
          <h1 className="contact-title">Start a conversation.</h1>
          <p className="contact-description">
            For general enquiries, tell us what you need and how we can reach you. For a detailed project brief, use Work With Us in the header.
          </p>
        </div>
      </section>

      <section className="section contact-information-section" aria-labelledby="contact-details-title">
        <div className="container">
          <h2 id="contact-details-title" className="sr-only">Contact details</h2>
          <div className="contact-info-grid">
            <article className="contact-info-card">
              <h3>Address</h3>
              <p className="contact-info-summary">Headquarters in Manipal</p>
              <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal 576104</p>
            </article>

            <article className="contact-info-card">
              <h3>Phone</h3>
              <p className="contact-info-summary">Direct contact</p>
              <p><PhoneObfuscated digits="+918861942440" display="+91 88619 42440" /></p>
              <p><PhoneObfuscated digits="+919072556665" display="+91 90725 56665" /></p>
            </article>

            <article className="contact-info-card">
              <h3>Email</h3>
              <p className="contact-info-summary">General enquiries</p>
              <p><a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a></p>
              <p><a href="mailto:dsplmanipal@gmail.com">dsplmanipal@gmail.com</a></p>
            </article>
          </div>
        </div>
      </section>

      <section className="section contact-enquiry-section" aria-labelledby="contact-enquiry-title">
        <div className="container contact-enquiry-layout">
          <header className="contact-enquiry-header">
            <span className="section-subtitle">Send a message</span>
            <h2 id="contact-enquiry-title" className="section-title">General enquiry</h2>
            <p className="section-title-description">Tell us what you need and how we can reach you.</p>
          </header>

          <div className="contact-form-panel">
                {submitted ? (
                  <div className="contact-success-state" role="status" aria-live="polite">
                    <CheckCircle2 className="contact-success-icon" />
                    <h3>Message received</h3>
                    <p>Thank you. We have received your message and will review it before contacting you.</p>
                    <button type="button" className="btn btn-primary" onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                <form ref={formRef} onSubmit={handleSubmit} noValidate>
                  <div className="contact-form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="form-input"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.firstName)}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                        required
                      />
                      {errors.firstName && <span id="firstName-error" className="form-error-text" role="alert">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="form-input"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.lastName)}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                        required
                      />
                      {errors.lastName && <span id="lastName-error" className="form-error-text" role="alert">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="johndoe@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      required
                    />
                    {errors.email && <span id="email-error" className="form-error-text" role="alert">{errors.email}</span>}
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
                      className="form-input"
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
                    {errors.helpType && <span id="helpType-error" className="form-error-text" role="alert">{errors.helpType}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="form-input"
                      placeholder="Enter your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && <span id="message-error" className="form-error-text" role="alert">{errors.message}</span>}
                  </div>

                  <p className="contact-privacy-notice">
                    Information submitted through this form is handled as described in our{' '}
                    <Link to="/privacy">Privacy Policy</Link>.
                  </p>

                  {submitError && (
                    <div className="contact-submit-error-banner" role="alert">
                      <AlertCircle size={14} /> {submitError}
                    </div>
                  )}

                  <button 
                    type="submit" 
                    className="btn btn-primary contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} />
                  </button>
                </form>
                )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
