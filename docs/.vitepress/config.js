import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";

export default withMermaid(
  defineConfig({
      mermaid: {},
      title: "Matheus's Wiki",
      description: "All my notes, links, and knowledge.",
      logo: '/favicon.ico',
      themeConfig: {
        search: {
          provider: 'local'
        },
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Youtube', link: 'https://www.youtube.com/@matheus.srossi' }
        ],
        outline: [2,3],
        sidebar: [
          {
            text: 'Development',
            link: 'development/index.md',
            collapsed: false,
            items: [
              { text: 'CI / CD', link: '' },
              { 
                text: 'Cloud', 
                link: '',
                collapsed: true,
                items: [
                  { 
                    text: 'AWS', 
                    link: 'development/cloud/aws/index.md',
                    collapsed: true,
                    items: [
                      { text: 'Certification', link: 'development/cloud/aws/certification/index.md' },
                      { text: 'Tools', link: 'development/cloud/aws/tools/index.md' },  
                    ]
                  },
                  { 
                    text: 'GCP',
                    link: 'development/cloud/gcp/index.md'
                  }
                ]
              },
              { text: 'Containers', link: 'development/containers/index.md' },
              { 
                text: 'Data Engineering', 
                link: '',
                collapsed: true,
                items: [
                  { text: 'Apache Airflow', link: 'development/data-engineering/airflow/index.md' },
                  { text: 'Apache Spark', link: 'development/data-engineering/spark/index.md' },
                  { text: 'Concepts', link: 'development/data-engineering/concepts/index.md' },
                  { text: 'Data Lakehouse', link: 'development/data-engineering/data-lakehouse/index.md' },
                ]
              },
              { text: 'Data Governance', link: 'development/data-governance/index.md' },
              { text: 'Data Visualization', link: 'development/data-visualization/index.md' },
              { 
                text: 'Databases', 
                link: '',
                collapsed: true,
                items: [
                  { text: 'PostgreSQL', link: 'development/databases/postgresql/index.md' },
                  { text: 'SQL Server', link: 'development/databases/sql-server/index.md' },
                ]
              },
              { text: 'Documentation', link: 'development/documentation/index.md' },
              { text: 'Git', link: 'development/git/index.md' },
              { text: 'Kubernetes', link: 'development/kubernetes/index.md' },
              { text: 'Linux', link: 'development/linux/index.md' },
              { 
                text: 'Python', 
                collapsed: true,
                items: [
                  { text: 'Environment', link: 'development/python/environment/index.md' },
                  { text: 'Fast', link: 'development/python/fast/index.md' },
                  { text: 'Functions', link: 'development/python/functions/index.md' },
                  { text: 'Packages', link: 'development/python/packages/index.md' },
                ]
              },
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
          copyright: '2023 - present - Matheus Sandrini Rossi'
        }
    
      }
    }
  )
);

