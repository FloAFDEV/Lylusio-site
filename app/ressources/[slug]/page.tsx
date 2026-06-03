import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarDays } from "lucide-react";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import CALENDLY_URLS from "@/lib/calendly";
import {
	getRessourceArticleBySlug,
	getAllRessourceSlugs,
	type RessourceArticle,
} from "@/lib/ressources";

// SSG : toutes les pages pré-générées à la construction
export function generateStaticParams() {
	return getAllRessourceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const article = getRessourceArticleBySlug(slug);

	if (!article) {
		return {
			title: "Article introuvable | Lylusio",
			description: "Cet article n'existe pas ou a été déplacé.",
		};
	}

	const url = `https://lylusio.fr/ressources/${article.slug}`;

	return {
		title: `${article.title} | Lylusio`,
		description: article.description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			type: "article",
			locale: "fr_FR",
			url,
			title: article.title,
			description: article.description,
			siteName: "Lylusio",
			images: [
				{
					url: `https://lylusio.fr${article.image}`,
					width: 1200,
					height: 630,
					alt: article.imageAlt,
				},
			],
			publishedTime: article.date,
		},
		twitter: {
			card: "summary_large_image",
			title: article.title,
			description: article.description,
			images: [`https://lylusio.fr${article.image}`],
		},
		robots: {
			index: true,
			follow: true,
		},
	};
}

function buildArticleSchema(article: RessourceArticle) {
	return {
		"@context": "https://schema.org",
		"@type": "BlogPosting",
		headline: article.title,
		description: article.description,
		image: `https://lylusio.fr${article.image}`,
		datePublished: article.date,
		dateModified: article.date,
		url: `https://lylusio.fr/ressources/${article.slug}`,
		inLanguage: "fr-FR",
		author: {
			"@type": "Person",
			name: "Émilie Perez",
			url: "https://lylusio.fr/emilie-perez",
		},
		publisher: {
			"@type": "Organization",
			name: "Lylusio",
			url: "https://lylusio.fr",
			logo: {
				"@type": "ImageObject",
				url: "https://lylusio.fr/assets/logo-lylusio.webp",
			},
		},
		mainEntityOfPage: {
			"@type": "WebPage",
			"@id": `https://lylusio.fr/ressources/${article.slug}`,
		},
		articleSection: article.categoryLabel,
		wordCount:
			[article.intro, ...article.sections.map((s) => s.content), article.conclusion]
				.join(" ")
				.split(/\s+/).length,
	};
}

function buildBreadcrumbSchema(article: RessourceArticle) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "Accueil",
				item: "https://lylusio.fr",
			},
			{
				"@type": "ListItem",
				position: 2,
				name: "Ressources",
				item: "https://lylusio.fr/ressources",
			},
			{
				"@type": "ListItem",
				position: 3,
				name: article.title,
				item: `https://lylusio.fr/ressources/${article.slug}`,
			},
		],
	};
}

const categoryServiceLink: Record<RessourceArticle["category"], { href: string; label: string }> =
	{
		astrologie: { href: "/astrologie-toulouse", label: "Consultation d'astrologie" },
		reiki: { href: "/reiki-toulouse", label: "Séance de Reiki" },
		"developpement-personnel": { href: "/accompagnement-toulouse", label: "Accompagnement" },
	};

export default async function RessourceArticlePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const article = getRessourceArticleBySlug(slug);

	if (!article) {
		notFound();
	}

	const formattedDate = new Date(article.date).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	const serviceLink = categoryServiceLink[article.category];
	const articleSchema = buildArticleSchema(article);
	const breadcrumbSchema = buildBreadcrumbSchema(article);

	return (
		<>
			{/* JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
			/>

			<Header />
			<FloatingCTA />
			<Breadcrumbs customTitle={article.title} />

			<main id="main-content" className="min-h-screen bg-background">
				{/* Hero image */}
				<div className="relative w-full h-56 sm:h-72 md:h-96 overflow-hidden">
					<Image
						src={article.image}
						alt={article.imageAlt}
						fill
						priority
						className="object-cover"
						sizes="100vw"
						quality={80}
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
				</div>

				{/* Article content */}
				<article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl py-10 md:py-14">
					{/* Back link */}
					<Link
						href="/ressources"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors mb-8 group"
					>
						<ArrowLeft
							className="w-4 h-4 transition-transform group-hover:-translate-x-1"
							aria-hidden="true"
						/>
						Retour aux ressources
					</Link>

					{/* Category + meta */}
					<div className="flex flex-wrap items-center gap-3 mb-4">
						<span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
							{article.categoryLabel}
						</span>
						<span className="flex items-center gap-1 text-sm text-muted-foreground">
							<Clock className="w-3.5 h-3.5" aria-hidden="true" />
							{article.readTime} min de lecture
						</span>
						<time
							dateTime={article.date}
							className="flex items-center gap-1 text-sm text-muted-foreground"
						>
							<CalendarDays className="w-3.5 h-3.5" aria-hidden="true" />
							{formattedDate}
						</time>
					</div>

					{/* Title */}
					<h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-foreground mb-6 leading-tight">
						{article.title}
					</h1>

					{/* Intro */}
					<p className="text-lg text-muted-foreground leading-relaxed mb-10 border-l-4 border-accent/40 pl-4 italic">
						{article.intro}
					</p>

					{/* Sections */}
					<div className="space-y-8">
						{article.sections.map((section, index) => (
							<section key={index} aria-labelledby={`section-${index}`}>
								<h2
									id={`section-${index}`}
									className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3"
								>
									{section.heading}
								</h2>
								<p className="text-base text-foreground/80 leading-relaxed">
									{section.content}
								</p>
							</section>
						))}
					</div>

					{/* Conclusion */}
					<div className="mt-10 p-6 bg-accent/5 border border-accent/15 rounded-2xl">
						<p className="text-base text-foreground/80 leading-relaxed italic">
							{article.conclusion}
						</p>
					</div>

					{/* Author */}
					<div className="flex items-center gap-4 mt-10 pt-8 border-t border-border/30">
						<Image
							src="/assets/emilie-portrait.webp"
							alt="Émilie Perez"
							width={56}
							height={56}
							className="rounded-full object-cover flex-shrink-0"
							quality={85}
						/>
						<div>
							<p className="font-medium text-foreground text-sm">Émilie Perez</p>
							<p className="text-sm text-muted-foreground">
								Astrologue thérapeutique & Praticienne Reiki Usui — Toulouse
							</p>
						</div>
						<Link
							href="/emilie-perez"
							className="ml-auto text-sm text-accent hover:text-accent/80 transition-colors hidden sm:block"
						>
							À propos
						</Link>
					</div>

					{/* CTA */}
					<div className="mt-12 text-center space-y-4">
						<p className="text-muted-foreground">
							Envie d'approfondir ce sujet avec un accompagnement personnalisé ?
						</p>
						<div className="flex flex-col sm:flex-row gap-3 justify-center">
							<Button asChild variant="accent" size="lg">
								<a
									href={CALENDLY_URLS.GENERAL}
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Réserver votre séance avec Émilie Perez (ouvre Calendly)"
								>
									Réserver une séance
								</a>
							</Button>
							<Button asChild variant="outline" size="lg">
								<Link href={serviceLink.href}>{serviceLink.label}</Link>
							</Button>
						</div>
					</div>
				</article>
			</main>

			<Footer />
		</>
	);
}
