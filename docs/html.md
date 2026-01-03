---
layout: doc
title: Standards & Best Practices
description: "HTML standards used across our projects: semantic structure, predictable heading hierarchy, accessible links/buttons/navigation, ARIA rules for custom components, tables, images/SVG, video patterns, basic optimization, and validation. Use this page as a reference when creating markup or reviewing implementation quality."
outline: deep
---

<div class="badge">HTML</div>

# Standards & Best Practices

This page documents our HTML standards used across projects. It focuses on semantic markup and accessibility, with clear rules for headings, navigation, links vs buttons, ARIA usage for custom components, and common content elements like tables and media. It also includes practical guidance for performance basics and validation so markup stays consistent, readable, and reliable.

## Semantic HTML

Always use semantic HTML5 elements. They improve accessibility, SEO, and code maintainability.

### Semantic HTML5 tags

- `<header>` - Site or section header, contains navigation and branding
- `<nav>` - Navigation links, use `aria-label` for context
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
      <p>&copy; 2024 Company Name. All rights reserved.</p>
    </footer>
  </body>
</html>
```

## Head

The `<head>` section contains metadata, links to external resources, and configuration for your HTML document. Proper head setup is essential for SEO, performance, and social media sharing.

### Required elements

- **Required meta tags:** Always include `<meta charset="UTF-8">` as the first element and `<meta name="viewport" content="width=device-width, initial-scale=1.0">` for responsive design.
- **Title tag:** Every page must have a unique `<title>` tag (50-60 characters). It appears in browser tabs and search results.
- **Meta description:** Include `<meta name="description">` (150-160 characters) for SEO and search result snippets.
- **Open Graph tags:** Add Open Graph meta tags (`og:title`, `og:description`, `og:image`, `og:url`) for better social media sharing.
- **Favicon:** Include `<link rel="icon">` for browser tab icon. Use multiple sizes for different devices.
- **Performance hints:** Use `<link rel="preconnect">` for external domains and `<link rel="preload">` for critical resources.
- **CSS in head:** Place CSS links in `<head>` before content. Use `<link rel="stylesheet">` for external stylesheets. It is not recommended to include stylesheets in the `<body>` tag - all styles should be connected only in the `<head>` section.

### Head template

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title - Site Name</title>
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- CSS -->
  <link rel="stylesheet" href="/styles/main.css">
</head>
```

## Headings

Proper heading structure is essential for accessibility, SEO, and content hierarchy.

### Heading structure

- **H1:** Use one H1 per page as the main heading of the page/content. Do not use the site name as H1 on every page.
- **Headings:** Headings should be used properly and in the right order (H1 to H6).
- **Never skip heading levels:** Don't jump from h1 to h3 (skipping h2). Use sequential order: h1 → h2 → h3.

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

Proper link markup and navigation structure improve accessibility, SEO, and user experience. Use semantic HTML and appropriate attributes for links.

### Link best practices

- **Descriptive link text:** Use meaningful, descriptive text for links. Avoid generic phrases like "click here" or "read more". Screen readers often navigate by links, so link text should make sense out of context.
- **Use `<nav>` for navigation:** Wrap navigation menus in `<nav>` elements. Use `aria-label` to describe the navigation purpose (e.g., "Main navigation", "Breadcrumbs").
- **External links:** Add `rel="noopener noreferrer"` to external links opened in new tabs for security. Use `target="_blank"` only when necessary and always indicate external links to users.
- **Skip links:** Provide skip navigation links for keyboard users to jump to main content, especially on pages with extensive navigation.
- **Breadcrumbs:** Use semantic HTML with `<nav aria-label="Breadcrumb">` and ordered list (`<ol>`) for breadcrumb navigation. Include `aria-current="page"` on the current page link.
- **Link states:** Ensure links have clear visual states for :hover, :focus, :active, and :visited. Focus states are critical for keyboard navigation accessibility.
- **Download links:** Use `download` attribute for files meant to be downloaded. Include file type and size information when helpful.
- **Anchor links:** Use descriptive IDs for anchor links (e.g., `#section-name` instead of `#section1`). Ensure target elements have proper IDs.

### Navigation patterns

```html
<!-- Skip link -->
<a href="#main-content" class="skip-link">Skip to main content</a>

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
  aria-label="Visit website (opens in new tab)"
>
  Visit website
</a>

<!-- Download link -->
<a href="/files/document.pdf" download>
  Download PDF (2.5 MB)
</a>
```

