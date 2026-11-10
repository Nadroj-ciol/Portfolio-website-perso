# STRATÉGIE UI/UX & PARCOURS UTILISATEURS CIBLES

**Projet** : Expérience Utilisateur et Optimisation des Conversions du Portfolio de NDE Jordan Loïc  
**Objectif Principal** : Transformer un visiteur anonyme (recruteur international, chef d'entreprise ou pair technique) en contact professionnel qualifié en moins de 90 secondes.

---

## 1. LES SIX PARCOURS UTILISATEURS PRIORITAIRES

---

### PARCOURS 1 : COMPRENDRE IMMÉDIATEMENT MON POSITIONNEMENT PROFESSIONNEL
- **Objectif Visiteur** : Identifier qui est Jordan, son métier exact, son niveau de diplôme, sa localisation et ce qui le distingue d'un développeur ordinaire en moins de 5 secondes.
- **Étapes du Parcours** :
  1. Arrivée sur la page d'accueil (`index.html`).
  2. Lecture du badge statut (*« Disponible pour projets & opportunités »*).
  3. Lecture du titre Hero (*« Technologue en Génie Logiciel »*).
  4. Visualisation du monogramme `NJ` et de la photo de profil professionnelle.
- **Points de Friction Identifiés** :
  - Surévaluation confuse avec l'intitulé *« Architecte Systèmes »* qui déconcerte les recruteurs face à un jeune diplômé 2026.
  - Slogans d'agence (*« solutions de pointe »*) qui masquent l'identité d'ingénieur individuel.
- **Comportements Attendus** : Le visiteur valide la pertinence du profil et poursuit sa lecture vers le bas ou clique sur le CV.
- **Améliorations Proposées** :
  - Titre principal net : **« Technologue en Génie Logiciel »** (Diplômé IUT de Douala & Siantou, certifié Google).
  - Sous-titre valorisant la double compétence : *« Conception d'architectures logicielles résilientes (ERP, Cloud, SQL) & Identités visuelles 3D. »*.
- **Critères de Validation** : Test de 5 secondes réussi : 100% des testeurs identifient son métier d'ingénieur logiciel et sa localisation à Yaoundé.

---

### PARCOURS 2 : DÉCOUVRIR MES COMPÉTENCES CONCRÈTES
- **Objectif Visiteur** : Vérifier que Jordan maîtrise la stack requise pour son besoin (ex: Node.js, SQL, Docker, C++, Arduino, Adobe Illustrator, Japonais).
- **Étapes du Parcours** :
  1. Défilement vers la section *Pourquoi Travailler Ensemble ?*.
  2. Examen des blocs de compétences et du ruban incliné néo-brutaliste.
  3. Lecture de la timeline des diplômes (IUT Douala, Siantou, Univ. Yaoundé I, Google).
- **Points de Friction Identifiés** :
  - Omission de la compétence linguistique en **Japonais** figurant pourtant sur le CV.
  - Omission du cursus en **Mathématiques Fondamentales** qui explique la rigueur algorithmique de Jordan.
- **Comportements Attendus** : Le visiteur constate que les compétences ne sont pas de simples logos décoratifs mais des savoir-faire adossés à des diplômes d'État.
- **Améliorations Proposées** :
  - Intégrer un badge *« Mathématiques Fondamentales (Univ. Yaoundé I) »*.
  - Intégrer la mention *« Langues : Français, Anglais, Japonais »*.
- **Critères de Validation** : Présence des preuves académiques directement reliées aux technologies citées.

---

### PARCOURS 3 : EXPLORER MES RÉALISATIONS (PORTFOLIO & DÉPLOIEMENTS)
- **Objectif Visiteur** : Juger sur pièces la qualité du code, l'ergonomie des interfaces et la viabilité des solutions livrées par Jordan.
- **Étapes du Parcours** :
  1. Consultation du carrousel de projets sur l'accueil ou clic sur l'onglet *Portfolio*.
  2. Filtrage par domaine (`dev`, `infographie`, `systemes`).
  3. Test des liens en direct sur Vercel (AgroFlow, Sister Schola, LaboGraphie).
  4. Clic sur *Voir l'étude de cas* pour comprendre la problématique et la solution.
- **Points de Friction Identifiés** :
  - Présence du faux persona « Dr. E. Ndoumbe » sur la fiche Sister Schola.
  - Inversion des filtres placés au-dessus du carrousel au lieu d'en-dessous (`maq5.png`).
  - Absence de liens directs vers les dépôts GitHub publics pour auditer le code source.
- **Comportements Attendus** : Le visiteur teste les plateformes en direct, constate leur rapidité et examine la rigueur de modélisation des données.
- **Améliorations Proposées** :
  - Remplacer le Dr. Ndoumbe par M. ABDOU ou un retour réel.
  - Ajouter un bouton `GitHub Code ↗` sur chaque projet disposant d'un dépôt public.
  - Placer les filtres sous le carrousel conformément à la maquette 5.
- **Critères de Validation** : Zéro lien brisé ; ouverture immédiate des plateformes Vercel sans erreur.

---

### PARCOURS 4 : COMPRENDRE LES SERVICES PROPOSÉS (PAGE SERVICES)
- **Objectif Visiteur** : Découvrir ce que Jordan peut concrètement prendre en charge et comment se déroule une collaboration.
- **Étapes du Parcours** :
  1. Clic sur l'onglet *Services* dans la navbar.
  2. Examen des 6 cartes d'expertise (Génie Logiciel, Réseaux, Maintenance, IA, Packaging 3D, Branding).
  3. Lecture du processus de travail en 4 étapes (*Cadrage, Conception, Dev, Livraison*).
  4. Consultation des formules d'intervention (*Mission ponctuelle, Clé en main, Régie*).
- **Points de Friction Identifiés** :
  - Les ondes 3D fluides de la carte services sont représentées par de simples sphères plates.
  - Manque de clarté sur les livrables exacts inclus dans chaque formule.
- **Comportements Attendus** : Le client comprend quel forfait correspond à son besoin et sait comment démarrer.
- **Améliorations Proposées** :
  - Remplacer les sphères par un tracé vectoriel d'ondes 3D élégant (`maq2.png`).
  - Lister des livrables types concrets (ex: *« Livrable : Code source documenté, schéma relationnel SQL, déploiement cloud Vercel, formation utilisateur »*).
- **Critères de Validation** : Clarté du processus confirmée par les testeurs sans interrogation sur le déroulement.

---

### PARCOURS 5 : CONSULTER MES INFORMATIONS PROFESSIONNELLES & MON CV
- **Objectif Visiteur** : Télécharger le CV de Jordan pour le transmettre à un comité de recrutement ou vérifier l'authenticité de ses références.
- **Étapes du Parcours** :
  1. Repérage du bouton *« Télécharger mon CV complet (PDF) »* sur la timeline.
  2. Téléchargement immédiat du fichier.
  3. Vérification des coordonnées (téléphones +237, emails).
- **Points de Friction Identifiés** :
  - Le CV graphique actuel souffre d'un mauvais parsing lors du traitement par des robots ATS ( Applicant Tracking Systems) internationaux.
- **Comportements Attendus** : Le recruteur obtient un document imprimable ou traitable par son SIRH en 1 clic.
- **Améliorations Proposées** :
  - Conserver le CV design actuel et proposer une version alternative linéarisée optimisée ATS.
- **Critères de Validation** : Téléchargement direct sans redirection intermédiaire ; temps de téléchargement < 1s.

---

### PARCOURS 6 : ME CONTACTER FACILEMENT (CONVERSION FINALE)
- **Objectif Visiteur** : Initier un échange direct par WhatsApp ou envoyer un cahier des charges sans perte de temps.
- **Étapes du Parcours** :
  1. Clic sur le bouton de contact ou navigation vers `contact.html`.
  2. Renseignement du formulaire (Nom, Email, Service, Budget, Message, Fichier brief).
  3. Clic sur *Envoyer ma demande*.
  4. Bascule sur WhatsApp avec message pré-rempli ou réception de confirmation.
- **Points de Friction Identifiés** :
  - **Le brief déposé n'est pas envoyé sur WhatsApp et est perdu.**
  - Les bloqueurs de popups mobiles bloquent parfois le `window.open` asynchrone.
- **Comportements Attendus** : Jordan reçoit immédiatement la notification ET le fichier du prospect.
- **Améliorations Proposées** :
  - Interfacer le formulaire avec un service de traitement de brief (Formspree/EmailJS) recevant la pièce jointe.
  - Déclencher l'ouverture WhatsApp de manière synchrone sur le clic de l'utilisateur pour contourner les bloqueurs de popups.
- **Critères de Validation** : 100% des demandes de test arrivent dans la boîte mail avec le fichier PDF/ZIP joint intact.

---

## 2. STATUT DU BLOG : SECTION SECONDAIRE
- Conformément aux directives, la section **Blog** ([`blog.html`](file:///home/affirmatif/Documents/Projet/portfolio%20website%20perso/blog.html)) demeure une rubrique d'appui éditorial destinée à asseoir l'autorité technique de Jordan (articles sur l'architecture modulaire et les schémas LIMS).
- Elle ne doit jamais monopoliser l'expérience de navigation au détriment des réalisations logicielles concrètes.
