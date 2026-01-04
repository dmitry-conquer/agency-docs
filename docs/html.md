---
layout: doc
title: Standards & Best Practices
description: "HTML standards used across our projects: semantic structure, predictable heading hierarchy, accessible links/buttons/navigation, ARIA rules for custom components, tables, images/SVG, video patterns, basic optimization, and validation. Use this page as a reference when creating markup or reviewing implementation quality."
outline: deep
---

<div class="badge">HTML</div>

# Standards & Best Practices

HTML standards for our projects. Focus: semantic markup, accessibility, and predictable structure. Use this page as a reference during development and code review.

## Semantic HTML

Use semantic HTML5 elements. They improve accessibility, SEO, and maintainability.

### Semantic HTML5 tags

- `<header>` - Site or section header, contains navigation and branding
- `<nav>` - Navigation links. Use `aria-label` only when needed (e.g., multiple navs on one page or no visible label)
- `<main>` - Main content area, only one per page
- `<article>` - Independent, self-contained content (blog post, news article)
- `<section>` - Thematic grouping of content, usually with a heading
- `<aside>` - Sidebar content, tangentially related to main content
- `<footer>` - Site or section footer, contains copyright, links, etc.
- `<address>` - Contact information for the author or owner
- `<time>` - Date/time, use `datetime` attribute for machine-readable format
- `<figure>` - Self-contained content (images, diagrams, code) with optional `<figcaption>`
- `<mark>` - Highlighted text for reference or emphasis
- `<blockquote>` - Extended quotation, cite with `cite` attribute
- `<cite>` - Title of a work (book, article, etc.)
- `<abbr>` - Abbreviation, use `title` attribute for full expansion
- `<details>` - Disclosure widget, use with `<summary>` for collapsible content
- `<summary>` - Summary or label for `<details>` element

### Complete page structure

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
    <meta name="description" content="Page description">
  </head>
  <body>
    <header>
      <nav aria-label="Main navigation">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>

    <main>
      <section>
        <h1>Page Title</h1>
        <p>Introduction content...</p>
      </section>

      <section>
        <h2>Main Content</h2>
        <p>Main content here...</p>
        
        <aside>
          <h3>Related Information</h3>
          <p>Additional context...</p>
        </aside>
      </section>

      <section>
        <h2>Additional Section</h2>
        <p>More content here...</p>
      </section>

      <aside>
        <h2>Sidebar</h2>
        <nav aria-label="Related links">
          <ul>
            <li><a href="/page-1">Related Page 1</a></li>
            <li><a href="/page-2">Related Page 2</a></li>
          </ul>
        </nav>
      </aside>
    </main>

    <footer>
      <nav aria-label="Footer navigation">
        <ul>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
        </ul>
      </nav>
      <p>2026 Company Name. All rights reserved.</p>
    </footer>
  </body>
</html>
```

## Document head

The `<head>` contains metadata and links to external resources. Treat it as a required baseline for SEO, performance, and sharing.

### Required elements

- **Meta:** Include `<meta charset="UTF-8">` first and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- **Title:** Each page must have a unique `<title>` (aim ~50–60 chars).
- **Description:** Include `<meta name="description">` (aim ~150–160 chars).
- **Social sharing:** Add Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter tags as needed.
- **Favicon:** Include `<link rel="icon">` (use multiple sizes when required).
- **Fonts:** If you can host fonts locally, you must do it locally (prefer WOFF2).
- **Performance:** Use `<link rel="preconnect">` only for external domains you actually use and `<link rel="preload">` for critical resources.
- **CSS:** Load styles via `<link rel="stylesheet">` in `<head>`. Don’t load stylesheets in `<body>`.

### Head template

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page title – Brand</title>
  <meta name="description" content="Page description for SEO and search results">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://example.com/page">
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Page description">
  <meta property="og:image" content="https://example.com/image.jpg">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Page Title">
  <meta name="twitter:description" content="Page description">
  <meta name="twitter:image" content="https://example.com/image.jpg">
  
  <!-- Favicon -->
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  
  <!-- Performance -->
  <link rel="preconnect" href="https://cdn.example.com">
  
  <!-- CSS -->
  <link rel="stylesheet" href="/styles/main.css">
</head>
```

