import { buildLexicalContent } from '@/lib/cms/buildLexicalContent'

export const defaultTomTomContent = buildLexicalContent([
  { type: 'paragraph', text: 'Association loi de 1901' },
  {
    type: 'paragraph',
    text: 'L’association Tom Tom a pour but de promouvoir la pratique et l’apprentissage de la batterie à travers la méthode pédagogique instaurée par Nadia et Gilles TOUCHÉ.',
  },
  {
    type: 'paragraph',
    text: 'Chaque année depuis 1995 l’association Tom Tom organise les examens publics de l’école NGT d’Aix-en-Provence.',
  },
  { type: 'heading', text: 'Elle a aussi organisé' },
  { type: 'heading', text: 'Des concerts' },
  {
    type: 'list',
    items: [
      'Monica Passos',
      'Prysm',
      'Frédéric Pasqua Trio',
      'Pacatom',
      'les vingt ans de l’école NGT',
    ],
  },
  { type: 'heading', text: 'Des rencontres musicales' },
  {
    type: 'list',
    items: ['Médéric Bourgue', 'Marc Giglio', 'Serge Gascon', 'Benjamin Henocq'],
  },
  {
    type: 'paragraph',
    text: 'Pour soutenir les actions de l’association vous pouvez devenir adhérent : l’adhésion 2024 est de 20 euros.',
  },
  { type: 'heading', text: 'Coordonnées' },
  { type: 'paragraph', text: 'association Tom Tom' },
  { type: 'paragraph', text: '14 rue Rifle Rafle' },
  { type: 'paragraph', text: '13100 Aix-en-Provence' },
  { type: 'paragraph', text: 'tél : 04 42 63 03 74' },
  { type: 'paragraph', text: 'Président : Stéphane Mancini' },
  { type: 'paragraph', text: 'n° Siret : 428 335 434 00018' },
])
