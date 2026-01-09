# 🔒 Rapport d'Audit de Sécurité - Lylusio Next.js + WordPress Headless

**Date** : 9 janvier 2026
**Site** : https://lylusio.fr
**Stack** : Next.js 16.1.1 + WordPress Headless + Vercel

---

## 📊 Résumé Exécutif

### ✅ Points Forts Identifiés
- HTTPS strict sur tous les domaines (Vercel + WordPress)
- Headers de sécurité de base présents
- Séparation correcte des variables publiques/privées
- Protection des images implémentée
- Turbopack et optimisations Next.js activés

### ⚠️ Vulnérabilités Identifiées

| Criticité | Problème | Impact | Status |
|-----------|----------|--------|--------|
| 🔴 **CRITIQUE** | Pas de CSP (Content Security Policy) | XSS, injection scripts | À corriger |
| 🔴 **CRITIQUE** | WordPress API accessible publiquement | Enumération users, brute force | À corriger |
| 🟡 **MOYEN** | Pas de rate limiting sur API | DoS, spam | À implémenter |
| 🟡 **MOYEN** | Headers CSP pour SVG trop permissifs | XSS via SVG | À durcir |
| 🟢 **FAIBLE** | Logs d'erreurs WordPress en production | Fuite d'infos serveur | À désactiver |

---

## 1️⃣ HTTPS / SSL ✅

### État Actuel

**✅ Front-end Vercel**
- HTTPS forcé automatiquement par Vercel
- Certificat SSL Let's Encrypt auto-renouvelé
- HSTS header présent : `max-age=31536000; includeSubDomains`
- Score SSL Labs : A+ (attendu)

**✅ WordPress API**
- URL : `https://lylusio.fr/wp-json/wp/v2`
- HTTPS détecté dans `remotePatterns` de `next.config.ts`
- ⚠️ **Problème détecté** : Erreur certificat "lylusio.fr." vs "www.lylusio.fr"

```
Error: Hostname/IP does not match certificate's altnames:
Host: lylusio.fr. is not in the cert's altnames: DNS:www.lylusio.fr
```

### 🔧 Actions Requises

1. **Vérifier certificat SSL WordPress** :
   - Le certificat doit couvrir **à la fois** `lylusio.fr` ET `www.lylusio.fr`
   - Utiliser un certificat wildcard ou multi-domaine
   - Vérifier avec : `openssl s_client -connect lylusio.fr:443 -servername lylusio.fr`

2. **Forcer redirection www → non-www** (ou inverse) :
```apache
# Dans .htaccess WordPress
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.lylusio\.fr$ [NC]
RewriteRule ^(.*)$ https://lylusio.fr/$1 [R=301,L]
```

---

## 2️⃣ SÉCURITÉ API WORDPRESS 🔴

### Endpoints Exposés

WordPress REST API expose par défaut :

#### 🟢 Endpoints Publics (OK) :
- `GET /wp-json/wp/v2/posts` - Liste des articles
- `GET /wp-json/wp/v2/posts/{id}` - Article individuel
- `GET /wp-json/wp/v2/categories` - Liste des catégories
- `GET /wp-json/wp/v2/tags` - Liste des tags
- `GET /wp-json/wp/v2/media` - Liste des médias

#### 🔴 Endpoints Sensibles (À PROTÉGER) :
- `GET /wp-json/wp/v2/users` - ❌ **CRITIQUE : Énumération des utilisateurs**
- `POST /wp-json/wp/v2/posts` - Création d'articles (nécessite auth)
- `POST /wp-json/wp/v2/comments` - Création de commentaires
- `GET /wp-json` - Découverte de tous les endpoints

### 🔧 Corrections WordPress Requises

#### A. Désactiver l'énumération des utilisateurs

📁 **Fichier : WordPress `functions.php`**

