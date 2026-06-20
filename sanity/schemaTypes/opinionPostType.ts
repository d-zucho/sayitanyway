import { DocumentTextIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

/**
 * Opinion pieces and editorial content for SayItAnyway.
 * Distinct from factCheck — no structured verdict or sources fields.
 */
export const opinionPostType = defineType({
  name: 'opinionPost',
  title: 'Opinion Post',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) =>
        rule.required().custom(async (slug, context) => {
          if (!slug?.current) return true
          const client = context.getClient({ apiVersion: '2024-01-01' })
          const id = context.document?._id?.replace(/^drafts\./, '')
          const existing = await client.fetch(
            `count(*[_type == "opinionPost" && slug.current == $slug && _id != $id])`,
            { slug: slug.current, id },
          )
          return existing === 0 || 'Slug already exists — choose a unique one'
        }),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          validation: (rule) =>
            rule
              .required()
              .warning('Alt text is required for SEO and accessibility'),
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description:
        'Short summary shown on listing pages and in social previews.',
      validation: (rule) =>
        rule
          .max(200)
          .warning('Keep excerpts under 200 characters for best display'),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (rule) =>
        rule.max(8).warning('Too many tags may hurt SEO').unique(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (rule) =>
            rule.max(60).warning('Keep meta titles under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 2,
          validation: (rule) =>
            rule
              .max(160)
              .warning('Keep meta descriptions under 160 characters'),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
      publishedAt: 'publishedAt',
    },
    prepare({ title, author, media, publishedAt }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('en-US', {
            dateStyle: 'medium',
          })
        : 'Unpublished'
      return {
        title,
        subtitle: `${author ?? 'No author'} · ${date}`,
        media,
      }
    },
  },
})
