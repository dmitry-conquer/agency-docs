---
layout: doc
title: Standards & Best Practices
description: "CSS standards for our projects: SCSS structure and file organization, naming conventions, design tokens, responsive rules (breakpoints, hover on touch), fluid sizing with clamp(), validation/testing, and production requirements. Use this page as a checklist and a reference when building or reviewing styles."
outline: deep
---

<div class="badge">CSS</div>

# Standards & Best Practices

This page documents our CSS standards and SCSS conventions used across projects. It covers how we structure styles, name and scope components, manage tokens with CSS variables, handle responsiveness, and write predictable hover/focus behavior. It also includes guidance for fluid sizing with `clamp()`, testing/validation, and production readiness so styles remain consistent from development to release.

## CSS Reset

A CSS reset normalizes browser defaults so your layout and typography start from a predictable baseline.

- **Why we use it:** consistent spacing/typography across browsers, fewer “random” default styles, faster start for new projects.
- **Where it goes:** loaded/imported first, before any project styles.

Recommended reset: [`reset.css` (download)](/reset.css){download}

## BEM Methodology

BEM (Block Element Modifier) is the industry-standard CSS naming methodology. It eliminates specificity wars, prevents style conflicts, and makes CSS maintainable and predictable. All BEM selectors have the same specificity (0,1,0) - one class.

**Using BEM is mandatory** in our projects because it keeps specificity flat and predictable, which prevents styling conflicts and makes components easier to maintain and scale across the codebase.

