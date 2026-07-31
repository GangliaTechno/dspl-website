# Contact and Supporter Marquee Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage supporter conveyor more breathing room and turn the Contact page into a tighter, form-first conversion surface on smaller screens without changing operational contact data or submission behavior.

**Architecture:** Keep `SupporterStrip.jsx` and its measured duplicate-sequence algorithm unchanged; only update the shared responsive gap tokens and their regression contract. Refactor the Contact details markup into one panel with three rows, then express responsive reading order and hero density entirely in `Contact.css`, leaving the form state, validation, analytics, and Web3Forms code untouched.

**Tech Stack:** React 19, React Router, CSS custom properties and media queries, Lucide React, Vitest, Testing Library, Vite.

## Global Constraints

- Work only on `pawan/raw-radicles-redesign`.
- Do not push, merge, deploy, or modify `main`.
- Use exact supporter gaps of `4.5rem` desktop and `3rem` at `max-width: 768px`.
- Preserve the current supporter assets, baseline, opacity, `22s linear infinite` animation, measured `--supporter-shift`, and reduced-motion behavior.
- Preserve all current Contact details, links, fields, options, validation messages, honeypot behavior, analytics event, Web3Forms endpoint, and submission states.
- Keep the Contact hero light and image-free.
- At `max-width: 900px`, render the form visually before headquarters using CSS order; preserve the desktop DOM and two-column reading structure.

---

### Task 1: Increase the supporter conveyor breathing room

**Files:**
- Modify: `src/__tests__/designSystemRegression.test.js:299-310`
- Modify: `src/components/home/homeSections.css:1-123`

**Interfaces:**
- Consumes: `.supporter-band`, `.supporter-sequence`, `--supporter-gap`, and the existing `SupporterStrip.jsx` sequence measurement.
- Produces: exact `72px` desktop and `48px` phone edge gaps, including the duplicated-sequence seam.

- [ ] **Step 1: Update the regression expectations first**

Replace only the gap assertions in `src/__tests__/designSystemRegression.test.js`:

```js
expect(homeSections).toContain('--supporter-gap: 4.5rem;');
expect(homeSections).toMatch(
  /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?--supporter-gap:\s*3rem;/s,
);
```

Retain the existing assertions for `translate3d`, reduced motion, automatic logo width, the absence of per-logo offsets, and the absence of a pause control.

- [ ] **Step 2: Run the focused test and confirm the red state**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: exactly the supporter gap contract fails because production CSS still contains `3.75rem` and `2.5rem`.

- [ ] **Step 3: Apply the minimal CSS change**

Update the two declarations in `src/components/home/homeSections.css`:

```css
.supporter-band {
  --supporter-gap: 4.5rem;
}

@media (max-width: 768px) {
  .supporter-band {
    --supporter-gap: 3rem;
  }
}
```

Do not change animation duration, slot height, image size, edge fade, asset files, or sequence markup.

- [ ] **Step 4: Run the focused test and confirm green**

Run:

```powershell
npx vitest run src/__tests__/designSystemRegression.test.js
```

Expected: the focused suite passes with zero failures.

- [ ] **Step 5: Commit the marquee change**

```powershell
git add -- src/__tests__/designSystemRegression.test.js src/components/home/homeSections.css
git commit -m "fix: add breathing room to supporter marquee"
```

---

### Task 2: Consolidate Contact details and prioritize the form on smaller screens

**Files:**
- Create: `src/pages/__tests__/Contact.test.jsx`
- Modify: `src/__tests__/designSystemRegression.test.js`
- Modify: `src/pages/Contact.jsx:117-164`
- Modify: `src/pages/Contact.css:6-94`
- Modify: `src/pages/Contact.css:186-210`

**Interfaces:**
- Consumes: existing `Contact` form state, validation functions, Web3Forms payload, analytics event, contact links, and Lucide icons.
- Produces: `.contact-details-panel`, three `.contact-detail-row` elements, `.detail-info h3` typography, `58ch` hero copy, and mobile `.form-column { order: -1; }`.

