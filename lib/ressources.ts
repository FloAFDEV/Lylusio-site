export interface RessourceSection {
	heading: string;
	content: string;
}

export interface RessourceArticle {
	slug: string;
	title: string;
	description: string;
	date: string; // ISO date YYYY-MM-DD
	image: string; // chemin depuis /assets/
	imageAlt: string;
	category: "astrologie" | "reiki" | "developpement-personnel";
	categoryLabel: string;
	readTime: number; // minutes
	intro: string;
	sections: RessourceSection[];
	conclusion: string;
}

export const ressourceArticles: RessourceArticle[] = [
	{
		slug: "theme-astral-reconversion",
		title: "Thème astral et reconversion professionnelle",
		description:
			"Comment votre thème natal révèle vos talents naturels, vos blocages et la voie professionnelle qui vous ressemble vraiment.",
		date: "2026-03-15",
		image: "/assets/travail-astro.webp",
		imageAlt:
			"Thème astral et reconversion professionnelle - Émilie Perez Lylusio",
		category: "astrologie",
		categoryLabel: "Astrologie",
		readTime: 7,
		intro:
			"La reconversion professionnelle est l'un des questionnements les plus fréquents que j'entends en consultation. « Est-ce que je suis sur le bon chemin ? », « Qu'est-ce que je suis vraiment censé faire de ma vie ? »… Ces questions ont des réponses inscrites dans votre thème natal — à condition de savoir les lire.",
		sections: [
			{
				heading: "Le Milieu du Ciel (MC) : votre vocation publique",
				content:
					"Le Milieu du Ciel (10e maison) indique la direction professionnelle qui correspond à votre nature profonde. Ce n'est pas forcément le métier que vous exercez, mais celui vers lequel vous tendez naturellement. Un MC en Verseau appelle souvent des professions innovantes, sociales ou technologiques. Un MC en Cancer oriente vers le soin, l'éducation, ou tout ce qui nourrit les autres.",
			},
			{
				heading: "La 2e maison : vos valeurs et ressources naturelles",
				content:
					"La 2e maison révèle ce que vous valorisez profondément et vos talents innés. Si vous traversez une reconversion, regarder cette maison permet de recentrer votre projet sur ce qui vous appartient vraiment — pas ce que le marché du travail attend, mais ce que vous avez à offrir de singulier.",
			},
			{
				heading: "Les planètes en 6e maison : votre rapport au travail quotidien",
				content:
					"La 6e maison parle du travail au quotidien, du service, de la routine. Des planètes ici indiquent une forte implication dans votre vie professionnelle ou une nécessité de sens dans les tâches concrètes. Saturne en 6e peut indiquer une vocation dans un domaine exigeant de la rigueur ; Jupiter en 6e ouvre vers des environnements d'apprentissage ou d'enseignement.",
			},
			{
				heading: "Nœuds lunaires : le fil karmique de votre chemin",
				content:
					"Le Nœud Nord représente la direction évolutive de votre âme — ce vers quoi vous êtes appelé à aller, même si cela implique de sortir de votre zone de confort. Une reconversion qui suit l'axe des Nœuds lunaires a souvent un parfum de « juste » et d'évidence intérieure.",
			},
		],
		conclusion:
			"Votre thème natal n'est pas un destin figé, mais une carte d'orientation. Il ne dit pas « tu dois faire ce métier », mais « voici ce qui te nourrit, te stimule et t'aligne ». En consultation, nous explorons ensemble ces indicateurs pour construire un projet de reconversion ancré dans qui vous êtes vraiment.",
	},
	{
		slug: "chemin-evolution-astrologie",
		title: "Astrologie et chemin d'évolution personnelle",
		description:
			"L'astrologie thérapeutique comme outil d'introspection pour mieux se connaître, traverser les crises et grandir en conscience.",
		date: "2026-02-20",
		image: "/assets/astro-profondeurs.webp",
		imageAlt: "Astrologie et évolution personnelle - Émilie Perez Lylusio",
		category: "astrologie",
		categoryLabel: "Astrologie",
		readTime: 6,
		intro:
			"L'astrologie que je pratique n'est pas divinatoire — elle ne prédit pas ce qui va se passer. Elle est un outil de connaissance de soi qui permet de comprendre vos schémas de vie, vos ressources profondes et les cycles que vous traversez. C'est une astrologie au service de votre évolution personnelle.",
		sections: [
			{
				heading: "Se comprendre à travers son thème natal",
				content:
					"Votre thème natal est une photographie du ciel au moment précis de votre naissance. Il décrit votre tempérament, vos besoins affectifs, votre rapport à l'autorité, à l'amour, au travail… Comprendre ce « programme de base » permet de cesser de se battre contre soi-même et d'utiliser ses énergies de manière plus alignée.",
			},
			{
				heading: "Les crises comme leviers de transformation",
				content:
					"En astrologie, les moments de crise correspondent souvent à des transits majeurs — Saturne qui traverse votre Soleil, Pluton qui active votre Ascendant. Ce ne sont pas des malédictions mais des invitations à muer. Comprendre le sens symbolique d'un transit permet de traverser les périodes difficiles avec moins de résistance et plus de lucidité.",
			},
			{
				heading: "Les cycles saturno-joviens : s'orienter dans le temps",
				content:
					"Saturne (discipline, structure) et Jupiter (expansion, opportunités) forment des cycles de 7, 12 et 29 ans qui rythment votre vie. La « saturnienne » — le retour de Saturne à sa position natale vers 29 ans — est un rite de passage universel. Savoir dans quel cycle vous vous trouvez permet de comprendre pourquoi certaines périodes appellent l'action, d'autres le repli.",
			},
			{
				heading: "Astrologie et psychologie : une alliance naturelle",
				content:
					"L'astrologie thérapeutique ne remplace pas un suivi psychologique, mais elle peut le compléter. Elle offre un cadre symbolique pour mettre des mots (ou des images) sur des ressentis diffus. Beaucoup de personnes trouvent dans leur thème natal une validation de ce qu'elles pressentaient intuitivement sur elles-mêmes.",
			},
		],
		conclusion:
			"L'astrologie devient un outil d'évolution personnelle puissant lorsqu'elle est utilisée non pour fuir la responsabilité de ses choix, mais pour mieux se comprendre et agir depuis un endroit plus conscient. C'est dans cet esprit que je conduis chaque consultation.",
	},
	{
		slug: "reiki-bien-etre-quotidien",
		title: "Le Reiki pour le bien-être quotidien",
		description:
			"Comment intégrer les principes et pratiques du Reiki dans votre vie de tous les jours pour plus de sérénité, d'ancrage et de vitalité.",
		date: "2026-01-28",
		image: "/assets/reiki-healing.webp",
		imageAlt: "Reiki bien-être quotidien - Émilie Perez Lylusio",
		category: "reiki",
		categoryLabel: "Reiki",
		readTime: 5,
		intro:
			"Le Reiki est bien plus qu'une séance mensuelle chez un praticien. C'est aussi une philosophie de vie, portée par les cinq principes d'Usui, qui peut transformer la qualité de votre présence au quotidien. Que vous soyez initié ou simplement curieux, ces pratiques sont accessibles à tous.",
		sections: [
			{
				heading: "Les cinq principes du Reiki Usui",
				content:
					"Juste pour aujourd'hui, ne te mets pas en colère. Juste pour aujourd'hui, ne te fais pas de souci. Juste pour aujourd'hui, sois reconnaissant. Juste pour aujourd'hui, travaille avec honnêteté. Juste pour aujourd'hui, sois bienveillant envers tous les êtres vivants. Ces principes ne sont pas des injonctions mais des invitations à revenir au moment présent, encore et encore.",
			},
			{
				heading: "Auto-traitement : poser les mains sur soi",
				content:
					"Si vous êtes initié au Reiki (niveau 1), la pratique quotidienne d'auto-traitement — poser les mains sur différentes zones du corps pendant 15 à 30 minutes — ancre profondément les bénéfices énergétiques. Même sans initiation, poser les mains sur votre cœur ou votre ventre avec intention et respiration consciente produit un effet apaisant réel.",
			},
			{
				heading: "Reiki et gestion du stress",
				content:
					"Le Reiki active le système nerveux parasympathique — le mode « repos et digestion » — en contrebalançant l'état de vigilance permanent dans lequel beaucoup d'entre nous évoluons. Des études préliminaires montrent des effets significatifs sur la réduction de l'anxiété, de la douleur chronique et des troubles du sommeil.",
			},
			{
				heading: "Intégrer le Reiki dans une routine matinale",
				content:
					"Cinq minutes le matin, avant de consulter votre téléphone : asseyez-vous, fermez les yeux, posez une main sur le cœur et une autre sur le ventre. Respirez profondément. Lisez mentalement (ou à voix haute) les cinq principes. Cette micro-pratique change l'état dans lequel vous abordez votre journée.",
			},
		],
		conclusion:
			"Le Reiki au quotidien, c'est l'art de revenir à soi dans le tumulte du monde. Vous n'avez pas besoin d'une heure ni d'un espace parfait — juste de votre intention et de quelques respirations conscientes. En séance, nous pouvons approfondir ces pratiques et les adapter à votre rythme de vie.",
	},
	{
		slug: "transits-planetaires-comprendre",
		title: "Comprendre les transits planétaires",
		description:
			"Les transits planétaires expliqués simplement : comment les mouvements actuels des planètes influencent votre thème natal et vos cycles de vie.",
		date: "2026-03-01",
		image: "/assets/seance-astro-zen.webp",
		imageAlt: "Comprendre les transits planétaires - Émilie Perez Lylusio",
		category: "astrologie",
		categoryLabel: "Astrologie",
		readTime: 8,
		intro:
			"« Pourquoi est-ce que tout se bouscule en ce moment ? » Cette question revient souvent en consultation. La réponse se trouve fréquemment dans les transits planétaires — les mouvements actuels des planètes et leurs interactions avec votre thème natal. Comprendre ces cycles vous aide à traverser les périodes intenses avec moins de résistance.",
		sections: [
			{
				heading: "Qu'est-ce qu'un transit ?",
				content:
					"Un transit se produit quand une planète en mouvement dans le ciel actuel forme un angle (conjonction, opposition, carré, trigone…) avec une planète ou un point de votre thème natal. C'est comme un déclencheur énergétique : la planète transiteuse « active » le potentiel de votre planète natale.",
			},
			{
				heading: "Les planètes lentes : les grands transformateurs",
				content:
					"Saturne, Uranus, Neptune et Pluton se déplacent lentement et leurs transits durent de plusieurs mois à quelques années. Ce sont les grands architectes du changement. Saturne impose la restructuration et la maturité. Uranus provoque des ruptures soudaines pour libérer. Neptune dissout ce qui est devenu une illusion. Pluton transforme en profondeur, souvent douloureux mais radical.",
			},
			{
				heading: "Saturne en transit : l'épreuve qui construit",
				content:
					"Quand Saturne traverse un point sensible de votre thème — votre Soleil, votre Lune, votre Ascendant — vous pouvez ressentir un poids, des obstacles, une période d'effort intense. C'est inconfortable, mais c'est aussi le moment où vous construisez quelque chose de durable. Les personnes qui travaillent avec leur transit Saturne au lieu de le fuir en ressortent renforcées.",
			},
			{
				heading: "Lire ses transits sans anxiété",
				content:
					"L'astrologie des transits n'est pas une météo des catastrophes. Même un transit difficile contient une opportunité. Un carré de Pluton sur votre Vénus peut signifier une transformation profonde de vos relations, pas nécessairement une rupture. La clé est de comprendre le thème symbolique activé et de travailler avec lui de façon consciente.",
			},
		],
		conclusion:
			"La lecture des transits est l'une des applications les plus concrètes et les plus utiles de l'astrologie. En consultation, nous regardons ensemble les transits actuels et à venir sur votre thème natal pour identifier les fenêtres d'opportunité, les périodes de tension, et la meilleure façon d'aborder les mois qui viennent.",
	},
	{
		slug: "revolution-solaire-guide",
		title: "Guide pratique de la révolution solaire",
		description:
			"Tout ce qu'il faut savoir sur la révolution solaire : comment la lire, ce qu'elle prédit pour l'année à venir et comment l'utiliser pour orienter vos intentions.",
		date: "2026-02-10",
		image: "/assets/zodiac-wheel.webp",
		imageAlt: "Guide révolution solaire - Émilie Perez Lylusio",
		category: "astrologie",
		categoryLabel: "Astrologie",
		readTime: 7,
		intro:
			"Chaque année, le Soleil revient exactement à sa position natale dans le ciel — c'est votre anniversaire astrologique. Ce moment déclenche ce qu'on appelle la Révolution Solaire (RS), une carte du ciel personnelle qui donne le « thème de l'année » pour les 12 mois à venir. C'est l'un des outils les plus précieux de l'astrologie prévisionnelle.",
		sections: [
			{
				heading: "Comment se calcule une révolution solaire ?",
				content:
					"La RS se calcule pour le lieu où vous vous trouvez au moment précis où le Soleil atteint son degré natal. C'est pourquoi certains astrologues conseillent de choisir sa destination d'anniversaire en fonction de la RS que l'on souhaite — une pratique appelée « astrocartographie ». Vous pouvez obtenir votre RS via un logiciel d'astrologie ou en consultation.",
			},
			{
				heading: "L'Ascendant de la RS : la couleur de l'année",
				content:
					"L'Ascendant de la Révolution Solaire indique le « filtre » de l'année, son atmosphère générale. Un Ascendant RS en Bélier annonce une année de démarrage, d'action, d'affirmation de soi. En Cancer, ce sera une année plus intérieure, familiale, émotionnelle. En Capricorne, l'accent sera mis sur la structure, le travail, les responsabilités.",
			},
			{
				heading: "Le Soleil de RS et sa maison : le foyer d'attention",
				content:
					"La maison dans laquelle tombe le Soleil de RS indique où votre énergie vitale sera principalement orientée cette année. Soleil en 7e maison RS = une année centrée sur les relations, les partenariats, les contrats. Soleil en 10e = une année professionnelle de premier plan. Soleil en 12e = une année de repli, de bilan intérieur, parfois de retraite.",
			},
			{
				heading: "Les stelliums et planètes angulaires : les accents forts",
				content:
					"Les planètes situées sur les angles de la RS (Ascendant, Milieu du Ciel et leurs opposés) ont un impact particulièrement fort. Mars sur l'Ascendant RS : une année d'énergie, parfois de conflits à gérer. Jupiter au MC RS : une année de visibilité et d'expansion professionnelle. Ces configurations amplifient les thèmes de l'année.",
			},
		],
		conclusion:
			"La Révolution Solaire ne dicte pas votre année — elle en éclaire les potentiels et les défis. Lue en complément des transits en cours, elle donne une vision précise et nuancée de ce qui vous attend. Je propose des consultations dédiées à la RS pour vous aider à orienter vos intentions et prendre les meilleures décisions pour l'année à venir.",
	},
];

/**
 * Retourne un article par son slug, ou undefined s'il n'existe pas.
 */
export function getRessourceArticleBySlug(
	slug: string
): RessourceArticle | undefined {
	return ressourceArticles.find((a) => a.slug === slug);
}

/**
 * Retourne tous les slugs (pour generateStaticParams).
 */
export function getAllRessourceSlugs(): string[] {
	return ressourceArticles.map((a) => a.slug);
}
