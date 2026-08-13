import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import {
  loadHydrationPage,
  shouldHydratePrerenderedPage,
} from './hydrationRoute';
import './index.css';

const container = document.getElementById('root');
const hasPrerenderedMarkup = container.hasChildNodes();
const pages = hasPrerenderedMarkup
  ? await loadHydrationPage(window.location.pathname)
  : undefined;
const app = (
  <StrictMode>
    <App pages={pages} />
  </StrictMode>
);

if (
  shouldHydratePrerenderedPage(
    hasPrerenderedMarkup,
    pages,
    window.location.pathname,
  )
) {
  hydrateRoot(container, app);
} else {
  if (hasPrerenderedMarkup) container.replaceChildren();
  createRoot(container).render(app);
}
