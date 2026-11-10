# STRATÉGIE DE TESTS & PROTOCOLE D'ASSURANCE QUALITÉ (QA)

**Projet** : Cahier de Recette et Validation Technique du Portfolio de NDE Jordan Loïc  
**Normes de Référence** : W3C HTML5, WCAG 2.2 AA, Google Core Web Vitals, OWASP Top 10.

---

## 1. TYPOLOGIE DES CONTRÔLES QUALITÉ

```text
                        ┌───────────────────────────────┐
                        │      RECETTE FINALE UAT       │
                        │    (Jordan / Utilisateurs)    │
                        └──────────────┬────────────────┘
                                       │
                        ┌──────────────▼────────────────┐
                        │    TESTS D'ACCESSIBILITÉ &    │
                        │   CROSS-BROWSER (a11y / OS)   │
                        └──────────────┬────────────────┘
                                       │
                        ┌──────────────▼────────────────┐
                        │     TESTS DE PERFORMANCE &    │
                        │    SEO (Lighthouse / WebP)    │
                        └──────────────┬────────────────┘
                                       │
                        ┌──────────────▼────────────────┐
                        │   TESTS SÉCURITÉ & DOM-XSS    │
                        │     (Static Analysis / JS)    │
                        └───────────────────────────────┘
```

---

## 2. MATRICE D'ACCEPTATION & SCRIPTS DE VÉRIFICATION

| Réf Test | Domaine | Procédure de Test | Commande ou Méthode d'Exécution | Seuil d'Acceptation Exigé |
| :--- | :--- | :--- | :--- | :--- |
| **QA-SEC-01** | **Sécurité XSS** | Injecter un payload HTML dans le nom du fichier déposé dans la zone de brief. | Injection `<img src=x onerror=alert(1)>` dans `contactFileInput` via console. | Le texte s'affiche en clair sans exécuter de script (`textContent`). |
| **QA-PERF-01** | **Poids Médias** | Calculer le poids total cumulé du dossier des ressources images web. | `du -sh rsc/img/webp/` | Poids total strictement **inférieur à 8 Mo**. |
| **QA-PERF-02** | **Core Web Vitals** | Audit Lighthouse en émulation mobile (réseau 4G ralenti). | Lighthouse CLI / DevTools en mode *Mobile throttling*. | Score Performance **≥ 90/100**, LCP < 2,5s, CLS < 0,1. |
| **QA-A11Y-01** | **Contraste WCAG** | Vérifier le contraste de l'orange d'accentuation sur fond blanc. | Analyseur de contraste chromatique (DevTools ou script Python). | Ratio de contraste **≥ 4.5:1** sur tout texte courant. |
| **QA-A11Y-02** | **Focus Clavier** | Naviguer sur l'ensemble de la page avec la touche `Tab`. | Test manuel au clavier sans souris. | Anneau de focus visible et contrasté (`:focus-visible`) sur 100% des liens et boutons. |
| **QA-A11Y-03** | **Motion Sensoriel** | Activer l'option `prefers-reduced-motion: reduce`. | Émulation de la préférence système dans Chrome Rendering. | Arrêt immédiat de l'auto-scroll du marquee et des carrousels. |
| **QA-SEO-01** | **Fichiers Racine** | Vérifier la présence et le statut HTTP des fichiers obligatoires. | `curl -I /robots.txt`, `curl -I /sitemap.xml`, `curl -I /favicon.ico` | Code HTTP 200 sur les 3 fichiers sans aucune erreur 404. |
| **QA-SEO-02** | **Open Graph** | Vérifier la présence des balises de partage social. | Script de scan regex sur les 7 fichiers HTML. | Balises `og:title`, `og:image`, `og:url`, `twitter:card` présentes sur chaque page. |
| **QA-FUNC-01** | **Formulaire Brief** | Déposer un fichier PDF de test et soumettre la demande. | Soumission du formulaire sur `contact.html`. | Réception du fichier joint dans la boîte mail `ndejordanloic@outlook.fr`. |
| **QA-FUNC-02** | **Bilinguisme** | Commuter le toggle de langue FR / EN. | Clic sur le bouton de bascule langue dans la navbar. | Bascule instantanée de 100% des libellés sans texte non traduit. |
| **QA-FUNC-03** | **Fallback 404** | Accéder à un projet ou article inexistant. | Navigation vers `projet-detail.html?id=inconnu`. | Affichage de l'état vide propre « Projet non répertorié » avec bouton retour. |
| **QA-CONT-01** | **Zéro Hallucination**| Vérifier l'absence de faux persona dans la base de code. | `grep -rn "Ndoumbe" .` | **0 résultat**. Strict alignement sur les 6 personnes réelles. |

---

## 3. PROTOCOLE DE NON-RÉGRESSION VISUELLE

Avant et après chaque lot d'implémentation :
1. **Captures de contrôle** : Capturer les écrans complets (*full page screenshots*) sur 3 résolutions de référence :
   - Mobile : `390 x 844 px` (iPhone 14 / Samsung Galaxy standard).
   - Tablette : `768 x 1024 px` (iPad portrait).
   - Desktop : `1440 x 900 px` (MacBook / PC portable standard).
2. **Superposition avec les maquettes** : Vérifier que les espacements, les arrondis (`border-radius`) et la typographie restent conformes aux fichiers `doc/maq*.png`.
3. **Validation multi-navigateurs** :
   - Google Chrome (Moteur Blink).
   - Mozilla Firefox (Moteur Gecko).
   - Apple Safari iOS & macOS (Moteur WebKit).
   - Microsoft Edge (Moteur Chromium).
