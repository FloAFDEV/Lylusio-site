/**
 * Centralized FAQ Data
 * Single source of truth for all FAQ content across the application
 * Used in:
 * - /faq page (complete FAQ)
 * - /reiki-toulouse page (mini-FAQ)
 * - /astrologie-toulouse page (mini-FAQ)
 * - /accompagnement-toulouse page (mini-FAQ)
 */

import Link from "next/link";
import { Star, Hand, Heart, FileText, Sparkles } from "lucide-react";
import { ReactNode } from "react";

export interface FAQQuestion {
	question: string;
	answer: string | ReactNode;
}

export interface FAQCategory {
	title: string;
	icon: typeof Star;
	questions: FAQQuestion[];
}

export const faqCategories: FAQCategory[] = [
	{
		title: "Astrologie",
		icon: Star,
		questions: [
			{
				question: "Qu'est-ce qu'un thème astral ?",
				answer: "Le thème astral (ou carte du ciel natale) est une photographie du ciel au moment précis de votre naissance. Il révèle la position des planètes dans les signes du zodiaque et les maisons astrologiques. C'est un outil puissant de connaissance de soi qui éclaire vos talents, défis, et chemins d'évolution.",
			},
			{
				question: "Comment se déroule une consultation d'astrologie ?",
				answer: "La séance dure environ 1h30 à 2h. Je prépare votre thème avant notre rendez-vous à partir de vos données de naissance (date, heure exacte, lieu). Pendant la consultation, nous explorons ensemble les grandes lignes de votre thème : votre personnalité profonde, vos besoins émotionnels, votre façon de communiquer, vos talents... Je réponds aussi à vos questions spécifiques.",
			},
			{
				question: "Ai-je besoin de connaître mon heure de naissance exacte ?",
				answer: "L'heure exacte de naissance est essentielle pour une analyse complète car elle détermine l'Ascendant et les maisons astrologiques. Vous pouvez demander votre acte de naissance complet à la mairie de votre lieu de naissance.",
			},
			{
				question: "Quelle est la différence entre astrologie et voyance ?",
				answer: "L'astrologie n'est pas de la voyance. C'est un outil symbolique de connaissance de soi basé sur les cycles planétaires. Je ne prédis pas l'avenir de façon déterministe. Je vous aide à comprendre les énergies à l'œuvre dans votre vie et les périodes propices aux changements, tout en rappelant que vous restez maître de vos choix.",
			},
		],
	},
	{
		title: "Reiki",
		icon: Hand,
		questions: [
			{
				question: "Qu'est-ce que le Reiki ?",
				answer: "Le Reiki est une pratique énergétique d'origine japonaise qui favorise la relaxation profonde et l'équilibre énergétique. Par l'imposition des mains, le praticien canalise l'énergie universelle pour harmoniser les centres énergétiques (chakras) et soutenir les capacités naturelles d'auto-guérison du corps.",
			},
			{
				question: "Comment se déroule une séance de Reiki ?",
				answer: "La séance dure environ 1h. Vous restez habillé(e), allongé(e) confortablement sur une table de massage. Je pose délicatement mes mains sur différentes parties du corps (ou légèrement au-dessus selon votre préférence). Vous pouvez ressentir de la chaleur, des picotements, ou simplement une profonde détente. Chaque expérience est unique.",
			},
			{
				question: "Le Reiki peut-il remplacer un traitement médical ?",
				answer: "Non, le Reiki est une pratique complémentaire et ne se substitue en aucun cas à un suivi médical. Il peut accompagner un traitement conventionnel en favorisant la détente et le bien-être général, mais ne doit jamais être considéré comme un traitement médical. Je vous encourage à consulter un médecin pour tout problème de santé.",
			},
			{
				question: "Combien de séances de Reiki sont recommandées ?",
				answer: "Cela dépend de vos besoins et objectifs. Une seule séance peut déjà apporter du bienfait, notamment pour la relaxation. Pour un travail plus profond (stress chronique, période de transition...), 3 à 4 séances espacées de 3 semaines à 1 mois peuvent être bénéfiques. Nous en discutons ensemble lors de notre première rencontre.",
			},
		],
	},
	{
		title: "Thérapie Holistique",
		icon: Sparkles,
		questions: [
			{
				question: "Qu'est-ce qu'une thérapie holistique ?",
				answer: "La thérapie holistique est une approche globale qui considère l'être humain dans sa totalité : physique, émotionnel, mental et énergétique. Elle associe différentes pratiques pour vous accompagner vers un bien-être profond et durable.",
			},
			{
				question: "Pour qui est-elle recommandée ?",
				answer: (
					<div className="space-y-2">
						<p>
							La thérapie holistique est particulièrement adaptée si vous
							souffrez de :
						</p>
						<ul className="list-disc pl-5 space-y-1">
							<li>Anxiété, stress</li>
							<li>Surcharge émotionnelle</li>
							<li>Difficulté à lâcher prise sur les événements ou les personnes</li>
							<li>Troubles du sommeil</li>
							<li>Épuisement, fatigue, manque d'entrain</li>
							<li>Manque de confiance en soi, blocages pour avancer ou décider</li>
							<li>Peurs, phobies</li>
						</ul>
					</div>
				),
			},
			{
				question: "La thérapie holistique remplace-t-elle un suivi médical ?",
				answer: "Non. Il ne s'agit ni d'un diagnostic ni d'un traitement médical. C'est un accompagnement complémentaire.",
			},
			{
				question: "Le Reiki fait-il partie de la thérapie holistique ?",
				answer: (
					<span>
						Oui, le Reiki fait partie des approches énergétiques intégrées.
						Découvrez-en plus sur la{" "}
						<Link
							href="/reiki-toulouse"
							className="text-accent hover:underline"
						>
							page Reiki
						</Link>
						.
					</span>
				),
			},
			{
				question: "Combien de séances sont nécessaires ?",
				answer: "Chaque parcours est unique. Le nombre de séances dépend des besoins, objectifs et blocages de la personne.",
			},
		],
	},
	{
		title: "Accompagnement",
		icon: Heart,
		questions: [
			{
				question: "Qu'est-ce que l'accompagnement holistique ?",
				answer: "L'accompagnement holistique combine plusieurs outils (astrologie, énergétique, coaching) pour vous aider à traverser une période de transition, clarifier un projet, ou mieux vous connaître. C'est un parcours personnalisé sur plusieurs séances qui prend en compte toutes les dimensions de votre être.",
			},
			{
				question: "Comment savoir si j'ai besoin d'un accompagnement ?",
				answer: "Si vous traversez une période de questionnement, de transition (professionnelle, personnelle), si vous ressentez un décalage entre votre vie actuelle et vos aspirations profondes, ou si vous souhaitez simplement mieux vous connaître, l'accompagnement peut vous aider. N'hésitez pas à me contacter pour un premier échange gratuit.",
			},
		],
	},
	{
		title: "Tarifs & Pratique",
		icon: FileText,
		questions: [
			{
				question: "Quels sont vos tarifs ?",
				answer: "Les tarifs varient selon les prestations : consultation d'astrologie (thème natal) à partir de 90€, séance de Reiki à partir de 60€, accompagnement sur mesure selon le forfait choisi. Tous les détails sont disponibles sur les pages de chaque service. Des facilités de paiement peuvent être envisagées.",
			},
			{
				question: "Les consultations se font-elles en présentiel ou à distance ?",
				answer: "Je propose les deux formules. Les consultations en présentiel ont lieu à Toulouse-nord. Les séances à distance se font par visioconférence (WhatsApp ou Google Meet) et sont tout aussi efficaces pour l'astrologie et le coaching. Pour le Reiki, le présentiel est privilégié, mais des séances à distance sont également possibles.",
			},
			{
				question: "Comment prendre rendez-vous ?",
				answer: "Vous pouvez réserver directement en ligne via les liens Calendly disponibles sur chaque page de service, ou me contacter par email ou téléphone pour échanger avant de réserver.",
			},
			{
				question: "Quelle est votre politique d'annulation ?",
				answer: "Toute annulation doit être effectuée au moins 48h avant le rendez-vous pour un remboursement intégral. En cas d'annulation tardive ou d'absence sans prévenir, la séance sera due. En cas d'imprévu de mon côté, je vous proposerai bien sûr un nouveau créneau dans les meilleurs délais.",
			},
		],
	},
];

/**
 * Get FAQ questions by category title
 * @param categoryTitle - The title of the category (e.g., "Reiki", "Astrologie")
 * @returns Array of FAQ questions for that category
 */
export const getFAQByCategory = (categoryTitle: string): FAQQuestion[] => {
	const category = faqCategories.find((cat) => cat.title === categoryTitle);
	return category?.questions || [];
};

/**
 * Generate structured data for FAQ page (JSON-LD)
 */
export const faqStructuredData = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: faqCategories.flatMap((category) =>
		category.questions.map((q) => ({
			"@type": "Question",
			name: q.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: typeof q.answer === "string" ? q.answer : q.question,
			},
		}))
	),
};
