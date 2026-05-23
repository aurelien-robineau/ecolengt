import type { Field } from 'payload'

const mapsEmbedDescription =
  'Collez le code iframe fourni par Google Maps (« Partager » → « Intégrer une carte »), ou uniquement l’URL src du iframe.'

const mapsUrlDescription =
  'URL de la fiche Google Maps (bouton « Partager » → « Lien »). Utilisée lorsque l’on clique sur l’adresse sur le site.'

export function siteAddressFields(namePrefix: 'address' | 'workshopsAddress'): Field[] {
  const streetField = namePrefix === 'address' ? 'addressStreet' : 'workshopsAddressStreet'
  const streetLine2Field =
    namePrefix === 'address' ? 'addressStreetLine2' : 'workshopsAddressStreetLine2'
  const postalCodeField =
    namePrefix === 'address' ? 'addressPostalCode' : 'workshopsAddressPostalCode'
  const cityField = namePrefix === 'address' ? 'addressCity' : 'workshopsAddressCity'
  const mapsUrlField = namePrefix === 'address' ? 'addressMapsUrl' : 'workshopsAddressMapsUrl'
  const mapsEmbedField =
    namePrefix === 'address' ? 'addressMapsEmbed' : 'workshopsAddressMapsEmbed'

  return [
    {
      name: streetField,
      type: 'text',
      label: 'Rue et numéro',
      required: namePrefix === 'address',
      admin: {
        description:
          namePrefix === 'address' ?
            'Affiché dans le pied de page, la page Contact et les encadrés adresse.'
          : 'Affichée dans la section Accès de la page Stages intensifs.',
      },
    },
    {
      name: streetLine2Field,
      type: 'text',
      label: 'Nom du bâtiment',
      admin: {
        description:
          'Nom du lieu ou du bâtiment, affiché sur la deuxième ligne de l’adresse (entre la rue et le code postal / ville).',
      },
    },
    {
      name: postalCodeField,
      type: 'text',
      label: 'Code postal',
      required: namePrefix === 'address',
    },
    {
      name: cityField,
      type: 'text',
      label: 'Ville',
      required: namePrefix === 'address',
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