**BEM documentation:** [en.bem.info/methodology](https://en.bem.info/methodology/)

### Why BEM is necessary

- Eliminates specificity wars - all selectors have the same weight (0,1,0)
- Prevents style conflicts in large projects
- Self-documenting code - class names describe structure
- Easy to find and maintain styles

### BEM structure

- **Block:** Standalone component (e.g., `.button`, `.card`, `.menu`)
- **Element:** Part of a block, uses double underscore (e.g., `.card__title`, `.menu__item`)
- **Modifier:** Variation of a block or element, uses double hyphen (e.g., `.button--primary`, `.card--large`)

### BEM best practices

- Never nest elements: Write `.card__title` not `.card .card__title`
- No element nesting: Don't create `.card__header__title` - use `.card__title`
- Keep specificity flat: All selectors must be (0,1,0) - one class
- Modifiers are standalone: In HTML use `class="button button--primary"`, in CSS style only `.button--primary`
- Element modifiers are allowed: `card__title--highlighted`, `card__button--primary`, etc.
- Nesting is allowed only when it preserves BEM: pseudo-classes/pseudo-elements and media queries are OK; avoid nested descendant selectors that recreate `.block .block__element`

### Complete BEM component

```html
<!-- HTML: Block with elements and modifiers -->
<div class="card card--large">
  <div class="card__header">
    <h2 class="card__title card__title--highlighted">Card Title</h2>
  </div>
  <div class="card__body">
    <p class="card__text">Card content...</p>
  </div>
  <div class="card__footer">
    <button class="card__button card__button--primary">Action</button>
  </div>
</div>
```

```scss
/* CSS: Block */
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1.5rem;
}

/* CSS: Elements (flat, no nesting) */
.card__header {
  margin-bottom: 1rem;
}

.card__title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
}

.card__body {
  color: var(--text-secondary);
  line-height: 1.6;
}

.card__footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.card__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

/* CSS: Modifiers (standalone classes) */
.card--large {
  padding: 2rem;
}

.card__title--highlighted {
  color: var(--primary);
}

.card__button--primary {
  background: var(--primary);
  color: white;
}
```

## CSS Variables

CSS Custom Properties (CSS Variables) allow you to store values that can be reused throughout your stylesheet. They enable dynamic theming, easier maintenance, and runtime value changes via JavaScript.

### Why use CSS variables

- Centralized value management - change colors, spacing, or other values in one place
- Dynamic theming - easily switch between light/dark themes or brand variations
- Runtime updates - change values with JavaScript without recompiling CSS
- Cascading inheritance - variables can be scoped to specific components or globally
- Better maintainability - update design tokens in one location

### Best practices

- Define variables in `:root` for global scope, or in component selectors for local scope
- Use consistent, descriptive names (e.g., `--primary`, `--spacing-md`, `--font-size-base`)
- Provide fallback values when using variables (optional): `color: var(--text, #000)`
- Group related variables together (colors, spacing, typography, etc.)
- Use variables for design tokens: colors, spacing, font sizes, shadows, transitions

### Global CSS variables

```scss
/* Define variables in :root for global access */
:root {
  /* Colors */
  --primary: #3ecf8e;
  --primary-dark: #2fa870;
  --secondary: #6366f1;
  --text: #1a1a1a;
  --text-secondary: #6b7280;
  --bg: #ffffff;
  --bg-secondary: #f9fafb;
  --border: #e5e7eb;
  
  /* Spacing */
  --spacing-xs: 0.25rem;  /* 4px */
  --spacing-sm: 0.5rem;   /* 8px */
  --spacing-md: 1rem;     /* 16px */
  --spacing-lg: 1.5rem;   /* 24px */
  --spacing-xl: 2rem;     /* 32px */
  
  /* Typography */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.2s ease;
  --transition-slow: 0.3s ease;
}

/* Use variables throughout your CSS */
.button {
  background: var(--primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: 0.25rem;
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-base);
}

.button:hover {
  background: var(--primary-dark);
  box-shadow: var(--shadow-md);
}
```

### Scoped variables & theming

```scss
/* Component-scoped variables */
.card {
  --card-bg: var(--bg);
  --card-border: var(--border);
  --card-padding: var(--spacing-lg);
  
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: var(--card-padding);
  border-radius: 0.5rem;
}

/* Override variables for modifiers */
.card--highlighted {
  --card-bg: var(--primary);
  --card-border: var(--primary-dark);
  color: white;
}

/* Dark theme using data attribute */
[data-theme="dark"] {
  --text: #ffffff;
  --text-secondary: #9ca3af;
  --bg: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --border: #374151;
}

/* Use with fallback */
.text {
  color: var(--text, #000000); /* Fallback if variable is undefined */
}
```

## Units & Responsive Design

Use rem/em for typography and spacing.

**Why use rem and em?**

- **rem**: predictable scaling from root font-size (good for typography and spacing)
- **em**: scales relative to component font-size (useful for component-level sizing)

### HTML and body setup

```scss
/* Set base font-size on html for rem to work correctly */
html {
  font-size: 100%; /* Respects user's browser font-size preference (usually 16px) */
}

body {
  font-size: 1rem; /* Inherits from html, respects user preferences */
  line-height: 1.5;
}
```

### Responsive typography

```scss
.card {
  padding: 1.5rem; /* 24px */
  margin-bottom: 2rem; /* 32px */
  font-size: 1rem; /* 16px */
  line-height: 1.6;
}

.card__title {
  font-size: 1.5rem; /* 24px */
  margin-bottom: 1rem; /* 16px */
  
  @media (max-width: 991.98px) {
    font-size: 1.25rem; /* 20px */
  }
  
  @media (max-width: 767.98px) {
    font-size: 1.125rem; /* 18px */
  }
}

/* Use rem for spacing, em for relative sizing */
.button {
  padding: 0.75em 1.5em; /* Relative to font-size */
  font-size: 1rem; /* Base size */
}
```

## Media Queries Breakpoints

Use the unified breakpoint system for consistent responsive design across all projects.

### Recommended Media Query Breakpoints

```scss
// X-Large devices (large desktops, less than 1400px)
$x-large: 1399.98px;

// Large devices (desktops, less than 1200px)
$large: 1199.98px;

// Medium devices (tablets, less than 992px)
$medium: 991.98px;

// Small devices (landscape phones, less than 768px)
$small: 767.98px;

// X-Small devices (portrait phones, less than 576px)
$x-small: 575.98px;
```

### Max-width queries

```scss
@media (max-width: 1399.98px) { }
@media (max-width: 1199.98px) { }
@media (max-width: 991.98px) { }
@media (max-width: 767.98px) { }
@media (max-width: 575.98px) { }
```

### Min-width queries

```scss
@media (min-width: 1400px) { }
@media (min-width: 1200px) { }
@media (min-width: 992px) { }
@media (min-width: 768px) { }
@media (min-width: 576px) { }
```

**Why subtract .02px?** To avoid edge cases with fractional viewport widths and min/max overlaps on some devices. Higher-precision values reduce “off-by-one” breakpoint glitches.

## Hover States

Touch devices (smartphones, tablets) don't have a hover state. When users tap an element, it's treated as a click, not a hover. This means hover effects can create poor user experience on touch devices, as they may trigger unintentionally or not work at all.

Always wrap hover styles in a media query that checks for devices with hover capability to ensure hover effects only apply on devices that support them.

### Safe hover implementation

```scss
.button {
  background: var(--primary);
  color: white;
  transition: background 0.2s ease;
  
  /* Only apply hover on devices that support it */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--primary-dark);
    }
  }
}
```

**Why this approach?**

- `hover: hover` checks if the device supports hover (desktop mice, trackpads)
- `pointer: fine` ensures the device has precise pointing (mouse, stylus), not touch
- Combined, they ensure hover effects only work on devices where they make sense
- Prevents accidental hover triggers on touch devices and improves accessibility

**Where to use:**

- Interactive elements: buttons, links, cards with hover effects
- Navigation menus with dropdowns or hover states
- Image galleries with hover overlays or effects
- Tooltips that appear on hover
- Any element where hover provides additional visual feedback or information

## CSS Best Practices

- Never use inline styles (except dynamic values via CSS variables; WordPress exception: inline `background-image` is OK when it comes from WP fields)
- Avoid !important (use proper architecture and specificity)
- Group related properties together
- Use relative units rem/em for spacing and typography
- Use only the breakpoints specified above
- Minify CSS in production
- Keep breakpoint rules ordered (don’t mix them chaotically)
- Use Autoprefixer, don’t hand-write vendor prefixes
- Avoid @import in CSS: The @import rule in CSS creates additional HTTP requests and is render-blocking. Instead of @import, use `<link rel="stylesheet">` tags in HTML (which can load in parallel) or better yet, combine CSS files at build time when possible
- Minimize nesting (max 3 levels)

### Inline styles (forbidden)

```html
<!-- Bad: Never use inline styles with !important -->
<h1 style="color: #626262 !important;">Title</h1>
<div style="padding: 20px; margin: 10px;">Content</div>
<p style="font-size: 16px; line-height: 1.5;">Text</p>

<!-- Good: Use CSS classes instead -->
<h1 class="page-title">Title</h1>
<div class="content-wrapper">Content</div>
<p class="text-body">Text</p>

<!-- Allowed exception: dynamic values via CSS variables only -->
<div class="progress" style="--progress: 72%">
  Progress
</div>
```

```scss
/* CSS */
.page-title {
  color: #626262;
}

.content-wrapper {
  padding: 1.25rem;
  margin: 0.625rem;
}

.text-body {
  font-size: 1rem;
  line-height: 1.5;
}
```

### Breakpoint order (max-width)

```scss
/* Good: Breakpoints in descending order */
.card {
  padding: 2rem;
  
  @media (max-width: 1399.98px) {
    padding: 1.75rem;
  }
  
  @media (max-width: 1199.98px) {
    padding: 1.5rem;
  }
  
  @media (max-width: 991.98px) {
    padding: 1.25rem;
  }
  
  @media (max-width: 767.98px) {
    padding: 1rem;
  }
  
  @media (max-width: 575.98px) {
    padding: 0.75rem;
  }
}

/* Bad: Chaotic breakpoint order */
.card {
  padding: 2rem;
  
  @media (max-width: 767.98px) {
    padding: 1rem;
  }
  
  @media (max-width: 1399.98px) {
    padding: 1.75rem;
  }
  
  @media (max-width: 575.98px) {
    padding: 0.75rem;
  }
}
```

### Well-organized CSS

```scss
/* Good: Organized, readable */
.card {
  /* Layout */
  display: flex;
  flex-direction: column;
  
  /* Spacing */
  padding: 1.5rem;
  margin-bottom: 2rem;
  
  /* Visual */
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  
  /* Typography */
  font-size: 1rem;
  line-height: 1.6;
  
  /* Transitions */
  transition: all 0.2s ease;
  
  &:hover {
    border-color: var(--border-light);
    box-shadow: var(--shadow-md);
  }
}

/* Bad: Disorganized, hard to read */
.card { display: flex; padding: 1.5rem; background: #fff; border: 1px solid #ccc; }
.card:hover { border-color: #999; }
```

## Fluid responsive values with clamp()

`clamp()` lets you create fluid typography and spacing that scales smoothly with the viewport.

- **Browser support:** ~96% global support, safe for production use.
- **Fewer media queries:** Often replaces multiple breakpoint rules with one line.
- **Smoother responsive behavior:** No “jumps” between breakpoints.
- **Faster development:** One formula, consistent results across the project.

**Formula:** `clamp(min-size, preferred-size, max-size)`

The preferred size is calculated using the formula:
```
preferred-size = min-size + (max-size - min-size) * ((100vw - min-viewport) / (max-viewport - min-viewport))
```

### SCSS helper function

```scss
@use "sass:math";

@function round-to($number, $decimals: 4) {
  $factor: math.pow(10, $decimals);
  @return math.div(math.round($number * $factor), $factor);
}

@function fluid($min, $max, $maxViewportWidth: 1440, $minViewportWidth: 375) {
  $maxSize: round-to(math.div($max, 16));
  $minSize: round-to(math.div($min, 16));
  $maxWidth: round-to(math.div($maxViewportWidth, 16));
  $minWidth: round-to(math.div($minViewportWidth, 16));

  $slope: round-to(math.div(($maxSize - $minSize), ($maxWidth - $minWidth)));
  $yAxisIntersection: round-to(-$minWidth * $slope + $minSize);

  @return clamp(
    #{$minSize * 1rem}, 
    #{$yAxisIntersection * 1rem} + #{$slope * 100vw}, 
    #{$maxSize * 1rem}
  );
}
```

### Usage

```scss
.hero__title {
  font-size: fluid(24, 48);
}

.section {
  padding-block: fluid(24, 64);
}
```

**Online Tools:**
- [Utopia Clamp Calculator](https://utopia.fyi/type/calculator)
- [Modern CSS Clamp Generator](https://clamp.font-size.app/)

## CSS Testing

CSS testing ensures your stylesheets are error-free, responsive, and compatible across all browsers and devices. Always test your CSS before deploying to production.

### Testing checklist

- No CSS/SCSS errors/warnings
- All pages were tested at the following breakpoints: 1400px, 1200px, 992px, 768px, 576px, 375px
- All pages were tested on all current desktop browsers (Safari, Firefox, Chrome, Edge)
- Compare against design (pixel-perfect). Use the **PerfectPixel by WellDoneCode** browser extension.

### W3C CSS Validator

The official W3C validator checks CSS for errors and warnings. Enter a URL or upload a CSS file below to validate your stylesheet.

**W3C CSS Validator:** [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)

## Production

All CSS files deployed to production must be optimized for performance and browser compatibility. This includes minification, vendor prefixes, and proper build configuration.

- **Minification:** All CSS must be minified to reduce file size and improve load times
- **Autoprefixer:** Vendor prefixes must be automatically generated using Autoprefixer based on your browser support requirements
- **CSS Optimization:** Optimize CSS by merging duplicate rules, removing empty rules, and optimizing selectors
- **Combine & Sort:** All CSS files must be combined into a single file and sorted by media queries (base styles first, then media queries in order: X-Large, Large, Medium, Small, X-Small) to improve caching, reduce HTTP requests, and ensure consistent rendering

### Combined & sorted by media queries

```scss
/* Base styles */
.button {
  padding: 0.5rem 1rem;
}

/* X-Large devices */
@media (max-width: 1399.98px) {
  .button {
    padding: 0.4rem 0.9rem;
  }
}

/* Large devices */
@media (max-width: 1199.98px) {
  .button {
    padding: 0.3rem 0.8rem;
  }
}
```

## Build system

See [Build System](/build-system) for the Vite-based setup, project defaults, and build requirements.

