"use client";

import Link from "next/link";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Calendar, Eye } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { HoneypotContact } from "@/components/ClickToReveal";

/* Composant pour afficher la première lettre en calligraphie */
const CalligraphicLabel = ({ label }: { label: string }) => (
	<span className="inline-flex items-baseline">
		<span className="font-calligraphic text-[1.4em] leading-none -mr-0.5">
			{label.charAt(0)}
		</span>
		<span>{label.slice(1)}</span>
	</span>
);

interface ContactCardProps {
	icon: React.ElementType;
	title: string;
	isRevealed: boolean;
	onReveal: () => void;
	revealText: string;
	revealedContent: React.ReactNode;
	href?: string;
	external?: boolean;
	isInView: boolean;
	delay: number;
}

const ContactCard = ({
	icon: Icon,
	title,
	isRevealed,
	onReveal,
	revealText,
	revealedContent,
	href,
	external,
	isInView,
	delay,
}: ContactCardProps) => {
	const cardClasses = `card-soft flex items-center gap-4 transition-all duration-500 ease-out hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group ${
		isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
	}`;
	const cardStyle = { transitionDelay: isInView ? `${delay}ms` : "0ms" };

	const iconContent = (
		<div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300">
			<Icon className="w-5 h-5" aria-hidden="true" />
		</div>
	);

	// Static card (no reveal needed)
	if (!onReveal && href) {
		return (
			<a
				href={href}
				target={external ? "_blank" : undefined}
				rel={external ? "noopener noreferrer" : undefined}
				className={cardClasses}
				style={cardStyle}
			>
				{iconContent}
				<div>
					<p className="font-display text-lg text-foreground">
						<CalligraphicLabel label={title} />
					</p>
					{revealedContent}
				</div>
			</a>
		);
	}

	// Static card without link
	if (!onReveal && !href) {
		return (
			<div className={cardClasses} style={cardStyle}>
				{iconContent}
				<div>
					<p className="font-display text-lg text-foreground">
						<CalligraphicLabel label={title} />
					</p>
					{revealedContent}
				</div>
			</div>
		);
	}

	// Click-to-reveal card with smooth transition
	return (
		<div className={cardClasses} style={cardStyle}>
			{iconContent}
			<div className="flex-1">
				<p className="font-display text-lg text-foreground">
					<CalligraphicLabel label={title} />
				</p>
				{!isRevealed ? (
					<button
						onClick={onReveal}
						className="text-muted-foreground flex items-center gap-1.5 hover:text-accent transition-colors duration-300 text-left"
						aria-label={revealText}
					>
						<Eye className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" />
						<span className="text-sm">{revealText}</span>
					</button>
				) : (
					<a
						href={href}
						target={external ? "_blank" : undefined}
						rel={external ? "noopener noreferrer" : undefined}
						className="text-muted-foreground hover:text-accent transition-colors duration-300 inline-block"
						style={{
							animation: "revealSlideUp 0.25s ease-out forwards",
						}}
					>
						{revealedContent}
					</a>
				)}
			</div>
		</div>
	);
};

