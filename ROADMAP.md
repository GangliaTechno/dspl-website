# DSPL Website - Development Audit & 7-PR Roadmap

This document serves as the master audit and implementation roadmap for **[dashapatmaja.in](https://dashapatmaja.in/)** (`GangliaTechno/dspl-website`).

Working Branch: `pawan/dev` (Branched off `vimal`)

---

## 📊 Overall Roadmap Status

- [x] **PR 1: Analytics Foundation** (`pawan/analytics-cleanup`)
- [x] **PR 2: Accessibility Baseline** (`pawan/accessibility-baseline`)
- [x] **PR 3: SEO Foundation & 404 Route** (`pawan/seo-foundation`)
- [x] **PR 4: Forms & Privacy** (`pawan/forms-privacy`)
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

### Phase 2: Accessibility Baseline (Completed)
- [x] **Mobile Menu**: Added `aria-expanded`, `aria-controls="mobile-navigation"`, and `Escape` key closing.
- [x] **Modal Accessibility**: Added `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` key dismissal in `WorkWithUsModal.jsx`.
- [x] **Keyboard Focus**: Added global `:focus-visible` styling tokens in `src/index.css`.
- [x] **Form Error Announcements**: Bound `role="alert"` & `aria-live` to feedback elements.
- [x] **Reduced Motion**: Added `@media (prefers-reduced-motion: reduce)` rules for animations and marquees in `src/index.css`.

### Phase 3: SEO & 404 Route (Completed)
- [x] **Canonical & Social Meta**: Added OpenGraph (`og:*`), Twitter Cards (`twitter:*`), and dynamic canonical URL tags in `src/hooks/useSEO.js`.
- [x] **Robots & Assets**: Created `public/robots.txt` and stable `public/logo.png` schema image.
- [x] **404 Route**: Created `src/pages/NotFound.jsx` with quick links & 404 analytics tracking, wired to `<Route path="*" element={<NotFound />} />` in `App.jsx`.
- [x] **Sitemap**: Updated `public/sitemap.xml` with `<lastmod>` timestamps and change frequencies.

### Phase 4: Forms & Privacy (Completed)
- [x] **Privacy Policy & Terms**: Created `src/pages/PrivacyPolicy.jsx` page and footer legal links.
- [x] **Web3Forms Security**: Added honeypot `botcheck` spam protection in lead forms.
- [x] **File Upload**: Wired up file selector dropzone, filename display, and remove handler in `WorkWithUsModal.jsx`.
- [x] **Messaging Consistency**: Aligned response promises to 24 hours across Contact and Footer components.

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
