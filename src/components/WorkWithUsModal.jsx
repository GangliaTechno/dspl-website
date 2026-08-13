import './WorkWithUsModal.css';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import ProjectPlannerForm from './ProjectPlannerForm';
import { WORK_MODAL_EVENT } from '../utils/workModal';

const WorkWithUsModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const lastActiveElement = useRef(null);

  useEffect(() => {
    const handleOpen = () => {
      lastActiveElement.current = document.activeElement;
      setIsOpen(true);
    };

    window.addEventListener(WORK_MODAL_EVENT, handleOpen);
    return () => window.removeEventListener(WORK_MODAL_EVENT, handleOpen);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    lastActiveElement.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return undefined;
    }

    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      modalRef.current?.querySelector('input[name="fullName"], button')?.focus();
    }, 50);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleClose();
        return;
      }

      if (event.key !== 'Tab' || !modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="work-modal-overlay" onClick={handleClose}>
      <div
        ref={modalRef}
        className="work-modal-container glass"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title-id"
      >
        <div className="work-modal-header">
          <div>
            <span className="work-modal-subtitle">Project Planner</span>
            <h2 id="modal-title-id" className="work-modal-title">Work with us</h2>
          </div>
          <button type="button" className="work-modal-close-btn" onClick={handleClose} aria-label="Close modal">
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <div className="work-modal-body-scroll">
          <ProjectPlannerForm
            idPrefix="modal"
            source="compatibility-modal"
            onSuccess={() => {
              const modalBody = modalRef.current?.querySelector('.work-modal-body-scroll');
              if (modalBody) modalBody.scrollTop = 0;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkWithUsModal;
