# ✨ Lylusio - Astrologie & Thérapie Énergétique

<div align="center">

![Lylusio Banner](https://lylusio.fr/og-image.jpg)

**Cabinet d'astrologie consciente et thérapie énergétique Reiki à Toulouse**

[🌐 Site Web](https://lylusio.fr) • [📧 Contact](mailto:contact@lylusio.fr) • [📱 Prendre RDV](https://calendly.com/lylusio-fr)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?logo=wordpress)](https://wordpress.org)

</div>

---

## 🌟 À propos

**Lylusio** est le site web moderne du cabinet d'**Émilie Perez**, astrologue et praticienne Reiki installée à Toulouse. Ce projet utilise une architecture **headless WordPress** pour combiner la flexibilité d'un CMS avec la performance d'une application React moderne.

### 🎯 Objectifs du projet

-   ✅ **Performances optimales** : Temps de chargement < 2s, score Lighthouse > 95
-   ✅ **SEO-friendly** : Balises meta complètes, structured data, sitemap dynamique
-   ✅ **Accessibilité** : Conformité WCAG 2.1 niveau AA
-   ✅ **Expérience utilisateur** : Design apaisant, navigation intuitive, animations fluides
-   ✅ **Blog dynamique** : Articles WordPress intégrés avec préchargement intelligent

---

## 🏗️ Architecture

### Stack technique

| Couche           | Technologies                        |
| ---------------- | ----------------------------------- |
| **Frontend**     | React 18, TypeScript, Vite          |
| **Styling**      | Tailwind CSS, shadcn/ui             |
| **Routing**      | React Router DOM v7                 |
| **État & Cache** | TanStack Query (React Query)        |
| **SEO**          | React Helmet Async, JSON-LD         |
| **Backend**      | WordPress REST API (headless)       |
| **Hébergement**  | Vercel (frontend) + OVH (WordPress) |
| **Analytics**    | Google Analytics 4                  |

### Architecture headless

```
┌─────────────────┐
│   React (Vite)  │  ← Frontend statique (Vercel)
│   TypeScript    │
└────────┬────────┘
         │ API REST
         ↓
┌─────────────────┐
│   WordPress     │  ← CMS headless (OVH)
│   /wp-json/     │
└─────────────────┘
```

---

## 📁 Structure du projet

```
lylusio-headless-charm/
├── src/
│   ├── assets/              # Images, fonts, icons
│   ├── components/
│   │   ├── layout/          # Header, Footer, Breadcrumbs
│   │   ├── sections/        # HeroSection, TestimonialsSection...
│   │   ├── ui/              # Composants shadcn/ui
│   │   └── ...              # Composants réutilisables
│   ├── hooks/               # useAnalytics, usePageTracking...
│   ├── pages/               # Routes de l'application
│   │   ├── Index.tsx        # Page d'accueil
│   │   ├── Blog.tsx         # Liste des articles
│   │   ├── BlogPost.tsx     # Article individuel
│   │   └── ...
│   ├── lib/                 # Utilitaires (utils.ts)
│   └── App.tsx              # Point d'entrée + routing
├── public/
│   ├── robots.txt           # Directives pour les crawlers
│   ├── sitemap.xml          # Sitemap statique
│   └── ...
├── docs/                    # Documentation projet
├── tailwind.config.ts       # Configuration Tailwind
├── vite.config.ts           # Configuration Vite
└── vercel.json              # Configuration déploiement
```

---

## 🚀 Installation & Développement

### Prérequis

-   Node.js 18+ ou Bun
-   npm / pnpm / yarn / bun

### Installation

```bash
# Cloner le repository
git clone https://github.com/FloAFDEV/lylusio-headless-charm.git
cd lylusio-headless-charm

# Installer les dépendances
npm install
# ou
bun install

# Lancer le serveur de développement
npm run dev
# ou
bun dev
```

Le site sera accessible sur `http://localhost:8080`

### Scripts disponibles

```bash
npm run dev          # Serveur de développement (port 8080)
npm run build        # Build de production
npm run preview      # Prévisualisation du build
npm run lint         # Vérification ESLint
```

---

## 🎨 Design System

### Palette de couleurs

| Couleur    | Utilisation   | Hex       |
| ---------- | ------------- | --------- |
| **Navy**   | Titres, CTA   | `#1a3a52` |
| **Sand**   | Fond sections | `#f5e6d3` |
| **Accent** | Liens, focus  | `#d4a574` |
| **Beige**  | Background    | `#faf8f5` |

### Typographies

-   **Headings** : Cormorant Garamond (serif élégant)
-   **Body** : Source Sans 3 (sans-serif lisible)
-   **Accents** : Dancing Script (calligraphie décorative)

### Composants UI

Basés sur **shadcn/ui** avec personnalisation Tailwind :

-   Buttons avec variantes `elegant`, `outline`, `ghost`
-   Cards avec effets hover subtils
-   Forms avec validation intégrée
-   Toasts pour les notifications

---

## 📄 Pages & Routes

| Route                      | Page           | Description                |
| -------------------------- | -------------- | -------------------------- |
| `/`                        | Accueil        | Hero + aperçu services     |
| `/approche-therapeutique`  | Mon Approche   | Philosophie & vision       |
| `/therapie-energetique`    | Services       | Vue d'ensemble prestations |
| `/astrologie-toulouse`     | Astrologie     | Consultation thème astral  |
| `/reiki-toulouse`          | Reiki          | Séances énergétiques       |
| `/accompagnement-toulouse` | Accompagnement | Suivi transitions de vie   |
| `/emilie-perez`            | À propos       | Biographie Émilie          |
| `/blog`                    | Blog           | Liste articles WordPress   |
| `/blog/:slug`              | Article        | Article individuel         |
| `/category/blog/:slug`     | Catégorie      | Articles par catégorie     |
| `/contact`                 | Contact        | Formulaire + infos         |
| `/faq`                     | FAQ            | Questions fréquentes       |

### Redirections SEO

Toutes les anciennes URLs WordPress sont redirigées en 301 :

-   `/astrologue-cepet-toulouse/*` → `/` (nouvelles URLs)
-   Support des trailing slashes
-   Gestion des slugs d'articles à la racine

---

## 🔌 Intégration WordPress

### API REST utilisée

```typescript
const WP_API_URL = "https://lylusio.fr/wp-json/wp/v2";

// Endpoints utilisés
GET /posts              // Liste des articles
GET /posts?slug={slug}  // Article par slug
GET /categories         // Catégories
GET /posts?_embed       // Avec featured media
```

### Cache intelligent

Utilisation de **TanStack Query** pour :

-   ✅ Cache des articles pendant 10 minutes
-   ✅ Préchargement des articles visibles
-   ✅ Préchargement des images
-   ✅ Navigation instantanée (back/forward)

```typescript
// Exemple de cache article
const { data: post } = useQuery({
	queryKey: ["blogPost", slug],
	queryFn: fetchPost,
	staleTime: 1000 * 60 * 10, // 10 min
	gcTime: 1000 * 60 * 30, // 30 min
});
```

---

## 🔍 SEO & Performance

### Optimisations SEO

-   ✅ **Meta tags** : title, description, OG, Twitter Card
-   ✅ **Structured Data** : JSON-LD pour articles, organisation, breadcrumbs
-   ✅ **Sitemap.xml** : Généré automatiquement
-   ✅ **Robots.txt** : Optimisé pour les crawlers
-   ✅ **Canonical URLs** : Évite le contenu dupliqué
-   ✅ **Alt text** : Sur toutes les images
-   ✅ **Semantic HTML** : `<article>`, `<nav>`, `<section>`

### Scores Lighthouse

| Métrique       | Score |
| -------------- | ----- |
| Performance    | 95+   |
| Accessibility  | 100   |
| Best Practices | 100   |
| SEO            | 100   |

### Optimisations Performance

-   Code splitting par route
-   Lazy loading des images
-   Préchargement des articles
-   Minification CSS/JS
-   Compression gzip/brotli
-   CDN Vercel Edge Network

---

## ♿ Accessibilité

### Conformité WCAG 2.1 AA

-   ✅ **Navigation clavier** : Tous les éléments interactifs
-   ✅ **Contraste** : Minimum 4.5:1 pour le texte
-   ✅ **Focus visible** : Outline sur tous les éléments
-   ✅ **Alt text** : Descriptions pertinentes
-   ✅ **ARIA labels** : Sur les éléments complexes
-   ✅ **Skip links** : "Aller au contenu principal"
-   ✅ **Landmarks** : Structure sémantique claire

---

## 📊 Analytics & Tracking

### Google Analytics 4

Événements trackés :

-   Page views automatiques
-   Clics CTA (prise de RDV)
-   Soumission formulaire contact
-   Navigation blog (catégories, recherche)
-   Téléchargements PDF

```typescript
// Exemple tracking événement
gtag("event", "cta_click", {
	cta_name: "prendre_rdv",
	page_location: window.location.href,
});
```

---

## 🚢 Déploiement

### Vercel (Production)

Le site est déployé automatiquement sur **Vercel** à chaque push sur `main`.

```bash
# Build de production
npm run build

# Preview branches (automatique sur PR)
vercel --prod
```

### Variables d'environnement

Aucune variable d'environnement nécessaire - l'API WordPress est publique.

---

## 🛠️ Développement

### Conventions de code

-   **TypeScript strict mode** activé
-   **ESLint** : Configuration React recommandée
-   **Prettier** : Auto-formatage (optionnel)
-   **Commits** : Messages descriptifs en français

### Branches

-   `main` : Production (protégée)
-   `dev` : Développement
-   `feature/*` : Nouvelles fonctionnalités
-   `fix/*` : Corrections de bugs

---

## 📝 TODO / Roadmap

-   [ ] Ajouter système de newsletter (Mailchimp/Brevo)
-   [ ] Implémenter recherche articles (Algolia)
-   [ ] Migration vers Astro pour SSG
-   [ ] PWA avec service worker
-   [ ] Dark mode (optionnel)
-   [ ] Multilingue (FR/EN)

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour proposer des améliorations :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence privée. Tous droits réservés © 2025 Lylusio - Émilie Perez.

---

## 📞 Contact

**Émilie Perez** - Astrologue & Praticienne Reiki

-   🌐 Site : [lylusio.fr](https://lylusio.fr)
-   📧 Email : [contact@lylusio.fr](mailto:contact@lylusio.fr)
-   📱 Téléphone : [06 19 15 19 59](tel:+33619151959)
-   📍 Localisation : Toulouse & En ligne
-   📅 Rendez-vous : [Calendly](https://calendly.com/lylusio-fr)

### Réseaux sociaux

-   [Facebook](https://www.facebook.com/lylusio)
-   [Instagram](https://www.instagram.com/lylusio)
-   [LinkedIn](https://www.linkedin.com/in/emilie-perez-lylusio)

---

<div align="center">

**Développé avec ❤️ et ✨**

_Astrologie consciente • Reiki • Accompagnement holistique_

</div>
