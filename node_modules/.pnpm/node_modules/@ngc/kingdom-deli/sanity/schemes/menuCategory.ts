import { defineField, defineType } from 'sanity';
import { ngcCategoryBase } from '@ngc/sanity-schemas/category';

// Kingdom Deli menu category — extends shared ngcCategoryBase with display-order field.
export const menuCategory = defineType({
  ...ngcCategoryBase,
  name: 'menuCategory',
  title: 'Menu Category',
  fields: [
    ...ngcCategoryBase.fields,
    defineField({
      name: 'displayOrder',
      title: 'Display order',
      description:
        'Lower numbers render first on the menu page. ' +
        'Suggested: Deli (10), Dogs & Polish (20), Hot Plates (30), Sides (40), Drinks (50), Bakery (60).',
      type: 'number',
      initialValue: 100,
    }),
  ],
  orderings: [
    {
      title: 'Display order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
  ],
});
