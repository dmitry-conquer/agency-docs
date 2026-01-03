---
layout: doc
title: Best Practices & Optimization
description: Indexing & crawlability, structure & semantics, implementation patterns, performance & Core Web Vitals, metadata & structured data, mobile adaptation, and image optimization.
outline: deep
---

<div class="badge">SEO</div>

# Best Practices & Optimization

Indexing & crawlability, structure & semantics, implementation patterns, performance & Core Web Vitals, metadata & structured data, mobile adaptation, and image optimization.

## Principles

Approximately 70-80% of technical SEO success depends on proper implementation by developers. The foundation built during development determines how well search engines can crawl, index, and rank the website.

## Indexing & Crawlability

Settings that determine how search engine bots see and crawl the site.

### Robots.txt

The file must exist physically or virtually and correctly manage robot access.

**Rule:** Do not block resources required for page rendering (CSS, JS, images).

**Standard Content**

```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /?s=
Disallow: /search/
Disallow: /wp-login.php
Disallow: /wp-signup.php
Disallow: /wp-activate.php
Disallow: /xmlrpc.php
Disallow: /trackback/
Disallow: /*/trackback/
Disallow: /*/feed/
Disallow: /comments/feed/
Disallow: /readme.html
Disallow: /license.txt
Sitemap: https://your-domain.com/sitemap_index.xml
```

**Verification:** domain.com/robots.txt

### XML Sitemap

Sitemap helps Google find new pages.

**Implementation:** Generated automatically via SEO plugin (Yoast SEO).

**Accessibility:** Must be accessible at domain.com/sitemap_index.xml

### Meta Robots (Noindex Control)

Managing indexing at different development stages.

**Staging/Dev:** Site must have header `X-Robots-Tag: noindex` or meta tag `<meta name="robots" content="noindex, nofollow">`.

**Production:** The noindex tag must be COMPLETELY ABSENT in the code (except for service pages: "Thank you for purchase", "Personal account", "Search results").

### Canonical URLs

Protection against content duplication.

**Rule:** Each page must have tag `<link rel="canonical" href="..." />`.

