import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { loadHydrationPage } from './hydrationRoute';
import './index.css';

const container = document.getElementById('root');
const pages = container.hasChildNodes()
  ? await loadHydrationPage(window.location.pathname)
  : undefined;
const app = (
  <StrictMode>
    <App pages={pages} />
  </StrictMode>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
