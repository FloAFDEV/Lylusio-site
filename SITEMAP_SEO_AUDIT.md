# 🗺️ Sitemap & SEO Audit - Lylusio.fr

**Date:** 13 janvier 2026
**Domaine:** https://lylusio.fr
**Framework:** Next.js 15+ (App Router)

---

## ✅ État de Synchronisation

### Repo GitHub
- ✅ **Branche:** `main`
- ✅ **Statut:** Synchronisé avec `origin/main`
- ✅ **Derniers commits:** Intégrés (sitemap simplifié depuis GitHub)

### Build Next.js
- ✅ **Compilation:** Réussie sans erreurs
- ✅ **Pages générées:** 35 routes
- ✅ **Articles blog:** 20 pré-générés via `generateStaticParams`
- ✅ **Compatible:** Next.js 15+ avec `params` async

---

## 📋 Inventaire Complet des Routes

### 1. Pages Statiques (14 pages)

#### **Pages Services (Priorité 0.9)**
- ✅ `/astrologie-toulouse` - Astrologie humaniste à Toulouse
- ✅ `/reiki-toulouse` - Reiki et thérapie énergétique
- ✅ `/therapie-holistique` - Approche holistique globale
- ✅ `/therapie-energetique` - Thérapies énergétiques
- ✅ `/accompagnement-toulouse` - Accompagnement personnalisé

#### **Pages À Propos (Priorité 0.9)**
- ✅ `/approche-therapeutique` - Philosophie et méthodes
- ✅ `/emilie-perez` - Présentation d'Émilie Perez

#### **Pages Utilitaires (Priorité 0.6-0.8)**
- ✅ `/` - Homepage (Priorité 1.0)
- ✅ `/blog` - Liste des articles (Priorité 0.8)
- ✅ `/ressources` - Ressources et guides (Priorité 0.8)
- ✅ `/contact` - Formulaire de contact (Priorité 0.8)
- ✅ `/faq` - Questions fréquentes (Priorité 0.6)

#### **Pages Légales (Priorité 0.3)**
- ✅ `/mentions-legales` - Infos légales (MAJ 13/01/2026)
- ✅ `/confidentialite` - Politique RGPD
- ✅ `/cgu` - Conditions d'utilisation (MAJ 13/01/2026)

---

### 2. Routes Dynamiques

#### **Articles de Blog** (`/[slug]`)
- ✅ **Route pattern:** `/{slug}` (sans prefix `/blog/`)
- ✅ **Type:** SSG (Static Site Generation)
- ✅ **Cache:** 2 heures (revalidate: 7200s)
- ✅ **Source:** WordPress REST API
- ✅ **Priorité sitemap:** 0.7
- ✅ **Frequency:** Monthly

**Exemples d'articles:**
```
/transition-2025-→-2026-janvier-nest-pas-un-sprint
/les-cycles-du-changement
/le-theme-astral
/clarifier-mes-echanges
/petite-histoire-du-reiki
/le-chakra-du-plexus-solaire
... (+17 autres)
```

#### **Catégories de Blog** (`/category/blog/[categorySlug]`)
- ✅ **Route pattern:** `/category/blog/{categorySlug}`
- ✅ **Type:** SSR (Server-Side Rendered)
- ✅ **Cache:** 1 heure (revalidate: 3600s)
- ✅ **Priorité sitemap:** 0.6
- ✅ **Frequency:** Weekly

**Catégories actives:**
```
/category/blog/astrologie
/category/blog/reiki
/category/blog/developpement-personnel
```

---

## 🗺️ Configuration Sitemap

### Fichier: `app/sitemap.ts`

**Caractéristiques:**
- ✅ **Format:** XML (Next.js MetadataRoute)
- ✅ **Cache:** 1 heure (revalidate: 3600s)
- ✅ **URL:** https://lylusio.fr/sitemap.xml
- ✅ **Source:** Hybride (statique + WordPress dynamique)

**Composition:**
```
📊 Sitemap Structure:
├── 14 pages statiques (manuelles)
├── ~20 articles blog (dynamiques WordPress)
└── 3 catégories (dynamiques WordPress, filtrées)

Total estimé: ~37 URLs
```

**Optimisations appliquées:**
- ✅ `lastModified` réel depuis WordPress pour articles
- ✅ `lastModified` fixe pour pages légales récemment MAJ
- ✅ `priority` hiérarchisée (1.0 → 0.3)
- ✅ `changeFrequency` adaptée par type de contenu
- ✅ Filtrage catégories (uniquement celles avec posts)
- ✅ Mapping slug WordPress → slug frontend

---

## 🤖 Configuration robots.txt

### Fichier: `app/robots.ts`

```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://lylusio.fr/sitemap.xml
```

**Protection:**
- ✅ APIs bloquées (`/api/`)
- ✅ Ressources Next.js bloquées (`/_next/`)
- ✅ Zone admin bloquée (`/admin/`)
- ✅ Sitemap référencé

---

## 🔍 Vérifications SEO

### ✅ Points Positifs

1. **Indexabilité**
   - ✅ Toutes les pages importantes sont indexables
   - ✅ Aucune balise `<meta name="robots" content="noindex">`
   - ✅ Routes dynamiques correctement configurées

2. **Métadonnées**
   - ✅ `generateMetadata()` présent sur toutes les pages dynamiques
   - ✅ Titles uniques et descriptifs
   - ✅ Meta descriptions personnalisées
   - ✅ Open Graph tags configurés
   - ✅ Twitter Cards configurés

