import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Shield, Settings, Info, CheckCircle2 } from "lucide-react";

// Types de cookies
type CookieCategory = "necessary" | "analytics" | "marketing";

interface CookiePreferences {
	necessary: boolean;
	analytics: boolean;
	marketing: boolean;
}

const COOKIE_CONSENT_KEY = "lylusio-cookie-consent";
const COOKIE_PREFERENCES_KEY = "lylusio-cookie-preferences";
const COOKIE_EXPIRY_DAYS = 180; // 6 mois

const CookieBanner = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	const [preferences, setPreferences] = useState<CookiePreferences>({
		necessary: true, // Toujours activé
		analytics: true, // ✅ Coché par défaut
		marketing: true, // ✅ Coché par défaut
	});

	useEffect(() => {
		const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
		if (!consent) {
			// Delay showing the banner for better UX
			const timer = setTimeout(() => {
				setIsVisible(true);
				// Bloquer le scroll du body
				document.body.style.overflow = "hidden";
			}, 1500);
			return () => clearTimeout(timer);
		} else {
			// Charger les préférences existantes
			const savedPreferences = localStorage.getItem(
				COOKIE_PREFERENCES_KEY
			);
			if (savedPreferences) {
				setPreferences(JSON.parse(savedPreferences));
			}
		}
	}, []);

	const savePreferences = (prefs: CookiePreferences) => {
		const expiryDate = new Date();
		expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);

		localStorage.setItem(COOKIE_CONSENT_KEY, "customized");
		localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
		localStorage.setItem("cookie-consent-expiry", expiryDate.toISOString());

		// Ici, vous pouvez activer/désactiver réellement les cookies selon les préférences
		if (prefs.analytics) {
			// Activer Google Analytics, etc.
		}
		if (prefs.marketing) {
			// Activer pixels de suivi, etc.
		}
	};

	const handleClose = (accepted?: boolean) => {
		setIsClosing(true);
		setTimeout(() => {
			if (accepted === true) {
				// Accepter tout
				const allAccepted = {
					necessary: true,
					analytics: true,
					marketing: true,
				};
				savePreferences(allAccepted);
			} else if (accepted === false) {
				// Refuser tout (sauf nécessaires)
				const allRefused = {
					necessary: true,
					analytics: false,
					marketing: false,
				};
				savePreferences(allRefused);
			} else {
				// Personnalisé
				savePreferences(preferences);
			}
			// Réactiver le scroll
			document.body.style.overflow = "";
			setIsVisible(false);
		}, 300);
	};

	const acceptAll = () => handleClose(true);
	const rejectAll = () => handleClose(false);
	const saveCustom = () => handleClose();

	const togglePreference = (category: CookieCategory) => {
		if (category === "necessary") return; // Les cookies nécessaires ne peuvent pas être désactivés
		setPreferences((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	if (!isVisible) return null;

	return (
		<>
			{/* Overlay bloquant avec blur - RGPD Compliant */}
			<div
				className={`fixed inset-0 z-[60] transition-all duration-500 ${
					isClosing ? "opacity-0" : "opacity-100"
				}`}
				aria-hidden="true"
			>
				{/* Backdrop blur doux et féminin */}
				<div className="absolute inset-0 bg-sand/20 backdrop-blur-sm" />
				{/* Vignette légère */}
				<div className="absolute inset-0 bg-gradient-radial from-transparent via-sand/5 to-sand/15" />
			</div>

			{/* Cookie Banner */}
			<div
				className={`fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 transition-all duration-500 ease-out ${
					isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
				}`}
				role="dialog"
				aria-modal="true"
				aria-label="Consentement aux cookies"
				aria-describedby="cookie-description"
			>
				<div className="w-full max-w-2xl">
					{/* Background doux et féminin */}
					<div className="relative bg-gradient-to-br from-cream via-background to-sand/50 backdrop-blur-xl border border-gold/20 rounded-3xl shadow-[0_20px_60px_-16px_rgba(0,0,0,0.12)] overflow-hidden">
						{/* Halos dorés très subtils */}
						<div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-radial from-gold/8 via-gold/3 to-transparent rounded-full blur-3xl" />
						<div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-radial from-accent/6 via-accent/2 to-transparent rounded-full blur-3xl" />

						{/* Ligne supérieure délicate */}
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

						{/* Contenu principal */}
						{!showSettings ? (
							<div className="relative p-6 md:p-8">
								{/* Header avec icône douce */}
								<div className="flex items-start gap-4 mb-5">
									{/* Icône douce et féminine */}
									<div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold/15 to-accent/10 rounded-2xl flex-shrink-0 border border-gold/20 shadow-sm">
										<Cookie className="w-7 h-7 text-gold" />
										<Shield className="w-3.5 h-3.5 text-accent absolute bottom-1.5 right-1.5" />
									</div>

									{/* Texte */}
									<div className="flex-1">
										<h3 className="font-display text-2xl md:text-3xl font-normal text-navy mb-1.5 leading-tight">
											Respect de votre vie privée
										</h3>
										<p className="text-sm text-navy/50 font-normal">
											Votre consentement est requis pour
											continuer
										</p>
									</div>
								</div>

								{/* Description */}
								<div className="mb-6">
									<p
										id="cookie-description"
										className="text-base text-navy/95 leading-relaxed mb-4 font-light"
									>
										Nous utilisons des cookies pour
										améliorer votre expérience et analyser
										notre trafic. Vous pouvez accepter tous
										les cookies ou les personnaliser selon
										vos préférences.
									</p>

									{/* Quick info badges doux */}
									<div className="flex flex-wrap gap-2 mb-4">
										<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/50 border border-gold/15 rounded-full text-xs font-medium text-navy/70">
											<CheckCircle2 className="w-3 h-3 text-gold" />
											Données sécurisées
										</span>
										<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/50 border border-gold/15 rounded-full text-xs font-medium text-navy/70">
											<CheckCircle2 className="w-3 h-3 text-gold" />
											RGPD Conforme
										</span>
										<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/50 border border-gold/15 rounded-full text-xs font-medium text-navy/70">
											<CheckCircle2 className="w-3 h-3 text-gold" />
											Conservation 6 mois
										</span>
									</div>

									<a
										href="/confidentialite"
										className="text-sm text-gold font-medium hover:text-gold-light inline-flex items-center gap-2 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 rounded-lg px-2 py-1 -ml-2"
									>
										<Info className="w-3.5 h-3.5" />
										<span className="relative">
											En savoir plus sur notre politique
											<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-light group-hover:w-full transition-all duration-300" />
										</span>
									</a>
								</div>

								{/* Buttons - Stack mobile, row desktop */}
								<div className="flex flex-col gap-3">
									{/* Primary CTA - Doux et féminin */}
									<Button
										size="lg"
										onClick={acceptAll}
										className="w-full bg-gradient-to-r from-gold/90 to-gold-light/90 text-white hover:from-gold hover:to-gold-light shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-gold/30 font-medium text-base border border-gold-light/20"
									>
										<CheckCircle2 className="w-4 h-4 mr-2" />
										Tout accepter et continuer
									</Button>

									{/* Secondary actions */}
									<div className="grid grid-cols-2 gap-3">
										<Button
											variant="outline"
											size="lg"
											onClick={() =>
												setShowSettings(true)
											}
											className="border border-navy/20 text-navy bg-white/70 hover:bg-white hover:border-navy/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-accent/30 font-medium shadow-sm"
										>
											<Settings className="w-3.5 h-3.5 mr-2" />
											Personnaliser
										</Button>
										<Button
											variant="outline"
											size="lg"
											onClick={rejectAll}
											className="border border-navy/15 text-navy/60 bg-white/50 hover:bg-white/80 hover:border-navy/25 hover:text-navy transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-accent/30 font-medium"
										>
											Tout refuser
										</Button>
									</div>
								</div>
							</div>
						) : (
							/* Panel de personnalisation */
							<div className="relative p-6 md:p-8 max-h-[85vh] overflow-y-auto">
								<button
									onClick={() => setShowSettings(false)}
									className="absolute top-6 left-6 text-navy/50 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-gold/30 rounded-lg p-2 hover:bg-sand/30"
									aria-label="Retour"
								>
									← Retour
								</button>

								<div className="pt-12">
									<h3 className="font-display text-2xl md:text-3xl font-normal text-navy mb-2">
										Préférences des cookies
									</h3>
									<p className="text-sm text-navy/90 mb-8 leading-relaxed font-light">
										Gérez vos préférences en matière de
										cookies. Les cookies nécessaires sont
										toujours activés car ils sont essentiels
										au fonctionnement du site.
									</p>

									{/* Cookie categories */}
									<div className="space-y-4 mb-8">
										{/* Nécessaires */}
										<div className="p-5 bg-gradient-to-br from-sand/40 to-cream/30 rounded-2xl border border-gold/15 shadow-sm">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-center gap-2.5 mb-3">
														<div className="w-9 h-9 bg-gold/15 rounded-xl flex items-center justify-center">
															<Shield className="w-4 h-4 text-gold" />
														</div>
														<div className="flex-1">
															<h4 className="font-display font-medium text-navy text-base">
																Cookies
																nécessaires
															</h4>
															<span className="inline-block text-xs bg-gold/20 text-gold px-2.5 py-0.5 rounded-full font-medium mt-1">
																Toujours actif
															</span>
														</div>
													</div>
													<p className="text-sm text-navy/95 leading-relaxed mb-2 font-light">
														Essentiels au
														fonctionnement du site.
														Permettent la navigation
														de base et l'accès aux
														zones sécurisées.
													</p>
													<p className="text-xs text-navy/50 font-normal">
														<strong className="text-navy/70">
															Durée :
														</strong>{" "}
														Session ou 1 an selon le
														type
													</p>
												</div>
												<div className="relative inline-flex items-center">
													<input
														type="checkbox"
														checked={true}
														disabled
														className="sr-only"
													/>
													<div className="w-11 h-6 bg-gold/30 rounded-full opacity-60 cursor-not-allowed border border-gold/20" />
													<div className="absolute w-4 h-4 bg-gold rounded-full left-1 top-1 shadow-sm" />
												</div>
											</div>
										</div>

										{/* Analytiques */}
										<div className="p-5 bg-white/60 rounded-2xl border border-navy/10 hover:border-navy/20 transition-all duration-300 shadow-sm">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-center gap-2.5 mb-3">
														<div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
															<Cookie className="w-4 h-4 text-accent" />
														</div>
														<h4 className="font-display font-medium text-navy text-base">
															Cookies analytiques
														</h4>
													</div>
													<p className="text-sm text-navy/95 leading-relaxed mb-2 font-light">
														Nous aident à comprendre
														comment vous utilisez
														notre site pour
														l'améliorer (Google
														Analytics).
													</p>
													<p className="text-xs text-navy/50 font-normal">
														<strong className="text-navy/70">
															Durée :
														</strong>{" "}
														13 mois maximum
													</p>
												</div>
												<button
													onClick={() =>
														togglePreference(
															"analytics"
														)
													}
													className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 border ${
														preferences.analytics
															? "bg-gradient-to-r from-accent/80 to-accent/70 border-accent/40 shadow-sm"
															: "bg-navy/10 border-navy/15"
													}`}
													role="switch"
													aria-checked={
														preferences.analytics
													}
												>
													<span
														className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
															preferences.analytics
																? "translate-x-6"
																: "translate-x-1"
														}`}
													/>
												</button>
											</div>
										</div>

										{/* Marketing */}
										<div className="p-5 bg-white/60 rounded-2xl border border-navy/10 hover:border-navy/20 transition-all duration-300 shadow-sm">
											<div className="flex items-start justify-between gap-4">
												<div className="flex-1">
													<div className="flex items-center gap-2.5 mb-3">
														<div className="w-9 h-9 bg-accent/10 rounded-xl flex items-center justify-center">
															<Cookie className="w-4 h-4 text-accent" />
														</div>
														<h4 className="font-display font-medium text-navy text-base">
															Cookies marketing
														</h4>
													</div>
													<p className="text-sm text-navy/95 leading-relaxed mb-2 font-light">
														Utilisés pour
														personnaliser les
														publicités et mesurer
														l'efficacité des
														campagnes.
													</p>
													<p className="text-xs text-navy/50 font-normal">
														<strong className="text-navy/70">
															Durée :
														</strong>{" "}
														Variable selon le
														fournisseur (max 24
														mois)
													</p>
												</div>
												<button
													onClick={() =>
														togglePreference(
															"marketing"
														)
													}
													className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/30 border ${
														preferences.marketing
															? "bg-gradient-to-r from-accent/80 to-accent/70 border-accent/40 shadow-sm"
															: "bg-navy/10 border-navy/15"
													}`}
													role="switch"
													aria-checked={
														preferences.marketing
													}
												>
													<span
														className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
															preferences.marketing
																? "translate-x-6"
																: "translate-x-1"
														}`}
													/>
												</button>
											</div>
										</div>
									</div>

									{/* Action buttons */}
									<div className="flex flex-col gap-3 pt-6 border-t border-navy/10">
										<Button
											size="lg"
											onClick={saveCustom}
											className="w-full bg-gradient-to-r from-gold/90 to-gold-light/90 text-white hover:from-gold hover:to-gold-light shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-gold/30 font-medium border border-gold-light/20"
										>
											<CheckCircle2 className="w-4 h-4 mr-2" />
											Enregistrer mes choix
										</Button>
										<Button
											variant="outline"
											size="lg"
											onClick={acceptAll}
											className="w-full border border-navy/20 text-navy bg-white/70 hover:bg-white hover:border-navy/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] focus:ring-2 focus:ring-accent/30 font-medium"
										>
											Tout accepter
										</Button>
									</div>

									{/* Info durée de conservation */}
									<p className="text-xs text-center text-navy/40 mt-5 font-normal">
										🔒 Vos préférences seront conservées
										pendant {COOKIE_EXPIRY_DAYS} jours
									</p>
								</div>
							</div>
						)}

						{/* Ligne inférieure délicate */}
						<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
					</div>
				</div>
			</div>
		</>
	);
};

export default CookieBanner;
