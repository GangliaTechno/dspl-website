import './App.css';
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AnalyticsTracker from './components/AnalyticsTracker';
import Header from './components/Header';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import WorkWithUsModal from './components/WorkWithUsModal';

// Route-level Code Splitting for Performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Brands = lazy(() => import('./pages/Brands'));
const Marketing = lazy(() => import('./pages/Marketing'));
const Branding = lazy(() => import('./pages/Branding'));
const Ecommerce = lazy(() => import('./pages/Ecommerce'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnalyticsTracker />
      <div id="app-root">
        <Header />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/branding" element={<Branding />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WorkWithUsModal />
      </div>

    </Router>
  );
}

export default App;