## Headings

Proper heading structure is essential for accessibility, SEO, and content hierarchy.

### Heading structure

- **H1:** Use one H1 per page as the main heading of the page/content. Do not use the site name as H1 on every page.
- **Never skip heading levels:** Use sequential order: h1 → h2 → h3 (don’t jump from h1 to h3).

### Proper heading hierarchy

```html
<!-- Never skip heading levels -->
<!-- Bad: h1 → h3 (skipping h2) -->
<!-- Good: h1 → h2 → h3 -->

<main>
  <h1>Page Title</h1>
  
  <section>
    <h2>Section Heading</h2>
    <p>Content...</p>
    
    <h3>Subsection Heading</h3>
    <p>More content...</p>
  </section>
  
  <section>
    <h2>Another Section</h2>
    <p>Content...</p>
  </section>
</main>
```

## Links & Navigation

Use semantic HTML and correct attributes for links and navigation. This affects accessibility, SEO, and UX.

### Link best practices

- **Link text:** Use descriptive text (avoid “click here”, “read more” without context).
- **Navigation landmark:** Wrap menus in `<nav>`. Add `aria-label` only when needed (e.g., multiple navs on one page).
- **External links:** Use `rel="noopener noreferrer"` for `target="_blank"`. Use `target="_blank"` only when necessary.
- **Skip link:** Provide a skip link to main content on pages with heavy navigation. Ensure it becomes visible on `:focus`.
- **Breadcrumbs:** Use `<nav aria-label="Breadcrumb">` + `<ol>`. Mark current item with `aria-current="page"`.
- **States:** Ensure visible `:hover`, `:focus`, `:active`, and `:visited` states (focus is required for keyboard users).
- **Downloads:** Use `download` when the intent is downloading. Add file type/size when helpful.
- **Anchors:** Use readable IDs (`#section-name`, not `#section1`).

### Navigation patterns

```html
<!-- Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- Main content (skip link target) -->
<main id="main-content"></main>

<!-- Main navigation -->
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About Us</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Breadcrumbs -->
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Product Name</li>
  </ol>
</nav>

<!-- External link -->
<a 
  href="https://example.com" 
  target="_blank" 
  rel="noopener noreferrer"
>
  Visit website
</a>

<!-- Download link -->
<a href="/files/document.pdf" download>
  Download PDF (2.5 MB)
</a>
```

## Buttons vs Links

Use the correct element based on intent: navigation vs action.

### Usage guidelines

- **Use `<a>` for navigation:** Links should be used when the action navigates to a new page, section, or resource. Links have a URL (`href` attribute) and change the browser location or scroll to an anchor.
- **Use `<button>` for actions:** Buttons should be used for actions that perform a function on the current page (submit forms, open modals, toggle content, trigger JavaScript). Buttons don't navigate away from the page.
- **Don’t simulate buttons with links:** Don’t use `<a>` without `href` (or `href="#"`) to simulate a button with JavaScript.
- **Never style buttons as links:** Don't use `<button>` for navigation. Buttons don't have URLs, can't be right-clicked to open in new tab, and don't show destination in browser status bar.
- **Download actions:** For file downloads, use `<a>` with `download` attribute, not a button. This allows right-click "Save as" functionality.
- **Form submissions:** Always use `<button type="submit">` for form submissions, never a link. This ensures proper form handling and accessibility.
- **Always specify button type:** Always include `type="button"` for buttons that don't submit forms. By default, buttons inside forms have `type="submit"`, which can accidentally trigger form submission. Explicitly setting `type="button"` prevents this behavior.

### Correct element choice

```html
<!-- Link: Navigates to a page -->
<a href="/about">Learn More About Us</a>

<!-- Link: Downloads a file -->
<a href="/files/document.pdf" download>Download PDF</a>

<!-- Button: Opens a modal -->
<button type="button" data-modal-trigger>
  Contact Us
</button>

<!-- Button: Submits a form -->
<button type="submit">Submit Form</button>

<!-- Button: Toggles content -->
<button type="button" aria-expanded="false" aria-controls="menu">
  Toggle Menu
</button>

<!-- WRONG: Link without href used as button -->
<!-- <a href="#" onclick="doSomething()">Click Me</a> -->

<!-- WRONG: Button used for navigation -->
<!-- <button onclick="window.location='/page'">Go to Page</button> -->
```

