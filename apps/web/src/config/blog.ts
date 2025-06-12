import type { BlogConfig } from '../lib/shaddy/types/blog'

export const blogConfig: BlogConfig = {
  mainNav: [
    {
      href: '/blog',

      title: {
        en: 'Blog',
      },
    },
  ],

  authors: [
    {
      /* the id property must be the same as author_id in the blog post mdx files required for the computed field
        in contentlayer.config.ts so we can get the author details from the blogConfig by comparing the author_id
        with the id below
      */
      id: 'rijvi-mahmud',
      name: 'Dalton Menezes',
      image: '/authors/rijvi-mahmud.jpg',
      site: 'https://rijvi-mahmud.com',
      email: 'rijvi-mahmud@outlook.com',

      bio: {
        en: 'Software Engineer | Writer | Designer',
        pt: 'Engenheiro de Software | Escritor | Designer',
      },

      social: {
        github: 'rijvi-mahmud',
        twitter: '@rijvi-mahmud',
        youtube: 'rijvi-mahmud',
        linkedin: 'rijvi-mahmud',
      },
    },
  ],

  rss: [
    {
      type: 'xml',
      file: 'blog.xml',
      contentType: 'application/xml',
    },

    {
      type: 'json',
      file: 'blog.json',
      contentType: 'application/json',
    },
  ],
} as const
