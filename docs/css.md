---
layout: doc
title: CSS Standards & Best Practices
description: Vite build system, BEM methodology, CSS variables, responsive design, units, media queries breakpoints, hover states, best practices, clamp generator, CSS testing, and production standards.
outline: deep
---

# CSS Standards & Best Practices

<div class="badge">CSS</div>

Vite build system, BEM methodology, CSS variables, responsive design, units, media queries breakpoints, hover states, best practices, clamp generator, CSS testing, and production standards.

## Vite Build System

We use a custom Vite-based build system for all JavaScript, TypeScript, and CSS projects. This build system provides lightning-fast development experience with Hot Module Replacement (HMR), optimized production builds, and professional tooling out of the box.

### General Benefits:

- Fast development with instant HMR feedback
- SCSS compilation with PostCSS optimization
- Production-ready builds with minification and optimization
- ESLint and Prettier configured for code quality

### CSS-Specific Features:

- SCSS preprocessing with nested selectors, variables, mixins, and functions
- PostCSS with autoprefixer for cross-browser compatibility
- CSS minification and optimization in production builds
- Automatic vendor prefixing for modern CSS features
- CSS source maps for easier debugging during development
- **Ready helpers:** Pre-built mixins, functions, and media queries that speed up development significantly

**Resources:**
- [View on GitHub](https://github.com/dmitry-conquer/zen-starter) - [Download](https://github.com/dmitry-conquer/zen-starter/archive/refs/heads/main.zip)

## BEM Methodology

BEM (Block Element Modifier) is the industry-standard CSS naming methodology. It eliminates specificity wars, prevents style conflicts, and makes CSS maintainable and predictable. All BEM selectors have the same specificity (0,1,0) - one class.

### Why BEM is necessary:

- Eliminates specificity wars - all selectors have the same weight (0,1,0)
- Prevents style conflicts in large projects
- Self-documenting code - class names describe structure
- Easy to find and maintain styles

### BEM Structure:

- **Block:** Standalone component (e.g., `.button`, `.card`, `.menu`)
- **Element:** Part of a block, uses double underscore (e.g., `.card__title`, `.menu__item`)
- **Modifier:** Variation of a block or element, uses double hyphen (e.g., `.button--primary`, `.card--large`)

### BEM Best Practices:

- Never nest elements: Write `.card__title` not `.card .card__title`
- No element nesting: Don't create `.card__header__title` - use `.card__title`
- Keep specificity flat: All selectors must be (0,1,0) - one class
- Modifiers are standalone: In HTML use `class="button button--primary"`, in CSS style only `.button--primary`

### Example: Complete BEM Component

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

```css
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

### Why use CSS Variables:

- Centralized value management - change colors, spacing, or other values in one place
- Dynamic theming - easily switch between light/dark themes or brand variations
- Runtime updates - change values with JavaScript without recompiling CSS
- Cascading inheritance - variables can be scoped to specific components or globally
- Better maintainability - update design tokens in one location

### Best Practices:

- Define variables in `:root` for global scope, or in component selectors for local scope
- Use descriptive names with prefixes (e.g., `--color-primary`, `--spacing-md`)
- Provide fallback values when using variables: `color: var(--text-primary, #000)`
- Group related variables together (colors, spacing, typography, etc.)
- Use variables for design tokens: colors, spacing, font sizes, shadows, transitions

### Example: Global CSS Variables

```css
/* Define variables in :root for global access */
:root {
  /* Colors */
  --color-primary: #3ecf8e;
  --color-primary-dark: #2fa870;
  --color-secondary: #6366f1;
  --color-text: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-bg: #ffffff;
  --color-bg-secondary: #f9fafb;
  --color-border: #e5e7eb;
  
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
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border-radius: 0.25rem;
  box-shadow: var(--shadow-sm);
  transition: background var(--transition-base);
}

.button:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-md);
}
```

### Example: Scoped Variables & Theming

```css
/* Component-scoped variables */
.card {
  --card-bg: var(--color-bg);
  --card-border: var(--color-border);
  --card-padding: var(--spacing-lg);
  
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: var(--card-padding);
  border-radius: 0.5rem;
}

/* Override variables for modifiers */
.card--highlighted {
  --card-bg: var(--color-primary);
  --card-border: var(--color-primary-dark);
  color: white;
}

/* Dark theme using data attribute */
[data-theme="dark"] {
  --color-text: #ffffff;
  --color-text-secondary: #9ca3af;
  --color-bg: #1a1a1a;
  --color-bg-secondary: #2d2d2d;
  --color-border: #374151;
}

/* Use with fallback */
.text {
  color: var(--color-text, #000000); /* Fallback if variable is undefined */
}
```

## Units & Responsive Design

Use rem/em for typography and spacing.

**Why use rem and em?** rem units are relative to the root element's font-size, making them predictable and easy to scale. em units are relative to the parent element's font-size, useful for component-level scaling. Both provide better accessibility as they respect user's browser font-size preferences.

### Example: HTML and Body Setup

```css
/* Set base font-size on html for rem to work correctly */
html {
  font-size: 100%; /* Respects user's browser font-size preference (usually 16px) */
}

body {
  font-size: 1rem; /* Inherits from html, respects user preferences */
  line-height: 1.5;
}
```

### Example: Responsive Typography

```css
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

### Example: max-width

```css
@media (max-width: 1399.98px) { }
@media (max-width: 1199.98px) { }
@media (max-width: 991.98px) { }
@media (max-width: 767.98px) { }
@media (max-width: 575.98px) { }
```

### Example: min-width

```css
@media (min-width: 1400px) { }
@media (min-width: 1200px) { }
@media (min-width: 992px) { }
@media (min-width: 768px) { }
@media (min-width: 576px) { }
```

**Why subtract .02px?** Browsers don't currently support range context queries, so we work around the limitations of min- and max- prefixes and viewports with fractional widths (which can occur under certain conditions on high-dpi devices, for instance) by using values with higher precision.

## Hover States

Touch devices (smartphones, tablets) don't have a hover state. When users tap an element, it's treated as a click, not a hover. This means hover effects can create poor user experience on touch devices, as they may trigger unintentionally or not work at all.

Always wrap hover styles in a media query that checks for devices with hover capability to ensure hover effects only apply on devices that support them.

### Example: Safe Hover Implementation

```css
.button {
  background: var(--color-primary);
  color: white;
  transition: background 0.2s ease;
  
  /* Only apply hover on devices that support it */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background: var(--color-primary-dark);
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

- Never use inline styles (except dynamic values)
- Avoid !important (use specificity instead)
- Group related properties together
- Use relative units rem/em for spacing and typography
- Use only the breakpoints specified above
- Optimize and minify CSS: all breakpoints should be in the correct order and not chaotic
- CSS vendor prefixes are used and are generated accordingly with your browser support compatibility
- Avoid @import in CSS: The @import rule in CSS creates additional HTTP requests and is render-blocking. Instead of @import, use `<link rel="stylesheet">` tags in HTML (which can load in parallel) or better yet, combine CSS files at build time when possible
- Minimize nesting (max 3 levels)

### Example: Inline Styles - Forbidden

```html
<!-- Bad: Never use inline styles with !important -->
<h1 style="color: #626262 !important;">Title</h1>
<div style="padding: 20px; margin: 10px;">Content</div>
<p style="font-size: 16px; line-height: 1.5;">Text</p>

<!-- Good: Use CSS classes instead -->
<h1 class="page-title">Title</h1>
<div class="content-wrapper">Content</div>
<p class="text-body">Text</p>
```

```css
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

### Example: Correct Breakpoint Order (max-width)

```css
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

### Example: Well-Organized CSS

```css
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

## Clamp Generator

Generate fluid typography and spacing using CSS clamp() function. This tool calculates clamp values based on minimum and maximum viewport widths and sizes.

**Formula:** `clamp(min-size, preferred-size, max-size)`

The preferred size is calculated using the formula:
```
preferred-size = min-size + (max-size - min-size) * ((100vw - min-viewport) / (max-viewport - min-viewport))
```

**Online Tools:**
- [Utopia Clamp Calculator](https://utopia.fyi/type/calculator)
- [Modern CSS Clamp Generator](https://clamp.font-size.app/)

## CSS Testing

CSS testing ensures your stylesheets are error-free, responsive, and compatible across all browsers and devices. Always test your CSS before deploying to production.

### Testing Checklist:

- CSS or SCSS files are without any errors
- All pages were tested at the following breakpoints: 1399.98px, 1199.98px, 991.98px, 767.98px, 575.98px
- All pages were tested on all current desktop browsers (Safari, Firefox, Chrome, Edge)
- Testing on Pixel Perfect, to prevent large differences from the design

### W3C CSS Validator:

The official W3C validator checks CSS for errors and warnings. Enter a URL or upload a CSS file below to validate your stylesheet.

**W3C CSS Validator:** [jigsaw.w3.org/css-validator](https://jigsaw.w3.org/css-validator/)

## Production

All CSS files deployed to production must be optimized for performance and browser compatibility. This includes minification, vendor prefixes, and proper build configuration.

- **Minification:** All CSS must be minified to reduce file size and improve load times
- **Autoprefixer:** Vendor prefixes must be automatically generated using Autoprefixer based on your browser support requirements
- **Unused CSS Removal:** Remove unused CSS rules to reduce file size (PurgeCSS or similar tools)
- **CSS Optimization:** Optimize CSS by merging duplicate rules, removing empty rules, and optimizing selectors
- **Combine & Sort:** All CSS files must be combined into a single file and sorted by media queries (base styles first, then media queries in order: X-Large, Large, Medium, Small, X-Small) to improve caching, reduce HTTP requests, and ensure consistent rendering

### Example: Combined & Sorted by Media Queries

```css
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

