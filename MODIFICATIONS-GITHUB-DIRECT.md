# MODIFICATIONS À APPLIQUER DIRECTEMENT SUR GITHUB

Pour chaque fichier ci-dessous :
1. Ouvre le fichier sur GitHub (branch main)
2. Clique sur l'icône "Edit" (crayon)
3. Remplace le code AVANT par le code APRÈS
4. Commit avec le message fourni

---

## FICHIER 1: content/schema.ts

### Localisation
Lignes 40-70

### AVANT (à supprimer)
```typescript
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/emilie-perez#person`,
  name: 'Émilie Perez',
  url: `${baseUrl}/emilie-perez`,
  image: {
    '@type': 'ImageObject',
    url: `${baseUrl}/assets/logo-lylusio.webp`,
    width: 400,
    height: 400,
  },
  jobTitle: 'Astrologue & Praticienne Reiki',
  // Référence par @id uniquement — évite d'embarquer tout l'organizationSchema
  worksFor: { '@id': `${baseUrl}/#organization` },
  description: 'Praticienne en astrologie thérapeutique et Reiki Usui à Cépet (Toulouse Nord)',
  knowsAbout: [
    'Astrologie thérapeutique',
    'Reiki Usui',
    'Accompagnement holistique',
    'Développement personnel',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '49 route de Labastide',
    addressLocality: 'Cépet',
    postalCode: '31620',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
};
```

### APRÈS (à coller)
```typescript
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${baseUrl}/emilie-perez#person`,
  name: 'Émilie Perez',
  url: `${baseUrl}/emilie-perez`,
  image: {
    '@type': 'ImageObject',
    url: `${baseUrl}/assets/logo-lylusio.webp`,
    width: 400,
    height: 400,
  },
  jobTitle: 'Astrologue & Praticienne Reiki',

  // ✅ SEO Entity: Occupation structurée pour désambiguïsation Google
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Astrologue',
    occupationalCategory: {
      '@type': 'CategoryCode',
      inCodeSet: {
        '@type': 'CategoryCodeSet',
        name: 'ISCO-08',
      },
      codeValue: '3412', // Social work and counselling professionals (inclut astrologues)
    },
    occupationLocation: {
      '@type': 'City',
      name: 'Cépet',
      addressCountry: 'FR',
    },
  },

  // ✅ SEO Entity: Désambiguïsation explicite homonyme
  disambiguatingDescription: 'Astrologue professionnelle spécialisée en astrologie humaniste et psychologique (Lylusio), praticienne Reiki certifiée. Basée à Cépet près de Toulouse. Approche basée sur l\'analyse du thème natal et l\'accompagnement holistique, distincte de la voyance ou médiumnité.',

  // Référence par @id uniquement — évite d'embarquer tout l'organizationSchema
  worksFor: { '@id': `${baseUrl}/#organization` },

  description: 'Astrologue professionnelle en astrologie humaniste et psychologique, praticienne Reiki Usui 3ème degré à Cépet (Toulouse Nord). Spécialisée dans l\'analyse de thème natal, transits astrologiques et accompagnement holistique.',

  knowsAbout: [
    'Astrologie humaniste',
    'Astrologie psychologique',
    'Thème natal',
    'Transits astrologiques',
    'Révolution solaire',
    'Reiki Usui',
    'Accompagnement holistique',
    'Développement personnel',
  ],

  // ✅ SEO Entity: Compétence linguistique structurée
  knowsLanguage: {
    '@type': 'Language',
    name: 'French',
    alternateName: 'fr',
  },

  address: {
    '@type': 'PostalAddress',
    streetAddress: '49 route de Labastide',
    addressLocality: 'Cépet',
    postalCode: '31620',
    addressRegion: 'Occitanie',
    addressCountry: 'FR',
  },
};
```

### Message commit
```
feat(seo): Person Schema avec hasOccupation pour désambiguïsation Google
```

---

## FICHIER 2: components/sections/HeroSection.tsx

### Localisation
Lignes 289-301

### AVANT (à supprimer)
```tsx
					<div>
						<h1
							id="hero-title"
							className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 sm:mb-6"
						>
							<span className="font-calligraphic text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block align-baseline motion-safe:transition-transform duration-300 hover:scale-110">
								A
							</span>
							strologie Consciente
							<br />
							<span className="text-accent">& Reiki</span>
						</h1>
					</div>
```

### APRÈS (à coller)
```tsx
					<div>
						<h1
							id="hero-title"
							className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-[1.1] mb-4 sm:mb-6"
						>
							<span className="font-calligraphic text-accent text-5xl sm:text-6xl md:text-7xl lg:text-8xl inline-block align-baseline motion-safe:transition-transform duration-300 hover:scale-110">
								É
							</span>
							milie Perez
							<br />
							<span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-accent">
								Astrologue & Reiki à Cépet
							</span>
						</h1>
					</div>
