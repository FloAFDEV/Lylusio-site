# Guide d'intégration SEO - Lylusio

## Fichiers créés et leur emplacement

### 1. Sitemap XML

**Fichier**: `public/sitemap.xml`

-   Contient toutes les URLs du site en format absolu (https://lylusio.fr/...)
-   Mis à jour avec la date du jour
-   Priorités et fréquences de mise à jour définies

### 2. Robots.txt

**Fichier**: `public/robots.txt`

-   Autorisation d'indexation pour tous les robots
-   Référence vers le sitemap

### 3. Métadonnées SEO

**Composant réutilisable**: `src/components/SEO/SEOHead.tsx`

-   Title dynamique
-   Meta description optimisée
-   Canonical URL absolu
-   Open Graph complet
-   Twitter Cards
-   Geo tags pour SEO local

**Données structurées JSON-LD**: `src/components/SEO/StructuredData.tsx`

-   Schema LocalBusiness (Lylusio)
-   Schema Person (Émilie Perez)
-   Schema WebSite
-   BreadcrumbList

### 4. Google Search Console (GSC)

#### Méthode 1: Balise meta (RECOMMANDÉE)

Dans `index.html`, ligne 8:

```html
<meta name="google-site-verification" content="VOTRE_CODE_GSC_ICI" />
```

**Action**: Remplacez `VOTRE_CODE_GSC_ICI` par le code fourni par GSC.

#### Méthode 2: Fichier de vérification

**Fichier**: `public/googleXXXXXXXXXXXXXXXX.html`
**Action**: Renommez ce fichier avec le nom exact fourni par Google (ex: `google1234567890abcdef.html`).

### 5. Google Analytics 4 (GA4)

#### Script principal (index.html)

Dans `index.html`, lignes 69-85:

-   Chargé uniquement en production (lylusio.fr)
-   Anonymisation IP activée
-   Cookies sécurisés

**Action**: Remplacez `G-XXXXXXXXXX` par votre ID de mesure GA4 à 2 endroits.

#### Hook React pour tracking

**Fichier**: `src/hooks/useAnalytics.ts`

-   `initGA()`: Initialise GA4
-   `usePageTracking()`: Track les pages vues automatiquement
-   `useAnalyticsEvent()`: Événements personnalisés

**Événements disponibles**:

-   `trackBookingClick(service)`: Clic sur réservation
-   `trackContactClick('phone' | 'email')`: Clic contact
-   `trackServiceView(serviceName)`: Vue d'un service
-   `trackBlogArticleView(slug, title)`: Vue d'un article
-   `trackCTAClick(ctaName, location)`: Clic sur CTA

#### Intégration dans App.tsx

Le tracking est déjà intégré via:

-   `initGA()` au montage de l'app
-   `usePageTracking()` dans `ScrollToTopOnRoute`

### 6. Configuration Vercel

**Fichier**: `vercel.json`

-   Redirections 301 depuis les anciennes URLs WordPress
-   Headers de sécurité (X-Frame-Options, XSS Protection, etc.)
-   Cache pour assets statiques
-   Configuration sitemap/robots

### 7. Images optimisées WebP

Les images tarifs sont maintenant en WebP:

-   `src/assets/tarif-theme-natal.webp`
-   `src/assets/tarif-transits.webp`
-   `src/assets/tarif-reiki.webp`
-   `src/assets/tarif-accompagnement.webp`
-   `src/assets/tarif-bilan-pro.webp`

---

## Actions à effectuer

<!-- ### Immédiat
1. **GA4**: Remplacer `G-XXXXXXXXXX` dans `index.html` (2 occurrences)
2. **GSC**: Ajouter le code de vérification dans `index.html` -->

### Après déploiement

1. Vérifier le site dans Google Search Console
2. Soumettre le sitemap: https://lylusio.fr/sitemap.xml
3. Vérifier le tracking GA4 dans les rapports temps réel

### Optionnel

-   Ajouter des événements de tracking personnalisés avec `useAnalyticsEvent()`
-   Configurer des objectifs dans GA4

---

## Structure SEO par page

| Page           | URL                      | H1                           | Priority |
| -------------- | ------------------------ | ---------------------------- | -------- |
| Accueil        | /                        | Accompagnement holistique... | 1.0      |
| Astrologie     | /astrologie-toulouse     | Astrologie à Toulouse        | 0.9      |
| Reiki          | /reiki-toulouse          | Reiki à Toulouse             | 0.9      |
| Accompagnement | /accompagnement-toulouse | Accompagnement global        | 0.9      |
| Mon Approche   | /approche-therapeutique  | Mon approche thérapeutique   | 0.9      |
| À propos       | /emilie-perez            | Émilie Perez                 | 0.8      |
| Blog           | /blog                    | Articles & Réflexions        | 0.8      |
| Contact        | /contact                 | Contact                      | 0.7      |
| FAQ            | /faq                     | Questions fréquentes         | 0.7      |
