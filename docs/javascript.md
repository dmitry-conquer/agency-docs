---
layout: doc
title: Standards & Best Practices
description: "JavaScript standards for our projects: component patterns, DOM initialization, accessibility, event handling, error handling, performance, approved libraries, and production requirements. This page is a practical reference for implementing and reviewing interactive UI behavior."
outline: deep
---

<div class="badge">JavaScript</div>

# Standards & Best Practices

This page documents our JavaScript standards used across projects. It focuses on predictable component initialization, accessibility, safe event handling, error handling, and performance. It also defines approved libraries and production requirements so interactive behavior remains consistent and maintainable.

## Build system

See [Build System](/build-system) for the Vite-based setup, TypeScript defaults, and build requirements.

### TypeScript vs vanilla JavaScript

- **Preferred:** Use TypeScript for production features and shared code. It reduces runtime errors, improves refactoring safety, and makes component APIs clearer.
- **OK for small tasks:** For quick fixes or very small scripts, vanilla JavaScript is acceptable if the code is simple and isolated.

## Component Pattern

Use classes to organize component logic, encapsulate state, and create reusable, maintainable code. Classes provide a clear structure for initialization, event handling, and cleanup. They help prevent global namespace pollution and make it easier to manage multiple instances of the same component.

### Modal component

```javascript
// modal.js
class Modal {
  constructor(element) {
    this.modal = element;
    this.trigger = document.querySelector(`[data-modal-trigger="${element.id}"]`);
    this.closeBtn = element.querySelector('[data-modal-close]');
    this.overlay = element.querySelector('.modal__overlay');
    this.previousFocus = null;
    
    this.init();
  }
  
  init() {
    if (this.trigger) {
      this.trigger.addEventListener('click', () => this.open());
    }
    
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }
    
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.close());
    }
    
    this.modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });
  }
  
  open() {
    this.previousFocus = document.activeElement;
    this.modal.hidden = false;
    this.modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.modal.hidden = true;
    this.modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }
}

// Initialize all modals
document.querySelectorAll('[data-modal]').forEach((modal) => {
  new Modal(modal);
});
```

## IIFE (Immediately Invoked Function Expression)

IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. It creates a private scope, preventing variable and function declarations from polluting the global namespace.

### Modules vs IIFE

- **During development (with a build system):** write code as ES modules (entry point + imports). This keeps scope isolated and makes code splitting/tree-shaking possible.
- **When adding a standalone script to a site:** wrap it in an IIFE to avoid global conflicts with other scripts already loaded on the page.

### Function IIFE

```javascript
(function() {
  // code here
})();
```

### Arrow function IIFE

```javascript
(() => {
  // code here
})();
```

## DOMContentLoaded

JavaScript that initializes UI components must run only after the DOM is ready.

- If scripts are loaded with `defer`, they run after HTML parsing and you can initialize directly.
- If scripts are not deferred, use `DOMContentLoaded` to avoid accessing elements before they exist.

### Why it’s necessary

- **Prevents timing errors:** Without `DOMContentLoaded`, scripts may try to access DOM elements before they're available, causing errors like "Cannot read property of null" or "Element is undefined".
- **Ensures DOM is ready:** The event fires when the HTML document has been completely loaded and parsed, but before stylesheets, images, and subframes finish loading. This is the perfect time to initialize components and attach event listeners.
- **Avoid duplicate wrappers:** If you have a single entry point that initializes all components, handle DOM-ready logic once instead of wrapping every component separately.

