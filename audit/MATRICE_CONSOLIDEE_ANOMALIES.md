# MATRICE CONSOLIDÉE DE TOUTES LES ANOMALIES DU PROJET (PHASES 1 À 12)

Ce document constitue la synthèse définitive et dédupliquée de l'intégralité des anomalies, défauts de conformité, risques de sécurité et axes d'amélioration identifiés sur le portfolio de **NDE Jordan Loïc**.

---

## 1. DÉFAUTS BLOQUANTS (PRIORITÉ P0 — INTERDICTION DE MISE EN PRODUCTION)

| ID | Domaine | Description de l'Anomalie | Fichier & Emplacement | Preuve Technique | Dépendances | Critère de Résolution / Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ANOM-01** | **Sécurité** | Vulnérabilité DOM-based XSS via l'affichage du nom de fichier déposé dans la zone de brief. | `js/main.js` L1346 & L1367 | `fileDropText.innerHTML = '📄 <strong>' + file.name + '</strong>...'` | Aucune | Remplacement strict par `textContent` ; test d'injection avec payload HTML inoffensif. |
| **ANOM-02** | **Crédibilité** | Citation et persona 100% fictifs (« Dr. E. Ndoumbe ») détruisant la confiance professionnelle sur Sister Schola. | `js/main.js` L1029 | `quoteAuthor: "— Dr. E. Ndoumbe, Consultant Médical"` (faux avis d'autorité médicale) | Arbitrage D1 | Remplacement par M. ABDOU (IPN MINESEC) ou retour réel ; zéro nom fictif dans le code. |
| **ANOM-03** | **Performance** | Poids colossal des ressources visuelles (177 Mo) bloquant le premier affichage sur mobile 3G/4G au Cameroun. | `rsc/img/` (15 fichiers pesant entre 2 Mo et 23 Mo l'unité) | Dossier `rsc/img/` pèse 177 Mo ; échec critique des Core Web Vitals (LCP > 8s). | Aucune | Conversion batch en WebP/AVIF avec redimensionnement max à 1920px ; poids total < 8 Mo. |
| **ANOM-04** | **Conversion** | Perte du cahier des charges / brief déposé par le prospect lors de la validation du formulaire de contact. | `contact.html` L395 | La fonction `handleContactSubmit` redirige vers l'API WhatsApp texte en ignorant le fichier joint. | Passerelle mail | Connexion du formulaire à un service de traitement de brief (Formspree/EmailJS) recevant le fichier. |

---

## 2. DÉFAUTS IMPORTANTS (PRIORITÉ P1 — PRÉREQUIS POUR LA CRÉDIBILITÉ & LE SEO)

| ID | Domaine | Description de l'Anomalie | Fichier & Emplacement | Preuve Technique | Dépendances | Critère de Résolution / Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ANOM-05** | **Accessibilité** | Contraste de l'orange d'accentuation insuffisant sur fond blanc en violation de WCAG 2.2 AA. | `css/style.css` (variables `--figma-orange`) | Ratio de contraste de `#FD6F00` sur `#FFFFFF` = 2.82:1 (exigence normative = 4.5:1). | `css/style.css` | Nuance assombrie vers `#C45500` (ratio 4.6:1) sur fond clair ; score a11y > 95. |
| **ANOM-06** | **Accessibilité** | Absence totale d'indicateurs de focus clavier visibles (`:focus-visible = 0`). | `css/style.css` | Scan CSS : 0 règle `:focus-visible` sur 4000 lignes de style. | `css/style.css` | Ajout d'un contour `:focus-visible` stylisé en orange sur tous les éléments interactifs. |
| **ANOM-07** | **SEO & Technique** | Absence des fichiers racine indispensables provoquant des erreurs 404 dans la console navigateur. | Racine du dépôt | Absence de `favicon.ico`, `robots.txt` et `sitemap.xml`. | Racine projet | Fichiers créés à la racine ; requêtes HTTP retournent un code 200 sans 404. |
| **ANOM-08** | **SEO & Social** | Absence des balises de partage social Open Graph et Twitter Cards sur les 7 pages HTML. | `<head>` des 7 pages HTML | 0 balise `<meta property="og:*">` et 0 balise `<meta name="twitter:*">`. | Bannière 1200x630 | Aperçu visuel enrichi validé sur WhatsApp, LinkedIn Post Inspector et Twitter Card Validator. |
| **ANOM-09** | **Recrutement** | Incompatibilité du CV PDF actuel avec les parseurs automatiques ATS de recrutement international. | `rsc/CV_NDE_Jordan_Loic.pdf` | Parsing `pypdf` : texte multi-colonnes enchevêtré (`INFOGRAPHIEDATABASE...`), page 2 vide. | Export PDF | Fournir une option de téléchargement du CV linéarisé standard pour les ATS. |
| **ANOM-10** | **UX Writing** | Libellé réducteur "Me recruter" sur l'accueil fermant la porte aux clients B2B et missions freelance. | `index.html` L40 & L1118 | Bouton avec libellé salarial restrictif. | `index.html`, `js/main.js` | Remplacement par « Lancer un projet » ou « Demander un devis ». |
| **ANOM-11** | **Contenu & Bio** | Omission sur le site de la compétence rare en Japonais et du cursus en Mathématiques Fondamentales (Univ. Yaoundé I). | `index.html`, `js/main.js` | Mentionnées formellement sur le CV officiel mais absentes des pages web. | `doc/CV_NDE...` | Intégration du Japonais et du parcours Mathématiques dans la bio et les compétences. |
| **ANOM-12** | **Architecture** | Duplication intégrale du header et du footer sur les 7 fichiers HTML sans composant partagé. | 7 fichiers HTML | Code dupliqué créant un risque de désynchronisation lors des mises à jour de liens. | Aucune | Factorisation du header et footer via un composant JavaScript réutilisable. |
| **ANOM-13** | **Design-to-Code** | Inversion structurelle des filtres du portfolio sur `index.html` par rapport à la maquette Figma 5. | `index.html` L401-440 | Filtres placés au-dessus du carrousel alors que `maq5.png` les place en dessous. | `index.html` | Repositionnement des filtres sous les cartes du carrousel conformément à `maq5.png`. |
| **ANOM-14** | **Motion & A11y** | Absence de gestion de la préférence utilisateur `@media (prefers-reduced-motion)`. | `css/style.css` | Les défilements continus automatiques tournent en boucle sans possibilité d'arrêt OS. | `css/style.css` | Ajout de la règle CSS arrêtant les animations continues si l'option OS est active. |

---

## 3. AMÉLIORATIONS FACULTATIVES (PRIORITÉ P2 — FINITIONS & PERFECTIONNEMENT)

| ID | Domaine | Description de l'Amélioration | Fichier & Emplacement | Preuve Technique | Dépendances | Critère de Résolution / Validation |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ANOM-15** | **Design System** | Présence de 69 codes couleurs hexadécimaux et 12 nuances sombres écrits en dur dans le CSS. | `css/style.css` | Déclarations de styles bypassing les variables CSS définies dans `:root`. | `css/style.css` | Remplacement de toutes les couleurs brutes par `var(--figma-orange)`, `var(--figma-black)`, etc. |
| **ANOM-16** | **Design System** | 220 déclarations de marges, paddings et gaps écrites en dur sans utiliser les tokens d'espacement. | `css/style.css` | 0 déclaration utilisant `var(--space-*)`. | `css/style.css` | Standardisation progressive des espacements sur la grille modulaire de 8px. |
| **ANOM-17** | **Nettoyage** | 41 fichiers images orphelins pesant 45 Mo inutilisés dans le projet. | `rsc/img/` | Fichiers comme `ChatGPT Image...`, `avatar_brinda.jpg`, `avatar_yvana.jpg`. | Arbitrage D4 | Suppression ou archivage hors du dossier web public pour alléger le dépôt Git. |
| **ANOM-18** | **Design QA** | Ondes fluides 3D de la carte services représentées par de simples sphères plates. | `services.html` L85, `css/style.css` | Simplification géométrique par rapport aux tracés vectoriels fluides de `maq2.png`. | SVG vectoriel | Remplacement par un tracé SVG d'ondes 3D élégant conforme à la maquette 2. |
| **ANOM-19** | **UX Writing** | Pléonasme syntaxique récurrent issu de traductions automatiques : « Discutons-en ensemble ». | `index.html` L950, `js/main.js` L210 | Redondance stylistique entre « en » et « ensemble ». | Dictionnaire i18n | Correction en « Discutons de votre projet ». |
| **ANOM-20** | **Architecture** | Absence de gabarit d'erreur 404 / empty state lors de l'accès à un projet ou article inexistant. | `js/main.js` L1155 & L1284 | Un identifiant inconnu (`?id=invalide`) affiche silencieusement AgroFlow sans avertissement. | `js/main.js` | Affichage d'un message élégant « Projet non trouvé » avec bouton de retour au catalogue. |

---

## 4. QUESTIONS NÉCESSITANT L'ARBITRAGE DU PROPRIÉTAIRE

Les 5 arbitrages obligatoires préalables à l'implémentation sont :
1. **D1 (Dr. Ndoumbe)** : Remplacer par M. ABDOU (IPN MINESEC) sur Sister Schola (Option A recommandée).
2. **D2 (Métriques)** : Reformuler les pourcentages (-75%, -60%, 1200 colis) en bénéfices qualitatifs réels (Option A recommandée).
3. **D3 (Photos Pexels)** : Remplacer par vraies photos ou apposer la mention `[Illustration]` (Option A ou B).
4. **D4 (Images orphelines)** : Supprimer les fichiers inutilisés `brinda.jpg`, `yvana.jpg`, `ChatGPT Image...` (Option A recommandée).
5. **D5 (Japonais & Maths)** : Intégrer la pratique du Japonais et le bagage en Mathématiques dans la bio (Option A recommandée).
