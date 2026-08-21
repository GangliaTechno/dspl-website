import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { afterEach, describe, it, expect } from 'vitest';
import Header from '../Header';

const originalInnerWidth = window.innerWidth;

const renderHeader = (path = '/') =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Header />
    </MemoryRouter>,
  );

afterEach(() => {
  window.innerWidth = originalInnerWidth;
  document.body.style.overflow = '';
});

describe('Header Component', () => {
  it('renders the approved first-level navigation without menu roles or stale labels', () => {
    renderHeader();

    expect(
      screen.getByAltText('Dashapatmaja Solutions Pvt Ltd logo'),
    ).toBeInTheDocument();
    const desktopNav = screen.getByRole('navigation', { name: 'Main Navigation' });

    expect(within(desktopNav).getByRole('button', { name: 'Company' })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('button', { name: 'Capabilities' })).toBeInTheDocument();
    expect(within(desktopNav).getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/blogs');
    expect(within(desktopNav).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(desktopNav).queryByRole('link', { name: 'Blogs' })).not.toBeInTheDocument();
    expect(within(desktopNav).queryByRole('link', { name: 'Raw Radicles' })).not.toBeInTheDocument();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });

  it('connects desktop disclosures to stable controlled panel ids', () => {
    renderHeader();

    expect(screen.getByRole('button', { name: 'Company' })).toHaveAttribute(
      'aria-controls',
      'desktop-nav-company-panel',
    );
    expect(screen.getByRole('button', { name: 'Capabilities' })).toHaveAttribute(
      'aria-controls',
      'desktop-nav-capabilities-panel',
    );
  });

  it('opens Company with its ordered links, descriptors, and destinations', () => {
    renderHeader();

    const companyButton = screen.getByRole('button', { name: 'Company' });
    fireEvent.click(companyButton);

    const panel = document.getElementById('desktop-nav-company-panel');
    expect(screen.getByRole('banner')).toHaveClass('header-navigation-open');
    expect(companyButton).toHaveAttribute('aria-expanded', 'true');
    expect(panel).not.toHaveAttribute('hidden');
    expect(within(panel).getAllByRole('link').map((link) => link.querySelector('.nav-panel-title').textContent)).toEqual([
      'About DSPL',
      'Our Brands',
    ]);
    expect(within(panel).getByText('Company, leadership, journey and direction')).toBeInTheDocument();
    expect(within(panel).getByText('Consumer brands developed and operated by DSPL')).toBeInTheDocument();
    expect(within(panel).getByRole('link', { name: 'About DSPL' })).toHaveAttribute('href', '/about');
    expect(within(panel).getByRole('link', { name: 'Our Brands' })).toHaveAttribute('href', '/brands');
  });

  it('keeps only one desktop group open and closes a group on its second click', () => {
    renderHeader();

    const companyButton = screen.getByRole('button', { name: 'Company' });
    const capabilitiesButton = screen.getByRole('button', { name: 'Capabilities' });
    const companyPanel = document.getElementById('desktop-nav-company-panel');
    const capabilitiesPanel = document.getElementById('desktop-nav-capabilities-panel');

    fireEvent.click(companyButton);
    fireEvent.click(capabilitiesButton);
    expect(companyPanel).toHaveAttribute('hidden');
    expect(capabilitiesPanel).not.toHaveAttribute('hidden');
    expect(within(capabilitiesPanel).getAllByRole('link').map((link) => link.querySelector('.nav-panel-title').textContent)).toEqual([
      'Branding',
      'Marketing',
      'E-commerce',
    ]);

    fireEvent.click(capabilitiesButton);
    expect(capabilitiesPanel).toHaveAttribute('hidden');
    expect(capabilitiesButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes desktop disclosures on outside pointer activation', () => {
    renderHeader();

    const companyButton = screen.getByRole('button', { name: 'Company' });
    fireEvent.click(companyButton);
    fireEvent.pointerDown(document.body);

    expect(companyButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on Escape and returns focus to the desktop opener', () => {
    renderHeader();

    const companyButton = screen.getByRole('button', { name: 'Company' });
    fireEvent.click(companyButton);
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(companyButton).toHaveAttribute('aria-expanded', 'false');
    expect(companyButton).toHaveFocus();
  });

  it('closes a desktop disclosure after a route change', async () => {
    renderHeader('/');

    const companyButton = screen.getByRole('button', { name: 'Company' });
    fireEvent.click(companyButton);
    fireEvent.click(within(document.getElementById('desktop-nav-company-panel')).getByRole('link', {
      name: 'About DSPL',
    }));

    await waitFor(() => expect(companyButton).toHaveAttribute('aria-expanded', 'false'));
  });

  it('closes desktop state when crossing below the 1040px breakpoint', () => {
    renderHeader();

    const companyButton = screen.getByRole('button', { name: 'Company' });
    fireEvent.click(companyButton);

    window.innerWidth = 1039;
    fireEvent(window, new Event('resize'));

    expect(companyButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('records meaningful disclosure scroll while keeping the persistent shell visible', async () => {
    const originalAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;
    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });

    renderHeader();
    const header = screen.getByRole('banner');
    const companyButton = screen.getByRole('button', { name: 'Company' });

    fireEvent.click(companyButton);
    window.scrollY = 11;
    fireEvent.scroll(window);
    await waitFor(() => expect(companyButton).toHaveAttribute('aria-expanded', 'true'));

    window.scrollY = 12;
    fireEvent.scroll(window);
    await waitFor(() => expect(companyButton).toHaveAttribute('aria-expanded', 'false'));
    expect(header).not.toHaveClass('header-hidden');
    expect(header).not.toHaveClass('header-lifted');

    window.requestAnimationFrame = originalAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    window.scrollY = 0;
  });

  it('applies exact and family current states without activating unrelated routes', () => {
    const exactRoute = renderHeader('/brands');
    expect(screen.getByRole('button', { name: 'Company' })).toHaveAttribute('aria-current', 'location');
    fireEvent.click(screen.getByRole('button', { name: 'Company' }));
    expect(within(document.getElementById('desktop-nav-company-panel')).getByRole('link', { name: 'Our Brands' })).toHaveAttribute('aria-current', 'page');
    exactRoute.unmount();

    const { unmount } = renderHeader('/brands/raw-radicles');
    expect(screen.getByRole('button', { name: 'Company' })).toHaveAttribute('aria-current', 'location');
    fireEvent.click(screen.getByRole('button', { name: 'Company' }));
    expect(within(document.getElementById('desktop-nav-company-panel')).getByRole('link', { name: 'Our Brands' })).toHaveAttribute('aria-current', 'location');
    unmount();

    renderHeader('/blogs/article');
    expect(screen.getByRole('link', { name: 'Insights' })).toHaveAttribute('aria-current', 'location');
    expect(screen.getByRole('link', { name: 'Contact' })).not.toHaveAttribute('aria-current');
  });

  it('activates only the Start a project CTA on the start route', () => {
    renderHeader('/start');

    const cta = screen.getAllByRole('link', { name: 'Start a project' })[0];
    expect(cta).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Company' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Insights' })).not.toHaveAttribute('aria-current');
  });

  it('renders the shared mobile hierarchy with accordions, direct links, and a separate CTA', async () => {
    window.innerWidth = 375;
    renderHeader();

    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });

    expect(within(drawer).getByRole('button', { name: 'Company' })).toBeInTheDocument();
    expect(within(drawer).getByRole('button', { name: 'Capabilities' })).toBeInTheDocument();
    expect(within(drawer).getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/blogs');
    expect(within(drawer).getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact');
    expect(within(drawer).getByRole('link', { name: 'Start a project' })).toHaveAttribute('href', '/start');
  });

  it('toggles the whole mobile group row and keeps one accordion open', () => {
    window.innerWidth = 375;
    renderHeader();
    fireEvent.click(screen.getByLabelText('Open navigation menu'));

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    const companyButton = within(drawer).getByRole('button', { name: 'Company' });
    const capabilitiesButton = within(drawer).getByRole('button', { name: 'Capabilities' });
    const companyPanel = document.getElementById('mobile-nav-company-panel');
    const capabilitiesPanel = document.getElementById('mobile-nav-capabilities-panel');

    fireEvent.click(companyButton);
    expect(companyButton).toHaveAttribute('aria-expanded', 'true');
    expect(companyPanel).not.toHaveAttribute('hidden');

    fireEvent.click(capabilitiesButton);
    expect(companyPanel).toHaveAttribute('hidden');
    expect(capabilitiesPanel).not.toHaveAttribute('hidden');

    fireEvent.click(capabilitiesButton);
    expect(capabilitiesPanel).toHaveAttribute('hidden');
  });

  it('auto-expands the current mobile parent and marks family links as location', () => {
    window.innerWidth = 375;
    renderHeader('/brands/raw-radicles');
    fireEvent.click(screen.getByLabelText('Open navigation menu'));

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    expect(within(drawer).getByRole('button', { name: 'Company' })).toHaveAttribute('aria-expanded', 'true');
    expect(within(drawer).getByRole('link', { name: 'Our Brands' })).toHaveAttribute('aria-current', 'location');
  });

  it('auto-expands a capability parent and marks its exact child as page', () => {
    window.innerWidth = 375;
    renderHeader('/branding');
    fireEvent.click(screen.getByLabelText('Open navigation menu'));

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    expect(within(drawer).getByRole('button', { name: 'Capabilities' })).toHaveAttribute('aria-expanded', 'true');
    expect(within(drawer).getByRole('link', { name: 'Branding' })).toHaveAttribute('aria-current', 'page');
  });

  it('excludes collapsed mobile descendants from the drawer focus cycle', async () => {
    window.innerWidth = 375;
    renderHeader();
    fireEvent.click(screen.getByLabelText('Open navigation menu'));

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    const closeButton = within(drawer).getByRole('button', { name: 'Close navigation menu' });
    const startProject = within(drawer).getByRole('link', { name: 'Start a project' });
    const companyPanel = document.getElementById('mobile-nav-company-panel');

    expect(companyPanel).toHaveAttribute('hidden');
    expect(companyPanel.querySelector('a')).not.toBeNull();
    await waitFor(() => expect(closeButton).toHaveFocus());
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(startProject).toHaveFocus();
  });

  it('clears desktop disclosure state when mobile navigation opens', () => {
    renderHeader();
    const desktopCompany = within(screen.getByRole('banner')).getByRole('button', { name: 'Company' });
    fireEvent.click(desktopCompany);
    expect(desktopCompany).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(screen.getByLabelText('Open navigation menu'));
    expect(desktopCompany).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile drawer on Escape and backdrop activation while restoring body scroll and focus', async () => {
    window.innerWidth = 375;
    renderHeader();
    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);
    await waitFor(() => expect(document.body.style.overflow).toBe('hidden'));

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(menuButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('');

    fireEvent.click(menuButton);
    fireEvent.click(document.querySelector('.mobile-drawer-backdrop'));
    expect(menuButton).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
  });

  it('toggles mobile menu button with proper ARIA attributes', () => {
    renderHeader();

    const toggleBtn = screen.getByLabelText('Open navigation menu');
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggleBtn);
    expect(toggleBtn).toHaveAttribute('aria-expanded', 'true');
    expect(toggleBtn).toHaveAttribute('tabindex', '-1');
  });

  it('keeps the drawer open through 1039px and closes it at 1040px', () => {
    renderHeader();

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    window.innerWidth = 1039;
    fireEvent(window, new Event('resize'));
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    window.innerWidth = 1040;
    fireEvent(window, new Event('resize'));
    expect(screen.getByLabelText('Open navigation menu')).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps the internal drawer close control inside the keyboard focus cycle', async () => {
    renderHeader();

    const menuButton = screen.getByLabelText('Open navigation menu');
    fireEvent.click(menuButton);

    const drawer = screen.getByRole('dialog', { name: 'Navigation menu' });
    const closeButton = within(drawer).getByRole('button', {
      name: 'Close navigation menu',
    });
    const startProject = within(drawer).getByRole('link', {
      name: 'Start a project',
    });

    await waitFor(() => expect(closeButton).toHaveFocus());
    fireEvent.keyDown(window, { key: 'Tab', shiftKey: true });
    expect(startProject).toHaveFocus();

    fireEvent.click(closeButton);
    expect(menuButton).toHaveFocus();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('morphs into a compact floating shell on scroll and restores at top', async () => {
    const originalAnimationFrame = window.requestAnimationFrame;
    const originalCancelAnimationFrame = window.cancelAnimationFrame;

    window.requestAnimationFrame = (callback) => window.setTimeout(callback, 0);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
    Object.defineProperty(window, 'scrollY', {
      configurable: true,
      writable: true,
      value: 0,
    });

    renderHeader();

    const header = screen.getByRole('banner');

    expect(header).not.toHaveClass('header-scrolled');

    window.scrollY = 60;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).toHaveClass('header-scrolled'));

    window.scrollY = 300;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).toHaveClass('header-scrolled'));

    window.scrollY = 8;
    fireEvent.scroll(window);
    await waitFor(() => expect(header).not.toHaveClass('header-scrolled'));

    window.requestAnimationFrame = originalAnimationFrame;
    window.cancelAnimationFrame = originalCancelAnimationFrame;
    window.scrollY = 0;
  });
});
