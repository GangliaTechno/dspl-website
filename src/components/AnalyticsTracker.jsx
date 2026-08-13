import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  ANALYTICS_CONSENT_EVENT,
  getAnalyticsConsent,
  initGA,
  trackPageView,
} from '../utils/analytics';

const AnalyticsTracker = () => {
  const location = useLocation();
  const currentPath = location.pathname + location.search;

  useEffect(() => {
    const startTracking = () => {
      initGA();
      trackPageView(currentPath);
    };
    const handleConsent = (event) => {
      if (event.detail === 'granted') startTracking();
    };

    window.addEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
    if (getAnalyticsConsent() === 'granted') startTracking();

    return () => window.removeEventListener(ANALYTICS_CONSENT_EVENT, handleConsent);
  }, [currentPath]);

  return null;
};

export default AnalyticsTracker;
