import './App.css';
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import AnalyticsTracker from './components/AnalyticsTracker';
import CookieNotice from './components/CookieNotice';
import ErrorBoundary from './components/ErrorBoundary';
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
const RawRadicles = lazy(() => import('./pages/RawRadicles'));
const StartProject = lazy(() => import('./pages/StartProject'));
const TermsOfUse = lazy(() => import('./pages/TermsOfUse'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
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
  const RawRadiclesRoute = pages.RawRadicles || RawRadicles;
  const StartProjectRoute = pages.StartProject || StartProject;
  const TermsOfUseRoute = pages.TermsOfUse || TermsOfUse;
  const BlogsRoute = pages.Blogs || Blogs;
  const BlogPostRoute = pages.BlogPost || BlogPost;
  const NotFoundRoute = pages.NotFound || NotFound;

  return (
    <>
      <ScrollToTop />
      <AnalyticsTracker />
      {/* Skip Navigation — WCAG 2.4.1 Bypass Blocks */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div id="app-root">
        <Header />
        <main className="main-content" id="main-content">
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/about" element={<AboutRoute />} />
                <Route path="/brands" element={<BrandsRoute />} />
                <Route path="/brands/raw-radicles" element={<RawRadiclesRoute />} />
                <Route path="/marketing" element={<MarketingRoute />} />
                <Route path="/branding" element={<BrandingRoute />} />
                <Route path="/ecommerce" element={<EcommerceRoute />} />
                <Route path="/contact" element={<ContactRoute />} />
                <Route path="/start" element={<StartProjectRoute />} />
                <Route path="/privacy" element={<PrivacyPolicyRoute />} />
                <Route path="/terms" element={<TermsOfUseRoute />} />
                <Route path="/blogs" element={<BlogsRoute />} />
                <Route path="/blogs/:slug" element={<BlogPostRoute />} />
                <Route path="*" element={<NotFoundRoute />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
        <WorkWithUsModal />
      </div>
      <CookieNotice />
    </>
  );
};

export default AppRoutes;
