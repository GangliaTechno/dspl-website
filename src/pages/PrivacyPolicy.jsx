import './PrivacyPolicy.css';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';

const PrivacyPolicy = () => {
  useSEO(getRouteMetadata('/privacy'));

  return (
    <div className="privacy-page-container">
      <div className="privacy-content glass">
        <h1 className="privacy-title">Privacy Policy & Terms of Use</h1>
        <p className="privacy-updated">Last Updated: July 2026</p>

        <section className="privacy-section">
          <h2>1. Introduction</h2>
          <p>
            Dashapatmaja Solutions Pvt Ltd (&quot;DSPL&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy and personal data. This Privacy Policy explains how we collect, use, store, and process information submitted via our website (<strong>dashapatmaja.in</strong>) and project inquiry forms.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Information We Collect</h2>
          <p>When you interact with our website, request a consultation, or submit an inquiry through our contact forms or project planner, we may collect the following information:</p>
          <ul>
            <li><strong>Contact Details:</strong> Full Name, Email Address, Phone / WhatsApp number.</li>
            <li><strong>Business & Project Info:</strong> Company Name, Website URL, project goal, and services of interest.</li>
            <li><strong>File Attachments:</strong> Optional brand guidelines or project documents attached to inquiries. These are temporarily processed during submission.</li>
            <li><strong>Analytics & Technical Data:</strong> Anonymized usage data such as page views, device information, and browser details collected via Google Analytics for performance improvement.</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. How We Use Your Data</h2>
          <p>We strictly collect data to fulfill legitimate business services, including:</p>
          <ul>
            <li>Responding to project proposals and inquiry requests.</li>
            <li>Scheduling discovery consultations and sending service proposals.</li>
            <li>Sending requested newsletters or updates (only if opted in).</li>
            <li>Improving website usability, performance, and client experiences through Google Analytics.</li>
          </ul>
          <p><strong>We never sell, rent, or trade your personal information to third parties.</strong> Form submissions are securely processed through our authorized third-party provider, Web3Forms, which handles the secure transmission of your inquiries and any file attachments.</p>
        </section>

        <section className="privacy-section">
          <h2>4. Data Storage, Security & Retention</h2>
          <p>
            We enforce industry-standard security measures to safeguard your personal data against unauthorized access, loss, or misuse. Form submissions are processed securely using encrypted transmission (HTTPS).
          </p>
          <p>
            Inquiry data is retained only for as long as necessary to fulfill the requested service, respond to your inquiry, or comply with legal obligations. File attachments are handled ephemerally by our form processor (Web3Forms) and are not permanently stored on our web servers. You may request the deletion of your personal data at any time.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Contact & Data Inquiries</h2>
          <p>
            If you have questions regarding this Privacy Policy or wish to request data updates, please contact us directly at:
          </p>
          <div className="contact-info-card">
            <p><strong>Dashapatmaja Solutions Pvt Ltd</strong></p>
            <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal, Karnataka 576104</p>
            <p>Email: <a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a> | Phone: <a href="tel:+918861942440">+91 88619 42440</a></p>
          </div>
        </section>
      </div>

    </div>
  );
};

export default PrivacyPolicy;