## Buttons vs Links

Understanding when to use `<button>` versus `<a>` is crucial for accessibility, semantics, and user experience. Use the correct element based on the action's purpose.

### Usage guidelines

- **Use `<a>` for navigation:** Links should be used when the action navigates to a new page, section, or resource. Links have a URL (`href` attribute) and change the browser location or scroll to an anchor.
- **Use `<button>` for actions:** Buttons should be used for actions that perform a function on the current page (submit forms, open modals, toggle content, trigger JavaScript). Buttons don't navigate away from the page.
- **Never style links as buttons:** Don't use `<a>` without `href` or with `href="#"` and JavaScript to simulate button behavior. This breaks keyboard navigation and accessibility.
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

<!-- ❌ WRONG: Link without href used as button -->
<!-- <a href="#" onclick="doSomething()">Click Me</a> -->

<!-- ❌ WRONG: Button used for navigation -->
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

Use semantic HTML table elements to create accessible and well-structured data tables. Proper table markup improves screen reader support and data comprehension.

### Table structure

- **Use semantic structure:** Always use `<thead>`, `<tbody>`, and optionally `<tfoot>` to organize table sections.
- **Use `<th>` for headers:** Use `<th>` elements for column and row headers, not `<td>`. This helps screen readers identify header cells.
- **Add `scope` attribute:** Use `scope="col"` for column headers and `scope="row"` for row headers to clarify the relationship between headers and data cells.
- **Include `<caption>`:** Add a caption to describe the table's purpose. This helps users understand the table content before reading it.
- **Use `headers` attribute:** For complex tables, use the `headers` attribute on `<td>` elements to reference their associated header cells by ID.

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

Optimize images to improve page load times, reduce bandwidth usage, and enhance user experience. Proper image optimization is crucial for performance, especially on mobile devices.

### Image optimization

- **Use properly sized images:** Always serve images at the exact size they will be displayed. Don't upload a 2000px wide image and scale it down to 400px with CSS – this wastes bandwidth and slows down the page. Resize images to match their display dimensions before uploading.
- **Use responsive images:** Don't serve the same large image to both mobile and desktop screens. Use `<img srcset>` and `<picture>` elements to serve appropriately sized images based on device capabilities and screen size. This significantly reduces data usage on mobile devices.
- **Compress and optimize images:** Always compress images before uploading. Use image optimization tools to reduce file size while maintaining visual quality. Target file sizes: **under 200KB for hero images** and **under 100KB for regular content images**. Smaller images load faster and consume less bandwidth, especially important for mobile users.
- **Lazy-load images:** Use the `loading="lazy"` attribute on images that are below the fold (not immediately visible). This defers loading until the user scrolls near them, improving initial page load time. Always lazy-load images in long content sections, galleries, and below-the-fold content.
- **Do not lazy-load the hero/LCP image:** The main above-the-fold image should not use `loading="lazy"` (it can hurt LCP and delay rendering).
- **Use modern image formats:** Prefer WebP or AVIF formats over traditional JPEG and PNG. These formats provide better compression (30-50% smaller files) while maintaining quality.
- **Specify width and height:** Always include `width` and `height` attributes (or use CSS `aspect-ratio`) for images. This prevents layout shift (CLS) by reserving space for the image before it loads, improving Core Web Vitals scores and user experience. The browser can calculate the aspect ratio and maintain the correct layout even before the image downloads.
- **Always include `alt` attribute:** Every image must have an `alt` attribute. The `alt` text provides alternative information for images when they cannot be displayed or when users rely on screen readers. It's essential for accessibility, SEO, and user experience. For decorative images, use an empty `alt=""` attribute. For informative images, provide descriptive, concise text that conveys the image's purpose and content.
- **Avoid `title` on images:** Don’t rely on `title` for accessibility. If you need a visible caption or credit, use `<figure>` + `<figcaption>` instead.

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

Proper video implementation ensures optimal performance, accessibility, and user experience. Use semantic HTML5 video elements with appropriate attributes and optimization techniques.

### Video implementation

