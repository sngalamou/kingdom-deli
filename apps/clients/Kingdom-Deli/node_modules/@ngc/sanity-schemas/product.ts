// @ngc/sanity-schemas/product
//
// Base schema for any product or menu item across NGC clients. Spread into a
// client-specific schema with `defineType({ ...ngcProductBase, name: '...' })`,
// then extend `fields` with client-specific additions.

import { defineField } from 'sanity';

export const ngcProductBase = {
  type: 'document' as const,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(120),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Short, plain-language description. One or two sentences.',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Display price. Source of truth for transactional totals lives in the POS / commerce platform.',
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Required for accessibility. Describe the item plainly.',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'price',
      media: 'image',
    },
    prepare({ title, subtitle, media }: { title?: string; subtitle?: number; media?: unknown }) {
      return {
        title: title ?? 'Untitled',
        subtitle: typeof subtitle === 'number' ? `$${subtitle.toFixed(2)}` : undefined,
        media,
      };
    },
  },
};
