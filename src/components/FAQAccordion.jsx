import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQAccordion = ({ faqs }) => {
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="faq-list">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        const faqId = `faq-${idx}`;
        
        return (
          <div 
            key={idx} 
            className={`faq-item glass ${isOpen ? 'faq-open' : ''}`}
          >
            <h4 className="faq-heading">
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
            </h4>
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
      
      <style>{`
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .faq-item {
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid var(--border-color);
          background: rgba(255, 255, 255, 0.4);
        }
        
        .faq-heading {
          margin: 0;
          padding: 0;
        }
        
        .faq-header-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: var(--text-heading);
        }
        
        .faq-header-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
          border-radius: 12px;
        }
        
        .faq-q {
          font-size: 1.15rem;
          font-weight: 600;
          padding-right: 1.5rem;
        }
        
        .faq-arrow {
          color: var(--accent-dark);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          flex-shrink: 0;
        }
        
        .faq-open .faq-arrow {
          transform: rotate(-180deg);
        }
        
        .faq-a {
          padding: 0 1.5rem 1.5rem;
          color: var(--text-secondary);
          line-height: 1.6;
          font-size: 1.05rem;
        }
        
        @media (max-width: 768px) {
          .faq-header-btn {
            padding: 1.25rem;
          }
          .faq-q {
            font-size: 1.05rem;
          }
          .faq-a {
            padding: 0 1.25rem 1.25rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

export default FAQAccordion;
