# DSPL Sitewide Copy Decision Matrix

Date: 2026-08-25
Status: Approved working interpretation; source implementation is not yet started

## Purpose and source authority

This matrix maps the two external, read-only reference documents onto the current
DSPL website. It is the scope boundary for the approved sitewide copy, content,
form, and UX refinement pass.

- Proposed copy source: `E:\For website\dspl research\updates proper\DSPL-Website-Copy-Deck.pdf` (27 pages).
- Review/decision source: `E:\For website\dspl research\updates proper\Scanned Document 3.pdf` (17 scanned pages).
- The PDFs stay outside the repository. They must not be moved, copied, renamed,
  modified, committed, or turned into generated repository content.
- The clean Copy Deck proposes replacement copy for existing website slots. The
  handwritten scan is the decision layer over those proposals.
- `update`, `need to update`, `modify`, `add`, and `need to add` approve the
  corresponding website slot for implementation, subject to the factual gate.
- Cross-outs, `X`, `do not update`, and `images need not change` reject the
  corresponding proposal. The current implementation is preserved.
- `CONFIRM`, unreadable handwriting, mixed decisions, or unsupported factual,
  commercial, legal, regulatory, or qualification claims require confirmation.

## Status totals

| Status | Rows |
| --- | ---: |
| APPROVED TO IMPLEMENT | 47 |
| REJECTED | 6 |
| NEEDS CONFIRMATION | 18 |
| ALREADY IMPLEMENTED | 3 |
| **Total** | **74** |

`APPROVED TO IMPLEMENT` means the slot may be changed within its stated factual
gate; it does not authorise inventing or expanding claims. A row marked
`NEEDS CONFIRMATION` is not source-implementation authority until the exact
wording or evidence is approved separately.

## Matrix conventions

The current source owner includes an approximate line or data anchor so a later
worker can find the slot without broad refactoring. Test owners identify the
smallest meaningful existing regression surface; copy-only changes should update
such tests only when an assertion protects a real content contract. Every row
inherits the protected-media registry at the end of this document.

### Home — page group A

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HOME-01 | `/` hero subline | `src/pages/Home.jsx:102-106`, `.hero-subhead` | p.1 — replace the supporting hero statement with the approved owned-brand plus client-growth positioning | p.1 — `update` | Replace the subline only. **APPROVED TO IMPLEMENT** | Use current DSPL positioning; no new launch, partner, price, or result claim | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-02 | `/` hero H1 | `src/pages/Home.jsx:96-100`, `.hero-title` | p.1 — proposed headline slot | p.1 — current wording accepted / already matches | Keep the current H1. **ALREADY IMPLEMENTED** | None beyond current product truth | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-03 | `/` hero image and alt treatment | `src/pages/Home.jsx:74-90`; `src/assets/home-rotation-03-*` | p.1 — proposed hero-image or image-alt treatment | p.1 — crossed out; images need not change | Preserve the current image, responsive sources, empty decorative alt, and loading behavior. **REJECTED** | Do not infer visual or accessibility changes from the clean proposal | `src/pages/__tests__/Home.test.jsx` plus Phase 12 visual QA | PM-HOME |
| HOME-04 | `/` SEO description | `src/seo/routeMetadata.js`, route `/` | p.1 — replacement homepage title/description block | p.1 — `update` | Update only the approved homepage metadata slot. **APPROVED TO IMPLEMENT** | No unsupported corporate, market-size, performance, or regulatory claim | `src/seo/__tests__/routeMetadata.test.js` | PM-HOME |
| HOME-05 | `/` capabilities heading | `src/pages/Home.jsx:125-138`, `services-title` | p.2 — replacement capability heading and supporting line | p.2 — `update` | Replace the heading/subheading while retaining the existing section and anchors. **APPROVED TO IMPLEMENT** | Keep the four capability areas accurate and scoped | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-06 | `/` Branding, Marketing, and E-commerce cards | `src/pages/Home.jsx:29-44`, `services` | p.2 — replacement copy for the three existing capability cards | p.2 — each card marked `update` | Update the three card text blocks and preserve their existing links. **APPROVED TO IMPLEMENT** | No guaranteed outcomes, prices, durations, or unverified client proof | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-07 | `/` supporting compliance block and anchors | `src/pages/Home.jsx:158-170`, `compliance-support-strip` | p.2 — compliance-support heading/body plus links to the approved service anchors | p.2 — `update` / `need to add`; exact legal wording still requires review | Implement the deterministic block structure, heading, non-legal operational wording, and `/branding#compliance` plus `/ecommerce#compliance` anchors. Gate exact regulatory/legal assertions inside this row for separate Phase 4 approval. **APPROVED TO IMPLEMENT** | Deterministic links/anchors and qualified-adviser boundary are approved; every exact FSSAI, Legal Metrology, regulated-advice, or compliance-guarantee assertion remains separately gated | `src/pages/__tests__/Home.test.jsx`; Phase 4 evidence | PM-HOME |
| HOME-08 | `/` How We Deliver framework | `src/pages/Home.jsx:46-66`; `src/components/home/ProcessSteps.jsx` | p.3 — replacement heading, description, and Audit/Build/Grow stage copy | p.3 — `update` / `need to add` | Update the existing process data and labels; keep three stages and semantic ordered-list behavior. **APPROVED TO IMPLEMENT** | Do not add fixed durations, guaranteed outputs, or unsupported six-step claims | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-09 | `/` Raw Radicles supporting block | `src/components/home/OwnedBrandProof.jsx:23-40` | p.3 — replacement owned-brand operating-experience block | p.3 — `update` | Replace the text in the existing block and preserve its route and visual treatment. **APPROVED TO IMPLEMENT** | Preserve only verified ownership/operating statements; no MRP, launch status, or partner names | `src/pages/__tests__/Home.test.jsx` | PM-HOME |
| HOME-10 | `/` closing CTA | `src/content/footerCtas.js`, key `/`; rendered by `src/components/Footer.jsx` | p.3 — replacement closing CTA title, supporting text, and label | p.3 — `update` | Update the homepage-owned CTA entry only. **APPROVED TO IMPLEMENT** | Preserve `/start` destination and current form contract | `src/components/__tests__/Footer.test.jsx` | PM-HOME |

### About — page group B

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ABOUT-01 | `/about` hero and corporate-profile introduction | `src/pages/About.jsx:234-251` | p.4 — replacement corporate-profile intro and subline | p.4 — `update` | Replace the approved intro text in the existing hero. **APPROVED TO IMPLEMENT** | Use verified legal name and current institutional positioning | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-02 | `/about` Vision card | `src/pages/About.jsx:112-117`, `directionCards[0]` | p.4 — replacement Vision copy | p.4 — `update` | Replace the Vision card text only. **APPROVED TO IMPLEMENT** | No unverified portfolio size, launch, or revenue claim | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-03 | `/about` Mission card | `src/pages/About.jsx:118-122`, `directionCards[1]` | p.4 — replacement Mission copy | p.4 — `update` | Replace the Mission card text only. **APPROVED TO IMPLEMENT** | Keep service scope aligned with `PRODUCT.md` | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-04 | `/about` Values card | `src/pages/About.jsx:123-127`, `directionCards[2]` | p.4 — replacement Values copy | p.4 — `update` | Replace the Values card text only. **APPROVED TO IMPLEMENT** | No new unverifiable credential or performance claim | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-05 | `/about` journey framing and non-factual section copy | `src/pages/About.jsx:309-317` | p.5 — replacement journey heading, introduction, and proposed framing | p.5 — handwritten note says `keep this pending`; individual factual milestones remain gated | Keep the current journey framing and hold the proposed heading/subline until separately confirmed. **NEEDS CONFIRMATION** | Do not alter dates, launch status, grants, partners, MOU facts, or the pending section framing without evidence | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-06 | `/about` 2023 MUTBI / MAHE milestone | `src/pages/About.jsx:56-67` | p.5 — corrected institution/incubation wording | p.5 — correction is already present | Preserve current MUTBI / MAHE Manipal wording. **ALREADY IMPLEMENTED** | Verify against `COMPANY_FACTS.incubation` if touched | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-07 | `/about` 2024 Raw Radicles milestone | `src/pages/About.jsx:68-82` | p.5 — first-brand/launch timeline replacement | p.5 — update marked, but `developed` versus `launched` is unresolved | Do not change the launch-status sentence until company confirmation. **NEEDS CONFIRMATION** | Confirm date and `launched`/`developed` wording | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-08 | `/about` 2025 and 2026 milestones | `src/pages/About.jsx:83-110` | pp.5-6 — NIDHI-PRAYAS, services opening, and manufacturing/MOU wording | pp.5-6 — annotations are ambiguous / require confirmation | Keep current facts until each date, grant, service opening, and MOU claim is evidenced. **NEEDS CONFIRMATION** | Written company evidence required; no partner or chronology invention | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-09 | `/about` team heading and presentation | `src/pages/About.jsx:378-387` | p.6 — updated team introduction/presentation | p.6 — `update` | Update the team-section framing while retaining the existing cards and portraits. **APPROVED TO IMPLEMENT** | Avoid implying qualifications not shown in approved bios | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-10 | `/about` team roles and biographies | `src/pages/About.jsx:158-224`, rendered at `389-452` | p.6 — proposed member biographies, titles, and corrections | p.6 — mixed: selected cards marked update; Shreepathy marked do not update; Balakrishna note unreadable | No bulk biography replacement is authorised. Resolve each member individually before changing facts. **NEEDS CONFIRMATION** | Confirm doctorate count, titles, names, and exact bios with company source | `src/pages/__tests__/About.test.jsx` | PM-ABOUT |
| ABOUT-11 | `/about` closing CTA | `src/content/footerCtas.js`, key `/about` | p.6 — replacement closing CTA | p.6 — `update` | Update the existing About CTA entry only. **APPROVED TO IMPLEMENT** | Preserve `/start` destination and no new promise | `src/components/__tests__/Footer.test.jsx` | PM-ABOUT |

### Our Brands — page group C

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BRANDS-01 | `/brands` hero positioning and subline | `src/pages/Brands.jsx:45-64` | p.7 — replacement consumer-brand positioning and subline | p.7 — `update` | Replace the existing hero copy while keeping the hero structure. **APPROVED TO IMPLEMENT** | Keep “develop and operate” consistent with verified product truth | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-02 | `/brands` ownership/operator narrative | `src/pages/Brands.jsx:66-100` | p.7 — replacement DSPL ownership and services-operator narrative | p.7 — `update` | Update the two existing ownership sections. **APPROVED TO IMPLEMENT** | Verify trademark/application wording before retaining it | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-03 | `/brands` Raw Radicles flagship label and tagline | `src/pages/Brands.jsx:116-123` | p.7 — flagship label and tagline replacement | p.7 — `update` | Replace the label/tagline in the existing flagship card. **APPROVED TO IMPLEMENT** | No MRP, launch date, or unsupported benefit claim | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-04 | `/brands` flagship narrative, contribution line, and approved CTA | `src/pages/Brands.jsx:125-136`, `:157-160` | p.7 — Raw Radicles range/ownership/workstream narrative plus `Contact us about Raw Radicles` CTA | p.7 — narrative `update`; `CTA: Contact us about Raw Radicles` checked/approved | Update the approved narrative and contribution line in place, and change the existing flagship CTA to the exact approved CTA. **APPROVED TO IMPLEMENT** | Keep product and manufacturing statements within verified evidence; do not add MRP or unresolved proof claims | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-05 | `/brands` product/stat proof grid | `src/pages/Brands.jsx:138-154` | p.7 — product, formulation, manufacturing, and Ayurvedic-expertise proof details | p.7 — `update`, but individual product/stat claims need evidence | Preserve the proof-grid structure; exact facts require confirmation. **NEEDS CONFIRMATION** | Verify bar count, weight, collections, locations, and production claims | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-06 | `/brands` portfolio-in-development block | `src/pages/Brands.jsx:87-100` (nearest current architecture slot) | p.7 — add portfolio-in-development positioning | p.7 — `need to add` | Add the approved copy to an existing suitable section without introducing a new visual system. **APPROVED TO IMPLEMENT** | Do not name or describe unverified concepts | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |
| BRANDS-07 | `/brands` proposed ₹300 MRP | No current source slot; clean-deck proof proposal only | p.7 — proposed MRP/stat detail | p.7 — `CONFIRM` and crossed out | Do not add the MRP. **REJECTED** | Pricing remains outside the approved scope | `src/pages/__tests__/Brands.test.jsx` | PM-BRANDS |

