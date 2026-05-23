import type { Field } from 'payload'

const mapsEmbedDescription =
  'Collez le code iframe fourni par Google Maps (« Partager » → « Intégrer une carte »), ou uniquement l’URL src du iframe.'

const mapsUrlDescription =
  'URL de la fiche Google Maps (bouton « Partager » → « Lien »). Utilisée lorsque l’on clique sur l’adresse sur le site.'

export type SiteAddressFieldPrefix = 'address' | 'intensiveCoursesAddress'

export function siteAddressFields(namePrefix: SiteAddressFieldPrefix): Field[] {
  const isSchool = namePrefix === 'address'
  const streetField = isSchool ? 'addressStreet' : 'intensiveCoursesAddressStreet'
  const streetLine2Field =
    isSchool ? 'addressStreetLine2' : 'intensiveCoursesAddressStreetLine2'
  const postalCodeField =
    isSchool ? 'addressPostalCode' : 'intensiveCoursesAddressPostalCode'
  const cityField = isSchool ? 'addressCity' : 'intensiveCoursesAddressCity'
  const mapsUrlField = isSchool ? 'addressMapsUrl' : 'intensiveCoursesAddressMapsUrl'
  const mapsEmbedField = isSchool ? 'addressMapsEmbed' : 'intensiveCoursesAddressMapsEmbed'

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
        description:
          isSchool ?
            'Deuxième ligne de l’adresse. Affichée dans le pied de page, la page Contact et les encadrés adresse.'
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
      name: mapsEmbedField,
      type: 'textarea',
      label: 'Carte Google Maps',
      admin: {
        description: mapsEmbedDescription,
      },
    },
  ]
}
