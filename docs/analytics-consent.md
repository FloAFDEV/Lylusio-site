# Mesure d'audience, consentement et Google Ads

## Fonctionnement

| Choix du visiteur | Google tag (gtag.js) | Signaux Consent Mode v2 | Effet observé |
|---|---|---|---|
| Aucun choix / croix / Échap | non chargé | — | aucune requête Google, aucun cookie |
| Tout refuser | non chargé | — | aucune requête Google, aucun cookie |
| Analytics seul | chargé | `analytics_storage` granted, `ad_*` denied | pages vues GA4 (`gcs=G101`), aucun remarketing, aucun `_gcl_*` |
| Marketing seul | non chargé | — | rien : la destination Ads est dans le tag GA4 |
| Tout accepter | chargé | 4 × granted | GA4 + destination Google Ads (`gcs=G111`) |

- Code : `lib/consent.ts` (stockage, signaux), `lib/google-tag.ts` (chargement, mises à jour, retrait), `components/providers/analytics-provider.tsx`, `components/CookieBanner.tsx`.
- `consent default` (4 × denied) est toujours poussé avant `config`.
- Retrait : `consent update` à denied, `ga-disable-<ID>` à true, suppression des cookies `_ga*` et `_gcl_*` du domaine (et de `_gcl_ls`).
- Le Google tag configure une destination **Google Ads** côté Google (non visible dans le dépôt). Sans consentement Marketing, cette destination émet un ping sans cookie (`gcs=G100/G101`) vers `pagead2.googlesyndication.com`, d'abord en `fetch` puis en image. Cette origine est volontairement absente de `connect-src` **et** de `img-src` : le navigateur bloque les deux (erreurs CSP attendues en console dans ce cas). Ne pas réintroduire `https:` dans `img-src`.
- Limite : un événement collecté juste avant un retrait (ex. `scroll`) peut encore partir dans le lot GA4 en attente ; aucun événement n'est collecté après le retrait.
- Les cookies déposés par Google sur ses propres domaines (Maps, YouTube, doubleclick) ne peuvent pas être supprimés par le site.

## Pages vues

- Une seule source : le `config` du Google tag envoie la page courante au chargement (page d'arrivée incluse, avec ses paramètres d'URL comme `gclid`), puis la **mesure améliorée GA4 « changements de page basés sur l'historique »** suit les navigations App Router.
- Aucun `page_view` manuel, sauf à la réacceptation dans un même document sur une page non encore mesurée.
- **Dépendance GA4 :** si le réglage « changements de page basés sur l'historique du navigateur » est désactivé dans GA4, les navigations internes ne seront plus mesurées.

## Événements

| Événement | Déclencheur | Paramètres |
|---|---|---|
| `page_view` | Google tag + mesure améliorée | standards GA4 |
| `phone_click` | clic sur un lien `tel:` ou un bouton « Réserver » qui ouvre `tel:` | `cta_location`, `cta_intent` (`booking` / `contact`), `service` |
| `email_click` | clic sur un lien `mailto:` | `cta_location`, `cta_intent` (`contact`), `service` |

- `cta_location` : `hero`, `floating_cta`, `footer_cta`, `footer_contact`, `services_preview`, `service_carousel`, `service_card`, `page_hero`, `page_cta`, `contact_card`, `payment_info`, ou `<page>_content` par défaut (ex. `blog_post_content`).
- `service` : `astrologie`, `reiki`, `therapie_holistique`, `accompagnement`, `accompagnement_transition`, `none`.
- Ajouter un lien de contact : `href={PHONE_TEL_HREF}` suffit (écouteur délégué). Préciser le contexte avec `data-cta-location`, `data-cta-intent="booking"`, `data-service`. Pour un bouton sans lien : `trackContactClick("phone", {...})`.
- `phone_click` est une **intention d'appel**, pas un rendez-vous confirmé (la réservation se fait au téléphone, hors site).
- Supprimés : `booking_click`, `contact_click` (remplacés), `service_view` (redondant avec `page_view`), `cta_click` et `article_view` (jamais appelés).

## À faire dans GA4 / Google Ads (hors code)

1. **GA4 › Admin › Événements › Créer des événements** : supprimer ou désactiver `ads_conversion_Prise_de_rendez_vous_1` (condition `page_path` commençant par `/calendly.com/lylusio-fr`, Calendly n'est plus utilisé).
2. **GA4 › Admin › Événements clés** : après le déploiement et l'apparition de `phone_click` (24-48 h), décider de l'événement clé (proposition : `phone_click`, ou un événement créé `booking_phone_click` avec la condition `cta_intent = booking`). Retirer `purchase` s'il n'a pas d'usage.
3. **GA4 › Flux de données › Mesure améliorée** : vérifier que « Changements de page basés sur l'historique du navigateur » reste activé.
4. **Google Ads › Objectifs › Conversions** : vérifier si « Prise de rendez-vous » est importée depuis GA4, la remplacer par l'événement clé retenu (action secondaire au départ), puis contrôler le statut dans le diagnostic des conversions.
5. **Google Ads / Google tag** : vérifier la destination `AW-…` liée au Google tag GA4 et la conformité du remarketing avec les règles Google sur les catégories sensibles (santé, bien-être, thérapie).

## CSP

- `connect-src` : origines GA4 + Ads observées ; `ad.doubleclick.net` et `stats.g.doubleclick.net` ne servent qu'avec Marketing accepté.
- `img-src` : `'self' data: blob:`, `admin.lylusio.fr`, `i.ytimg.com`, `www.transparenttextures.com` (texture de /ressources), `www.google.com`, `googleads.g.doubleclick.net`, `www.googleadservices.com`. Vérifié sur toutes les URL du sitemap (test E2E).
- Émojis Facebook collés dans les articles WordPress : remplacés par l'émoji texte (`replaceFacebookEmojiImages`), plutôt que d'autoriser Facebook.
- Une nouvelle image externe (contenu WordPress, CSS) doit être ajoutée explicitement à `img-src` dans `next.config.ts`.

## Tests

```bash
npm test            # unitaires (node --test)
npm run build
npm run test:e2e    # Playwright sur le build local, servi sous https://lylusio.fr ; hits Google interceptés (204)
```
