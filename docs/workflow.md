---
layout: doc
title: Workflow
description: "Workflow standards for planning, implementation, QA, and release. Defines Dev ↔ SEO and Dev ↔ Design collaboration, governance for functional changes, and QA expectations."
outline: deep
---

<div class="badge">Workflow</div>

# Workflow

Workflow standards for planning, implementation, QA, and release. Use this page as a checklist for how we collaborate.

## Roles, responsibilities and permissions (Dev)

- **Development**: implementation, architecture decisions, performance, security, code quality
- **Responsibility rule**: for each global change, the developer who made the change is responsible for it (implementation, side effects, and rollback if needed).
- **Functional changes:** only the development department is allowed to change site functionality (see [Governance: plugins and functional changes](#governance-plugins-and-functional-changes)).

## Dev and Design collaboration

### Handoff requirements

- Layouts for key views: **Desktop + Mobile**
- Mobile designs are not always required:
  - If there are mobile-specific requirements, the designer provides mobile designs.
  - If mobile designs were not provided but the developer needs them for specific sections, the developer requests mobile designs for those sections.
  - If there are no mobile-specific requirements, the developer implements the mobile layout using the design system and best practices.
- Component list (what exists on the page) + states: hover/focus/active/disabled/error/loading
- Content rules: truncation, empty states, long titles, missing images
- Tokens: typography, spacing, colors (consistent naming)
- Motion & dynamic behavior: all animations/scroll behavior/dynamic elements must be presented in the intended final form. If a motion idea is not feasible or will harm performance/accessibility, the developer must flag it early.

### Change requests (after implementation started)

- Any design change after development start must be a documented change request:
  - what changes
  - why (goal)
  - impact (time/risk)
  - deadline / priority

### Small design tweaks on existing components

If a component already exists in the theme and design requests small tweaks (e.g., font size ±1–2px, padding/margins ±10–20px), treat it as a component change, not a page-only change.

- **Impact:** since component styles are shared, changes can affect existing pages.
- **Default approach:** avoid “one-off” hacks. Prefer one of the options below.

**Options:**

- **Keep the existing component** (ignore minor tweaks):
  - Use when speed is more important than pixel precision (e.g., SEO-only landing pages).
- **Add a modifier variation** (preferred for controlled differences):
  - Example: `hero hero--big-image` / `card card--compact`
  - Pros: keeps shared base, isolates changes
  - Cons: adds CSS complexity and increases styles size
- **Create a new component/section** (when behavior/layout is truly different):
  - Pros: clean separation
  - Cons: more code, longer development time, more styles/assets

**Decision rules:**

- If the change is truly minor and global consistency matters → update the shared component.
- If the change must not affect existing pages → use a modifier or new component.
- If the page is SEO-only and delivery speed is higher priority → minor visual changes can be ignored.
- If the change is important and materially affects UI/UX → the designer makes the final call, but the dev must confirm impact on scope/time.

## Dev and SEO collaboration

### Governance: plugins and functional changes

- **Rule:** any plugin action and functional change is allowed only after approval by the Web/Development department:
  - install / activate / deactivate / remove plugins
  - add/modify/remove custom functionality
  - inject code (header/footer snippets, pixels, tracking, custom scripts)
- **Approval requires:**
  - purpose / requirement
  - risks (security/performance/compatibility)
  - rollback plan
  - owner (who maintains it)
- **Policy alignment:** must comply with [WordPress → Plugins Policy](/wordpress#plugins-policy)

### SEO inputs for new pages

- For creating new pages, the SEO team provides:
  - full text content (copy)
  - heading structure (H1/H2/H3)
  - meta title + meta description
  - preferred URL (slug)
  - page placement (where the page lives in site structure: parent page / category / menu section)

## Implementation

- Markup follows [HTML standards](/html) (semantic structure, headings, links/buttons, ARIA, images output rules)
- Styles follow [CSS standards](/css) (BEM, tokens, breakpoints, hover rules, optimization, rem/em units)
- JS follows [JavaScript standards](/javascript) (data-* hooks, init/cleanup, accessibility rules, no jQuery for new code)
- WordPress/ACF integration follows [WordPress standards](/wordpress) (code organization, correct asset enqueuing, escaping, nonces, template structure)
- Implementation must satisfy [SEO standards](/seo) (indexing/crawlability rules, headings/metadata requirements, correct 404/redirect behavior)
- After development, the developer must run the QA section below before handing off.

## QA

- Responsive: 1920 / 1400 / 1200 / 992 / 768 / 576 / 375
- Browsers: Chrome / Firefox / Safari / Edge (current versions)
- Console: no unexpected errors in production build
- Markup: heading hierarchy is correct (one H1, no skipped levels)
- Images:
  - `alt` is correct (decorative `alt=""`)
  - image file size is ≤ 200KB (target)
  - image renders correctly on the page
- Forms (if present): validation + email delivery (SMTP/reCAPTCHA when used)
- 404/redirects: correct status codes and targeted redirects
- SEO basics:
  - page titles/meta descriptions match SEO input
  - OG preview is correct when applicable
- Performance: run Google PageSpeed. Document issues and fix or explicitly accept with rationale.

## Change management

Any theme change must be documented.

### changelog.md

The theme must have a `changelog.md`. If it doesn’t exist, create it after the first change.

**Statuses:** Added, Updated, Removed

```md
## 2026-01-04

- Added: `inc/Assets.php` – enqueue `reset.css` and update cache busting strategy
- Updated: `template-parts/flexible/hero.php` – add `hero--big-image` modifier support
- Removed: `assets/js/legacy.js` – obsolete script removed from theme
```


