import { Component } from 'react';
import { openWorkModal } from '../utils/workModal';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In production, send to error tracking service
    console.error('[ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: "'Outfit', sans-serif",
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111111', marginBottom: '0.75rem' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#555555', marginBottom: '2rem', maxWidth: '40ch', lineHeight: 1.6 }}>
            An unexpected error occurred. Please refresh the page or contact us if the problem persists.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '0.75rem 1.75rem',
                background: '#F5A800',
                color: '#111111',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Refresh Page
            </button>
            <button
              type="button"
              onClick={() => openWorkModal('error-boundary')}
              style={{
                padding: '0.75rem 1.75rem',
                background: '#F5EFEB',
                color: '#111111',
                border: '1px solid rgba(26,26,26,0.08)',
                borderRadius: '4px',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.95rem',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
