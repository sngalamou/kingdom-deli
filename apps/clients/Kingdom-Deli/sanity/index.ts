import { ngcCategoryBase } from '@ngc/sanity-schemas/category';
import { ngcProductBase } from '@ngc/sanity-schemas/product';
import { ngcLocationBase } from '@ngc/sanity-schemas/location';

// If you have deli-specific extensions to those bases, you define them here.
// For example, extending the base product to include the "noPork" badge for Henry:

const menuItem = {
  ...ngcProductBase,
  name: 'menuItem',
  title: 'Menu Item',
  fields: [
    ...ngcProductBase.fields,
    {
      name: 'noPork',
      title: 'No Pork / Halal Friendly',
      type: 'boolean',
      description: 'Toggle on to display the No Pork butcher stamp.',
      initialValue: false
    },
    {
      name: 'squareSku',
      title: 'Square POS SKU',
      type: 'string',
      description: 'Matches the item in Square for the ordering embed.'
    }
  ]
}

export const schemaTypes = [ngcCategoryBase, ngcLocationBase, menuItem];