# DSPL Evidence-Led Site Evolution

Date: 2026-07-26
Status: Approved direction; implementation planning pending
Repository: this checkout
Worktree branch: `pawan/raw-radicles-redesign`
Baseline commit: `8bd45627c4e1be8c60280dc5c277e22d36e3c7d9`

## Purpose

Evolve the DSPL website into a more credible, maintainable, and conversion-focused expression of the existing brand without discarding its current identity. The work will preserve the warm cream, black, and gold palette, Outfit typography, institutional positioning, and the existing React/Vite route structure.

The redesign will be evidence-led. It may present only claims supported by repository content or facts supplied and approved by DSPL. It must not invent client names, testimonials, performance figures, affiliations, awards, or market outcomes.

## Worktree Boundary

All work belongs to the active project worktree on `pawan/raw-radicles-redesign`.

The following existing Orca worktrees are explicitly outside scope:

- the historical `pawan-dev` worktree
- the historical `pawan-main-2` worktree

Implementation must begin by confirming a clean status in the current worktree. It must not merge, rebase, modify, or remove either Orca worktree. A separate worktree should be created only if the implementation plan identifies a concrete isolation need and the user approves it.

## Product Outcome

A founder landing on the homepage should understand within ten seconds:

1. DSPL builds and grows Indian consumer brands.
2. Branding, marketing, and e-commerce are delivered as one coordinated system.
3. DSPL has institutional support and operates its own consumer brand, Raw Radicles.
4. There is a clear, structured engagement process.
5. The next step is a low-friction discovery enquiry.

## Scope

### 1. Evidence-first homepage

Retain the core promise, but sharpen the supporting copy toward Indian D2C founders and consumer businesses.

Reorder the homepage around this reading sequence:

1. Specific value proposition and primary enquiry action.
2. Institutional support and operating proof.
3. Three coordinated service capabilities.
4. Six-step engagement framework.
5. Raw Radicles as an owned-brand case study.
6. Final discovery call to action.

The institutional logo strip must be readable, labelled, restrained, and non-repetitive. Motion is allowed only when it adds meaning and must stop under reduced-motion preferences.

Raw Radicles will be described as proof that DSPL works across brand strategy, packaging, market presentation, and commerce. It will not include unverified sales, distribution, health, or performance claims.

### 2. Visual system alignment

`DESIGN.md` remains the governing visual source.

The implementation will:

- centralize active colors, spacing, type, radius, border, shadow, focus, and container values as CSS custom properties;
- keep gold rare and conversion-focused;
- preserve sharp primary controls and warm layered surfaces;
- reduce oversized vertical gaps and repeated card-grid rhythms;
- enforce readable body line lengths;
- keep visible keyboard focus and reduced-motion behavior;
- use real repository imagery rather than invented client work.

This is an evolution, not a wholesale aesthetic replacement.

### 3. Component and styling architecture

Keep React 19, Vite, React Router, and route-level lazy loading.

Extract narrowly reusable presentation owners where they reduce current duplication:

- section heading and introduction treatment;
- proof or affiliation strip;
- conversion callout;
- process step presentation;
- shared button and surface variants.

Large pages should be decomposed only along visible section or behavioral boundaries. Avoid creating a generic component system that obscures page meaning.

Move substantial inline `<style>` blocks into named, co-located CSS files. Global tokens and true cross-route primitives belong in `src/index.css`; page-specific layout remains with its page.

The global modal may continue to be rendered once at the application shell, but its open action must have a named interface rather than ad hoc `CustomEvent` calls scattered through page code. The interface must remain usable from the header, footer, homepage, and Brands page.

### 4. Conversion flow

Preserve Web3Forms submission and the current required environment variable:

`VITE_WEB3FORMS_ACCESS_KEY`

Do not expose secrets beyond Vite's existing public client environment model. Document that the Web3Forms access key is a public form identifier and that sensitive server credentials must never use the `VITE_` prefix.

The enquiry flow will:

- use clear service choices;
- retain honeypot protection;
- retain accessible validation and status messaging;
- preserve file selection only if it remains supported by the current endpoint;
- provide a concise submission promise consistent with the Contact page and footer;
- track successful lead generation through the existing analytics utility.