## 404 Error Page

A custom 404 error page is mandatory for all websites. It prevents default server error pages and improves user experience.

### Why it’s needed

- Prevents unprofessional default server error pages
- Improves user experience and helps retain visitors

### Implementation requirements

- **Return real 404 status:** The page must return **HTTP 404** (not 200 and not a redirect).
- **Helpful content:** Explain the page doesn’t exist, provide links to key pages, and optionally add a search.
- **Redirects only for known moved URLs:** If a page moved, add a **targeted 301** from the old URL to the new one.

### Anti-pattern: redirecting all 404 to homepage

Do **not** redirect every 404 to the homepage. It hurts SEO (soft-404 signals), breaks analytics/debugging, and confuses users.

## ARIA Attributes

Use ARIA attributes for dynamic content, modals, tabs, accordions, and burger menus.

### Rule: native first

- **Prefer semantic HTML:** Use the correct elements first (`<button>`, `<a href>`, `<nav>`, `<header>`, `<main>`, `<dialog>`, etc.).
- **Add ARIA only when needed:** ARIA is for bridging gaps in semantics (custom UI patterns), not for “making HTML accessible”.
- **Don’t add redundant roles:** Avoid `role="button"` on `<button>`, `role="navigation"` on `<nav>`, etc.
- **Don’t override visible labels:** Use `aria-label` only when there is no visible text label (e.g., icon-only buttons/links). If visible text exists, don’t add `aria-label`.

### Essential ARIA attributes

- `aria-label` - Provides accessible name when visible label is not present
- `aria-labelledby` - References element(s) that label the current element
- `aria-describedby` - References element(s) that describe the current element
- `aria-hidden` - Hides decorative elements from screen readers (`true`/`false`)
- `aria-expanded` - Indicates expandable/collapsible state (`true`/`false`)
- `aria-selected` - Indicates selected state in lists/tabs (`true`/`false`)
- `aria-controls` - References element(s) controlled by the current element
- `aria-required` - Indicates required form field (`true`/`false`)
- `aria-invalid` - Indicates invalid input (`true`/`false`/`grammar`/`spelling`)
- `aria-live` - Announces dynamic content changes (`polite`/`assertive`/`off`)
- `aria-modal` - Indicates modal dialog blocks interaction (`true`/`false`)
- `aria-haspopup` - Indicates element triggers popup (`menu`/`dialog`/`listbox`/`tree`/`grid`)
- `role` - Defines element's purpose (`button`, `dialog`, `tab`, `tabpanel`, `alert`, etc.)
- `tabindex` - Controls keyboard focus order (`0` = focusable, `-1` = not focusable, `>0` = custom order)

### Common ARIA patterns (nav toggle + tabs)

This is a pattern for custom interactive components. For simple cases, prefer semantic HTML elements without roles.

```html
<!-- Navigation toggle (aria-label + aria-expanded + aria-controls) -->
<button
  class="burger"
  type="button"
  aria-label="Toggle main navigation"
  aria-expanded="false"
  aria-controls="site-nav"
  data-nav-toggle
>
  <span class="burger__line" aria-hidden="true"></span>
  <span class="burger__line" aria-hidden="true"></span>
  <span class="burger__line" aria-hidden="true"></span>
</button>

<nav id="site-nav" aria-label="Main navigation" hidden>
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>

<!-- Tabs (aria-selected + aria-controls + aria-labelledby + tabindex + hidden) -->
<div class="tabs" role="tablist" aria-label="Product information">
  <button
    type="button"
    role="tab"
    id="tab-1"
    aria-selected="true"
    aria-controls="tab-panel-1"
    tabindex="0"
  >
    Description
  </button>
  <button
    type="button"
    role="tab"
    id="tab-2"
    aria-selected="false"
    aria-controls="tab-panel-2"
    tabindex="-1"
  >
    Specs
  </button>
</div>

<div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1" tabindex="0">
  <p>Product description content...</p>
</div>

<div id="tab-panel-2" role="tabpanel" aria-labelledby="tab-2" tabindex="0" hidden>
  <p>Product specifications content...</p>
</div>
```

