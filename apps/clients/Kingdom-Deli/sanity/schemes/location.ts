import { defineField, defineType } from 'sanity';
import { ngcLocationBase } from '@ngc/sanity-schemas/location';

// Kingdom Deli location — extends shared ngcLocationBase with mall-specific wayfinding.
export const location = defineType({
  ...ngcLocationBase,
  name: 'location',
  title: 'Location',
  fields: [
    ...ngcLocationBase.fields,
    defineField({
      name: 'parentVenue',
      title: 'Parent venue',
      description:
        'Mall, plaza, or larger venue name — used for SEO and address display. ' +
        'For Kingdom Deli: "Louis Joliet Mall".',
      type: 'string',
    }),
    defineField({
      name: 'entranceNote',
      title: 'Entrance / wayfinding note',
      description:
        'Short directional copy for the Find Us page ' +
        '(e.g. "Park near Cinemark. Enter through the cinema doors. Food court is straight ahead.").',
      type: 'text',
      rows: 3,
    }),
  ],
});
