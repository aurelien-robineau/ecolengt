/** Browser tab title on the homepage. */
export const DOCUMENT_TITLE_HOME = 'École de Batterie Nadia & Gilles Touché'

/** Suffix appended to inner page tab titles (`{pageTitle} | …`). */
export const DOCUMENT_TITLE_SUFFIX = 'École NGT'

/** Method taught exclusively at the school. */
export const DANTE_AGOSTINI_METHOD = 'méthode Dante Agostini'

/** Cultural association linked to the school (drum promotion, NGT exams). */
export const ASSOCIATION_TOM_TOM = 'Association Tom Tom'

/** Drum trio linked to the school and Association Tom Tom. */
export const PACATOM = 'Pacatom'

/**
 * Geographic areas served — used in meta descriptions and structured data
 * (natural language, no UI impact).
 */
export const SEO_SERVICE_AREAS = [
  'Aix-en-Provence',
  'Marseille',
  'Bouches-du-Rhône',
  'Provence-Alpes-Côte d’Azur',
  'PACA',
  'Vitrolles',
  'Gardanne',
  'Salon-de-Provence',
  'Aubagne',
  'Pertuis',
] as const

/** National intensive-course venue (Haute-Vienne). */
export const SEO_INTENSIVE_VENUE = 'Razès'

export const SEO_INTENSIVE_DEPARTMENT = 'Haute-Vienne'

/** Shared keyword set for HTML meta and LLM-oriented signals. */
export const SEO_KEYWORDS = [
  'école de batterie',
  'cours de batterie',
  'apprendre la batterie',
  'batterie Aix-en-Provence',
  'batterie Marseille',
  'batterie PACA',
  'batterie Provence',
  'école de batterie Aix-en-Provence',
  'école de batterie Marseille',
  'méthode Dante Agostini',
  'Dante Agostini',
  'cours batterie méthode Dante Agostini',
  'École de Batterie NGT',
  'NGT',
  'stages intensifs batterie',
  'stage batterie',
  'stage de batterie',
  'centre national stages batterie',
  'stages batterie Razès',
  'stages intensifs Razès',
  'stages batterie Haute-Vienne',
  'stage batterie Haute-Vienne',
  'cours de batterie enfants',
  'cours de batterie adultes',
  ASSOCIATION_TOM_TOM,
  'asso Tom Tom',
  'Tom Tom batterie',
  'examens NGT',
  PACATOM,
  'trio de batterie Pacatom',
  'trio de batterie',
  'trio batterie Aix-en-Provence',
  'trio batterie PACA',
] as const

export const SEO_DEFAULT_OG_IMAGE_PATH = '/brand/logo.svg'
