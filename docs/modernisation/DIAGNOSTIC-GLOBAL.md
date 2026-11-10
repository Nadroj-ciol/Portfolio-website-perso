# DIAGNOSTIC GLOBAL — ÉTAT DES LIEUX POST-AUDIT DU PORTFOLIO

**Auteur** : Équipe Senior d'Ingénierie & Design  
**Projet** : Portfolio Professionnel de NDE Jordan Loïc  
**Dépôt** : `https://github.com/Nadroj-ciol/Portfolio-website-perso`  
**Date d'évaluation** : Novembre 2026  
**Référence des audits** : Synthèse consolidée des 12 phases d'audit technique, UX, SEO, sécurité et éditorial.

---

## 1. SYNTHÈSE ÉVALUATIVE PAR DOMAINE (SCORES SUR 100)

Chaque note repose sur des preuves concrètes extraites du code source, des maquettes du dossier `doc/` et des tests exécutés dans le bac à sable.

| Domaine Évalué | Score /100 | Synthèse du Diagnostic & Justifications |
| :--- | :---: | :--- |
| **1. État architectural actuel** | **82 / 100** | Découpage multi-pages pertinent (5 pages + 2 gabarits dynamiques). Routage par paramètres d'URL propre. Duplication du header/footer sur 7 fichiers sans composant partagé. |
| **2. Qualité et cohérence du code** | **70 / 100** | Code Vanilla JavaScript natif sans dette de framework npm. Présence de fonctions redondantes (filtrage infographie dupliqué) et logique de fallback silencieuse. |
| **3. État du design system** | **68 / 100** | Tokens définis dans `:root`, mais 69 couleurs hexadécimales et 220 espacements écrits en dur dans `css/style.css`. 0 règle `:focus-visible`, 0 état `:active`. |
| **4. Qualité UI/UX** | **75 / 100** | Identité visuelle sombre et percutante (Figma JCREA 5+). Micro-animations réussies. Frictions majeures : perte du fichier brief dans le formulaire, filtres inversés sur l'accueil. |
| **5. Qualité rédactionnelle (UX Writing)** | **64 / 100** | Vocabulaire technique riche mais pollué par des clichés marketing d'IA (*« cutting-edge »*, *« de pointe »*), un pléonasme (*« Discutons-en ensemble »*) et un CTA réducteur (*« Me recruter »*). |
| **6. Conformité aux maquettes** | **88 / 100** | Palette `#FD6F00`/`#111111` respectée, ruban incliné -3° conforme à `maq4.png`, cartes dark fidèles. Écarts : position des filtres (au-dessus au lieu d'en-dessous) et ondes 3D simplifiées. |
| **7. Contenu & Projets présentés** | **65 / 100** | Réalisations réelles remarquables (AgroFlow, Sister Schola, Candace, Petit Colis). Faux persona d'autorité (« Dr. E. Ndoumbe ») et métriques non sourcées (-75%, -60%, 15+, 33+). |
| **8. Accessibilité (a11y)** | **62 / 100** | Balises sémantiques propres, modales accessibles. Contraste orange/blanc non conforme (2.82:1 contre 4.5:1), 0 focus clavier `:focus-visible`, pas de `prefers-reduced-motion`. |
| **9. Performance & Core Web Vitals** | **38 / 100** | Code CSS/JS très léger (< 200 Ko), mais dossier d'images gigantesque de **177 Mo** avec fichiers bruts jusqu'à 23 Mo. Temps de chargement > 45s sur mobile 3G. |
| **10. SEO & Découvrabilité** | **35 / 100** | Balises `<title>` et `<meta description>` présentes. Absence totale de balises Open Graph, Twitter Cards, `robots.txt`, `sitemap.xml`, `<link rel="canonical">` et `favicon.ico`. |
| **11. Sécurité applicative** | **74 / 100** | Zéro clé API ou mot de passe exposé, HTTPS Vercel natif, 0 dépendance npm vulnérable. Faille DOM-XSS identifiée sur `file.name` via `innerHTML` dans `js/main.js`. |
| **12. Maintenabilité & DevOps** | **68 / 100** | Zéro dette npm, déploiement continu Vercel instantané. Absence de tests automatisés, pas de linter, duplication statique du header/footer sur 7 pages HTML. |
| **13. Expérience Mobile vs Desktop** | **66 / 100** | Layout responsive fluide de 360px à 1440px avec swipe tactile. Goulot d'étranglement du poids des images et blocage du popup WhatsApp sur navigateurs mobiles. |

---

## 2. DÉTAIL DES CONSTATS PAR DOMAINE

### 2.1 Architecture & Stack Technique
- **Stack actuelle** : HTML5 sémantique, CSS3 pur (unifié dans `css/style.css`), Vanilla JavaScript ES6 (dans `js/main.js`).
- **Forces** : Aucune dépendance `node_modules`, temps de compilation nul, portabilité universelle, hébergement statique gratuit et hautement disponible.
- **Faiblesses** : Duplication du code HTML partagé (en-tête et pied de page dupliqués sur 7 fichiers), absence de système de templating statique ou d'injection dynamique modulaire.

### 2.2 Qualité du Code JavaScript
- **Fichier unique `js/main.js` (1 440 lignes)** :
  - Centralise l'ensemble des comportements : ScrollSpy, carrousel, autocomplétion, modal lightbox, compteurs animés, dictionnaire bilingue, cas d'études et blog.
  - *Dette identifiée* : Deux fonctions de filtrage quasi identiques pour la galerie ([L709-745](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/js/main.js#L709-L745) et [L1310-1332](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/js/main.js#L1310-L1332)).
  - *Gestion d'erreurs d'URL* : L1155 (`const d = caseStudiesData[projectId] || caseStudiesData['agroflow']`) effectue un repli silencieux sur AgroFlow si un ID de projet inexistant est fourni, masquant l'erreur au lieu d'afficher un écran 404 dédié.

### 2.3 Design System & Cohérence Visuelle
- **Variables CSS** : Les tokens fondamentaux existent (`--figma-orange: #FD6F00`, `--figma-black: #111111`, etc.).
- **Dette CSS** : 69 occurrences de couleurs hexadécimales écrites en dur (ex: `#1a1a1a`, `#222222`, `#333333`, `#e0e0e0`) au lieu de s'adosser à une échelle sémantique unifiée.
- **Micro-interactions** : Le survol est très riche (56 règles `:hover`), mais les états d'accessibilité clavier (`:focus-visible`) et d'enfoncement (`:active`) sont totalement absents.

### 2.4 Expérience Utilisateur (UX) & Friction de Conversion
- **Le problème du formulaire de contact** : Sur [`contact.html`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/contact.html), l'utilisateur est encouragé à glisser son cahier des charges (brief PDF/ZIP jusqu'à 15 Mo). Le script affiche le fichier sélectionné avec succès, mais la fonction de soumission ne transmet que du texte brut à l'URL WhatsApp (`https://wa.me/...`). Le document déposé par le client est purement et simplement égaré.
- **Bouton d'action principal** : L'intitulé « Me recruter » oriente le visiteur vers un recrutement salarié exclusif et décourage les directeurs de PME qui souhaitent confier un projet forfaitaire.

### 2.5 Contenus & Vérité Métier
- **Atouts majeurs confirmés** : Les diplômes (BTS Siantou 2025, Licence IUT Douala 2026), les prix (Palme d'Or 3e national, Ateliers Google) et les applications en production (AgroFlow, Sister Schola, LaboGraphie) constituent des preuves de très haut niveau.
- **Pollutions détectées** :
  - Un faux médecin (« Dr. E. Ndoumbe ») inséré dans `js/main.js` L1029 au détriment de M. ABDOU (IPN de Mathématiques au MINESEC).
  - Des métriques chiffrées inventées (-75% de consolidation, -60% d'attente clinique, 1 200 colis/mois).
  - 11 photos de datacenters étrangers issues de banques Pexels présentées sans étiquette d'illustration.
  - Omission de la compétence linguistique en **Japonais** et du parcours universitaire en **Mathématiques Fondamentales** (Université de Yaoundé I).

### 2.6 Performance Web
- Le dossier `rsc/img/` pèse **177 Mo** en fichiers PNG et JPEG non compressés.
- Sur terminal mobile avec réseau 3G, la page d'accueil échoue à se charger en moins de 40 secondes, provoquant un abandon immédiat des recruteurs et clients.
- La conversion systématique au format WebP ramènera le volume global à **moins de 8 Mo** (-95%).
