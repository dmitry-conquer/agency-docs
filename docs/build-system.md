---
layout: doc
title: Build System
description: "Build system standards: what Vite is, why we use it, and how our Vite-based setup supports SCSS, TypeScript, optimization, and consistent project workflows."
outline: deep
---

<div class="badge">Build System</div>

# Build System

This page describes our build system standard. We use **Vite** as the foundation and a **custom wrapper on top of Vite** that adds project-ready defaults (SCSS pipeline, TypeScript setup, lint/format, helpers, and consistent build output).

## Vite

Vite is a modern build tool for frontend projects. It provides fast local development (HMR) and optimized production builds.

## Why we use it

- Fast development with instant HMR feedback
- Production-ready builds with minification and optimization
- Modern module-based workflow (entry points, imports, code splitting)

## Our Vite-based setup (wrapper)

We use a Vite-based setup with additional features and conventions:

### General benefits

- Consistent project structure and defaults across projects
- SCSS compilation with PostCSS optimization
- ESLint and Prettier configured for code quality
- Source maps for easier debugging during development

### CSS features

- SCSS preprocessing with nested selectors, variables, and functions
- Autoprefixer for cross-browser compatibility
- CSS minification and optimization in production builds
- Vendor prefixes generated automatically based on supported browsers
- Ready helpers: SCSS functions and breakpoint variables used across projects

### JavaScript & TypeScript features

- TypeScript support with type checking
- Automatic code splitting and tree shaking for modules
- Production-ready interactive components with accessibility logic (depending on project template)

## Resources

- [View on GitHub](https://github.com/dmitry-conquer/zen-starter)
- [Download](https://github.com/dmitry-conquer/zen-starter/archive/refs/heads/main.zip)


