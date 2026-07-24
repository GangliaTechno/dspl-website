---
name: Dasha Patmaja Growth House
description: Institutional Brand Building & Incubation Design System
colors:
  primary: "#F5A800"
  primary-light: "#FFC107"
  accent-red: "#C0392B"
  neutral-bg: "#F5F3EE"
  neutral-surface: "#FFF8E7"
  neutral-tertiary: "#F5EFEB"
  neutral-card: "#FFFFFF"
  neutral-text: "#1A1A1A"
  neutral-heading: "#111111"
  neutral-muted: "#555555"
typography:
  display:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "'Outfit', sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#111111"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-secondary:
    backgroundColor: "{colors.neutral-tertiary}"
    textColor: "{colors.neutral-heading}"
    rounded: "{rounded.sm}"
    padding: "12px 28px"
---

# Design System: Dasha Patmaja Growth House

## 1. Overview

**Creative North Star: "The Institutional Warmth House"**

The DSPL design system reflects institutional credibility, editorial warmth, and high-performance growth energy. Designed for D2C brand founders, investors, and incubator partners (MUTBI & DST-NIDHI), the interface avoids cold corporate blues and generic SaaS defaults in favor of rich warm off-whites (`#F5F3EE`), cream surface layers (`#FFF8E7`), and hero gold accents (`#F5A800`).

**Key Characteristics:**
- **Warm Prestige:** Sophisticated off-white canvas with restrained gold highlight accents.
- **Institutional Weight:** Sharp, precise component boundaries (`4px` button radius) paired with modern bold typography (`Outfit`).
- **Structured Cadence:** Clear multi-step execution flows ("01. Discovery -> 06. Growth") without repetitive eyebrow clutter.

## 2. Colors

The color palette pairs rich warm neutrals with hero gold highlights to convey prestige, authority, and growth momentum.

### Primary
- **Hero Gold** (`#F5A800` / `oklch(76% 0.17 82)`): Reserved for primary conversion actions, active badges, and focus rings. Never over-saturated; used on ≤10% of any page surface.
- **Bright Gold Highlight** (`#FFC107`): Hover state for primary interactive elements.

### Secondary
- **Minimal Red Accent** (`#C0392B`): Reserved for critical alert states and secondary callout badges.

### Neutral
- **Warm Off-White Page Canvas** (`#F5F3EE`): The foundational body background.
- **Cream Tint Surface** (`#FFF8E7`): Interactive hover layers and featured section cards.
- **Rich Black Heading** (`#111111`): High-contrast title and headline copy (>= 4.5:1 contrast).
- **Rich Black Body Copy** (`#1A1A1A`): Readable prose and content copy.
- **Slate Secondary** (`#555555`): Supporting details, timestamps, and secondary captions.

### Named Rules
**The Rarity of Gold Rule.** Hero Gold (`#F5A800`) is used deliberately on primary CTAs and active focus elements. Its rarity ensures high conversion focus without visual noise.

## 3. Typography

**Display Font:** `Outfit` (sans-serif)  
**Body Font:** `Outfit` (sans-serif)

**Character:** Clean, confident grotesque sans-serif with geometric precision and open counters. Tight display tracking (`-0.03em`) creates authority without cramped lettering.

### Hierarchy
- **Display** (Bold 700, `clamp(2.5rem, 5vw, 4rem)`, `line-height: 1.15`, `letter-spacing: -0.03em`): Hero headlines and major section entrances.
- **Headline** (Bold 700, `2.25rem`, `line-height: 1.2`, `letter-spacing: -0.02em`): Section headings and modal titles.
- **Title** (SemiBold 600, `1.25rem`, `line-height: 1.3`): Card headers and service category titles.
- **Body** (Regular 400, `1rem`, `line-height: 1.625`, max line length 65–75ch): Content copy and process descriptions.
- **Label** (SemiBold 600, `0.875rem`, `letter-spacing: 0.05em`): Navigation links, button copy, and status badges.

### Named Rules
**The Line Length Rule.** Body paragraphs are capped at 65–75ch to preserve optimal reading comfort across responsive viewports.

## 4. Elevation

The system relies primarily on clean surface boundary definition and subtle tonal layering rather than aggressive heavy drop shadows.

### Shadow Vocabulary
- **Subtle Surface Elevation** (`box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02)`): Used on elevated dialogs and hover cards.
- **CTA Glow** (`box-shadow: 0 4px 14px 0 rgba(245, 168, 0, 0.15)`): Used on primary gold button elements.

### Named Rules
**The Tonal Layering Rule.** Depth is created through warm background shifts (`#F5F3EE` to `#FFF8E7` and `#FFFFFF`) and 1px soft borders (`rgba(26,26,26,0.08)`), keeping drop shadows light and ambient.

## 5. Components

### Buttons
- **Shape:** Sharp corporate corners (`4px` radius).
- **Primary:** Hero Gold background (`#F5A800`), rich black copy (`#111111`), `12px 28px` padding.
- **Hover / Focus:** Gold highlight (`#FFC107`) with `-2px` Y-transform and gold focus ring (`outline: 3px solid #F5A800`).
- **Secondary:** Warm beige background (`#F5EFEB`), dark copy (`#111111`), 1px soft border.

### Cards / Containers
- **Corner Style:** `8px` or `12px` rounded corners.
- **Background:** White (`#FFFFFF`) or Cream (`#FFF8E7`).
- **Border:** `1px solid rgba(26, 26, 26, 0.08)`.
- **Internal Padding:** `1.5rem` to `2.5rem`.

### Inputs / Fields
- **Style:** `8px` radius, subtle background, `1px` soft border.
- **Focus:** Hero Gold border highlight with `0 0 0 4px rgba(245, 168, 0, 0.04)` glow ring.

### Navigation
- **Header Shell:** Sticky frosted glass header (`backdrop-filter: blur(12px)`), logo, clean page navigation links, and "Work With Us" primary CTA button.

## 6. Do's and Don'ts

### Do:
- **Do** maintain body text contrast at >= 4.5:1 against warm neutral backgrounds.
- **Do** use `Outfit` font with balanced letter spacing (`-0.03em` for display, `normal` for body).
- **Do** respect user motion preferences via `@media (prefers-reduced-motion: reduce)`.
- **Do** keep button border-radius at sharp `4px` for institutional authority.

### Don't:
- **Don't** use generic 2023-era SaaS template eyebrows or repetitive numbered section headers unless representing actual sequential steps.
- **Don't** use over-rounded `32px+` card containers or heavy dark drop shadows.
- **Don't** apply decorative gradient text or sketchy SVG path filters.
- **Don't** pair 1px solid borders with 16px+ heavy drop shadows on the same card element.
