import { useState } from "react";
import { Phone, Mail, Eye } from "lucide-react";

interface ClickToRevealProps {
  type: "phone" | "email";
  value: string;
  displayValue?: string;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
  variant?: "default" | "compact" | "footer";
}

// Obfuscated data to prevent scraping
const obfuscate = (str: string): string => {
  return str.split("").reverse().join("");
};

const deobfuscate = (str: string): string => {
  return str.split("").reverse().join("");
};

const ClickToReveal = ({
  type,
  value,
  displayValue,
  className = "",
  iconClassName = "w-4 h-4",
  showIcon = true,
  variant = "default",
}: ClickToRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(false);

  // Store obfuscated value
  const obfuscatedValue = obfuscate(value);
  const actualValue = deobfuscate(obfuscatedValue);
  const display = displayValue || actualValue;

  const Icon = type === "phone" ? Phone : Mail;
  const href = type === "phone" ? `tel:${actualValue}` : `mailto:${actualValue}`;
  const revealText = type === "phone" ? "Afficher le numéro" : "Afficher l'email";
  const ariaLabel = type === "phone" 
    ? `Appeler le ${display}` 
    : `Envoyer un email à ${display}`;

  const baseButtonStyles = {
    default: "flex items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer group",
    compact: "flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-all duration-300 cursor-pointer",
    footer: "flex items-center gap-3 text-primary-foreground/70 hover:text-gold-light transition-colors duration-500 text-sm md:text-base cursor-pointer",
  };

  const baseLinkStyles = {
    default: "flex items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300",
    compact: "flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-all duration-300",
    footer: "flex items-center gap-3 text-primary-foreground/70 hover:text-gold-light transition-colors duration-500 text-sm md:text-base",
  };

  if (!isRevealed) {
    return (
      <button
        onClick={() => setIsRevealed(true)}
        className={`${baseButtonStyles[variant]} ${className}`}
        aria-label={revealText}
      >
        {showIcon && <Icon className={`${iconClassName} shrink-0`} aria-hidden="true" />}
        <span className="flex items-center gap-1.5">
          <Eye className="w-3 h-3 opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
          <span className="text-xs sm:text-sm">{revealText}</span>
        </span>
      </button>
    );
  }

  return (
    <a
      href={href}
      className={`${baseLinkStyles[variant]} ${className}`}
      aria-label={ariaLabel}
      style={{
        animation: 'revealSlideUp 0.25s ease-out forwards',
      }}
    >
      {showIcon && <Icon className={`${iconClassName} shrink-0`} aria-hidden="true" />}
      <span>{display}</span>
    </a>
  );
};

export default ClickToReveal;

// Honeypot component (invisible to users, visible to bots)
export const HoneypotContact = () => (
  <div 
    aria-hidden="true" 
    style={{ 
      position: "absolute", 
      left: "-9999px", 
      opacity: 0, 
      pointerEvents: "none",
      height: 0,
      overflow: "hidden"
    }}
  >
    <a href="tel:+33000000000">00 00 00 00 00</a>
    <a href="mailto:spam-trap@example.com">spam-trap@example.com</a>
  </div>
);