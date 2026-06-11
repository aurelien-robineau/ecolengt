import {
  ASSOCIATION_TOM_TOM,
  DANTE_AGOSTINI_METHOD,
  DOCUMENT_TITLE_HOME,
  PACATOM,
  SEO_INTENSIVE_DEPARTMENT,
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
      title: `École de batterie à ${city} — ${DANTE_AGOSTINI_METHOD}`,
      description: `${school} : école de batterie à ${city} et en ${pacaLabel} (Marseille, Bouches-du-Rhône, Aubagne, Salon-de-Provence…). Cours pour tous niveaux dès 6 ans, enseignement exclusif selon la ${DANTE_AGOSTINI_METHOD}. Stages intensifs nationaux de batterie à ${intensiveCity(site)}. ${ASSOCIATION_TOM_TOM} et trio de batterie ${PACATOM}.`,
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
    description: `Stages intensifs de batterie à ${intensiveCity(site)} (${SEO_INTENSIVE_VENUE}, ${SEO_INTENSIVE_DEPARTMENT}), au centre national de stages. Sessions pour batteurs de toute la France — ${schoolLabel(site)}, école de batterie à ${cityLabel(site)}, ${DANTE_AGOSTINI_METHOD}.`,
  }),

  stagesCalendrier: (site: SiteSettingsData) => ({
    documentTitle: 'Calendrier des stages intensifs',
    title: `Calendrier des stages intensifs de batterie — ${intensiveCity(site)}`,
    description: `Dates et calendrier des stages intensifs de batterie à ${intensiveCity(site)} (${SEO_INTENSIVE_DEPARTMENT}). Centre national de stages — réservez votre stage de batterie, ${DANTE_AGOSTINI_METHOD}.`,
  }),

  tarifs: (site: SiteSettingsData) => ({
    documentTitle: 'Tarifs',
    title: `Tarifs cours et stages de batterie — ${cityLabel(site)}`,
    description: `Tarifs des cours de batterie à ${cityLabel(site)} et des stages intensifs à ${intensiveCity(site)}. ${schoolLabel(site)}, ${DANTE_AGOSTINI_METHOD}.`,
  }),

  actualite: (site: SiteSettingsData) => ({
    documentTitle: 'Actualité',
    title: `Actualité — école de batterie ${cityLabel(site)}`,
    description: `Actualités de ${schoolLabel(site)} : cours de batterie à ${cityLabel(site)}, stages intensifs et événements (${DANTE_AGOSTINI_METHOD}).`,
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
    title: `Association Tom Tom et ${PACATOM} — batterie et examens NGT ${cityLabel(site)}`,
    description: `${ASSOCIATION_TOM_TOM} : promotion de la batterie, examens publics NGT et actions culturelles à ${cityLabel(site)}. Trio de batterie ${PACATOM}. Liée à ${schoolLabel(site)}, ${DANTE_AGOSTINI_METHOD}.`,
  }),

  leTrainMetronome: (site: SiteSettingsData) => ({
    documentTitle: 'Le Train – Métronome',
    title: `Le Train – métronome progressif — ${schoolLabel(site)}`,
    description: `Générez un métronome « Le Train » personnalisé (tempo, subdivisions, introduction) pour vos répétitions de batterie avec ${schoolLabel(site)}.`,
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
