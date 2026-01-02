import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '',
  description: 'Complete reference for HTML, CSS, JavaScript, and WordPress development standards, best practices, and code examples.',
  
  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    }
  },
  
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'HTML', link: '/html' },
      { text: 'CSS', link: '/css' },
      { text: 'JavaScript', link: '/javascript' },
      { text: 'WordPress', link: '/wordpress' },
      { text: 'SEO', link: '/seo' },
      { text: 'Workflow', link: '/workflow' }
    ],

    sidebar: {
      '/html': [
        {
          text: 'HTML Standards',
          items: [
            { text: 'Semantic HTML', link: '/html#semantic-html' },
            { text: 'Head', link: '/html#head' },
            { text: 'Headings', link: '/html#headings' },
            { text: 'Links & Navigation', link: '/html#links--navigation' },
            { text: 'Buttons vs Links', link: '/html#buttons-vs-links' },
            { text: '404 Error Page', link: '/html#_404-error-page' },
            { text: 'ARIA Attributes', link: '/html#aria-attributes' },
            { text: 'Tables', link: '/html#tables' },
            { text: 'Images', link: '/html#images' },
            { text: 'Video', link: '/html#video' },
            { text: 'Optimization', link: '/html#optimization' },
            { text: 'HTML Testing', link: '/html#html-testing' }
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

