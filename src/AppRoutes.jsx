import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import AnalyticsTracker from './components/AnalyticsTracker';
import Footer from './components/Footer';
import Header from './components/Header';
import PageLoader from './components/PageLoader';
import ScrollToTop from './components/ScrollToTop';
import WorkWithUsModal from './components/WorkWithUsModal';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Brands = lazy(() => import('./pages/Brands'));
const Marketing = lazy(() => import('./pages/Marketing'));
const Branding = lazy(() => import('./pages/Branding'));
const Ecommerce = lazy(() => import('./pages/Ecommerce'));
const Contact = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

const AppRoutes = ({ pages = {} }) => {
  const HomeRoute = pages.Home || Home;
  const AboutRoute = pages.About || About;
  const BrandsRoute = pages.Brands || Brands;
  const MarketingRoute = pages.Marketing || Marketing;
  const BrandingRoute = pages.Branding || Branding;
  const EcommerceRoute = pages.Ecommerce || Ecommerce;
  const ContactRoute = pages.Contact || Contact;
  const PrivacyPolicyRoute = pages.PrivacyPolicy || PrivacyPolicy;
  const NotFoundRoute = pages.NotFound || NotFound;

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      <div id="app-root">
        <Header />
        <main className="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/about" element={<AboutRoute />} />
              <Route path="/brands" element={<BrandsRoute />} />
              <Route path="/marketing" element={<MarketingRoute />} />
              <Route path="/branding" element={<BrandingRoute />} />
              <Route path="/ecommerce" element={<EcommerceRoute />} />
              <Route path="/contact" element={<ContactRoute />} />
              <Route path="/privacy" element={<PrivacyPolicyRoute />} />
              <Route path="*" element={<NotFoundRoute />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <WorkWithUsModal />
      </div>
    </>
  );
};

export default AppRoutes;
