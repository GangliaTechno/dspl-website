import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import About from './pages/About';
import Branding from './pages/Branding';
import Brands from './pages/Brands';
import Contact from './pages/Contact';
import Ecommerce from './pages/Ecommerce';
import Home from './pages/Home';
import Marketing from './pages/Marketing';
import NotFound from './pages/NotFound';
import PrivacyPolicy from './pages/PrivacyPolicy';
import {
  getRouteMetadata,
  PUBLIC_ROUTES,
} from './seo/routeMetadata';

const SITE_URL = 'https://dashapatmaja.in';
const pages = {
  About,
  Branding,
  Brands,
  Contact,
  Ecommerce,
  Home,
  Marketing,
  NotFound,
  PrivacyPolicy,
};

const releaseReactServerMessagePort = () => {
  // The plugin bundles React's browser server renderer, whose MessagePort
  // otherwise keeps the Node build process alive after every route is emitted.
  for (const handle of globalThis.process?._getActiveHandles?.() ?? []) {
    if (handle.constructor?.name === 'MessagePort') handle.unref?.();
  }
};

const createHeadElements = (metadata) =>
  new Set([
    {
      type: 'link',
      props: {
        rel: 'canonical',
        href: `${SITE_URL}${metadata.canonical}`,
      },
    },
    {
      type: 'meta',
      props: { name: 'description', content: metadata.description },
    },
    {
      type: 'meta',
      props: { property: 'og:title', content: metadata.title },
    },
    {
      type: 'meta',
      props: {
        property: 'og:description',
        content: metadata.description,
      },
    },
    {
      type: 'meta',
      props: {
        property: 'og:url',
        content: `${SITE_URL}${metadata.canonical}`,
      },
    },
    {
      type: 'meta',
      props: { property: 'og:image', content: metadata.image },
    },
    {
      type: 'meta',
      props: { property: 'og:type', content: metadata.type },
    },
    {
      type: 'meta',
      props: { name: 'twitter:card', content: 'summary_large_image' },
    },
    {
      type: 'meta',
      props: { name: 'twitter:title', content: metadata.title },
    },
    {
      type: 'meta',
      props: {
        name: 'twitter:description',
        content: metadata.description,
      },
    },
    {
      type: 'meta',
      props: { name: 'twitter:image', content: metadata.image },
    },
    {
      type: 'script',
      props: {
        type: 'application/ld+json',
        'data-dspl-schema': 'organization',
      },
      children: JSON.stringify(metadata.structuredData),
    },
  ]);

export async function prerender(data) {
  const pathname = new URL(data.url, SITE_URL).pathname;
  const metadata = getRouteMetadata(pathname);
  const html = renderToString(
    <StaticRouter location={pathname}>
      <AppRoutes pages={pages} />
    </StaticRouter>,
  );
  releaseReactServerMessagePort();

  return {
    html,
    links: new Set(PUBLIC_ROUTES),
    head: {
      lang: 'en',
      title: metadata.title,
      elements: createHeadElements(metadata),
    },
  };
}
