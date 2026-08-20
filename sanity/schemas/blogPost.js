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
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
      ],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('Article body must contain at least one content block.'),
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
