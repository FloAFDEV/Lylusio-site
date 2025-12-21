import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import plantDecoration from "@/assets/plant-decoration.webp";

const CookieBanner = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem("cookie-consent");
		if (!consent) {
			// Delay showing the banner for better UX
			const timer = setTimeout(() => setIsVisible(true), 1500);
			return () => clearTimeout(timer);
		}
	}, []);

	const acceptCookies = () => {
		localStorage.setItem("cookie-consent", "accepted");
		setIsVisible(false);
	};

	const declineCookies = () => {
		localStorage.setItem("cookie-consent", "declined");
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<div
			className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-up"
			role="dialog"
			aria-label="Bannière de consentement aux cookies"
			aria-describedby="cookie-description"
		>
			<div className="container mx-auto max-w-4xl">
				<div className="bg-accent/50 backdrop-blur-md border border-border/50 rounded-2xl shadow-elegant p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
					{/* Close button */}
					<button
						onClick={declineCookies}
						className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
						aria-label="Fermer la bannière"
					>
						<X className="w-4 h-4" />
					</button>

					{/* Logo plant - rounded with soft golden border */}
					<div className="hidden sm:flex items-center justify-center w-12 h-12 bg-background rounded-full flex-shrink-0 overflow-hidden border border-gold/30 shadow-soft">
						<img
							src={plantDecoration}
							alt=""
							className="w-14 h-14 rounded-full object-cover"
							aria-hidden="true"
						/>
					</div>

					{/* Content */}
					<div className="flex-1 pr-6 sm:pr-0">
						<p
							id="cookie-description"
							className="text-sm md:text-base text-foreground/90 leading-relaxed"
						>
							Ce site utilise des cookies pour améliorer votre
							expérience. En continuant à naviguer, vous acceptez
							notre{" "}
							<a
								href="/confidentialite"
								className="text-navy font-medium hover:text-navy/80 underline underline-offset-2 transition-colors"
							>
								politique de confidentialité
							</a>
							.
						</p>
					</div>

					{/* Buttons */}
					<div className="flex gap-3 w-full sm:w-auto">
						<Button
							variant="outline"
							size="sm"
							onClick={declineCookies}
							className="flex-1 sm:flex-none border-navy/30 text-navy hover:bg-navy/5 hover:border-navy/50"
						>
							Refuser
						</Button>
						<Button
							size="sm"
							onClick={acceptCookies}
							className="flex-1 sm:flex-none bg-navy text-white hover:bg-navy/90"
						>
							Accepter
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CookieBanner;