const ContactCards = () => {
	const { ref, isInView } = useInView({ threshold: 0.1 });
	const [showPhone, setShowPhone] = useState(false);
	const [showEmail, setShowEmail] = useState(false);

	return (
		<div ref={ref} className="grid sm:grid-cols-2 gap-6 mb-12">
			{/* Phone Card */}
			<ContactCard
				icon={Phone}
				title="Téléphone"
				isRevealed={showPhone}
				onReveal={() => setShowPhone(true)}
				revealText="Afficher le numéro"
				revealedContent={
					<p className="text-muted-foreground">06 19 15 19 59</p>
				}
				href="tel:+33619151959"
				isInView={isInView}
				delay={0}
			/>

			{/* Email Card */}
			<ContactCard
				icon={Mail}
				title="Email"
				isRevealed={showEmail}
				onReveal={() => setShowEmail(true)}
				revealText="Afficher l'email"
				revealedContent={
					<p className="text-muted-foreground">contact@lylusio.fr</p>
				}
				href="mailto:contact@lylusio.fr"
				isInView={isInView}
				delay={100}
			/>

			{/* Location Card - clickable for GPS */}
			<a
				href="https://www.google.com/maps/search/?api=1&query=49+route+de+Labastide+31620+Cepet"
				target="_blank"
				rel="noopener noreferrer"
				className={`card-soft flex items-center gap-4 transition-all duration-500 ease-out hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group ${
					isInView
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-6"
				}`}
				style={{ transitionDelay: isInView ? "200ms" : "0ms" }}
			>
				<div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300">
					<MapPin className="w-5 h-5" aria-hidden="true" />
				</div>
				<div>
					<p className="font-display text-lg text-foreground">
						<CalligraphicLabel label="Localisation" />
					</p>
					<p className="text-muted-foreground">
						49 route de Labastide, 31620 Cépet
						<br />
						<span className="text-sm">
							(Toulouse Nord) – en présentiel & en ligne
						</span>
					</p>
					<span className="text-xs text-accent/70 mt-1 inline-block">
						Ouvrir dans Maps →
					</span>
				</div>
			</a>

			{/* Calendly Card */}
			<a
				href="https://calendly.com/lylusio-fr"
				target="_blank"
				rel="noopener noreferrer"
				className={`card-soft flex items-center gap-4 transition-all duration-500 ease-out hover:border-accent/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/5 group ${
					isInView
						? "opacity-100 translate-y-0"
						: "opacity-0 translate-y-6"
				}`}
				style={{ transitionDelay: isInView ? "300ms" : "0ms" }}
			>
				<div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent/20 transition-all duration-300">
					<Calendar className="w-5 h-5" aria-hidden="true" />
				</div>
				<div>
					<p className="font-display text-lg text-foreground">
						<CalligraphicLabel label="Rendez-vous" />
					</p>
					<p className="text-muted-foreground text-sm font-white">
						Réserver une séance en ligne
					</p>
				</div>
			</a>

			{/* Honeypot */}
			<HoneypotContact />
		</div>
	);
};

const Contact = () => {
	return (
		<>
			{/* SEO metadata handled by Next.js Metadata API */}

			<div
				className="min-h-screen bg-background animate-fade-in"
				style={{ animationDuration: "0.6s" }}
			>
				<a href="#main-content" className="skip-link">
					Aller au contenu principal
				</a>
				<Header />
				<Breadcrumbs />

				<main id="main-content" className="pb-16 md:pb-20">
					<section
						className="container mx-auto px-4 sm:px-6 lg:px-8"
						aria-labelledby="contact-title"
					>
						<div className="max-w-3xl mx-auto">
							{/* Header */}
							<header className="text-center mb-12 md:mb-16 pt-8 sm:pt-4">
								<p className="section-label mt-12">Contact</p>
								<h1
									id="contact-title"
									className="text-foreground mb-6 first-letter-fancy-lg"
								>
									{" "}
									<span className="font-calligraphic text-accent inline-block align-baseline text-4xl sm:text-5xl md:text-6xl">
										C
									</span>
									ontactez Émilie Perez - Astrologue Toulouse
								</h1>
								<p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
									Une question sur l'astrologie, le Reiki ou
									mon accompagnement ? Envie de réserver une
									séance ? Je serai ravie de vous répondre.
								</p>
							</header>

							{/* Contact Cards */}
							<ContactCards />

							{/* CTA */}
							<div className="text-center space-y-4">
								<p className="text-sm text-muted-foreground">
									Vous avez des questions ? Consultez notre{" "}
									<Link
										href="/faq"
										className="text-accent text-xl hover:underline"
									>
										FAQ
									</Link>
								</p>
							</div>
						</div>
					</section>
				</main>

				<Footer />
			</div>
		</>
	);
};

export default Contact;
