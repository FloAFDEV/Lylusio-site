"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useInView } from "@/hooks/useInView";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqCategories, faqStructuredData, FAQCategory } from "@/content/faq-data";

// Animated FAQ Category Component
const AnimatedFAQCategory = ({
	category,
	categoryIndex,
}: {
	category: FAQCategory;
	categoryIndex: number;
}) => {
	const { ref, isInView } = useInView({ threshold: 0.1 });

	return (
		<div
			ref={ref}
			className={`bg-card/50 rounded-xl border border-border/20 p-5 md:p-6 transition-all duration-700 ease-out ${
				isInView
					? "opacity-100 translate-y-0"
					: "opacity-0 translate-y-8"
			}`}
			style={{ transitionDelay: `${categoryIndex * 100}ms` }}
		>
			<h2 className="font-display text-xl text-foreground mb-4 flex items-center gap-2.5">
				<category.icon
					className="w-4 h-4 text-accent"
					strokeWidth={1.5}
					aria-hidden="true"
				/>
				{category.title}
			</h2>

			<Accordion type="single" collapsible className="space-y-1">
				{category.questions.map((item, index) => (
					<AccordionItem
						key={index}
						value={`${categoryIndex}-${index}`}
						className="border-b border-border/15 last:border-0"
					>
						<AccordionTrigger className="text-left py-3 text-base text-foreground hover:text-accent transition-colors font-medium">
							{item.question}
						</AccordionTrigger>
						<AccordionContent className="text-muted-foreground text-base leading-relaxed pb-3">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
};

const FAQ = () => {
	// Generate star positions only on client side to avoid hydration mismatch
	const [stars, setStars] = useState<
		Array<{ top: number; left: number; delay: number }>
	>([]);

	useEffect(() => {
		// Generate random positions only after component mounts (client-side only)
		setStars(
			Array.from({ length: 15 }, () => ({
				top: Math.random() * 100,
				left: Math.random() * 100,
				delay: Math.random() * 5,
			}))
		);
	}, []);

	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<div className="min-h-screen bg-background relative">
				{/* Decorative background */}
				<div
					className="absolute inset-0 overflow-hidden pointer-events-none"
					aria-hidden="true"
				>
					{stars.map((star, i) => (
						<div
							key={i}
							className="absolute w-0.5 h-0.5 bg-accent/15 rounded-full animate-gentle-pulse"
							style={{
								top: `${star.top}%`,
								left: `${star.left}%`,
								animationDelay: `${star.delay}s`,
							}}
						/>
					))}
				</div>

				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main id="main-content" className="pt-20 sm:pt-24 md:pt-28 pb-16 md:pb-20 relative">
					<section
						className="container mx-auto px-4 sm:px-6 lg:px-8"
						aria-labelledby="faq-title"
					>
						{/* Header */}
						<header className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
							<p className="section-label">FAQ</p>
							<h1
								id="faq-title"
								className="text-foreground mb-6 first-letter-fancy-lg"
							>
								Questions Fréquentes
							</h1>
							<p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
								Retrouvez ici les réponses aux questions les
								plus courantes sur mes pratiques, les tarifs et
								le déroulement des séances.
							</p>
						</header>

						{/* FAQ Categories */}
						<div className="max-w-3xl mx-auto space-y-6">
							{faqCategories.map((category, categoryIndex) => (
								<AnimatedFAQCategory
									key={categoryIndex}
									category={category}
									categoryIndex={categoryIndex}
								/>
							))}
						</div>

						{/* CTA Section */}
						<div className="max-w-2xl mx-auto text-center mt-16 p-8 bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl border border-accent/20">
							<h2 className="font-display text-xl md:text-2xl text-foreground mb-4">
								Vous avez d'autres questions ?
							</h2>
							<p className="text-muted-foreground mb-6">
								N'hésitez pas à me contacter, je serai ravie de
								vous répondre personnellement.
							</p>
							<Link href="/contact">
								<Button className="bg-accent hover:bg-accent/90 text-white">
									Me contacter
								</Button>
							</Link>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export { faqStructuredData };
export default FAQ;
