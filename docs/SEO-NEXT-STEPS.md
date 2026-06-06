# SEO & GEO — prochaines étapes (côté éditeur / propriétaire du site)

Ce document liste ce que **vous** devez faire en dehors du code pour tirer parti des optimisations déjà intégrées dans le projet (métadonnées, JSON-LD, sitemap, `llms.txt`). **Aucune de ces actions ne modifie l’interface du site.**

**Contexte important** : ce site **remplace entièrement** l’ancien site public, **à la même adresse** (même nom de domaine). L’ancien site date d’environ **15 ans** et a été créé avec un **logiciel Apple de création de sites** (très probablement **iWeb**, parfois hébergé via MobileMe puis recopié chez un hébergeur classique). Apple ne maintient plus ces outils : il n’y a **pas** de panneau d’admin, **pas** d’export propre des URLs et souvent **pas** de `sitemap.xml` fiable.

**Site séparé pour les stages intensifs** : les stages intensifs étaient jusqu’ici présentés sur un **autre domaine**, [http://stagedebatterie.com/](http://stagedebatterie.com/). Le nouveau site les intègre désormais (page `/stages-intensifs`, calendrier, tarifs). Ce domaine devra **rediriger en 301** vers le site principal — idéalement vers **`/stages-intensifs`** plutôt que vers la home — pour conserver le référencement et les liens entrants (réseau Dante Agostini, favoris, Google). Voir la section **1.5**.

La bonne nouvelle : un site aussi ancien est en général **peu indexé** (peu de pages, peu de contenu structuré pour Google). La migration SEO consiste surtout à **couvrir les quelques URLs encore connues de Google** et des liens externes — pas à recréer des centaines de redirections comme sur un CMS moderne.

---

## 1. Préparer la migration depuis l’ancien site (prioritaire)

À faire **avant** de basculer le domaine vers Vercel (ou le jour J, au plus tard dans les 48 h suivant la mise en ligne).

### 1.1 Inventorier les URLs de l’ancien site (sans export automatique)

**Ne comptez pas** sur un export depuis l’ancien outil Apple. Procédez par recoupement :

1. **Tant que l’ancien site est encore en ligne** : parcourez le menu et chaque page importante ; copiez l’URL affichée dans le navigateur (y compris les variantes du type `…/Accueil.html`, `…/Contact.html`, `index.html` — iWeb générait souvent des noms de fichiers ou dossiers peu intuitifs).
2. **Ce que Google a encore en mémoire** (souvent la source la plus utile) :
   - recherche Google : `site:votre-domaine.fr` (remplacez par votre domaine) → liste des URLs encore indexées ;
   - [Google Search Console](https://search.google.com/search-console) → **Performances** → onglet **Pages** (si vous avez déjà la propriété ; sinon créez-la dès que possible, même avant la bascule).
3. **Archives web** : [Internet Archive](https://web.archive.org/) → entrez votre domaine → parcourez les captures datées pour retrouver d’anciennes pages oubliées dans le menu actuel.
4. **Liens depuis l’extérieur** : site Dante Agostini, annuaires, réseaux sociaux, favoris papier/QR codes — notez les chemins exacts qu’ils utilisent.
5. **Ancien site stages** : [stagedebatterie.com](http://stagedebatterie.com/) — inventoriez les URLs indexées (`site:stagedebatterie.com`) et les pages encore liées depuis l’extérieur ; elles seront couvertes par des redirections vers le nouveau site (section 1.5).

**À ignorer ou traiter en dernier** : `/sitemap.xml` sur l’ancien site (souvent absent ou obsolète), pages de test, galeries photo très anciennes sans trafic.

Pour chaque URL **réellement utile** (vue dans Google, lien partenaire, page encore partagée), notez : **chemin exact**, **équivalent sur le nouveau site** (tableau section 1.2), ou « rediriger vers `/` » si le contenu n’existe plus.

### 1.2 Table de correspondance et redirections 301

Pour **chaque** URL de l’ancien site qui ne correspond **pas exactement** au même chemin sur le nouveau site, il faut une **redirection 301 permanente** vers la page la plus proche (ou la home en dernier recours).

| Ancienne URL (exemples typiques iWeb / site statique)         | Nouvelle URL cible                                                                                                                                                                 |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`, `/index.html`, `/Accueil.html`                           | `/`                                                                                                                                                                                |
| `/Contact.html`, `/contact.html`                              | `/contact`                                                                                                                                                                         |
| Page « stages » ou « tarifs » sous un nom `.html`             | `/stages-intensifs` ou `/tarifs`                                                                                                                                                   |
| Ancienne page actualités / blog                               | `/actualite` ou `/actualite/[slug]` si vous recréez l’article                                                                                                                      |
| **stagedebatterie.com** (racine, `www`, ou sous-pages)        | **`/stages-intensifs`** (cible préférée) ; calendrier ou tarifs si l’ancienne URL correspondait à un contenu précis → `/stages-intensifs/calendrier` ou `/tarifs#stages-intensifs` |
| _À compléter après inventaire (souvent 5–15 lignes, pas 100)_ | …                                                                                                                                                                                  |

**Pages du nouveau site** (référence pour la correspondance) :

| Chemin                         | Contenu             |
| ------------------------------ | ------------------- |
| `/`                            | Accueil             |
| `/contact`                     | Contact             |
| `/actualite`                   | Actualités          |
| `/actualite/[slug]`            | Article             |
| `/livre-dor`                   | Livre d’or          |
| `/anciens-eleves`              | Anciens élèves      |
| `/eleves/[slug]`               | Fiche élève         |
| `/tom-tom`                     | Association Tom Tom |
| `/stages-intensifs`            | Stages intensifs    |
| `/stages-intensifs/calendrier` | Calendrier stages   |
| `/tarifs`                      | Tarifs              |
| `/mentions-legales`            | Mentions légales    |

Une redirection interne existe déjà dans le code : `/stages-intensifs/tarifs` → `/tarifs#stages-intensifs`. **Toutes les autres** anciennes URLs doivent être listées par vous et ajoutées côté développeur dans `next.config.ts` (section `redirects`), puis redéployées **avant** ou **immédiatement après** la bascule DNS.

**À transmettre au développeur** : un fichier ou tableau `ancienne URL → nouvelle URL` (une ligne par redirection). Même une liste courte suffit si le vieux site n’avait que quelques pages indexées. Sans redirections, les liens depuis Google, les favoris et les sites partenaires afficheront des **404** jusqu’à ce que Google oublie ces URLs (plusieurs mois).

**Fichier iWeb sur un vieux Mac** : si vous retrouvez encore le projet `.iWeb` / export « publier sur un dossier », servez-vous-en pour le **texte et les images** à recopier dans Payload — pas pour régénérer automatiquement les URLs du nouveau site.

### 1.3 Jour de bascule (même domaine)

1. Le domaine pointe vers **Vercel** (plus vers l’hébergeur de l’ancien site).
2. `NEXT_PUBLIC_SERVER_URL` est déjà la **URL canonique finale** (voir section 2).
3. Vérifiez en navigation privée : home, contact, stages, une ancienne URL connue → doit rediriger ou afficher la bonne page (pas d’erreur SSL, pas de page par défaut de l’ancien hébergeur).
4. **Ne pas** bloquer les crawlers (`robots.txt` en `Disallow: /` sur la prod) pendant la migration.
5. L’ancien hébergement peut être arrêté **après** validation des redirections ; inutile de le laisser en parallèle sur le même domaine.

### 1.4 Après la mise en ligne (2 à 4 semaines)

1. **Search Console** (même propriété qu’avant — pas de « déménagement de domaine » si l’adresse ne change pas) :
   - onglet **Pages** / **Couverture** : surveiller les **404** et **redirections** ;
   - corriger le tableau de redirections dès qu’une ancienne URL importante apparaît en erreur.
2. **Inspection d’URL** : demander l’indexation de la home, `/stages-intensifs`, `/contact` et des pages stratégiques modifiées.
3. Resoumettre le sitemap : `https://VOTRE-DOMAINE/sitemap.xml` (section 5).
4. Un léger **flottement** de positionnement pendant 2 à 6 semaines est normal après un refonte ; sur un site iWeb très ancien, l’impact est souvent **faible** car le référencement de départ était limité. Le nouveau site (contenu structuré, sitemap, JSON-LD) peut au contraire **améliorer** la visibilité sur le moyen terme.
5. Les 404 restants sur d’anciennes URLs `.html` peuvent être traités **au fil de l’eau** dès qu’ils apparaissent dans Search Console — inutile de deviner toutes les URLs possibles d’iWeb si elles ne sont plus indexées.

**Ce qui ne change pas** avec le même domaine : vous gardez en principe l’historique Search Console (si la propriété existait), les liens entrants et la notoriété du **nom de domaine**. En revanche, les **chemins** du nouveau site (`/contact`, `/stages-intensifs`, etc.) ne correspondront presque jamais aux anciens fichiers iWeb : les **301** sur les seules URLs encore connues suffisent dans la majorité des cas.

### 1.5 Redirection du domaine stagedebatterie.com

Les stages intensifs étaient hébergés sur **[http://stagedebatterie.com/](http://stagedebatterie.com/)** ; ce contenu est désormais sur le site principal. **Ne laissez pas** ce domaine afficher l’ancien site en parallèle : configurez une **redirection 301 permanente** de tout `stagedebatterie.com` (et `www.stagedebatterie.com`) vers le site de l’école.

**Cible recommandée** : la page stages du nouveau site — **`https://VOTRE-DOMAINE/stages-intensifs`** — plutôt que la home, pour que Google et les visiteurs arrivent directement sur le bon sujet.

| Ancienne URL (stagedebatterie.com)         | Nouvelle URL cible                                                  |
| ------------------------------------------ | ------------------------------------------------------------------- |
| `/` (racine)                               | `/stages-intensifs`                                                 |
| Page calendrier / dates (si URL distincte) | `/stages-intensifs/calendrier`                                      |
| Page tarifs stages (si URL distincte)      | `/tarifs#stages-intensifs`                                          |
| Toute autre URL                            | `/stages-intensifs` (ou équivalent le plus proche après inventaire) |

**Mise en œuvre technique** (au choix, selon où le domaine est géré) :

1. **DNS + hébergeur du domaine stagedebatterie.com** : redirection 301 au niveau du registrar, de Cloudflare, ou de l’hébergeur actuel vers `https://VOTRE-DOMAINE/stages-intensifs`.
2. **Vercel** : ajouter `stagedebatterie.com` (et `www`) comme **domaine secondaire** du même projet Next.js, puis définir une redirection dans `next.config.ts` (toutes les requêtes de ce host → `/stages-intensifs` sur le domaine principal). À transmettre au développeur avec le domaine principal définitif.
3. **HTTPS** : certificat valide sur stagedebatterie.com pendant la redirection (évite les avertissements navigateur).

**Search Console** : si une propriété existait pour `stagedebatterie.com`, gardez-la quelques mois pour surveiller les impressions en baisse et les erreurs ; les redirections 301 transfèrent en général le signal SEO vers la nouvelle URL. Mettez à jour les liens sur le **site Dante Agostini**, réseaux sociaux et annuaires pour pointer directement vers `/stages-intensifs` sur le domaine principal (section 10).

**Vérification** : en navigation privée, ouvrez `http://stagedebatterie.com/` et `https://stagedebatterie.com/` → doit aboutir en **une** redirection 301 vers `https://VOTRE-DOMAINE/stages-intensifs` (pas de chaîne de plusieurs redirections si possible).

---

## 2. URL canonique en production

Les balises canonical, le sitemap, Open Graph et le JSON-LD utilisent `NEXT_PUBLIC_SERVER_URL`.

1. Utilisez **exactement** le domaine public actuel de l’école (celui de l’ancien site, une fois la bascule faite), en **une seule** variante (ex. `https://www.ecolengt.fr` **ou** `https://ecolengt.fr`, pas les deux comme canoniques).
2. Dans **Vercel** → projet → **Settings** → **Environment Variables** :
   - Variable : `NEXT_PUBLIC_SERVER_URL`
   - Valeur : votre URL de production **sans** slash final
   - Environnements : **Production** (et Preview si vous voulez des URLs correctes sur les previews)
3. Redéployez après modification.

**Vérification** : ouvrez la page d’accueil en production → affichage du code source → cherchez `canonical` ou `application/ld+json` : les URLs doivent pointer vers votre domaine définitif, pas `localhost` ni une URL Vercel temporaire une fois le domaine custom attaché.

Voir aussi [DEPLOYMENT.md](./DEPLOYMENT.md) pour le détail des variables d’environnement.

---

## 2.5 Vérifier le domaine sur Resend (e-mail — hors SEO, mais obligatoire)

**Ce n’est pas une action SEO** : Resend sert à envoyer les e-mails transactionnels du site (au minimum la **réinitialisation de mot de passe** de l’admin Payload). Sans domaine vérifié, ces e-mails peuvent être refusés ou finir en spam.

**À faire avant ou au moment de la mise en production** :

1. Compte [Resend](https://resend.com) → **Domains** → ajouter le **même domaine public** que le site (ex. `ecolengt.fr` ou `ecolengt.com`, selon votre `EMAIL_FROM_ADDRESS`).
2. Copier les enregistrements DNS demandés par Resend (SPF, DKIM, etc.) chez votre registrar / hébergeur DNS — comme pour Vercel, souvent au même endroit que les enregistrements du site.
3. Attendre la validation dans le tableau de bord Resend (quelques minutes à quelques heures).
4. Dans **Vercel** → **Environment Variables** (Production) :
   - `RESEND_API_KEY` — clé API Resend ;
   - `EMAIL_FROM_ADDRESS` — adresse **@votre-domaine-vérifié** (ex. `no-reply@ecolengt.com`, voir `.env.example`) ;
   - `EMAIL_FROM_NAME` — libellé affiché (ex. « École de Batterie NGT »).
5. Redéployez, puis testez : admin Payload → mot de passe oublié → l’e-mail doit arriver depuis votre domaine.

Tant que le domaine n’est pas vérifié sur Resend, considérez la **récupération de compte admin** comme non fiable en production — indépendamment du référencement.

---

## 3. Nom de domaine et redirections (www / sans www)

1. Le domaine custom est ajouté dans Vercel (**Domains**) — en remplacement de l’ancien pointage DNS.
2. Définissez la version **www** ou **sans www** comme principale ; configurez une redirection 301 de l’autre vers la principale (comme sur l’ancien site, si une variante était déjà canonique — **évitez de changer** www ↔ sans www le jour J sans raison).
3. Assurez-vous que `NEXT_PUBLIC_SERVER_URL` correspond exactement à la version principale (protocole `https` inclus).

Objectif : une seule URL canonique pour Google et les LLM, sans contenu dupliqué entre ancienne et nouvelle version du site.

---

## 4. Données dans Payload CMS (contenu = SEO local)

Le JSON-LD et les textes dynamiques s’appuient sur les réglages du global **Site settings** :

| Champ / zone                             | Pourquoi c’est important                      |
| ---------------------------------------- | --------------------------------------------- |
| Nom court de l’école                     | Titres et `WebSite` schema                    |
| Adresse Aix-en-Provence (rue, CP, ville) | Référencement local « école de batterie Aix » |
| Téléphone, e-mail                        | Rich results / confiance                      |
| Adresse **stages intensifs** (Razès)     | Centre national stages batterie               |
| Liens Instagram / Facebook               | `sameAs` dans le JSON-LD                      |
| Année de fondation                       | `foundingDate` si renseignée                  |

**À contrôler** : ville « Razès » (ou libellé exact du lieu), code postal et lien Google Maps pour les deux adresses.

Reprenez depuis l’ancien site tout contenu **factuel** utile au référencement (adresses, horaires, libellés stages) pour éviter une régression perçue par Google sur les requêtes locales.

---

## 5. Google Search Console

1. Réutilisez la propriété existante sur [Google Search Console](https://search.google.com/search-console) pour **le même domaine** (pas besoin d’outil « changement d’adresse » si seul le site change, pas le nom de domaine).
2. Si la propriété n’existait pas : créez-la (de préférence **propriété de domaine** si vous gérez le DNS) et validez (DNS TXT ou fichier HTML).
3. **Soumettez le nouveau sitemap** après la bascule :  
   `https://VOTRE-DOMAINE/sitemap.xml`
4. Surveillez les **404** liés à d’anciennes URLs (section 1.4).
5. Après quelques jours : onglet **Performances** → requêtes contenant « batterie », « Aix », « stage », « Dante Agostini », etc.

Les premiers classements prennent en général **plusieurs semaines** ; le sitemap accélère l’indexation des **nouvelles** URLs, pas le positionnement immédiat. Les **301** protègent surtout les URLs déjà bien classées.

---

## 6. Bing Webmaster Tools (recommandé)

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → site déjà enregistré ou à ajouter.
2. Import possible depuis Google Search Console.
3. Soumettez le même sitemap : `https://VOTRE-DOMAINE/sitemap.xml`

Utile pour Bing et certains assistants qui s’appuient sur cet index.

---

## 7. Fichier `llms.txt` (GEO / moteurs génératifs)

Le fichier est servi à la racine : **`/llms.txt`**

1. En production, ouvrez `https://VOTRE-DOMAINE/llms.txt` et vérifiez que le contenu est lisible.
2. Si le nom de domaine ou les URLs importantes changent, mettez à jour `public/llms.txt` dans le repo (puis redéployez).

Ce fichier aide les crawlers IA à résumer correctement : école à Aix, réseau Dante Agostini, stages à Razès. Après remplacement du site, les assistants mettront quelques semaines à refléter le nouveau contenu.

---

## 8. Contrôles techniques rapides (après déploiement)

| URL                                                         | Attendu                                                                         |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `/robots.txt`                                               | `Allow: /`, `Sitemap: https://…/sitemap.xml`, `Disallow: /admin`                |
| `/sitemap.xml`                                              | Liste des pages + articles + fiches élèves                                      |
| Page d’accueil (code source)                                | `<script type="application/ld+json">` avec `MusicSchool`, Dante Agostini, Razès |
| Ancienne URL à fort trafic (test manuel)                    | Redirection 301 ou page 200 sur le bon contenu — **pas** de 404                 |
| `http://stagedebatterie.com/` (et variante `www` / `https`) | Redirection 301 vers `https://VOTRE-DOMAINE/stages-intensifs`                   |

**Outils utiles (gratuits)** :

- [Google Rich Results Test](https://search.google.com/test/rich-results) — coller l’URL d’accueil
- [Schema Markup Validator](https://validator.schema.org/) — coller le JSON-LD extrait du code source

---

## 9. Stratégie contenu (hors technique, fort impact)

Le code pose les bases ; le **positionnement** se joue aussi sur le contenu éditorial dans Payload :

- **Actualités** : republiez ou créez des articles avec mots naturels (« stage », « examen NGT », « cours adultes », « Aix », etc.) ; les anciens articles **sans** redirection 301 vers un équivalent disparaîtront de l’index.
- **Stages intensifs** : textes d’intro clairs (dates, public, lieu Razès, lien réseau Dante Agostini).
- **Anciens élèves** : profils complétés (noms, métiers) — chaque fiche est dans le sitemap.

Évitez le « keyword stuffing » dans les textes visibles : les meta descriptions le font déjà de façon ciblée.

---

## 10. Réseau Dante Agostini (légitimité & cohérence)

- Sur le site officiel du réseau, vérifiez que votre école est bien référencée avec la **bonne URL** (souvent déjà correcte si le domaine ne change pas — contrôlez après la bascule que le lien ne pointe pas vers une page supprimée).
- Remplacez les liens encore pointant vers **stagedebatterie.com** par **`https://VOTRE-DOMAINE/stages-intensifs`** (la redirection 301 couvre les anciens liens, mais un lien direct est préférable).
- Gardez une formulation cohérente : « École de Batterie NGT », « méthode Dante Agostini », « stages à Razès ».
- Mettez à jour les profils **Google Business**, réseaux sociaux et annuaires locaux si l’URL de contact ou les horaires ont changé sur le nouveau site.

Cela renforce la confiance des moteurs et des LLM qui croisent plusieurs sources.

---

## 11. Suivi dans le temps (mensuel, 15 min)

1. Search Console : impressions / clics sur les requêtes locales et « stage batterie » ; comparer avec la période **avant** refonte si possible.
2. Vérifier qu’aucune erreur **Couverture** ou **Données structurées** n’apparaît ; traiter en priorité les 404 sur d’anciennes URLs.
3. Après chaque grosse mise à jour de contenu : pas besoin de resoumettre le sitemap à chaque fois ; Google le revisite régulièrement.
4. Tant que des 404 d’anciennes URLs persistent : compléter le tableau de redirections (section 1.2).

---

## Ce qui est déjà fait dans le code (pour référence)

- Métadonnées (title, description, Open Graph, Twitter, canonical) par page
- Mots-clés géographiques et Dante Agostini / Razès
- JSON-LD global (`MusicSchool`, centre stages, `WebSite`)
- `sitemap.xml` et `robots.txt` générés par Next.js
- `public/llms.txt` pour le GEO
- Exemple de redirection 301 : `/stages-intensifs/tarifs` → `/tarifs#stages-intensifs`

**Les redirections depuis l’ancien site** (autres chemins) doivent être ajoutées dans `next.config.ts` à partir de votre tableau de correspondance.

**Redirection stagedebatterie.com** : domaine secondaire sur Vercel et/ou redirections par host dans `next.config.ts` vers `/stages-intensifs` (section 1.5).

**Aucune action ci-dessus ne nécessite de modifier l’UI du site.**

---

## Ordre recommandé (remplacement à la même adresse, ancien site iWeb)

1. `site:votre-domaine.fr` + `site:stagedebatterie.com` + navigation manuelle + Wayback Machine → liste courte des URLs à préserver
2. Tableau **ancienne → nouvelle** URL (domaine principal + stagedebatterie.com) + redirections 301 + redéploiement
3. Domaine principal sur Vercel + **redirection stagedebatterie.com → `/stages-intensifs`** + `NEXT_PUBLIC_SERVER_URL` + redirection www / sans www
4. **Resend** : vérifier le domaine (DNS) + `RESEND_API_KEY` / `EMAIL_FROM_*` sur Vercel (section 2.5 — hors SEO, obligatoire pour les e-mails admin)
5. Bascule DNS / coupure de l’ancien hébergement
6. Vérifier adresses / contacts dans Payload
7. Search Console : sitemap + surveillance des 404
8. Rich Results Test sur la home + test de quelques anciennes URLs
9. Contenu éditorial (stages, actualités) sur le long terme

Des questions, des URLs anciennes à mapper, ou un domaine définitif à intégrer dans `llms.txt` ? Transmettez le tableau de redirections au développeur et mettez à jour `public/llms.txt` / les variables Vercel en conséquence.
