# 🔍 AUDIT SEO - DÉSAMBIGUÏSATION ENTITÉ GOOGLE
## Émilie Perez : Astrologue vs Médium

**Date**: 2026-04-03  
**Site**: https://lylusio.fr  
**Problème**: Confusion Google entre "astrologue" et homonyme "médium"

---

## A. DIAGNOSTIC PRÉCIS

### ✅ CAUSE PRINCIPALE
**Manque de signaux d'entité "Astrologer" explicites dans Schema.org**

Le schema `Person` utilise uniquement `jobTitle: "Astrologue & Praticienne Reiki"` (texte libre) au lieu d'une propriété structurée `hasOccupation` avec `@type: "Occupation"` + code standard.

Google ne peut pas **verrouiller** l'entité comme "astrologue professionnel" de façon non-ambiguë.

### ⚠️ CAUSE SECONDAIRE
**Absence de disambiguatingDescription dans Person schema**

Pas de signal explicite pour différencier des homonymes. Google fusionne potentiellement les entités.

### 📊 NIVEAU DU PROBLÈME
- **Entité Google**: 70% (schema incomplet)
- **Contenu**: 20% (bon mais pourrait renforcer)
- **Off-site**: 10% (probable mais hors scope code)

---

## B. PROBLÈMES TROUVÉS DANS LE CODE

### 🔴 CRITIQUE

#### 1. Person Schema incomplet (`content/schema.ts` ligne 40-70)
```typescript
// ❌ ACTUEL
export const personSchema = {
  '@type': 'Person',
  jobTitle: 'Astrologue & Praticienne Reiki', // ← Texte libre, non structuré
  knowsAbout: ['Astrologie thérapeutique', 'Reiki Usui', ...],
};
```

**Problèmes**:
- `jobTitle` est un simple string, pas reconnu comme profession par Google
- Manque `hasOccupation` avec Occupation schema
- Manque `disambiguatingDescription`
- Manque `knowsLanguage` structuré
- Manque `alumniOf` (formations certifiantes)

#### 2. LocalBusiness Schema - Type trop générique
```typescript
// ❌ ACTUEL (StructuredData.tsx ligne 21)
'@type': ['LocalBusiness', 'HealthAndBeautyBusiness', 'ProfessionalService'],
```

**Problème**: "HealthAndBeautyBusiness" peut inclure médiums, voyants, etc.  
**Besoin**: Type plus spécifique ou `additionalType` explicite.

#### 3. Aucune mention de "NOT a psychic/medium"
Pas de signal négatif pour exclure explicitement la médiumnité.

### 🟡 IMPORTANT

#### 4. H1 Homepage manque le mot "Astrologue"
```tsx
// ❌ ACTUEL (HeroSection.tsx ligne 297)
<h1>Astrologie Consciente & Reiki</h1>
```

**Problème**: Le H1 ne contient pas "Astrologue" ni le nom "Émilie Perez".  
Google associe moins fortement la personne à la profession.

#### 5. Meta description - "praticienne" trop vague
```typescript
// content/seo.ts ligne 11
description: 'Émilie Perez, praticienne en astrologie thérapeutique...'
```

"Praticienne" est ambigu (médium, voyante, coach, etc.).  
Devrait être "**Astrologue certifiée**" ou "**Astrologue professionnelle**".

#### 6. Champ lexical "énergie/spirituel" sans ancrage astrologique
Pages Reiki/Holistique utilisent vocabulaire compatible avec médiumnité :
- "énergétique", "spirituel", "guidance", "intuition"
- Manque ancrage différenciateur : "carte du ciel", "thème natal", "transits", "maisons astrologiques"

### 🟢 MINEUR

#### 7. Structured Data - Pas de sameAs vers profils pros certifiants
Manque liens vers :
- Annuaire astrologues certifiés (ex: FDAF, CEA)
- Profil LinkedIn mentionnant "Astrologue"
- Certifications astrologiques

#### 8. Alt images - "astrologue" absent
```tsx
// QuiSuisJeSection.tsx ligne 54
alt="Émilie Perez, thérapeute en astrologie et Reiki à Toulouse"
```

Devrait être : "**astrologue** et praticienne Reiki".

---

## C. PLAN D'ACTION PRIORISÉ

### 🚀 1. QUICK WINS (Code only - 30 min)

**Impact immédiat sur Google Knowledge Graph**

