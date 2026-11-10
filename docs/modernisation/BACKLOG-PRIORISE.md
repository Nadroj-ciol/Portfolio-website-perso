# BACKLOG DE TRANSFORMATION PRIORISÉ

**Projet** : Modernisation du Portfolio de NDE Jordan Loïc  
**Méthodologie** : Classement strict par niveau d'impact et de dépendance (P0 → P1 → P2 → P3).

---

## 1. TÂCHES PRIORITÉ P0 — CRITIQUES (BLOQUANTS DE PRODUCTION)

### `TASK-P0-01` : Sécurisation de la vulnérabilité DOM-based XSS sur le dépôt de brief
- **Domaine** : Sécurité Applicative
- **Problème identifié** : L'injection de code HTML/JS est possible via le nom d'un fichier déposé dans la zone de glisser-déposer.
- **Preuve & Fichiers** : [`js/main.js` L1346 & L1367](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/js/main.js#L1346) : `fileDropText.innerHTML = '📄 <strong>' + file.name + '</strong>...'`
- **Impact utilisateur** : Risque d'exécution de script malveillant lors de la manipulation du formulaire de contact.
- **Priorité** : **P0 (Critique)**
- **Solution recommandée** : Remplacer l'usage de `innerHTML` par `textContent` ou `createTextNode` pour neutraliser tout payload.
- **Dépendances** : Aucune.
- **Risque de régression** : Très faible (simple modification de DOM manipulation).
- **Complexité estimée** : Très faible (15 minutes).
- **Critères d'acceptation** : Déposer un fichier nommé `<img src=x onerror=alert(1)>.pdf` affiche la chaîne textuelle brute sans exécuter d'alerte.
- **Méthode de vérification** : Test unitaire et injection manuelle dans l'inspecteur du navigateur.

---

### `TASK-P0-02` : Élimination du persona fictif « Dr. E. Ndoumbe » et rétablissement de la vérité
- **Domaine** : Éthique & Crédibilité Professionnelle
- **Problème identifié** : Citation inventée attribuée à un faux médecin pour crédibiliser le projet Sister Schola.
- **Preuve & Fichiers** : [`js/main.js` L1029](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/js/main.js#L1029) : `quoteAuthor: "— Dr. E. Ndoumbe, Consultant Médical"`.
- **Impact utilisateur** : Perte de confiance immédiate d'un recruteur technique senior découvrant un faux avis.
- **Priorité** : **P0 (Critique)**
- **Solution recommandée** : Supprimer la référence au Dr. Ndoumbe. Remplacer par un retour d'expérience de M. ABDOU (IPN MINESEC) ou une fiche d'impact technique sans citation fictive.
- **Dépendances** : Arbitrage D1 du propriétaire.
- **Risque de régression** : Nul.
- **Complexité estimée** : Très faible (15 minutes).
- **Critères d'acceptation** : Zéro occurrence de « Dr. E. Ndoumbe » dans toute la base de code ; conformité 100% avec les 6 référents réels.
- **Méthode de vérification** : Recherche textuelle globale `grep -rn "Ndoumbe" .`.

---

### `TASK-P0-03` : Compression batch WebP des images lourdes (177 Mo → < 8 Mo)
- **Domaine** : Performance Web & Core Web Vitals
- **Problème identifié** : Temps de chargement prohibitif sur mobile (> 45s en 3G) dû à des images PNG/JPEG brutes pesant jusqu'à 23 Mo.
- **Preuve & Fichiers** : Répertoire [`rsc/img/`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/rsc/img/) pesant 177 Mo. 15 fichiers > 2 Mo (`flyer soutenance maelou.png` 14 Mo, `Mockup logo candace...` 11 Mo, etc.).
- **Impact utilisateur** : Taux d'abandon mobile supérieur à 85% au Cameroun et à l'international.
- **Priorité** : **P0 (Critique)**
- **Solution recommandée** : Convertir toutes les images en format moderne WebP (qualité 80-85%) avec redimensionnement max à 1920px de largeur. Mettre à jour les chemins dans le HTML et JS.
- **Dépendances** : Aucune.
- **Risque de régression** : Faible (vérifier la correspondance exacte des extensions dans les chemins du code).
- **Complexité estimée** : Moyenne (1 heure d'exécution et de contrôle visuel).
- **Critères d'acceptation** : Poids total du répertoire `rsc/img/` < 8 Mo ; temps de chargement de l'accueil < 2,5s sur réseau mobile émulé.
- **Méthode de vérification** : Mesure Lighthouse Performance (> 90/100) et commande système `du -sh rsc/img/`.

---

### `TASK-P0-04` : Résolution de la rupture du formulaire de contact (traitement des briefs)
- **Domaine** : Conversion Commerciale
- **Problème identifié** : Le client dépose son brief (PDF/ZIP), mais lors du clic sur Envoyer, le fichier est ignoré et seule une chaîne de texte s'ouvre sur WhatsApp.
- **Preuve & Fichiers** : [`contact.html` L382-399](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/contact.html#L382-L399).
- **Impact utilisateur** : Frustration du prospect dont le travail de dépôt de fichier est perdu, perte d'opportunités commerciales.
- **Priorité** : **P0 (Critique)**
- **Solution recommandée** : Interfacer le formulaire avec un service d'envoi multipart (ex: Formspree, EmailJS ou un script serverless sécurisé) permettant de recevoir le fichier joint et les coordonnées, avec notification WhatsApp secondaire.
- **Dépendances** : Définition du récepteur mail (`ndejordanloic@outlook.fr`).
- **Risque de régression** : Faible.
- **Complexité estimée** : Moyenne (1 à 2 heures).
- **Critères d'acceptation** : La soumission transmet le nom, l'email, le message ET le fichier brief joint dans la boîte mail de Jordan.
- **Méthode de vérification** : Test de soumission avec fichier test PDF et vérification de la réception effective.

---

## 2. TÂCHES PRIORITÉ P1 — IMPORTANTES (IMPACT SIGNIFICATIF)

### `TASK-P1-01` : Correction du contraste des couleurs selon la norme WCAG 2.2 AA
- **Domaine** : Accessibilité Numérique (a11y)
- **Problème** : L'orange `#FD6F00` posé sur fond blanc présente un ratio de 2.82:1 (exigence minimale : 4.5:1 pour le texte normal).
- **Preuve & Fichiers** : [`css/style.css`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/css/style.css) (variables de couleur).
- **Solution** : Ajuster la variable d'accentuation sur fond clair vers une nuance plus foncée (`#C45500`, ratio 4.6:1), tout en conservant `#FD6F00` sur fond sombre `#111111` où le contraste est excellent (8.4:1).
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Faible.
- **Critères d'acceptation** : Score Lighthouse Accessibility > 95/100, tous les textes orange lisibles sur fond blanc sans fatigue visuelle.

---

### `TASK-P1-02` : Implémentation des états de focus clavier (`:focus-visible`)
- **Domaine** : Accessibilité Numérique (a11y)
- **Problème** : Aucune règle `:focus-visible` n'est définie dans le CSS, rendant la navigation au clavier invisible.
- **Preuve & Fichiers** : [`css/style.css`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/css/style.css) (0 occurrence).
- **Solution** : Définir une règle globale `:focus-visible` avec anneau orange (`outline: 2px solid var(--figma-orange); outline-offset: 3px;`) sur tous les liens, boutons et champs.
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : Tabuler sur la page affiche un anneau de focus net et contrasté sur chaque élément interactif.

---

### `TASK-P1-03` : Création des fichiers indispensables racine (`favicon.ico`, `robots.txt`, `sitemap.xml`)
- **Domaine** : SEO & Infrastructure
- **Problème** : Erreurs 404 dans la console navigateur sur le favicon ; absence de directives pour les moteurs de recherche.
- **Preuve & Fichiers** : Racine du projet (fichiers absents).
- **Solution** : Générer un `favicon.ico` élégant basé sur le monogramme `NJ`, écrire `robots.txt` autorisant l'exploration et générer `sitemap.xml` répertoriant les 7 pages.
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : Code HTTP 200 sur `/robots.txt`, `/sitemap.xml` et affichage du favicon dans l'onglet navigateur.

---

### `TASK-P1-04` : Intégration des balises Open Graph et Twitter Cards
- **Domaine** : SEO & Marketing Social
- **Problème** : Aucun aperçu visuel (carte enrichie) ne s'affiche lors du partage d'un lien sur WhatsApp, LinkedIn, Slack ou X.
- **Preuve & Fichiers** : Bloc `<head>` des 7 fichiers HTML (0 balise `og:*` ou `twitter:*`).
- **Solution** : Insérer les balises sémantiques complètes (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`) avec une image de bannière au format 1200x630px.
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : Test réussi sur LinkedIn Post Inspector et aperçu validé sur WhatsApp Web.

---

### `TASK-P1-05` : Mise en valeur du Japonais et des Mathématiques Fondamentales
- **Domaine** : Contenu & Différenciation de Marque
- **Problème** : Deux forces distinctives majeures de Jordan inscrites sur son CV officiel sont omises du site web.
- **Preuve & Fichiers** : [`doc/CV_NDE_Jordan_Loic.pdf`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/doc/CV_NDE_Jordan_Loic.pdf) vs [`index.html`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/index.html).
- **Solution** : Intégrer la pratique du Japonais dans les langues et valoriser les 2 années de Mathématiques fondamentales (Université de Yaoundé I) comme le pilier de sa rigueur logique.
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : Présence visible dans la bio d'accueil, la timeline et les compétences.

---

### `TASK-P1-06` : Remplacement du CTA restrictif « Me recruter »
- **Domaine** : UX Writing & Conversion
- **Problème** : Le libellé « Me recruter » oriente le visiteur uniquement vers le salariat et freine les opportunités de prestations B2B.
- **Preuve & Fichiers** : [`index.html` L40 & L1118](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/index.html#L40).
- **Solution** : Remplacer par « Lancer un projet » ou « Demander un devis » pour capter les deux publics (entreprises et recruteurs).
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : Libellé modernisé et cohérent sur toutes les pages.

---

### `TASK-P1-07` : Repositionnement des filtres du carrousel d'accueil selon `maq5.png`
- **Domaine** : Design-to-Code & Ergonomie
- **Problème** : Les filtres sont actuellement placés au-dessus du carrousel, créant une inversion par rapport à la maquette Figma originale.
- **Preuve & Fichiers** : [`doc/maq5.png`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/doc/maq5.png) vs [`index.html` L400-440](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/index.html#L400-L440).
- **Solution** : Repositionner la barre de filtres sous les cartes de projets, avec les flèches de navigation associées.
- **Priorité** : **P1** | **Complexité** : Moyenne | **Risque** : Faible.
- **Critères d'acceptation** : Conformité visuelle 1:1 avec la capture `maq5.png`.

---

### `TASK-P1-08` : Prise en charge des préférences de mouvement (`prefers-reduced-motion`)
- **Domaine** : Accessibilité Sensorielle
- **Problème** : Les animations défilantes continues tournent en boucle sans possibilité d'arrêt pour les personnes sensibles.
- **Preuve & Fichiers** : [`css/style.css`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/css/style.css).
- **Solution** : Ajouter `@media (prefers-reduced-motion: reduce)` figeant les défilements continus automatiques.
- **Priorité** : **P1** | **Complexité** : Faible | **Risque** : Nul.
- **Critères d'acceptation** : L'activation de la préférence système sous Windows/macOS/Linux stoppe instantanément les animations automatiques.

---

## 3. TÂCHES PRIORITÉ P2 — AMÉLIORATIONS NÉCESSAIRES

- `TASK-P2-01` : Factorisation du header et du footer partagés via composant JS réutilisable (élimine 7 duplications).
- `TASK-P2-02` : Nettoyage des 69 codes couleurs hexadécimaux et 220 espacements écrits en dur dans `css/style.css`.
- `TASK-P2-03` : Archivage ou purge des 41 images orphelines pesant plus de 45 Mo dans `rsc/img/`.
- `TASK-P2-04` : Correction du pléonasme « Discutons-en ensemble » vers « Discutons de votre projet ».
- `TASK-P2-05` : Remplacement des sphères plates par des ondes fluides 3D vectorielles sur `services.html` (`maq2.png`).
- `TASK-P2-06` : Ajout d'une gestion d'état vide / écran 404 propre sur identifiant de projet introuvable dans `projet-detail.html`.

---

## 4. TÂCHES PRIORITÉ P3 — FINITIONS & OPTIMISATIONS SECONDAIRES

- `TASK-P3-01` : Fournir en complément une version PDF linéarisée ATS-friendly du CV de Jordan.
- `TASK-P3-02` : Ajout d'un bouton d'invitation vers la communauté *LaboGraphie Dev*.
- `TASK-P3-03` : Intégration de *Vercel Web Analytics* (sans cookies, conforme RGPD/ANTIC).
- `TASK-P3-04` : Badge discret `[Illustration technique]` sur les 11 photos de banques Pexels pour les réseaux.