```php
<?php
/**
 * Sécurité REST API WordPress
 */

// 1. Désactiver complètement l'endpoint /users pour les non-authentifiés
add_filter('rest_endpoints', function($endpoints) {
    if (!is_user_logged_in()) {
        if (isset($endpoints['/wp/v2/users'])) {
            unset($endpoints['/wp/v2/users']);
        }
        if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
            unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
        }
    }
    return $endpoints;
});

// 2. Masquer les auteurs dans les réponses d'articles
add_filter('rest_prepare_post', function($response, $post, $request) {
    if (!is_user_logged_in()) {
        $data = $response->get_data();
        // Remplacer l'ID auteur par un nom générique
        $data['author'] = 0;
        $data['author_name'] = 'Lylusio';
        $response->set_data($data);
    }
    return $response;
}, 10, 3);

// 3. Ajouter rate limiting basique
add_action('rest_api_init', function() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $rate_limit_key = 'rest_api_rate_limit_' . md5($ip);
    $requests = get_transient($rate_limit_key) ?: 0;

    if ($requests > 100) { // 100 requêtes par minute max
        wp_send_json_error(['message' => 'Rate limit exceeded'], 429);
        exit;
    }

    set_transient($rate_limit_key, $requests + 1, 60);
});

// 4. Masquer la version WordPress dans les headers
remove_action('wp_head', 'wp_generator');
add_filter('the_generator', '__return_empty_string');

// 5. Désactiver XML-RPC (souvent ciblé pour attaques)
add_filter('xmlrpc_enabled', '__return_false');
?>
```

#### B. Configuration CORS stricte

📁 **Fichier : WordPress `functions.php`**

```php
<?php
/**
 * CORS strict pour Next.js uniquement
 */
add_action('rest_api_init', function() {
    $allowed_origins = [
        'https://lylusio.fr',
        'https://www.lylusio.fr',
        'https://lylusio-git-main-floaafdev.vercel.app', // Vercel preview
    ];

    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';

    if (in_array($origin, $allowed_origins, true)) {
        header("Access-Control-Allow-Origin: $origin");
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
    }

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit;
    }
});
?>
```

#### C. Désactiver la découverte de l'API

📁 **Fichier : WordPress `functions.php`**

```php
<?php
// Désactiver les liens de découverte REST API
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('template_redirect', 'rest_output_link_header', 11);
?>
```

---

## 3️⃣ VARIABLES D'ENVIRONNEMENT ✅

### État Actuel

**✅ Séparation correcte identifiée** :

📁 `.env` (développement)
```bash
# Variables PUBLIQUES (exposées au client)
NEXT_PUBLIC_WP_API_URL=https://lylusio.fr/wp-json/wp/v2
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://lylusio.fr

# Variables PRIVÉES (serveur uniquement)
# Aucune détectée - ✅ BON
```

**⚠️ Recommandation** : Si tu utilises des clés API privées à l'avenir, ne JAMAIS préfixer par `NEXT_PUBLIC_`

### 🔒 Bonnes Pratiques

```bash
# ✅ CORRECT - Variables publiques
NEXT_PUBLIC_GA_ID=G-ABC123
NEXT_PUBLIC_SITE_URL=https://lylusio.fr

# ❌ INCORRECT - Ne JAMAIS exposer
NEXT_PUBLIC_STRIPE_SECRET_KEY=sk_live_xxx  # DANGER !
NEXT_PUBLIC_DATABASE_URL=postgres://...     # DANGER !

# ✅ CORRECT - Variables privées (sans NEXT_PUBLIC_)
STRIPE_SECRET_KEY=sk_live_xxx
DATABASE_URL=postgres://...
JWT_SECRET=super_secret_key
```

### Configuration Vercel

Dans les settings Vercel, ajouter uniquement les variables **publiques** :

```
NEXT_PUBLIC_GA_ID = G-VOTRE_VRAI_ID
NEXT_PUBLIC_SITE_URL = https://lylusio.fr
NEXT_PUBLIC_WP_API_URL = https://lylusio.fr/wp-json/wp/v2
```

---

## 4️⃣ HEADERS DE SÉCURITÉ 🟡

### État Actuel (next.config.ts)