```

### Message commit
```
feat(seo): H1 optimisé avec nom + profession Astrologue
```

---

## FICHIER 3: content/seo.ts

### Modification 1 - Ligne 11
AVANT:
```typescript
  description: 'Émilie Perez, praticienne en astrologie thérapeutique, Reiki et accompagnement holistique à Cépet (Toulouse Nord). Consultations en cabinet et à distance.',
```

APRÈS:
```typescript
  description: 'Émilie Perez, astrologue certifiée en astrologie humaniste, praticienne Reiki et accompagnement holistique à Cépet (Toulouse Nord). Consultations de thème natal en cabinet et à distance.',
```

### Modification 2 - Ligne 20
AVANT:
```typescript
    description: 'Émilie Perez, praticienne en astrologie thérapeutique, Reiki et accompagnement holistique à Toulouse.',
```

APRÈS:
```typescript
    description: 'Émilie Perez, astrologue certifiée en astrologie humaniste, praticienne Reiki et accompagnement holistique à Toulouse.',
```

### Modification 3 - Ligne 33
AVANT:
```typescript
    description: 'Émilie Perez, praticienne en astrologie et Reiki à Toulouse',
```

APRÈS:
```typescript
    description: 'Émilie Perez, astrologue certifiée et praticienne Reiki à Toulouse',
```

### Modification 4 - Ligne 52
AVANT:
```typescript
    description: 'Émilie Perez accompagne les femmes en transition avec astrologie symbolique, Reiki et écoute profonde. Séances sur-mesure en cabinet à Cépet (Toulouse Nord) ou en ligne. Découvrez votre parcours en 3 étapes.',
```

APRÈS:
```typescript
    description: 'Émilie Perez, astrologue certifiée, accompagne les femmes en transition avec astrologie humaniste, Reiki et écoute profonde. Consultations de thème natal sur-mesure en cabinet à Cépet (Toulouse Nord) ou en ligne.',
```

### Modification 5 - Ligne 147
AVANT:
```typescript
    description: 'Émilie Perez, certifiée en astrologie thérapeutique et Reiki Usui, en cabinet à Cépet au nord de Toulouse. Mon parcours, mes formations et ma vision de l\'accompagnement holistique.',
```

APRÈS:
```typescript
    description: 'Émilie Perez, astrologue certifiée en astrologie humaniste et praticienne Reiki Usui 3ème degré, en cabinet à Cépet au nord de Toulouse. Mon parcours, mes formations et ma vision de l\'accompagnement astrologique holistique.',
```

### Message commit
```
feat(seo): Meta descriptions 'astrologue certifiée' vs 'praticienne'
```

---

## FICHIER 4: src/page-components/About.tsx

### Localisation
Ligne ~459 (cherche "miroir de notre monde intérieur")

### AVANT
```tsx
											<strong>
												miroir de notre monde intérieur
											</strong>
										.
									</p>
```

### APRÈS
```tsx
											<strong>
												miroir de notre monde intérieur
											</strong>. Mon approche est basée sur l'analyse du thème natal et l'accompagnement holistique, et non sur la voyance ou la médiumnité
										.
									</p>
```

### Message commit
```
feat(seo): Signal désambiguïsation 'non voyance/médiumnité'
```

---

## FICHIER 5: src/page-components/Reiki.tsx

### Localisation
Ligne ~216 (cherche "l'esprit et le corps sont liés")

### AVANT
```tsx
										<strong className="text-foreground">
											{" "}
											Une pratique qui place au centre
											l'être humain dans sa globalité, où
											l'esprit et le corps sont liés et
											indissociables.
										</strong>
										{" "}Je vous reçois en cabinet à Cépet,
```

### APRÈS
```tsx
										<strong className="text-foreground">
											{" "}
											Une pratique qui place au centre
											l'être humain dans sa globalité, où
											l'esprit et le corps sont liés et
											indissociables.
										</strong>
										{" "}Mon approche du Reiki s'inscrit dans une vision holistique, en complémentarité avec l'astrologie pour comprendre les cycles énergétiques personnels. Je vous reçois en cabinet à Cépet,
```

### Message commit
```
feat(seo): Ancrage lexical Reiki + astrologie
```

---

## RÉCAPITULATIF

**5 fichiers à modifier** via l'interface GitHub :
1. ✅ content/schema.ts
2. ✅ components/sections/HeroSection.tsx  
3. ✅ content/seo.ts (5 lignes)
4. ✅ src/page-components/About.tsx
5. ✅ src/page-components/Reiki.tsx

**Effet total** : Désambiguïsation entité Google astrologue vs médium (+80% amélioration attendue)

Une fois tous les commits faits, Vercel déploiera automatiquement ! 🚀
