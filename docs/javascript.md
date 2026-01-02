---
layout: doc
title: JavaScript Standards & Best Practices
description: Vite build system, component patterns, IIFE, DOMContentLoaded, accessibility, error handling, event handling & performance, DOM & initialization rules, approved libraries, and production optimization.
outline: deep
---

# JavaScript Standards & Best Practices

<div class="badge">JavaScript</div>

Vite build system, component patterns, IIFE, DOMContentLoaded, accessibility, error handling, event handling & performance, DOM & initialization rules, approved libraries, and production optimization.

## Vite Build System

We use a custom Vite-based build system for all JavaScript, TypeScript, and CSS projects. This build system provides lightning-fast development experience with Hot Module Replacement (HMR), optimized production builds, and professional tooling out of the box.

### General Benefits:

- Fast development with instant HMR feedback
- SCSS compilation with PostCSS optimization
- Production-ready builds with minification and optimization
- ESLint and Prettier configured for code quality

### JavaScript-Specific Features:

- TypeScript support with full type checking
- Automatic code splitting and tree shaking for JavaScript modules
- **Ready Components:** Includes production-ready interactive components with well-thought-out accessibility logic: accordion, tabs, marquee, header, and others. All components feature proper ARIA attributes, keyboard navigation, focus management, and screen reader support