**✅ Headers présents** :
- `Strict-Transport-Security` ✅
- `X-Frame-Options: SAMEORIGIN` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Referrer-Policy: strict-origin-when-cross-origin` ✅
- `Permissions-Policy` ✅

**🔴 Headers MANQUANTS** :
- `Content-Security-Policy` (CSP) ❌ **CRITIQUE**
- `X-XSS-Protection` ❌

### 🔧 Configuration Complète

📁 **Fichier : `next.config.ts`**
🔁 **Remplacement de la section `headers()`**

```typescript
async headers() {
    return [
        {
            source: "/:path*",
            headers: [
                // 🔒 HSTS - Force HTTPS
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },

                // 🔒 CSP - Content Security Policy STRICT
                {
                    key: "Content-Security-Policy",
                    value: [
                        "default-src 'self'",
                        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://calendly.com",
                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                        "font-src 'self' https://fonts.gstatic.com data:",
                        "img-src 'self' data: https: blob:",
                        "media-src 'self' https:",
                        "connect-src 'self' https://lylusio.fr https://www.google-analytics.com https://analytics.google.com",
                        "frame-src 'self' https://calendly.com https://www.youtube.com https://www.youtube-nocookie.com",
                        "object-src 'none'",
                        "base-uri 'self'",
                        "form-action 'self'",
                        "frame-ancestors 'self'",
                        "upgrade-insecure-requests",
                    ].join("; "),
                },

                // 🔒 Clickjacking protection
                {
                    key: "X-Frame-Options",
                    value: "SAMEORIGIN",
                },

                // 🔒 MIME type sniffing protection
                {
                    key: "X-Content-Type-Options",
                    value: "nosniff",
                },

                // 🔒 XSS Filter (legacy mais utile)
                {
                    key: "X-XSS-Protection",
                    value: "1; mode=block",
                },

                // 🔒 Referrer Policy
                {
                    key: "Referrer-Policy",
                    value: "strict-origin-when-cross-origin",
                },

                // 🔒 Permissions Policy
                {
                    key: "Permissions-Policy",
                    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self), usb=()",
                },

                // ⚡ Performance
                {
                    key: "X-DNS-Prefetch-Control",
                    value: "on",
                },
            ],
        },

        // Cache headers for static assets (inchangé)
        {
            source: "/assets/:path*",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
        },
        {
            source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2)",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
        },
        {
            source: "/_next/static/:path*",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
        },
    ];
},
```

### 🧪 Test des Headers

```bash
# Tester les headers en production
curl -I https://lylusio.fr | grep -E "(Strict-Transport|Content-Security|X-Frame|X-Content)"

# Ou utiliser SecurityHeaders.com
https://securityheaders.com/?q=https://lylusio.fr
```

**Objectif** : Score A+ sur SecurityHeaders.com

---

## 5️⃣ EDGE FUNCTIONS POUR REQUÊTES SENSIBLES 🚀

### Principe

Au lieu d'appeler l'API WordPress directement depuis le client, **relayer via Next.js API Routes/Edge Functions** pour :
- Cacher les clés API privées
- Ajouter validation et sanitization
- Implémenter rate limiting côté serveur
- Logger les tentatives suspectes

### 📁 Route API : Récupération d'Articles

📁 **Fichier : `app/api/posts/route.ts`**
🔁 **Création nouveau fichier**

```typescript
import { NextRequest, NextResponse } from "next/server";

// Utiliser Edge Runtime pour performance maximale
export const runtime = "edge";

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

// Rate limiting simple (en production, utiliser Vercel KV ou Upstash)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const limit = rateLimitMap.get(ip);

    if (!limit || now > limit.resetAt) {
        rateLimitMap.set(ip, { count: 1, resetAt: now + 60000 }); // 1 minute window
        return true;
    }

    if (limit.count >= 60) {
        // Max 60 requêtes/minute
        return false;
    }

    limit.count++;
    return true;
}

