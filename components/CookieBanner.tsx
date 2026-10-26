"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { X, Cookie, Shield, Settings, Info, CheckCircle2 } from "lucide-react";
import {
	CONSENT_CHANGE_EVENT,
	CONSENT_EXPIRY_DAYS,
	DISMISSED_SESSION_KEY,
	OPEN_CONSENT_SETTINGS_EVENT,
	readConsent,
	writeConsent,
	type ConsentPreferences,
} from "@/lib/consent";

// Types de cookies
type CookieCategory = "necessary" | "analytics" | "marketing";

type CloseAction = "accept" | "reject" | "save" | "dismiss";

const NO_CONSENT: ConsentPreferences = {
	necessary: true,
	analytics: false,
	marketing: false,
};

const COOKIE_EXPIRY_DAYS = CONSENT_EXPIRY_DAYS;

const readStoredConsent = () => {
	try {
		return readConsent(window.localStorage);
	} catch {
		return null;
	}
};

const CookieBanner = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [showSettings, setShowSettings] = useState(false);
	// Panneau ouvert via « Gérer les cookies » (et non depuis le bandeau)
	const [openedFromSettings, setOpenedFromSettings] = useState(false);
	const [isTransitioning, setIsTransitioning] = useState(false);
	// Rien n'est coché tant qu'aucun choix n'a été enregistré
	const [preferences, setPreferences] =
		useState<ConsentPreferences>(NO_CONSENT);
	const dialogRef = useRef<HTMLDivElement>(null);

	// Accessibilité: Respect prefers-reduced-motion
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		setPrefersReducedMotion(mediaQuery.matches);

		const handleChange = (e: MediaQueryListEvent) => {
			setPrefersReducedMotion(e.matches);
		};

		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}, []);

	useEffect(() => {
		// Le chargement des tags est géré par AnalyticsProvider (lib/google-tag)
		const stored = readStoredConsent();
		if (stored) {
			setPreferences(stored);
			return;
		}
		let dismissed = false;
		try {
			dismissed = sessionStorage.getItem(DISMISSED_SESSION_KEY) === "1";
		} catch {
			/* stockage indisponible */
		}
		// CWV Fix: Affichage immédiat sans délai pour éviter CLS
		if (!dismissed) setIsVisible(true);
	}, []);

	// « Gérer les cookies » : ouvre directement les préférences actuelles
	useEffect(() => {
		const handleOpen = () => {
			setPreferences(readStoredConsent() ?? NO_CONSENT);
			setOpenedFromSettings(true);
			setShowSettings(true);
			setIsTransitioning(false);
			setIsClosing(false);
			setIsVisible(true);
		};
		window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, handleOpen);
		return () =>
			window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, handleOpen);
	}, []);

	useEffect(() => {
		if (isVisible && !isClosing) dialogRef.current?.focus();
	}, [isVisible, isClosing, showSettings]);

	const savePreferences = (prefs: ConsentPreferences) => {
		const saved = writeConsent(window.localStorage, prefs);
		setPreferences(saved);
		window.dispatchEvent(
			new CustomEvent(CONSENT_CHANGE_EVENT, { detail: saved })
		);
	};

	const handleClose = useCallback(
		(action: CloseAction) => {
			setIsClosing(true);
			setTimeout(() => {
				if (action === "accept") {
					savePreferences({ necessary: true, analytics: true, marketing: true });
				} else if (action === "reject") {
					savePreferences(NO_CONSENT);
				} else if (action === "save") {
					savePreferences(preferences);
				} else if (!readStoredConsent()) {
					// Fermeture sans choix : aucun consentement, bandeau non
					// réaffiché pendant la session, rien n'est enregistré
					try {
						sessionStorage.setItem(DISMISSED_SESSION_KEY, "1");
					} catch {
						/* stockage indisponible */
					}
				} else {
					// Fermeture sans modification : on restaure le choix enregistré
					setPreferences(readStoredConsent() ?? NO_CONSENT);
				}
				// CWV Fix: Pas de modification du body (déjà position fixed)
				setIsVisible(false);
				setShowSettings(false);
				setOpenedFromSettings(false);
				setIsClosing(false);
			}, 400);
		},
		[preferences]
	);

	const acceptAll = () => handleClose("accept");
	const rejectAll = () => handleClose("reject");
	const saveCustom = () => handleClose("save");
	const dismiss = () => handleClose("dismiss");

	const togglePreference = (category: CookieCategory) => {
		if (category === "necessary") return; // Les cookies nécessaires ne peuvent pas être désactivés
		setPreferences((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	// Transition douce vers les paramètres
	const handleShowSettings = () => {
		setIsTransitioning(true);
		setTimeout(() => {
			setShowSettings(true);
			setIsTransitioning(false);
		}, 300);
	};

	const handleHideSettings = () => {
		setIsTransitioning(true);
		setTimeout(() => {
			setShowSettings(false);
			setIsTransitioning(false);
		}, 300);
	};

	// Échap : retour au bandeau depuis le panneau, sinon fermeture sans choix
	useEffect(() => {
		if (!isVisible) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key !== "Escape") return;
			if (showSettings && !openedFromSettings) {
				handleHideSettings();
			} else {
				handleClose("dismiss");
			}
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [isVisible, showSettings, openedFromSettings, handleClose]);

	if (!isVisible) return null;

	// Accessibilité: Durées d'animation réduites si prefers-reduced-motion
	const transitionDuration = prefersReducedMotion ? "duration-150" : "duration-700";
	const transitionDurationFast = prefersReducedMotion ? "duration-100" : "duration-500";

	return (
		<>
			{/* Overlay bloquant optimisé performance - RGPD Compliant */}
			<div
				className={`fixed inset-0 z-[60] transition-opacity ${transitionDuration} ease-out ${
					isClosing ? "opacity-0" : "opacity-100"
				}`}
				aria-hidden="true"
			>
				{/* Overlay semi-transparent sans blur (optimisation LCP) */}
				<div className="absolute inset-0 bg-gradient-to-b from-navy/50 via-navy/60 to-navy/70" />
			</div>

			{/* Cookie Banner - CWV optimisé avec accessibilité */}
			<div
				className={`fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-6 focus:outline-none transition-all ${transitionDuration} ease-out ${
					isClosing ? "opacity-0 scale-95" : "opacity-100 scale-100"
				}`}
				role="dialog"
				aria-modal="true"
				aria-live="polite"
				aria-label="Consentement aux cookies"
				aria-describedby="cookie-description"
				ref={dialogRef}
				tabIndex={-1}
			>
				<div className="w-full max-w-2xl">
					{/* Background optimisé performance (sans blur coûteux) */}
					<div className="relative bg-gradient-to-br from-cream via-sand to-background border border-gold/40 rounded-3xl shadow-2xl overflow-hidden">

						{/* Ligne supérieure dorée visible */}
						<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

						{/* Contenu principal avec transition douce */}
						<div
							className={`relative transition-all ${transitionDurationFast} ease-out ${
								isTransitioning
									? "opacity-0 scale-95"
									: "opacity-100 scale-100"
							}`}
						>
							{!showSettings ? (
								<div className="relative p-6 md:p-8">
									{/* Bouton fermer visible */}
									<button
										onClick={dismiss}
										className="absolute top-4 right-4 text-navy/60 hover:text-navy transition-colors duration-200 p-2 hover:bg-sand/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-cream"
										aria-label="Fermer sans accepter"
									>
										<X className="w-5 h-5" />
									</button>

									{/* Header avec icône visible */}
									<div className="flex items-start gap-4 mb-5 pr-8">
										{/* Icône plus contrastée */}
										<div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gold/30 to-accent/20 rounded-2xl flex-shrink-0 border border-gold/40 shadow-md">
											<Cookie className="w-7 h-7 text-gold drop-shadow-sm" />
											<Shield className="w-3.5 h-3.5 text-accent absolute bottom-1.5 right-1.5 drop-shadow-sm" />
										</div>

										{/* Texte plus contrasté */}
										<div className="flex-1">
											<h3 className="font-display text-2xl md:text-3xl font-normal text-navy mb-1.5 leading-tight drop-shadow-sm">
												Respect de votre vie privée
											</h3>
											<p className="text-sm text-navy/70 font-normal drop-shadow-sm">
												Acceptez, refusez ou
												personnalisez vos choix
											</p>
										</div>
									</div>

									{/* Description plus lisible */}
									<div className="mb-6">
										<p
											id="cookie-description"
											className="text-base text-navy/90 leading-relaxed mb-4 font-normal drop-shadow-sm"
										>
											Avec votre accord, nous utilisons
											des cookies pour mesurer
											l'audience du site (Google
											Analytics) et l'efficacité de nos
											campagnes publicitaires (Google
											Ads). Refuser n'empêche pas
											d'utiliser le site. Vous pouvez
											modifier votre choix à tout moment
											via « Gérer les cookies » en bas de
											page.
										</p>

										{/* Quick info badges plus visibles */}
										<div className="flex flex-wrap gap-2 mb-4">
											<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/70 border border-gold/30 rounded-full text-xs font-semibold text-navy/80 shadow-sm">
												<CheckCircle2 className="w-3.5 h-3.5 text-gold drop-shadow-sm" />
												Données sécurisées
											</span>
											<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/70 border border-gold/30 rounded-full text-xs font-semibold text-navy/80 shadow-sm">
												<CheckCircle2 className="w-3.5 h-3.5 text-gold drop-shadow-sm" />
												Modifiable à tout moment
											</span>
											<span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sand/70 border border-gold/30 rounded-full text-xs font-semibold text-navy/80 shadow-sm">
												<CheckCircle2 className="w-3.5 h-3.5 text-gold drop-shadow-sm" />
												Conservation 6 mois
											</span>
										</div>

										<a
											href="/confidentialite"
											className="text-sm text-gold font-semibold hover:text-gold-light inline-flex items-center gap-2 group transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-cream rounded-lg px-2 py-1 -ml-2 drop-shadow-sm"
										>
											<Info className="w-3.5 h-3.5" />
											<span className="relative">
												En savoir plus sur notre
												politique
												<span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold-light group-hover:w-full transition-all duration-300" />
											</span>
										</a>
									</div>

									{/* Buttons - Plus visibles et contrastés */}
									<div className="flex flex-col gap-3">
										{/* Primary CTA - Plus visible avec shimmer */}
										<Button
											size="lg"
											onClick={acceptAll}
											className="w-full bg-gradient-to-r from-gold to-gold-light text-white hover:from-gold-light hover:to-gold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-cream font-semibold text-base border border-white/20 relative overflow-hidden group"
										>
											{/* Effet shimmer au hover */}
											<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
											<CheckCircle2 className="w-4 h-4 mr-2 relative z-10" />
											<span className="relative z-10">
												Tout accepter
											</span>
										</Button>

										{/* Secondary actions - Plus visibles */}
										<div className="grid grid-cols-2 gap-3">
											<Button
												variant="outline"
												size="lg"
												onClick={handleShowSettings}
												className="border-2 border-navy/30 text-navy bg-white/90 hover:bg-white hover:border-navy/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-cream font-semibold shadow-md hover:shadow-lg"
											>
												<Settings className="w-3.5 h-3.5 mr-2" />
												Personnaliser
											</Button>
											<Button
												variant="outline"
												size="lg"
												onClick={rejectAll}
												className="border-2 border-navy/20 text-navy/70 bg-white/80 hover:bg-white hover:border-navy/30 hover:text-navy transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-cream font-semibold shadow-sm hover:shadow-md"
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
										onClick={
											openedFromSettings
												? dismiss
												: handleHideSettings
										}
										className="absolute top-6 left-6 text-navy/70 hover:text-navy transition-colors focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-cream rounded-lg px-3 py-2 hover:bg-sand/40 font-semibold text-sm"
										aria-label={
											openedFromSettings
												? "Fermer sans modifier"
												: "Retour"
										}
									>
										{openedFromSettings ? "Fermer" : "← Retour"}
									</button>

									<div className="pt-12">
										<h3 className="font-display text-2xl md:text-3xl font-normal text-navy mb-2 drop-shadow-sm">
											Préférences des cookies
										</h3>
										<p className="text-sm text-navy/80 mb-8 leading-relaxed font-normal drop-shadow-sm">
											Gérez vos préférences en matière de
											cookies. Les cookies nécessaires
											sont toujours activés car ils sont
											essentiels au fonctionnement du
											site.
										</p>

										{/* Cookie categories */}
										<div className="space-y-4 mb-8">
											{/* Nécessaires */}
											<div className="p-5 bg-gradient-to-br from-sand/80 to-cream/70 rounded-2xl border-2 border-gold/30 shadow-md">
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1">
														<div className="flex items-center gap-2.5 mb-3">
															<div className="w-9 h-9 bg-gold/25 rounded-xl flex items-center justify-center shadow-sm">
																<Shield className="w-4.5 h-4.5 text-gold drop-shadow-sm" />
															</div>
															<div className="flex-1">
																<h4 className="font-display font-semibold text-navy text-base drop-shadow-sm">
																	Cookies
																	nécessaires
																</h4>
																<span className="inline-block text-xs bg-gold/30 text-navy px-2.5 py-0.5 rounded-full font-semibold mt-1 shadow-sm">
																	Toujours
																	actif
																</span>
															</div>
														</div>
														<p className="text-sm text-navy/85 leading-relaxed mb-2 font-normal">
															Essentiels au
															fonctionnement du
															site. Permettent la
															navigation de base
															et l'accès aux
															zones sécurisées.
														</p>
														<p className="text-xs text-navy/60 font-normal">
															<strong className="text-navy/80">
																Durée :
															</strong>{" "}
															Session ou 1 an
															selon le type
														</p>
													</div>
													<div className="relative inline-flex items-center">
														<input
															type="checkbox"
															checked={true}
															disabled
															className="sr-only"
														/>
														<div className="w-11 h-6 bg-gold/40 rounded-full opacity-70 cursor-not-allowed border-2 border-gold/30 shadow-sm" />
														<div className="absolute w-4 h-4 bg-gold rounded-full left-1 top-1 shadow-md" />
													</div>
												</div>
											</div>

											{/* Analytiques */}
											<div className="p-5 bg-white/90 rounded-2xl border-2 border-navy/20 hover:border-navy/30 transition-all duration-300 shadow-md hover:shadow-lg">
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1">
														<div className="flex items-center gap-2.5 mb-3">
															<div className="w-9 h-9 bg-accent/15 rounded-xl flex items-center justify-center shadow-sm">
																<Cookie className="w-4.5 h-4.5 text-accent drop-shadow-sm" />
															</div>
															<h4 className="font-display font-semibold text-navy text-base drop-shadow-sm">
																Cookies
																analytiques
															</h4>
														</div>
														<p className="text-sm text-navy/85 leading-relaxed mb-2 font-normal">
															Nous aident à
															comprendre comment
															vous utilisez notre
															site pour
															l'améliorer (Google
															Analytics). Sans
															ce choix, aucun
															outil Google n'est
															chargé.
														</p>
														<p className="text-xs text-navy/60 font-normal">
															<strong className="text-navy/80">
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
														className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-cream border-2 shadow-sm ${
															preferences.analytics
																? "bg-gradient-to-r from-accent to-accent/80 border-accent/50"
																: "bg-navy/15 border-navy/25"
														}`}
														role="switch"
														aria-checked={
															preferences.analytics
														}
														aria-label="Activer/désactiver les cookies analytiques"
													>
														<span
															className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
																preferences.analytics
																	? "translate-x-6"
																	: "translate-x-1"
															}`}
														/>
													</button>
												</div>
											</div>

											{/* Marketing */}
											<div className="p-5 bg-white/90 rounded-2xl border-2 border-navy/20 hover:border-navy/30 transition-all duration-300 shadow-md hover:shadow-lg">
												<div className="flex items-start justify-between gap-4">
													<div className="flex-1">
														<div className="flex items-center gap-2.5 mb-3">
															<div className="w-9 h-9 bg-accent/15 rounded-xl flex items-center justify-center shadow-sm">
																<Cookie className="w-4.5 h-4.5 text-accent drop-shadow-sm" />
															</div>
															<h4 className="font-display font-semibold text-navy text-base drop-shadow-sm">
																Cookies marketing
															</h4>
														</div>
														<p className="text-sm text-navy/85 leading-relaxed mb-2 font-normal">
															Utilisés pour
															personnaliser les
															publicités et
															mesurer
															l'efficacité des
															campagnes (Google
															Ads, via la mesure
															Google Analytics :
															nécessite aussi les
															cookies
															analytiques).
														</p>
														<p className="text-xs text-navy/60 font-normal">
															<strong className="text-navy/80">
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
														className={`relative inline-flex items-center h-6 rounded-full w-11 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-cream border-2 shadow-sm ${
															preferences.marketing
																? "bg-gradient-to-r from-accent to-accent/80 border-accent/50"
																: "bg-navy/15 border-navy/25"
														}`}
														role="switch"
														aria-checked={
															preferences.marketing
														}
														aria-label="Activer/désactiver les cookies marketing"
													>
														<span
															className={`inline-block w-4 h-4 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
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
										<div className="flex flex-col gap-3 pt-6 border-t-2 border-navy/15">
											<Button
												size="lg"
												onClick={saveCustom}
												className="w-full bg-gradient-to-r from-gold to-gold-light text-white hover:from-gold-light hover:to-gold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-gold/60 focus:ring-offset-2 focus:ring-offset-cream font-semibold border border-white/20 relative overflow-hidden group"
											>
												{/* Effet shimmer au hover */}
												<span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
												<CheckCircle2 className="w-4 h-4 mr-2 relative z-10" />
												<span className="relative z-10">
													Enregistrer mes choix
												</span>
											</Button>
											<div className="grid grid-cols-2 gap-3">
												<Button
													variant="outline"
													size="lg"
													onClick={rejectAll}
													className="w-full border-2 border-navy/30 text-navy bg-white/90 hover:bg-white hover:border-navy/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-cream font-semibold shadow-md hover:shadow-lg"
												>
													Tout refuser
												</Button>
												<Button
													variant="outline"
													size="lg"
													onClick={acceptAll}
													className="w-full border-2 border-navy/30 text-navy bg-white/90 hover:bg-white hover:border-navy/50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-cream font-semibold shadow-md hover:shadow-lg"
												>
													Tout accepter
												</Button>
											</div>
										</div>

										{/* Info durée de conservation */}
										<p className="text-xs text-center text-navy/60 mt-5 font-normal drop-shadow-sm">
											🔒 Vos préférences seront conservées
											pendant {COOKIE_EXPIRY_DAYS} jours
										</p>
									</div>
								</div>
							)}
						</div>

						{/* Ligne inférieure dorée visible */}
						<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
					</div>
				</div>
			</div>
		</>
	);
};

export default CookieBanner;
