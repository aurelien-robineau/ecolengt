import { routes } from '@/config/routes'
import type {
  AlumniPageData,
  ContactPageData,
  GuestbookPageData,
  LandingPageData,
  SiteSettingsData,
} from '@/lib/cms/types'

export const defaultMapsEmbedSrc =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3594002590175!2d5.4479491768275485!3d43.52915447110825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c98dbdcbee8bf5%3A0xbb7d75229711baa3!2s%C3%89cole%20de%20batterie%20NGT!5e1!3m2!1sfr!2sfr!4v1779380126654!5m2!1sfr!2sfr'

export const defaultSiteSettings: SiteSettingsData = {
  name: 'École de Batterie NGT',
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
    emails: [{ href: 'mailto:nadiatouche@orange.fr', display: 'nadiatouche@orange.fr' }],
  },
  social: {
    instagram: '#',
    facebook: '#',
  },
  navigation: [
    { label: 'Actualité', href: routes.news },
    { label: 'Livre d’or', href: routes.guestbook },
    { label: 'Anciens élèves', href: routes.alumni },
    { label: 'Tom Tom', href: routes.tomTom },
  ],
}

export const defaultGuestbookPage: GuestbookPageData = {
  letter: {
    title: 'À Dante Agostini',
    content: [
      'Cher Dante,',
      'Nous gardons au cœur et à l’esprit l’exemple que vous avez été au travers de votre enseignement, de votre générosité, de votre énergie, de votre passion pour la batterie et surtout pour les jeunes musiciens en devenir qu’étaient vos élèves.',
      'Vous nous avez tant donné qu’à notre tour nous nous devons de transmettre cette passion du travail, pour l’instrument, pour la musique, pour que chacun grandisse.',
      'Espérant qu’à leur tour nos élèves, faisant preuve d’exigence et d’intégrité, sauront perpétuer le sens de la qualité et du travail.',
    ],
    signature: 'Nadia & Gilles',
  },
  testimonials: [
    {
      content:
        'Une école où l’on apprend bien plus que la technique : le goût du travail, le respect de la musique et une vraie exigence, toujours dans la bienveillance.\n\nNotre fils y prend des cours depuis plusieurs années. Nous avons vu progresser non seulement son jeu, mais aussi sa rigueur, sa confiance et sa façon d’écouter la musique. Les professeurs savent adapter leur pédagogie à chaque élève, sans jamais perdre de vue l’exigence qui fait la qualité de l’enseignement.',
      author: 'Parents d’élève',
      pageHref: null,
    },
  ],
}

export const defaultAlumniPage: AlumniPageData = {
  intro: [
    'La musique est au-delà des mots.',
    'C’est pourquoi nous vous encourageons à découvrir ou redécouvrir ces musiciens en concert.',
  ],
  students: [
    {
      name: 'Nom de l’élève',
      projects: ['Groupe ou projet', 'Festival, scène, collaboration…'],
      pageHref: null,
    },
  ],
}

export const defaultContactPage: ContactPageData = {
  accessGallery: [
    { caption: 'Accès à l’école', wide: false, image: null },
    { caption: 'Rue', wide: false, image: null },
  ],
  mapsEmbedSrc: defaultMapsEmbedSrc,
}

