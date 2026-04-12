import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import type { RessourceArticle } from "@/lib/ressources";

interface ArticleCardProps {
	article: RessourceArticle;
}

const categoryColors: Record<RessourceArticle["category"], string> = {
	astrologie: "bg-accent/10 text-accent border-accent/20",
	reiki: "bg-gold/10 text-gold border-gold/20",
	"developpement-personnel": "bg-secondary/30 text-foreground/70 border-border/40",
};

export default function ArticleCard({ article }: ArticleCardProps) {
	const { slug, title, description, date, image, imageAlt, category, categoryLabel, readTime } =
		article;

	const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});

	return (
		<article className="group relative bg-card rounded-2xl overflow-hidden border border-border/20 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col">
			{/* Image */}
			<Link
				href={`/ressources/${slug}`}
				className="block relative overflow-hidden aspect-[16/9] flex-shrink-0"
				aria-label={`Lire l'article : ${title}`}
				tabIndex={-1}
			>
				<Image
					src={image}
					alt={imageAlt}
					fill
					className="object-cover transition-transform duration-500 group-hover:scale-105"
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					quality={75}
				/>
				{/* Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			</Link>

			{/* Content */}
			<div className="flex flex-col flex-1 p-5 md:p-6">
				{/* Meta row */}
				<div className="flex items-center gap-3 mb-3">
					<span
						className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryColors[category]}`}
					>
						{categoryLabel}
					</span>
					<span className="flex items-center gap-1 text-xs text-muted-foreground">
						<Clock className="w-3 h-3" aria-hidden="true" />
						{readTime} min
					</span>
					<time
						dateTime={date}
						className="text-xs text-muted-foreground ml-auto"
					>
						{formattedDate}
					</time>
				</div>

				{/* Title */}
				<h3 className="font-heading text-base md:text-lg font-semibold text-foreground mb-2 line-clamp-2 leading-snug">
					<Link
						href={`/ressources/${slug}`}
						className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
					>
						{title}
					</Link>
				</h3>

				{/* Description */}
				<p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed flex-1">
					{description}
				</p>

				{/* CTA */}
				<Link
					href={`/ressources/${slug}`}
					className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-accent hover:text-accent/80 transition-colors group/link focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
					aria-label={`Lire l'article complet : ${title}`}
				>
					Lire l'article
					<ArrowRight
						className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
						aria-hidden="true"
					/>
				</Link>
			</div>
		</article>
	);
}
