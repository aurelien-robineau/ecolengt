# SEO & GEO — prochaines étapes (côté éditeur / propriétaire du site)

Ce document liste ce que **vous** devez faire en dehors du code pour tirer parti des optimisations déjà intégrées dans le projet (métadonnées, JSON-LD, sitemap, `llms.txt`). **Aucune de ces actions ne modifie l’interface du site.**

---

## 1. URL canonique en production (prioritaire)

Les balises canonical, le sitemap, Open Graph et le JSON-LD utilisent `NEXT_PUBLIC_SERVER_URL`.

1. Choisissez **un seul** domaine public (ex. `https://www.ecolengt.fr` ou `https://ecolengt.fr`).
2. Dans **Vercel** → projet → **Settings** → **Environment Variables** :
   - Variable : `NEXT_PUBLIC_SERVER_URL`
   - Valeur : votre URL de production **sans** slash final
   - Environnements : **Production** (et Preview si vous voulez des URLs correctes sur les previews)
3. Redéployez après modification.

**Vérification** : ouvrez la page d’accueil en production → affichage du code source → cherchez `canonical` ou `application/ld+json` : les URLs doivent pointer vers votre domaine, pas `localhost` ni une URL Vercel temporaire si vous avez un nom de domaine custom.

Voir aussi [DEPLOYMENT.md](./DEPLOYMENT.md) pour le détail des variables d’environnement.

---

## 2. Nom de domaine et redirections

1. Ajoutez votre domaine custom dans Vercel (**Domains**).
2. Définissez la version **www** ou **sans www** comme principale ; configurez une redirection 301 de l’autre vers la principale.
3. Assurez-vous que `NEXT_PUBLIC_SERVER_URL` correspond exactement à la version principale (protocole `https` inclus).

Objectif : une seule URL canonique pour Google et les LLM, sans contenu dupliqué.

---

## 3. Données dans Payload CMS (contenu = SEO local)

Le JSON-LD et les textes dynamiques s’appuient sur les réglages du global **Site settings** :

| Champ / zone | Pourquoi c’est important |
|--------------|---------------------------|
| Nom court de l’école | Titres et `WebSite` schema |
| Adresse Aix-en-Provence (rue, CP, ville) | Référencement local « école de batterie Aix » |
| Téléphone, e-mail | Rich results / confiance |
| Adresse **stages intensifs** (Razès) | Centre national stages batterie |
| Liens Instagram / Facebook | `sameAs` dans le JSON-LD |
| Année de fondation | `foundingDate` si renseignée |

**À contrôler** : ville « Razès » (ou libellé exact du lieu), code postal et lien Google Maps pour les deux adresses.

---

## 4. Google Search Console

1. Créez une propriété sur [Google Search Console](https://search.google.com/search-console) pour votre domaine (de préférence **propriété de domaine** si vous gérez le DNS).
2. Validez la propriété (DNS TXT ou fichier HTML — Vercel facilite souvent le DNS).
3. **Soumettez le sitemap** :  
   `https://VOTRE-DOMAINE/sitemap.xml`
4. Après quelques jours : onglet **Performances** → requêtes contenant « batterie », « Aix », « stage », « Dante Agostini », etc.

Les premiers classements prennent en général **plusieurs semaines** ; le sitemap accélère l’indexation, pas le positionnement immédiat.

---

## 5. Bing Webmaster Tools (recommandé)

1. [Bing Webmaster Tools](https://www.bing.com/webmasters) → ajoutez le site.
2. Import possible depuis Google Search Console.
3. Soumettez le même sitemap : `https://VOTRE-DOMAINE/sitemap.xml`

Utile pour Bing et certains assistants qui s’appuient sur cet index.

---

## 6. Fichier `llms.txt` (GEO / moteurs génératifs)

Le fichier est servi à la racine : **`/llms.txt`**

1. En production, ouvrez `https://VOTRE-DOMAINE/llms.txt` et vérifiez que le contenu est lisible.
2. Si le nom de domaine ou les URLs importantes changent, mettez à jour `public/llms.txt` dans le repo (puis redéployez).

Ce fichier aide les crawlers IA à résumer correctement : école à Aix, réseau Dante Agostini, stages à Razès.

---

## 7. Contrôles techniques rapides (après déploiement)

| URL | Attendu |
|-----|---------|
| `/robots.txt` | `Allow: /`, `Sitemap: https://…/sitemap.xml`, `Disallow: /admin` |
| `/sitemap.xml` | Liste des pages + articles + fiches élèves |
| Page d’accueil (code source) | `<script type="application/ld+json">` avec `MusicSchool`, Dante Agostini, Razès |

**Outils utiles (gratuits)** :

- [Google Rich Results Test](https://search.google.com/test/rich-results) — coller l’URL d’accueil
- [Schema Markup Validator](https://validator.schema.org/) — coller le JSON-LD extrait du code source

---

## 8. Stratégie contenu (hors technique, fort impact)

Le code pose les bases ; le **positionnement** se joue aussi sur le contenu éditorial dans Payload :

- **Actualités** : articles avec mots naturels (« stage », « examen NGT », « cours adultes », « Aix », etc.).
- **Stages intensifs** : textes d’intro clairs (dates, public, lieu Razès, lien réseau Dante Agostini).
- **Anciens élèves** : profils complétés (noms, métiers) — chaque fiche est dans le sitemap.

Évitez le « keyword stuffing » dans les textes visibles : les meta descriptions le font déjà de façon ciblée.

---

## 9. Réseau Dante Agostini (légitimité & cohérence)

- Sur le site officiel du réseau, vérifiez que votre école est bien référencée avec la **bonne URL** vers votre domaine.
- Gardez une formulation cohérente : « École de Batterie NGT », « méthode Dante Agostini », « stages à Razès ».

Cela renforce la confiance des moteurs et des LLM qui croisent plusieurs sources.

---

## 10. Suivi dans le temps (mensuel, 15 min)

1. Search Console : impressions / clics sur les requêtes locales et « stage batterie ».
2. Vérifier qu’aucune erreur **Couverture** ou **Données structurées** n’apparaît.
3. Après chaque grosse mise à jour de contenu : pas besoin de resoumettre le sitemap à chaque fois ; Google le revisite régulièrement.

---

## Ce qui est déjà fait dans le code (pour référence)

- Métadonnées (title, description, Open Graph, Twitter, canonical) par page
- Mots-clés géographiques et Dante Agostini / Razès
- JSON-LD global (`MusicSchool`, centre stages, `WebSite`)
- `sitemap.xml` et `robots.txt` générés par Next.js
- `public/llms.txt` pour le GEO

**Aucune action ci-dessus ne nécessite de modifier l’UI du site.**

---

## Ordre recommandé

1. Domaine + `NEXT_PUBLIC_SERVER_URL` + redéploiement  
2. Vérifier adresses / contacts dans Payload  
3. Search Console + soumission du sitemap  
4. Rich Results Test sur la home  
5. Contenu éditorial (stages, actualités) sur le long terme  

Des questions ou un domaine définitif à intégrer dans `llms.txt` ? Mettez à jour `public/llms.txt` et les variables Vercel en conséquence.
