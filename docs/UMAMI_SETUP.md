# DSPL Website — Umami Analytics Setup & Configuration Guide

This document explains the Umami Analytics v3 implementation for the DSPL (`Dashapatmaja Solutions Pvt Ltd`) website, replacing Google Analytics 4 (GA4).

---

## 1. Overview & Architecture

### Why Umami Analytics Replaced GA4
- **Privacy-First & Cookie-Free**: Umami collects aggregate metrics without tracking users across websites and without requiring tracking cookies.
- **Lightweight Performance**: Under 3KB lightweight script compared to heavy GA4/GTM bundles.
- **Automatic SPA Navigation**: Automatically tracks route changes in React/Vite single-page applications via standard browser history events (`pushState`, `popstate`), avoiding double-counting from manual trackers.
- **Real-User Performance (Core Web Vitals)**: Monitors LCP, INP, CLS, FCP, and TTFB directly in production.
- **Full Data Ownership**: Supports self-hosting with PostgreSQL or Umami Cloud.

### Architecture
```
DSPL React/Vite Website (dashapatmaja.in)
  │
  ├── Umami Analytics v3 (Lightweight Tracker)
  │     ├── Automatic SPA Route / Pageview Tracking
  │     ├── Domain Restriction (dashapatmaja.in)
  │     ├── Do Not Track (DNT) Support
  │     ├── Core Web Vitals Performance (LCP, INP, CLS, FCP, TTFB)
  │     └── Custom Conversion Events (No PII)
  │
  └── Web3Forms (Form Submission Provider)
        └── DSPL Receiving Email (director@dashapatmaja.in)
```

> [!NOTE]
> Web3Forms remains the form submission provider. Umami handles analytics and conversion event measurement only.

---

## 2. Environment Variables

The frontend expects three Vite environment variables:

| Variable | Description | Example |
|---|---|---|
| `VITE_UMAMI_SCRIPT_URL` | URL to the Umami tracker script | `https://cloud.umami.is/script.js` or `https://umami.dashapatmaja.in/script.js` |
| `VITE_UMAMI_WEBSITE_ID` | UUID website identifier from Umami | `a1b2c3d4-e5f6-7890-abcd-ef1234567890` |
| `VITE_UMAMI_DOMAINS` | Comma-separated allowed production hostnames | `dashapatmaja.in,www.dashapatmaja.in` |

### Environment Handling Rules
1. In development (`npm run dev`) or on `localhost` / `127.0.0.1`, analytics script loading is automatically disabled.
2. If any required environment variable is missing, analytics safely no-ops without throwing console errors.
3. Never put database credentials, Umami admin passwords, or private API keys in `VITE_*` variables.

---

## 3. Umami Hosting Options

