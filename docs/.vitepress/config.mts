import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'MediaComponents Developer Guide',
  description: 'Complete reference for HTML, CSS, JavaScript, and WordPress development standards, best practices, and code examples.',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  
  themeConfig: {
    siteTitle: 'MediaComponents',
    lastUpdated: true,
    nav: [
      { text: 'Home', link: '/' },
      { text: 'HTML', link: '/html' },
      { text: 'CSS', link: '/css' },
      { text: 'JavaScript', link: '/javascript' },
      { text: 'WordPress', link: '/wordpress' },
      { text: 'SEO', link: '/seo' },
      { text: 'Workflow', link: '/workflow' },
      { text: 'Build System', link: '/build-system' }
    ],

    sidebar: {
      '/build-system': [
        {
          text: 'Build System',
          items: [
            { text: 'Vite', link: '/build-system#vite' },
            { text: 'Why we use it', link: '/build-system#why-we-use-it' },
            { text: 'Our Vite-based setup', link: '/build-system#our-vite-based-setup-wrapper' },
            { text: 'Resources', link: '/build-system#resources' }
          ]
        }
      ],
      '/html': [
        {
          text: 'HTML Standards',
          items: [
            { text: 'Semantic HTML', link: '/html#semantic-html' },
            { text: 'Document head', link: '/html#document-head' },
            { text: 'Headings', link: '/html#headings' },
            { text: 'Links & Navigation', link: '/html#links--navigation' },
            { text: 'Buttons vs Links', link: '/html#buttons-vs-links' },
            { text: '404 Error Page', link: '/html#_404-error-page' },
            { text: 'ARIA Attributes', link: '/html#aria-attributes' },
            { text: 'Tables', link: '/html#tables' },
            { text: 'Images', link: '/html#images' },
            { text: 'Video', link: '/html#video' },
            { text: 'Performance basics', link: '/html#performance-basics' },
            { text: 'Validation', link: '/html#validation' }
          ]
        }
      ],
      '/css': [
        {
          text: 'CSS Standards',
          items: [
            { text: 'CSS Reset', link: '/css#css-reset' },
            { text: 'BEM Methodology', link: '/css#bem-methodology' },
            { text: 'CSS Variables', link: '/css#css-variables' },
            { text: 'Units & Responsive Design', link: '/css#units--responsive-design' },
            { text: 'Media Queries Breakpoints', link: '/css#media-queries-breakpoints' },
            { text: 'Hover States', link: '/css#hover-states' },
            { text: 'CSS Best Practices', link: '/css#css-best-practices' },
            { text: 'Fluid responsive values with clamp()', link: '/css#fluid-responsive-values-with-clamp' },
            { text: 'CSS Testing', link: '/css#css-testing' },
            { text: 'Production', link: '/css#production' },
            { text: 'Build system', link: '/css#build-system' }
          ]
        }
      ],
      '/javascript': [
        {
          text: 'JavaScript Standards',
          items: [
            { text: 'Build system', link: '/javascript#build-system' },
            { text: 'Component Pattern', link: '/javascript#component-pattern' },
            { text: 'IIFE', link: '/javascript#iife-immediately-invoked-function-expression' },
            { text: 'DOMContentLoaded', link: '/javascript#domcontentloaded' },
            { text: 'Accessibility', link: '/javascript#accessibility' },
            { text: 'Error Handling', link: '/javascript#error-handling' },
            { text: 'Event Handling & Performance', link: '/javascript#event-handling--performance' },
            { text: 'DOM & Initialization Rules', link: '/javascript#dom--initialization-rules' },
            { text: 'Approved Libraries', link: '/javascript#approved-libraries' },
            { text: 'Production', link: '/javascript#production' }
          ]
        }
      ],
      '/wordpress': [
        {
          text: 'WordPress Standards',
          items: [
            { text: 'Theme Architecture', link: '/wordpress#theme-architecture' },
            { text: 'Global Components', link: '/wordpress#global-components' },
            { text: 'Assets Management', link: '/wordpress#assets-management' },
            { text: 'ACF PRO Integration', link: '/wordpress#acf-pro-integration' },
            { text: 'Security: Data Sanitization', link: '/wordpress#security-data-sanitization' },
            { text: 'Plugins Policy', link: '/wordpress#plugins-policy' },
            { text: 'Deployment Protocol', link: '/wordpress#deployment-protocol' },
            { text: 'Email Delivery', link: '/wordpress#email-delivery' },
            { text: 'Maintenance', link: '/wordpress#maintenance' }
          ]
        }
      ],
      '/seo': [
        {
          text: 'SEO Standards',
          items: [
            { text: 'Principles', link: '/seo#principles' },
            { text: 'Indexing & Crawlability', link: '/seo#indexing--crawlability' },
            { text: 'Structure & Semantics', link: '/seo#structure--semantics' },
            { text: 'Implementation Patterns', link: '/seo#implementation-patterns' },
            { text: 'Performance & Core Web Vitals', link: '/seo#performance--core-web-vitals' },
            { text: 'Metadata & Structured Data', link: '/seo#metadata--structured-data' },
            { text: 'Mobile Adaptation', link: '/seo#mobile-adaptation' }
          ]
        }
      ]
    },

    socialLinks: [
      // Add your social links here if needed
    ],


    search: {
      provider: 'local'
    }
  }
})

