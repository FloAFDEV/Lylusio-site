import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

/**
 * This component handles WordPress-style article URLs at the root level.
 * It checks if the slug corresponds to a WordPress article and renders
 * the BlogPost page directly, preserving the original URL structure.
 */

const WP_API_URL = "https://lylusio.fr/wp-json/wp/v2";

const ArticleRedirect = () => {
  const { slug } = useParams<{ slug: string }>();
  const [checking, setChecking] = useState(true);
  const [isArticle, setIsArticle] = useState(false);

  useEffect(() => {
    const checkIfArticle = async () => {
      if (!slug) {
        setChecking(false);
        return;
      }

      try {
        const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_fields=id`);
        if (response.ok) {
          const posts = await response.json();
          setIsArticle(posts.length > 0);
        }
      } catch {
        setIsArticle(false);
      } finally {
        setChecking(false);
      }
    };

    checkIfArticle();
  }, [slug]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // If it's an article, redirect to /blog/:slug which will handle rendering
  if (isArticle) {
    return <Navigate to={`/blog/${slug}`} replace />;
  }

  // Not an article, redirect to 404
  return <Navigate to="/404" replace />;
};

export default ArticleRedirect;