## Tables

Use semantic table elements. Keep structure predictable and accessible.

### Table structure

- **Use semantic structure:** Always use `<thead>`, `<tbody>`, and optionally `<tfoot>` to organize table sections.
- **Use `<th>` for headers:** Use `<th>` elements for column and row headers, not `<td>`. This helps screen readers identify header cells.
- **Add `scope` attribute:** Use `scope="col"` for column headers and `scope="row"` for row headers to clarify the relationship between headers and data cells.
- **Include `<caption>`:** Add a caption to describe the table's purpose. This helps users understand the table content before reading it.

### Advanced tables

- **`headers` attribute:** For complex tables, use the `headers` attribute on `<td>` to reference associated header cells by ID.

### Accessible table

```html
<table>
  <caption>Monthly Sales Report</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Sales</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>January</td>
      <td>$10,000</td>
      <td>+5%</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$12,000</td>
      <td>+20%</td>
    </tr>
  </tbody>
</table>
```

## Images

Images affect performance and Core Web Vitals. Follow these rules consistently.

### Image optimization

- **Sizing:** Serve images close to the rendered size (don’t scale down huge files in CSS).
- **Responsive:** Use `srcset`/`sizes` (or `<picture>`) so mobile doesn’t download desktop images.
- **Compression:** Compress before upload. Targets: **< 200KB for hero** and **< 100KB for content** (guideline).
- **Lazy loading:** Use `loading="lazy"` below the fold.
- **Hero/LCP:** Do **not** lazy-load the hero/LCP image.
- **Formats:** Prefer WebP/AVIF where possible.
- **CLS:** Include `width`/`height` (or CSS `aspect-ratio`).
- **Alt:** Always include `alt`. Decorative → `alt=""`. Informative → short, descriptive text.
- **Captions:** Don’t rely on `title`. Use `<figure>` + `<figcaption>` when a visible caption/credit is needed.

### SVG & icons

- **Inline SVG vs `<img>`:**
  - Use **inline SVG** when you need to style the icon with CSS, animate it, or change it on hover/active.
  - Use **`<img>`** when it’s just a static image file and you don’t need to control inner SVG paths.
- **Decorative icons:** If an icon is purely decorative, hide it from assistive tech with `aria-hidden="true"` (and don’t add extra text).
- **Meaningful icons:** If the icon conveys meaning, ensure it has an accessible name:
  - Prefer **visible text** next to the icon.
  - If there is no visible text (icon-only button/link), add `aria-label` on the interactive element.
- **Common case: icon inside button/link:** Put the label on the button/link, and mark the SVG as decorative.

### Responsive images

```html
<!-- Picture element -->
<picture>
  <source media="(min-width: 768px)" srcset="image-desktop.webp">
  <source media="(min-width: 480px)" srcset="image-tablet.webp">
  <img src="image-mobile.webp" alt="Description" width="400" height="300">
</picture>

<!-- Informative image -->
<img 
  src="product-photo.jpg" 
  alt="Red leather jacket with zipper front" 
  width="600" 
  height="800" 
  loading="lazy"
>

<!-- Decorative image -->
<img 
  src="decorative-divider.svg" 
  alt="" 
  width="1200" 
  height="50"
  aria-hidden="true"
>

<!-- Icon inside a button (icon is decorative, label is on the button) -->
<button type="button" aria-label="Close">
  <svg aria-hidden="true" focusable="false" width="20" height="20" viewBox="0 0 20 20">
    <path d="M4 4l12 12M16 4L4 16" />
  </svg>
</button>
```

## Video

Video is expensive. Optimize it and keep behavior predictable.

### Video implementation

- **Poster:** Always provide `poster`.
- **Controls & baseline attrs:** Use `controls` (when user-controlled), `playsinline`, and `preload="metadata"` by default.
- **Optimization:** Compress video and pick appropriate codecs (MP4 H.264, WebM VP9).
- **Lazy loading:** `loading="lazy"` does **not** work for `<video>`. For below-the-fold, use `preload="none"`/`metadata` and set `src`/`<source>` only near viewport (e.g., via `IntersectionObserver`) or after user interaction.

### Video with multiple sources

