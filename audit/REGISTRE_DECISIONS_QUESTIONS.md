# REGISTRE DES DÉCISIONS, QUESTIONS ET FAITS DU PROJET

Ce document constitue le référentiel d'intégrité factuelle du portfolio de **NDE Jordan Loïc**. Il sépare rigoureusement les faits attestés par des documents officiels, les hypothèses techniques, les manques identifiés, les contradictions relevées et les arbitrages formels soumis au propriétaire.

---

## 1. FAITS VÉRIFIÉS (SOURCES PRIMAIRES ET ATTESTÉES)

Ces informations sont tirées de `doc/CV_NDE_Jordan_Loic.pdf`, des échanges officiels du projet et des URLs en ligne vérifiées :

### 1.1 Identité Civile & Coordonnées
- **Nom complet** : NDE Jordan Loïc
- **Initiales & Monogramme** : NJ (NDE en blanc, Jordan L en orange `#FD6F00`, point blanc)
- **Date de naissance** : 16 mars 2001 (25 ans en 2026)
- **Localisation** : Yaoundé, Cameroun
- **Téléphones** : +237 679 279 447 / +237 621 317 408
- **Emails professionnels** : `ndejordanloic@outlook.fr` / `ndejordanloic@gmail.com`
- **Profil LinkedIn officiel** : `https://www.linkedin.com/in/jordan-lo%C3%AFc-nde-63b041427/`
- **Compte GitHub** : `https://github.com/Nadroj-ciol` (Dépôt : `https://github.com/Nadroj-ciol/Portfolio-website-perso`)

