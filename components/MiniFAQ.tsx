/**
 * Mini FAQ Component
 * Displays a subset of FAQ questions for specific categories
 * Used on service pages (Reiki, Astrologie, etc.)
 */

"use client";

import Link from "next/link";
import { HelpCircle } from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { getFAQByCategory } from "@/content/faq-data";

interface MiniFAQProps {
	/** Category title from faq-data (e.g., "Reiki", "Astrologie") */
	category: string;
	/** Number of questions to display (default: 3) */
	maxQuestions?: number;
	/** Optional title override */
	title?: string;
}

const MiniFAQ = ({ category, maxQuestions = 3, title }: MiniFAQProps) => {
	const faqQuestions = getFAQByCategory(category);
	const displayQuestions = faqQuestions.slice(0, maxQuestions);

	if (displayQuestions.length === 0) {
		return null;
	}

	const defaultTitle = `${category} en quelques questions`;

	return (
		<section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 md:mb-20 relative z-10">
			<div className="max-w-3xl mx-auto">
				<div className="text-center mb-8">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
						<HelpCircle className="w-4 h-4 text-accent" aria-hidden="true" />
						<span className="text-sm text-accent font-medium">
							Questions fréquentes
						</span>
					</div>
					<h2 className="font-display text-xl sm:text-2xl text-foreground">
						{title || defaultTitle}
					</h2>
				</div>

				<Accordion type="single" collapsible className="space-y-3">
					{displayQuestions.map((item, index) => (
						<AccordionItem
							key={index}
							value={`item-${index}`}
							className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/30 px-5"
						>
							<AccordionTrigger className="text-left font-display text-base text-foreground hover:text-accent py-4">
								{item.question}
							</AccordionTrigger>
							<AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-4">
								{item.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>

				<p className="text-center mt-6 text-muted-foreground text-sm">
					Plus de questions ?{" "}
					<Link
						href="/faq"
						className="text-accent hover:text-gold transition-colors duration-300 underline decoration-accent/30 hover:decoration-gold/50 underline-offset-2"
					>
						Consulter la FAQ complète
					</Link>
				</p>
			</div>
		</section>
	);
};

export default MiniFAQ;
