import './FAQAccordion.css';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs, namespace = 'faq' }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return (
    <div className="faq-list faq-list--divided">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const faqId = `${namespace}-${idx}`;

        return (
          <div
            key={idx}
            className={`faq-item ${isOpen ? 'faq-open' : ''}`}
          >
            <h3 className="faq-heading">
              <button
                type="button"
                className="faq-header-btn"
                aria-expanded={isOpen}
                aria-controls={`${faqId}-answer`}
                id={`${faqId}-button`}
                onClick={() => toggleFaq(idx)}
              >
                <span className="faq-q">{faq.q}</span>
                <ChevronDown size={20} className="faq-arrow" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`${faqId}-answer`}
              className="faq-a"
              role="region"
              aria-labelledby={`${faqId}-button`}
              hidden={!isOpen}
            >
              <p>{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