### DOMContentLoaded wrapper

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Code here...
});
```

## Accessibility

All interactive JavaScript components must be accessible to users with disabilities. This includes keyboard navigation, proper ARIA attributes, and ensuring that all functionality is available without relying solely on mouse interactions.

### Accessibility guidelines

- **Keyboard Navigation:** All interactive JS components must support keyboard navigation. Users should be able to navigate, activate, and interact with all components using only the keyboard (Tab, Enter, Space, Arrow keys, Escape).
- **Escape Key:** Escape closes modals, dropdowns, and other overlay components. This provides a quick way for users to dismiss overlays without having to find and click a close button.
- **Focus Trap:** Focus trap for modals ensures that keyboard focus remains within the modal when it's open. When the user reaches the last focusable element, focus should cycle back to the first element, preventing focus from escaping to the page behind the modal.
- **ARIA Attributes:** aria-expanded and aria-controls must be handled via JavaScript to reflect the current state of interactive components. Update these attributes dynamically as components open, close, or change state to keep screen readers informed.
- **No Click-Only Interactions:** All interactions must be accessible via keyboard. Avoid click-only event handlers; use appropriate keyboard event handlers (keydown, keyup) or ensure that clickable elements are focusable and respond to Enter/Space keys.

### Accessible component

```javascript
// Keyboard navigation: Enter/Space support
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    toggleMenu();
  }
});