### Raw Radicles — page group D

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| RAW-01 | `/brands/raw-radicles` hero subline | `src/pages/RawRadicles.jsx:44-56` | p.8 — replacement Raw Radicles subline | p.8 — `update` | Replace the hero subline only. **APPROVED TO IMPLEMENT** | Keep product and ownership claims evidence-backed | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-02 | `/brands/raw-radicles` hero/product imagery and alt proposals | `src/pages/RawRadicles.jsx:45-62`; product-pack assets | p.8 — proposed image/alt treatment | p.8 — crossed out; preserve current imagery | Keep the current hero and pack images, sources, dimensions, and approved alt text. **REJECTED** | No image-generation, recropping, or speculative alt rewrite | `src/pages/__tests__/RawRadicles.test.jsx` plus Phase 12 visual QA | PM-RAW |
| RAW-03 | `/brands/raw-radicles` range/product narrative | `src/pages/RawRadicles.jsx:88-100` | p.8 — expanded range, botanical, and product narrative | p.8 — add/update marked, but deck facts are `CONFIRM` | Hold the detailed range claims until exact product evidence is supplied. **NEEDS CONFIRMATION** | Confirm product names, ingredients, counts, weights, and collection structure | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-04 | `/brands/raw-radicles` ownership story | `src/pages/RawRadicles.jsx:66-85` | p.8 — replacement ownership and operating-experience story | p.8 — `update` | Update the current ownership narrative without changing the route or structure. **APPROVED TO IMPLEMENT** | Use `COMPANY_FACTS` and verified ownership only | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-05 | `/brands/raw-radicles` product-development/production section | `src/pages/RawRadicles.jsx:102-126` | pp.8-9 — formulation and production narrative | pp.8-9 — `update`; partner/location wording is mixed | Keep the section, but do not replace its factual content until locations and partners are resolved. **NEEDS CONFIRMATION** | Confirm formulation and manufacturing statements | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-06 | `/brands/raw-radicles` formulation/manufacturing locations | `src/pages/RawRadicles.jsx:109-123` | p.9 — proposed Thrissur, Kerala, Ernakulam, or other location details | p.9 — handwriting is unclear | Do not infer Kerala/Ernakulam wording from the scan. **NEEDS CONFIRMATION** | Written company evidence required for every location | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-07 | `/brands/raw-radicles` partner names | `src/pages/RawRadicles.jsx:109-123` | p.9 — proposed formulation/manufacturing partner names | p.9 — crossed out / do not name partners | Preserve generic qualified-partner wording and do not add names. **REJECTED** | Partner naming requires explicit company approval | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |
| RAW-08 | `/brands/raw-radicles` workstreams and closing block | `src/pages/RawRadicles.jsx:128-167`, `workstreams` | p.9 — workstream cards and closing operating-experience CTA | p.9 — `update` | Update the six workstream text blocks and closing copy in place. **APPROVED TO IMPLEMENT** | No prices, durations, performance guarantees, partner names, or regulatory advice | `src/pages/__tests__/RawRadicles.test.jsx` | PM-RAW |

### Branding — page group E

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| BRANDING-01 | `/branding` hero/subline | `src/pages/Branding.jsx:106-115`, `heroTagline` | p.10 — replacement Branding subline | p.10 — `update` | Replace the existing hero subline only. **APPROVED TO IMPLEMENT** | No guaranteed business result or unverified credential | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-02 | `/branding` intro/positioning | `src/pages/Branding.jsx:114-117`, scope props | p.10 — replacement intro and positioning | p.10 — `update` | Replace the existing scope heading/description. **APPROVED TO IMPLEMENT** | Retain qualified-adviser boundary | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-03 | `/branding` capability cards | `src/pages/Branding.jsx:11-32`, `offers` | pp.10-11 — approved capability-card copy | p.11 — `update` | Update the existing capability data; do not alter `ServicePage` architecture. **APPROVED TO IMPLEMENT** | No prices, durations, filing guarantees, or unsupported claims | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-04 | `/branding#compliance` compliance section | `src/pages/Branding.jsx:34-60`, `compliance` | p.11 — packaging-compliance section and supporting items | p.11 — `update` / `need to add` | Update the section within its existing anchor and preserve the disclaimer. **APPROVED TO IMPLEMENT** | Exact regulatory/legal wording remains subject to Phase 4 evidence; no legal advice claim | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-05 | `/branding` FAQ | `src/pages/Branding.jsx:62-83`, `faqs` | p.12 — modified FAQ set | p.12 — `modify` | Replace only the approved FAQ questions/answers; exclude unresolved commercial promises. **APPROVED TO IMPLEMENT** | No prices, fixed delivery durations, or legal advice | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-06 | `/branding` pricing, duration, and legal placeholders | FAQ/deck proposal slots, no current approved source | p.12 — pricing/duration or legal/commercial placeholders | p.12 — `CONFIRM` / unresolved | Keep current non-priced, proposal-specific behavior. **NEEDS CONFIRMATION** | User must approve exact prices/durations and evidence | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-BRANDING |
| BRANDING-07 | `/branding` closing CTA | `src/content/footerCtas.js`, key `/branding` | p.12 — replacement CTA | p.12 — `update` | Update the page-owned CTA entry only. **APPROVED TO IMPLEMENT** | Preserve `/start` destination and proposal-specific scope | `src/components/__tests__/Footer.test.jsx` | PM-BRANDING |

### Marketing — page group F

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| MARKETING-01 | `/marketing` hero and intro | `src/pages/Marketing.jsx:108-119`, hero/scope props | p.13 — replacement Marketing intro and positioning | p.13 — `update` | Replace the existing hero, scope heading, and intro text. **APPROVED TO IMPLEMENT** | No results, ranking, revenue, or client-proof guarantee | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-MARKETING |
| MARKETING-02 | `/marketing` capability cards | `src/pages/Marketing.jsx:11-32`, `offers` | p.13 — approved capability-card copy | p.13 — `update` | Update the page-owned capability data only. **APPROVED TO IMPLEMENT** | Preserve measurement caveats and no-guarantee boundary | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-MARKETING |
| MARKETING-03 | `/marketing` FAQ | `src/pages/Marketing.jsx:64-85`, `faqs` | p.13 — modified FAQ set | p.13 — `modify` | Replace the approved FAQ copy in place. **APPROVED TO IMPLEMENT** | No fixed SEO timing, ranking, lead, or sales promise | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-MARKETING |
| MARKETING-04 | `/marketing` closing CTA | `src/content/footerCtas.js`, key `/marketing` | p.13 — replacement CTA | p.13 — `update` | Update the page-owned CTA entry only. **APPROVED TO IMPLEMENT** | Preserve `/start` destination | `src/components/__tests__/Footer.test.jsx` | PM-MARKETING |
| MARKETING-05 | `/marketing` prices and SEO-result timing | FAQ/engagement proposal slots | p.13 — proposed prices or “results in” timing | p.13 — not resolved | Do not add prices or SEO timing claims. **NEEDS CONFIRMATION** | Exact commercial terms and evidence require separate approval | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-MARKETING |
| MARKETING-06 | `/marketing` performance/result commitments | `src/pages/Marketing.jsx:34-62`, proof/engagement slots | p.13 — proposed performance/outcome language | p.13 — no resolving approval | Retain qualified, measurement-led language; do not promise outcomes. **NEEDS CONFIRMATION** | No ranking, lead, sales, or return-on-ad-spend guarantee | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-MARKETING |

