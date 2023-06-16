import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Matheus's Wiki",
  description: "All my notes, links, and knowledge.",
  themeConfig: {
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Youtube', link: 'https://www.youtube.com/@matheus.srossi' }
    ],

    sidebar: [
      {
        text: 'Programming',
        link: 'programming/index.md',
        collapsed: false,
        items: [
          { text: 'CI / CD', link: '' },
          { text: 'Cloud', link: 'programming/cloud/index.md' },
          { text: 'Containers', link: 'programming/containers/index.md' },
          { text: 'Data Engineering', link: '' },
          { text: 'Data Governance', link: 'programming/data-governance/index.md' },
          { text: 'Data Visualization', link: 'programming/data-visualization/index.md' },
          { text: 'Databases', link: '' },
          { text: 'Documentation', link: 'programming/documentation/index.md' },
          { text: 'Git', link: 'programming/git/index.md' },
          { text: 'Kubernetes', link: 'programming/kubernetes/index.md' },
          { text: 'Linux', link: 'programming/linux/index.md' },
          { text: 'Python', link: 'programming/python/index.md' },
        ]
      },
      {
        text: 'Curriculum',
        collapsed: true,
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