**Self-referencing:** Canonical link must point to this page (if it's the original), to avoid duplicates like http vs https or www vs non-www.

### HTTP Status Codes

**404 Page:** Non-existent URLs must return server status 404 Not Found, not 200 OK.

**Test:** Enter domain.com/abracadabra and check Network tab in DevTools.

**SSL/HTTPS:** All content (including static files) loads via HTTPS. "Mixed Content" errors are unacceptable.

### Title Generation

**Rule:** Never hardcode `<title>` in header.php.

**Implementation:** Use native WordPress function in inc/Setup.php:

**WordPress Title Support**

```php
add_theme_support('title-tag');
```

## Structure & Semantics

How search engine bots understand the hierarchy and content structure.

### Heading Hierarchy

**H1:** There must be exactly one `<h1>` tag on the page. Usually this is the post or page title.

**Structure:** Headings should follow logical order (h2 → h3 → h4).

**Forbidden:** Skipping levels (e.g., from h2 directly to h4) for visual styling. Styles are controlled through CSS classes.

### Semantic Tags

Use HTML5 tags for structure markup, not solid `<div>` elements:

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

### Links

**Href attribute:** All `<a>` tags must have an `href` attribute. It must not be empty. If it's an action button (e.g., opening a popup) — use `<button>`, not `<a>`.

**External Links:** All external links must have security attribute `rel="noopener noreferrer"`.

### Hidden Content

**Mobile-First Indexing:** Google indexes the mobile version of the site.

**Rule:** Important content (text, headings) should not be hidden via `display: none` on mobile devices. If content is hidden, Google considers it less important.

## Implementation Patterns

Requirements for writing functional blocks.

### Breadcrumbs

We don't manually code breadcrumbs. We use SEO plugin APIs to automatically generate the navigation chain along with Schema.org markup.

**Example: PHP Code**

```php
<?php 
if ( function_exists('yoast_breadcrumb') ) {
    yoast_breadcrumb( '<nav class="breadcrumbs">', '</nav>' ); 
}
?>
```

### Pagination

**Standard:** Classic pagination (`the_posts_pagination()`) — best choice for SEO.

**AJAX / Load More:** If "Load More" button is used:

- URL in address bar must change on click (`/page/2`)
- Links to next pages (`<a href="/page/2">`) must be present in DOM (can be hidden), so the bot can follow them

### Images Alt Attributes

All `<img>` tags must have an `alt` attribute.

- **Decorative images:** `alt=""` (empty attribute, so screen reader ignores it)
- **Content images:** `alt="Description of what is shown"`

## Performance & Core Web Vitals

Impact of speed on ranking and UX.

### PageSpeed Metrics

**Target:** Performance score for mobile version should not be below orange zone (50-89). Ideal — green zone (90+).

### LCP (Largest Contentful Paint)

The largest element of the first screen (usually Hero Image) should load instantly.

**Forbidden:** Using `loading="lazy"` for Hero image.

**Recommended:** Use `fetchpriority="high"`.

**Not recommended:** Using dynamic elements like sliders in hero section.

**Example: HTML Code**

```html
<img src="hero-image.jpg" fetchpriority="high" alt="Hero Banner description">
```

### CLS (Cumulative Layout Shift)

Content should not "jump" during loading.

**Rule:** All images must have clearly defined proportions.

**Implementation:** Use `width` and `height` attributes in HTML or `aspect-ratio` in CSS. This reserves space for the image before it loads.

### Lazy Loading

All images below the fold (below the first screen) should have deferred loading.

**Code:** `loading="lazy"`. (WordPress adds this automatically via `wp_get_attachment_image`, if everything is configured correctly).

### Image Optimization

Proper image optimization is crucial for page speed and Core Web Vitals scores.

**Image Formats:**

- **WebP:** Modern format with 25-35% better compression than JPEG. Use for photos and complex images.
- **SVG:** Use for icons, logos, and simple graphics. Vector format scales without quality loss.

**Compression & File Size:**

- **Hero images:** Target file size under 200KB (after compression)
- **Content images:** Target file size under 100KB (after compression)
- **Icons/SVG:** Optimize SVG files by removing unnecessary metadata and comments
- Use image optimization tools (TinyPNG, Squoosh, ImageOptim) before uploading

**Image Dimensions:**

- **Proper sizing:** Always serve images at the exact size they will be displayed. Don't upload a 2000px wide image and scale it down to 400px with CSS
- **Responsive images:** Use `<picture>` or `srcset` to serve different sizes for different screen sizes
- **Width/Height attributes:** Always include `width` and `height` attributes to prevent layout shift (CLS)
- **Resolution:** For most web use, 2x resolution (retina) is sufficient. Higher resolutions rarely provide visible quality improvement but significantly increase file size

## Metadata & Structured Data

How the site appears in search results and social networks.

### Favicons

Icons must be present for all device types:

- `favicon.ico` (Legacy/Desktop)
- `apple-touch-icon.png` (iOS Devices)
- `icon.svg` (Modern Browsers)

**Recommendation:** Use RealFaviconGenerator service.

### Schema.org (Rich Snippets)

Valid JSON-LD microdata helps Google understand the context.

**Required types:** Organization, WebSite, BreadcrumbList.

**Verification:** Rich Results Test.

### Open Graph (Social Sharing)

For correct sharing in Telegram, Facebook, LinkedIn.

Ensure that meta tags are filled: `og:title`, `og:description`, `og:image`.

Verify that `og:image` has sufficient size (recommended 1200x630px).

## Mobile Adaptation

### Viewport

Meta tag must be present and correct for responsive design:

**Example: HTML**

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Tap Targets

Control elements should be convenient for finger tapping.

**Size:** Buttons and links must be at least 44x44px.

**Spacing:** Sufficient distance between clickable elements to avoid accidental taps.

### Overflow

Horizontal scroll on mobile devices (width 375px+) is unacceptable. All content must fit within the screen width.