### E-commerce — page group G

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ECOMMERCE-01 | `/ecommerce` hero and intro | `src/pages/Ecommerce.jsx:102-113`, hero/scope props | p.14 — replacement E-commerce intro and positioning | p.14 — `update` | Replace the existing hero and scope copy. **APPROVED TO IMPLEMENT** | No platform, revenue, or performance claim beyond current support | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-02 | `/ecommerce` capability cards | `src/pages/Ecommerce.jsx:8-33`, `offers` | pp.14-15 — approved capability-card copy | p.14 — `update` | Update page-owned capability data only. **APPROVED TO IMPLEMENT** | Preserve platform-specific caveats and named responsibilities | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-03 | `/ecommerce#compliance` compliance section | `src/pages/Ecommerce.jsx:35-65`, `compliance` | p.15 — marketplace/compliance section | p.15 — `update` / `need to add` | Update the existing anchored section and preserve its qualified-adviser disclaimer. **APPROVED TO IMPLEMENT** | Tax, GST, HSN, e-way-bill, and legal statements require evidence review | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-04 | `/ecommerce` FAQ | `src/pages/Ecommerce.jsx:67-88`, `faqs` | p.15 — modified FAQ set | p.15 — `modify` | Replace the approved FAQ copy in place. **APPROVED TO IMPLEMENT** | No platform guarantee, fixed duration, or performance claim | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-05 | `/ecommerce` closing CTA | `src/content/footerCtas.js`, key `/ecommerce` | p.15 — replacement CTA | p.15 — same approved CTA refinement as service pages | Update the page-owned CTA entry only. **APPROVED TO IMPLEMENT** | Preserve `/start` destination | `src/components/__tests__/Footer.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-06 | `/ecommerce` prices and 4–6 / 8–16 week promises | FAQ/engagement proposal slots | p.15 — proposed prices and delivery-duration bands | p.15 — unresolved | Do not add price or duration promises. **NEEDS CONFIRMATION** | Exact commercial terms require separate approval | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |
| ECOMMERCE-07 | `/ecommerce` platform, performance, and legal claims | `src/pages/Ecommerce.jsx:35-65`, `67-88` | p.15 — platform/compliance/performance additions | p.15 — no resolving approval | Keep current qualified wording until claims are evidenced. **NEEDS CONFIRMATION** | Legal/platform policy and performance evidence required | `src/pages/__tests__/ServiceCopy.test.jsx` | PM-ECOMMERCE |

### Contact — page group H

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CONTACT-01 | `/contact` hero explanatory copy and `/start` link | `src/pages/Contact.jsx:140-151` | p.16 — replacement intro/subline and project-brief link | p.16 — `update` | Replace the approved explanatory copy while preserving `/start`. **APPROVED TO IMPLEMENT** | No response-time promise beyond the current approved wording unless confirmed | `src/pages/__tests__/Contact.test.jsx` | PM-CONTACT |
| CONTACT-02 | `/contact` address, phone, email, hours, and contact-detail cards | `src/pages/Contact.jsx:155-199`; `src/content/companyFacts.js` | p.16 — proposed contact-detail/map/address changes | p.16 — no need to update; address/detail proposal crossed out | Preserve the current authoritative contact facts and cards. **REJECTED** | `COMPANY_FACTS` remains the source of truth | `src/pages/__tests__/Contact.test.jsx` | PM-CONTACT |
| CONTACT-03 | `/contact` enquiry options | `src/pages/contactFormModel.js`, `CONTACT_HELP_OPTIONS` | p.16 — revised enquiry taxonomy | p.16 — `modify` | Set the options exactly to: Branding; Marketing and SEO; E-commerce and marketplaces; Packaging and FSSAI compliance; New consumer brand; Something else. **APPROVED TO IMPLEMENT** | Preserve payload field name and validation behavior | `src/pages/__tests__/Contact.test.jsx`; `src/pages/__tests__/contactFormModel.test.js` | PM-CONTACT |
| CONTACT-04 | `/contact` success state | `src/pages/Contact.jsx:210-218` | p.16 — replacement success message and next action | p.16 — `update` | Replace the success-state copy only and retain status semantics and reset button. **APPROVED TO IMPLEMENT** | Do not claim a fixed response or approval outcome | `src/pages/__tests__/Contact.test.jsx` | PM-CONTACT |
| CONTACT-05 | `/contact` enquiry heading/context | `src/pages/Contact.jsx:201-207` | p.16 — explanatory copy around routing an enquiry | p.16 — `update` | Update the existing heading/description without changing contact details. **APPROVED TO IMPLEMENT** | Keep routing language descriptive, not a service guarantee | `src/pages/__tests__/Contact.test.jsx` | PM-CONTACT |

### Start a Project — page group I

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| START-01 | `/start` hero intro/subline | `src/pages/StartProject.jsx:26-34` | p.17 — replacement project-planner context copy | p.17 — `update` | Replace the approved introductory copy in the existing hero. **APPROVED TO IMPLEMENT** | Preserve the practical, non-guaranteed first-conversation framing | `src/pages/__tests__/StartProject.test.jsx` | No media change |
| START-02 | `/start` Context briefing point | `src/pages/StartProject.jsx:6-10`, `briefingPoints` | p.17 — proposed context wording | p.17 — unmarked / no clear approval; preserve current | Do not adopt an unmarked proposal until the user confirms it. **NEEDS CONFIRMATION** | No invented requirements for a “brief” | `src/pages/__tests__/StartProject.test.jsx` | No media change |
| START-03 | `/start` Need briefing point | `src/pages/StartProject.jsx:11-14`, `briefingPoints` | p.17 — replacement Need wording | p.17 — `update` | Replace the Need point only. **APPROVED TO IMPLEMENT** | Keep it general and scope-led | `src/pages/__tests__/StartProject.test.jsx` | No media change |
| START-04 | `/start` Outcome briefing point | `src/pages/StartProject.jsx:15-18`, `briefingPoints` | p.17 — replacement Outcome wording | p.17 — `update` | Replace the Outcome point only. **APPROVED TO IMPLEMENT** | Do not promise a business result | `src/pages/__tests__/StartProject.test.jsx` | No media change |
| START-05 | `/start` referral-source options | `src/components/ProjectPlannerForm.jsx:234-245` | p.17 — referral source update including LinkedIn | p.17 — checked under form modifications | Add LinkedIn while preserving existing payload field and optionality. **APPROVED TO IMPLEMENT** | No tracking or data-use expansion beyond current privacy notice | `src/components/__tests__/ProjectPlannerForm.test.jsx`; `src/components/work-with-us/__tests__/formModel.test.js` | No media change |
| START-06 | `/start` service taxonomy | `src/components/work-with-us/formModel.js`, `PROJECT_SERVICES`; rendered at `ProjectPlannerForm.jsx:213-226` | p.17 — service choice update | p.17 — checked: Packaging and FSSAI compliance as one combined choice | Replace the service choice set only as approved, including the exact combined Packaging and FSSAI compliance option. **APPROVED TO IMPLEMENT** | Preserve multi-select validation, payload tags, and no legal-adviser implication | `src/components/__tests__/ProjectPlannerForm.test.jsx`; `src/components/work-with-us/__tests__/formModel.test.js` | No media change |
| START-07 | `/start` budget bands | No current field; `ProjectPlannerForm.jsx` preferences area is the insertion point | p.17 — add five bands: Under ₹1 lakh; ₹1–3 lakh; ₹3–10 lakh; Above ₹10 lakh; Not decided yet | p.17 — checked under form modifications | Add the exact optional budget field and bands; do not invent alternatives. **APPROVED TO IMPLEMENT** | Preserve privacy notice, optionality, and payload handling | `src/components/__tests__/ProjectPlannerForm.test.jsx`; form-model test if payload changes | No media change |
| START-08 | `/start` “A polished brief is not required.” | `src/pages/StartProject.jsx:66-74` | p.17 — brief-requirement copy slot | p.17 — explicitly retained / already present | Keep the current sentence. **ALREADY IMPLEMENTED** | None | `src/pages/__tests__/StartProject.test.jsx` | No media change |

### Insights and global boundaries — conditional or deferred rows

| ID | Route / slot | Current source owner / location | Clean Deck page / proposal | Scan page / decision | Interpretation / status | Factual gate | Test owner | Protected media |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| GLOBAL-01 | `/blogs` and the two current article routes: references | `src/cms/seedData.js`; generated snapshots under `src/generated/blog/` | pp.23-24 — clean-deck article proposals are not the current publication set | No scanned approval for replacing current compliance articles; user approved read-only investigation | Inspect official references and show exact proposed URL corrections, but make no article edit in this pass. **NEEDS CONFIRMATION** | Legal/editorial approval required for every URL or claim correction | `src/pages/__tests__/Blogs.test.jsx`; `src/pages/__tests__/BlogPost.test.jsx` | PM-INSIGHTS |
| GLOBAL-02 | Current two compliance articles: regulatory freshness | `src/cms/seedData.js`; current slugs in `src/generated/blogManifest.json` | pp.23-24 — obsolete article concepts are not to be restored | User correction retains the two current articles and permits read-only freshness review | Compare current regulatory claims against official sources and report exact proposed changes separately. **NEEDS CONFIRMATION** | No regulatory copy, publication date, slug, or reference changes without explicit approval | `src/pages/__tests__/BlogPost.test.jsx`; `src/content/__tests__/publication.test.js` | PM-INSIGHTS |
| GLOBAL-03 | Global title/meta, footer, and schema expansion | `src/seo/routeMetadata.js`; `src/content/footerCtas.js`; existing schema tests | pp.25-27 — clean-deck global SEO/footer/schema proposals | No clear handwritten approval; user explicitly deferred these global rewrites | Do not implement the global proposal as part of the approved page work. **NEEDS CONFIRMATION** | Any future change needs a separate exact-copy approval and metadata review | `src/seo/__tests__/routeMetadata.test.js`; `src/components/__tests__/Footer.test.jsx` | All page media preserved |
| GLOBAL-04 | Global British-English and coordinate/coordinated wording rewrite | Distributed page/content sources; protected regression assertions in `src/__tests__/contentEvidenceRegression.test.js` | pp.25-27 — clean-deck language-normalisation suggestions | No clear handwritten approval; user explicitly deferred the site-wide rewrite | Leave unrelated wording untouched; apply only copy replacements in approved rows. **NEEDS CONFIRMATION** | No broad terminology rewrite without a new scope decision | `src/__tests__/contentEvidenceRegression.test.js` | All page media preserved |
| GLOBAL-05 | All proposed image/artwork changes | Existing assets and page image imports listed in PM registry | Clean Deck image suggestions across page sections | Scan pages 1-15 repeatedly rejects or crosses out image changes; images need not change | Preserve all existing imagery, hero families, product packs, portraits, logos, and artwork. **REJECTED** | No generation, recropping, replacement, or alt-text rewrite except an explicit future approval | Phase 12 visual QA; relevant page tests | PM-HOME, PM-ABOUT, PM-BRANDS, PM-RAW, PM-BRANDING, PM-MARKETING, PM-ECOMMERCE, PM-CONTACT |

## Exact-copy annex

This annex is keyed one-to-one to the 74 stable IDs above. `Current` records the
exact baseline copy or behavior inspected in the route-owned source at the start
of this planning pass. Where a protected concurrent worktree diff is visible,
the baseline and the unapproved worktree value are both named. `Clean Deck`
records the exact proposed text from the read-only Copy Deck, including proposals
that remain rejected or gated. The short decision labels below are deliberately
not replacements for the full status totals above.

### Home - page group A

#### HOME-01 - Decision: APPROVED

Current (exact source text):

```text
DSPL builds its own consumer brands and helps businesses grow through coordinated branding, marketing, e-commerce and compliance support.
```

Clean Deck (p.6, exact proposal):

```text
Dashapatmaja Solutions is a Manipal-based company that develops its own consumer brands and delivers branding, marketing, e-commerce and product compliance support to businesses across Karnataka and India.
```

#### HOME-02 - Decision: IMPLEMENTED

Current (exact rendered H1):

```text
We build consumer brands.
We help businesses build theirs.
```

Clean Deck (p.6, exact proposal):

```text
We build consumer brands.
We help businesses build theirs.
```

#### HOME-03 - Decision: REJECTED

Current (exact behavior):

```text
<picture className="home-hero-media" aria-hidden="true">
  <source media="(max-width: 600px)" srcSet={homeRotation03Mobile} />
  <source srcSet={`${homeRotation03960} 960w, ${homeRotation031440} 1440w`} sizes="100vw" />
  <img className="home-hero-image" src={homeRotation031440} alt="" width="1440" height="810" loading="eager" fetchPriority="high" decoding="async" />
</picture>
```

Clean Deck (p.6, exact proposal):

```text
Dashapatmaja Solutions team reviewing brand and packaging work at the Manipal studio
```

The scan crosses out the alt/image proposal and says images need not change; the
empty decorative alt, responsive sources, and loading behavior remain protected.

#### HOME-04 - Decision: APPROVED

Current (exact `/` metadata):

```text
title: Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth
description: DSPL builds its own consumer brands and helps businesses grow through coordinated branding, marketing, e-commerce and compliance support.
```

Clean Deck (pp.4 and 6, exact proposal):

```text
title: Branding, Marketing & E-commerce Company in Manipal, Karnataka
description: We build our own consumer brands and help Indian businesses build theirs. Branding, marketing, e-commerce and FSSAI compliance support from Manipal.
```

#### HOME-05 - Decision: APPROVED

Current (exact heading):

```text
Capabilities
Brand, market, and commerce
Coordinated as one system.
```

Clean Deck (p.6, exact proposal):

```text
Capabilities
Brand, market and commerce.
Run as one system.
```

#### HOME-06 - Decision: APPROVED

Current (exact card text):

```text
Branding
Positioning, identity, voice, and reusable brand assets designed for consistent use across customer-facing channels.

Marketing
Search, paid media, content, measurement, and reporting planned around defined audiences and commercial priorities.

E-commerce
Storefront, marketplace, payment, and delivery systems scoped around the selected platform and operating workflow.
```

Clean Deck (p.6, exact proposals):

```text
Branding
Positioning, identity, packaging and voice, delivered as a system your team can actually apply. You receive logo files, colour and type rules, packaging artwork templates and a written messaging guide.

Marketing
SEO, paid campaigns on Google and Meta, content and reporting, planned against a defined audience and a monthly number you agree before we start.

E-commerce
Shopify, WooCommerce and custom storefronts, plus Amazon and Flipkart listings, payments and delivery setup, built to run without daily hand-holding.
```

#### HOME-07 - Decision: APPROVED with a separate factual gate

Current (exact block and links):

```text
Supporting capability
Compliance coordination

Packaging, labelling, listing, and commerce requirements coordinated into the work, with regulated advice retained by qualified advisers.

Branding compliance -> /branding#compliance
E-commerce compliance -> /ecommerce#compliance
```

Clean Deck (p.7, exact proposal):

```text
Supporting capability
FSSAI and Legal Metrology support

We have taken six food SKUs through FSSAI labelling and Legal Metrology packaging requirements, from lab reports to production-ready artwork. If you are launching a food, nutraceutical or personal care product in India, we prepare the label content, run the artwork revisions and get your pack ready for print and for marketplace listing. Regulated legal opinions stay with qualified advisers; the preparation and the paperwork sit with us.

Branding and packaging compliance -> /branding#compliance
Marketplace and listing compliance -> /ecommerce#compliance
```

The deterministic slot, links, and anchors are approved. The exact numeric,
regulatory, or legal assertions in the proposal remain gated for Phase 4 and
separate approval; workers must not add an unverified guarantee.

#### HOME-08 - Decision: APPROVED with timing subgate

Current (exact process copy):

```text
How We Deliver
How We Work With You
One accountable path from audit through launch and iteration.

