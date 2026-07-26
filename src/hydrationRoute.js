const defaultLoaders = {
  Home: () => import('./pages/Home'),
  About: () => import('./pages/About'),
  Brands: () => import('./pages/Brands'),
  Marketing: () => import('./pages/Marketing'),
  Branding: () => import('./pages/Branding'),
  Ecommerce: () => import('./pages/Ecommerce'),
  Contact: () => import('./pages/Contact'),
  PrivacyPolicy: () => import('./pages/PrivacyPolicy'),
  NotFound: () => import('./pages/NotFound'),
};

const pageByPath = {
  '/': 'Home',
  '/about': 'About',
  '/brands': 'Brands',
  '/marketing': 'Marketing',
  '/branding': 'Branding',
  '/ecommerce': 'Ecommerce',
  '/contact': 'Contact',
  '/privacy': 'PrivacyPolicy',
};

export async function loadHydrationPage(pathname, loaders = defaultLoaders) {
  const normalizedPath =
    pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const pageName = pageByPath[normalizedPath] || 'NotFound';
  const pageModule = await loaders[pageName]();

  return { [pageName]: pageModule.default };
}
