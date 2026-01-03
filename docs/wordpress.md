---
layout: doc
title: Development Standards
description: Theme architecture, assets management, ACF PRO integration, security & data sanitization, plugins policy, deployment protocol, email delivery, and maintenance standards.
outline: deep
---

<div class="badge">WordPress</div>

# Development Standards

Theme architecture, assets management, ACF PRO integration, security & data sanitization, plugins policy, deployment protocol, email delivery, and maintenance standards.

## Theme Architecture

### WordPress Theme Framework

We use a ready-made theme starter as both an example of proper theme file organization and for creating new websites. This starter theme provides a clean, modern architecture following WordPress best practices.

**Resources:**
- [View on GitHub](https://github.com/dmitry-conquer/wp-starter-theme/) - [Download](https://github.com/dmitry-conquer/wp-starter-theme/archive/refs/heads/main.zip)

### File Structure

The theme follows a clean, organized structure that separates concerns and makes the codebase maintainable:

- **functions.php:** Only initialization of the autoloader and class instantiation. No business logic.
- **style.css:** Only theme metadata (Name, Version). Do not add site styles here.
- **inc/ (Core Logic):**
  - **Autoloader.php:** Automatic class loading.
  - **Setup.php:** add_theme_support, menu registration, etc.
  - **Assets.php:** wp_enqueue_scripts logic (asset loading, styles, scripts).
  - **Shortcodes:** Shortcode registration and functionality.
  - **Utils:** Utility and helper functions.
- **template-parts/:** Reusable template components and partials.
- **templates/:** Page templates.
- **template-parts/flexible/:** Modules for ACF Flexible Content.
- **header, footer:** Global template parts.

### Class Standards

All functions must be inside classes, not just placed anywhere. This ensures better code organization, prevents namespace conflicts, and makes the codebase more maintainable and testable.

- We use PHP Namespaces.
- One class = One file.
- Logic is split by purpose (don't write everything in one Theme.php class).
- Use `final class` for classes that should not be extended.
- Use `static` methods to avoid creating instances. This reduces memory usage and improves performance by allowing direct method calls without object instantiation.
- Use proper visibility modifiers (`public`, `private`, `protected`).

## Global Components

Global components (header and footer) are essential parts of every WordPress theme. They provide consistent structure and functionality across all pages.

### Header (header.php)

The header file contains the opening HTML structure, meta tags, and includes the header template part.

```php
<!doctype html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <div id="page" class="site-page">
    <a class="skip-link sr-only" href="#primary">Skip to content</a>

    <?php get_template_part('template-parts/header', 'default'); ?>
```

### Footer (footer.php)

The footer file closes the page structure and includes the footer template part and WordPress footer hooks.

```php
<?php get_template_part('template-parts/footer', 'default'); ?>

</div>

<?php wp_footer(); ?>

</body>

</html>
```

### Key Points:

- `wp_head()` - Must be called in `<head>` to allow plugins and themes to add scripts, styles, and meta tags
- `wp_body_open()` - Allows plugins to inject content right after the opening `<body>` tag
- `wp_footer()` - Must be called before closing `</body>` tag for scripts and tracking codes
- `language_attributes()` - Outputs language and text direction attributes for the HTML tag
- `body_class()` - Adds contextual classes to the body tag for styling flexibility
- Skip link for accessibility - allows keyboard users to jump to main content

## Assets Management

Proper asset management in WordPress ensures optimal performance, cache busting, and maintainability. All CSS and JavaScript files must be properly enqueued using WordPress functions with version control and dependency management.

### Basic Asset Enqueuing

Always use `wp_enqueue_style()` and `wp_enqueue_script()` functions to properly register and enqueue assets. Use `filemtime()` for automatic cache busting based on file modification time, with a fallback version constant.

```php
// Define version constant as fallback
define('ASSETS_VERSION', '1.0.0');

// Enqueue CSS
wp_enqueue_style(
  'style-css',
  get_template_directory_uri() . '/assets/css/style.css',
  [],
  filemtime(get_template_directory() . '/assets/css/style.css') ?: ASSETS_VERSION
);

// Enqueue JavaScript
wp_enqueue_script(
  'script-js',
  get_template_directory_uri() . '/assets/js/script.js',
  [],
  filemtime(get_template_directory() . '/assets/js/script.js') ?: ASSETS_VERSION,
  true // Load in footer
);
```

### External Libraries (Swiper, etc.)

External libraries like Swiper must be loaded from separate files (e.g., `/assets/js/swiper.js`), not from CDN and not bundled in the main compiled script file.

**Why separate files instead of CDN or bundled scripts:**

- **Dynamic initialization:** Libraries like Swiper require the ability to create new instances dynamically. If Swiper is bundled in the main `script.js` file, you cannot create new sliders after the initial page load without rebuilding the entire bundle.
- **Reusability:** Separate library files allow you to initialize multiple instances of the same library on different pages or sections without conflicts or duplicate code.
- **Version control:** Loading from local files gives you full control over library versions and ensures compatibility with your theme code.
- **No external dependencies:** Avoiding CDN eliminates dependency on external services, reduces potential security risks, and ensures assets load even if CDN is unavailable.
- **Performance:** Local files can be optimized, minified, and cached more effectively than CDN resources, especially when combined with proper WordPress caching strategies.

```php
// Enqueue Swiper from separate file
wp_enqueue_script(
  'swiper-js',
  get_template_directory_uri() . '/assets/js/swiper.js',
  [],
  filemtime(get_template_directory() . '/assets/js/swiper.js') ?: ASSETS_VERSION,
  true
);

// Swiper CSS (if needed)
wp_enqueue_style(
  'swiper-css',
  get_template_directory_uri() . '/assets/css/swiper.css',
  [],
  filemtime(get_template_directory() . '/assets/css/swiper.css') ?: ASSETS_VERSION
);
```

### Custom Scripts (custom.js)

**Important:** The main compiled script file (`script.js`) is generated by the build system and must never be edited directly. All custom JavaScript code must be added to `custom.js`.

- **Never edit script.js:** The main `script.js` file is compiled from source files and will be overwritten during build processes. Editing it directly will result in lost changes.
- **Use custom.js for additions:** All custom JavaScript code, new functionality, and modifications must be placed in `/assets/js/custom.js`.
- **IIFE requirement:** All functions in `custom.js` must be wrapped in IIFE (Immediately Invoked Function Expression) to prevent global namespace pollution and conflicts with other scripts.
- **DOMContentLoaded wrapper:** Code that interacts with the DOM must be wrapped in `DOMContentLoaded` event listener to ensure DOM is ready before execution.

**Example: custom.js Structure**

```javascript
// custom.js - All custom code goes here

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Your custom code here
    const customButton = document.querySelector('.custom-button');
    
    if (customButton) {
      customButton.addEventListener('click', () => {
        // Custom functionality
        console.log('Custom button clicked');
      });
    }
  });

})();
```

**Example: Enqueuing custom.js**

```php
// Enqueue custom.js after main script
wp_enqueue_script(
  'custom-js',
  get_template_directory_uri() . '/assets/js/custom.js',
  ['script-js'], // Dependencies: load after script.js
  filemtime(get_template_directory() . '/assets/js/custom.js') ?: ASSETS_VERSION,
  true // Load in footer
);
```

### Best Practices:

- **Dependency management:** Always specify dependencies when enqueuing scripts. Use the dependency array to ensure scripts load in the correct order (e.g., `['jquery', 'script-js']`).
- **Footer loading:** Load JavaScript files in the footer (`true` as last parameter) to improve page load performance and prevent render-blocking.
- **Conditional loading:** Use conditional checks to load assets only on pages where they're needed. For example, load Swiper only on pages with sliders using `is_page()` or `is_singular()`.
- **Minification:** All production assets should be minified. Use build tools to automatically minify CSS and JavaScript files before deployment.
- **File organization:** Keep assets organized in proper directories: `/assets/css/` for stylesheets, `/assets/js/` for scripts, `/assets/images/` for images.

### Minimize Number of Files

Minimizing the number of HTTP requests is crucial for website performance. Each additional CSS or JavaScript file requires a separate HTTP request, which increases page load time, especially on slower connections.

**Why minimize files:**

- **Reduced HTTP requests:** Each file requires a separate HTTP request. Fewer files mean fewer requests, resulting in faster page load times and better performance scores.
- **Better caching:** Fewer files are easier to cache and manage. Browsers can cache fewer files more effectively, reducing bandwidth usage for returning visitors.
- **Reduced server load:** Fewer file requests mean less server overhead and faster response times, especially under high traffic conditions.
- **Improved Core Web Vitals:** Fewer HTTP requests contribute to better Largest Contentful Paint (LCP) and First Contentful Paint (FCP) scores, which are important ranking factors for SEO.

**Do not create separate files for small functionality:**

Avoid creating individual files for every small piece of functionality. Instead, combine related code into existing files. For example, don't create `button-animation.js`, `form-validation.js`, and `tooltip.js` as separate files. Instead, add all small custom scripts to `custom.js`.

**Bad: Multiple Small Files**

```php
// ❌ Bad: Don't create separate files for small functionality
wp_enqueue_script('button-animation', '/assets/js/button-animation.js', [], '1.0.0', true);
wp_enqueue_script('form-validation', '/assets/js/form-validation.js', [], '1.0.0', true);
wp_enqueue_script('tooltip', '/assets/js/tooltip.js', [], '1.0.0', true);
wp_enqueue_script('smooth-scroll', '/assets/js/smooth-scroll.js', [], '1.0.0', true);
```

**Good: Combined in custom.js**

```php
// ✓ Good: All small functionality in one custom.js file
wp_enqueue_script('custom-js', '/assets/js/custom.js', ['script-js'], '1.0.0', true);

// custom.js contains:
// - Button animations
// - Form validation
// - Tooltip functionality
// - Smooth scroll
// All wrapped in IIFE and DOMContentLoaded
```

### Using custom.js and custom.css for production sites

When a website is already in production and you need to add new scripts or styles, always use `custom.js` and `custom.css` instead of creating new files or modifying the main compiled files.

**Why use custom.js/custom.css:**

- **No rebuild required:** Adding code to `custom.js` or `custom.css` doesn't require rebuilding the entire project. You can make changes directly without running build processes, which is essential for quick fixes and updates on live sites.
- **Preserves main files:** The main `script.js` and `style.css` files are generated by build tools and should never be edited directly. Using `custom.js` and `custom.css` keeps your main compiled files intact and prevents conflicts during future builds.
- **Easy maintenance:** All custom code is in one place, making it easier to find, update, and maintain. You don't need to search through multiple files or worry about overwriting changes during deployments.
- **Version control friendly:** Custom files are clearly separated from build-generated files, making it easier to track changes in version control and understand what code was added manually versus what was generated.
- **Minimal performance impact:** Adding code to existing `custom.js` and `custom.css` files doesn't increase the number of HTTP requests. The files are already being loaded, so you're just adding more code to existing requests.

**Example: Adding New Functionality to Production Site**

```javascript
// ✅ Correct: Add to existing custom.js
// Don't create new-file.js, add to custom.js instead

// custom.js
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Existing code...
    
    // New functionality added here
    const newFeature = document.querySelector('.new-feature');
    if (newFeature) {
      // New feature implementation
    }
  });

})();
```

**Example: Adding Styles to Production Site**

```css
/* ✅ Correct: Add to existing custom.css */
/* Don't create new-styles.css, add to custom.css instead */

/* custom.css */
/* Existing styles... */

/* New styles added here */
.new-feature {
  /* New feature styles */
}
```

## ACF PRO Integration

### Flexible Content Strategy

We build pages like a constructor (Page Builder).

- **Architecture:** 1 Layout in ACF = 1 file in `template-parts/flexible/`
- **Template Loop:** We use the standard `while (have_rows(...))` loop in the `templates/flexible.php` file.

**Example: Flexible Content Loop**

```php
<?php if (have_rows('content')): ?>
  <?php while (have_rows('content')): the_row(); ?>
    <?php get_template_part('template-parts/flexible/' . get_row_layout()); ?>
  <?php endwhile; ?>
<?php endif; ?>
```

### Return Formats

- **Image:** Image ID (for full control over the `img` tag).
- **Link:** Link Array (URL, Title, Target).
- **Checking:** Always check `if (!empty(...))` before output.
- **Sanitization:** All fields must be sanitized. See [Security: Data Sanitization](#security-data-sanitization) for details.

### Template Output Examples

Examples of how to output ACF data in templates:

**Example: Image Output**

```php
<?php if(!empty($image)): ?>
  <?php echo wp_get_attachment_image($image, 'full', false, ['loading' => 'lazy', 'class' => 'custom-class']); ?>
<?php endif; ?>
```

**Example: Link Output**

```php
<?php if ( !empty($link) ) : ?>
  <a href="<?php echo esc_url( $link['url'] ); ?>" 
     aria-label="<?php echo esc_attr( $link['title']); ?>" 
     target="<?php echo esc_attr( $link['target'] ?: '_self' ); ?>"
     <?php echo ( $link['target'] === '_blank' ) ? ' rel="noopener noreferrer"' : ''; ?>>
    <?php echo esc_html( $link['title'] ); ?>
  </a>
<?php endif; ?>
```

**Example: Repeater Output**

```php
<?php
$items = get_field('items');
if ( !empty($items) ) : ?>
  <ul>
    <?php foreach ( $items as $item ) : ?>
      <?php 
        $title = $item['title'] ?? '';
        $content = $item['content'] ?? '';
      ?>
      <?php if ( !empty($title) || !empty($content) ) : ?>
        <li>
          <?php if ( !empty($title) ) : ?>
            <h3><?php echo esc_html($title); ?></h3>
          <?php endif; ?>
          <?php if ( !empty($content) ) : ?>
<div><?php echo wp_kses_post($content); ?></div>
          <?php endif; ?>
        </li>
      <?php endif; ?>
    <?php endforeach; ?>
  </ul>
<?php endif; ?>
```

**Example: Options Page Field Output**

```php
<?php echo esc_html( get_field('phone_number', 'option') ); ?>
```

### Spacer Component

For flexible content, add a Spacer component. This component allows you to create responsive spacing between sections with different values for desktop, tablet, and mobile devices. It's useful for fine-tuning the vertical rhythm of the page and ensuring consistent spacing across different screen sizes without hardcoding values in CSS.

**Example: Spacer Template**

```php
<?php 
$desktop = get_sub_field('desktop'); 
$tablet = get_sub_field('tablet'); 
$mobile = get_sub_field('mobile'); 
  ?>
<div class="spacer" 
     style="--desktop: <?php echo $desktop; ?>px; 
            --tablet: <?php echo $tablet; ?>px; 
            --mobile: <?php echo $mobile; ?>px">
</div>
```

**Example: Spacer CSS**

```css
.spacer {
  --desktop: 90px;
  --tablet: 60px;
  --mobile: 30px;
  height: var(--desktop);
  
  @media (max-width: 991.98px) {
    height: var(--tablet);
  }
  
  @media (max-width: 575.98px) {
    height: var(--mobile);
  }
}
```

## Security: Data Sanitization

### Sanitization & Escaping

Always sanitize input and escape output. Never trust user data.

```php
// Sanitize input
$email = sanitize_email($_POST['email']);
$name = sanitize_text_field($_POST['name']);
$url = esc_url_raw($_POST['website']);
$textarea = sanitize_textarea_field($_POST['message']);

// Escape output
echo esc_html($user_input);
echo esc_attr($attribute_value);
echo esc_url($link_url);
echo esc_js($javascript_value);
echo wp_kses_post($html_content); // Allow safe HTML
```

### Database Queries

- **Forbidden:** `query_posts()` (never use).
- **Allowed:** `new WP_Query()` or `get_posts()`.
- **Hooks:** To modify the main query (e.g., on archive pages) use the `pre_get_posts` hook, don't write a new query in the template.

### Nonces

- All forms and AJAX requests must be protected using `wp_create_nonce()`.

## Plugins Policy

### General Policy

Minimum plugins. Everything that can be done with code should be done with code. Do not use plugins with expired licenses or from unofficial sources.

**Plugin Installation Policy:**

- Only the web department is authorized to install plugins on WordPress sites.
- If another department wants to install a plugin that is not included in the allowed plugins list, they must submit a request to the web department director or an authorized person.
- The requested plugin must undergo a security and reliability review by the web department before installation.

### ✅ Mandatory (Required)

- ACF PRO (Licensed version)
- Classic Editor (Disable Gutenberg, unless otherwise specified)
- Safe SVG / SVG Support (Allow SVG uploads)
- Yoast SEO
- HFCM (Header Footer Code Manager)
- Wordfence
- WP Activity Log

### ✅ Allowed

- Redirection
- CookieYes | GDPR Cookie Consent
- Duplicate Page / Yoast Duplicate Post
- Gravity Forms
- GTranslate
- WPS Hide Login
- WP File Manager
- Better Search Replace
- Custom Fonts

### 🛠 Dev Only (Remove/Disable on Production)

- Query Monitor (Debug performance and errors)
- Show Current Template

### ❌ Banned (Forbidden)

- **Visual Builders:** Elementor, Divi, WPBakery (kill PageSpeed)
- **Really Simple SSL** (configured on the server)
- **Shortcode-based plugins** (sliders, galleries, tabs). We do this through ACF Flexible.

**⚠️ Important:** Use of plugins that are not included in the mandatory or allowed lists must be discussed in advance with the web department director or an authorized person.

## Deployment Protocol

### Checklist

Checklist before project handover.

- **Debug:** Ensure `WP_DEBUG` is set to `false` in `wp-config.php`.
- **Search Engines:** Enable indexing ("Settings → Reading → Discourage search engines" — uncheck the box).
- **Permalinks:** Re-save permalink settings (common 404 error fix).
- **Admin Email:** Change administrator email to client's email.
- **Forms:** Send test submission from all forms.
- **Dev Plugins:** Remove or disable all dev-only plugins (Query Monitor, Show Current Template, etc.).
- **Security:** Remove test data, check file permissions, ensure no debug information is exposed.
- **Performance:** Clear cache, optimize database, check page load speed.
- **SSL:** Verify SSL certificate is properly configured and working.
- **Testing:** Test on different devices and browsers, check for broken links (404 errors).
- **Backup:** Create a full backup of the site before going live.
- **Comments:** All comments must be disabled on the site. Users should not be able to leave comments.

## Email Delivery

### JotForm

For forms, we use the [Jotform](https://www.jotform.com/) service.

### SMTP

If the client wants forms on their own website rather than on a third-party service, follow these guidelines:

- WordPress sends emails via PHP `mail()` by default, which results in 99% of emails being marked as spam.
- **Mandatory:** Install an SMTP plugin (`WP Mail SMTP`).
- The SMTP service is chosen based on client preferences and requirements.

## Maintenance

### Updates

Plugins, themes, and WordPress core must be kept up to date.

### Backup Requirements

- Updates to any site components must be performed only after a full site backup. Create a complete backup (files and database) before any updates.
- **Hosting-level backups:** Backups must be performed at the hosting level, not through WordPress plugins. Hosting-level backups are more reliable, faster, and don't consume server resources or database space. They also provide better recovery options and are independent of WordPress functionality.

### Verify Site Functionality

Verify site functionality after updates are complete.

