import { defineType, defineField, defineArrayMember } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .min(5)
          .max(120)
          .warning('Article titles should be concise and editorial (under 120 characters).'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Branding', value: 'Branding' },
          { title: 'Marketing', value: 'Marketing' },
          { title: 'E-commerce', value: 'E-commerce' },
          { title: 'Compliance', value: 'Compliance' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      validation: (Rule) => Rule.min(1).error('At least one author is required when the field is populated.'),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'articleAuthor',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              title: 'Role / Title',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'readingTimeMinutes',
      title: 'Reading Time Override (minutes)',
      type: 'number',
      validation: (Rule) =>
        Rule.integer()
          .positive()
          .warning('Only set this to override automatically calculated reading time.'),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description (Standfirst & Meta Description)',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.required()
          .min(40)
          .max(250)
          .warning('Descriptions should be between 40 and 250 characters for clean SEO snippets.'),
    }),
    defineField({
      name: 'mainImage',
      title: 'Featured Image (Optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          validation: (Rule) =>
            Rule.custom((alt, context) => {
              if (context.parent?.asset && !alt) {
                return 'Alternative text is required whenever an image is uploaded.';
              }
              return true;
            }),
        }),
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'body',
      title: 'Article Body',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Heading 2 (H2)', value: 'h2' },
            { title: 'Heading 3 (H3)', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                        allowRelative: true,
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'dataTable',
          title: 'Data Table',
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({
              name: 'headers',
              title: 'Column Headers',
              type: 'array',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(2).error('A table needs at least 2 columns.'),
            }),
            defineField({
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [{
                type: 'object',
                name: 'tableRow',
                fields: [{
                  name: 'cells',
                  title: 'Cells',
                  type: 'array',
                  of: [{ type: 'string' }],
                  validation: (Rule) => Rule.required().min(1),
                }],
              }],
              validation: (Rule) => Rule.required().min(1).error('A table needs at least 1 row.'),
            }),
          ],
        }),
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Article body must contain at least one content block.'),
    }),
    defineField({
      name: 'faqs',
      title: 'Frequently Asked Questions (Optional)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'faqItem',
        fields: [
          defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 3,
            validation: (Rule) => Rule.required(),
          }),
        ],
      }],
    }),
    defineField({
      name: 'references',
      title: 'References (Optional)',
      type: 'array',
      of: [{
        type: 'object',
        name: 'referenceItem',
        fields: [
          defineField({
            name: 'text',
            title: 'Citation Text',
            type: 'string',
            validation: (Rule) => Rule.required(),
          }),
          defineField({
            name: 'url',
            title: 'URL (optional)',
            type: 'url',
          }),
        ],
      }],
    }),
    defineField({
      name: 'closingCta',
      title: 'Article Closing CTA (Optional)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'text',
          title: 'Body Text',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'label',
          title: 'Button Label',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'href',
          title: 'Button URL (must start with /)',
          type: 'string',
          validation: (Rule) =>
            Rule.required().custom((href) => {
              if (!href) return 'Button URL is required.';
              if (!href.startsWith('/') || href.startsWith('//')) {
                return 'Button URL must be an internal path starting with / and not //.';
              }
              return true;
            }),
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Overrides (Optional)',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title Override',
          type: 'string',
          validation: (Rule) => Rule.max(70).warning('Recommended under 70 characters.'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description Override',
          type: 'text',
          rows: 2,
          validation: (Rule) => Rule.max(160).warning('Recommended under 160 characters.'),
        }),
        defineField({
          name: 'ogImage',
          title: 'Custom Social Share Image',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      date: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, category, date, media }) {
      const formattedDate = date ? new Date(date).toLocaleDateString('en-GB') : 'Unpublished';
      return {
        title: title || 'Untitled Post',
        subtitle: `${category || 'Uncategorized'} · ${formattedDate}`,
        media,
      };
    },
  },
});