**Resources:**
- [View on GitHub](https://github.com/dmitry-conquer/zen-starter) - [Download](https://github.com/dmitry-conquer/zen-starter/archive/refs/heads/main.zip)

## Component Pattern

Use classes to organize component logic, encapsulate state, and create reusable, maintainable code. Classes provide a clear structure for initialization, event handling, and cleanup. They help prevent global namespace pollution and make it easier to manage multiple instances of the same component.

### Example: Modal Component

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

IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined. It creates a private scope, preventing variable and function declarations from polluting the global namespace. This is especially important in WordPress, where multiple plugins and themes may load scripts that could conflict with each other.

### WordPress Requirement:

**All scripts that are enqueued in WordPress must be wrapped in an IIFE** to avoid conflicts with other scripts and to maintain proper code isolation.

### Function IIFE:

```javascript
(function() {

  // code here

})();
```

### Arrow function IIFE:

```javascript
(() => {

  // code here

})();
```

## DOMContentLoaded

All scripts that interact with the DOM must be wrapped in a `DOMContentLoaded` event listener. This ensures that your JavaScript code executes only after the HTML document has been completely loaded and parsed, preventing errors from trying to access DOM elements that don't exist yet.

### Why it's necessary:

- **Prevents timing errors:** Without `DOMContentLoaded`, scripts may try to access DOM elements before they're available, causing errors like "Cannot read property of null" or "Element is undefined".
- **Ensures DOM is ready:** The event fires when the HTML document has been completely loaded and parsed, but before stylesheets, images, and subframes finish loading. This is the perfect time to initialize components and attach event listeners.
- **Works with async/defer:** Even if scripts are loaded with `async` or `defer` attributes, wrapping code in `DOMContentLoaded` ensures it runs at the right time, regardless of when the script file loads.

### Example: Basic DOMContentLoaded Wrapper

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Code here...
});
```

## Accessibility

All interactive JavaScript components must be accessible to users with disabilities. This includes keyboard navigation, proper ARIA attributes, and ensuring that all functionality is available without relying solely on mouse interactions.

### Accessibility Guidelines:

- **Keyboard Navigation:** All interactive JS components must support keyboard navigation. Users should be able to navigate, activate, and interact with all components using only the keyboard (Tab, Enter, Space, Arrow keys, Escape).
- **Escape Key:** Escape closes modals, dropdowns, and other overlay components. This provides a quick way for users to dismiss overlays without having to find and click a close button.
- **Focus Trap:** Focus trap for modals ensures that keyboard focus remains within the modal when it's open. When the user reaches the last focusable element, focus should cycle back to the first element, preventing focus from escaping to the page behind the modal.
- **ARIA Attributes:** aria-expanded and aria-controls must be handled via JavaScript to reflect the current state of interactive components. Update these attributes dynamically as components open, close, or change state to keep screen readers informed.
- **No Click-Only Interactions:** All interactions must be accessible via keyboard. Avoid click-only event handlers; use appropriate keyboard event handlers (keydown, keyup) or ensure that clickable elements are focusable and respond to Enter/Space keys.

### Example: Accessible Component

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

### Error Handling Guidelines:

- **Fail Silently:** Fail silently without breaking the page. Use try/catch blocks to catch errors and handle them gracefully. If a component fails to initialize, it should not prevent the rest of the page from functioning.
- **Console Errors:** Console errors are allowed only in development. In production, errors should be caught and handled silently, or logged to an error tracking service without displaying errors to end users.
- **Guard Against Missing Elements:** Always check if DOM elements exist before accessing them. Use optional chaining or conditional checks to prevent errors when elements are missing from the page.

## Event Handling & Performance

Efficient event handling is crucial for performance and maintainability. Use event delegation, properly manage event listeners, and optimize DOM queries to ensure smooth user interactions.

### Event Handling Best Practices:

- **Event Delegation:** Event delegation is preferred over attaching listeners to individual elements. Attach a single listener to a parent element and use event.target to handle events from child elements. This reduces memory usage and improves performance, especially for dynamic content.
- **Remove Listeners:** Remove event listeners on destroy (if applicable). When components are removed from the DOM or destroyed, clean up all attached event listeners to prevent memory leaks and unexpected behavior.
- **No Anonymous Handlers:** Avoid anonymous handlers for reusable components. Use named functions or bound methods so they can be properly removed later. Anonymous functions make it impossible to remove specific listeners.
- **Avoid Unnecessary DOM Queries:** Cache DOM element references instead of querying the DOM repeatedly. Store frequently accessed elements in variables or component properties to reduce query overhead and improve performance.
- **Throttle/Debounce:** Throttle or debounce where needed. Use throttling for events that fire frequently (like scroll or resize) to limit how often the handler executes. Use debouncing for events like input or search to wait until the user stops typing before executing the handler.

## DOM & Initialization Rules

Proper DOM manipulation and component initialization ensure maintainable, scalable code. Follow these rules to prevent conflicts, memory leaks, and unexpected behavior.

### Initialization Rules:

- **No Global Variables:** Avoid polluting the global namespace. Wrap code in IIFE or use ES6 modules. Keep variables scoped to functions or classes to prevent conflicts with other scripts and libraries.
- **One Entry Point:** Use one entry point (main.js or main.ts) to initialize all components. This centralizes initialization logic, makes it easier to manage dependencies, and ensures components are initialized in the correct order.
- **Components Initialize Only If DOM Exists:** Always check if DOM elements exist before initializing components. Use conditional checks or optional chaining to prevent errors when elements are not present on the page.
- **Use Data-Attributes:** Use data-attributes, not class-based JS selectors. Data-attributes (like data-modal, data-accordion) clearly indicate interactive elements and are less likely to conflict with CSS classes. They also make the code more maintainable and semantic.
- **Safe Re-initialization:** Ensure safe re-initialization (no double init). Components should check if they're already initialized before setting up event listeners or state. Use flags or check for existing instances to prevent duplicate initialization and memory leaks.
- **No Inline Scripts:** No JavaScript in HTML files (inline scripts), except for critical cases. All JavaScript code should be in separate files and loaded via script tags. Inline scripts make code harder to maintain, prevent caching, and can cause security issues.

## Approved Libraries

These are the approved JavaScript libraries we use in our projects. Each library has been vetted for performance, accessibility, and maintainability.

### Library List:

- **[Swiper](https://swiperjs.com/)** - Touch-enabled slider and carousel library for responsive galleries and content sliders.
- **[Micromodal.js](https://micromodal.vercel.app/)** - Lightweight modal dialog library with built-in accessibility features.
- **[GLightbox](https://biati-digital.github.io/glightbox/)** - Pure JavaScript lightbox for displaying images, videos, and inline content.
- **[Lenis](https://lenis.studiofreight.com/)** - Smooth scrolling library with momentum-based physics.
- **[AOS](https://michalsnik.github.io/aos/)** - Animate On Scroll library that triggers CSS animations when elements enter the viewport.
- **[flatpickr](https://flatpickr.js.org/)** - Lightweight date picker library with time selection and range support.
- **[IMask.js](https://imask.js.org/)** - Input masking library for formatting phone numbers, dates, and other input patterns.
- **[Google Maps JavaScript API (Native)](https://developers.google.com/maps/documentation/javascript)** - Official Google Maps API for embedding interactive maps and location services.

## Production

All JavaScript files deployed to production must be optimized for performance and browser compatibility. This includes minification, transpilation, and proper build configuration.

### Production Requirements:

- **Build Tools:** It is recommended to use ready-made build tools like Vite or Webpack for automated optimization, minification, and transpilation
- **Minification:** All scripts must be minified to reduce file size and improve load times
- **Babel/Transpilation:** Modern JavaScript (ES6+) must be transpiled to ES5 for browser compatibility using Babel or similar tools
- **Tree Shaking:** Remove unused code from bundles to reduce file size
- **External Libraries:** Some libraries like Swiper should be included separately (not bundled in the main build) to allow adding new sliders dynamically without rebuilding the entire bundle

