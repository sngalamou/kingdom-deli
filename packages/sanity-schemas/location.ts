// @ngc/sanity-schemas/location
//
// Base schema for a physical location (shop, restaurant counter, office).
// Clients spread and extend (Kingdom Deli adds parentVenue + entranceNote).

import { defineField } from 'sanity';

export const ngcLocationBase = {
  type: 'document' as const,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        defineField({ name: 'street', title: 'Street', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'state', title: 'State / region', type: 'string' }),
        defineField({ name: 'postalCode', title: 'Postal code', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string', initialValue: 'United States' }),
      ],
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'timezone',
      title: 'Time zone',
      type: 'string',
      description: 'IANA name, e.g. America/Chicago.',
      initialValue: 'America/Chicago',
    }),
    defineField({
      name: 'hours',
      title: 'Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'dayHours',
          fields: [
            defineField({
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'mon' },
                  { title: 'Tuesday', value: 'tue' },
                  { title: 'Wednesday', value: 'wed' },
                  { title: 'Thursday', value: 'thu' },
                  { title: 'Friday', value: 'fri' },
                  { title: 'Saturday', value: 'sat' },
                  { title: 'Sunday', value: 'sun' },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'open', title: 'Open', type: 'string', description: '24h format, e.g. 11:00.' }),
            defineField({ name: 'close', title: 'Close', type: 'string', description: '24h format, e.g. 19:00.' }),
            defineField({ name: 'closed', title: 'Closed all day', type: 'boolean', initialValue: false }),
          ],
        },
      ],
    }),
    defineField({
      name: 'mapUrl',
      title: 'Map URL',
      type: 'url',
      description: 'Optional Google Maps / Mapbox link for "get directions" buttons.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'address.city' },
  },
};
