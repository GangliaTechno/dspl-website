import { useState, useSyncExternalStore } from 'react';
import { Link } from 'react-router';
import './CookieNotice.css';
import { getAnalyticsConsent, setAnalyticsConsent } from '../utils/analytics';

const subscribeToHydration = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const CookieNotice = () => {
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [choice, setChoice] = useState(getAnalyticsConsent);

  if (!isHydrated || choice) return null;

  const choose = (value) => {
    setAnalyticsConsent(value);
    setChoice(value);
  };

  return (
    <section className="cookie-notice" role="region" aria-label="Analytics preferences">
      <div className="cookie-notice-copy">
        <h2>Optional website analytics</h2>
        <p>
          With your permission, Google Analytics helps us understand which pages
          are useful. It stays off unless you allow it. Read our{' '}
          <Link to="/privacy">Privacy Policy</Link>.
        </p>
      </div>
      <div className="cookie-notice-actions">
        <button type="button" className="btn btn-secondary" onClick={() => choose('denied')}>
          Decline
        </button>
        <button type="button" className="btn btn-primary" onClick={() => choose('granted')}>
          Allow analytics
        </button>
      </div>
    </section>
  );
};

export default CookieNotice;