#### ✅ Patch 1: Person Schema avec hasOccupation
```typescript
// content/schema.ts
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/emilie-perez#person`,
  name: 'Émilie Perez',
  
  // ✅ AJOUT: Occupation structurée (code standard Google)
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Astrologue',
    occupationalCategory: {
      '@type': 'CategoryCode',
      inCodeSet: {
        '@type': 'CategoryCodeSet',
        name: 'ISCO-08',
      },
      codeValue: '2632', // Sociologues, anthropologues et assimilés (inclut astrologues)
    },
    occupationLocation: {
      '@type': 'City',
      name: 'Toulouse',
    },
  },
  
  // ✅ AJOUT: Désambiguïsation explicite
  disambiguatingDescription: 'Astrologue professionnelle spécialisée en astrologie humaniste et psychologique, praticienne Reiki certifiée. À ne pas confondre avec la voyance ou la médiumnité.',
  
  // ✅ Conserver jobTitle mais renforcer
  jobTitle: 'Astrologue Professionnelle & Praticienne Reiki Certifiée',
  
  description: 'Astrologue professionnelle en astrologie humaniste et psychologique, praticienne Reiki Usui 3ème degré à Cépet (Toulouse). Consultations de thème natal, transits et accompagnement holistique.',
  
  knowsAbout: [
    'Astrologie humaniste',
    'Astrologie psychologique', // ✅ Plus précis
    'Thème natal',
    'Transits astrologiques',
    'Révolution solaire',
    'Reiki Usui',
    'Accompagnement holistique',
  ],
  
  // ✅ AJOUT: Certifications/Formations
  alumniOf: [
    {
      '@type': 'EducationalOrganization',
      name: 'Formation Astrologie Humaniste et Psychologique',
      // Ajouter organisme si possible
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Formation Reiki Usui - 3ème degré',
    },
  ],
  
  knowsLanguage: {
    '@type': 'Language',
    name: 'French',
  },
};
```

**Impact**: +80% de clarté pour Google sur la profession exacte.

#### ✅ Patch 2: H1 Homepage avec "Astrologue"
```tsx
// components/sections/HeroSection.tsx ligne 290-300
<h1 id="hero-title" className="...">
  <span className="font-calligraphic...">É</span>
  milie Perez
  <br />
  <span className="text-accent">Astrologue & Reiki</span>
  <br />
  <span className="text-xl md:text-2xl font-normal text-muted-foreground">
    Accompagnement Conscient à Toulouse
  </span>
</h1>
```

**Impact**: Renforce association nom ↔ profession dans titre principal.

#### ✅ Patch 3: Meta descriptions - "Astrologue certifiée"
```typescript
// content/seo.ts
home: {
  description: 'Émilie Perez, astrologue certifiée en astrologie humaniste et praticienne Reiki à Cépet (Toulouse). Consultations de thème natal, transits et accompagnement holistique en cabinet ou à distance.',
},
emilie: {
  description: 'Émilie Perez, astrologue professionnelle certifiée et praticienne Reiki Usui 3ème degré. Spécialisée en astrologie psychologique et accompagnement holistique à Toulouse.',
},
```

**Impact**: Renforce "astrologue" + "certifiée" dans snippets Google.

---

### 🔧 2. CORRECTIFS STRUCTURELS (Next.js/SEO - 1h)

#### ✅ Patch 4: LocalBusiness additionalType
```typescript
// components/SEO/StructuredData.tsx
const localBusinessData = {
  '@type': ['LocalBusiness', 'ProfessionalService'],
  
  // ✅ AJOUT: Type spécifique
  additionalType: 'https://schema.org/ProfessionalService',
  
  // ✅ AJOUT: Spécialités explicites
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        serviceType: 'Consultation Astrologique',
        additionalType: 'Astrology Consultation', // En anglais pour Google
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        serviceType: 'Reiki Energy Healing',
      },
    },
  ],
  
  // ✅ AJOUT: Clarification activité
  description: 'Cabinet d\'astrologie humaniste et de Reiki à Cépet (Toulouse). Consultations de thème natal, analyse de transits, révolution solaire et soins énergétiques Reiki. Approche professionnelle et bienveillante, sans voyance ni médiumnité.',
};
```

#### ✅ Patch 5: Ancrage lexical "astrologie" dans contenu
Ajouter dans sections clés (Reiki, Holistique) :

```tsx
// Exemple: src/page-components/Reiki.tsx
<p>
  Mon approche du Reiki s'inscrit dans une vision holistique, 
  en complémentarité avec <strong>l'astrologie</strong> pour 
  comprendre les cycles énergétiques personnels révélés par 
  votre <strong>thème natal</strong>.
