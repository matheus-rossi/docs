import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Matheus's Wiki",
  description: "All my notes, links, and knowledge.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Youtube', link: 'https://www.youtube.com/@matheus.srossi' }
    ],

    sidebar: [
      {
        text: 'Programming',
        link: 'programming/index.md',
        items: [
          { text: 'Data Engineering', link: '' },
          { text: 'Databases', link: '' },
          { text: 'DevOps', link: '' },
          { text: 'Docker', link: '' },
          { text: 'Git', link: 'programming/git/index.md' },
          { text: 'Kubernetes', link: '' },
          { text: 'Python', link: 'programming/python/index.md' },
        ]
      },
      {
        text: 'Curriculum',
        items: [
          { text: 'English', link: '/curriculum/english/index.md' },
          { text: 'Português', link: 'curriculum/portuguese/index.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/matheus-rossi' }
    ],

    footer: {
      message: 'Feel free to use any content here.',
      copyright: '2023-present Matheus Sandrini Rossi'
    }

  }
})