// Escape closes modal
modal.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ARIA attributes updated via JS
button.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
button.setAttribute('aria-controls', menuId);
```

## Error Handling

Proper error handling ensures that JavaScript errors don't break the user experience. Components should gracefully handle errors and continue functioning even when unexpected situations occur.

### Error handling guidelines

- **Fail Silently:** Fail silently without breaking the page. Use try/catch blocks to catch errors and handle them gracefully. If a component fails to initialize, it should not prevent the rest of the page from functioning.
- **Console Errors:** Console errors are allowed only in development. In production, errors should be caught and handled silently, or logged to an error tracking service without displaying errors to end users.
- **Guard Against Missing Elements:** Always check if DOM elements exist before accessing them. Use optional chaining or conditional checks to prevent errors when elements are missing from the page.

## Event Handling & Performance

Efficient event handling is crucial for performance and maintainability. Use event delegation, properly manage event listeners, and optimize DOM queries to ensure smooth user interactions.

### Event handling best practices

- **Event Delegation:** Event delegation is preferred over attaching listeners to individual elements. Attach a single listener to a parent element and use event.target to handle events from child elements. This reduces memory usage and improves performance, especially for dynamic content.
- **Remove Listeners:** Remove event listeners on destroy (if applicable). When components are removed from the DOM or destroyed, clean up all attached event listeners to prevent memory leaks and unexpected behavior.
- **No Anonymous Handlers:** Avoid anonymous handlers for reusable components. Use named functions or bound methods so they can be properly removed later. Anonymous functions make it impossible to remove specific listeners.
- **Avoid Unnecessary DOM Queries:** Cache DOM element references instead of querying the DOM repeatedly. Store frequently accessed elements in variables or component properties to reduce query overhead and improve performance.
- **Throttle/Debounce:** Throttle or debounce where needed. Use throttling for events that fire frequently (like scroll or resize) to limit how often the handler executes. Use debouncing for events like input or search to wait until the user stops typing before executing the handler.

### Event delegation

```javascript
// One listener for many buttons/links
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-modal-trigger]');
  if (!trigger) return;

  const modalId = trigger.getAttribute('data-modal-trigger');
  // openModal(modalId)
});
```

## DOM & Initialization Rules

Proper DOM manipulation and component initialization ensure maintainable, scalable code. Follow these rules to prevent conflicts, memory leaks, and unexpected behavior.

### Initialization rules

- **No Global Variables:** Avoid polluting the global namespace. Wrap code in IIFE or use ES6 modules. Keep variables scoped to functions or classes to prevent conflicts with other scripts and libraries.
- **One Entry Point:** Use one entry point (main.js or main.ts) to initialize all components. This centralizes initialization logic, makes it easier to manage dependencies, and ensures components are initialized in the correct order.
- **Components Initialize Only If DOM Exists:** Always check if DOM elements exist before initializing components. Use conditional checks or optional chaining to prevent errors when elements are not present on the page.
- **Use Data-Attributes:** Use data-attributes, not class-based JS selectors. Data-attributes (like data-modal, data-accordion) clearly indicate interactive elements and are less likely to conflict with CSS classes. They also make the code more maintainable and semantic.
- **Data-attributes contract:** Treat `data-*` as a contract between markup and JavaScript:
  - `data-<component>`: component root (e.g., `data-modal`)
  - `data-<component>-<action>`: triggers/actions (e.g., `data-modal-trigger`, `data-modal-close`)
  - `data-<component>-<state>`: state flags (when needed)
  - **Rule:** classes are for styling; `data-*` is for behavior.
- **Cleanup and double-init protection:**
  - Components should expose a `destroy()` method when they attach global listeners (document/window) or manage state.
  - Keep named handler references so they can be removed (`removeEventListener`).
  - Mark initialized nodes (e.g., `data-init="true"` or a WeakSet) to prevent double initialization after partial re-render.
- **Safe Re-initialization:** Ensure safe re-initialization (no double init). Components should check if they're already initialized before setting up event listeners or state. Use flags or check for existing instances to prevent duplicate initialization and memory leaks.
- **No Inline Scripts:** No JavaScript in HTML files (inline scripts), except for critical cases. All JavaScript code should be in separate files and loaded via script tags. Inline scripts make code harder to maintain, prevent caching, and can cause security issues.

## Approved Libraries

These are the approved JavaScript libraries we use in our projects. Each library has been vetted for performance, accessibility, and maintainability.

### Library list

- **[Swiper](https://swiperjs.com/)** - Touch-enabled slider and carousel library for responsive galleries and content sliders.
- **[GSAP](https://gsap.com/)** - Animation library for high-performance timelines, scroll-based animations (ScrollTrigger), and complex UI motion.
- **[Micromodal.js](https://micromodal.vercel.app/)** - Lightweight modal dialog library with built-in accessibility features.
- **[GLightbox](https://biati-digital.github.io/glightbox/)** - Pure JavaScript lightbox for displaying images, videos, and inline content.
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scrolling library with momentum-based physics.
- **[AOS](https://michalsnik.github.io/aos/)** - Animate On Scroll library that triggers CSS animations when elements enter the viewport.
- **[flatpickr](https://flatpickr.js.org/)** - Lightweight date picker library with time selection and range support.
- **[IMask.js](https://imask.js.org/)** - Input masking library for formatting phone numbers, dates, and other input patterns.
- **[day.js](https://day.js.org/)** - Lightweight date library for parsing, formatting, and manipulating dates (use instead of Moment.js).
- **[Google Maps JavaScript API (Native)](https://developers.google.com/maps/documentation/javascript)** - Official Google Maps API for embedding interactive maps and location services.

## jQuery

We do not use jQuery in new projects and we avoid jQuery-based plugins.

### Why we don’t use jQuery

- Modern JavaScript and DOM APIs cover jQuery’s core use cases (selectors, events, Ajax) without an extra dependency.
- jQuery complicates TypeScript usage and makes code less explicit (dynamic typing and “magic” chaining patterns).
- It increases bundle size and reduces tree-shaking effectiveness compared to modular ES packages.
- It encourages patterns that are harder to maintain in component-based architecture (global selectors, implicit state).

### Why we don’t use jQuery plugins

- Many plugins are unmaintained, add legacy code, and increase security/compatibility risk.
- Plugin markup and behavior is often not accessible by default and is harder to align with our accessibility rules.
- They often rely on global state and DOM structure assumptions, which breaks during template/content changes.

### If a project already has jQuery

- Don’t introduce new jQuery code or new jQuery plugins.
- Implement new features in vanilla JS/TypeScript using `data-*` hooks.
- When touching existing jQuery features, prefer replacing them with a modern library or a small custom component instead of extending the jQuery layer.

## Production

All JavaScript files deployed to production must be optimized for performance and browser compatibility. This includes minification, transpilation, and proper build configuration.

### Production requirements

- **Build Tools:** It is recommended to use ready-made build tools like Vite or Webpack for automated optimization, minification, and transpilation
- **Minification:** All scripts must be minified to reduce file size and improve load times
- **Build target:** The output target is defined by the browsers we support. Configure the build tool accordingly (transpile/polyfill only as needed).
- **Tree Shaking:** Remove unused code from bundles to reduce file size
- **External Libraries:** Some libraries like Swiper should be included separately (not bundled in the main build) to allow adding new sliders dynamically without rebuilding the entire bundle

