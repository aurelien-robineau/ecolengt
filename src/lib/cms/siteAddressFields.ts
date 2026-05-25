import type { Field } from 'payload'

const mapsUrlDescription =
  'URL de la fiche Google Maps (bouton « Partager » → « Lien »). Affichée sur le bouton sous la carte OpenStreetMap.'

const mapCoordinatesDescription =
  'Coordonnées pour la carte OpenStreetMap : sur openstreetmap.org, clic droit sur le lieu → « Afficher l’adresse » (ex. 43.5266 et 5.4474 pour Aix-en-Provence).'

export type SiteAddressFieldPrefix = 'address' | 'intensiveCoursesAddress'

export function siteAddressFields(namePrefix: SiteAddressFieldPrefix): Field[] {
  const isSchool = namePrefix === 'address'
  const streetField = isSchool ? 'addressStreet' : 'intensiveCoursesAddressStreet'
  const streetLine2Field = isSchool ? 'addressStreetLine2' : 'intensiveCoursesAddressStreetLine2'
  const postalCodeField = isSchool ? 'addressPostalCode' : 'intensiveCoursesAddressPostalCode'
  const cityField = isSchool ? 'addressCity' : 'intensiveCoursesAddressCity'
  const mapsUrlField = isSchool ? 'addressMapsUrl' : 'intensiveCoursesAddressMapsUrl'
  const mapLatitudeField = isSchool ? 'addressMapLatitude' : 'intensiveCoursesAddressMapLatitude'
  const mapLongitudeField = isSchool ? 'addressMapLongitude' : 'intensiveCoursesAddressMapLongitude'

  return [
    {
      name: streetLine2Field,
      type: 'text',
      label: 'Nom du bâtiment',
      admin: {
        description:
          'Première ligne de l’adresse affichée sur le site (nom du lieu ou du bâtiment).',
      },
    },
    {
      name: streetField,
      type: 'text',
      label: 'Rue et numéro',
      required: isSchool,
      admin: {
        description: isSchool
          ? 'Deuxième ligne de l’adresse. Affichée dans le pied de page, la page Contact et les encadrés adresse.'
          : 'Deuxième ligne de l’adresse. Affichée dans la section Accès de la page Stages intensifs.',
      },
    },
    {
      name: postalCodeField,
      type: 'text',
      label: 'Code postal',
      required: isSchool,
    },
    {
      name: cityField,
      type: 'text',
      label: 'Ville',
      required: isSchool,
    },
    {
      name: mapsUrlField,
      type: 'text',
      label: 'Lien Google Maps',
      admin: {
        description: mapsUrlDescription,
      },
    },
    {
      type: 'row',
      fields: [
        {
          name: mapLatitudeField,
          type: 'number',
          label: 'Latitude (carte OSM)',
          admin: {
            description: mapCoordinatesDescription,
            width: '50%',
          },
        },
        {
          name: mapLongitudeField,
          type: 'number',
          label: 'Longitude (carte OSM)',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ]
}
