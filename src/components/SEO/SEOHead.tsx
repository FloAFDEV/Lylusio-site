import { Helmet } from "react-helmet-async";
import { getCanonicalUrl, getOgUrl, DEFAULT_OG_IMAGE, SITE_NAME, DEFAULT_AUTHOR } from "@/lib/seo";

interface SEOHeadProps {
  title: string;
  description: string;
  pathname: string;
  ogType?: "website" | "article" | "profile";
  ogImage?: string;
  keywords?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  pathname,
  ogType = "website",
  ogImage = DEFAULT_OG_IMAGE,
  keywords,
  author = DEFAULT_AUTHOR,
  publishedTime,
  modifiedTime,
  section,
  noindex = false,
}: SEOHeadProps) => {
  const fullTitle = title.includes("Lylusio") ? title : `${title} | Lylusio`;
  const canonicalUrl = getCanonicalUrl(pathname);
  const ogUrl = getOgUrl(pathname);

  return (
    <Helmet>
      {/* Title and description */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      
      {/* Canonical - Single source of truth */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - Lylusio`} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:site_name" content={SITE_NAME} />
      
      {/* Article-specific OG tags */}
      {ogType === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === "article" && section && (
        <meta property="article:section" content={section} />
      )}
      {ogType === "article" && (
        <meta property="article:author" content="Émilie Perez" />
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={ogUrl} />
      
      {/* Geo tags for local SEO */}
      <meta name="geo.region" content="FR-31" />
      <meta name="geo.placename" content="Cépet, Toulouse" />
      <meta name="geo.position" content="43.7484;1.4298" />
      <meta name="ICBM" content="43.7484, 1.4298" />
    </Helmet>
  );
};

export default SEOHead;
