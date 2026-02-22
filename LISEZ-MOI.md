# 📦 MonStock Pro — Guide d'installation

## Structure des fichiers (TOUS dans le même dossier)

```
📁 MonStock Pro/
├── Vpro.html        ← Application principale
├── manifest.json    ← Configuration PWA
├── sw.js            ← Service Worker (mode hors-ligne)
├── icon-192.png     ← Icône app (petite)
└── icon-512.png     ← Icône app (grande)
```

---

## 🚀 Étape 1 — Héberger sur Internet (OBLIGATOIRE)

### Option A — Netlify (le plus simple, gratuit)
1. Allez sur https://netlify.com → Créez un compte gratuit
2. Glissez-déposez votre dossier directement dans la page Netlify
3. Votre app est en ligne en 30 secondes avec une URL https://xxx.netlify.app

### Option B — GitHub Pages (gratuit)
1. Créez un compte sur https://github.com
2. Créez un nouveau dépôt public
3. Uploadez tous vos fichiers
4. Allez dans Settings → Pages → Source : main branch
5. URL : https://votre-nom.github.io/nom-du-depot

---

## 📱 Étape 2 — Installer sur smartphone

### Android (Chrome) :
1. Ouvrez l'URL de votre app dans Chrome
2. Attendez 3 secondes → un bandeau "Installer MonStock Pro" apparaît
3. Cliquez "Installer" → l'icône apparaît sur votre écran d'accueil

### iPhone (Safari) :
1. Ouvrez l'URL dans Safari (pas Chrome !)
2. Appuyez sur le bouton Partager (carré avec flèche)
3. Choisissez "Sur l'écran d'accueil"
4. Confirmez → l'icône apparaît

---

## 🤖 Étape 3 — Activer l'IA Claude (optionnel)

Le chat IA utilise l'API Claude d'Anthropic pour des réponses intelligentes.
Sans clé API, l'application fonctionne avec des réponses locales automatiques.

Pour activer la vraie IA :
1. Créez un compte sur https://console.anthropic.com
2. Créez une clé API
3. ⚠️ IMPORTANT : Ne mettez jamais votre clé API directement dans le HTML
   (risque de vol). Utilisez un serveur proxy ou Netlify Functions.

---

## ✅ Vérification que tout fonctionne

- [ ] L'app s'ouvre correctement dans le navigateur
- [ ] Les données se sauvegardent (ajoutez un produit, rechargez la page)
- [ ] Le mode hors-ligne fonctionne (coupez internet, rechargez)
- [ ] L'icône est installée sur l'écran d'accueil

---

© 2026 MonStock Pro · Fait avec ❤️ pour la Côte d'Ivoire