- **Include poster image:** Use the `poster` attribute to show a preview image before the video loads. This improves perceived performance and provides visual context.
- **Add controls and attributes:** Include `controls` for user playback control, `preload="metadata"` to load only metadata (not the entire video), and `playsinline` for mobile devices.
- **Optimize video files:** Compress videos to reduce file size while maintaining quality. Use appropriate codecs (H.264 for MP4, VP9 for WebM). Consider video length and resolution based on usage context.
- **Lazy loading:** The `loading="lazy"` attribute does **not** work for `<video>`. For below-the-fold videos use `preload="none"` (or `metadata`) and defer loading by setting the `src`/`<source>` only when the video is near viewport (e.g., via `IntersectionObserver`) or after user interaction.

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

Background videos should be muted, autoplay, loop, and have no controls. They should not interfere with content readability and must be optimized for performance.

- **Essential attributes:** Use `autoplay`, `muted`, `loop`, and `playsinline` for background videos. Never use `controls` on background videos.
- **Preload strategy:** Use `preload="auto"` for background videos that are immediately visible, or `preload="metadata"` if the video appears below the fold.
- **Accessibility:** Background videos should be decorative. Use `aria-hidden="true"` to hide them from screen readers, and ensure they don't contain important information.
- **Performance:** Keep background videos short (5-15 seconds) and optimized. Use lower resolution (720p or lower) and compress heavily. Consider using CSS to pause videos when not in viewport.

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

- **File size:** Compress videos to reduce file size. Target file sizes: under 5MB for short videos (30 seconds), under 10MB for medium videos (1-2 minutes). Use tools like HandBrake or FFmpeg for compression.
- **Resolution:** Use appropriate resolution based on display size. For most web use, 1080p (1920x1080) is sufficient. For background videos, 720p (1280x720) is often adequate.
- **Codec selection:** Use H.264 codec for MP4 (best compatibility) and VP9 for WebM (better compression). Always provide MP4 as fallback.
- **Loading strategy:** Use `preload="none"` for videos below the fold or that require user interaction. Use `preload="metadata"` for videos that might be played soon. Only use `preload="auto"` for critical above-the-fold videos.
- **Consider video hosting:** For large videos or high traffic, consider using video hosting services (YouTube, Vimeo, Cloudflare Stream) that provide CDN, adaptive streaming, and better performance.

## Optimization

Optimize your HTML for better performance, faster loading, and improved user experience.

### Optimization guidelines

- **Clean up redundant code:** Remove unnecessary HTML, comments, and extra whitespace. Every byte counts – a leaner HTML document means faster downloads and parsing. Small reductions in HTML size can especially help on mobile networks.
- **Load external files in the correct order:** External CSS and JS files should be ordered for optimal loading. CSS is render-blocking, so it should appear in the `<head>`. Scripts should be loaded non-blocking – put `<script>` tags just before the closing `</body>` or use `async`/`defer` attributes.
- **Avoid unnecessary iframes:** `<iframe>` elements can significantly slow down a page. Use them sparingly and only when needed. Consider adding `loading="lazy"` to iframes below the fold, or load them on demand (click or scroll) to save resources.
- **Avoid inline JavaScript in HTML:** Do not use inline event handlers or inline `<script>` in markup. Keep JavaScript in separate files and load it with `defer` or before `</body>` (exceptions only when explicitly justified and documented).
- **Use `data-*` attributes as JS hooks:** Treat `data-*` attributes as a contract between markup and JavaScript (especially important when integrating into WordPress templates). Use classes for styling, and `data-*` for behavior, so layout/template changes don’t break JS.

## HTML Testing

HTML validation ensures your markup follows web standards, improves accessibility, SEO, and cross-browser compatibility. Always validate your HTML before deploying to production.

### W3C Nu HTML Checker

The official W3C validator checks HTML5 markup for errors and warnings. Enter a URL below to validate your page.

**W3C Nu HTML Checker:** [validator.w3.org/nu](https://validator.w3.org/nu/)

### Other validation tools

- **W3C Nu HTML Checker** - Official W3C validator for HTML5 ([validator.w3.org/nu](https://validator.w3.org/nu/))
- **W3C Markup Validator** - Classic HTML/XHTML validator ([validator.w3.org](https://validator.w3.org/))
- **HTMLHint** - Static code analysis tool for HTML ([htmlhint.com](https://htmlhint.com/))
- **Browser DevTools** - Built-in validation in Chrome/Firefox DevTools
- **Lighthouse** - Automated auditing tool for web pages (includes HTML validation)

### Understanding validation results

- **Errors** - Must be fixed, they break HTML standards and can cause rendering issues
- **Warnings** - Should be addressed, they indicate potential problems or deprecated practices
- **Info** - Helpful suggestions for improvement, not critical