01 Audit
Understand the current position, priorities and constraints.
Timing: Initial scope review
Output: Priority audit and brief

02 Build
Create and coordinate the agreed system.
Timing: Approved roadmap
Output: Launch-ready system

03 Grow
Launch, measure and improve around evidence.
Timing: Engagement cadence
Output: Review and next priorities
```

Clean Deck (p.7, exact proposal; durations are still gated):

```text
How We Deliver
One accountable path, from audit to launch
Three stages, fixed outputs, agreed timelines. You know what arrives and when.

01 Audit
We review where the business, brand and channels stand today, and what is actually blocking growth.
Timing: 2 to 3 weeks
Output: Written audit and a prioritised project brief

02 Build
We create the agreed system: identity, campaigns, storefront, packaging, or the combination you need.
Timing: 6 to 12 weeks, depending on scope
Output: Launch-ready assets and documented handover

03 Grow
We launch, measure against the numbers set in stage one, and improve on a fixed monthly cycle.
Timing: Ongoing, monthly review
Output: Monthly performance report and next-cycle priorities
```

The headings, stage descriptions, and output labels are the approved deterministic
slot; the three proposed duration strings require the separate duration decision.

#### HOME-09 - Decision: APPROVED

Current (exact block text):

```text
Built and operated by DSPL
Raw Radicles
Chocolate, reimagined through Ayurveda.
DSPL coordinates formulation briefing, packaging, compliance inputs, photography, pricing, and route to market for a consumer brand it owns and operates. That experience informs how we plan and structure client work.
Explore our brands
```

Clean Deck (p.8, exact proposal):

```text
Built and operated by DSPL
Raw Radicles
Chocolate, reimagined through Ayurveda.
Six 60 g bars across three collections, built with real cacao and Ayurvedic botanicals. We wrote the formulation brief, designed the packs, cleared FSSAI and Legal Metrology labelling, shot the product, set the pricing and planned the route to market. We own the brand, so we carry the consequences of every one of those decisions. That is what shapes how we scope client work.
Explore our brands
```

#### HOME-10 - Decision: APPROVED

Current (exact `/` footer CTA):

```text
Eyebrow: Build with us
Title: Turn a promising idea into a coordinated project.
Text: Share the context, constraints, and outcome you are working towards.
Label: Start a project
Href: /start
```

Clean Deck (p.8, exact proposal):

```text
Eyebrow: Build with us
Title: Turn a promising idea into a working project.
Text: Tell us the context, the constraint and the outcome you need. We reply within one working day.
CTA: Start a project
Href: /start
```

### About - page group B

#### ABOUT-01 - Decision: APPROVED

Current (exact hero copy):

```text
Our Corporate Profile
About Dashapatmaja Solutions Pvt Ltd
A multidisciplinary company focused on developing brands and building coordinated commercial capabilities.
```

Clean Deck (p.9, exact proposal):

```text
Our Corporate Profile
About Dashapatmaja Solutions Pvt Ltd
A Manipal-based company that develops consumer brands and builds the branding, marketing and commerce systems behind them. Incorporated 28 July 2022. Incubated at MUTBI, MAHE, and supported under DST NIDHI-PRAYAS.
```

#### ABOUT-02 - Decision: APPROVED

Current (exact Vision card):

```text
Vision
Where we are going
Build a focused portfolio of consumer brands supported by disciplined commercial systems.
```

Clean Deck (p.9, exact proposal):

```text
Long-term direction
Vision
To build a portfolio of Indian consumer brands that earn shelf space on quality, and to give other founders the same operating support we built for ourselves.
```

#### ABOUT-03 - Decision: APPROVED

Current (exact Mission card):

```text
Mission
What we do
Develop and operate DSPL-owned brands while helping businesses coordinate branding, marketing, e-commerce, and implementation through clearly defined scopes.
```

Clean Deck (p.9, exact proposal):

```text
Our mandate
Mission
We run our own brands end to end, from formulation brief to marketplace listing. We use that experience to scope, price and deliver branding, marketing, e-commerce and compliance work for clients who are building something similar.
```

#### ABOUT-04 - Decision: APPROVED

Current (exact Values card):

```text
Values
How we work
Clarity, evidence, accountability, and practical coordination guide how we make decisions, define responsibilities, and deliver work.
```

Clean Deck (p.9, exact proposal):

```text
Operating principles
Values
We quote what the work costs, not what the client hopes it costs. We put scope, ownership and measures in writing before we start.
We tell clients when an idea will not work, including when it is our own.
```

#### ABOUT-05 - Decision: CONFIRM

Current (exact journey framing):

```text
Milestones
Our journey
A short record of how we started, our incubations, and the brands we are building.
```

Clean Deck (p.9, exact proposal):

```text
Our journey
Four years, one incubation to the next, and the first brand out of the door.
```

The handwritten scan says `keep this pending`; the proposed framing is not
authorised even though individual milestone rows have separate decisions.

#### ABOUT-06 - Decision: IMPLEMENTED

Current (exact 2023 milestone):

```text
2023
First incubation
Incubated at MUTBI, MAHE, Manipal, where we established our base.
Reference: MUTBI / MAHE, Manipal
```

Clean Deck (p.9, exact proposal):

```text
2023
Founding and first incubation
Incorporated as Dashapatmaja Solutions Pvt Ltd with a plan to build consumer brands and the services that grow them.
Took up residence at the GoK Bioincubator, Manipal.
Image alt: Early-stage consumer brand planning materials at the GoK Bioincubator in Manipal
```

The current MUTBI/MAHE wording is the accepted implementation and is retained.

#### ABOUT-07 - Decision: CONFIRM

Current (exact 2024 milestone):

```text
2024
First brand
Launched Raw Radicles, a premium chocolate brand infused with Ayurveda.
Built the product, packaging, and supply chain from the ground up.
```

Clean Deck (p.9, exact proposal):

```text
2024
First brand: Raw Radicles
Developed Raw Radicles, a premium chocolate range with Ayurvedic botanicals.
Built the formulation brief, the pack system and the supply chain from zero.
Image alt: Cacao, chocolate and Ayurvedic botanicals arranged for Raw Radicles product development
```

The developed/launched state and any buy link require confirmation.

#### ABOUT-08 - Decision: CONFIRM

Current (exact 2025-2026 milestones):

```text
2025
NIDHI-PRAYAS support
Won a government grant under the NIDHI-PRAYAS scheme.

2026
Services and manufacturing partnership
Opened our branding, marketing, and e-commerce services to outside clients.
Signed a Memorandum of Understanding with Amruthanjali Ayurveda for manufacturing.
```

Clean Deck (pp.9-10, exact proposal):

```text
2025
MUTBI incubation and a national grant
Joined MUTBI at Manipal Academy of Higher Education for technical and academic support.
Awarded a government grant under the DST NIDHI-PRAYAS scheme.
Signed a manufacturing MoU with Amruthanjali Ayurveda.
Filed a trademark application for Raw Radicles under Class 30.
Image alt: Research desk with a Raw Radicles prototype pack and measured Ayurvedic ingredients

2026
Services opened to clients
Opened branding, marketing, e-commerce and compliance support to businesses outside the company.
Image alt: Brand and e-commerce studio in Manipal with packaging, photography and dispatch materials
```

Dates, grant, service-opening, MOU, trademark, and partner statements remain
gated by the matrix.

#### ABOUT-09 - Decision: APPROVED

Current (exact team heading/presentation):

```text
Leadership and Guidance
Meet our team
Our leadership brings together experience across healthcare, management, technology, and consumer brand development.
```

Clean Deck (p.10, exact proposal):

```text
Meet our team
Four doctorates, two mentors and an operating team that has taken a food product from formulation brief to print-ready pack. We work across healthcare, engineering, management and technology.
```

The scan annotation changes the doctorate wording to `Two doctors`; the exact
credential count remains gated, so only the approved presentation slot may be
implemented after resolving that ambiguity.

#### ABOUT-10 - Decision: CONFIRM

Current (exact source biographies and roles):

```text
Dr. Manu Sudhi - Chairman & Director - Provides corporate governance and strategic direction across DSPL.
Dr. Dasharathraj K Shetty - Mentor - Advises on innovation, management systems, and enterprise development.
Dr. Shreepathy Rangabhatta B - Managing Director - Leads executive management, business operations, and project delivery.
Dr. Anusha Pai - Director - Guides healthcare and product decisions across consumer brand development.
Mr. Namesh Malarout - Director - Leads technology strategy, digital systems, and technical architecture.
```

Clean Deck (p.10, exact draft proposals; each was marked CONFIRM):

```text
Dr. Manu Sudhi
Chairman and Director
Dr. Sudhi chairs the board and guides the company’s clinical and product direction. He brings a medical background to formulation decisions, which is why Raw Radicles was built around evidence for its botanicals rather than around a marketing claim.

Dr. Shreepathy Rangabhatta R
Managing Director
Dr. Rangabhatta runs the company day to day, covering technology, systems and delivery. He oversees the engineering side of client e-commerce work, from platform selection through to payments and fulfilment integration.

Dr. Anusha Pai
Director
Dr. Pai works across management, operations and process. She leads how engagements are scoped and measured, and how the same operating discipline is applied to the company’s own brands.

Mr. Namesh Malarout
Director
Namesh leads brand development and commercial strategy. He took Raw Radicles from formulation brief through packaging, FSSAI and Legal Metrology labelling, pricing and route to market, and applies the same sequence to client launches. He is a TMA Pai PhD Scholar at MAHE researching AI adoption by entrepreneurs.

Dr. Balakrishna S. Maddodi
Mentor
Dr. Maddodi advises on management and commercial strategy, and on how early-stage ventures move from grant funding to revenue.

Dr. Dasharathraj K Shetty
Mentor
Dr. Shetty advises on research, technology and product development, and on the academic and institutional side of building from within a university incubator.
```

The scan rejects or questions individual parts, including the PhD Scholar line;
the exact names, roles, doctorate count, and bios require person-by-person
confirmation.

#### ABOUT-11 - Decision: APPROVED

Current (exact `/about` footer CTA):

```text
Eyebrow: Work with DSPL
Title: Bring the right disciplines around the same brief.
Text: Tell us where your project stands and where multidisciplinary support would help.
Label: Start a project
Href: /start
```

Clean Deck (p.11, exact proposal):

```text
Heading: Ready to build with fewer unknowns?
Subline: Tell us what you are building, where you need support and what a good next step looks like.
CTA: Contact DSPL
```

### Our Brands - page group C

#### BRANDS-01 - Decision: APPROVED

Current (exact hero):

```text
Our Brands
We develop and operate consumer brands.
From product development to market execution.
```

Clean Deck (p.12, exact proposal):

```text
We develop and operate our own consumer brands.
From formulation brief to marketplace listing, we build the brands rather than advise on them.
```

#### BRANDS-02 - Decision: APPROVED

Current (exact ownership/operator sections):

```text
Raw Radicles is owned and developed by Dashapatmaja Solutions Pvt Ltd
Raw Radicles is DSPL's first owned consumer brand. A trademark application has been filed for the Raw Radicles mark.
Product, packaging, compliance coordination, photography, pricing, marketing, and route-to-market decisions are managed as part of the same operating system.