- [ ] **Step 1: Add a rendered structure regression test**

Create `src/pages/__tests__/Contact.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Contact from '../Contact';

vi.mock('../../hooks/useSEO', () => ({
  default: vi.fn(),
}));

describe('Contact', () => {
  it('keeps one headquarters panel with the verified contact routes', () => {
    const { container } = render(<Contact />);
    const panel = container.querySelector('.contact-details-panel');
    const rows = panel?.querySelectorAll('.contact-detail-row');

    expect(panel).toBeInTheDocument();
    expect(rows).toHaveLength(3);
    expect(screen.getByRole('link', { name: '+91 88619 42440' }))
      .toHaveAttribute('href', 'tel:+918861942440');
    expect(screen.getByRole('link', { name: '+91 90725 56665' }))
      .toHaveAttribute('href', 'tel:+919072556665');
    expect(screen.getByRole('link', { name: 'director@dashapatmaja.in' }))
      .toHaveAttribute('href', 'mailto:director@dashapatmaja.in');
    expect(screen.getByRole('link', { name: 'dsplmanipal@gmail.com' }))
      .toHaveAttribute('href', 'mailto:dsplmanipal@gmail.com');
  });

  it('preserves the primary enquiry fields and choices', () => {
    render(<Contact />);

    expect(screen.getByLabelText('First Name')).toBeRequired();
    expect(screen.getByLabelText('Last Name')).toBeRequired();
    expect(screen.getByLabelText('Email Address')).toBeRequired();
    expect(screen.getByLabelText('What do you need help with?')).toBeRequired();
    expect(screen.getByLabelText('Message')).toBeRequired();
    expect(screen.getByRole('button', { name: /Send Message/i }))
      .toHaveAttribute('type', 'submit');
  });
});
```

- [ ] **Step 2: Add deterministic CSS and source contracts**

Inside the existing design-system regression suite, read the Contact sources and add:

```js
const contactPage = readSource('src/pages/Contact.jsx');
const contactCss = readSource('src/pages/Contact.css');

expect(contactPage).toContain('className="contact-details-panel"');
expect(contactPage.match(/className="contact-detail-row"/g)).toHaveLength(3);
expect(contactPage).not.toContain('className="contact-detail-card glass"');
expect(contactCss).toMatch(
  /\.contact-description\s*{[^}]*max-width:\s*58ch;[^}]*margin-inline:\s*auto;/s,
);
expect(contactCss).toMatch(
  /\.detail-info h3\s*{[^}]*font-size:\s*1\.1rem;[^}]*margin-bottom:\s*0\.5rem;/s,
);
expect(contactCss).not.toContain('.detail-info h4');
expect(contactCss).toMatch(
  /@media\s*\(max-width:\s*900px\)\s*{[\s\S]*?\.form-column\s*{[^}]*order:\s*-1;/s,
);
expect(contactCss).toMatch(
  /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?\.contact-hero\s*{[^}]*padding:\s*4\.5rem 0 3rem;/s,
);
```

- [ ] **Step 3: Run the two focused test files and confirm red**

Run:

```powershell
npx vitest run src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: the new Contact structure and CSS assertions fail because the page still uses three cards, `h4` styling, the old hero spacing, and the old responsive order.

- [ ] **Step 4: Consolidate the Contact details markup**

Replace only the current three-card block inside `.details-column` with:

```jsx
<div className="contact-details-panel">
  <div className="contact-detail-row">
    <MapPin className="detail-icon" aria-hidden="true" />
    <div className="detail-info">
      <h3>Address</h3>
      <p>Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal 576104</p>
    </div>
  </div>

  <div className="contact-detail-row">
    <Phone className="detail-icon" aria-hidden="true" />
    <div className="detail-info">
      <h3>Phone Call</h3>
      <p><a href="tel:+918861942440">+91 88619 42440</a></p>
      <p><a href="tel:+919072556665">+91 90725 56665</a></p>
    </div>
  </div>

  <div className="contact-detail-row">
    <Mail className="detail-icon" aria-hidden="true" />
    <div className="detail-info">
      <h3>Email Support</h3>
      <p><a href="mailto:director@dashapatmaja.in">director@dashapatmaja.in</a></p>
      <p><a href="mailto:dsplmanipal@gmail.com">dsplmanipal@gmail.com</a></p>
    </div>
  </div>