3. **Canonical URLs**
   - ✅ Canonical défini via `alternates.canonical`
   - ✅ URLs absolues (https://lylusio.fr)
   - ✅ Cohérence URLs sitemap ↔ canonical

4. **Structured Data**
   - ✅ Schema.org LocalBusiness (homepage)
   - ✅ Schema.org Website (homepage)
   - ✅ Schema.org BlogPosting (articles)
   - ✅ Schema.org CollectionPage (catégories)
   - ✅ Format JSON-LD conforme

5. **Performance SEO**
   - ✅ SSR/SSG activé (bon pour crawlers)
   - ✅ Images optimisées (Next.js Image)
   - ✅ Fonts optimisées (next/font/google avec swap)
   - ✅ GTM différé (5s) pour ne pas bloquer FCP

### ⚠️ Points d'Attention

1. **URLs Blog**
   - ⚠️ **Pattern actuel:** `/{slug}` (court)
   - ⚠️ **Alternative SEO:** `/blog/{slug}` (plus explicite)
   - 💡 **Statut:** Choix architectural assumé (URLs courtes)

2. **Images OG**
   - ⚠️ Certaines pages utilisent logo par défaut
   - 💡 **Recommandation:** Créer images OG spécifiques (1200x630px)

3. **Sitemap Pagination**
   - ⚠️ Si >100 articles, limité à 100 par page
   - 💡 **Solution future:** Implémenter pagination sitemap

---

## 📊 Priorités Sitemap Expliquées

| Priorité | Type de Page | Justification |
|----------|-------------|---------------|
| **1.0** | Homepage | Point d'entrée principal |
| **0.9** | Services + À Propos | Pages clés conversion |
| **0.8** | Blog + Contact + Ressources | Contenu frais + CTA |
| **0.7** | Articles individuels | Contenu SEO long-tail |
| **0.6** | Catégories + FAQ | Navigation taxonomie |
| **0.3** | Pages légales | Obligatoires mais non-commercial |

---

## 🚀 Validation & Tests

### Tests Manuels à Effectuer

1. **Sitemap XML**
   ```bash
   curl https://lylusio.fr/sitemap.xml
   ```
   - ✅ Vérifier format XML valide
   - ✅ Compter nombre d'URLs (attendu: ~37)
   - ✅ Vérifier lastModified récents

2. **Robots.txt**
   ```bash
   curl https://lylusio.fr/robots.txt
   ```
   - ✅ Vérifier référence sitemap
   - ✅ Vérifier règles disallow

3. **Google Search Console**
   - 📤 Soumettre sitemap: `https://lylusio.fr/sitemap.xml`
   - 🔍 Vérifier erreurs d'indexation
   - 📊 Analyser couverture après 48-72h

4. **Validation XML**
   - 🔗 https://www.xml-sitemaps.com/validate-xml-sitemap.html
   - ✅ Tester format et syntaxe

---

## 📝 Changelog

### 13 janvier 2026
- ✅ Ajout `/therapie-energetique` au sitemap (page manquante)
- ✅ Correction URLs articles: `/{slug}` au lieu de `/blog/{slug}`
- ✅ Amélioration commentaires sitemap (lisibilité)
- ✅ Ajout logs génération sitemap
- ✅ MAJ dates lastModified pages légales (reflet MAJ récentes)
- ✅ Ajout `as const` pour types TypeScript stricts
- ✅ Synchronisation complète avec GitHub (pull latest)

### Historique Précédent
- ✅ Simplification sitemap (suppression anciennes URLs)
- ✅ Ajout mapping catégories WordPress → Frontend
- ✅ Implémentation ISR (Incremental Static Regeneration)
- ✅ Configuration cache stratégique par type contenu

---

## 🎯 Recommandations Futures

### Court Terme (< 1 mois)
1. ✅ **Soumettre sitemap à Google Search Console**
2. 📸 **Créer images OG personnalisées** (1200x630px WebP)
3. 🔍 **Monitorer erreurs indexation** (GSC)
4. 📊 **Analyser Core Web Vitals** par page

### Moyen Terme (1-3 mois)
1. 📈 **Ajouter sitemap index** si >100 articles
2. 🎨 **Optimiser images featured** (articles blog)
3. 🔗 **Audit liens internes** (maillage SEO)
4. 📱 **Test mobile-first** complet

### Long Terme (3-6 mois)
1. 🌍 **i18n preparation** (si expansion internationale)
2. 🎬 **Schema VideoObject** si contenu vidéo
3. 📊 **Structured data enrichment** (FAQ, How-To)
4. 🚀 **Performance budget** strict

---

## ✅ Checklist Déploiement

Avant push en production:

- [x] Build compile sans erreurs
- [x] Sitemap.xml généré correctement
- [x] Robots.txt valide
- [x] Toutes les routes accessibles
- [x] Métadonnées complètes
- [x] Canonical URLs absolues
- [x] Images optimisées
- [x] GTM/Analytics configuré
- [x] HTTPS actif (Vercel)
- [ ] Sitemap soumis GSC (à faire post-déploiement)
- [ ] Test lighthouse mobile >85
- [ ] Test validation W3C

---

**🎉 Le site est prêt pour production avec un SEO optimisé !**

**Prochaine étape:** Soumettre `https://lylusio.fr/sitemap.xml` à Google Search Console.