Brand owner and services operator
DSPL develops and operates its own consumer brands. The same team also provides clearly scoped branding, marketing, e-commerce, and compliance-support services to other businesses.
```

Clean Deck (p.12, exact approved ownership/operator proposal):

```text
Dashapatmaja Solutions built it end to end. We wrote the formulation brief, ran the nutritional analysis through a certified lab, designed the packs, cleared FSSAI and Legal Metrology labelling, filed the trademark, set the price and planned the route to market.
```

The trademark and other proof details remain subject to the row-level factual gate.

#### BRANDS-03 - Decision: APPROVED

Current (exact flagship label/tagline):

```text
FLAGSHIP CONSUMER BRAND
Raw Radicles
Chocolate, reimagined through Ayurveda.
```

Clean Deck (p.12, exact proposal):

```text
Flagship consumer brand
Raw Radicles
Chocolate, reimagined through Ayurveda.
```

#### BRANDS-04 - Decision: APPROVED

Current (exact flagship narrative, contribution line, and existing CTA):

```text
Raw Radicles brings together real cacao and carefully selected Ayurvedic botanicals.
Built end to end by Dashapatmaja Solutions Pvt Ltd—from formulation and packaging to compliance, storytelling and route to market.
STRATEGY · PRODUCT DEVELOPMENT · PACKAGING · COMPLIANCE · GO-TO-MARKET
Explore our brands here
Href: /brands/raw-radicles
```

Clean Deck (p.12, exact proposal):

```text
Raw Radicles pairs real cacao with Ayurvedic botanicals across three collections: Holy Sin with Chyawanprash, Wrath Relief with Ashwagandha, and Smart Sin with Brahmi. Each comes in a milk and a dark variant, six SKUs in all, at 60 g.
Dashapatmaja Solutions built it end to end. We wrote the formulation brief, ran the nutritional analysis through a certified lab, designed the packs, cleared FSSAI and Legal Metrology labelling, filed the trademark, set the price and planned the route to market.
Strategy, Product Development, Packaging, Compliance, Go to Market
CTA: Contact us about Raw Radicles
Href: /brands/raw-radicles
```

The proposed flagship CTA is approved; the exact product/proof claims remain
bounded by their own rows.

#### BRANDS-05 - Decision: CONFIRM

Current (exact proof grid at the HEAD baseline):

```text
PRODUCT: Six 60 g bars across three collections
FORMULATION: Real cacao with selected Ayurvedic botanicals
MANUFACTURING: Chocolate production partnership in Kerala
AYURVEDIC EXPERTISE: Formulation partnership in Thrissur
```

The concurrent protected worktree diff currently changes the manufacturing value
to `Chocolate production partnership in Keralam`; that user-owned change was not
created or accepted by this task and is not matrix authority.

Clean Deck (p.12, exact proposal):

```text
Product / Six 60 g bars, three collections, milk and dark
Formulation / Real cacao with Ashwagandha, Brahmi and Chyawanprash
Manufacturing / Chocolate production partnership in Kerala
Ayurvedic expertise / Formulation partnership in Thrissur, Kerala
```

The bar count, ingredients, locations, and production statements require evidence.

#### BRANDS-06 - Decision: APPROVED

Current (exact behavior):

```text
No portfolio-in-development block exists in the current `/brands` page DOM. The page ends after the Raw Radicles flagship card and the route footer CTA.
```

Clean Deck (p.12, exact proposal):

```text
Portfolio in development
A second consumer brand is in early development. We publish brands here once they are through formulation and compliance, not before.
CTA: Contact us about a brand partnership
```

#### BRANDS-07 - Decision: REJECTED

Current (exact behavior):

```text
No MRP or pricing stat is rendered on `/brands`.
```

Clean Deck (p.12, exact proposal and confirmation marker):

```text
Pricing / Rs 300 MRP per 60 g bar
CONFIRM: MRP is not currently shown anywhere on the site. If the range is settled, add a fifth stat pair reading “Pricing / Rs 300 MRP per 60 g bar”.
```

The scan crosses this out; no price may be added.

### Raw Radicles - page group D

#### RAW-01 - Decision: APPROVED

Current (exact hero subline):

```text
How Dashapatmaja Solutions Pvt Ltd developed a focused chocolate portfolio from formulation brief to route to market.
```

Clean Deck (p.14, exact proposal):

```text
How we took an Ayurvedic chocolate range from a one-line idea to six compliant, production-ready SKUs.
```

#### RAW-02 - Decision: REJECTED

Current (exact image behavior):

```text
Holy Sin Raw Radicles milk chocolate pack
Wrath Relief Raw Radicles milk chocolate pack
Smart Sin Raw Radicles milk chocolate pack
```

Clean Deck (p.14, exact proposed alt text):

```text
Holy Sin milk chocolate bar with Chyawanprash by Raw Radicles, 60 g pack
Wrath Relief milk chocolate bar with Ashwagandha by Raw Radicles, 60 g pack
Smart Sin milk chocolate bar with Brahmi by Raw Radicles, 60 g pack
```

The scan rejects these image/alt changes; existing product assets and alt text are
protected.

#### RAW-03 - Decision: CONFIRM

Current (exact range block):

```text
Six 60 g bars across three collections
The portfolio brings together real cacao and selected Ayurvedic botanicals across a focused chocolate range.
```

Clean Deck (p.14, exact proposal):

```text
Six 60 g bars across three collections
Each collection pairs real cacao with one Ayurvedic botanical, and comes in a milk and a dark variant.
Holy Sin, with Chyawanprash. The classic Ayurvedic preparation, rebuilt as a chocolate rather than a spoonful.
Wrath Relief, with Ashwagandha. The botanical most Indian consumers already recognise, in a format they will actually finish.
Smart Sin, with Brahmi. Traditionally associated with focus and memory, and the hardest of the three to make taste good.
```

The deck says to confirm the descriptions against the brand identity document and
not to add health claims.

#### RAW-04 - Decision: APPROVED

Current (exact ownership block):

```text
Owned by Dashapatmaja Solutions Pvt Ltd
DSPL was incorporated on 28 July 2022 and owns Raw Radicles. The brand provides the company with direct operating experience across product, packaging, compliance inputs, market presentation, and commerce decisions.
That direct operating experience shapes how DSPL scopes branding, marketing, e-commerce, and compliance-support work for clients.
```

Clean Deck (p.14, exact proposal):

```text
We own it, so we carry every decision
Dashapatmaja Solutions Pvt Ltd was incorporated on 28 July 2022 and owns Raw Radicles outright. We are not advisers on this brand; we are the client, the budget holder and the person who signs off the artwork at 11 pm before a print deadline.
That changes what we know. We have argued with a lab about a nutritional panel, redrawn a pack because a declaration would not fit at the required point size, and priced a 60 g bar against what a Kerala manufacturer can actually run. When we scope client work, we are pricing work we have done ourselves.
```

#### RAW-05 - Decision: CONFIRM

Current (exact product-development/production block in the protected worktree):

```text
Product development and production
Formulation partnership in Thrissur, Keralam
Selected Ayurvedic botanicals and the formulation brief are coordinated with specialist expertise in Thrissur.
Manufacturing partnership in Ernakulam, Keralam
Chocolate production is carried out through a manufacturing partnership in Keralam.
```

The `Keralam`/`Ernakulam` wording is a concurrent protected user-owned diff, not
an accepted factual decision. The HEAD baseline used by the original matrix had
generic Kerala/Thrissur wording. Clean Deck (pp.14-15, exact proposal) is:

```text
Formulation partnership in Thrissur
The botanical selection and the formulation brief were developed with Ayurvedic specialists in Thrissur, Kerala, working from traditional preparations rather than from an extract supplier’s catalogue.

Manufacturing partnership in Kerala
Chocolate production runs through a Kerala manufacturing partner, chosen for the ability to handle botanical inclusions at small batch sizes without compromising temper.
```

#### RAW-06 - Decision: CONFIRM

Current (exact visible worktree values):

```text
Formulation partnership in Thrissur, Keralam
Manufacturing partnership in Ernakulam, Keralam
```

Clean Deck (p.14-15, exact location proposal):

```text
The botanical selection and the formulation brief were developed with Ayurvedic specialists in Thrissur, Kerala.
Chocolate production runs through a Kerala manufacturing partner.
```

The scan is unclear about the location wording. Neither the concurrent diff nor
the deck location claims are accepted as factual authority.

#### RAW-07 - Decision: REJECTED

Current (exact behavior):

```text
Selected Ayurvedic botanicals and the formulation brief are coordinated with specialist expertise in Thrissur.
Chocolate production is carried out through a manufacturing partnership in Keralam.
No named formulation or manufacturing partner appears in the current source.
```

Clean Deck (p.15 exact gate):

```text
CONFIRM partner names. Your About page names Amruthanjali Ayurveda publicly. Decide which partners you want named on the site and name them; unnamed partners read as unverifiable.
```

The scan rejects naming partners; no name may be added.

#### RAW-08 - Decision: APPROVED

Current (exact workstreams and closing block):

```text
DSPL workstreams
Coordinating the work around the product
Formulation briefing: Defining the product brief and coordinating it with the formulation partner.
Packaging: Developing the pack system and the information required for production-ready artwork.
Compliance coordination: Coordinating labelling and packaging inputs with the relevant qualified partners.
Photography: Planning product imagery for brand, retail, and digital-commerce use.
Pricing: Bringing product, channel, and operating inputs into the commercial decision.
Route to market: Preparing how the product is presented and made available through selected channels.

Owned operating experience
Built through direct operating experience
Raw Radicles gives DSPL first-hand experience of the decisions and handoffs involved in taking a consumer brand from product brief to customer-facing channels.
Explore our brands | Start a project
```

Clean Deck (p.15, exact proposal):

```text
What the work involved
Six workstreams, one product
Formulation brief: Defining dosage format, botanical load, cacao percentage and taste targets, then working them through with the formulation partner until the bar was both palatable and defensible.
Packaging: A pack system across six SKUs, with a shared architecture and per-collection differentiation, taken through to print-ready artwork with every mandatory declaration placed and sized correctly.
FSSAI and Legal Metrology labelling: Nutritional data organised from certified lab reports, ingredient statements ordered by weight, net quantity, batch and date formats, allergen and veg mark placement, all aligned to FSSAI labelling and Legal Metrology packaged commodity rules across all six SKUs.
Photography: Product imagery planned once for three uses: brand, retail shelf and marketplace listing, which each demand different crops, backgrounds and thumbnail legibility.
Pricing: Unit economics built from manufacturing cost, botanical cost, packaging, channel margin and marketplace fees, back-solved to an MRP that survives a Flipkart discount cycle.
Route to market: Channel selection, listing readiness and launch sequencing across own storefront, marketplaces and offline retail.

