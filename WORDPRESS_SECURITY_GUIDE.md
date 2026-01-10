# Guide de Sécurisation WordPress
## Configuration de sécurité pour admin.lylusio.fr

Ce guide complète le fichier `wordpress-security.htaccess` avec des configurations additionnelles.

---

## 📋 Table des Matières
1. [Installation du .htaccess](#1-installation-du-htaccess)
2. [Configuration wp-config.php](#2-configuration-wp-configphp)
3. [Plugins de Sécurité Recommandés](#3-plugins-de-sécurité-recommandés)
4. [Désactivation des Fonctionnalités Non Utilisées](#4-désactivation-des-fonctionnalités-non-utilisées)
5. [Protection Anti-Spam](#5-protection-anti-spam)
6. [Monitoring et Maintenance](#6-monitoring-et-maintenance)

---

## 1. Installation du .htaccess

### Étapes:
1. Connectez-vous à votre serveur via FTP/SFTP ou cPanel
2. Naviguez vers le répertoire racine de WordPress (`/public_html` ou équivalent)
3. Copiez le contenu du fichier `wordpress-security.htaccess`
4. Remplacez ou créez le fichier `.htaccess` dans la racine WordPress
5. Testez l'accès au site pour confirmer que tout fonctionne

### ⚠️ IMPORTANT:
- Faites une **sauvegarde** de votre `.htaccess` actuel avant toute modification
- Si vous rencontrez des erreurs 403/500, restaurez la sauvegarde immédiatement
- Les règles de sécurité peuvent bloquer certains plugins - ajustez si nécessaire

---

## 2. Configuration wp-config.php

Ajoutez ces lignes de sécurité à votre fichier `wp-config.php` (avant `/* C'est tout, ne touchez pas à ce qui suit ! */`):

```php
// ============================================
// SÉCURITÉ WORDPRESS - Configuration avancée
// ============================================

// 1. DÉSACTIVER L'ÉDITEUR DE FICHIERS DANS L'ADMIN
// Empêche l'édition de thèmes/plugins depuis l'admin
define('DISALLOW_FILE_EDIT', true);

// 2. DÉSACTIVER L'INSTALLATION DE PLUGINS/THÈMES
// Décommentez si vous ne voulez JAMAIS installer de nouveaux plugins
// define('DISALLOW_FILE_MODS', true);

// 3. FORCER SSL POUR L'ADMIN
define('FORCE_SSL_ADMIN', true);

// 4. LIMITER LES RÉVISIONS DE POSTS
// Réduit la taille de la base de données
define('WP_POST_REVISIONS', 5);

// 5. VIDER LA CORBEILLE AUTOMATIQUEMENT
// Supprime définitivement après 7 jours
define('EMPTY_TRASH_DAYS', 7);

// 6. AUGMENTER LA MÉMOIRE PHP (si nécessaire)
define('WP_MEMORY_LIMIT', '256M');
define('WP_MAX_MEMORY_LIMIT', '512M');

// 7. DÉSACTIVER XMLRPC (IMPORTANT pour la sécurité)
add_filter('xmlrpc_enabled', '__return_false');

// 8. CACHER LES ERREURS PHP EN PRODUCTION
ini_set('display_errors', 'Off');
define('WP_DEBUG', false);
define('WP_DEBUG_DISPLAY', false);

// 9. CHANGER LE PRÉFIXE DES TABLES (si pas déjà fait)
// $table_prefix = 'wp_secure_'; // Exemple - À changer AVANT installation
// ⚠️ NE PAS CHANGER SI DÉJÀ INSTALLÉ sans migration!

// 10. SÉCURITÉ DES CLÉS (générez de nouvelles clés sur https://api.wordpress.org/secret-key/1.1/salt/)
// Remplacez les clés par défaut par de nouvelles clés uniques
```

---

## 3. Plugins de Sécurité Recommandés

### A. Wordfence Security (Recommandé)
**Installation:**
1. Allez dans `Extensions → Ajouter`
2. Recherchez "Wordfence Security"
3. Installez et activez

**Configuration recommandée:**
- ✅ Activer le pare-feu en mode "Extended Protection"
- ✅ Activer le scan automatique quotidien
- ✅ Bloquer les IPs après 3 tentatives de connexion échouées
- ✅ Activer la protection brute-force sur wp-login.php
- ✅ Bloquer les fausses Google crawlers

### B. Limit Login Attempts Reloaded
**Installation:**
1. Extensions → Ajouter → "Limit Login Attempts Reloaded"
2. Activez

**Configuration:**
- Limiter à 3 tentatives en 20 minutes
- Bannir après 4 blocages
- Notifier par email après 3 blocages

### C. Disable Comments (Bloquer le spam)
**Installation:**
1. Extensions → "Disable Comments"
2. Activez et désactivez les commentaires partout

---

## 4. Désactivation des Fonctionnalités Non Utilisées

### A. Désactiver les commentaires
**Raison:** Votre site n'utilise pas les commentaires WordPress (le blog est headless)

**Méthode 1: Via l'admin**
1. Réglages → Discussion
2. Décochez "Autoriser les commentaires sur les nouveaux articles"
3. Enregistrez

**Méthode 2: Plugin "Disable Comments"** (recommandé)

### B. Désactiver XML-RPC
**Raison:** Cible majeure des attaques DDoS et brute-force

**Via plugin:** Installez "Disable XML-RPC"
**Via .htaccess:** Déjà inclus dans `wordpress-security.htaccess`

### C. Masquer la version de WordPress
**Ajoutez à functions.php de votre thème:**

```php
// Supprimer la version WordPress des meta tags
remove_action('wp_head', 'wp_generator');

// Supprimer la version des scripts/styles
function remove_wp_version_strings($src) {
    global $wp_version;
    parse_str(parse_url($src, PHP_URL_QUERY), $query);
    if (!empty($query['ver']) && $query['ver'] === $wp_version) {
        $src = remove_query_arg('ver', $src);
    }
    return $src;
}
add_filter('script_loader_src', 'remove_wp_version_strings');
add_filter('style_loader_src', 'remove_wp_version_strings');
```

---

## 5. Protection Anti-Spam

### A. Bloquer les anciens formulaires
**Déjà fait via .htaccess:**
- ✅ Contact Form 7 endpoints bloqués
- ✅ Anciens chemins `/astrologue-cepet-toulouse/` retournent 410 Gone
- ✅ `wp-comments-post.php` bloqué

### B. Nettoyer la base de données
**Supprimer les spams existants:**

1. Installez "WP-Optimize"
2. Allez dans Outils → WP-Optimize
3. Cochez:
   - Supprimer tous les commentaires en spam
   - Supprimer tous les commentaires dans la corbeille
   - Nettoyer les révisions
4. Exécutez l'optimisation

### C. Configurer Akismet (Anti-spam)
1. Activez le plugin Akismet (pré-installé)
2. Créez un compte Akismet (gratuit pour usage personnel)
3. Connectez votre clé API

---

## 6. Monitoring et Maintenance

### A. Surveillance des logs
**Via Wordfence:**
- Consultez quotidiennement "Tools → Live Traffic"
- Surveillez les tentatives de connexion bloquées
- Bloquez manuellement les IPs suspectes

### B. Sauvegardes automatiques
**Plugin recommandé: UpdraftPlus**

1. Installez UpdraftPlus
2. Configurez:
   - Sauvegarde quotidienne de la base de données
   - Sauvegarde hebdomadaire des fichiers
   - Stockage sur Google Drive ou Dropbox
3. Activez les sauvegardes automatiques

### C. Mises à jour régulières
**Important:**
- ✅ Mettez à jour WordPress core dès que disponible
- ✅ Mettez à jour les plugins chaque semaine
- ✅ Supprimez les plugins/thèmes non utilisés

---

## 🔒 Checklist de Sécurité Finale

Avant de considérer la sécurisation terminée, vérifiez:

- [ ] `.htaccess` de sécurité installé et testé
- [ ] `wp-config.php` sécurisé (DISALLOW_FILE_EDIT, FORCE_SSL_ADMIN)
- [ ] Wordfence installé et configuré
- [ ] Limit Login Attempts actif
- [ ] XML-RPC désactivé
- [ ] Commentaires désactivés partout
- [ ] Version WordPress masquée
- [ ] Anciens formulaires bloqués (vérifier via navigateur)
- [ ] Sauvegardes automatiques configurées
- [ ] Scan de sécurité Wordfence exécuté (0 problèmes critiques)
- [ ] Test de connexion admin fonctionnel
- [ ] Test d'accès REST API depuis lylusio.fr fonctionnel

---

## 🧪 Tests à Effectuer

### 1. Test d'accès wp-admin (sans connexion)
```bash
curl -I https://admin.lylusio.fr/wp-admin/
# Devrait retourner: 403 Forbidden (si non connecté)
```

### 2. Test d'accès REST API (public)
```bash
curl https://admin.lylusio.fr/wp-json/wp/v2/posts?per_page=1
# Devrait retourner: 200 OK avec les données des articles
```

### 3. Test XML-RPC bloqué
```bash
curl -I https://admin.lylusio.fr/xmlrpc.php
# Devrait retourner: 403 Forbidden
```

### 4. Test ancien formulaire bloqué
```bash
curl -I https://admin.lylusio.fr/astrologue-cepet-toulouse/contact/
# Devrait retourner: 410 Gone
```

---

## 📞 Support et Dépannage

### Si le site est inaccessible après modifications:
1. Connectez-vous via FTP/SFTP
2. Renommez `.htaccess` en `.htaccess.bak`
3. Créez un nouveau `.htaccess` avec seulement les règles WordPress standard
4. Testez l'accès
5. Réintégrez les règles de sécurité une par une

### Si l'admin est bloqué:
1. Vérifiez que vous êtes bien connecté à WordPress
2. Videz le cache du navigateur
3. Testez en navigation privée
4. Si nécessaire, commentez temporairement les règles wp-admin dans `.htaccess`

### Si le REST API ne fonctionne plus:
1. Vérifiez les headers CORS dans `.htaccess`
2. Assurez-vous que `Access-Control-Allow-Origin` est défini sur `https://lylusio.fr`
3. Testez avec `curl -H "Origin: https://lylusio.fr" https://admin.lylusio.fr/wp-json/wp/v2/posts`

---

## 📚 Ressources Supplémentaires

- [WordPress Hardening Guide Officiel](https://wordpress.org/support/article/hardening-wordpress/)
- [Wordfence Documentation](https://www.wordfence.com/help/)
- [OWASP Top 10 WordPress Security](https://owasp.org/www-project-web-security-testing-guide/)

---

**Dernière mise à jour:** 10 janvier 2026
**Auteur:** Claude Code
**Site:** lylusio.fr
