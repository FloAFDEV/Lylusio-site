/**
 * Coordonnées de contact centralisées — source unique de vérité.
 *
 * Les rendez-vous se prennent désormais exclusivement par téléphone
 * (Calendly a été retiré du parcours de réservation). Tout CTA de prise
 * de rendez-vous doit utiliser PHONE_TEL_HREF plutôt que de recopier le
 * numéro en dur.
 */

export const PHONE_E164 = "+33619151959";

/** Prêt à l'emploi pour un attribut href="tel:...": ouvre l'app Téléphone sur mobile. */
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;

/** Format d'affichage utilisé dans le reste du site (Footer, Contact, etc.). */
export const PHONE_DISPLAY = "06 19 15 19 59";

export const EMAIL = "contact@lylusio.fr";
export const EMAIL_MAILTO_HREF = `mailto:${EMAIL}`;

/** Message court à afficher là où un visiteur pourrait encore s'attendre à trouver Calendly. */
export const BOOKING_NOTICE =
	"Les rendez-vous se prennent désormais par téléphone. Contactez-moi directement pour choisir ensemble le créneau qui vous convient.";

/**
 * Horaires — deux notions distinctes à ne jamais fusionner :
 * les consultations (en cabinet) et la disponibilité téléphonique pour
 * prendre rendez-vous sont deux plages horaires différentes.
 */
export const CONSULTATION_HOURS_TEXT = "Du lundi au vendredi, 9h30 – 12h30";
export const BOOKING_HOURS_TEXT =
	"Les rendez-vous se prennent par téléphone, du lundi au vendredi de 10h00 à 19h00.";

/** Versions condensées pour les emplacements à faible largeur (Footer). */
export const CONSULTATION_HOURS_SHORT = "lun–ven, 9h30–12h30";
export const BOOKING_HOURS_SHORT = "lun–ven, 10h00–19h00";
