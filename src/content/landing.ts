export const landingContent = {
  hero: {
    cta: "Découvrir l'école",
    ctaHref: '#audience',
  },
  quote: {
    text: 'Nous vous offrons un enseignement adapté à votre disponibilité, dans le respect de votre personnalité musicale.',
    cite: 'Nadia et Gilles Touché',
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
    lead:
      'Au contact de Dante Agostini, à travers son enseignement, à travers les échanges divers que nous avons eu; notre passion de la batterie, de la musique, de l’enseignement a pris naissance. Depuis plus de 30 ans au contact de nos élèves cette passion s’affirme jour après jour.',
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
        href: '#contact',
      },
    },
  },
  facilities: {
    id: 'facilities',
    label: 'Les locaux',
    title: 'Des conditions matérielles remarquables.',
    description:
      'Dans un cadre convivial, nos locaux sont parfaitement équipés pour l’enseignement de la batterie. Batteries Gretsch USA des années 1970 et cymbales Zildjian K.',
    gallery: [
      { caption: 'Salle principale', wide: true as const },
      { caption: 'Cymbales Zildjian K', wide: false as const },
      { caption: "Salle d'attente & accueil", wide: false as const },
      { caption: 'Espace de pratique', wide: false as const },
    ],
  },
} as const
