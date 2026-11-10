# ARCHITECTURE CIBLE DU PORTFOLIO

**Projet** : Modernisation Technique du Portfolio de NDE Jordan Loïc  
**Principes Directeurs** : Souveraineté logicielle, zéros dépendance superflue, haute performance, maintenabilité décennale.

---

## 1. JUSTIFICATION DU MAINTIEN DE LA STACK VANILLA

L'audit approfondi a formellement écarté la migration vers un framework lourd (Next.js, Nuxt, Astro ou React SPA) pour les raisons techniques démontrées suivantes :
1. **Zéro Dette de Dépendance (Supply Chain Security 0%)** : L'absence de `node_modules` protège le portfolio contre les failles de sécurité récurrentes de packages npm et élimine les pannes de build dues aux mises à jour de versions.
2. **Performance Native Maximale** : Le navigateur analyse du HTML5 et du CSS3 purs sans aucun surcoût de virtual DOM ou de réhydratation JavaScript.
3. **Hébergement & Portabilité Absolue** : Le projet peut être ouvert directement depuis n'importe quel système de fichiers local (`file://`) ou hébergé gratuitement sur Vercel, Netlify ou GitHub Pages avec une disponibilité de 99,99%.
4. **Adéquation avec le Métier** : Un portfolio d'ingénieur logiciel doit prouver la maîtrise des fondamentaux du web avant les surcouches d'abstraction.

---

## 2. ARBORESCENCE CIBLE DU DÉPÔT

```text
Portfolio-website-perso/
├── index.html                  # Accueil & Vitrine Principale (Hero, Timeline, Carrousel, Avis, CTA)
├── services.html               # Catalogue des 6 Expertises & Forfaits d'Intervention
├── portfolio.html              # Hub Complet des Projets & Galerie Développée
├── blog.html                   # Espace d'Articles & Retours d'Expérience Techniques
├── contact.html                # Formulaire de Devis & Cadrage de Brief
├── projet-detail.html          # Gabarit Dynamique d'Étude de Cas (?id=slug)
├── article-detail.html         # Gabarit Dynamique d'Article Technique (?id=slug)
│
├── favicon.ico                 # Favicon Officiel Racine (Monogramme NJ)
├── robots.txt                  # Directives d'Indexation Moteurs de Recherche
├── sitemap.xml                 # Cartographie XML des URLs pour le Référencement
│
├── css/
│   ├── style.css               # Feuille de Style Maîtresse (Tokens, Reset, Layout, Composants)
│   └── print.css               # Feuille de Style d'Impression pour Fiches & CV
│
├── js/
│   ├── main.js                 # Point d'Entrée & Initialisation Globale
│   ├── modules/                # Architecture Modulaire ES6 (Séparation des Responsabilités)
│   │   ├── navigation.js       # Dynamic Navbar, Mobile Toggle & ScrollSpy
│   │   ├── carousel.js         # Carrousel Tactile, Filtres & Auto-Scroll Marquee
│   │   ├── search.js           # Barre de Recherche Instantanée & Autocomplétion
│   │   ├── modal.js            # Lightbox & Agrandissement d'Image Plein Écran
│   │   ├── form.js             # Gestion Sécurisée du Formulaire & Dépôt de Brief
│   │   └── i18n.js             # Moteur de Traduction Dynamique (Dictionnaire FR/EN)
│   └── data/
│       ├── projects.js         # Données Structurées des Projets & Études de Cas
│       └── articles.js         # Données Structurées des Articles de Veille
│
├── rsc/
│   ├── CV_NDE_Jordan_Loic.pdf  # CV Graphique Original
│   ├── CV_NDE_Jordan_ATS.pdf   # Version Linéarisée Conforme ATS
│   └── img/
│       ├── webp/               # Images Optimisées WebP (< 300 Ko/unité)
│       └── raw/                # Originaux Archivés (hors diffusion web)
│
├── doc/                        # Maquettes, Transcriptions & Cahiers des Charges
└── docs/modernisation/         # Référentiel Documentaire de la Transformation
```

---

## 3. SÉPARATION DES RESPONSABILITÉS & MODULARITÉ DU CODE

### 3.1 Modularisation du JavaScript
Actuellement concentré dans un fichier monolithique de 1 440 lignes (`js/main.js`), le code sera réorganisé selon des responsabilités strictes :
- **`navigation.js`** : Gère la détection de section active au scroll (`IntersectionObserver`), la classe `.active` sur la pilule de navigation et l'ouverture du menu tiroir mobile.
- **`carousel.js`** : Gère le défilement horizontal par pas de carte (`scrollBy`), les boutons flèches et la pause au survol de la galerie défilante.
- **`form.js`** : Assure l'assainissement strict des entrées utilisateur (`textContent`), le calcul du poids de la pièce jointe et la soumission sécurisée sans perte de livrable.
- **`i18n.js`** : Isole le dictionnaire de traduction pour permettre d'ajouter de nouvelles langues (ex: Japonais) sans modifier la logique applicative.

### 3.2 Gestion Centralisée des Données
Les données des études de cas et des articles de blog sont extraites de la logique d'affichage et stockées dans des structures de données typées :
- `data/projects.js` exporte l'objet `projectsData` où chaque projet est modélisé par :
  ```javascript
  {
    id: "agroflow",
    type: "commercial", // commercial | academique | collaboratif
    title: "AgroFlow SaaS ERP",
    category: "dev",
    lead: "Description factuelle et vérifiable...",
    role: "Architecte & Développeur Full-Stack",
    stack: ["Node.js", "PostgreSQL", "Docker", "REST API"],
    metrics: ["Synchronisation bidirectionnelle offline", "Suivi multi-parcelles"],
    liveUrl: "https://agroflowsaas.vercel.app",
    githubUrl: "https://github.com/Nadroj-ciol/agroflow",
    testimonial: { author: "Chanceline", role: "EGESOL SARL", text: "..." }
  }
  ```

---

## 4. GESTION DES ASSETS & STRATÉGIE DE CACHE

- **Compression d'images** : Toutes les images diffusées dans le DOM sont converties au format WebP. Le dossier `rsc/img/` est allégé de 177 Mo à moins de 8 Mo.
- **Attributs de chargement** :
  - `loading="lazy"` et `decoding="async"` systématiques sur toutes les images sous la ligne de flottaison.
  - Seule l'image du hero et le logo portent `loading="eager"` avec `fetchpriority="high"` pour optimiser le LCP (Largest Contentful Paint).
- **Gestion des polices** : Police Poppins appelée avec `display=swap` sur Google Fonts pour éviter tout blocage d'affichage textuel (*Flash of Invisible Text*).

---

## 5. GESTION DES ERREURS & FALLBACKS

- **Gestion des paramètres d'URL inconnus** :
  - Si un internaute saisit `projet-detail.html?id=introuvable`, le script affiche désormais un écran d'état vide gracieux :
    - Titre : *« Projet non répertorié »*.
    - Description : *« Le projet demandé n'existe pas ou a été archivé. »*.
    - Bouton d'action : *« Retourner au catalogue des réalisations »* (vers `portfolio.html`).
- **Secours de messagerie** :
  - Si l'ouverture du lien WhatsApp échoue ou est bloquée sur le terminal du visiteur, un lien de repli direct vers l'adresse mail `ndejordanloic@outlook.fr` est toujours disponible en un clic.
