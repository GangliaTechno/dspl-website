import './Contact.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { AlertCircle, CheckCircle2, Send } from 'lucide-react';
import PhoneObfuscated from '../components/PhoneObfuscated';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { FORM_SUBMISSION_ERROR } from '../utils/formMessages';
import { trackEvent } from '../utils/analytics';
import contactHero960 from '../assets/contact-hero-960.webp';
import contactHero1440 from '../assets/contact-hero-1440.webp';
import contactHeroMobile from '../assets/contact-hero-mobile.webp';
import {
  CONTACT_HELP_OPTIONS,
  createContactPayload,
  createInitialContact,
  validateContact,
} from './contactFormModel';

const Contact = () => {
  useSEO(getRouteMetadata('/contact'));

  const [formData, setFormData] = useState(createInitialContact);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.websiteConfirm.trim()) {
      setSubmitted(true);
      return;
    }

    const validationErrors = validateContact(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const field = formRef.current?.elements.namedItem(firstErrorKey);
      const focusTarget = typeof field?.length === 'number' ? field[0] : field;
      focusTarget?.focus();
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

    const payload = createContactPayload(formData, accessKey);
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(FORM_SUBMISSION_ERROR);
        return;
      }

      setSubmitted(true);
      setFormData(createInitialContact());
      trackEvent({
        category: 'contact_form',
        action: 'generate_lead',
        label: formData.helpType,
      });
    } catch {
      setSubmitError(FORM_SUBMISSION_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorFor = (name) => errors[name] && (
    <span id={`${name}-error`} className="form-error-text" role="alert">
      {errors[name]}
    </span>
  );

  const fieldA11y = (name) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <div className="contact-page fade-in">
      <section className="contact-hero">
        <picture className="contact-hero-picture" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet={contactHeroMobile} />
          <source srcSet={`${contactHero960} 960w, ${contactHero1440} 1440w`} sizes="100vw" />
          <img className="contact-hero-image" src={contactHero1440} alt="" width="1440" height="810" loading="eager" fetchPriority="high" decoding="async" />
        </picture>
        <div className="container contact-hero-content">
          <span className="section-subtitle">Contact</span>
          <h1 className="contact-title">Start a conversation.</h1>
          <p className="contact-description">
            For general enquiries, tell us what you need and how we can reach
            you. We aim to respond within one working day. For a more detailed
            scope, <Link className="contact-hero-link" to="/start">Start a detailed project brief</Link>.
          </p>
        </div>
      </section>

      <section className="section contact-information-section" aria-labelledby="contact-details-title">
        <div className="container">
          <h2 id="contact-details-title" className="sr-only">Contact details</h2>
          <div className="contact-info-grid">
            <article className="contact-info-card">
              <h3>Office</h3>
              <p className="contact-info-summary">Manipal office</p>
              <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal 576104</p>
              <p>Office days: Monday to Saturday</p>
            </article>

            <article className="contact-info-card">
              <h3>New enquiries</h3>
              <p className="contact-info-summary">Start a conversation</p>
              <p><PhoneObfuscated number="+91 88619 42440" /></p>
              <p><a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a></p>
            </article>

            <article className="contact-info-card">
              <h3>Existing projects</h3>
              <p className="contact-info-summary">Project coordination</p>
              <p><PhoneObfuscated number="+91 90725 56665" /></p>
            </article>
          </div>
        </div>
      </section>

      <section className="section contact-enquiry-section" aria-labelledby="contact-enquiry-title">
        <div className="container contact-enquiry-layout">
          <header className="contact-enquiry-header">
            <span className="section-subtitle">Send a message</span>
            <h2 id="contact-enquiry-title" className="section-title">General enquiry</h2>
            <p className="section-title-description">Share enough context for us to route your enquiry correctly.</p>
          </header>

          <div className="contact-form-panel">
            {submitted ? (
              <div className="contact-success-state" role="status" aria-live="polite">
                <CheckCircle2 className="contact-success-icon" aria-hidden="true" />
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
                    <input id="firstName" name="firstName" className="form-input" value={formData.firstName} onChange={handleChange} placeholder="Jane" required {...fieldA11y('firstName')} />
                    {errorFor('firstName')}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">Last Name (optional)</label>
                    <input id="lastName" name="lastName" className="form-input" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address</label>
                    <input id="email" type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} placeholder="name@example.com" required {...fieldA11y('email')} />
                    {errorFor('email')}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number (optional)</label>
                    <input id="phone" type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} placeholder="Include country code" {...fieldA11y('phone')} />
                    {errorFor('phone')}
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="companyName">Company / Brand Name (optional)</label>
                    <input id="companyName" name="companyName" className="form-input" value={formData.companyName} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="website">Website or Social Handle (optional)</label>
                    <input id="website" name="website" className="form-input" value={formData.website} onChange={handleChange} placeholder="https://example.com or @handle" {...fieldA11y('website')} />
                    {errorFor('website')}
                  </div>
                </div>

                <div className="contact-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="helpType">What do you need help with?</label>
                    <select id="helpType" name="helpType" className="form-input" value={formData.helpType} onChange={handleChange} required {...fieldA11y('helpType')}>
                      <option value="" disabled hidden>Select an option...</option>
                      {CONTACT_HELP_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                    </select>
                    {errorFor('helpType')}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="budgetBand">Budget band (optional)</label>
                    <input id="budgetBand" name="budgetBand" className="form-input" value={formData.budgetBand} onChange={handleChange} placeholder="Optional range or budget status" />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">Message</label>
                  <textarea id="message" name="message" className="form-input" value={formData.message} onChange={handleChange} placeholder="What would you like us to understand?" required {...fieldA11y('message')} />
                  {errorFor('message')}
                </div>

                <input type="text" name="websiteConfirm" tabIndex={-1} autoComplete="off" aria-hidden="true" className="contact-honeypot" value={formData.websiteConfirm} onChange={handleChange} />

                <p className="contact-privacy-notice">
                  Information submitted through this form is handled as described in our{' '}
                  <Link to="/privacy">Privacy Policy</Link>.
                </p>

                {submitError && (
                  <div className="contact-submit-error-banner" role="alert">
                    <AlertCircle size={14} aria-hidden="true" /> {submitError}
                  </div>
                )}

                <button type="submit" className="btn btn-primary contact-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Send Message'} <Send size={16} aria-hidden="true" />
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
