# JOURNAL DES DÉCISIONS ARCHITECTURALES & STRATÉGIQUES (ADR)

**Projet** : Modernisation Technique & Éditoriale du Portfolio de NDE Jordan Loïc  
**Format** : Architecture Decision Record (ADR) & Registre d'Arbitrage Propriétaire.

---

## 1. DÉCISIONS D'ARCHITECTURE VALIDÉES PAR L'ÉQUIPE

### `ADR-01` : Maintien de la stack statique Vanilla (HTML5 / CSS3 / ES6)
- **Statut** : **Approuvé par l'équipe d'ingénierie**
- **Contexte** : Évaluer la nécessité ou non de migrer vers un framework moderne (Next.js, Astro, Nuxt ou React).
- **Décision** : Conserver l'architecture statique Vanilla pure sans framework lourd.
- **Justification** : Zéro dépendance `node_modules`, zéro vulnérabilité CVE, temps de chargement natif instantané, portabilité universelle, zéro coût d'hébergement sur Vercel.
- **Conséquences** : Nécessite une factorisation modulaire manuelle du header et du footer pour éviter les duplications HTML.

---

### `ADR-02` : Conversion batch locale en WebP plutôt qu'un service CDN tiers payant
- **Statut** : **Approuvé par l'équipe d'ingénierie**
- **Contexte** : Le dossier d'images pèse 177 Mo et bloque le chargement mobile.
- **Décision** : Effectuer une conversion batch locale en format WebP (qualité 80-85%, max 1920px) directement dans le dépôt plutôt que d'ajouter un service SaaS tiers payant (Cloudinary, Imgix).
- **Justification** : Préserve l'indépendance et la gratuité totale de l'infrastructure tout en réduisant le poids global de 95% (< 8 Mo).

---

### `ADR-03` : Gestion des briefs du formulaire de contact via passerelle sans serveur
- **Statut** : **En attente d'approbation finale de Jordan**
- **Contexte** : Le formulaire de contact égare le brief déposé lors de la bascule vers WhatsApp.
- **Décision** : Brancher le formulaire sur une passerelle d'envoi multipart sécurisée (Formspree ou EmailJS) vers `ndejordanloic@outlook.fr`, avec ouverture synchrone de WhatsApp en complément.
- **Justification** : Garantit que Jordan reçoit systématiquement le cahier des charges du client sans friction technique.

---

## 2. REGISTRE DES ARBITRAGES SOUMIS AU PROPRIÉTAIRE

| Réf ADR | Sujet de l'Arbitrage | Recommandation de l'Équipe | Alternatives Possibles | Statut Actuel |
| :--- | :--- | :--- | :--- | :---: |
| **ADR-04** | Remplacement du faux persona « Dr. E. Ndoumbe » sur Sister Schola. | **Option A (Recommandée)** : Remplacer par un retour d'expérience de **M. ABDOU** (IPN MINESEC) ou une synthèse technique d'impact. | Option B : Fournir le nom d'un vrai soignant de la clinique.<br>Option C : Supprimer l'encadré citation. | ⏳ En attente réponse |
| **ADR-05** | Traitement des métriques chiffrées inventées (-75%, -60%, 1200 colis, 12 failles). | **Option A (Recommandée)** : Remplacer par des **gains qualitatifs réels et honnêtes** (ex: *« Suppression des erreurs de double saisie »*). | Option B : Jordan valide formellement ces chiffres comme estimations officielles. | ⏳ En attente réponse |
| **ADR-06** | Valorisation du Japonais et des Mathématiques Fondamentales (Univ. Yaoundé I). | **Option A (Recommandée)** : Intégrer en bonne place le Japonais et le bagage mathématique dans la bio et les compétences. | Option B : Rester focalisé uniquement sur le Génie Logiciel et l'Infographie. | ⏳ En attente réponse |
| **ADR-07** | Traitement des photos de stock Pexels pour les Réseaux et la Maintenance. | **Option B (Pragmatique)** : Conserver les visuels en apposant la mention discrète `[Illustration technique]`. | Option A : Jordan fournit ses propres photos d'ateliers réelles. | ⏳ En attente réponse |
| **ADR-08** | Purge des 41 fichiers images orphelins pesant 45 Mo (`brinda.jpg`, etc.). | **Option A (Recommandée)** : Supprimer définitivement les images inutilisées pour alléger le dépôt. | Option B : Les conserver et préciser leur usage futur. | ⏳ En attente réponse |
| **ADR-09** | Repositionnement des filtres de catégories sur l'accueil. | **Option A (Recommandée)** : Déplacer les filtres **sous** le carrousel conformément à la maquette Figma 5 (`maq5.png`). | Option B : Laisser les filtres au-dessus du carrousel. | ⏳ En attente réponse |
