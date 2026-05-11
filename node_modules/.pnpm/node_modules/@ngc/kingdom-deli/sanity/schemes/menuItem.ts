import { defineField, defineType } from 'sanity';
import { ngcProductBase } from '@ngc/sanity-schemas/product';

// Kingdom Deli menu item — extends shared ngcProductBase with restaurant-specific fields.
// The `noPork` field powers the <NoPorkBadge /> render path (see ADR 0003).
export const menuItem = defineType({
  ...ngcProductBase,
  name: 'menuItem',
  title: 'Menu Item',
  fields: [
    ...ngcProductBase.fields,
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'menuCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'noPork',
      title: 'No pork',
      description:
        'When true, renders the "No pork on my fork" badge on this item. ' +
        'Set true for items on the Vienna Beef all-beef line and any other items confirmed pork-free.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'squareSku',
      title: 'Square SKU',
      description:
        'SKU in the Square catalog. Used to keep the marketing-site display in sync with POS / Online inventory.',
      type: 'string',
    }),
    defineField({
      name: 'available',
      title: 'Currently available',
      description: 'Toggle off to hide an item without deleting it (e.g. seasonal, sold out).',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on home page',
      description: 'Toggle on to surface this item in the home-page featured grid.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      noPork: 'noPork',
      available: 'available',
    },
    prepare({ title, subtitle, noPork, available }) {
      const flags = [
        noPork ? 'no pork' : null,
        available === false ? 'unavailable' : null,
      ]
        .filter(Boolean)
        .join(' • ');
      return {
        title,
        subtitle: [subtitle, flags].filter(Boolean).join(' — '),
      };
    },
  },
});