export const defaultLandingPage: LandingPageData = {
  hero: {
    tagline: 'Écoute… et tu parviendras',
    name: 'École de Batterie',
    subtitle: 'Nadia & Gilles Touché',
    location: 'Aix-en-Provence',
    founded: 'Depuis 2003',
    cta: "Découvrir l'école",
    ctaHref: '/#audience',
  },
  quote: {
    text: 'Nous vous offrons un enseignement adapté à votre disponibilité, dans le respect de votre personnalité musicale.',
    cite: 'Nadia et Gilles Touché',
    imageAlt: 'Nadia et Gilles Touché',
    portrait: null,
  },
  audience: {
    id: 'audience',
    label: 'Pour qui',
    title: 'Une même exigence, un même souci de qualité pour tous.',
    paragraphs: [
      'Nous accueillons les élèves de tous niveaux dès l’âge de 6 ans.',
      'Nous vous offrons un enseignement adapté à votre disponibilité, dans le respect de votre personnalité musicale.',
      'Nous ne procédons à aucune sélection. Il est simplement souhaitable que vous soyez motivé et que vous nous fassiez confiance.',
      'Pour répondre à vos interrogations (âge, niveau, amateur ou professionnel...) n’hésitez pas à nous rencontrer.',
    ],
  },
  pedagogy: {
    id: 'pedagogy',
    label: 'La pédagogie',
    title: "Un suivi permanent de l'initiation à l'excellence, une qualité pédagogique unique.",
    lead: 'Au contact de Dante Agostini, à travers son enseignement, à travers les échanges divers que nous avons eu; notre passion de la batterie, de la musique, de l’enseignement a pris naissance. Depuis plus de 30 ans au contact de nos élèves cette passion s’affirme jour après jour.',
    body: [
      'Notre pédagogie est le fruit de ce parcours : que ce soit à St Germain-en-Laye à Creil à Aulnay sous Bois à Poitiers à Paris (école Dante Agostini) ou à Aix-en-Provence nous avons régulièrement rencontré des élèves à l’écoute de leurs professeurs faisant preuve d’une grande confiance et fournissant le travail demandé.',
      'Les résultats obtenus à la fin de leur cycle d’étude puis ensuite durant leur parcours musical nous encouragent à persévérer dans cette voie. La capacité à fournir un travail régulier intense, la patience de laisser mûrir les connaissances ainsi acquises, l’honnêteté et l’intégrité dans l’expression musicale voilà des fondements qui ne seront jamais dépassés.',
    ],
    features: {
      courseOrganization: {
        title: 'Organisation des cours',
        items: [
          'Année scolaire',
          'Durée des cours : une heure par semaine et deux heures par semaine pour le cycle supérieur.',
          'En alternance: 1 semaine “pad”, 1 semaine “batterie”.',
          'Groupe de 3 élèves de même niveau.',
        ],
        footer:
          'Nous avons gardé le principe d’alternance “pad-batterie” ainsi que celui de cours en groupe institués par Dante Agostini tant ils sont bénéfiques techniquement, musicalement et humainement.',
      },
      practice: {
        title: 'Le travail',
        body: 'Au travers de l’étude des rudiments, de la lecture, de l’indépendance, de la coordination... c’est l’acquisition de la maîtrise du son et de la pulsation qui permet d’obtenir toute liberté sur l’instrument.',
      },
    },
    intensiveCourses: {
      title: 'Stages intensifs',
      paragraphs: [
        'En complément des cours nous proposons des stages: à l’école d’Aix-en-Provence ou bien au centre national NGT en Limousin.',
        'La participation à un stage est toujours un tournant décisif pour l’étude de l’instrument, elle permet une meilleur compréhension de la méthode optimisant le travail de chacun.',
        'En cycle supérieur la participation régulière aux différents stages est recommandée.',
      ],
      learnMore: {
        label: 'En savoir plus',
        href: '/contact',
      },
    },
  },
  facilities: {
    id: 'facilities',
    label: 'Les locaux',
    title: 'Des conditions matérielles remarquables.',
    description: [
      'Dans un cadre convivial, nos locaux sont parfaitement équipés pour l’enseignement de la batterie.',
      'Batteries Gretsch USA des années 1970 et cymbales Zildjian K.',
    ],
    gallery: [
      { caption: 'Salle principale', wide: true, image: null },
      { caption: 'Cymbales Zildjian K', wide: false, image: null },
      { caption: "Salle d'attente & accueil", wide: false, image: null },
      { caption: 'Espace de pratique', wide: false, image: null },
    ],
  },
}
