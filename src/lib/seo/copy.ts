import {
  DANTE_AGOSTINI_FOUNDER,
  DANTE_AGOSTINI_METHOD,
  DANTE_AGOSTINI_NETWORK,
  DOCUMENT_TITLE_HOME,
  SEO_INTENSIVE_VENUE,
} from '@/lib/seo/constants'
import type { SiteSettingsData } from '@/lib/content/types'

const pacaLabel = 'Provence-Alpes-Côte d’Azur (PACA)'

function schoolLabel(site: SiteSettingsData): string {
  return site.name.trim() || 'École de Batterie NGT'
}

function cityLabel(site: SiteSettingsData): string {
  return site.address.city.trim() || 'Aix-en-Provence'
}

function intensiveCity(site: SiteSettingsData): string {
  return site.intensiveCoursesAddress.city.trim() || SEO_INTENSIVE_VENUE
}

export const seoCopy = {
  home: (site: SiteSettingsData) => {
    const school = schoolLabel(site)
    const city = cityLabel(site)

    return {
      documentTitle: DOCUMENT_TITLE_HOME,
      title: `École de batterie à ${city} — ${DANTE_AGOSTINI_NETWORK}`,
      description: `${school} : école de batterie à ${city} et en ${pacaLabel} (Marseille, Bouches-du-Rhône, Aubagne, Salon-de-Provence…). Cours pour tous niveaux dès 6 ans, ${DANTE_AGOSTINI_METHOD}, réseau fondé par ${DANTE_AGOSTINI_FOUNDER}. Stages intensifs nationaux de batterie à ${intensiveCity(site)}.`,
    }
  },

  contact: (site: SiteSettingsData) => ({
    documentTitle: 'Nous contacter',
    title: `Contact — école de batterie ${cityLabel(site)}`,
    description: `Contactez ${schoolLabel(site)}, école de batterie à ${cityLabel(site)} (${pacaLabel}). Adresse, téléphone, e-mail. ${DANTE_AGOSTINI_METHOD}.`,
  }),

  stagesIntensifs: (site: SiteSettingsData) => ({
    documentTitle: 'Stages intensifs',
    title: `Stages intensifs de batterie — centre national ${intensiveCity(site)}`,
    description: `Stages intensifs de batterie à ${intensiveCity(site)} (${SEO_INTENSIVE_VENUE}), centre national ${DANTE_AGOSTINI_NETWORK} fondé par ${DANTE_AGOSTINI_FOUNDER}. Sessions pour batteurs de toute la France — ${schoolLabel(site)}, école de batterie à ${cityLabel(site)}.`,
  }),

  stagesCalendrier: (site: SiteSettingsData) => ({
    documentTitle: 'Calendrier des stages intensifs',
    title: `Calendrier des stages intensifs de batterie — ${intensiveCity(site)}`,
    description: `Dates et calendrier des stages intensifs de batterie à ${intensiveCity(site)}. Centre national ${DANTE_AGOSTINI_NETWORK} — réservez votre stage de batterie.`,
  }),

  tarifs: (site: SiteSettingsData) => ({
    documentTitle: 'Tarifs',
    title: `Tarifs cours et stages de batterie — ${cityLabel(site)}`,
    description: `Tarifs des cours de batterie à ${cityLabel(site)} et des stages intensifs à ${intensiveCity(site)}. ${schoolLabel(site)}, ${DANTE_AGOSTINI_METHOD}.`,
  }),

  actualite: (site: SiteSettingsData) => ({
    documentTitle: 'Actualité',
    title: `Actualité — école de batterie ${cityLabel(site)}`,
    description: `Actualités de ${schoolLabel(site)} : cours de batterie à ${cityLabel(site)}, stages intensifs, événements ${DANTE_AGOSTINI_NETWORK}.`,
  }),

  livreDor: (site: SiteSettingsData) => ({
    documentTitle: 'Livre d’or',
    title: `Livre d’or — témoignages élèves batterie ${cityLabel(site)}`,
    description: `Témoignages d’élèves de ${schoolLabel(site)}, école de batterie à ${cityLabel(site)} (${pacaLabel}).`,
  }),

  anciensEleves: (site: SiteSettingsData) => ({
    documentTitle: 'Anciens élèves',
    title: `Anciens élèves — parcours batteurs ${cityLabel(site)}`,
    description: `Parcours des anciens élèves de ${schoolLabel(site)}, formation batterie ${DANTE_AGOSTINI_METHOD} à ${cityLabel(site)}.`,
  }),

  tomTom: (site: SiteSettingsData) => ({
    documentTitle: 'Association Tom Tom',
    title: `Association Tom Tom — batterie et examens NGT ${cityLabel(site)}`,
    description: `Association Tom Tom : promotion de la batterie, examens publics NGT et actions culturelles à ${cityLabel(site)}. Liée à ${schoolLabel(site)} et au ${DANTE_AGOSTINI_NETWORK}.`,
  }),

  mentionsLegales: (site: SiteSettingsData) => ({
    documentTitle: 'Mentions Légales & Politique de Confidentialité',
    title: 'Mentions Légales & Politique de Confidentialité',
    description: `Mentions Légales & Politique de Confidentialité du site ${schoolLabel(site)}, école de batterie à ${cityLabel(site)}.`,
  }),

  notFound: (site: SiteSettingsData) => ({
    documentTitle: 'Page introuvable',
    title: 'Page introuvable',
    description: `Cette page n’existe pas ou a été déplacée. Retour à ${schoolLabel(site)}, école de batterie à ${cityLabel(site)}.`,
  }),
} as const
