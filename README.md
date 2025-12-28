# ✨ Lylusio - Astrologie & Thérapie Énergétique

<div align="center">

![Lylusio Banner](https://lylusio.fr/og-image.jpg)

**Cabinet d'astrologie consciente et thérapie énergétique Reiki à Toulouse**

[🌐 Site Web](https://lylusio.fr) • [📧 Contact](mailto:contact@lylusio.fr) • [📱 Prendre RDV](https://calendly.com/lylusio-fr)

[![Next.js](https://img.shields.io/badge/Next.js-16.1-000000?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![WordPress](https://img.shields.io/badge/WordPress-Headless-21759B?logo=wordpress)](https://wordpress.org)

</div>

---

## 🌟 À propos

**Lylusio** est le site web moderne du cabinet d'**Émilie Perez**, astrologue et praticienne Reiki installée à Toulouse. Ce projet utilise **Next.js 15+ App Router** avec une architecture **headless WordPress** pour combiner la flexibilité d'un CMS avec la performance d'une application React moderne.

### 🎯 Objectifs du projet

- ✅ **Performances optimales** : Temps de chargement < 2s, score Lighthouse > 95
- ✅ **SEO-friendly** : Metadata Next.js, JSON-LD schema, sitemap dynamique
- ✅ **Accessibilité** : Conformité WCAG 2.1 niveau AA
- ✅ **Expérience utilisateur** : Design apaisant, navigation intuitive, animations fluides
- ✅ **Blog dynamique** : Articles WordPress intégrés avec préchargement intelligent

---

## 🏗️ Architecture

### Stack technique

| Couche           | Technologies                           |
| ---------------- | -------------------------------------- |
| **Framework**    | Next.js 16.1 (App Router)              |
| **Frontend**     | React 18.3, TypeScript 5.8             |
| **Styling**      | Tailwind CSS 3.4, shadcn/ui            |
| **État & Cache** | TanStack Query v5 (React Query)        |
| **SEO**          | Next.js Metadata API, JSON-LD          |
| **Backend**      | WordPress REST API (headless)          |
| **Hébergement**  | Vercel (frontend) + OVH (WordPress)    |
| **Analytics**    | Google Analytics 4                     |

### Structure du projet

```
Lylusio/
├── app/                      # Next.js App Router
│   ├── (routes)/            # Routes groupées
│   │   ├── astrologie-toulouse/
│   │   ├── reiki-toulouse/
│   │   ├── accompagnement-toulouse/
│   │   ├── contact/
│   │   └── ...
│   ├── blog/
│   │   └── [slug]/
│   ├── layout.tsx           # Layout racine
│   ├── page.tsx             # Page d'accueil
│   ├── sitemap.ts           # Sitemap dynamique
│   └── robots.ts            # Robots.txt dynamique
│
├── components/              # Composants React
│   ├── layout/             # Header, Footer
│   ├── sections/           # Sections de page
│   ├── ui/                 # Composants shadcn/ui
│   └── providers/          # React Query, Theme, Analytics
│
├── content/                 # Contenu & SEO
│   ├── seo.ts              # Métadonnées SEO par page
│   └── schema.ts           # JSON-LD schemas
│
├── src/page-components/     # Composants de page
│   ├── Index.tsx
│   ├── Astrologie.tsx
│   ├── Blog.tsx
│   └── ...
│
├── hooks/                   # Custom React hooks
├── lib/                     # Utilitaires
└── public/                  # Assets statiques
    └── assets/             # Images, icônes
```

### Architecture headless

```
┌─────────────────┐
│   Visiteur      │
└────────┬────────┘
         │
    ┌────▼────┐
    │ Vercel  │  ← Next.js 16 (SSR/SSG)
    │ (Edge)  │
    └────┬────┘
         │
         │ API REST
         │
    ┌────▼────────┐
    │ WordPress   │  ← Headless CMS
    │ (OVH)       │
    └─────────────┘
```

---

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone https://github.com/votre-username/lylusio.git
cd lylusio

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

```bash
npm run dev      # Serveur de développement (Turbopack)
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linter ESLint
```

---

## 📦 Fonctionnalités

### ✨ Pages principales

- **Accueil** : Présentation des services, témoignages, CTA
- **Astrologie** : Consultation de thème natal, transits
- **Reiki** : Soins énergétiques, formations
- **Accompagnement** : Suivi holistique personnalisé
- **Blog** : Articles WordPress avec catégories et recherche
- **Contact** : Formulaire de contact, informations pratiques

### 🎨 Design & UX

- Design minimaliste et apaisant (palette terre/or)
- Animations fluides avec respect de `prefers-reduced-motion`
- Navigation responsive (mobile-first)
- Dark mode (thème clair/sombre)
- Lazy loading des images
- Transitions de page fluides

### 🔍 SEO

- Metadata Next.js complètes (title, description, OG, Twitter Card)
- JSON-LD schemas (Organization, Person, Service, FAQ)
- Sitemap dynamique (`/sitemap.xml`)
- Robots.txt optimisé (`/robots.txt`)
- URLs canoniques
- Redirections WordPress legacy

### ⚡ Performance

- Server Components par défaut
- Préchargement intelligent (React Query)
- Images optimisées (à migrer vers next/image)
- Code splitting automatique
- Cache stratégique (staleTime: 5min)

---

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# WordPress API
NEXT_PUBLIC_WP_API_URL=https://votre-wordpress.fr/wp-json/wp/v2

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Autres variables...
```

### Next.js Config

Le fichier `next.config.ts` contient :
- Redirections WordPress legacy
- Headers de sécurité
- Configuration des images (à venir)

---

## 📝 TODO

### Phase 1 : Migration Next.js ✅
- [x] Migration Vite → Next.js 15+
- [x] App Router avec groupe (routes)
- [x] Metadata SEO complètes
- [x] JSON-LD schemas
- [x] Sitemap & robots dynamiques
- [x] Nettoyage fichiers obsolètes

### Phase 2 : Optimisations images 🚧
- [ ] Migration `<img>` → `<Image>` Next.js (46 occurrences)
- [ ] Configuration next/image
- [ ] Optimisation taille/format images
- [ ] Lazy loading natif

### Phase 3 : Améliorations 📋
- [ ] Mode hors ligne (PWA)
- [ ] Recherche full-text côté client
- [ ] Filtres blog avancés
- [ ] Partage social optimisé

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit vos changements (`git commit -m 'Ajout fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrir une Pull Request

---

## 📄 Licence

Ce projet est sous licence propriétaire © 2024 Lylusio. Tous droits réservés.

---

## 📬 Contact

**Émilie Perez** - Astrologue & Praticienne Reiki

- 🌐 Site : [lylusio.fr](https://lylusio.fr)
- 📧 Email : contact@lylusio.fr
- 📱 Instagram : [@lylusio](https://instagram.com/lylusio)
- 📍 Toulouse, France

---

<div align="center">

Fait avec 💛 à Toulouse

</div>
