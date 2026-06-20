import { SearchIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

/**
 * Structured fact-check articles for SayItAnyway.
 * Each fact-check targets a specific claim with a formal verdict,
 * primary sources, and a full written analysis in the body.
 */
export const factCheckType = defineType({
  name: 'factCheck',
  title: 'Fact Check',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'The headline for this fact-check, e.g. "Did Senator X say Y?"',
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
            `count(*[_type == "factCheck" && slug.current == $slug && _id != $id])`,
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

    // --- The claim being checked ---
    defineField({
      name: 'claim',
      title: 'Claim',
      type: 'text',
      rows: 3,
      description:
        "The exact claim or statement being fact-checked, in the subject's own words where possible.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'claimSource',
      title: 'Claim Source',
      type: 'string',
      description:
        'Where the claim originated, e.g. "Tweet by @user on Jan 1, 2025" or "Fox News segment".',
    }),

    // --- Verdict ---
    defineField({
      name: 'verdict',
      title: 'Verdict',
      type: 'string',
      options: {
        list: [
          { title: '✅ True', value: 'true' },
          { title: '🟡 Mostly True', value: 'mostly-true' },
          { title: '⚠️ Misleading', value: 'misleading' },
          { title: '🟠 Mostly False', value: 'mostly-false' },
          { title: '❌ False', value: 'false' },
          { title: '🔍 Unverified', value: 'unverified' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'verdictSummary',
      title: 'Verdict Summary',
      type: 'text',
      rows: 2,
      description:
        'One or two sentences explaining the verdict — shown prominently at the top of the article.',
      validation: (rule) =>
        rule.required().max(300).warning('Keep verdict summaries concise'),
    }),

    // --- Sources ---
    defineField({
      name: 'sources',
      title: 'Primary Sources',
      type: 'array',
      description: 'Key sources that support your verdict. Add at least one.',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "White House press release, March 4 2025"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'url' },
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).error('Add at least one primary source'),
    }),

    // --- Cover image ---
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

    // --- Tags ---
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      validation: (rule) =>
        rule.max(8).warning('Too many tags may hurt SEO').unique(),
    }),

    // --- Full analysis ---
    defineField({
      name: 'body',
      title: 'Full Analysis',
      type: 'blockContent',
      description:
        'The complete fact-check write-up, including context, evidence, and conclusion.',
    }),

    // --- SEO ---
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
      verdict: 'verdict',
    },
    prepare({ title, author, media, verdict }) {
      const verdictLabels: Record<string, string> = {
        true: '✅ True',
        'mostly-true': '🟡 Mostly True',
        misleading: '⚠️ Misleading',
        'mostly-false': '🟠 Mostly False',
        false: '❌ False',
        unverified: '🔍 Unverified',
      }
      return {
        title,
        subtitle: `${verdictLabels[verdict] ?? 'No verdict'} · ${author ?? 'No author'}`,
        media,
      }
    },
  },
})
