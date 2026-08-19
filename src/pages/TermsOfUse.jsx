import './TermsOfUse.css';
import useSEO from '../hooks/useSEO';
import { getRouteMetadata } from '../seo/routeMetadata';
import { COMPANY_FACTS } from '../content/companyFacts';

const TermsOfUse = () => {
  useSEO(getRouteMetadata('/terms'));

  return (
    <div className="terms-page fade-in">
      <section className="section terms-hero">
        <article className="container terms-content">
          <span className="section-subtitle">Website information</span>
          <h1 className="terms-title">Terms of Use</h1>
          <p className="terms-lead">
            These terms explain the basis on which this informational website may be used.
          </p>
          <p className="terms-updated">Last updated: 13 August 2026</p>

          <section>
            <h2>1. Information, not an engagement</h2>
            <p>
              Website content is general information about {COMPANY_FACTS.shortName}, its owned brand,
              and the services it can coordinate. Visiting the site or submitting
              an enquiry does not create an adviser-client or service-provider-client relationship.
            </p>
          </section>

          <section>
            <h2>2. Project agreements take precedence</h2>
            <p>
              Any project starts only after the parties agree its scope and terms.
              If website content differs from a signed proposal or agreement, the
              signed proposal or agreement takes precedence for that project.
            </p>
          </section>

          <section>
            <h2>3. Intellectual property</h2>
            <p>
              Unless stated otherwise, the website design, text, graphics, and {COMPANY_FACTS.shortName}
              brand materials are intellectual property owned by or licensed to
              {COMPANY_FACTS.shortName}. Raw Radicles materials are presented as {COMPANY_FACTS.shortName}-owned brand work.
              You may view and share page links, but may not reproduce brand assets
              or substantial website content for commercial use without permission.
            </p>
          </section>

          <section>
            <h2>4. Prohibited misuse</h2>
            <p>
              Do not interfere with the website, attempt unauthorised access,
              submit unlawful or malicious material, misuse forms for spam, or
              misrepresent {COMPANY_FACTS.shortName}, Raw Radicles, or their work.
            </p>
          </section>

          <section>
            <h2>5. External links</h2>
            <p>
              External links are provided for context or convenience. Their
              operators control their content, availability, and privacy practices.
            </p>
          </section>

          <section>
            <h2>6. Accuracy and availability</h2>
            <p>
              {COMPANY_FACTS.shortName} makes reasonable efforts to keep website information accurate
              and the site available, but content may become outdated and access
              may be interrupted. Confirm material project decisions in a signed
              scope or agreement rather than relying only on website text.
            </p>
          </section>

          <section>
            <h2>7. Governing law and contact</h2>
            <p>
              These website terms are governed by the laws of India. Subject to
              applicable law, disputes relating to website use are within the
              jurisdiction of the courts in Karnataka. Questions may be sent to{' '}
              <a href={`mailto:${COMPANY_FACTS.contacts.directorEmail}`}>{COMPANY_FACTS.contacts.directorEmail}</a>.
            </p>
          </section>
        </article>
      </section>
    </div>
  );
};

export default TermsOfUse;
