import { PUBLIC_ROUTES } from './seo/routeMetadata';

const defaultLoaders = {
  Home: () => import('./pages/Home'),
  About: () => import('./pages/About'),
  Brands: () => import('./pages/Brands'),
  Marketing: () => import('./pages/Marketing'),
  Branding: () => import('./pages/Branding'),
  Ecommerce: () => import('./pages/Ecommerce'),
  Contact: () => import('./pages/Contact'),
  PrivacyPolicy: () => import('./pages/PrivacyPolicy'),
  RawRadicles: () => import('./pages/RawRadicles'),
  StartProject: () => import('./pages/StartProject'),
  TermsOfUse: () => import('./pages/TermsOfUse'),
  Blogs: () => import('./pages/Blogs'),
  BlogPost: () => import('./pages/BlogPost'),
  NotFound: () => import('./pages/NotFound'),
};

const pageByPath = {
  '/': 'Home',
  '/about': 'About',
  '/brands': 'Brands',
  '/brands/raw-radicles': 'RawRadicles',
  '/marketing': 'Marketing',
  '/branding': 'Branding',
  '/ecommerce': 'Ecommerce',
  '/contact': 'Contact',
  '/start': 'StartProject',
  '/privacy': 'PrivacyPolicy',
  '/terms': 'TermsOfUse',
};

const normalizePath = (pathname) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

const getPageName = (pathname) => {
  if (pathname === '/blogs') return 'Blogs';
  if (pathname.startsWith('/blogs/')) return 'BlogPost';
  return pageByPath[pathname] || 'NotFound';
};

export async function loadHydrationPage(pathname, loaders = defaultLoaders) {
  const normalizedPath = normalizePath(pathname);
  const pageName = getPageName(normalizedPath);
  const pageModule = await loaders[pageName]();

  return { [pageName]: pageModule.default };
}

export function shouldHydratePrerenderedPage(hasMarkup, pages, pathname) {
  const normalizedPath = normalizePath(pathname);

  return Boolean(
    hasMarkup &&
    pages &&
    !pages.NotFound &&
    PUBLIC_ROUTES.includes(normalizedPath),
  );
}