### Option A: Umami Cloud (Recommended for Rapid Launch)
1. Sign up at [cloud.umami.is](https://cloud.umami.is).
2. Create a website:
   - **Name**: `DSPL Website`
   - **Domain**: `dashapatmaja.in`
3. Copy the **Website ID** (UUID) from Website Settings.
4. Set environment variables in production:
   ```env
   VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
   VITE_UMAMI_WEBSITE_ID=<your-website-id>
   VITE_UMAMI_DOMAINS=dashapatmaja.in,www.dashapatmaja.in
   ```

### Option B: Self-Hosted Umami with PostgreSQL (Docker Compose)
Umami officially provides a Docker Compose image. A separate server / VM / container should run Umami:

```yaml
# docker-compose.yml (On dedicated analytics server)
services:
  umami:
    image: ghcr.io/umami-software/umami:postgresql-latest
    restart: always
    environment:
      DATABASE_URL: postgresql://umami:secure_password@db:5432/umami
      DATABASE_TYPE: postgresql
      APP_SECRET: generate-a-random-secret-here
    ports:
      - "3000:3000"
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    restart: always
    environment:
      POSTGRES_DB: umami
      POSTGRES_USER: umami
      POSTGRES_PASSWORD: secure_password
    volumes:
      - umami-db-data:/var/lib/postgresql/data

volumes:
  umami-db-data:
```

1. Deploy Umami behind reverse proxy (Nginx / Caddy / Cloudflare) on e.g. `https://umami.dashapatmaja.in`.
2. Login with default credentials (`admin` / `umami`) and **immediately change the admin password**.
3. Create website `DSPL Website` on domain `dashapatmaja.in`.
4. Update `public/_headers` Content-Security-Policy to allow your self-hosted domain:
   ```
   Content-Security-Policy: ... script-src 'self' 'unsafe-inline' https://umami.dashapatmaja.in; connect-src 'self' https://umami.dashapatmaja.in https://api.web3forms.com;
   ```
5. Set environment variables:
   ```env
   VITE_UMAMI_SCRIPT_URL=https://umami.dashapatmaja.in/script.js
   VITE_UMAMI_WEBSITE_ID=<your-website-id>
   VITE_UMAMI_DOMAINS=dashapatmaja.in,www.dashapatmaja.in
   ```

---

## 4. Privacy & Tracking Settings

### Disable Advanced / Invasive Tracking
In your Umami website settings:
- **Session Replay**: Keep **OFF**
- **Heatmaps**: Keep **OFF**
- **User Identification (`identify`)**: Keep **OFF**

### Core Web Vitals
The tracker script is configured with `data-performance="true"` to automatically collect Core Web Vitals (LCP, INP, CLS, FCP, TTFB).

### Do Not Track
The tracker script includes `data-do-not-track="true"` to respect visitor browser preferences.

---

## 5. Event Taxonomy Reference

All event names follow `snake_case`.

| Event Name | Trigger | Properties | Purpose |
|---|---|---|---|
| `cta_start_project` | Click "Start a Project" button | None | Primary CTA conversion intent |
| `contact_method_select` | Click Call / Email link | `{ method: "call" | "email" }` | Direct contact interaction |
| `lead_form_submit_success` | Web3Forms response confirms success | `{ form: "project_planner" | "contact", source?: string, help_type?: string }` | Verified lead conversion |
| `lead_form_submit_error` | Web3Forms network or validation failure | `{ form: "project_planner" | "contact", error: string }` | Form health monitoring |
| `page_not_found` | 404 route viewed | `{ path: string }` (normalized path only) | Broken link / error discovery |

### Strict No-PII Enforcement
The analytics utility (`src/utils/analytics.js`) strictly purges any sensitive personal fields:
- ❌ **Never tracked**: `name`, `first_name`, `last_name`, `email`, `phone`, `whatsapp`, `message`, `company`, `address`, `attachment`, `file`, `resume`, `budget`.
- ✅ **Allowed**: Category labels, error types, source page identifiers, contact method names.
- ❌ **Never use user inputs in HTML attributes**: Declarative `data-umami-event-*` attributes only use fixed literals.

---

## 6. Verification & Testing

### Local Development QA
1. Run `npm run dev` and open `http://localhost:5174`.
2. Inspect `<head>` in DevTools: No Umami `<script>` should be injected.
3. Check Console: No analytics errors or warnings.
4. Interact with forms and links: No external analytics network requests should occur.

### Production Build QA
1. Run `npm run build && npm run preview`.
2. In production with consent granted on an allowed domain:
   - Exactly one Umami `<script>` is injected into `<head>`.
   - Navigating between pages triggers automatic pageview tracking without duplicates.
   - Submitting the contact or project planner form triggers `lead_form_submit_success` only on confirmed success.
   - Clicking "Decline" in Privacy Policy or Cookie Notice immediately disables event dispatching.

### Excluding Your Own Visits
To exclude internal visits from your Umami dashboard:
- In Umami Dashboard, navigate to **Settings** → **Profile** / **General** → click **Disable Tracking for This Browser**, or set `localStorage.setItem('umami.disabled', '1')` in your browser console.