No CRM, backend, database, or email automation is introduced in this scope.

### 5. SEO and structured information

Preserve unique route titles, descriptions, canonical URLs, Open Graph tags, and Twitter metadata.

Add build-time or server-produced route HTML where it can be integrated without replacing the application stack. The implementation plan must select a maintained approach compatible with React 19 and Vite 8 and must verify the generated HTML for every public route.

Add JSON-LD only for facts the site can support:

- organization identity and contact information;
- website identity;
- service offerings where the schema remains accurate.

The 404 experience must remain user-friendly. Hosting-level behavior should return an actual 404 status where the deployment platform permits it.

### 6. Performance

Measure before changing assets.

Prioritize:

- the homepage LCP image;
- responsive image candidates used above the fold;
- explicit intrinsic dimensions;
- unused production imports;
- route and shared bundle boundaries.

The source asset folder may remain larger than the production payload. No image or component will be deleted in this implementation. Instead, produce a deletion-candidate report containing exact paths, reference evidence, sizes, and recommended disposition for later approval.

`Lightfall.jsx` and `LiquidEther.jsx` must remain untouched unless the plan either integrates their missing dependencies intentionally or classifies them as deletion candidates.

### 7. Accessibility

Target WCAG 2.2 AA for the affected surfaces.

Required checks include:

- keyboard-visible navigation and modal operation;
- focus not obscured by the sticky header;
- minimum practical pointer target sizes;
- heading hierarchy;
- form labels, instructions, errors, and success state;
- reduced-motion behavior;
- contrast for text, institutional logos, controls, and image overlays;
- mobile navigation state and dismissal.

### 8. Documentation

Replace the template README with a project-specific guide containing:

- product purpose;
- route map;
- local setup;
- environment variables;
- scripts and quality gates;
- architecture summary;
- deployment assumptions;
- content and design ownership;
- worktree guidance.

Reconcile `ROADMAP.md` with the active branch and distinguish completed historical phases from current evidence-led work.

Add `.env.example` without a real Web3Forms or analytics credential.

Document the asset deletion report and any deployment drift observed between the current branch and `dashapatmaja.in`.

### 9. Tests

Use test-first development for behavior changes.

Add focused coverage for:

- route rendering and the not-found path;
- homepage proof and six-step framework;
- reusable service page structure;
- opening and closing the global enquiry modal through its public interface;
- required form validation and missing environment configuration;
- route-specific SEO metadata;
- reduced-motion or accessibility behavior where it can be tested reliably.

Tests must assert user-visible behavior rather than internal implementation details.

## Data Flow

1. React Router selects a lazy-loaded page.
2. The page supplies visible content and route-specific metadata.
3. Shared layout components provide navigation, footer, conversion actions, and modal access.
4. The enquiry modal validates client-side input and submits a `FormData` payload to Web3Forms.
5. Successful submission triggers the existing analytics abstraction.
6. No lead data is persisted by this repository.

## Error Handling

- Missing public Web3Forms configuration must produce a clear non-destructive error.
- Network and provider errors must leave user input intact and permit retry.
- Invalid files must be rejected before submission with an accessible explanation.
- Lazy-route loading must keep an accessible loading fallback.
- Analytics failures must never block page use or form submission.
- Optional enhancements such as structured data or motion must fail without removing core content.

## Verification

The implementation is complete only after fresh evidence from:

- `npm run lint`
- `npm test`
- `npm run build`
- route-by-route local browser review at desktop and mobile widths;
- keyboard navigation of header, modal, forms, and footer;
- generated HTML inspection for route metadata and structured data;
- a clean `git status` except for intended changes;
- comparison of changed behavior against this specification.

The final handoff must list any claims that could not be verified and any deployment work intentionally left undone.

## Non-Goals

- No migration to Next.js, Astro, Vike, or another framework.
- No backend, CMS, CRM, authentication, or admin portal.
- No invented case studies or performance statistics.
- No destructive asset or component cleanup.
- No modification of other worktrees.
- No deployment or domain change unless separately requested.
