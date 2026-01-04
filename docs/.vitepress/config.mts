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
      { text: 'Build System', link: '/build-system' },
      { text: 'Workflow', link: '/workflow' }
    ],

    sidebar: false,

    socialLinks: [
      // Add your social links here if needed
    ],


    search: {
      provider: 'local'
    }
  }
})

