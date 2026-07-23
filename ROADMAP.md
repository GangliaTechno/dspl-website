# DSPL Website - Development Audit & 7-PR Roadmap

This document serves as the master audit and implementation roadmap for **[dashapatmaja.in](https://dashapatmaja.in/)** (`GangliaTechno/dspl-website`).

Working Branch: `pawan/dev` (Branched off `vimal`)

---

## 📊 Overall Roadmap Status

- [x] **PR 1: Analytics Foundation** (`pawan/analytics-cleanup`)
- [ ] **PR 2: Accessibility Baseline** (`pawan/accessibility-baseline`)
- [ ] **PR 3: SEO Foundation & 404 Route** (`pawan/seo-foundation`)
- [ ] **PR 4: Forms & Privacy** (`pawan/forms-privacy`)
- [ ] **PR 5: Testing & CI Automation** (`pawan/testing-ci`)
- [ ] **PR 6: Performance & Component Refactoring** (`pawan/performance`)
- [ ] **PR 7: Conversion Content & Proof** (`pawan/conversion`)

---

## 🎯 Detailed Action Plan per Phase

### Phase 1: Analytics Foundation (Completed)
- [x] Remove duplicate GA script tags from `index.html`.
- [x] Remove redundant inline `ReactGA.initialize` in `src/main.jsx`.
- [x] Create `src/utils/analytics.js` with `import.meta.env.DEV` mode checks.
- [x] Create `src/components/AnalyticsTracker.jsx` to track SPA React Router navigation (`useLocation`).
- [x] Unify lead event tracking in `WorkWithUsModal.jsx` using `trackEvent()`.

### Phase 2: Accessibility Baseline
- [ ] **Mobile Menu**: Add `aria-expanded` and `aria-controls="mobile-navigation"`, Escape key closing.
- [ ] **Modal Accessibility**: Add `role="dialog"`, `aria-modal="true"`, focus trap, and Escape key dismissal in `WorkWithUsModal.jsx`.
- [ ] **Keyboard Focus**: Add global `:focus-visible` styling tokens in `src/index.css`.
- [ ] **Form Error Announcements**: Bind `aria-invalid` and `aria-describedby` to error elements.
- [ ] **Reduced Motion**: Add `@media (prefers-reduced-motion: reduce)` rules for animations and marquees in `src/index.css`.

### Phase 3: SEO & 404 Route
- [ ] **Canonical & Social Meta**: Add OpenGraph (`og:*`) & Twitter tags (`twitter:*`).
- [ ] **Robots & Assets**: Create `public/robots.txt` and fix logo URLs in schema JSON-LD.
- [ ] **404 Route**: Create `src/pages/NotFound.jsx` and add `<Route path="*" element={<NotFound />} />` in `App.jsx`.
- [ ] **Sitemap**: Validate `public/sitemap.xml` with `<lastmod>` timestamps.

### Phase 4: Forms & Privacy
- [ ] **Privacy Policy & Terms**: Create `PrivacyPolicy.jsx` page and footer links.
- [ ] **Web3Forms Security**: Add honeypot spam protection fields and development submission bypass.
- [ ] **File Upload**: Implement real file uploading or clean up dummy filename storage.
- [ ] **Messaging Consistency**: Align response promises ("within 24 hours" vs "2 working days").

### Phase 5: Testing & CI
- [ ] **Vitest & RTL**: Add component tests for form validation and modal behavior.
- [ ] **Playwright**: Add E2E tests for routing and user flow.
- [ ] **GitHub Actions**: Add `.github/workflows/ci.yml` for lint/test/build checks on PRs.

### Phase 6: Performance Refactor
- [ ] **Route Lazy Loading**: Use `React.lazy()` and `<Suspense>` in `App.jsx`.
- [ ] **Component Splitting**: Break down `Home.jsx` into `HeroSection`, `ServicesSection`, `BrandsSection`.
- [ ] **Image Optimization**: WebP formats, explicit `width`/`height` attributes, and `loading="lazy"`.

### Phase 7: Conversion Content
- [ ] Add case studies, testimonials, and trust badges.
- [ ] Add process workflow timeline (Discovery -> Strategy -> Execution).