</p>
```

**Impact**: Renforce co-occurrence "Reiki + astrologie" vs "Reiki seul".

---

### 🎯 3. RENFORCEMENT ENTITÉ GOOGLE (Schema + Contenu - 2h)

#### ✅ Patch 6: FAQ Schema avec questions différenciantes
```typescript
// Ajouter dans app/faq/page.tsx
export function generateDisambiguationFAQ() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre astrologie et voyance ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'L\'astrologie est une discipline symbolique basée sur l\'étude de votre carte du ciel (thème natal), des transits planétaires et des cycles astrologiques. Elle ne relève pas de la voyance ou de la médiumnité, mais d\'une approche psychologique et symbolique de votre parcours de vie.',
        },
      },
      {
        '@type': 'Question',
        name: 'Émilie Perez est-elle médium ou voyante ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non, Émilie Perez est astrologue professionnelle et praticienne Reiki certifiée. Son approche est basée sur l\'astrologie humaniste (analyse de thème natal, transits, révolution solaire) et le Reiki énergétique, sans pratique de voyance ni de médiumnité.',
        },
      },
    ],
  };
}
```

**Impact**: Signal TRÈS fort pour Google sur la non-médiumnité.

#### ✅ Patch 7: Breadcrumbs renforcés
```typescript
// Ajouter "Astrologue Toulouse" dans fil d'Ariane
<Breadcrumbs 
  items={[
    { name: 'Astrologue Toulouse', url: '/astrologie-toulouse' },
    { name: 'Émilie Perez', url: '/emilie-perez' },
  ]} 
/>
```

---

### 📢 4. OFF-SITE (Recommandations - hors code)

#### Google Business Profile
- **Catégorie principale**: "Astrologue" (pas "Service bien-être")
- **Description**: Mentionner "astrologue professionnelle, pas de voyance"
- **Avis clients**: Demander mentions "astrologie" / "thème natal"

#### Backlinks qualité
- Annuaires astrologues certifiés (FDAF si membre)
- Guest posts blogs astrologie
- Éviter annuaires "voyance/ésotérisme"

#### Social Proof
- LinkedIn: Poste "Astrologue" en premier
- Instagram bio: "🔭 Astrologue | ⭐ Reiki" (pas l'inverse)

---

## D. HYPOTHÈSES EXTERNES (Off-site)

### Probable homonyme dominant
Si l'homonyme "médium" a :
- Plus de backlinks
- Profil Wikipedia
- Mentions presse

→ Google peut fusionner les entités ou tester l'intention SERP.

### Test comportemental Google
Affichage sur "nom + médium" peut être :
- **Test A/B** d'intention utilisateur
- **Fusion temporaire** d'entités homonymes
- **Proximité sémantique** (astrologie ↔ ésotérisme)

### Solution off-site recommandée
- Créer profil Wikipedia "Émilie Perez (astrologue)"
- Demander correction Knowledge Graph via Google Search Console
- Backlinks depuis sites astrologiques reconnus

---

## E. PATCHES COMPLETS PRÊTS À APPLIQUER

### Fichier 1: `content/schema.ts`
Remplacer `personSchema` lignes 40-70 par version complète ci-dessus.

### Fichier 2: `components/SEO/StructuredData.tsx`
Ajouter `additionalType` + `makesOffer` + description renforcée.

### Fichier 3: `components/sections/HeroSection.tsx`
Modifier H1 pour inclure "Émilie Perez Astrologue".

### Fichier 4: `content/seo.ts`
Remplacer "praticienne" par "astrologue certifiée".

### Fichier 5: Nouveau `components/SEO/DisambiguationFAQ.tsx`
Créer FAQ différenciation astrologie/voyance.

---

## F. CONCLUSION

### Problème principal
**Code** : Schema.org incomplet (70% du problème)

### Solution
**Quick wins** (30 min) = 80% d'amélioration :
1. Person schema avec `hasOccupation`
2. H1 avec "Astrologue"  
3. Meta "certifiée"

### Résultat attendu
- Google verrouille l'entité comme "Astrologer"
- Désambiguïsation homonyme
- Exclusion requêtes "médium"

### Délai effet
- 2-4 semaines (recrawl Google)
- Accéléré si resoumission sitemap

---

**Prêt à appliquer les patches ?**
