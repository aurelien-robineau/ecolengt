import { buildLexicalContent } from '@/lib/cms/buildLexicalContent'

/**
 * Contenu par défaut des mentions légales et politique de confidentialité.
 * À coller ou synchroniser dans l’admin : Mentions Légales & Politique de Confidentialité.
 */
export const defaultLegalNoticeContent = buildLexicalContent([
  { type: 'heading', text: 'Mentions légales' },
  { type: 'heading', text: '1. Éditeurs du site et responsables de la publication' },
  {
    type: 'paragraph',
    text: 'Le site www.ecolengt.com est co-édité par :',
  },
  {
    type: 'paragraph',
    text: 'Mme Nadia Touché — Enseignante de batterie — Entrepreneur individuel (EI) — SIRET : 330 870 999 00027',
  },
  {
    type: 'paragraph',
    text: 'M. Gilles Touché — Enseignant de batterie — Entrepreneur individuel (EI) — SIRET : 348 798 752 00013',
  },
  {
    type: 'paragraph',
    text: 'Adresse de l’école : 14 Rue Rifle Rafle, 13100 Aix-en-Provence, France',
  },
  { type: 'paragraph', text: 'Téléphone : 04 42 63 03 74' },
  { type: 'paragraph', text: 'E-mail : contact@ecolengt.com' },
  {
    type: 'paragraph',
    text: 'Directeurs de la publication : Mme Nadia Touché et M. Gilles Touché.',
  },
  {
    type: 'paragraph',
    text: 'Note légale — règlement des honoraires : Mme Nadia Touché et M. Gilles Touché sont membres d’une association agréée par l’administration fiscale, acceptant à ce titre le règlement des honoraires par chèque libellé à leur nom.',
  },
  { type: 'paragraph', text: 'Dernière mise à jour : mai 2026.' },
  { type: 'heading', text: '2. Hébergement du site et des données' },
  {
    type: 'paragraph',
    text: 'Hébergeur de l’application (code et pages web) : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis — https://vercel.com — privacy@vercel.com. Données applicatives hébergées sur des serveurs situés en France lorsque cette localisation est activée.',
  },
  {
    type: 'paragraph',
    text: 'Hébergeur des fichiers médias : Vercel Inc. (service Vercel Blob), mêmes coordonnées. Fichiers stockés avec localisation en France lorsque configurée.',
  },
  {
    type: 'paragraph',
    text: 'Hébergeur de la base de données : MongoDB Inc. (MongoDB Atlas), 229 W 43rd Street, 5th Floor, New York, NY 10036, États-Unis — https://www.mongodb.com — privacy@mongodb.com. Contenus éditoriaux et comptes d’administration hébergés en France (région Paris).',
  },
  {
    type: 'paragraph',
    text: 'Espace d’administration (/admin) : cookies strictement nécessaires à l’authentification des éditeurs ; ils ne concernent pas les visiteurs du site public.',
  },
  { type: 'heading', text: '3. Propriété intellectuelle et droits d’auteur' },
  {
    type: 'paragraph',
    text: 'L’ensemble de ce site (structure, textes, logos, photographies, mise en page) est protégé par la législation française et internationale relative au droit d’auteur et à la propriété intellectuelle. Toute reproduction, représentation, modification ou diffusion sans autorisation écrite préalable des éditeurs est interdite.',
  },
  {
    type: 'paragraph',
    text: 'Crédits visuels : Logo NGT — Emmanuel Curt ; photographies — Nadia Touché ; photographie page d’accueil — Campanile. Les noms, photographies et témoignages publiés le sont avec l’accord des personnes concernées ou de leur représentant légal.',
  },
  { type: 'heading', text: '4. Liens hypertextes' },
  {
    type: 'paragraph',
    text: 'La mise en place de liens vers www.ecolengt.com est autorisée, sous réserve qu’ils ne portent pas atteinte à l’image de l’école. Les liens vers des sites illégaux ou contraires à l’ordre public sont interdits. Les éditeurs ne sont pas responsables du contenu des sites tiers accessibles via des liens (réseaux sociaux, Google Maps après clic, etc.).',
  },
  { type: 'heading', text: 'Politique de confidentialité (RGPD)' },
  { type: 'heading', text: '5. Responsable du traitement' },
  {
    type: 'paragraph',
    text: 'Responsables du traitement : Mme Nadia Touché (EI, SIRET 330 870 999 00027) et M. Gilles Touché (EI, SIRET 348 798 752 00013). Contact : contact@ecolengt.com. Aucun délégué à la protection des données (DPO) n’a été désigné compte tenu de la nature des traitements.',
  },
  { type: 'heading', text: '6. Données traitées' },
  {
    type: 'paragraph',
    text: 'Le site ne propose pas de formulaire de contact en ligne, de compte visiteur, de newsletter ni de paiement en ligne. Les e-mails que vous nous envoyez depuis votre messagerie sont traités pour répondre à vos demandes (intérêt légitime / mesures précontractuelles). Des données techniques (adresse IP, logs) peuvent être enregistrées par l’hébergeur pour la sécurité et le fonctionnement du site.',
  },
  {
    type: 'paragraph',
    text: 'Certaines pages publient des données personnelles (noms, photos, témoignages d’élèves ou anciens élèves) avec consentement ou intérêt légitime, sous réserve du droit à l’image. Des comptes réservés aux éditeurs (e-mail, mot de passe chiffré) sont stockés pour la gestion du contenu.',
  },
  { type: 'heading', text: '7. Cookies et traceurs' },
  {
    type: 'paragraph',
    text: 'Sur le site public : aucun cookie de mesure d’audience, aucun pixel publicitaire. Les polices d’écriture sont hébergées sur le site (pas d’appel à Google Fonts au chargement).',
  },
  {
    type: 'paragraph',
    text: 'Carte OpenStreetMap : lorsque des coordonnées sont renseignées, une carte OpenStreetMap est affichée (données cartographiques © contributeurs OpenStreetMap). Cette intégration ne dépose pas de cookies publicitaires sur votre terminal. Un bouton permet d’ouvrir Google Maps dans un nouvel onglet ; en cliquant, vous quittez notre site et êtes soumis à la politique de Google.',
  },
  {
    type: 'paragraph',
    text: 'Compte tenu de l’absence de traceurs non essentiels sur le site public, aucun bandeau de consentement aux cookies n’est affiché pour les visiteurs.',
  },
  { type: 'heading', text: '8. Destinataires et sous-traitants' },
  {
    type: 'paragraph',
    text: 'Vercel Inc. (application et médias), MongoDB Inc. (base de données), contributeurs OpenStreetMap (affichage de la carte), Google (uniquement si vous ouvrez le lien Google Maps), fournisseur de messagerie professionnelle.',
  },
  { type: 'heading', text: '9. Transferts hors Union européenne' },
  {
    type: 'paragraph',
    text: 'Vercel Inc. et MongoDB Inc. sont établis aux États-Unis. Les transferts sont encadrés par les clauses contractuelles types de la Commission européenne et, le cas échéant, par la localisation des données en France.',
  },
  { type: 'heading', text: '10. Durées de conservation' },
  {
    type: 'paragraph',
    text: 'E-mails de contact : 3 ans maximum après le dernier échange. Contenus publiés (fiches élèves, témoignages) : jusqu’à retrait ou demande de suppression. Comptes d’administration : durée de la collaboration puis suppression. Logs hébergeur : durée limitée selon la politique de Vercel.',
  },
  { type: 'heading', text: '11. Sécurité' },
  {
    type: 'paragraph',
    text: 'Mesures raisonnables de protection (accès restreint, HTTPS). Aucune transmission sur Internet n’est totalement inviolable.',
  },
  { type: 'heading', text: '12. Vos droits' },
  {
    type: 'paragraph',
    text: 'Vous disposez des droits d’accès, rectification, effacement, limitation, opposition et portabilité (le cas échéant). Contact : contact@ecolengt.com — réponse sous un mois. Réclamation possible auprès de la CNIL : https://www.cnil.fr',
  },
  { type: 'heading', text: '13. Mineurs' },
  {
    type: 'paragraph',
    text: 'Les données d’élèves mineurs publiées sur le site ne le sont qu’avec l’accord du titulaire de l’autorité parentale.',
  },
])
