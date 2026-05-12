// @ngc/sanity-schemas/category
//
// Base schema for product or menu categories. Clients spread and extend
// (e.g. Kingdom Deli adds displayOrder).

import { defineField } from 'sanity';

export const ngcCategoryBase = {
  type: 'document' as const,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(1).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 64 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional short blurb shown above category items.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'description' },
  },
};
