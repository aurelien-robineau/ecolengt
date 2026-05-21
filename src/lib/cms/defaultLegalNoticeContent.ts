import { buildLexicalContent } from '@/lib/cms/buildLexicalContent'

export const defaultLegalNoticeContent = buildLexicalContent([
  {
    type: 'paragraph',
    text: 'Conformément à la loi n°2004-275 pour la Confiance dans l’Economie',
  },
  {
    type: 'paragraph',
    text: 'Le droit d’accès, de modification et de suppression de données personnelles prévu par l’article 34 de la loi N°78-17 du 6 janvier 1978 relative à l’informatique, aux fichiers et aux libertés s’exerce auprès des auteurs de ce site: M. Gilles Touché et Me Nadia Touché.',
  },
  {
    type: 'paragraph',
    text: 'En application de la loi du 11 mars 1957 (art. 41) et du code de la propriété intellectuelle du 1er juillet 1992, toute reproduction partielle ou totale à usage collectif est strictement interdite sans autorisation des auteurs de ce site: M. Gilles Touché et Me Nadia Touché.',
  },
  {
    type: 'paragraph',
    text: 'Les logos, visuels et marques présents sur ce site sont la propriété de leur détenteur respectif.',
  },
  {
    type: 'paragraph',
    text: 'Les liens hypertextes qui pointent vers le contenu de ce site sont autorisés, à la stricte exception des sites à caractère polémique, pornographique ou xénophobe.',
  },
  { type: 'heading', text: 'Responsables du site' },
  {
    type: 'paragraph',
    text: 'Nadia Touché et Gilles Touché — 14 rue rifle rafle 13100 Aix-en-Provence — tél: 04 42 63 03 74 — Email: contact@ecolengt.com',
  },
  {
    type: 'paragraph',
    text: 'Nadia Touché — N° siret: 33087099900027 — Gilles Touché — N° siret: 34879875200013',
  },
  {
    type: 'paragraph',
    text: 'Membres d’une association agréée par l’administration fiscale acceptant à ce titre le règlement des honoraires par chèque libellé à leur nom.',
  },
  { type: 'heading', text: 'Hébergeur du site' },
  {
    type: 'paragraph',
    text: 'www.ecolengt.com — AMEN SAS — 12-14 Rond Point des Champs Elysées — 75008 PARIS — France',
  },
  { type: 'heading', text: 'Crédits photos et visuels' },
  { type: 'paragraph', text: 'Tous droits réservés:' },
  {
    type: 'list',
    items: [
      'Logo NGT: Emmanuel Curt',
      'pages accueil, locaux, plan: Nadia Touché',
      'page 20 ans: Bruno Gimenez',
      'page Stéphane Huchard: Nicolas Birot',
      'page Médéric Bourgue: Philippe Brochet',
      'page Christophe Bras: 2007 Strange Milena SOFAM',
      'pages Frédéric Pasqua, Abel Croze: Bruno Gimenez',
      'page Eric Lebailly: Perrine Perez Fuentes',
      'page Rémi Sanna: Morganimage 2008',
      'page excellence 2009 David Guenichon, Léo Bouchier: Nadia Touché',
    ],
  },
])