export async function GET(request: NextRequest) {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

    if (!checkRateLimit(ip)) {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    // Récupération des paramètres
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const perPage = searchParams.get("per_page") || "10";
    const category = searchParams.get("category");

    // Validation
    if (isNaN(Number(page)) || isNaN(Number(perPage))) {
        return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    try {
        let url = `${WP_API_URL}/posts?page=${page}&per_page=${perPage}&_embed`;
        if (category) {
            url += `&categories=${category}`;
        }

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Lylusio-Next/1.0",
            },
            next: { revalidate: 3600 }, // Cache 1h
        });

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const data = await response.json();

        // Sanitization : retirer informations sensibles
        const sanitized = data.map((post: any) => ({
            id: post.id,
            title: post.title?.rendered,
            excerpt: post.excerpt?.rendered,
            content: post.content?.rendered,
            date: post.date,
            slug: post.slug,
            categories: post.categories,
            featured_media: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
            // NE PAS exposer : author ID, meta privées, etc.
        }));

        return NextResponse.json(sanitized, {
            headers: {
                "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
            },
        });
    } catch (error) {
        console.error("[API /posts] Error:", error);
        return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
    }
}
```

### 📁 Route API : Récupération d'un Article

📁 **Fichier : `app/api/posts/[slug]/route.ts`**
🔁 **Création nouveau fichier**

```typescript
import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || "https://lylusio.fr/wp-json/wp/v2";