What it gives us
We learned this by doing it, not by reading about it
Raw Radicles gave us first-hand experience of every handoff between a product idea and a customer’s basket. The client work we take on is the work we have already done once, at our own cost.
CTA 1: Explore our brands
CTA 2: Start a project
```

The generic workstream and closing copy is the approved slot; named partners,
unverified locations, MRP, and unsupported regulatory/product claims remain gated.

### Branding - page group E

#### BRANDING-01 - Decision: APPROVED

Current (exact page-owned hero value):

```text
Branding
Build a clear brand system that people can apply consistently.
```

Clean Deck (p.16, exact proposal):

```text
Branding services
Branding
Positioning, identity and packaging that hold up in a print file, on a marketplace thumbnail and in a WhatsApp forward.
```

#### BRANDING-02 - Decision: APPROVED

Current (exact scope block):

```text
A brand system built for application
The work starts with the business, audience, category, and competitive context. The resulting system connects positioning and language with visual identity, packaging, application rules, and assets that internal and external teams can use consistently.
```

Clean Deck (p.16, exact proposal):

```text
A brand system built to be used, not admired
Most brand projects end with a PDF nobody opens again. We build the identity alongside the places it has to work: the pack that goes to print, the listing image that gets cropped to a square, the ad copy that a junior writes on a Tuesday.
Work starts with your business, audience, category and competition. It ends with a system your team can apply without calling us. We designed and shipped our own consumer brand across six SKUs, so we build for the constraints we already know are coming.
```

#### BRANDING-03 - Decision: APPROVED

Current (exact page-owned offers):

```text
Positioning and Brand Strategy: Audience, category, competitor, offer, and business context translated into a clear position and decision framework.
Naming and Brand Architecture: Naming criteria, shortlist development, portfolio relationships, and practical checks coordinated with the client and appointed advisers.
Visual Identity Systems: Logo, colour, typography, image direction, and application rules designed for consistent use across priority touchpoints.
Brand Story and Voice: Narrative, voice, core messages, and examples for common customer-facing contexts without unsupported product claims.
Packaging and Application Assets: Packaging systems, templates, organised source files, and handover guidance for internal and partner teams.
```

Clean Deck (p.16, exact four-card proposal):

```text
What we do
Scope is built around the decisions you need to make, not sold as a fixed package.
Brand identity and visual systems: Logo, colour, typography, packaging architecture and application rules. You receive working source files, export-ready logo variants, a colour and type specification, and templates for the formats you use most.
Market positioning: Audience, category and competitor analysis, resolved into a position you can defend and a set of decisions your team can apply without asking permission each time.
Brand story and voice: A messaging document covering the brand narrative, tone, core messages and worked examples for the contexts you actually write in: product pages, ads, packaging, customer email, sales decks.
Packaging and brand assets: Print-ready artwork, reusable templates, organised source files and written guidance so internal and partner teams can produce on-brand work without a designer in the loop.
```

#### BRANDING-04 - Decision: APPROVED with a separate factual gate

Current (exact compliance block):

```text
Packaging and brand compliance coordination
We coordinate practical brand and packaging inputs while regulated advice, approvals, and filings remain with the appropriate qualified parties.
Food labelling coordination: Packaging work can be checked against inputs required under the Food Safety and Standards (Labelling and Display) Regulations, 2020.
Pack declarations: Required declaration inputs can be coordinated with reference to the Legal Metrology (Packaged Commodities) Rules, 2011.
Claims review: Marketing and pack claims are routed for evidence review so the artwork does not outrun the available support.
Trademark coordination: Naming and identity files can be organised for review and filing by the appointed trademark professional.
Barcode and GTIN coordination: SKU, barcode and GTIN inputs can be mapped into the packaging and catalogue workflow.
DSPL coordinates implementation and does not act as a regulator, licensing authority, or legal adviser.
```

Clean Deck (pp.16-17, exact proposal):

```text
Packaging compliance for food and consumer products
If your pack carries a nutritional panel, an ingredient statement or a net quantity declaration, the design and the regulation are the same problem. We have taken six food SKUs through FSSAI labelling and Legal Metrology packaged commodity requirements, from lab reports through to print-ready artwork.
We prepare the label content, place and size the mandatory declarations, run the revision cycles with your manufacturer, and make sure the artwork that goes to print is the same artwork that will clear a marketplace listing review. Regulated legal opinions stay with qualified advisers; the preparation and the paperwork sit with us.
```

The slot and qualified-adviser boundary are approved; exact legal/regulatory
assertions require Phase 4 evidence before they are changed.

#### BRANDING-05 - Decision: APPROVED with commercial subgate

Current (exact FAQ set):

```text
What can a branding engagement include? Scope can include positioning, naming, identity, voice, packaging or application guidelines, compliance coordination, and reusable assets. The proposal identifies which are required.
Can you work with an existing brand? Yes. We first identify what should be retained, clarified, or replaced, then define the refresh scope against current business needs.
Can branding work include packaging? Yes, when packaging is in scope. We can coordinate structure, information hierarchy, artwork application, and approved label content, while regulated advice and formal approvals remain with the appropriate qualified professionals.
How do reviews and approvals work? The proposal defines review stages, decision-makers, and revision responsibilities so feedback, approvals, and handover remain controlled.
What is included in the handover? We provide the agreed source files, usage guidance, templates, and a handover for the people responsible for implementation.
```

Clean Deck (p.17, exact modified FAQ proposal):

```text
Branding engagement questions
What does a branding engagement include? It depends on what you already have. A full engagement covers positioning, identity, voice and application: research and competitor review, a defined position, logo and visual system, typography and colour rules, packaging or key applications, a messaging guide and organised source files. A narrower engagement might be positioning alone, or packaging alone.
How long does it take? A positioning and identity project typically runs 6 to 10 weeks from kickoff. Packaging across multiple SKUs adds 3 to 6 weeks, more if regulatory clearance and manufacturer revisions are involved. We give a dated schedule at the end of the audit stage, not before.
What does branding cost? CONFIRM AND INSERT YOUR BAND. Suggested structure: identity-only projects from Rs [X]; full positioning, identity and packaging systems from Rs [Y]; multi-SKU packaging priced per SKU from Rs [Z]. Publishing a floor removes the enquiries you would decline anyway.
Can you work with an existing brand? Yes, and most of our work is this. We audit what exists, keep the equity that is working, and fix the parts that break in application. We will tell you if a rebuild is not warranted.
What files do we receive at handover? Working source files in the original format, export-ready logo variants, a written specification for colour, type and spacing, packaging artwork in print-ready format with dielines, and a messaging guide with worked examples. Everything is yours; we do not hold source files.
Do you design packaging that is ready for the printer? Yes. Artwork is delivered with dielines, bleed, correct colour profile and all mandatory declarations placed and sized. We run revision cycles directly with your manufacturer or printer.
Do you handle FSSAI labelling? We prepare label content and artwork against FSSAI labelling and Legal Metrology requirements, and we have done this across six of our own food SKUs. Regulated legal opinions stay with qualified advisers.
Can you work with our in-house designer or existing agency? Yes. We can deliver the system and hand it over, or work alongside your team through implementation. Ownership and responsibilities are written down before we start.
Do you work with businesses outside Karnataka? Yes. We are based in Manipal and work with clients across India, mostly remotely, with on-site visits for manufacturing and print approvals.
What happens after handover? Most clients move to a marketing or e-commerce engagement, or take a monthly retainer for ongoing asset production. Neither is required, and the brand system is built to work without us.
```

Pricing, fixed durations, and legal assertions in this exact proposal remain
gated by BRANDING-06/Phase 4 even though the FAQ modification slot is approved.

#### BRANDING-06 - Decision: CONFIRM

Current (exact behavior):

```text
No service price is rendered. The current page does not publish the proposed fixed project-duration bands or a pricing floor.
```

Clean Deck (p.17, exact unresolved proposal):

```text
What does branding cost? CONFIRM AND INSERT YOUR BAND. Suggested structure: identity-only projects from Rs [X]; full positioning, identity and packaging systems from Rs [Y]; multi-SKU packaging priced per SKU from Rs [Z].
How long does it take? A positioning and identity project typically runs 6 to 10 weeks from kickoff. Packaging across multiple SKUs adds 3 to 6 weeks, more if regulatory clearance and manufacturer revisions are involved.
```

#### BRANDING-07 - Decision: APPROVED

Current (exact `/branding` footer CTA):

```text
Eyebrow: Build a usable brand system
Title: Clarify the decisions your brand needs to make consistently.
Text: Share your current materials and the decisions that are holding the work back.
Label: Start a branding project
Href: /start
```

Clean Deck (p.18, exact proposal):

```text
Heading: Ready to build with fewer unknowns?
Subline: Tell us what you are building, where you need support and what a good next step looks like.
CTA: Contact DSPL
Href: /start
```

### Marketing - page group F

#### MARKETING-01 - Decision: APPROVED

Current (exact hero and intro):

```text
Marketing services
Marketing
Build a measurable marketing programme around clear audiences and accountable execution.
A coordinated marketing programme
Engagements begin with the current market position, audience, channel performance, and measurement setup. From there, we agree channel responsibilities, campaign cadence, reporting measures, and the work required to improve decisions over time.
```

Clean Deck (p.19, exact proposal):

```text
Marketing services
Marketing
Search, paid media, content and reporting, run against a number you agree before we spend anything.
Marketing you can hold us to
Every engagement starts with the same four questions: where does traffic come from today, what does it cost, what does it convert at, and what would a good month look like. We answer those in the audit, agree the measures, and report against them monthly.
We market our own consumer brand in the same market you are competing in, which is why we will tell you when paid spend is the wrong answer.
```

#### MARKETING-02 - Decision: APPROVED

Current (exact page-owned offers):

```text
Audience and Market Planning: Current position, customer context, channel evidence, and commercial priorities translated into an agreed marketing plan.
Search Engine Optimisation (SEO): Technical review, search-intent research, on-page structure, and content planning designed to improve qualified organic visibility over time.
Paid Campaign Management: Campaign planning and management across Google, Meta, and relevant commerce channels, with budgets reviewed against agreed measures.
Content and Copywriting: Landing pages, articles, product copy, and campaign messaging aligned with search intent and the brand voice. Content is currently scoped in English.
Analytics and Performance Tracking: Tracking and reporting for traffic, campaign spend, enquiries, and commercial outcomes, with measurement definitions agreed before launch.
```

Clean Deck (p.19, exact four-card proposal):

```text
What we do
The mix is chosen against your brief. It is not a package.
Search engine optimisation: Technical audit, search intent research, on-page structure, internal linking and a content plan built around terms you can realistically win, not head terms that will never convert. Monthly reporting on rankings, qualified sessions and enquiries.
Paid campaign management: Google Search, Google Shopping, Meta and marketplace ads. Campaign structure, creative briefing, budget pacing and weekly optimisation, with spend reviewed against agreed cost-per-enquiry or ROAS targets.
Analytics and reporting: GA4 and conversion tracking configured before launch, not after. Traffic, spend, enquiries and revenue reported monthly against definitions agreed in writing at the start.
Content and copywriting: Landing pages, articles, product copy and campaign messaging written to search intent and to your brand voice, by people who have written for a product they had to sell themselves.
```

#### MARKETING-03 - Decision: APPROVED with performance subgate

Current (exact FAQ set):

```text
How is the scope defined? We begin with your objectives, audience, current channels, available data, and budget. The proposal then sets out priorities, responsibilities, deliverables, and reporting cadence.
How are results assessed? We agree measures before launch. These may include qualified traffic, enquiry volume, campaign efficiency, or sales data where reliable tracking is available.
Can you guarantee results? No. We cannot guarantee rankings, leads, or sales. Outcomes depend on the offer, market, budget, timing, competition, operating follow-through, and data quality.
How long should an ongoing programme run? Ongoing programmes use a minimum initial commitment of three months so there is time to establish the baseline, execute agreed work, and review evidence. The exact scope remains proposal-specific.
Can you work with existing teams or agencies? Yes. Roles, access, review responsibilities, and hand-offs are documented so strategy, creative, media, and reporting remain coordinated.
```

Clean Deck (pp.19-20, exact modified FAQ proposal):

```text
Marketing engagement questions
How is scope defined? After the audit. We review current position, channels, tracking and competition, then propose a mix, a monthly cadence and a set of measures. You approve the scope before work starts.
What does a marketing engagement cost? CONFIRM AND INSERT. Suggested structure: SEO retainers from Rs [X] per month; paid media management from Rs [Y] per month or [Z] per cent of spend, whichever is higher; one-off audits from Rs [A]. Ad spend is separate and paid directly by you to the platform.
How long before SEO shows results? For a site with existing authority, movement on long-tail terms in 8 to 12 weeks. For a new domain, 6 to 9 months to meaningful organic enquiries. Anyone promising faster is either buying links or counting the wrong metric.
How are results assessed? Against the measures agreed before launch, reported monthly. For most clients that is qualified enquiries and cost per enquiry, not impressions or rankings alone.
Do you handle ad spend, or do we? You pay the platform directly and keep ownership of the ad accounts. We manage them. If we build accounts from scratch, they are created under your ownership from day one.
Can you work with our existing team or agency? Yes. We can take one channel, audit and hand over, or run the full programme. Responsibilities are documented so nothing falls between teams.
Do you work with D2C and food brands specifically? Yes, and it is where we are strongest. We run our own food brand through the same marketplace, listing and advertising systems.
What is the minimum commitment? Three months for retained work, because anything shorter cannot show a trend. Audits and one-off projects have no ongoing commitment.
Which cities and regions do you serve? We are based in Manipal and work with clients across Karnataka, including Udupi and Mangalore, and across India remotely.
What do we need to provide? Access to your website, ad accounts, analytics and product information, and one person on your side who can approve creative and answer questions within a working day.
```

Prices and SEO timing are not approved; the no-guarantee boundary remains intact.

#### MARKETING-04 - Decision: APPROVED

Current (exact `/marketing` footer CTA):

```text
Eyebrow: Plan the next programme
Title: Connect campaign activity to a clearer operating plan.
Text: Tell us what has been tried, what can be measured, and what needs to change.
Label: Start a marketing project
Href: /start
```

Clean Deck (p.20, exact proposal):

```text
Heading: Ready to build with fewer unknowns?
Subline: Tell us what you are building, where you need support and what a good next step looks like.
CTA: Contact DSPL
Href: /start
```

#### MARKETING-05 - Decision: CONFIRM

Current (exact behavior):

```text
No marketing price floor is rendered. The FAQ currently uses proposal-specific scope and commitment language rather than the clean-deck price bands or SEO timing.
```

Clean Deck (p.20, exact unresolved proposal):

```text
What does a marketing engagement cost? CONFIRM AND INSERT. Suggested structure: SEO retainers from Rs [X] per month; paid media management from Rs [Y] per month or [Z] per cent of spend, whichever is higher; one-off audits from Rs [A].
How long before SEO shows results? For a site with existing authority, movement on long-tail terms in 8 to 12 weeks. For a new domain, 6 to 9 months to meaningful organic enquiries.
```

#### MARKETING-06 - Decision: CONFIRM

Current (exact no-guarantee answer):

```text
Can you guarantee results?
No. We cannot guarantee rankings, leads, or sales. Outcomes depend on the offer, market, budget, timing, competition, operating follow-through, and data quality.
```

Clean Deck (p.20, exact performance proposal):

```text
How are results assessed? Against the measures agreed before launch, reported monthly. For most clients that is qualified enquiries and cost per enquiry, not impressions or rankings alone.
```

No result, ranking, lead, sales, or ROAS guarantee is authorised.

### E-commerce - page group G

#### ECOMMERCE-01 - Decision: APPROVED

Current (exact hero and intro):

```text
E-commerce services
E-commerce
Connect storefront, marketplace, payment, fulfilment, and operating responsibilities.
Commerce aligned with day-to-day operations
Storefront and marketplace work is planned alongside catalogue ownership, payment setup, inventory, fulfilment, compliance inputs, and reporting. This keeps the customer journey and operational responsibilities within one documented scope.
```

Clean Deck (p.21, exact proposal):

```text
E-commerce services
E-commerce
Storefronts, marketplaces, payments and delivery, built to run on a normal Tuesday without anyone calling support.
Commerce built around how you actually operate
A storefront is only as good as the operation behind it. We plan the build alongside catalogue ownership, payment setup, inventory, dispatch and reporting, so the customer journey and the internal workflow are designed at the same time by the same people.
We list, price and ship our own product through these systems, which is why the questions we ask early are about your warehouse and your returns policy, not only your homepage.
```

#### ECOMMERCE-02 - Decision: APPROVED

Current (exact page-owned offers):

```text
Store Setup and Build: Storefront planning and implementation for Shopify, WooCommerce, or React-based commerce, with responsive behaviour and a clear content structure.
Catalogue and Product Content: Product data, collection structure, imagery requirements, and content ownership organised for the selected channels.
Conversion Journey Review: Product discovery, product detail, cart, and checkout journeys reviewed to identify measurable friction and testable improvements.
Marketplace Operations: Marketplace setup and workflow planning for agreed channels, including catalogue, inventory, pricing, and review responsibilities.
Payments, Delivery, and Returns: Payment, fulfilment, delivery, and returns workflows configured around the selected platform, providers, and operating model.
Commerce Analytics and Reconciliation: Tracking, channel reporting, settlement inputs, and operating checks designed around named data owners and review cadence.
```

Clean Deck (p.21, exact four-card proposal):

```text
What we do
Built to the platforms, integrations and operating responsibilities agreed for your project.
Store setup and build: Shopify, WooCommerce or React-based commerce. Catalogue structure, content architecture, responsive build, and an admin your team can run without a developer for routine changes.
Conversion rate optimisation: Review of discovery, product detail, cart and checkout journeys to find measurable friction, then a prioritised list of changes with a test plan. We fix what the data supports, not what looks dated.
Marketplace and multi-channel selling: Amazon and Flipkart setup, catalogue preparation, listing content, variant structure, inventory and pricing workflow, plus quick-commerce and social channels where they fit.
Payments and delivery setup: Payment gateway and delivery integrations configured to your platform, providers, fulfilment model and internal process, with COD, prepaid and returns flows tested before launch.
```

#### ECOMMERCE-03 - Decision: APPROVED with a separate legal gate

Current (exact compliance block):

```text
Commerce compliance coordination
Commerce implementation includes the practical configuration and declaration inputs agreed for the project.
GST configuration: Tax settings are configured from information approved by the client and their qualified tax adviser.
HSN mapping: Approved HSN mapping can be organised across catalogue and commerce records.
Settlement reconciliation: Marketplace and payment-settlement inputs can be mapped into a documented reconciliation workflow.
E-way-bill process: Operational handoffs for the e-way-bill process can be documented against the selected fulfilment flow.
Returns policies: Approved returns policies can be implemented consistently across storefront and marketplace touchpoints.
Listing declarations: Required listing declarations are coordinated from client-approved product and compliance records.
DSPL coordinates implementation; tax and legal advice remains with the client’s qualified advisers.
```

Clean Deck (pp.21-22, exact proposal):

```text
Listing and marketplace compliance
Marketplace listing rejections almost always come from the same place: the pack says one thing and the catalogue says another. Net quantity, ingredient statements, manufacturer details, country of origin, FSSAI licence number and expiry format all have to match between the physical label and the digital record.
We prepare catalogue data from the approved label artwork so the two agree from the start, and we structure product information so it can be pushed to a new channel without re-entry. For food and nutraceutical sellers we handle FSSAI licence details, mandatory declarations and marketplace-specific category requirements. Regulated legal opinions stay with qualified advisers.
```

The deterministic anchor/section slot and qualified-adviser boundary are approved;
tax, GST, HSN, e-way-bill, licence, and marketplace legal assertions remain gated.

#### ECOMMERCE-04 - Decision: APPROVED with commercial subgate

Current (exact FAQ set):

```text
How do you select a platform? We recommend a platform after reviewing catalogue complexity, integrations, internal capability, budget, and the expected operating model. Shopify, WooCommerce, and React-based builds are supported where appropriate.
Can you improve an existing store? Yes. An audit can cover performance, catalogue structure, product journeys, checkout, analytics, compliance inputs, and operating dependencies before improvement work is scoped.
Can product and catalogue setup be included? Yes, when included in scope. We can structure product data, variants, collections, content fields, and channel-ready records using approved source information.
What happens after launch? Post-launch support can cover agreed fixes, analytics checks, catalogue updates, marketplace coordination, and operating handover. Ongoing support is scoped separately when required.
Can marketplace and ongoing support be included? Yes, when included in the scope. The engagement defines which channels, integrations, data owners, compliance inputs, and ongoing responsibilities are covered.
```

Clean Deck (p.22, exact modified FAQ proposal):

```text
E-commerce engagement questions
How do you choose a platform? By catalogue size, order volume, integration needs and who will run it after launch. Shopify for most D2C brands under a few hundred SKUs, WooCommerce where you need control and already have a WordPress operation, custom React where the catalogue or the experience genuinely demands it.
What does an e-commerce build cost? CONFIRM AND INSERT. Suggested structure: Shopify builds from Rs [X]; WooCommerce from Rs [Y]; custom builds quoted per project; marketplace onboarding per channel from Rs [Z]; monthly operations retainers from Rs [A]. Platform and app subscriptions are separate.
How long does a build take? A Shopify store with a prepared catalogue, 4 to 6 weeks. Custom builds and multi-channel launches, 8 to 16 weeks. Catalogue preparation is usually the longest item and it depends on your product data being ready.
Can you improve an existing store? Yes. We audit the discovery, product, cart and checkout journeys, quantify where sessions are lost, and give a prioritised list of fixes with expected effect. You can then run them, or we can.
Do you list products on Amazon and Flipkart? Yes, including catalogue preparation, listing content, variant structure, image specification and brand registry where applicable. We do this for our own product.
Who owns the store and accounts? You do, from day one. Seller accounts, payment gateways, domains and hosting are created and held under your ownership.
Do you handle product photography? We plan and brief it, and we can arrange it. Marketplace listings need specific crops, backgrounds and resolutions that ordinary brand photography does not satisfy, so it is worth planning once for all uses.
Can you take on ongoing operations? Yes. Monthly retainers cover catalogue updates, listing health, inventory and pricing workflow, performance reporting and channel expansion.
Do you work with food and nutraceutical sellers? Yes, and we understand the FSSAI licence, declaration and category requirements that get food listings rejected.
What do we need before we start? Product information, images or the budget to shoot them, GST and business registration details, a decision on your fulfilment model, and one person on your side who can approve and answer within a working day.
```

Prices and fixed delivery bands remain gated by ECOMMERCE-06.

#### ECOMMERCE-05 - Decision: APPROVED

Current (exact `/ecommerce` footer CTA):

```text
Eyebrow: Improve the commerce operation
Title: Make the buying journey and operating handoffs easier to manage.
Text: Share your store, marketplace, payment, fulfilment, or compliance-support needs.
Label: Start an e-commerce project
Href: /start
```

Clean Deck (p.22, exact proposal):

```text
Heading: Ready to build with fewer unknowns?
Subline: Tell us what you are building, where you need support and what a good next step looks like.
CTA: Contact DSPL
Href: /start
```

#### ECOMMERCE-06 - Decision: CONFIRM

Current (exact behavior):

```text
No e-commerce price or fixed delivery-duration band is rendered on the current page.
```

Clean Deck (p.22, exact unresolved proposal):

```text
What does an e-commerce build cost? CONFIRM AND INSERT. Suggested structure: Shopify builds from Rs [X]; WooCommerce from Rs [Y]; custom builds quoted per project; marketplace onboarding per channel from Rs [Z]; monthly operations retainers from Rs [A].
How long does a build take? A Shopify store with a prepared catalogue, 4 to 6 weeks. Custom builds and multi-channel launches, 8 to 16 weeks.
```

#### ECOMMERCE-07 - Decision: CONFIRM

Current (exact legal/platform behavior):

```text
Current compliance cards use qualified-client wording: Tax settings are configured from information approved by the client and their qualified tax adviser; DSPL coordinates implementation; tax and legal advice remains with the client’s qualified advisers.
```

Clean Deck (p.22, exact proposal):

```text
For food and nutraceutical sellers we handle FSSAI licence details, mandatory declarations and marketplace-specific category requirements. Regulated legal opinions stay with qualified advisers.
```

Platform, performance, tax, and legal assertions remain gated until evidenced.

### Contact - page group H

#### CONTACT-01 - Decision: APPROVED

Current (exact hero explanatory copy):

```text
Contact
Start a conversation.
Share context, timelines, and outcomes for your project. We respond within one working day with scope considerations or a focused follow-up call. For detailed scopes, use our Start a detailed project brief.
Link: /start
```

Clean Deck (p.25, exact proposal):

```text
Contact
Start a conversation.
For a quick question, use the form below. For a project you want scoped, use the project planner; it takes about five minutes and gets you a better first conversation. Either way, we reply within one working day.
Link: /start
```

#### CONTACT-02 - Decision: REJECTED

Current (exact authoritative contact values):

```text
Manipal office
#12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal, Karnataka 576104
Monday – Saturday: 9:00 AM – 6:00 PM IST
New enquiries
+91 88619 42440
director@dashapatmaja.in
Existing projects
+91 90725 56665
dsplmanipal@gmail.com
```

Clean Deck (p.25, exact rejected detail proposal):

```text
Headquarters in Manipal
Room No. 12, 4th Floor, MUTBI, Advanced Research Center, Madhava Nagar, Manipal, Karnataka 576104
+91 88619 42440
+91 90725 56665
Monday to Saturday, 9:00 AM to 6:00 PM IST
director@dashapatmaja.in
dsplmanipal@gmail.com
Add an embedded map and a Google Business Profile link.
```

The scan rejects changing this block; `COMPANY_FACTS` remains authoritative.

#### CONTACT-03 - Decision: APPROVED

Current (exact options and label):

```text
What do you need help with?
Branding
Marketing
E-commerce
Compliance
Other
```

Clean Deck (p.25, exact approved options):

```text
Branding
Marketing and SEO
E-commerce and marketplaces
Packaging and FSSAI compliance
New consumer brand
Something else
```

#### CONTACT-04 - Decision: APPROVED

Current (exact success state):

```text
Message received
Thank you. We have received your message and will review it before contacting you.
Send Another Message
```

Clean Deck (p.25, exact proposal):

```text
Thanks. We have your message and will reply within one working day, Monday to Saturday.
```

#### CONTACT-05 - Decision: APPROVED

Current (exact enquiry context):

```text
Send a message
General enquiry
Share enough context for us to route your enquiry correctly.
```

Clean Deck (p.25, exact proposal):

```text
General enquiry
Tell us what you need and how to reach you.
```

### Start a Project - page group I

#### START-01 - Decision: APPROVED

Current (exact hero intro):

```text
Project planner
Start a Project
Share the context we need to review your project and prepare a useful first conversation.
```

Clean Deck (p.26, exact proposal):

```text
Project planner
Start a Project
Five minutes here saves an hour of back and forth later. Tell us where you stand, what you need and what a good outcome looks like.
```

#### START-02 - Decision: CONFIRM

Current (exact Context briefing point):

```text
Context
Where the business, brand, or project stands today.
```

Clean Deck (p.26, exact proposal):

```text
Context
Where the business, brand or product stands today.
```

The scan does not clearly approve this replacement; preserve the current point.

#### START-03 - Decision: APPROVED

Current (exact Need briefing point):

```text
Need
The decision, capability, or operating problem that needs support.
```

Clean Deck (p.26, exact proposal):

```text
Need
The decision or capability that is currently blocking you.
```

#### START-04 - Decision: APPROVED

Current (exact Outcome briefing point):

```text
Outcome
What a useful result would make easier for your team.
```

Clean Deck (p.26, exact proposal):

```text
Outcome
What a good result would make possible for your team.
```

#### START-05 - Decision: APPROVED

Current (exact referral options):

```text
How did you hear about us?
Google
Instagram
Referral
Other
```

Clean Deck (p.26, exact proposal):

```text
Add LinkedIn to “How did you hear about us?”.
```

The approved implementation target is `Google`, `Instagram`, `Referral`,
`LinkedIn`, `Other`, preserving the existing optional field and payload.

#### START-06 - Decision: APPROVED

Current (exact service options):

```text
Branding
Marketing
Social Media
Website
E-commerce
Compliance
Other
```

Clean Deck (p.26, exact proposal):

```text
Add “Packaging and FSSAI compliance” as a distinct option under Service Interested In. It is currently folded into “Compliance”, which is vaguer than what people search for.
```

The approved implementation adds the exact combined option while preserving the
existing multi-select and payload contracts unless focused behavior tests require
the smallest model update.

#### START-07 - Decision: APPROVED

Current (exact behavior):

```text
The project-planner form has no budget field or budget-band options.
```

Clean Deck (p.26) and approved exact bands:

```text
Add a budget range select.
Under ₹1 lakh
₹1–3 lakh
₹3–10 lakh
Above ₹10 lakh
Not decided yet
```

#### START-08 - Decision: IMPLEMENTED

Current (exact retained sentence):

```text
A polished brief is not required. Complete the relevant fields and leave optional details blank if they are not decided yet.
```

Clean Deck (p.26, exact proposal):

```text
Keep “A polished brief is not required.” It is the best sentence on the site.
```

### Insights and global boundaries - conditional or deferred rows

#### GLOBAL-01 - Decision: CONFIRM

Current (exact publication behavior):

```text
/blogs renders the current two compliance cards. Category is “Compliance”; cards expose title, reading time, published date, and the current authors when present. The article references are rendered from the generated publication data.
```

Clean Deck (pp.23-24, exact proposal):

```text
Make the category labels (Branding, E-commerce) clickable, pointing to category archives.
Add author bylines to the cards.
The two live posts were published on the same date and cover overlapping ground. Re-date one, and rewrite the second to remove the overlap, or consolidate them into one stronger article.
```

The current publication set is not replaced; exact reference corrections require
separate approval.

#### GLOBAL-02 - Decision: CONFIRM

Current (exact article identity):

```text
fssai-labelling-requirements-checklist-2026
Title: FSSAI Labelling Requirements for Packaged Food
Category: Compliance
Published: 2026-08-24T08:00:00.000Z