### 1.2 Formation Académique & Diplômes
- **Licence Technologique en Génie Logiciel** — IUT de Douala (2026)
- **BTS en Génie Logiciel** — Université Privée Siantou (2025)
- **Mathématiques Fondamentales** — Université de Yaoundé I (2 années d'études universitaires)
- **Baccalauréat C** — Lycée Bilingue de Mendong (2021)
- **Probatoire C** — Lycée Bilingue d'Ambam (2019)

### 1.3 Certifications & Prix
- **Certification Marketing Digital** — Ateliers Google
- **Palme d'Or** (3e prix national)

### 1.4 Expériences Professionnelles Réelles
- **Développeur Full-Stack Stagiaire / Assistance Technique** (U.P. Siantou, 2025-2026) : Conception et mise en œuvre du système intégré de gestion d'université avec pointage biométrique.
- **Infographiste, Photographe & Vidéographe** (LeGuide Informatique, 2019-présent).
- **Assistant DRH** (Polytech-Valor, 2022-2023).
- **Community Manager** (AllôKev, 2021-2023).
- **Concepteur Web** (Lycée Bilingue d'Ambam, 2017-2018 : site officiel du lycée).

### 1.5 Projets Déployés Réels
- **AgroFlow SaaS ERP** : `https://agroflowsaas.vercel.app` (Plateforme de gestion agricole).
- **Sister Schola ERP** : `https://sisterscholaerp.vercel.app` (Système de gestion hospitalière/clinique).
- **LaboGraphie Web** : `https://labographie.vercel.app` (Vitrine et communauté dev).

### 1.6 Personnalités Réelles du Réseau de Confiance (6 Personnes)
1. **Professeur Edii** — Professeur de Réseaux & Sécurité Informatique.
2. **M. ABDOU** — Inspecteur Pédagogique National (IPN) de Mathématiques au MINESEC.
3. **FUNGA Gautier** — Co-fondateur de Petit Colis.
4. **Marlyse** — Élève Ingénieur à Polytech Yaoundé.
5. **Chanceline** — Direction Opérationnelle d'EGESOL SARL.
6. **Powo Arnold** — Data Analyst & Partenaire Tech.

---

## 2. HYPOTHÈSES TECHNIQUES DU PROJET

Ces éléments ont été déduits de l'architecture sans validation documentaire explicite :
- **H1** : L'architecture multi-pages statique (Vanilla HTML/CSS/JS) sans framework lourd (React/Vue/Next.js) est le choix optimal pour garantir un hébergement zéro coût et une indexation native.
- **H2** : Les clients cibles de Jordan sont mixtes : recruteurs internationaux (offres de CDI en télétravail/relocation), PME camerounaises (besoins ERP/SaaS/BTP) et créateurs d'entreprises (besoins branding/packaging 3D).
- **H3** : Le bilinguisme Français/Anglais est indispensable compte tenu du bilinguisme constitutionnel camerounais et du marché international.

---

## 3. INFORMATIONS MANQUANTES (À VALIDER PAR JORDAN)

1. **GitHub des projets** : Les URLs des dépôts open source ou publics d'AgroFlow et Sister Schola ne sont pas mentionnées dans le portfolio.
2. **Verbatim réel des témoignages** : Les textes des 6 avis figurant dans `index.html` ont été rédigés par IA à partir des titres de postes. Les versions validées par les intéressés restent à confirmer.
3. **Chiffres d'affaires et métriques clients** : Les chiffres d'impact (-75%, -60%, 1 200 colis) n'ont pas de justificatif chiffré dans le dossier `doc/`.
4. **Photos d'ateliers et de chantiers réels** : Présence de 11 photos de stock Pexels pour les réseaux et la maintenance. Absence de clichés originaux des installations de Jordan.
5. **Identité de Brinda et Yvana** : 4 photos orphelines (`avatar_brinda.jpg`, `brinda.jpg`, etc.) sans rôle documenté.
6. **Tarifs et forfaits de `services.html`** : Les 3 formules ("Mission Ponctuelle", "Projet Clé en Main", "Régie & Maintenance") ne sont pas reliées à une grille de prix officielle.

---

## 4. CONTRADICTIONS RELEVÉES

1. **Le faux médecin de Sister Schola** :
   - `index.html` L830-847 : Affiche correctement **M. ABDOU** (IPN de Mathématiques au MINESEC).
   - `js/main.js` L1029 : Affiche **Dr. E. Ndoumbe, Consultant Médical** (personnage 100% fictif) dans l'étude de cas.
2. **Omission linguistique du CV** :
   - `doc/CV_NDE_Jordan_Loic.pdf` mentionne formellement : `LANGUES : Français, Anglais, Japonais`.
   - Le site ne propose que le toggle FR/EN et omet la mention du Japonais.
3. **Chronologie condensée de la timeline** :
   - `index.html` L352 affiche `2017 - 2023 : Univ. Yaoundé I & Lycée Ambam`.
   - En réalité : Bac C obtenu à Mendong en 2021, Ambam jusqu'en 2019, et Université de Yaoundé I de 2021 à 2023.
4. **Positionnement des filtres du portfolio** :
   - Maquette Figma `maq5.png` : Filtres positionnés **sous** le carrousel.
   - Site actuel (`index.html`) : Filtres positionnés **au-dessus**.

---

## 5. DÉCISIONS ATTENDUES DU PROPRIÉTAIRE

| Réf | Question / Arbitrage | Options Soumises | Statut |
| :--- | :--- | :--- | :--- |
| **D1** | Remplacement du faux « Dr. E. Ndoumbe » | **A (Recommandée)** : Remplacer par M. ABDOU ou Chanceline / Marlyse.<br>**B** : Remplacer par un vrai soignant de Sister Schola.<br>**C** : Supprimer l'encadré citation. | ⏳ En attente réponse |
| **D2** | Métriques synthétiques (-75%, -60%, etc.) | **A (Recommandée)** : Reformuler en résultats qualitatifs concrets et honnêtes.<br>**B** : Conserver ces chiffres comme estimations assumées. | ⏳ En attente réponse |
| **D3** | Photos de stock Pexels pour les Réseaux | **A (Recommandée)** : Remplacer par de vraies photos d'ateliers/TP.<br>**B** : Conserver avec badge explicite `[Illustration technique]`. | ⏳ En attente réponse |
| **D4** | Images orphelines (`brinda.jpg`, `yvana.jpg`) | **A (Recommandée)** : Supprimer pour nettoyer le dépôt.<br>**B** : Conserver et définir leur usage. | ⏳ En attente réponse |
| **D5** | Valorisation Japonais & Mathématiques | **A (Recommandée)** : Mettre en avant le Japonais et le bagage mathématique.<br>**B** : Rester uniquement sur Génie Logiciel & Infographie. | ⏳ En attente réponse |

---

## 6. RECOMMANDATIONS NON VALIDÉES (EN ATTENTE DE VALIDATION)

- [ ] **REC-01** : Remplacer `innerHTML` par `textContent` dans le glisser-déposer de `contact.html` (Correction de sécurité XSS).
- [ ] **REC-02** : Compresser les 15 plus grosses images en format WebP (Réduction de 177 Mo à moins de 8 Mo).
- [ ] **REC-03** : Créer les fichiers racine indispensables : `robots.txt`, `sitemap.xml`, `favicon.ico`.
- [ ] **REC-04** : Ajouter les balises Open Graph et Twitter Cards sur les 7 pages HTML.
- [ ] **REC-05** : Remplacer le libellé "Me recruter" par "Demander un devis" / "Lancer un projet".
- [ ] **REC-06** : Remplacer le pléonasme "Discutons-en ensemble" par "Discutons de votre projet".
- [ ] **REC-07** : Remplacer les 69 codes couleurs en dur dans `css/style.css` par les variables CSS de tokens.
- [ ] **REC-08** : Connecter le formulaire de contact à un vrai gestionnaire d'envoi de fichier (ex: Formspree ou EmailJS) plutôt que d'ignorer la pièce jointe lors de la redirection WhatsApp.
