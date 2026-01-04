---
layout: doc
title: Standards & Best Practices
description: "JavaScript standards for our projects: component patterns, DOM initialization, accessibility, event handling, error handling, performance, approved libraries, and production requirements. This page is a practical reference for implementing and reviewing interactive UI behavior."
outline: deep
---

<div class="badge">JavaScript</div>

# Standards & Best Practices

JavaScript standards for predictable initialization, accessibility, safe event handling, and production behavior. Use this page as a reference for implementation and code review.

## Component Pattern

Components must be encapsulated (class or factory), scoped, and safe to initialize/destroy.

### Modal component

```javascript
// modal.js
class Modal {
  constructor(element) {
    this.modal = element;
    this.id = element.id;
    this.triggers = document.querySelectorAll(`[data-modal-trigger="${this.id}"]`);
    this.closeBtn = element.querySelector('[data-modal-close]');
    this.overlay = element.querySelector('[data-modal-overlay]');
    this.previousFocus = null;

    // named handlers (required for removeEventListener)
    this.onTriggerClick = this.onTriggerClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onKeydown = this.onKeydown.bind(this);

    this.init();
  }

  init() {
    // double-init protection
    if (this.modal.dataset.modalInit === 'true') return;
    this.modal.dataset.modalInit = 'true';

    this.triggers.forEach((trigger) => {
      trigger.addEventListener('click', this.onTriggerClick);
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.onCloseClick);
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', this.onOverlayClick);
    }

    this.modal.addEventListener('keydown', this.onKeydown);
  }

  destroy() {
    this.triggers.forEach((trigger) => {
      trigger.removeEventListener('click', this.onTriggerClick);
    });

    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.onCloseClick);
    }

    if (this.overlay) {
      this.overlay.removeEventListener('click', this.onOverlayClick);
    }

    this.modal.removeEventListener('keydown', this.onKeydown);
    delete this.modal.dataset.modalInit;
  }

  onTriggerClick(e) {
    e.preventDefault();
    this.open();
  }

  onCloseClick(e) {
    e.preventDefault();
    this.close();
  }

  onOverlayClick() {
    this.close();
  }

  onKeydown(e) {
    if (e.key === 'Escape') this.close();
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

Use an IIFE for standalone scripts to avoid global conflicts.

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

- **Prevents timing errors:** avoids null refs when querying DOM.
- **Avoid duplicate wrappers:** handle DOM-ready once in a single entry point.

### DOMContentLoaded wrapper

```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Code here...
});
```

## Accessibility

All interactive behavior must be keyboard accessible and keep ARIA state in sync.

### Accessibility guidelines

- **Keyboard:** Tab/Enter/Space/Escape/Arrow keys where appropriate.
- **Escape:** Escape closes overlays (modals, dropdowns).
- **Focus:** Manage focus on open/close. Trap focus for modals when needed.
- **ARIA:** Update `aria-expanded`, `aria-controls`, `aria-selected`, etc. when state changes.
- **No click-only UX:** Don’t rely on mouse-only interactions.

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

Fail gracefully. A broken component must not break the page.

### Error handling guidelines

- **Fail gracefully:** Use guards and try/catch where needed. If a component fails to init, the rest of the page must still work.
- **Console Errors:** Console errors are allowed only in development. In production, errors should be caught and handled silently, or logged to an error tracking service without displaying errors to end users.
- **Guard Against Missing Elements:** Always check if DOM elements exist before accessing them. Use optional chaining or conditional checks to prevent errors when elements are missing from the page.

## Event Handling & Performance

Prefer delegation, clean listener lifecycle, and predictable performance.

### Delegation & listeners

- **Event Delegation:** Event delegation is preferred over attaching listeners to individual elements. Attach a single listener to a parent element and use event.target to handle events from child elements. This reduces memory usage and improves performance, especially for dynamic content.
- **Remove Listeners:** Remove event listeners on destroy (if applicable). When components are removed from the DOM or destroyed, clean up all attached event listeners to prevent memory leaks and unexpected behavior.
- **No Anonymous Handlers:** Avoid anonymous handlers for reusable components. Use named functions or bound methods so they can be properly removed later. Anonymous functions make it impossible to remove specific listeners.

### DOM access & frequency

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

Initialization must be predictable and safe across templates/CMS changes.

### Initialization rules

- **Scope:** No globals. Use modules (build system) or IIFE (standalone scripts).
- **Entry point:** Initialize from a single entry point where possible.
- **Guard:** Initialize only when the required DOM exists.
- **Selectors:** Use `data-*` (not classes) for JS hooks.
- **Data-attributes contract:** Treat `data-*` as a contract between markup and JavaScript:
  - `data-<component>`: component root (e.g., `data-modal`)
  - `data-<component>-<action>`: triggers/actions (e.g., `data-modal-trigger`, `data-modal-close`)
  - `data-<component>-<state>`: state flags (when needed)
  - **Rule:** classes are for styling; `data-*` is for behavior.
- **Cleanup and double-init protection:**
  - Components should expose a `destroy()` method when they attach global listeners (document/window) or manage state.
  - Keep named handler references so they can be removed (`removeEventListener`).
  - Mark initialized nodes (e.g., `data-init="true"` or a WeakSet) to prevent double initialization after partial re-render.
- **Inline JS:** Avoid inline JavaScript in HTML (exceptions only when explicitly justified).

## Approved Libraries

Use only approved libraries, and only when a native solution is not enough.

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

- Modern JavaScript and DOM APIs cover jQuery’s core use cases (selectors, events, Ajax) without an extra dependency.
- jQuery complicates TypeScript usage and makes code less explicit (dynamic typing and “magic” chaining patterns).
- It increases bundle size and reduces tree-shaking effectiveness compared to modular ES packages.
- It encourages patterns that are harder to maintain in component-based architecture (global selectors, implicit state).
- Many jQuery plugins are unmaintained, add legacy code, and increase security/compatibility risk.
- Plugin markup and behavior is often not accessible by default and is harder to align with our accessibility rules.
- Plugins often rely on global state and DOM structure assumptions, which breaks during template/content changes.

### Existing projects

- Don’t introduce new jQuery code or new jQuery plugins.
- Implement new features in vanilla JS/TypeScript using `data-*` hooks.
- When touching existing jQuery features, prefer replacing them with a modern library or a small custom component instead of extending the jQuery layer.

## Production

Production output must be optimized and match our supported browsers.

### Production requirements

- **Build tools:** Use our build system (Vite-based) for bundling, minification, and target configuration.
- **Minification:** All scripts must be minified to reduce file size and improve load times
- **Build target:** The output target is defined by the browsers we support. Configure the build tool accordingly (transpile/polyfill only as needed).
- **Tree Shaking:** Remove unused code from bundles to reduce file size
- **External libraries:** Load separately only when required by the project workflow (e.g., adding sliders without rebuilding). Otherwise bundle as normal.

## Build system

See [Build System](/build-system) for the Vite-based setup, TypeScript defaults, and build requirements.

### TypeScript vs vanilla JavaScript

- **Preferred:** Use TypeScript for production features and shared code. It reduces runtime errors, improves refactoring safety, and makes component APIs clearer.
- **OK for small tasks:** For quick fixes or very small scripts, vanilla JavaScript is acceptable if the code is simple and isolated.

