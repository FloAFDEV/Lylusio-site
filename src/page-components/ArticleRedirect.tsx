"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { useEffect, useState } from "react";

/**
 * This component handles WordPress-style article URLs at the root level.
 * It checks if the slug corresponds to a WordPress article and renders
 * the BlogPost page directly, preserving the original URL structure.
 */

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

const ArticleRedirect = () => {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();
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

  // Redirect effect - ALWAYS called, not conditionally
  useEffect(() => {
    if (!checking && isArticle) {
      router.replace(`/blog/${slug}`);
    } else if (!checking && !isArticle) {
      router.replace('/404');
    }
  }, [checking, isArticle, router, slug]);

  // While checking or waiting for redirect, show skeleton
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-64" />
          <div className="h-4 bg-muted/70 rounded w-48" />
        </div>
      </div>
    );
  }

  // While redirecting, return null
  return null;
};

export default ArticleRedirect;