```html
<video 
  controls 
  poster="video-poster.jpg" 
  preload="metadata" 
  playsinline
  width="800" 
  height="450"
  aria-label="Product demonstration video"
>
  <source src="video.webm" type="video/webm">
  <source src="video.mp4" type="video/mp4">
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="en" 
    label="English" 
    default
  >
  <p>Your browser doesn't support HTML5 video. 
    <a href="video.mp4">Download the video</a> instead.
  </p>
</video>
```

### Video with direct `src`

```html
<video 
  src="video.mp4" 
  controls 
  poster="video-poster.jpg" 
  preload="metadata" 
  playsinline
  width="800" 
  height="450"
  aria-label="Product demonstration video"
>
  <track 
    kind="captions" 
    src="captions.vtt" 
    srclang="en" 
    label="English" 
    default
  >
  <p>Your browser doesn't support HTML5 video. 
    <a href="video.mp4">Download the video</a> instead.
  </p>
</video>
```

### Background video

Background videos are decorative. Keep them lightweight and non-disruptive.

- **Essential attributes:** Use `autoplay`, `muted`, `loop`, and `playsinline` for background videos. Never use `controls` on background videos.
- **Preload strategy:** Use `preload="auto"` for background videos that are immediately visible, or `preload="metadata"` if the video appears below the fold.
- **Accessibility:** Background videos should be decorative. Use `aria-hidden="true"` to hide them from screen readers, and ensure they don't contain important information.
- **Performance:** Keep videos short (5–15s), use lower resolution (often 720p), and compress heavily. Pause when not in viewport if needed.

### Background video markup

```html
<!-- HTML -->
<section class="hero">
  <video 
    class="hero__video" 
    autoplay 
    muted 
    loop 
    playsinline
    preload="auto"
    aria-hidden="true"
  >
    <source src="background-video.webm" type="video/webm">
    <source src="background-video.mp4" type="video/mp4">
  </video>
  <div class="hero__content">
    <h1>Welcome to Our Site</h1>
    <p>Your content here...</p>
  </div>
</section>
```

```css
/* CSS */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.hero__video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  object-fit: cover;
  z-index: -1;
}

.hero__content {
  position: relative;
  z-index: 1;
  color: white;
  text-align: center;
  padding: 2rem;
}
```

### Video optimization

- **File size:** Compress aggressively (use HandBrake/FFmpeg).
- **Resolution:** Use the lowest acceptable resolution (often 720p for background video).
- **Codecs:** MP4 (H.264) as baseline. Add WebM (VP9) when it helps.
- **Loading:** `preload="none"` for below-the-fold/interactive video, `metadata` when it may play soon, `auto` only for critical above-the-fold.
- **Optional:** For large videos/high traffic, use a video hosting/CDN.

## Performance basics

Keep markup lean and loading predictable.

### Optimization guidelines

- **HTML size:** Remove redundant markup/comments.
- **Load order:** CSS in `<head>`. JS non-blocking (`defer` or before `</body>`).
- **Iframes:** Use only when needed. Lazy-load below the fold or load on demand.
- **Inline JS:** Don’t use inline handlers or inline `<script>` in markup (exceptions only when justified).
- **JS hooks:** Use `data-*` for behavior and classes for styling. Treat `data-*` as a markup↔JS contract (critical for CMS integration).

## Validation

Validate HTML before production. Fix errors first, then warnings.

### W3C Nu HTML Checker

The official validator for HTML5 markup.

**W3C Nu HTML Checker:** [validator.w3.org/nu](https://validator.w3.org/nu/)

### Other validation tools

- **W3C Nu HTML Checker** - Official W3C validator for HTML5 ([validator.w3.org/nu](https://validator.w3.org/nu/))
- **W3C Markup Validator** - Classic HTML/XHTML validator ([validator.w3.org](https://validator.w3.org/))
- **HTMLHint** - Static code analysis tool for HTML ([htmlhint.com](https://htmlhint.com/))
- **Browser DevTools** - Built-in validation in Chrome/Firefox DevTools
- **Lighthouse** - Automated auditing tool for web pages (includes HTML validation)

### Understanding validation results

- **Errors** - Must fix
- **Warnings** - Should fix
- **Info** - Optional