</div>
```

Do not edit any form JSX below `.form-column`.

- [ ] **Step 5: Replace card styling with one restrained panel**

Use the following Contact CSS owners:

```css
.contact-description {
  max-width: 58ch;
  margin-inline: auto;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-details-panel {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.contact-detail-row {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
  padding: 1.75rem 2rem;
}

.contact-detail-row + .contact-detail-row {
  border-top: 1px solid var(--border-color);
}

.detail-info h3 {
  margin: 0 0 0.5rem;
  color: var(--text-heading);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
}
```

Delete `.contact-detail-card`, `.contact-detail-card:hover`, and `.detail-info h4`. Keep the existing icon, paragraph, link, form, success, and error owners.

- [ ] **Step 6: Add responsive order and density**

Use:

```css
@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .form-column {
    order: -1;
    padding: 2.5rem;
  }
}

@media (max-width: 768px) {
  .contact-hero {
    padding: 4.5rem 0 3rem;
  }

  .contact-title {
    font-size: 2.25rem;
  }
}

@media (max-width: 576px) {
  .contact-detail-row {
    gap: 1rem;
    padding: 1.5rem;
  }
}
```

- [ ] **Step 7: Run focused tests and confirm green**

Run:

```powershell
npx vitest run src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
```

Expected: both test files pass with zero failures.

- [ ] **Step 8: Commit the Contact polish**

```powershell
git add -- src/pages/Contact.jsx src/pages/Contact.css src/pages/__tests__/Contact.test.jsx src/__tests__/designSystemRegression.test.js
git commit -m "feat: refine contact conversion layout"
```

---

### Task 3: Visual and production verification

**Files:**
- Verify only; modify a Task 1 or Task 2 file only if its verified behavior does not match the specification.

**Interfaces:**
- Consumes: completed Tasks 1 and 2.
- Produces: evidence that the responsive layouts, continuous marquee seam, form behavior, and production build remain valid.

- [ ] **Step 1: Verify the homepage marquee at desktop width**

At `1024x768`, measure the first sequence's four `.supporter-logo-slot` rectangles and the next sequence's first slot.

Expected:

```text
Adjacent edge gaps: 72, 72, 72
Repeat seam: 72
All slot bottoms: equal
Horizontal overflow: 0
```

Observe at least two animation positions to confirm no blank seam or popping.

- [ ] **Step 2: Verify the homepage marquee at phone width**

At `390x844`, repeat the measurement.

Expected:

```text
Adjacent edge gaps: 48, 48, 48
Repeat seam: 48
All slot bottoms: equal
Horizontal overflow: 0
```

- [ ] **Step 3: Verify Contact at desktop and phone widths**

Desktop expectations:

```text
Headquarters panel is left of the form.
One outer details panel contains three divided rows.
The form fields and submit button are unchanged.
```

Phone expectations:

```text
Form top is above headquarters top.
Hero uses the compact spacing.
No horizontal overflow.
All phone and email links remain present.
```

- [ ] **Step 4: Check browser diagnostics**

Read console logs after loading `/` and `/contact`.

Expected: no `warn`, `warning`, or `error` entries caused by the changes.

- [ ] **Step 5: Run the full verification gate**

Run each command and require exit code `0`:

```powershell
git diff --check
npm run lint
npm test
npm run build
npm run verify:html
```

Expected:

```text
ESLint reports no errors.
All Vitest files pass.
Vite produces a production build and prerenders 8 public routes.
verify:html verifies all 8 public routes.
```

- [ ] **Step 6: Confirm branch safety**

Run:

```powershell
git branch --show-current
git status --short
git log -3 --oneline
```

Expected: current branch is `pawan/raw-radicles-redesign`; there are no unrelated changes; no push, merge, deployment, or `main` mutation has occurred.