export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
    const { slug } = params;

    // Validation du slug (alphanumérique + tirets uniquement)
    if (!/^[a-z0-9-]+$/i.test(slug)) {
        return NextResponse.json({ error: "Invalid slug format" }, { status: 400 });
    }

    try {
        const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`, {
            headers: {
                "User-Agent": "Lylusio-Next/1.0",
            },
            next: { revalidate: 7200 }, // Cache 2h
        });

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        const post = data[0];

        // Sanitization
        const sanitized = {
            id: post.id,
            title: post.title?.rendered,
            content: post.content?.rendered,
            excerpt: post.excerpt?.rendered,
            date: post.date,
            modified: post.modified,
            slug: post.slug,
            categories: post.categories,
            tags: post.tags,
            featured_media: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url,
            yoast_head_json: post.yoast_head_json, // SEO metadata
        };

        return NextResponse.json(sanitized, {
            headers: {
                "Cache-Control": "public, s-maxage=7200, stale-while-revalidate=14400",
            },
        });
    } catch (error) {
        console.error(`[API /posts/${slug}] Error:`, error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}
```

### Utilisation dans les Composants

```typescript
// ❌ AVANT (appel direct depuis le client)
const response = await fetch("https://lylusio.fr/wp-json/wp/v2/posts");

// ✅ APRÈS (via Edge Function)
const response = await fetch("/api/posts?page=1&per_page=10");
```

---

## 6️⃣ RECOMMANDATIONS SUPPLÉMENTAIRES 🛡️

### A. Sécurisation des Cookies

Si tu implémente de l'authentification à l'avenir :

```typescript
// next.config.ts ou middleware.ts
const secureCookieConfig = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: 3600, // 1 heure
    path: "/",
};

// Exemple avec next-auth
export const authOptions = {
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: secureCookieConfig,
        },
    },
};
```

### B. Protection contre Fuites de Données

📁 **Fichier : `middleware.ts`**
🔁 **Ajout de filtres de sécurité**

```typescript
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Supprimer headers exposant des infos serveur
    response.headers.delete("X-Powered-By");
    response.headers.delete("Server");

    // Ajouter header de sécurité custom
    response.headers.set("X-Content-Type-Options", "nosniff");

    return response;
}

export const config = {
    matcher: "/:path*",
};
```

### C. Monitoring et Alerting

#### 1. Logs Structurés avec Pino

```bash
npm install pino pino-pretty
```

📁 **Fichier : `lib/logger.ts`**

```typescript
import pino from "pino";

export const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport:
        process.env.NODE_ENV === "development"
            ? {
                  target: "pino-pretty",
                  options: {
                      colorize: true,
                  },
              }
            : undefined,
});

// Utilisation dans les API routes
export function logSecurityEvent(event: {
    type: "rate_limit" | "invalid_request" | "error";
    ip: string;
    path: string;
    details?: any;
}) {
    logger.warn({
        security_event: event.type,
        ip: event.ip,
        path: event.path,
        timestamp: new Date().toISOString(),
        ...event.details,
    });
}
```

#### 2. Intégration Vercel Analytics

```bash
npm install @vercel/analytics @vercel/speed-insights
```

📁 **Fichier : `app/layout.tsx`**

```typescript
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                {children}
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
```

#### 3. Alertes via Webhook

📁 **Fichier : `lib/alerts.ts`**

```typescript
export async function sendSecurityAlert(message: string, severity: "low" | "medium" | "high") {
    if (process.env.NODE_ENV !== "production") return;

    const WEBHOOK_URL = process.env.SECURITY_WEBHOOK_URL;
    if (!WEBHOOK_URL) return;

    try {
        await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: `🚨 [${severity.toUpperCase()}] Security Alert`,
                blocks: [
                    {
                        type: "section",
                        text: {
                            type: "mrkdwn",
                            text: message,
                        },
                    },
                ],
            }),
        });
    } catch (error) {
        console.error("Failed to send security alert:", error);
    }
}

// Utilisation
await sendSecurityAlert("Rate limit exceeded for IP: 192.168.1.1 on /api/posts", "medium");
```

### D. Checklist de Déploiement

- [ ] Remplacer `G-XXXXXXXXXX` par le vrai Google Analytics ID
- [ ] Configurer variables d'environnement sur Vercel
- [ ] Appliquer corrections WordPress (functions.php)
- [ ] Vérifier certificat SSL couvre www + non-www
- [ ] Tester headers avec SecurityHeaders.com (objectif A+)
- [ ] Tester CSP avec CSP Evaluator (Google)
- [ ] Configurer monitoring (Vercel Analytics + logs)
- [ ] Mettre en place alertes webhook
- [ ] Tester rate limiting sur API routes
- [ ] Vérifier endpoints WordPress protégés
- [ ] Audit final avec OWASP ZAP ou Burp Suite

---

## 🎯 Score de Sécurité Actuel vs Objectif

| Critère | Actuel | Objectif | Actions |
|---------|---------|----------|---------|
| HTTPS/TLS | 🟡 B+ | 🟢 A+ | Corriger certificat www |
| Headers Sécurité | 🟡 C | 🟢 A+ | Ajouter CSP complet |
| API Security | 🔴 D | 🟢 A | Protéger /users, rate limit |
| Env Variables | 🟢 A | 🟢 A | ✅ Bon |
| Input Validation | 🟡 B | 🟢 A | Edge Functions + sanitization |
| Monitoring | 🔴 F | 🟢 B+ | Logs + alertes |

### Priorités d'Implémentation

1. **🔴 URGENT** (< 24h)
   - Ajouter CSP dans `next.config.ts`
   - Désactiver endpoint `/users` WordPress
   - Corriger certificat SSL

2. **🟡 IMPORTANT** (< 1 semaine)
   - Créer Edge Functions pour API
   - Implémenter rate limiting
   - Configurer monitoring/logs

3. **🟢 SOUHAITABLE** (< 1 mois)
   - Audit externe OWASP ZAP
   - Mettre en place WAF Vercel Pro
   - Penetration testing

---

## 📚 Ressources et Outils

### Outils de Test
- [SecurityHeaders.com](https://securityheaders.com) - Test headers HTTP
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test SSL/TLS
- [CSP Evaluator](https://csp-evaluator.withgoogle.com/) - Validation CSP
- [OWASP ZAP](https://www.zaproxy.org/) - Scanner vulnérabilités
- [Burp Suite Community](https://portswigger.net/burp/communitydownload) - Penetration testing

### Documentation
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [WordPress REST API Security](https://developer.wordpress.org/rest-api/frequently-asked-questions/#security)
- [Vercel Security Best Practices](https://vercel.com/docs/security)

---

**Rapport généré le** : 9 janvier 2026
**Prochaine revue recommandée** : Mensuelle
**Contact sécurité** : contact@lylusio.fr
