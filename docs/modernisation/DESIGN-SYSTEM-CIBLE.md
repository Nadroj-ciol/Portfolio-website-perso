# DESIGN SYSTEM CIBLE — JCREA NÉO-BRUTALISTE PREMIUM

**Projet** : Spécifications UI & Design Tokens du Portfolio de NDE Jordan Loïc  
**Source d'inspiration** : Template Figma JCREA 5+ (`doc/maq*.png`) enrichi pour les standards d'ingénierie logicielle.

---

## 1. DESIGN TOKENS EXPLOITABLES (SYNTAXE CSS VARIABLES)

```css
:root {
  /* =========================================================================
     1. PALETTE CHROMATIQUE SÉMANTIQUE
     ========================================================================= */
  /* Couleurs Fondamentales */
  --figma-orange: #FD6F00;            /* Teinte principale de marque Figma */
  --figma-orange-hover: #E06200;      /* État de survol sur fond sombre */
  --figma-orange-accessible: #C45500; /* Variante contrastée WCAG 2.2 AA sur fond blanc (4.6:1) */
  --figma-orange-light: rgba(253, 111, 0, 0.08); /* Fond subtil de badge et sélection */
  
  /* Nuances Sombres (Dark Surface Néo-Brutaliste) */
  --figma-black: #111111;             /* Noir d'encre principal */
  --figma-dark-card: #1E1E1E;         /* Fond des cartes sombres */
  --figma-dark-card-hover: #262626;   /* Survol des cartes sombres */
  --figma-dark-border: #333333;       /* Filet de contour des cartes sombres */
  
  /* Nuances Neutres (Fond et Texte) */
  --color-bg-light: #FBFBFB;          /* Fond général des pages */
  --color-text-main: #1A1A1A;         /* Texte courant sur fond clair */
  --color-text-muted: #666666;        /* Texte secondaire / métadonnées */
  --color-text-white: #FFFFFF;        /* Texte sur fond sombre */
  --color-text-white-muted: #A0A0A0;  /* Texte secondaire sur carte sombre */
  --color-border-light: #E5E5E5;      /* Filets légers de séparation */

  /* =========================================================================
     2. ÉCHELLE TYPOGRAPHIQUE & POLICES
     ========================================================================= */
  --font-main: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Tailles de Texte Modulaires */
  --font-size-xs: 0.75rem;            /* 12px : Micro-badges, notes de bas */
  --font-size-sm: 0.875rem;           /* 14px : Métadonnées, filtres, tags */
  --font-size-base: 1rem;             /* 16px : Corps de texte courant */
  --font-size-md: 1.125rem;           /* 18px : Chapô, sous-titres de cartes */
  --font-size-lg: 1.35rem;            /* 21px : Titres de cartes et sections */
  --font-size-xl: 1.75rem;            /* 28px : Titres secondaires H2 */
  --font-size-2xl: 2.25rem;           /* 36px : Titres de page */
  --font-size-3xl: 3.25rem;           /* 52px : Hero titre d'accueil */

  /* Poids de Graisse */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  /* =========================================================================
     3. ÉCHELLE D'ESPACEMENT MODULAIRE (GRILLE DE 8px)
     ========================================================================= */
  --space-2xs: 0.25rem;               /* 4px */
  --space-xs: 0.5rem;                 /* 8px */
  --space-sm: 0.75rem;                /* 12px */
  --space-md: 1rem;                   /* 16px */
  --space-lg: 1.5rem;                 /* 24px */
  --space-xl: 2rem;                   /* 32px */
  --space-2xl: 3rem;                  /* 48px */
  --space-3xl: 4.5rem;                /* 72px */

  /* =========================================================================
     4. RAYONS DE COURBURE & CONTOURS
     ========================================================================= */
  --radius-sm: 8px;                   /* Badges, tags, boutons secondaires */
  --radius-md: 16px;                  /* Cartes de contenu, formulaires */
  --radius-lg: 24px;                  /* Cartes sombres majeures */
  --radius-pill: 9999px;              /* Pilule de navigation, CTA ovales */

  /* =========================================================================
     5. ÉLÉVATION & OMBRES PORTÉES
     ========================================================================= */
  --shadow-subtle: 0 4px 12px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 10px 30px rgba(0, 0, 0, 0.06);
  --shadow-nav: 0 10px 40px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 16px 36px rgba(253, 111, 0, 0.16);

  /* =========================================================================
     6. TRANSITIONS & TIMINGS
     ========================================================================= */
  --transition-fast: 0.18s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 2. RÈGLES DES COMPOSANTS MAJEURS

### 2.1 Navigation Flottante (`.nav-pill`)
- **Structure** : Conteneur centré flottant avec `border-radius: var(--radius-pill)`, fond translucide `rgba(255, 255, 255, 0.88)` et `backdrop-filter: blur(12px)`.
- **Lien Actif** : Pastille de fond noir `--figma-black` avec texte blanc pur, ou accent orange `--figma-orange` pour le contact.
- **États Interactifs** :
  - `:hover` : Transition d'opacité douce et légère translation vers le haut (-1px).
  - `:focus-visible` : Anneau de contour `2px solid var(--figma-orange)` avec `outline-offset: 3px`.

### 2.2 Bouton Call-to-Action Néo-Brutaliste (`.btn-primary`)
- **Fond** : `--figma-orange`.
- **Texte** : Blanc `#FFFFFF` (avec gras 600).
- **Flèche intégrée** : Glyphe ou SVG de flèche oblique `↗` avec micro-rotation de 45° au survol.
- **États** :
  - `:hover` : Fond `--figma-orange-hover`, translation `translateY(-2px)`.
  - `:active` : Translation `translateY(1px)` avec réduction d'échelle (0.98) pour feedback physique.
  - `:disabled` : Fond `#CCCCCC`, curseur `not-allowed`, zéro animation.

### 2.3 Cartes de Projets (`.portfolio-card`)
- **Fond** : `--figma-dark-card` (`#1E1E1E`).
- **Bordure** : Filet ultra-fin `1px solid var(--figma-dark-border)`.
- **Disposition interne** :
  1. Image de couverture au ratio 16:10 avec zoom subtil au hover.
  2. Badge de catégorie en pilule (`.skill-pill`).
  3. Titre en blanc pur `--color-text-white`.
  4. Descriptif sobre en `--color-text-white-muted`.
  5. Bouton rond avec flèche `↗` en bas à droite.

### 2.4 Ruban Incliné de Compétences (`.ribbon-marquee`)
- **Fond** : `--figma-orange`.
- **Angle** : Rotation rigoureuse de `-3deg` s'étendant sur 100% de la largeur d'écran.
- **Contenu** : Texte en lettres capitales blanches séparées par des étoiles néo-brutalistes (✦).
- **Animation** : Défilement infini fluide avec mise en pause au survol.

---

## 3. ADAPTABILITÉ RESPONSIVE & ACCESSIBILITÉ SENSORIELLE

### 3.1 Points d'Arrêt (Breakpoints)
```css
/* Mobile First / Breakpoints Standardisés */
/* Petit Mobile : < 480px */
/* Tablette Portrait : 481px à 768px */
/* Tablette Paysage / Petit Écran : 769px à 1024px */
/* Desktop Standard : 1025px à 1280px */
/* Grand Écran : > 1281px */
```

### 3.2 Accessibilité Sensorielle (`prefers-reduced-motion`)
```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  .showcase-track, .marquee-content {
    animation: none !important;
    transform: none !important;
  }
}
```
