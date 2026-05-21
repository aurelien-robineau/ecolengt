export const siteConfig = {
  name: 'École de Batterie',
  subtitle: 'Nadia & Gilles Touché',
  tagline: 'Écoute… et tu parviendras',
  location: 'Aix-en-Provence',
  founded: 'Depuis 2003',
  address: {
    street: '14 Rue Rifle Rafle',
    city: '13100 Aix-en-Provence',
  },
  contact: {
    phones: [
      { label: 'Landline', href: 'tel:+33442630374', display: '04 42 63 03 74' },
      { label: 'Mobile', href: 'tel:+33671371745', display: '06 71 37 17 45' },
      { label: 'Mobile', href: 'tel:+33671210360', display: '06 71 21 03 60' },
    ],
    email: {
      href: 'mailto:nadiatouche@orange.fr',
      display: 'nadiatouche@orange.fr',
    },
  },
  social: {
    instagram: '#',
    facebook: '#',
  },
  navigation: [
    { label: 'Pour qui', href: '#audience' },
    { label: 'La pédagogie', href: '#pedagogy' },
    { label: 'Les locaux', href: '#facilities' },
  ],
} as const
