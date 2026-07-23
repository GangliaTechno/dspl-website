import { useLocation } from 'react-router-dom';
import useSEO from '../hooks/useSEO';

const PrivacyPolicy = () => {
  const location = useLocation();

  useSEO({
    title: 'Privacy Policy & Terms of Use',
    description: 'Learn how Dasha Patmaja Services Private Limited collects, protects, and handles user data, inquiry forms, and communications.',
    canonical: location.pathname
  });

  return (
    <div className="privacy-page-container">
      <div className="privacy-content glass">
        <h1 className="privacy-title">Privacy Policy & Terms of Use</h1>
        <p className="privacy-updated">Last Updated: July 2026</p>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Dasha Patmaja Services Private Limited (&quot;DSPL&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and process information submitted via our website (<strong>dashapatmaja.in</strong>) and project inquiry forms.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>When you interact with our website, request a consultation, or submit an inquiry through our contact forms or project planner, we may collect the following information:</p>
          <ul>
            <li><strong>Contact Details:</strong> Full Name, Email Address, Phone / WhatsApp number.</li>
            <li><strong>Business & Project Info:</strong> Company Name, Website URL, project scope, budget range, and timeline preferences.</li>
            <li><strong>File Attachments:</strong> Brand guidelines or project documents attached to inquiries.</li>
            <li><strong>Analytics & Technical Data:</strong> Anonymized usage data such as page views and browser information for analytical improvement.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Data</h2>
          <p>We strictly collect data to fulfill legitimate business services, including:</p>
          <ul>
            <li>Responding to project proposals and inquiry requests.</li>
            <li>Scheduling discovery consultations and sending service proposals.</li>
            <li>Sending requested newsletters or updates (only if opted in).</li>
            <li>Improving website usability, performance, and client experiences.</li>
          </ul>
          <p><strong>We never sell, rent, or trade your personal information to third parties.</strong></p>
        </section>

        <section className="privacy-section">
          <h2>4. Data Storage & Security</h2>
          <p>
            We enforce industry-standard security measures to safeguard your personal data against unauthorized access, loss, or misuse. Form submissions are processed securely using encrypted transmission (HTTPS).
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Contact & Data Inquiries</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data updates, please contact us directly at:
          </p>
          <div className="contact-info-card">
            <p><strong>Dasha Patmaja Services Pvt. Ltd.</strong></p>
            <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal, Karnataka 576104</p>
            <p>Email: <a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a> | Phone: <a href="tel:+918861942440">+91 88619 42440</a></p>
          </div>
        </section>
      </div>

      <style>{`
        .privacy-page-container {
          padding: 5rem 1.5rem;
          background: var(--bg-primary);
          min-height: 80vh;
          display: flex;
          justify-content: center;
        }

        .privacy-content {
          max-width: 800px;
          width: 100%;
          padding: 3.5rem 3rem;
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }

        .privacy-title {
          font-size: 2.25rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .privacy-updated {
          font-size: 0.9rem;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--border-color);
        }

        .privacy-section {
          margin-bottom: 2rem;
        }

        .privacy-section h2 {
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--accent);
          margin-bottom: 0.75rem;
        }

        .privacy-section p, .privacy-section ul {
          font-size: 0.975rem;
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 0.75rem;
        }

        .privacy-section ul {
          padding-left: 1.5rem;
        }

        .privacy-section li {
          margin-bottom: 0.5rem;
        }

        .contact-info-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 1.25rem;
          border-radius: 8px;
          margin-top: 1rem;
        }

        .contact-info-card p {
          margin-bottom: 0.3rem;
          color: var(--text-primary);
        }

        .contact-info-card a {
          color: var(--accent);
          text-decoration: underline;
        }

        @media (max-width: 600px) {
          .privacy-content {
            padding: 2rem 1.5rem;
          }

          .privacy-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