legal-metrology-packaged-commodity-rules-india
Title: Legal Metrology Packaged Commodity Rules
Category: Compliance
Published: 2026-08-24T08:00:00.000Z
```

Clean Deck (p.23, exact obsolete metadata proposals):

```text
Why Brand, Marketing and E-commerce Should Not Be Three Separate Vendors
Every handoff between your design studio, your ads agency and your web developer loses context. Here is what that costs an Indian D2C brand, and how to fix it.

From Print File to First Order: What Actually Happens During an Indian D2C Launch
Packaging, catalogue data, marketplace listings, checkout and dispatch, in the order they actually break. Written from six SKUs we took to market ourselves.
```

These obsolete concepts are not restored. Regulatory freshness is read-only.

#### GLOBAL-03 - Decision: CONFIRM

Current (exact representative source behavior):

```text
Route metadata currently uses titles such as “Dashapatmaja Solutions Pvt Ltd | Consumer Brand Building & Growth”, organization JSON-LD from organizationStructuredData, and route-owned footerCtas entries. No sitewide title/footer/schema expansion is applied by this matrix.
```

Clean Deck (pp.4-5, exact proposal set):

```text
Home: Branding, Marketing & E-commerce Company in Manipal, Karnataka
About: About Dashapatmaja Solutions: Brand Builders in Manipal
Brands: Our Consumer Brands: Raw Radicles Ayurvedic Chocolate
Raw Radicles: Raw Radicles: Ayurvedic Chocolate Built from Scratch in India
Branding: Branding & Brand Identity Agency in Manipal, Karnataka
Marketing: Digital Marketing & SEO Agency in Manipal, Udupi
E-commerce: E-commerce Development for D2C Brands in India
Insights: Insights on Branding, D2C Launches & FSSAI Compliance
Contact: Contact Dashapatmaja Solutions, Manipal, Karnataka
Start: Start a Project with Dashapatmaja Solutions
```

The global rewrite is deferred; only route-owned metadata rows explicitly approved
above may change.

#### GLOBAL-04 - Decision: CONFIRM

Current (exact representative wording):

```text
The active source contains “coordinated”, “coordinate”, and “coordination” in page copy, including “coordinated commercial capabilities”, “compliance coordination”, and “route your enquiry correctly”. Blog/source content also contains American forms such as “catalog” and “fulfillment” where authored.
```

Clean Deck (p.5, exact global instruction):

```text
“Coordinate”, “coordinated” and “coordination” appear on almost every page. Replace with the actual verb: build, write, design, run, file, prepare, test, launch.
Standardise spelling to British English. Your service pages already use it (optimisation, catalogue, fulfilment, programme). Your blog posts use American forms (specialized, catalog, fulfill[ment]). Fix the blog.
```

No broad terminology rewrite is authorised.

#### GLOBAL-05 - Decision: REJECTED

Current (exact protected behavior):

```text
Existing hero, product-pack, portrait, logo, supporter, and article artwork is loaded from the current source/media families. Rejected image proposals retain existing sources, dimensions, and alt behavior.
```

Clean Deck (exact image proposals already keyed in this matrix):

```text
Home hero alt: Dashapatmaja Solutions team reviewing brand and packaging work at the Manipal studio
Raw Radicles product alts: Holy Sin milk chocolate bar with Chyawanprash by Raw Radicles, 60 g pack; Wrath Relief milk chocolate bar with Ashwagandha by Raw Radicles, 60 g pack; Smart Sin milk chocolate bar with Brahmi by Raw Radicles, 60 g pack
About journey alts: Early-stage consumer brand planning materials at the GoK Bioincubator in Manipal; Cacao, chocolate and Ayurvedic botanicals arranged for Raw Radicles product development; Research desk with a Raw Radicles prototype pack and measured Ayurvedic ingredients; Brand and e-commerce studio in Manipal with packaging, photography and dispatch materials
```

The scan rejects/crosses out these image changes. No media or artwork mutation is
authorised.

## Protected media registry

The following media is protected across all source phases. A source worker must
not edit, regenerate, rename, recrop, re-encode, or change image/alt behavior
unless a future approved task names the exact asset.

| Registry ID | Protected assets / source owner |
| --- | --- |
| PM-HOME | `src/assets/home-rotation-03-960.webp`, `src/assets/home-rotation-03-1440.webp`, `src/assets/home-rotation-03-mobile.webp`, supporter logos imported by `src/pages/Home.jsx`, and `src/assets/raw-radicles-logo-cropped.webp` used by the Home proof block |
| PM-ABOUT | About hero families, team portraits, journey images, logos, and texture imported by `src/pages/About.jsx`: `about-team-*`, `about-journey-v2-*`, `manu_pro_fixed.webp`, `sree_pro_extended.webp`, `dr_pro.webp`, `Anusha-mam_pro.webp`, `ceo_pro.webp`, `icon_orange.webp`, `raw-radicles-logo-official.webp`, `supporter-nidhi-prayas-marquee.png`, and `linen_concrete_texture.webp` |
| PM-BRANDS | Brands hero/portfolio families and Raw Radicles logo imported by `src/pages/Brands.jsx`: `brands-portfolio-*` and `raw-radicles-logo-cropped.webp` |
| PM-RAW | Raw Radicles hero and product-pack assets imported by `src/pages/RawRadicles.jsx`: `raw-radicles-hero-1600.webp`, `raw-radicles-hero-960.webp`, `raw-radicles-wrath-relief.webp`, `raw-radicles-holy-sin.webp`, and `raw-radicles-smart-sin.webp` |
| PM-BRANDING | Branding hero families imported by `src/pages/Branding.jsx`: `branding-workshop-*` |
| PM-MARKETING | Marketing hero/dashboard families imported by `src/pages/Marketing.jsx`: `marketing-primary-*` and `marketing-dashboard-*` |
| PM-ECOMMERCE | E-commerce hero family imported by `src/pages/Ecommerce.jsx`: `ecommerce-primary-*` |
| PM-CONTACT | Contact hero family imported by `src/pages/Contact.jsx`: `contact-hero-*` |
| PM-INSIGHTS | Current Insights publication artwork and generated publication boundary, including `public/insights/*`, `src/generated/blogManifest.json`, and both current generated article snapshots |

## Global protected contracts

- Keep the two current compliance article slugs and publication set. Do not
  restore the obsolete clean-deck article proposals.
- Keep Sanity dormant: do not upload, mutate, or configure remote Sanity content;
  preserve the CMS -> normalization/sync -> generated publication -> React
  boundary and fallback build contract.
- Generated content under `src/generated/` is protected. The matrix does not
  authorise `sync:fallback`, generated rewrites, or hand-editing generated JSON.
- Do not modify `ServicePage.jsx` for Phase 9 unless the current interface makes
  an approved service-page slot impossible. If that occurs, stop and report the
  required interface change before editing it.
- Do not modify `companyFacts.js` for Contact copy work; it remains the
  authoritative source for address and contact details.
- No commit, push, merge, deploy, branch change, production mutation, or
  external PDF mutation is authorised by this matrix.
