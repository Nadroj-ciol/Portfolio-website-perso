/**
 * MAIN.JS — Portfolio NDE Jordan L.
 * Reproduction Interactive 1:1 du Template Figma JCREA
 * - Dynamic Active Navbar (Click & ScrollSpy haute précision)
 * - Vrai Carrousel Glissant Horizontal pour les Projets (avec boutons flèches et filtres)
 * - Barre de recherche dynamique avec autocomplétion
 * - Galerie showcase en défilement continu avec lightbox
 * - Carrousel Témoignages (6 mentors/collaborateurs) avec Auto-play, pause au survol et contrôles manuels
 * - Dictionnaire Bilingue (Français / Anglais) instantané
 * - Compteurs animés (Count-Up)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. NAVIGATION DYNAMIQUE & SCROLL-SPY (ACTIF EN TEMPS RÉEL)
     ========================================================================= */
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('main section[id]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navbar = document.getElementById('navbar');

  let isClickScrolling = false;

  // Clic direct sur un lien de navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      isClickScrolling = true;
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      if (navbar && navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }

      // Débloquer le scrollspy après la fin du scroll fluide
      setTimeout(() => {
        isClickScrolling = false;
        updateActiveNavLink();
      }, 700);
    });
  });

  // Menu Mobile Toggle & Accessibilité Clavier / Clic Extérieur (WCAG 2.1.1 / 2.1.2)
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const expanded = navbar.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', String(expanded));
    });

    // Fermeture ergonomique sur touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });

    // Fermeture automatique lors d'un clic en dehors du menu mobile
    document.addEventListener('click', (e) => {
      if (navbar.classList.contains('open')) {
        if (!navbar.contains(e.target) && !mobileToggle.contains(e.target)) {
          navbar.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // ScrollSpy dynamique fiable via getBoundingClientRect
  function updateActiveNavLink() {
    if (isClickScrolling) return;

    if (window.scrollY < 120) {
      const heroLink = document.querySelector('.nav-item[href="#hero"]');
      if (heroLink && !heroLink.classList.contains('active')) {
        navItems.forEach(n => n.classList.remove('active'));
        heroLink.classList.add('active');
      }
      return;
    }

    const focalPoint = window.innerHeight * 0.35;
    let currentSectionId = '';

    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= focalPoint && rect.bottom >= focalPoint) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    if (currentSectionId) {
      const activeLink = document.querySelector(`.nav-item[href="#${currentSectionId}"]`);
      if (activeLink && !activeLink.classList.contains('active')) {
        navItems.forEach(n => n.classList.remove('active'));
        activeLink.classList.add('active');
      }
    }
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  window.addEventListener('resize', updateActiveNavLink, { passive: true });
  updateActiveNavLink();


  /* =========================================================================
     2. MOTEUR I18N BILINGUE (FRANÇAIS / ANGLAIS)
     ========================================================================= */
  const translations = {
    "fr": {
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.services": "Services",
        "nav.resume": "Parcours",
        "nav.projects": "Portfolio",
        "nav.blog": "Blog",
        "nav.contact": "Contact",
        "aria.langSelect": "Choix de la langue",
        "aria.langFr": "Passer en Français",
        "aria.langEn": "Switch to English",
        "aria.langJa": "日本語に切り替え",
        "aria.clearSearch": "Effacer la recherche",
        "aria.prevSlide": "Projet précédent",
        "aria.nextSlide": "Projet suivant",
        "meta.desc_index": "Portfolio de NDE Jordan Loïc — Développeur logiciel & Infographe. Fondateur de LaboGraphie. Conception d'architectures web SaaS, bases de données relationnelles et créations graphiques.",
        "meta.desc_services": "Solutions d'ingénierie et prestations spécialisées par NDE Jordan L. : génie logiciel, bases de données LIMS, infographie & packaging 3D, réseaux et maintenance.",
        "meta.desc_portfolio": "Portfolio et réalisations de NDE Jordan Loïc : ERP en production, modélisation relationnelle stricte, identités vectorielles et packaging 3D.",
        "meta.desc_blog": "Articles techniques, retours d'expérience et analyses d'architecture logicielle par NDE Jordan L. : ERP SaaS résilient, intégrité des données de santé et modélisation SQL.",
        "meta.desc_contact": "Contactez NDE Jordan Loïc pour vos projets de développement logiciel, conception de bases de données, identité visuelle ou maintenance réseau. Réponse sous 24h.",
        "meta.desc_project": "Étude de cas détaillée et architecture technique — NDE Jordan L., Développeur logiciel & Infographe.",
        "meta.desc_article": "Publication et retour d'expérience technique — NDE Jordan L., Développeur logiciel & Infographe.",
        "hero.hello": "Bonjour !",
        "hero.intro": "Moi c'est",
        "hero.role": "Développeur logiciel & Infographe",
        "hero.quote": "« L'excellence technique et l'architecture logicielle de Jordan garantissent le succès de nos projets en production. Hautement recommandé ! »",
        "hero.portfolioBtn": "Portfolio",
        "hero.hireBtn": "Lancer un projet",
        "hero.expLabel": "30+ Réalisations & Projets Concrets",
        "why.titlePre": "Pourquoi",
        "why.titleOrange": "me choisir ?",
        "why.text": "Polyvalent et rigoureux, je mets mes compétences au service du développement logiciel, de la création graphique et de l'infrastructure réseau. Certifié en marketing digital par Google, je conçois des systèmes d'information et des identités visuelles pensés pour durer.",
        "why.m1Label": "Projets & démos vérifiables en ligne",
        "why.m2Label": "3e Prix National Concours Tech",
        "why.contactBtn": "Me contacter",
        "why.skillDB": "Database & SQL",
        "why.skillDesign": "Infographie & Flyers",
        "why.skillNetwork": "Réseau & Sécu",
        "why.skillMaint": "Maintenance IT",
        "why.skillDev": "Systèmes Embarqués",
        "why.skillLangs": "Français · Anglais · Japonais",
        "services.titlePre": "Mes",
        "services.titleOrange": "Services",
        "services.sub": "Développeur logiciel & Infographe · Fondateur de LaboGraphie : conception d'applications robustes, bases de données relationnelles, infrastructure et création graphique.",
        "services.s1Title": "Génie Logiciel & Applications Web",
        "services.s1Desc": "Conception d'architectures SaaS et ERP complètes, modélisation de microservices, APIs RESTful et synchronisation hors-ligne résiliente.",
        "services.s2Title": "Bases de Données & Systèmes LIMS",
        "services.s2Desc": "Modélisation relationnelle SQL rigoureuse, intégrité transactionnelle, centralisation des dossiers patients et flux cliniques.",
        "services.s3Title": "Infographie & Direction Visuelle",
        "services.s3Desc": "Direction artistique, conception de chartes graphiques, logos vectoriels scalables, flyers et affiches de communication à fort impact.",
        "services.allServicesBtn": "Consulter les 6 Domaines d'Expertise & Solutions Spécifiques &rarr;",
        "services.heroBadge": "✦ Solutions & Prestations d'Ingénierie",
        "services.pageTitlePre": "Solutions d'Ingénierie &",
        "services.pageTitleOrange": "Services Spécialisés",
        "services.pageSubtitle": "De l'architecture logicielle critique à la création graphique percutante, découvrez l'ensemble de mes domaines d'intervention.",
        "services.c1Badge": "AgroFlow ERP · Architecture Web",
        "services.c1Desc": "Conception et développement sur-mesure d'architectures SaaS, plateformes ERP modulaires et applications web complètes, pensées pour la résilience et le mode hors-ligne.",
        "services.c1F1": "Architectures SaaS & ERP modulaires",
        "services.c1F2": "Modélisation relationnelle SQL stricte (MERISE 3NF)",
        "services.c1F3": "APIs RESTful performantes et sécurisées",
        "services.c1F4": "Synchronisation hors-ligne Local-First (IndexedDB)",
        "services.c1Cta": "Voir les projets Dev &rarr;",
        "services.c2Badge": "Candace Distribution · Packaging 3D",
        "services.c2Desc": "Création d'identités visuelles complètes, logos vectoriels scalables, modélisation volumique de packaging 3D pour flacons/bouteilles et supports de communication à fort impact.",
        "services.c2F1": "Modélisation 3D de flacons, bouteilles & boîtiers (Candace, LaboGraphie)",
        "services.c2F2": "Identités visuelles et chartes graphiques complètes (Shawel, Fosa'a, GTA)",
        "services.c2F3": "Affiches événementielles et flyers commerciaux (Petit Colis, GMC)",
        "services.c2F4": "Signalétique grand format, stands d'exposition et roll-ups 3D",
        "services.c2Cta": "Explorer la galerie graphique &rarr;",
        "services.c3Badge": "Sister Schola ERP · Gestion Clinique",
        "services.c3Desc": "Conception de systèmes d'information hospitaliers et de santé, modélisation relationnelle garantissant l'intégrité transactionnelle, le secret médical et la centralisation des dossiers patients.",
        "services.c3F1": "Gestion des admissions et dossiers patients informatisés",
        "services.c3F2": "Traçabilité des actes cliniques et audits de consultations",
        "services.c3F3": "Modélisation relationnelle haute cohérence (PostgreSQL / MySQL)",
        "services.c3F4": "Contrôle des accès basé sur les rôles (RBAC)",
        "services.c3Cta": "Étude de cas clinique &rarr;",
        "services.c4Badge": "Illustration contextuelle · Baie de brassage",
        "services.c4Title": "Réseaux & Sécurité Applicative",
        "services.c4Desc": "Mise en œuvre d'infrastructures locales d'entreprise fiables, câblage structuré d'armoires et baies de brassage, segmentation VLAN et sécurisation des accès réseau.",
        "services.c4F1": "Câblage structuré, repérage et brassage d'armoires",
        "services.c4F2": "Configuration de switchs administrables et routeurs",
        "services.c4F3": "Segmentation VLAN et filtrage des accès par pare-feu",
        "services.c4F4": "Audit de vulnérabilités réseau et plans de reprise d'activité",
        "services.c4Cta": "Demander un audit réseau &rarr;",
        "services.c5Title": "Maintenance Informatique & Support",
        "services.c5Desc": "Diagnostic approfondi de parcs informatiques, maintenance préventive et curative des postes de travail, déploiement sécurisé de systèmes d'exploitation et assistance réactive.",
        "services.c5F1": "Diagnostic matériel, remplacement de composants et nettoyage",
        "services.c5F2": "Installation, durcissement et optimisation de systèmes d'exploitation",
        "services.c5F3": "Mise en place de protocoles de sauvegarde locale et cloud",
        "services.c5F4": "Assistance technique sur site et téléassistance réactive",
        "services.c5Cta": "Assistance technique &rarr;",
        "services.c6Title": "Conseil IT & Productivité Numérique",
        "services.c6Desc": "Accompagnement des professionnels et PME dans le choix de leurs outils numériques, l'automatisation de tâches chronophages et l'adoption pragmatique des outils d'IA pour décupler leur productivité.",
        "services.c6F1": "Audit des processus de travail et identification des tâches répétitives",
        "services.c6F2": "Conseil sur l'adoption raisonnée des modèles génératifs et assistants IA",
        "services.c6F3": "Mise en place de scripts et flux automatisés de traitement documentaire",
        "services.c6F4": "Formation pratique des équipes pour une appropriation rapide et autonome",
        "services.c6Cta": "Projet d'automatisation &rarr;",
        "services.processBadge": "Méthodologie Éprouvée",
        "services.processTitlePre": "Comment se déroule",
        "services.processTitleOrange": "notre collaboration ?",
        "services.processSubtitle": "De la première prise de contact jusqu'au déploiement et au support continu.",
        "services.step1Title": "Cadrage & Écoute",
        "services.step1Desc": "Analyse fine de votre besoin, définition du cahier des charges et compréhension de vos contraintes techniques ou artistiques.",
        "services.step2Title": "Devis & Conception",
        "services.step2Desc": "Élaboration d'une proposition claire avec délais maîtrisés, maquettes visuelles ou schémas d'architecture logicielle.",
        "services.step3Title": "Développement & Tests",
        "services.step3Desc": "Implémentation rigoureuse selon les meilleures pratiques du marché, tests fonctionnels et itérations collaboratives.",
        "services.step4Title": "Livraison & Support",
        "services.step4Desc": "Mise en production sécurisée, remise des sources vectorielles ou du code testé, et accompagnement technique dans la durée.",
        "services.pricingBadge": "Transparence & Flexibilité",
        "services.pricingTitlePre": "Formules d'intervention",
        "services.pricingTitleOrange": "adaptées",
        "services.pricingSubtitle": "Des formules flexibles calibrées pour les PME, startups, cabinets médicaux et créateurs de projets.",
        "services.plan1Name": "Mission Ponctuelle",
        "services.plan1Desc": "Idéal pour un livrable précis : flyer, logo, audit réseau ou composant logiciel isolé.",
        "services.plan1F1": "Cahier des charges cadré",
        "services.plan1F2": "Livrables clés en main sous 2 à 7 jours",
        "services.plan1F3": "Révisions incluses",
        "services.plan1F4": "Fichiers sources fournis (Code ou Vecteurs)",
        "services.plan1Cta": "Demander un devis",
        "services.plan2Badge": "Recommandé",
        "services.plan2Name": "Projet Clé en Main",
        "services.plan2Desc": "Idéal pour la création complète d'un ERP, SaaS, identité de marque 360° ou infrastructure réseau.",
        "services.plan2F1": "Accompagnement de A à Z (Architecture + Dev + Tests)",
        "services.plan2F2": "Déploiement en production (Vercel, Docker, Serveur)",
        "services.plan2F3": "Mode hors-ligne résilient et base de données SQL",
        "services.plan2F4": "Garantie et support technique étendu 30 jours",
        "services.plan2Cta": "Lancer mon projet &rarr;",
        "services.plan3Name": "Régie & Maintenance",
        "services.plan3Desc": "Idéal pour les entreprises souhaitant un suivi technique ou infographique mensuel réactif.",
        "services.plan3F1": "Support technique prioritaire (24/48h)",
        "services.plan3F2": "Maintenance préventive de vos applications et parcs",
        "services.plan3F3": "Production graphique régulière (campagnes, affiches)",
        "services.plan3F4": "Optimisations continues de performance",
        "services.plan3Cta": "Discuter d'un contrat",
        "services.faqBadge": "Questions Fréquentes",
        "services.faqTitlePre": "Tout ce que vous devez",
        "services.faqTitleOrange": "savoir",
        "services.faqQ1": "Quels sont vos délais habituels de livraison ?",
        "services.faqA1": "Pour les prestations graphiques (logos, affiches, flyers), les propositions initiales sont généralement livrées sous 48 à 72 heures. Pour les applications et ERP complets, le calendrier s'articule généralement entre 2 et 6 semaines selon la complexité et les fonctionnalités requises.",
        "services.faqQ2": "Pouvez-vous intervenir à distance ou uniquement sur place à Yaoundé ?",
        "services.faqA2": "J'interviens aussi bien en présentiel à Yaoundé et Douala pour les besoins d'infrastructure, de câblage et de maintenance physique, qu'à distance pour le développement logiciel, la conception de bases de données et l'infographie avec des clients nationaux et internationaux.",
        "services.faqQ3": "Comment garantissez-vous la sécurité et la confidentialité des données ?",
        "services.faqA3": "Chaque système développé (notamment dans la santé comme Sister Schola ou l'agriculture avec AgroFlow) applique le principe de moindre privilège, le chiffrement des flux sensibles et le respect strict du secret professionnel. Des accords de confidentialité (NDA) peuvent être signés avant tout début de collaboration.",
        "services.faqQ4": "Quelles sont les modalités de paiement acceptées ?",
        "services.faqA4": "Les paiements s'effectuent généralement avec un acompte au démarrage du projet puis le solde à la livraison finale validée. Les modes acceptés incluent virement bancaire, Orange Money, MTN Mobile Money et solutions internationales.",
        "services.ctaHeadlinePre": "Un besoin en développement ou en infographie ?",
        "services.ctaHeadlineOrange": "Parlons de votre projet dès aujourd'hui",
        "services.ctaWaBtn": "Discuter directement sur WhatsApp &rarr;",
        "services.ctaFormBtn": "Formulaire de devis complet",
        "exp.titlePre": "Mon",
        "exp.titleOrange": "Parcours & Expérience",
        "exp.siantouDiploma": "BTS en Génie Logiciel et Bases de Données (GLBD)",
        "exp.siantouRole": "BTS en Génie Logiciel et Bases de Données (GLBD)",
        "exp.siantouDesc": "Formation d'enseignement supérieur de deux ans en Génie Logiciel et Bases de Données (GLBD) à l'Université Privée Siantou (2024–2025) : modélisation relationnelle de bases de données (SQL, MERISE), programmation logicielle, algorithmique appliquée et administration des systèmes.",
        "exp.iutDiploma": "Licence de Technologie en Génie Logiciel",
        "exp.iutRole": "Licence de Technologie en Génie Logiciel",
        "exp.iutDesc": "Formation universitaire de niveau Bac+3 en Génie Logiciel à l'Institut Universitaire de Technologie (IUT) de Douala (2025–2026) : architecture logicielle avancée, modélisation relationnelle SQL (MERISE 3NF), conteneurisation Docker et architectures web résilientes.",
        "exp.leguideDiploma": "Infographie, Multimédia & RH",
        "exp.leguideRole": "Infographiste, Vidéographe & Assistant RH",
        "exp.leguideDesc": "Création d'identités visuelles, logos vectoriels et affiches professionnelles. Production multimédia pour LeGuide Informatique. Gestion des processus RH chez Polytech-Valor.",
        "exp.ambamDiploma": "Mathématiques & Baccalauréat C",
        "exp.ambamRole": "Socle en Mathématiques Fondamentales & Débuts du Web",
        "exp.ambamDesc": "Deux années en Mathématiques fondamentales à l'Université de Yaoundé I (rigueur algorithmique). Baccalauréat C à Mendong (2021). Premier projet web en 2017 pour le Lycée Bilingue d'Ambam.",
        "exp.cvBtn": "Télécharger mon CV complet (PDF)",
        "portfolio.headPre": "Découvrez",
        "portfolio.headSub": "mon",
        "portfolio.headOrange": "Portfolio",
        "portfolio.seeAll": "Voir tout",
        "portfolio.tabAll": "Tous les projets",
        "portfolio.tabDev": "Génie Logiciel & ERP",
        "portfolio.tabDesign": "Infographie & Design",
        "portfolio.tabSystems": "Systèmes & Réseaux",
        "portfolio.liveBtn": "Démo en ligne →",
        "portfolio.sourceBtn": "Code Source GitHub",
        "portfolio.detailsBtn": "Étude de cas 📖",
        "portfolio.heroBadge": "✦ Projets Déployés & Travaux Graphiques",
        "portfolio.pageTitlePre": "Réalisations,",
        "portfolio.pageTitleOrange": "SaaS & Packaging 3D",
        "portfolio.pageSubtitle": "ERP en production, modélisation relationnelle stricte, identités vectorielles et modélisation de packaging industriel.",
        "portfolio.stat1Label": "Études de Cas & Démos Déployées",
        "portfolio.stat2Label": "Marques & 30+ Travaux Graphiques",
        "portfolio.stat3Label": "Résilience Hors-Ligne & Intégrité SQL",
        "portfolio.stat4Label": "Pratique Continue de la Conception",
        "portfolio.competenciesTitle": "Compétences Clés Démontrées à travers ces Réalisations",
        "portfolio.searchPlaceholder": "Rechercher (ERP, Candace, Petit Colis, SQL, Logo...)",
        "portfolio.emptyTitle": "Aucun projet trouvé",
        "portfolio.emptyText": "Aucune réalisation ne correspond à votre filtre ou à votre recherche textuelle.",
        "portfolio.emptyReset": "Réinitialiser tous les filtres",
        "portfolio.galleryTitle": "Galerie Complète d'Infographie, Packaging 3D & Branding",
        "portfolio.gallerySubtitle": "Explorez l'ensemble des 33 créations authentiques conçues pour des marques et institutions : modélisation de packagings produits 3D, identités de marque, chartes graphiques et affiches professionnelles.",
        "portfolio.filterAll": "Tous les Visuels (33)",
        "portfolio.filterPackaging": "Modélisation Packaging 3D",
        "portfolio.filterLogos": "Logos & Identités Vectorielles",
        "portfolio.filterAffiches": "Affiches, Rollups & Édition",
        "portfolio.filterInfra": "Réseaux & Infrastructures",
        "testi.titlePre": "Ceux qui m'ont",
        "testi.titleOrange": "fait confiance",
        "testi.sub": "Retours et appréciations d'enseignants-chercheurs, d'inspecteurs, de collaborateurs tech et de dirigeants ayant validé ma rigueur d'ingénierie.",
        "testi.autoScroll": "Auto-scroll actif",
        "testi.t1Role": "Professeur Réseaux & Sécurité",
        "testi.t1Text": "« Jordan démontre une compréhension remarquable des architectures réseaux, de la sécurité applicative et du travail d'équipe. Un technologue méthodique, rigoureux et autonome dans l'exécution de ses projets. »",
        "testi.t2Role": "IPN de Mathématiques · MINESEC",
        "testi.t2Text": "« Une rigueur logique et un esprit d'analyse exceptionnels hérités de son parcours en mathématiques. Jordan sait traduire des abstractions complexes en solutions logicielles opérationnelles. »",
        "testi.t3Role": "Fondateur · Petit Colis",
        "testi.t3Text": "« Pour la communication visuelle et nos campagnes de recrutement chez Petit Colis, le travail infographique et l'écoute de Jordan ont été déterminants. Travail rapide, soigné et très professionnel. »",
        "testi.t4Role": "Élève Ingénieur · Polytech Yaoundé",
        "testi.t4Text": "« Collaborer avec Jordan est un véritable plaisir : sa capacité d'analyse, son souci du détail et sa rigueur mathématique font toute la différence sur des modélisations logicielles pointues. »",
        "testi.t5Role": "Direction · Egesol SARL",
        "testi.t5Text": "« Jordan allie créativité graphique percutante et précision technique. Les supports visuels et solutions conçus pour notre structure ont parfaitement répondu à nos exigences de professionnalisme. »",
        "testi.t6Role": "Data Analyst · Systèmes de Données",
        "testi.t6Text": "« La structuration des bases de données SQL et la modélisation de données réalisées par Jordan sur les plateformes ERP sont d'une clarté exemplaire. Travailler sur ses pipelines de données est un régal. »",
        "discuss.headPre": "Vous avez une idée de projet ?",
        "discuss.headOrange": "Discutons de votre projet",
        "discuss.placeholder": "Entrez votre adresse email...",
        "discuss.sendBtn": "Envoyer",
        "discuss.b1": "Conception & Rigueur Qualité",
        "discuss.b2": "Concours National",
        "discuss.b3Cert": "Certifié",
        "discuss.b3": "Marketing Digital (Google)",
        "blog.headPre": "Mes articles &",
        "blog.headOrange": "publications",
        "blog.heroBadge": "✦ Retours d'Expérience &amp; Veille Technologique",
        "blog.pageTitlePre": "Analyses Techniques &",
        "blog.pageTitleOrange": "Publications",
        "blog.pageSubtitle": "Retours d'expérience sur l'architecture logicielle, les bases de données résilientes et le génie logiciel en environnement contraint.",
        "blog.readMore": "Lire l'article complet &rarr;",
        "blog.readTime7": "7 min de lecture",
        "blog.readTime9": "9 min de lecture",
        "blog.readTime6": "6 min de lecture",
        "blog.a1Date": "18 Octobre 2026",
        "blog.a2Date": "24 Septembre 2026",
        "blog.a3Date": "12 Août 2026",
        "blog.a1Tag": "Architecture Logicielle",
        "blog.a1Title": "Concevoir une architecture logicielle modulaire et résiliente en milieu à connectivité intermittente",
        "blog.a1Desc": "Comment garantir la synchronisation bidirectionnelle sans conflit entre le cache local (IndexedDB) et une base PostgreSQL centrale lors des coupures d'électricité et d'Internet.",
        "blog.a2Tag": "AgriTech & SaaS ERP",
        "blog.a2Title": "AgroFlow : De la modélisation UML/SQL à un ERP SaaS agricole haute disponibilité",
        "blog.a2Desc": "Étude de cas sur la normalisation des schémas relationnels de parcelles agricoles, l'indexation B-Tree et la génération instantanée de bilans d'exploitation pour coopératives.",
        "blog.a3Tag": "Clinique & Santé",
        "blog.a3Title": "Sister Schola & Traçabilité LIMS : Garantir le secret médical et la cohérence des flux hospitaliers",
        "blog.a3Desc": "Implémentation de protocoles de sécurité stricts (RBAC, audit logs infalsifiables) pour la numérisation des laboratoires d'analyse et services d'hospitalisation.",
        "blog.discussBoxTitle": "Une problématique d'architecture sur votre projet ?",
        "blog.discussBoxDesc": "Besoin d'un regard extérieur sur vos schémas relationnels, vos choix de framework ou votre politique de sécurité ? Échangeons librement sur votre cas d'usage.",
        "blog.discussBoxBtn": "Prendre rendez-vous &rarr;",
        "blog.langNotice": "[Article rédigé en français · Retours d'expérience du terrain]",
        "contact.heroBadge": "✦ Échange Direct & Devis Gratuit",
        "contact.pageTitlePre": "Discutons de",
        "contact.pageTitleOrange": "Votre Projet",
        "contact.pageSubtitle": "Une idée, un cahier des charges ou un besoin d'expertise en génie logiciel et design graphique ? Parlons-en concrètement.",
        "contact.stayInTouch": "Restons en contact",
        "contact.stayInTouchDesc": "Je réponds personnellement à toutes les demandes techniques et commerciales sous 24 heures ouvrées.",
        "contact.whatsappDirect": "Démarrer un chat WhatsApp direct",
        "contact.zoneTitle": "Zone d'Intervention",
        "contact.zoneSub": "Cameroun & International",
        "contact.availTitle": "Disponibilité Immédiate",
        "contact.availDesc": "Actuellement ouvert aux projets de développement logiciel, modélisation de bases de données et créations graphiques.",
        "contact.formTitle": "Envoyez un message",
        "contact.formSub": "Précisez vos besoins pour recevoir une réponse adaptée et un devis préliminaire sous 24h.",
        "contact.nameLabel": "Nom complet *",
        "contact.namePlaceholder": "Votre nom complet",
        "contact.emailLabel": "Adresse email *",
        "contact.emailPlaceholder": "votre.email@domaine.com",
        "contact.phoneLabel": "Téléphone &amp; WhatsApp",
        "contact.phonePlaceholder": "Ex: +237 670 00 00 00",
        "contact.serviceLabel": "Domaine d'expertise souhaité *",
        "contact.serviceSelectDefault": "Sélectionnez un domaine...",
        "contact.serviceOptSoftware": "Génie Logiciel & SaaS ERP",
        "contact.serviceOptInfographie": "Infographie & Identité de Marque",
        "contact.serviceOptSystems": "Maintenance Systèmes & Réseaux",
        "contact.serviceOptConsulting": "Consultant IT & Audit d'Architecture",
        "contact.serviceOptOther": "Autre collaboration",
        "contact.budgetLabel": "Fourchette budgétaire estimative",
        "contact.budgetOptFlexible": "À déterminer ensemble",
        "contact.budgetOptTier1": "< 150 000 FCFA (~230 €)",
        "contact.budgetOptTier2": "150 000 - 500 000 FCFA (~230 - 760 €)",
        "contact.budgetOptTier3": "500 000 - 1 500 000 FCFA (~760 - 2 300 €)",
        "contact.budgetOptTier4": "> 1 500 000 FCFA (Projet d'envergure)",
        "contact.messageLabel": "Détails de votre besoin ou cahier des charges *",
        "contact.messagePlaceholder": "Décrivez les fonctionnalités attendues, les contraintes de délai et le contexte de votre projet...",
        "contact.fileLabel": "Pièce jointe / Cahier des charges (Optionnel)",
        "contact.fileDropText": "Glissez-déposez votre cahier des charges, brief ou maquette (PDF, DOCX, ZIP max 15 Mo) ou <strong style=\"color: var(--figma-orange); text-decoration: underline; cursor: pointer;\">parcourir</strong>",
        "contact.privacyNote": "🔒 <strong>Confidentialité & Données :</strong> Vos coordonnées et documents transmis sont strictement confidentiels. Aucune donnée n'est cédée ni exploitée commercialement.",
        "contact.submitBtn": "Envoyer ma demande",
        "contact.faqBadge": "✦ Foire Aux Questions",
        "contact.collabTitlePre": "Modalités de",
        "contact.collabTitleOrange": "Collaboration",
        "contact.q1": "Comment se déroule le premier échange technique ?",
        "contact.a1": "Après réception de votre demande, nous organisons un appel de cadrage de 30 minutes (Google Meet, WhatsApp ou en présentiel à Yaoundé/Douala) pour définir vos exigences techniques, l'architecture optimale et établir une estimation budgétaire transparente.",
        "contact.q2": "Proposez-vous une maintenance après la livraison du projet ?",
        "contact.a2": "Oui. Chaque développement applicatif inclut une période de garantie corrective post-déploiement. Je propose également des contrats de maintenance préventive et d'astreinte mensuelle pour assurer la haute disponibilité de vos systèmes.",
        "contact.q3": "Travaillez-vous avec des clients à l'international ?",
        "contact.a3": "Absolument. Je collabore régulièrement à distance avec des entreprises et organisations à l'international grâce à des flux de travail structurés (Git, Jira/Trello, réunions synchrones régulières et documentation complète).",
        "contact.q4": "Quels sont les modes de règlement acceptés ?",
        "contact.a4": "Les paiements s'effectuent par virement bancaire, Orange Money, MTN Mobile Money ou solutions de paiement international. Les projets sont généralement découpés en jalons (acompte au démarrage, validation intermédiaire, solde à la livraison).",
        "project.backLink": "&larr; Retourner au Portfolio",
        "project.sectionContext": "1. Contexte & Problématique Métier",
        "project.sectionArch": "2. Architecture Technique & Choix Technologiques",
        "project.sectionGallery": "3. Galerie de Captures & Schémas d'Architecture",
        "project.sectionResults": "4. Résultats Obtenus & Impact Opérationnel",
        "project.specsTitle": "Spécifications du Projet",
        "project.clientLabel": "Organisation / Client",
        "project.industryLabel": "Domaine d'Activité",
        "project.durationLabel": "Durée de Réalisation",
        "project.roleLabel": "Rôle de NDE Jordan L.",
        "project.techStackLabel": "Stack Technologique",
        "project.notFoundTitle": "Projet non répertorié",
        "project.notFoundSummary": "L'identifiant de projet demandé n'existe pas ou a été déplacé. Veuillez consulter notre catalogue complet pour découvrir toutes les réalisations disponibles.",
        "project.notFoundBtn": "&larr; Retourner au catalogue des projets",
        "article.authorRole": "Technologue en Génie Logiciel · IUT Douala",
        "article.relatedTitle": "✦ Projet & Étude de cas liée",
        "article.demoBtn": "Tester la Démo en Ligne ↗",
        "article.caseBtn": "Lire l'Étude de Cas Complète &rarr;",
        "article.whatsappDiscuss": "💬 En discuter sur WhatsApp",
        "article.newsletterTitle": "Recevoir mes prochaines analyses techniques",
        "article.newsletterSub": "Inscrivez-vous pour recevoir directement par email mes retours d'expérience sur le génie logiciel, la sécurité réseau et l'architecture de systèmes.",
        "article.newsletterPlaceholder": "Votre email professionnel...",
        "article.subscribeBtn": "S'abonner",
        "article.notFoundTitle": "Publication non répertoriée",
        "article.notFoundDesc": "L'article technique demandé n'existe pas ou a été déplacé. Veuillez consulter notre espace blog pour découvrir l'ensemble de nos publications et retours d'expérience.",
        "article.notFoundBtn": "&larr; Retourner aux publications",
        "footer.connectTitle": "Connectons-nous ici",
        "footer.hireBtn": "Lancer un projet",
        "footer.bio": "Développeur logiciel & Infographe, diplômé de l'IUT de Douala et certifié en marketing digital (Google). Fondateur de LaboGraphie, spécialisé dans la conception applicative, l'infrastructure et l'identité visuelle.",
        "footer.navTitle": "Navigation",
        "footer.contactTitle": "Coordonnées",
        "footer.location": "<span>📍 Yaoundé, Cameroun</span>",
        "footer.stayConnected": "Restons connectés",
        "footer.placeholder": "Votre adresse email...",
        "footer.quickQuote": "Demande de Devis Rapide",
        "footer.copyright": "Copyright © 2026 NDE Jordan L. · LaboGraphie Dev. Tous droits réservés.",
        "footer.terms": "Conditions d'utilisation",
        "footer.privacy": "Politique de confidentialité",
        "pageTitle.index": "NDE Jordan L. | Développeur Full-Stack & Technologue en Génie Logiciel",
        "pageTitle.services": "Services & Solutions — NDE Jordan L. · Technologue & Développeur Full-Stack",
        "pageTitle.portfolio": "Portfolio & Réalisations — NDE Jordan L. · Technologue & Développeur Full-Stack",
        "pageTitle.blog": "Blog & Publications Tech — NDE Jordan L. · Technologue & Développeur Full-Stack",
        "pageTitle.contact": "Contact & Devis — NDE Jordan L. · Technologue & Développeur Full-Stack",
        "why.m1Val": "Code Ouvert",
        "why.m2Val": "Palme d'Or",
        "exp.session2026": "2025–2026",
        "exp.session2025": "2024–2025",
        "portfolio.dom1Title": "Développement Logiciel &amp; Web",
        "portfolio.dom1Desc": "Architectures SaaS, Vanilla JS, React, Node.js, interfaces réactives et synchronisation offline-first (AgroFlow, Sister Schola).",
        "portfolio.dom2Title": "Infrastructure, DevOps &amp; Systèmes",
        "portfolio.dom2Desc": "Bases relationnelles PostgreSQL/MySQL (MERISE 3NF), conteneurisation Docker, hébergement Vercel et intégrité transactionnelle.",
        "portfolio.dom3Title": "UI/UX &amp; Conception Graphique",
        "portfolio.dom3Desc": "Design vectoriel sur Illustrator, modélisation packaging 3D de flacons, mockups produits et identités de marque (Candace, LaboGraphie).",
        "portfolio.dom4Title": "Conseil &amp; Accompagnement SI",
        "portfolio.dom4Desc": "Cadrage de besoins, modélisation conceptuelle (MCD/MLD), rédaction de spécifications techniques et choix d'architectures adaptées.",
        "portfolio.dom5Title": "Marketing Digital &amp; Communication",
        "portfolio.dom5Desc": "Stratégie de contenu, certification marketing digital Google, communication visuelle et animation d'initiatives tech locales.",
        "portfolio.dom6Title": "Maintenance Informatique &amp; Réseaux",
        "portfolio.dom6Desc": "Câblage structuré de baies, adressage VLAN/Cisco, maintenance préventive/curative hardware et intégration Arduino.",
        "portfolio.cardAgroBadge": "ERP &amp; AgriTech (Prototype)",
        "portfolio.cardAgroDesc": "Prototype d'ERP SaaS pour exploitants agricoles. Digitalisation des parcelles, suivi des récoltes, balance financière en temps réel et mode offline-first résilient.",
        "portfolio.cardSisterBadge": "Santé &amp; LIMS (Prototype)",
        "portfolio.cardSisterDesc": "Prototype d'ERP hospitalier et gestion clinique. Traçabilité complète du parcours patient, gestion des admissions, ordonnances et sécurité des flux hospitaliers.",
        "portfolio.cardCandaceBadge": "Branding &amp; Packaging",
        "portfolio.cardCandaceDesc": "Direction artistique, modélisation packaging 3D pour la gamme cosmétique Candace, et campagnes d'affichage/recrutement percutantes pour la startup Petit Colis.",
        "portfolio.cardLaboBadge": "Collectif LaboGraphie",
        "portfolio.cardLaboDesc": "Portail interactif et vitrine des solutions logicielles et créatives du collectif LaboGraphie fondé avec des camarades. Architecture modulaire Vanilla JS et performances optimales.",
        "portfolio.cardAcuveraBadge": "Site Client · Dr Zemzi",
        "portfolio.cardAcuveraDesc": "Site web vitrine et espace de suivi des analyses biomédicales conçu pour le cabinet du Dr Zemzi (prestation facturée 40 000 FCFA). Consultation sécurisée des résultats d'examens.",
        "portfolio.cardArduinoBadge": "Systèmes &amp; Réseaux",
        "portfolio.cardArduinoDesc": "Programmation de microcontrôleurs Arduino, interfaçage de capteurs environnementaux, câblage d'armoires réseau, configuration de routeurs et switchboards.",
        "portfolio.btnCaseStudy": "Étude de cas &rarr;",
        "portfolio.btnFullGallery": "Galerie complète &rarr;",
        "portfolio.btnDemo": "Démo <span>↗</span>",
        "portfolio.btnPreview": "Aperçu <span>🔍</span>",
        "contact.emailDirectLabel": "Adresses Email",
        "contact.locDirectLabel": "Localisation &amp; Mobilité",
        "contact.locDirectSub": "Disponible en présentiel &amp; télétravail international",
        "contact.availLabel": "Disponibilité",
        "contact.availVal": "● Immédiate pour missions &amp; conseil",
        "contact.zoneMain": "Base Principale",
        "contact.zoneHub": "Pôle Économique &amp; IUT",
        "contact.zoneWorld": "Monde Entier",
        "contact.zoneNote": "Interventions sur site pour audit d'infrastructures et réunions stratégiques. Télétravail outillé (Slack, GitHub, Zoom, Jira) pour les missions longue durée.",
        "blog.authorBy": "✍️ Par NDE Jordan L.",
        "blog.authorRole1": "Développeur Logiciel &amp; Fondateur LaboGraphie",
        "blog.authorRole2": "Concepteur &amp; Développeur Full-Stack",
        "blog.authorRole3": "Concepteur &amp; Intégrateur SI",
        "blog.btnWhatsappDirect": "WhatsApp Direct 💬",
        "project.galleryHint": "Cliquez sur n'importe quelle capture pour l'ouvrir en haute définition.",
        "project.methodologyLabel": "Méthodologie",
        "project.methodologyVal": "Agile Scrum · Modélisation MERISE / UML",
        "project.requestQuoteBtn": "Demander un devis similaire",
        "project.bottomBackBtn": "&larr; Voir tous les projets",
        "project.bottomContactBtn": "Initier un projet avec Jordan &rarr;",
        "services.sch1Footer": "Support préventif &amp; curatif pour PME et structures",
        "services.sch2Footer": "Accompagnement pragmatique des professionnels",
        "contact.alertSuccess": "✓ Merci ! Votre message a été préparé. Vous allez être redirigé vers WhatsApp ou votre messagerie pour confirmation instantanée.",
        "portfolio.stat3Val": "Local-First",
        "portfolio.stat4Val": "Depuis 2019",
        "portfolio.btnTechStudy": "Étude technique &rarr;",
        "portfolio.btnSchema": "Schéma",
        "portfolio.ctaHeadlinePre": "Vous avez un projet similaire ?",
        "portfolio.ctaHeadlineOrange": "Donnons-lui vie ensemble.",
        "portfolio.ctaSubtext": "Qu'il s'agisse d'un ERP critique, d'une vitrine web moderne ou d'une identité de marque haut de gamme, discutons directement de votre cahier des charges.",
        "portfolio.btnDiscussWhatsapp": "Échanger sur WhatsApp &rarr;",
        "portfolio.btnDiscussQuote": "Demander un devis &rarr;",
        "aria.skipToContent": "Passer au contenu principal",
        "aria.searchProjects": "Rechercher un projet",
        "aria.newsletterEmail": "Votre adresse email pour un devis",
        "exp.iutCompany": "Institut Universitaire de Technologie (IUT) de Douala",
        "exp.siantouCompany": "Université Privée Siantou"
    },
    "en": {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.services": "Services",
        "nav.resume": "Resume",
        "nav.projects": "Portfolio",
        "nav.blog": "Blog",
        "nav.contact": "Contact",
        "aria.langSelect": "Language selector",
        "aria.langFr": "Switch to French",
        "aria.langEn": "Switch to English",
        "aria.langJa": "Switch to Japanese",
        "aria.clearSearch": "Clear search",
        "aria.prevSlide": "Previous project",
        "aria.nextSlide": "Next project",
        "meta.desc_index": "Portfolio of NDE Jordan Loïc — Software Developer & Graphic Designer. Founder of LaboGraphie. SaaS architectures, relational databases, and branding.",
        "meta.desc_services": "Engineering solutions and specialized services by NDE Jordan L.: software engineering, clinical LIMS databases, 3D packaging, networks, and IT support.",
        "meta.desc_portfolio": "Portfolio and works of NDE Jordan Loïc: production ERPs, strict relational databases, vector branding, and 3D industrial packaging.",
        "meta.desc_blog": "Technical articles, field notes, and software architecture analyses by NDE Jordan L.: resilient SaaS ERP, healthcare data integrity, and SQL modeling.",
        "meta.desc_contact": "Contact NDE Jordan Loïc for software engineering, database design, visual brand identity, or network maintenance. Response within 24 hours.",
        "meta.desc_project": "Detailed case study and technical architecture — NDE Jordan L., Software Developer & Graphic Designer.",
        "meta.desc_article": "Technical publication and engineering field notes — NDE Jordan L., Software Developer & Graphic Designer.",
        "hero.hello": "Hello !",
        "hero.intro": "I'm",
        "hero.role": "Software Developer & Graphic Designer",
        "hero.quote": "“Jordan's technical excellence and software architecture ensure the success of our projects in production. Highly recommended!”",
        "hero.portfolioBtn": "Portfolio",
        "hero.hireBtn": "Start a project",
        "hero.expLabel": "30+ Delivered Projects & Works",
        "why.titlePre": "Why",
        "why.titleOrange": "hire me?",
        "why.text": "Versatile and rigorous, I dedicate my expertise to software development, visual design, and network infrastructure. Certified in digital marketing by Google, I build robust systems and impactful brand identities.",
        "why.m1Label": "Verified projects & live demos",
        "why.m2Label": "3rd National Tech Award",
        "why.contactBtn": "Contact Me",
        "why.skillDB": "Database & SQL",
        "why.skillDesign": "Graphic Design & Flyers",
        "why.skillNetwork": "Networks & Security",
        "why.skillMaint": "IT Maintenance",
        "why.skillDev": "Embedded Systems",
        "why.skillLangs": "French · English · Japanese",
        "services.titlePre": "My",
        "services.titleOrange": "Services",
        "services.sub": "Software Developer & Graphic Designer · Founder of LaboGraphie: robust application design, relational databases, infrastructure, and visual creativity.",
        "services.s1Title": "Software Engineering & Web Apps",
        "services.s1Desc": "Full-cycle SaaS and ERP architecture design, microservices, RESTful APIs, and responsive applications with resilient offline synchronization.",
        "services.s2Title": "Databases & LIMS Systems",
        "services.s2Desc": "Rigorous relational data modeling (SQL/PostgreSQL), clinical sample tracking, transactional integrity, and high-performance query optimization.",
        "services.s3Title": "Graphic Design & Art Direction",
        "services.s3Desc": "Art direction, design system development, scalable vector logos, event flyers, and high-impact digital marketing assets.",
        "services.allServicesBtn": "Explore All 6 Engineering Domains & Specialized Solutions &rarr;",
        "services.heroBadge": "✦ Engineering Solutions & Services",
        "services.pageTitlePre": "Engineering Solutions &",
        "services.pageTitleOrange": "Specialized Services",
        "services.pageSubtitle": "From mission-critical software engineering to high-impact graphic design, explore my core domains of expertise.",
        "services.c1Badge": "AgroFlow ERP · Web Architecture",
        "services.c1Desc": "Custom design and full-cycle development of SaaS architectures, modular ERP platforms, and web applications built for resilience and offline operation.",
        "services.c1F1": "Modular SaaS & ERP architectures",
        "services.c1F2": "Strict relational SQL modeling (MERISE 3NF)",
        "services.c1F3": "High-performance and secure RESTful APIs",
        "services.c1F4": "Local-First offline synchronization (IndexedDB)",
        "services.c1Cta": "View Software Projects &rarr;",
        "services.c2Badge": "Candace Distribution · 3D Packaging",
        "services.c2Desc": "Creation of complete brand identities, scalable vector logos, 3D volumetric packaging modeling for bottles/cosmetics, and high-impact print media.",
        "services.c2F1": "3D modeling of cosmetic bottles, flacons & boxes",
        "services.c2F2": "Complete brand identities and visual style guides",
        "services.c2F3": "Promotional event posters and commercial flyers",
        "services.c2F4": "Large-format signage, expo booths & 3D roll-ups",
        "services.c2Cta": "Explore Graphic Gallery &rarr;",
        "services.c3Badge": "Sister Schola ERP · Clinical Management",
        "services.c3Desc": "Design of hospital information systems, relational data modeling guaranteeing transactional integrity, medical confidentiality, and centralized patient records.",
        "services.c3F1": "Admission management & electronic medical records",
        "services.c3F2": "Clinical traceability and consultation auditing",
        "services.c3F3": "High-consistency relational modeling (PostgreSQL/MySQL)",
        "services.c3F4": "Role-Based Access Control (RBAC)",
        "services.c3Cta": "Clinical Case Study &rarr;",
        "services.c4Badge": "Contextual illustration · Server rack",
        "services.c4Title": "Networks & Application Security",
        "services.c4Desc": "Deployment of reliable local enterprise networks, structured server rack cabling and patch panels, VLAN segmentation, and firewall access control.",
        "services.c4F1": "Structured cabling, labeling, and rack patching",
        "services.c4F2": "Configuration of managed switches and routers",
        "services.c4F3": "VLAN segmentation and firewall access control",
        "services.c4F4": "Network security audits and disaster recovery planning",
        "services.c4Cta": "Request Network Audit &rarr;",
        "services.c5Title": "IT Maintenance & Hardware Support",
        "services.c5Desc": "Thorough diagnostic of IT hardware fleets, preventive and corrective workstation maintenance, secure operating system deployment, and responsive support.",
        "services.c5F1": "Hardware diagnostics, component replacement & cleaning",
        "services.c5F2": "OS installation, hardening, and performance tuning",
        "services.c5F3": "Local and cloud backup protocol configuration",
        "services.c5F4": "On-site technical support and remote assistance",
        "services.c5Cta": "Technical Support &rarr;",
        "services.c6Title": "IT Consulting & AI-Powered Productivity",
        "services.c6Desc": "Advising professionals and businesses on selecting digital tools, automating repetitive workflows, and pragmatically integrating AI to boost productivity.",
        "services.c6F1": "Workflow audits and repetitive task identification",
        "services.c6F2": "Pragmatic guidance on AI assistants and generative tools",
        "services.c6F3": "Automated scripts and document processing pipelines",
        "services.c6F4": "Hands-on team training for fast and autonomous adoption",
        "services.c6Cta": "Automation Project &rarr;",
        "services.processBadge": "Proven Methodology",
        "services.processTitlePre": "How our collaboration",
        "services.processTitleOrange": "works",
        "services.processSubtitle": "From the initial consultation to final deployment and ongoing maintenance.",
        "services.step1Title": "Scoping & Listening",
        "services.step1Desc": "Thorough analysis of your needs, technical specifications drafting, and understanding of business constraints.",
        "services.step2Title": "Quotation & Architecture",
        "services.step2Desc": "Clear proposal with transparent timelines, interactive prototypes, or software architecture blueprints.",
        "services.step3Title": "Development & QA Testing",
        "services.step3Desc": "Rigorous development following industry standards, thorough quality assurance testing, and collaborative sprints.",
        "services.step4Title": "Delivery & Ongoing Support",
        "services.step4Desc": "Secure production deployment, handover of tested code or vector assets, and extended technical warranty.",
        "services.pricingBadge": "Transparency & Flexibility",
        "services.pricingTitlePre": "Tailored collaboration",
        "services.pricingTitleOrange": "packages",
        "services.pricingSubtitle": "Flexible options calibrated for businesses, startups, medical practices, and project creators.",
        "services.plan1Name": "One-Time Assignment",
        "services.plan1Desc": "Ideal for focused deliverables: flyer, logo, network audit, or standalone software feature.",
        "services.plan1F1": "Clearly defined specifications",
        "services.plan1F2": "Turnkey deliverables within 2 to 7 days",
        "services.plan1F3": "Revisions included",
        "services.plan1F4": "Source files delivered (Code or Vectors)",
        "services.plan1Cta": "Request a quote",
        "services.plan2Badge": "Recommended",
        "services.plan2Name": "Turnkey Project",
        "services.plan2Desc": "Ideal for end-to-end ERP development, SaaS platforms, 360° brand identity, or full IT setups.",
        "services.plan2F1": "End-to-end guidance (Architecture + Dev + QA)",
        "services.plan2F2": "Production deployment (Vercel, Docker, Server)",
        "services.plan2F3": "Offline-first resilience and relational SQL",
        "services.plan2F4": "Extended 30-day technical warranty & support",
        "services.plan2Cta": "Start my project &rarr;",
        "services.plan3Name": "Retainer & Maintenance",
        "services.plan3Desc": "Ideal for organizations needing continuous technical support or ongoing graphic design.",
        "services.plan3F1": "Priority technical support (24/48h)",
        "services.plan3F2": "Preventive application & workstation maintenance",
        "services.plan3F3": "Ongoing graphic asset design for campaigns",
        "services.plan3F4": "Continuous security & performance optimization",
        "services.plan3Cta": "Discuss a contract",
        "services.faqBadge": "Frequently Asked Questions",
        "services.faqTitlePre": "Everything you need to",
        "services.faqTitleOrange": "know",
        "services.faqQ1": "What are your typical turnaround times?",
        "services.faqA1": "For graphic design (logos, flyers, posters), initial concepts are usually delivered within 48 to 72 hours. For full-scale applications and ERP systems, timelines range from 2 to 6 weeks depending on architectural complexity.",
        "services.faqQ2": "Can you work remotely or only on-site in Yaoundé?",
        "services.faqA2": "I operate both on-site in Yaoundé and Douala for infrastructure, cabling, and physical hardware maintenance, and remotely for software development, database design, and branding for global clients.",
        "services.faqQ3": "How do you guarantee security and data confidentiality?",
        "services.faqA3": "Every system built (especially clinical platforms like Sister Schola or enterprise ERPs like AgroFlow) enforces least-privilege security, sensitive payload encryption, and strict professional secrecy. Non-disclosure agreements (NDAs) are routinely signed before project kickoff.",
        "services.faqQ4": "What payment methods are accepted?",
        "services.faqA4": "Payments typically involve a startup deposit with the balance due upon final validated delivery. Accepted methods include bank transfers, Orange Money, MTN Mobile Money, and international remittance channels.",
        "services.ctaHeadlinePre": "Need software engineering or graphic design?",
        "services.ctaHeadlineOrange": "Let's discuss your project today",
        "services.ctaWaBtn": "Chat directly on WhatsApp &rarr;",
        "services.ctaFormBtn": "Complete estimate form",
        "exp.titlePre": "My",
        "exp.titleOrange": "Work Experience & Education",
        "exp.siantouDiploma": "BTS in Software Engineering and Database (GLBD)",
        "exp.siantouRole": "BTS in Software Engineering and Database (GLBD)",
        "exp.siantouDesc": "Two-year higher education program in Software Engineering and Database (GLBD) at Université Privée Siantou (2024–2025): relational database modeling (SQL, MERISE), software programming, applied algorithms, and systems administration.",
        "exp.iutDiploma": "Bachelor of Technology in Software Engineering",
        "exp.iutRole": "Bachelor of Technology in Software Engineering",
        "exp.iutDesc": "Undergraduate degree program (Bac+3) in Software Engineering at the University Institute of Technology (IUT) of Douala (2025–2026): advanced software architecture, relational database modeling (MERISE 3NF), Docker containerization, and resilient web platforms.",
        "exp.leguideDiploma": "Graphic Design, Media & HR",
        "exp.leguideRole": "Graphic Designer, Videographer & HR Assistant",
        "exp.leguideDesc": "Brand visual identities, vector logos, and promotional assets. Video production for LeGuide Informatique. HR workflows at Polytech-Valor.",
        "exp.ambamDiploma": "Mathematics & Bac C (Exact Sciences)",
        "exp.ambamRole": "Foundational Mathematics & First Web Projects",
        "exp.ambamDesc": "Two foundational years of pure mathematics at University of Yaoundé I (algorithmic rigor). Baccalauréat C at Mendong (2021). First web project in 2017 for Ambam Bilingual High School.",
        "exp.cvBtn": "Download My Full Resume (PDF)",
        "portfolio.headPre": "Explore",
        "portfolio.headSub": "my",
        "portfolio.headOrange": "Portfolio",
        "portfolio.seeAll": "View All",
        "portfolio.tabAll": "All Projects",
        "portfolio.tabDev": "Software Eng. & ERP",
        "portfolio.tabDesign": "Graphic Design & Art",
        "portfolio.tabSystems": "Systems & Networks",
        "portfolio.liveBtn": "Live Demo →",
        "portfolio.sourceBtn": "GitHub Source Code",
        "portfolio.detailsBtn": "Case Study 📖",
        "portfolio.heroBadge": "✦ Deployed Projects & Creative Works",
        "portfolio.pageTitlePre": "Selected Works,",
        "portfolio.pageTitleOrange": "SaaS & 3D Packaging",
        "portfolio.pageSubtitle": "Production ERPs, strict relational databases, vector brand identities, and industrial packaging 3D modeling.",
        "portfolio.stat1Label": "Case Studies & Live Demos",
        "portfolio.stat2Label": "Brands & 30+ Creative Works",
        "portfolio.stat3Label": "Offline-First & SQL Integrity",
        "portfolio.stat4Label": "Continuous Engineering Practice",
        "portfolio.competenciesTitle": "Core Competencies Demonstrated Across These Works",
        "portfolio.searchPlaceholder": "Search (ERP, Candace, Petit Colis, SQL, Logo...)",
        "portfolio.emptyTitle": "No project found",
        "portfolio.emptyText": "No projects match your filter criteria or search keyword.",
        "portfolio.emptyReset": "Reset all filters",
        "portfolio.galleryTitle": "Full Graphic Design, 3D Packaging & Branding Gallery",
        "portfolio.gallerySubtitle": "Explore all 33 authentic design assets produced for businesses and institutions: 3D product packaging mockups, corporate brand identities, and professional print materials.",
        "portfolio.filterAll": "All Visuals (33)",
        "portfolio.filterPackaging": "3D Packaging Modeling",
        "portfolio.filterLogos": "Logos & Vector Identities",
        "portfolio.filterAffiches": "Posters, Roll-ups & Print",
        "portfolio.filterInfra": "Networks & Infrastructure",
        "testi.titlePre": "Those Who",
        "testi.titleOrange": "Trusted My Work",
        "testi.sub": "Endorsements from research professors, education inspectors, tech teammates, and founders who validated my engineering precision.",
        "testi.autoScroll": "Auto-scroll active",
        "testi.t1Role": "Professor of Networks & Security",
        "testi.t1Text": "“Jordan demonstrates remarkable mastery of network architectures, application security, and engineering collaboration. A methodical, autonomous technologist.”",
        "testi.t2Role": "National Inspector of Mathematics · MINESEC",
        "testi.t2Text": "“Exceptional logical precision and analytical rigor inherited from advanced mathematics. Jordan turns complex conceptual models into reliable operational software.”",
        "testi.t3Role": "Founder · Petit Colis",
        "testi.t3Text": "“For visual communications and recruitment campaigns at Petit Colis, Jordan's graphic craftsmanship and active listening were pivotal. Fast, thorough, and highly professional.”",
        "testi.t4Role": "Engineering Student · Polytech Yaoundé",
        "testi.t4Text": "“Working with Jordan is a true asset: his analytical acumen, pixel-level precision, and mathematical rigor elevate complex software models.”",
        "testi.t5Role": "Management · Egesol SARL",
        "testi.t5Text": "“Jordan blends high-impact visual creativity with technical rigor. The graphic assets and solutions delivered met our highest standards of professional excellence.”",
        "testi.t6Role": "Data Analyst · Data Systems",
        "testi.t6Text": "“The SQL database architectures and data models built by Jordan on ERP platforms are remarkably clean. Querying and building upon his pipelines is a joy.”",
        "discuss.headPre": "Have an Awesome Project Idea?",
        "discuss.headOrange": "Let's Discuss Your Project",
        "discuss.placeholder": "Enter your email address...",
        "discuss.sendBtn": "Send",
        "discuss.b1": "Quality & Software Architecture",
        "discuss.b2": "National Tech Award",
        "discuss.b3Cert": "Certified",
        "discuss.b3": "Digital Marketing (Google)",
        "blog.headPre": "From my",
        "blog.headOrange": "blog & publications",
        "blog.heroBadge": "✦ Field Notes &amp; Tech Insights",
        "blog.pageTitlePre": "Technical Insights &",
        "blog.pageTitleOrange": "Publications",
        "blog.pageSubtitle": "Field-tested architectural notes, resilient databases, and software engineering in constrained connectivity.",
        "blog.readMore": "Read full article &rarr;",
        "blog.readTime7": "7 min read",
        "blog.readTime9": "9 min read",
        "blog.readTime6": "6 min read",
        "blog.a1Date": "October 18, 2026",
        "blog.a2Date": "September 24, 2026",
        "blog.a3Date": "August 12, 2026",
        "blog.a1Tag": "Software Architecture",
        "blog.a1Title": "Engineering a modular and resilient software architecture in intermittent connectivity environments",
        "blog.a1Desc": "How to guarantee conflict-free bidirectional synchronization between client IndexedDB cache and a central PostgreSQL database during power and network outages.",
        "blog.a2Tag": "AgriTech & SaaS ERP",
        "blog.a2Title": "AgroFlow: From UML/SQL modeling to a high-availability agricultural SaaS ERP",
        "blog.a2Desc": "Case study on normalizing agricultural plot relational schemas, B-Tree index tuning, and instant operational balance generation for farm cooperatives.",
        "blog.a3Tag": "Healthcare & Clinical",
        "blog.a3Title": "Sister Schola & LIMS Traceability: Safeguarding patient privacy and hospital workflow consistency",
        "blog.a3Desc": "Implementing strict security protocols (RBAC, tamper-evident audit logs) for digitizing clinical laboratories and patient hospital admissions.",
        "blog.discussBoxTitle": "Facing an architectural challenge on your project?",
        "blog.discussBoxDesc": "Need an external review of your relational schemas, framework selection, or security policies? Let's discuss your specific use case.",
        "blog.discussBoxBtn": "Book a Consultation &rarr;",
        "blog.langNotice": "[Article written in French · Practical field insights]",
        "contact.heroBadge": "✦ Direct Consultation & Free Estimate",
        "contact.pageTitlePre": "Let's Discuss",
        "contact.pageTitleOrange": "Your Project",
        "contact.pageSubtitle": "An idea, specifications, or need for software engineering and graphic design expertise? Let's discuss practically.",
        "contact.stayInTouch": "Let's Stay in Touch",
        "contact.stayInTouchDesc": "I personally respond to all technical and commercial inquiries within 24 business hours.",
        "contact.whatsappDirect": "Start a direct WhatsApp chat",
        "contact.zoneTitle": "Service Coverage",
        "contact.zoneSub": "Cameroon & Global Remote",
        "contact.availTitle": "Immediate Availability",
        "contact.availDesc": "Currently open for software engineering, database modeling, and graphic design assignments.",
        "contact.formTitle": "Send a Message",
        "contact.formSub": "Provide your project details to receive tailored feedback and a preliminary quote within 24h.",
        "contact.nameLabel": "Full Name *",
        "contact.namePlaceholder": "Your full name",
        "contact.emailLabel": "Email Address *",
        "contact.emailPlaceholder": "your.email@domain.com",
        "contact.phoneLabel": "Phone &amp; WhatsApp",
        "contact.phonePlaceholder": "e.g. +237 670 00 00 00",
        "contact.serviceLabel": "Desired Expertise Domain *",
        "contact.serviceSelectDefault": "Select a domain...",
        "contact.serviceOptSoftware": "Software Engineering & SaaS ERP",
        "contact.serviceOptInfographie": "Graphic Design & Brand Identity",
        "contact.serviceOptSystems": "Systems Maintenance & Networks",
        "contact.serviceOptConsulting": "IT Consulting & Architecture Audit",
        "contact.serviceOptOther": "Other collaboration",
        "contact.budgetLabel": "Estimated Budget Range",
        "contact.budgetOptFlexible": "To be determined together",
        "contact.budgetOptTier1": "< 150,000 FCFA (~$250)",
        "contact.budgetOptTier2": "150,000 - 500,000 FCFA (~$250 - $850)",
        "contact.budgetOptTier3": "500,000 - 1,500,000 FCFA (~$850 - $2,500)",
        "contact.budgetOptTier4": "> 1,500,000 FCFA (Enterprise Scale)",
        "contact.messageLabel": "Project Details or Specifications *",
        "contact.messagePlaceholder": "Describe your expected features, timeline constraints, and project context...",
        "contact.fileLabel": "Attachment / Specifications (Optional)",
        "contact.fileDropText": "Drag & drop your brief, specs or mockups (PDF, DOCX, ZIP max 15 MB) or <strong style=\"color: var(--figma-orange); text-decoration: underline; cursor: pointer;\">browse</strong>",
        "contact.privacyNote": "🔒 <strong>Privacy & Security:</strong> Your contact details and submitted files remain strictly confidential and will never be shared with third parties.",
        "contact.submitBtn": "Send my request",
        "contact.faqBadge": "✦ Frequently Asked Questions",
        "contact.collabTitlePre": "Collaboration",
        "contact.collabTitleOrange": "Modalities",
        "contact.q1": "How does the first technical consultation work?",
        "contact.a1": "Upon reviewing your inquiry, we schedule a 30-minute scoping call (Google Meet, WhatsApp, or on-site in Yaoundé/Douala) to clarify requirements and prepare a transparent estimate.",
        "contact.q2": "Do you offer maintenance after project delivery?",
        "contact.a2": "Yes. Every software delivery includes a post-launch warranty. I also provide monthly retainer maintenance contracts for continuous reliability.",
        "contact.q3": "Do you collaborate with international clients?",
        "contact.a3": "Absolutely. I regularly collaborate with international teams and clients via structured workflows (Git, Jira, clear documentation, and scheduled syncs).",
        "contact.q4": "What payment options are available?",
        "contact.a4": "Payments can be processed via direct bank wire, Orange Money, MTN Mobile Money, or international transfer solutions based on agreed milestones.",
        "project.backLink": "&larr; Back to Portfolio",
        "project.sectionContext": "1. Context & Business Problem",
        "project.sectionArch": "2. Technical Architecture & Tech Choices",
        "project.sectionGallery": "3. Screenshots & Architecture Schematics",
        "project.sectionResults": "4. Measured Results & Operational Impact",
        "project.specsTitle": "Project Specifications",
        "project.clientLabel": "Organization / Client",
        "project.industryLabel": "Industry Domain",
        "project.durationLabel": "Execution Duration",
        "project.roleLabel": "Role of NDE Jordan L.",
        "project.techStackLabel": "Validated Tech Stack",
        "project.notFoundTitle": "Project Not Found",
        "project.notFoundSummary": "The requested project ID does not exist or has been moved. Please browse our portfolio catalog to discover all delivered projects.",
        "project.notFoundBtn": "&larr; Return to project catalog",
        "article.authorRole": "Software Engineering Technologist · IUT Douala",
        "article.relatedTitle": "✦ Related Project & Case Study",
        "article.demoBtn": "Test Live Demo ↗",
        "article.caseBtn": "Read Full Case Study &rarr;",
        "article.whatsappDiscuss": "💬 Discuss on WhatsApp",
        "article.newsletterTitle": "Receive my upcoming technical publications",
        "article.newsletterSub": "Subscribe to receive directly via email my field notes on software engineering, network security, and systems architecture.",
        "article.newsletterPlaceholder": "Your professional email...",
        "article.subscribeBtn": "Subscribe",
        "article.notFoundTitle": "Publication Not Found",
        "article.notFoundDesc": "The requested publication does not exist or has been moved. Please visit our blog archive to explore all field notes and technical publications.",
        "article.notFoundBtn": "&larr; Return to publications",
        "footer.connectTitle": "Let's Connect Here",
        "footer.hireBtn": "Start a project",
        "footer.bio": "Software Developer & Graphic Designer, graduate from IUT Douala and certified in digital marketing (Google). Founder of LaboGraphie, specialized in application design, infrastructure, and visual branding.",
        "footer.navTitle": "Navigation",
        "footer.contactTitle": "Contact Info",
        "footer.location": "<span>📍 Yaoundé, Cameroon</span>",
        "footer.stayConnected": "Stay Connected",
        "footer.placeholder": "Your email address...",
        "footer.quickQuote": "Quick Estimate Request",
        "footer.copyright": "Copyright © 2026 NDE Jordan L. · LaboGraphie Dev. All Rights Reserved.",
        "footer.terms": "Terms of Use",
        "footer.privacy": "Privacy Policy",
        "pageTitle.index": "NDE Jordan L. | Full-Stack Developer & Software Engineering Technologist",
        "pageTitle.services": "Services & Solutions — NDE Jordan L. · Technologist & Full-Stack Developer",
        "pageTitle.portfolio": "Portfolio & Selected Works — NDE Jordan L. · Technologist & Full-Stack Developer",
        "pageTitle.blog": "Tech Blog & Publications — NDE Jordan L. · Technologist & Full-Stack Developer",
        "pageTitle.contact": "Contact & Estimate — NDE Jordan L. · Technologist & Full-Stack Developer",
        "why.m1Val": "Open Source",
        "why.m2Val": "National Award",
        "exp.session2026": "2025–2026",
        "exp.session2025": "2024–2025",
        "portfolio.dom1Title": "Software &amp; Web Development",
        "portfolio.dom1Desc": "SaaS architectures, Vanilla JS, React, Node.js, reactive interfaces, and resilient offline-first sync (AgroFlow, Sister Schola).",
        "portfolio.dom2Title": "Infrastructure, DevOps &amp; Systems",
        "portfolio.dom2Desc": "Relational databases PostgreSQL/MySQL (MERISE 3NF), Docker containers, Vercel cloud hosting, and transactional integrity.",
        "portfolio.dom3Title": "UI/UX &amp; Graphic Design",
        "portfolio.dom3Desc": "Vector design in Illustrator, 3D bottle packaging modeling, product mockups, and corporate brand identities (Candace, LaboGraphie).",
        "portfolio.dom4Title": "IT Consulting &amp; IS Advisory",
        "portfolio.dom4Desc": "Requirements scoping, conceptual data modeling (MCD/MLD), technical specifications authoring, and architectural alignment.",
        "portfolio.dom5Title": "Digital Marketing &amp; Strategy",
        "portfolio.dom5Desc": "Content strategy, Google digital marketing certification, visual brand communications, and local tech community leadership.",
        "portfolio.dom6Title": "IT Maintenance &amp; Networking",
        "portfolio.dom6Desc": "Structured patch panel cabling, VLAN/Cisco subnetting, preventive/curative hardware maintenance, and Arduino integration.",
        "portfolio.cardAgroBadge": "ERP &amp; AgriTech (Prototype)",
        "portfolio.cardAgroDesc": "SaaS ERP prototype for farm operators. Plot digitization, harvest tracking, real-time financial balance, and resilient offline-first mode.",
        "portfolio.cardSisterBadge": "Healthcare &amp; LIMS (Prototype)",
        "portfolio.cardSisterDesc": "Hospital ERP and clinical management prototype. Full patient journey tracking, admissions handling, prescriptions, and secure clinical workflows.",
        "portfolio.cardCandaceBadge": "Branding &amp; Packaging",
        "portfolio.cardCandaceDesc": "Art direction, 3D packaging modeling for Candace cosmetics line, and high-impact recruitment poster campaigns for Petit Colis logistics startup.",
        "portfolio.cardLaboBadge": "LaboGraphie Collective",
        "portfolio.cardLaboDesc": "Interactive portal and showcase for software and creative solutions by the LaboGraphie collective. Modular Vanilla JS architecture and peak performance.",
        "portfolio.cardAcuveraBadge": "Client Project · Dr. Zemzi",
        "portfolio.cardAcuveraDesc": "Showcase website and biomedical test tracking portal engineered for Dr. Zemzi's clinic (billed at 40,000 FCFA). Secure laboratory results lookup.",
        "portfolio.cardArduinoBadge": "Systems &amp; Networks",
        "portfolio.cardArduinoDesc": "Arduino microcontroller programming, environmental sensor interfacing, server rack cabling, router and switchboard configuration.",
        "portfolio.btnCaseStudy": "Case study &rarr;",
        "portfolio.btnFullGallery": "Full gallery &rarr;",
        "portfolio.btnDemo": "Demo <span>↗</span>",
        "portfolio.btnPreview": "Preview <span>🔍</span>",
        "contact.emailDirectLabel": "Email Addresses",
        "contact.locDirectLabel": "Location &amp; Mobility",
        "contact.locDirectSub": "Available on-site &amp; international remote",
        "contact.availLabel": "Availability",
        "contact.availVal": "● Immediate for consulting &amp; projects",
        "contact.zoneMain": "Main Base",
        "contact.zoneHub": "Economic Hub &amp; IUT",
        "contact.zoneWorld": "Worldwide",
        "contact.zoneNote": "On-site visits for infrastructure audits and technical planning. Tool-assisted remote work (Slack, GitHub, Zoom, Jira) for ongoing contracts.",
        "blog.authorBy": "✍️ By NDE Jordan L.",
        "blog.authorRole1": "Software Developer &amp; Founder LaboGraphie",
        "blog.authorRole2": "Lead Designer &amp; Full-Stack Developer",
        "blog.authorRole3": "IS Architect &amp; Systems Integrator",
        "blog.btnWhatsappDirect": "Direct WhatsApp 💬",
        "project.galleryHint": "Click on any screenshot to view in high definition.",
        "project.methodologyLabel": "Methodology",
        "project.methodologyVal": "Agile Scrum · MERISE / UML Modeling",
        "project.requestQuoteBtn": "Request a similar estimate",
        "project.bottomBackBtn": "&larr; View all projects",
        "project.bottomContactBtn": "Start a project with Jordan &rarr;",
        "services.sch1Footer": "Preventive &amp; corrective support for businesses",
        "services.sch2Footer": "Pragmatic support for business teams",
        "contact.alertSuccess": "✓ Thank you! Your message has been prepared. You will be redirected to WhatsApp or email for instant confirmation.",
        "portfolio.stat3Val": "Local-First",
        "portfolio.stat4Val": "Since 2019",
        "portfolio.btnTechStudy": "Technical study &rarr;",
        "portfolio.btnSchema": "Diagram",
        "portfolio.ctaHeadlinePre": "Have a similar project in mind?",
        "portfolio.ctaHeadlineOrange": "Let's bring it to life together.",
        "portfolio.ctaSubtext": "Whether it's a critical ERP system, a modern website showcase, or a premium visual identity, let's discuss your requirements directly.",
        "portfolio.btnDiscussWhatsapp": "Chat on WhatsApp &rarr;",
        "portfolio.btnDiscussQuote": "Request a quote &rarr;",
        "aria.skipToContent": "Skip to main content",
        "aria.searchProjects": "Search projects",
        "aria.newsletterEmail": "Your email address for a quote",
        "exp.iutCompany": "University Institute of Technology (IUT) of Douala",
        "exp.siantouCompany": "Université Privée Siantou"
    },
    "ja": {
        "nav.home": "ホーム",
        "nav.about": "プロフィール",
        "nav.services": "サービス",
        "nav.resume": "経歴・学歴",
        "nav.projects": "実績・作品",
        "nav.blog": "ブログ",
        "nav.contact": "お問い合わせ",
        "aria.langSelect": "言語選択",
        "aria.langFr": "フランス語に切り替え",
        "aria.langEn": "英語に切り替え",
        "aria.langJa": "日本語に切り替え",
        "aria.clearSearch": "検索をクリア",
        "aria.prevSlide": "前のプロジェクト",
        "aria.nextSlide": "次のプロジェクト",
        "meta.desc_index": "NDE Jordan Loïcのポートフォリオ — ソフトウェア開発者・グラフィックデザイナー。LaboGraphie創設者。SaaS Webアーキテクチャ、リレーショナルデータベース、ブランド設計。",
        "meta.desc_services": "NDE Jordan L.によるエンジニアリングソリューション＆専門サービス：ソフトウェア工学、臨床LIMSデータベース、3Dパッケージデザイン、ネットワーク構築、IT保守。",
        "meta.desc_portfolio": "NDE Jordan Loïcの実績・作品集：本番稼働ERP、厳密なリレーショナル設計、ベクターアイデンティティ、工業3Dパッケージング。",
        "meta.desc_blog": "NDE Jordan L.による技術記事・実務レポート：高信頼性SaaS ERP、医療データ整合性、SQLモデリング。",
        "meta.desc_contact": "ソフトウェア開発、データベース設計、ブランドデザイン、ネットワーク保守に関するお問い合わせ。24時間以内にご返答いたします。",
        "meta.desc_project": "詳細ケーススタディおよび技術アーキテクチャ — NDE Jordan L.、ソフトウェア開発者・グラフィックデザイナー。",
        "meta.desc_article": "技術論文および実務設計レポート — NDE Jordan L.、ソフトウェア開発者・グラフィックデザイナー。",
        "hero.hello": "こんにちは！",
        "hero.intro": "私は",
        "hero.role": "ソフトウェア開発者・グラフィックデザイナー",
        "hero.quote": "「Jordanの卓越した技術力とアーキテクチャ設計は、本番プロジェクトの成功を確実に支えてくれます。心から推薦します！」",
        "hero.portfolioBtn": "実績を見る",
        "hero.hireBtn": "プロジェクトを依頼",
        "hero.expLabel": "30件以上の納品実績・実案件",
        "why.titlePre": "選ばれる",
        "why.titleOrange": "理由",
        "why.text": "多才さと論理的緻密さを兼ね備え、ソフトウェア開発、グラフィックデザイン、ネットワークインフラの領域で価値を提供します。Googleデジタルマーケティング認定を保有し、長期稼働に耐えうる情報システムと印象的なブランドアイデンティティを構築します。",
        "why.m1Label": "オンラインで検証可能な実績デモ",
        "why.m2Label": "全国技術コンテスト第3位受賞",
        "why.contactBtn": "お問い合わせ",
        "why.skillDB": "データベース & SQL",
        "why.skillDesign": "グラフィック & DTP",
        "why.skillNetwork": "ネットワーク & セキュリティ",
        "why.skillMaint": "IT保守・ハードウェア",
        "why.skillDev": "組込みシステム & IoT",
        "why.skillLangs": "フランス語 · 英語 · 日本語",
        "services.titlePre": "提供",
        "services.titleOrange": "サービス",
        "services.sub": "ソフトウェア開発者・グラフィックデザイナー · LaboGraphie創設者：高信頼性アプリケーション設計、リレーショナルデータベース、ITインフラ、および高品質な視覚表現。",
        "services.s1Title": "ソフトウェア工学・Webアプリケーション",
        "services.s1Desc": "SaaSおよびERPアーキテクチャの総合設計、マイクロサービス、RESTful API構築、および強固なオフライン同期機能の実装。",
        "services.s2Title": "データベース・臨床LIMSシステム",
        "services.s2Desc": "厳密なSQLリレーショナルデータモデリング、トランザクション整合性、患者電子カルテの一元管理および臨床検査フローの統合。",
        "services.s3Title": "グラフィックデザイン・アートディレクション",
        "services.s3Desc": "アートディレクション、ブランドガイドライン策定、ベクターロゴ作成、イベントポスターおよび販促用印刷物デザイン。",
        "services.allServicesBtn": "全6領域の専門ソリューションを見る &rarr;",
        "services.heroBadge": "✦ エンジニアリングソリューション & 専門サービス",
        "services.pageTitlePre": "エンジニアリング &",
        "services.pageTitleOrange": "専門ソリューション",
        "services.pageSubtitle": "基幹ソフトウェアの設計から印象的なビジュアル制作まで、対応可能な専門領域をご紹介します。",
        "services.c1Badge": "AgroFlow ERP · Webアーキテクチャ",
        "services.c1Desc": "オフライン稼働と高い耐障害性を備えた、SaaSアーキテクチャ、モジュール型ERP、およびカスタムWebアプリケーションの設計・開発。",
        "services.c1F1": "モジュール型SaaS & ERPアーキテクチャ",
        "services.c1F2": "厳密なリレーショナルSQL設計（第3正規形）",
        "services.c1F3": "セキュアで高速なRESTful API構築",
        "services.c1F4": "IndexedDBを活用したローカルファースト同期",
        "services.c1Cta": "開発実績を見る &rarr;",
        "services.c2Badge": "Candace Distribution · 3Dパッケージ",
        "services.c2Desc": "総合ブランドアイデンティティ、ベクターロゴ、化粧品ボトル等の3Dパッケージモデリング、および訴求力の高い販促物の制作。",
        "services.c2F1": "ボトル・化粧品容器・外箱の3Dモデリング",
        "services.c2F2": "ロゴおよびブランドガイドライン策定",
        "services.c2F3": "イベントポスター・商業用チラシ制作",
        "services.c2F4": "大型サイン・展示ブース・ロールアップバナー",
        "services.c2Cta": "グラフィックギャラリーを見る &rarr;",
        "services.c3Badge": "Sister Schola ERP · 臨床管理",
        "services.c3Desc": "医療機関向け情報システムの設計。トランザクション整合性、患者カルテの一元管理、守秘義務の遵守を支える強固なデータベース構築。",
        "services.c3F1": "受付管理・電子カルテ管理",
        "services.c3F2": "診療行為のトレーサビリティ・監査ログ",
        "services.c3F3": "高一貫性リレーショナルモデリング（PostgreSQL/MySQL）",
        "services.c3F4": "ロール別アクセス制御（RBAC）",
        "services.c3Cta": "臨床ケーススタディ &rarr;",
        "services.c4Badge": "イメージ写真 · サーバーラック",
        "services.c4Title": "ネットワーク & アプリケーションセキュリティ",
        "services.c4Desc": "信頼性の高い社内ネットワーク構築、サーバーラック配線・パッチパネル施工、VLANセグメンテーション、ファイアウォール設定。",
        "services.c4F1": "構造化配線・識別ラベリング・パッチ作業",
        "services.c4F2": "マネージドスイッチ・ルーター設定",
        "services.c4F3": "VLANセグメント化・ファイアウォール設定",
        "services.c4F4": "脆弱性監査・ディザスタリカバリ計画",
        "services.c4Cta": "ネットワーク監査を依頼 &rarr;",
        "services.c5Title": "IT保守・ハードウェアサポート",
        "services.c5Desc": "PC・IT機器の総合診断、定期点検およびトラブルシューティング、OSのセキュアな導入・設定、迅速なテクニカルサポート。",
        "services.c5F1": "ハードウェア診断・部品交換・内部清掃",
        "services.c5F2": "OSのクリーンインストール・セキュリティ強化",
        "services.c5F3": "ローカル & クラウド自動バックアップ導入",
        "services.c5F4": "現地訪問サポート & リモート遠隔支援",
        "services.c5Cta": "サポートを依頼 &rarr;",
        "services.c6Title": "ITコンサルティング・AI業務効率化",
        "services.c6Desc": "業務プロセスのデジタル化支援、反復作業の自動化スクリプト開発、および生成AIツールを実務に定着させるための実践的コンサルティング。",
        "services.c6F1": "業務フロー分析・反復課題の洗い出し",
        "services.c6F2": "生成AI・業務アシスタントの適切な選定",
        "services.c6F3": "文書処理自動化スクリプト・パイプライン構築",
        "services.c6F4": "現場スタッフ向けの実践トレーニング",
        "services.c6Cta": "自動化の相談をする &rarr;",
        "services.processBadge": "実績ある開発プロセス",
        "services.processTitlePre": "開発・制作の",
        "services.processTitleOrange": "進め方",
        "services.processSubtitle": "最初のご相談から本番運用、納品後のサポートまでの明確な流れ。",
        "services.step1Title": "要件定義・ヒアリング",
        "services.step1Desc": "お客様のご要望とビジネス課題を丁寧にヒアリングし、技術仕様と制約条件を明確化します。",
        "services.step2Title": "見積・設計・デザイン",
        "services.step2Desc": "透明性のある見積と工程表を提示し、UIモックアップやアーキテクチャ設計図を作成します。",
        "services.step3Title": "実装・検証テスト",
        "services.step3Desc": "業界標準に準拠した堅牢なコーディング、綿密な動作検証、および進捗共有を行います。",
        "services.step4Title": "納品・保守サポート",
        "services.step4Desc": "セキュアな本番環境デプロイ、ソースコード・成果物の完全納品、および保守対応を行います。",
        "services.pricingBadge": "明朗な料金体系",
        "services.pricingTitlePre": "柔軟な",
        "services.pricingTitleOrange": "契約プラン",
        "services.pricingSubtitle": "中小企業、スタートアップ、クリニック、個人事業主のニーズに合わせた柔軟なプラン。",
        "services.plan1Name": "スポット案件",
        "services.plan1Desc": "ロゴ制作、チラシ、ネットワーク点検、単体機能開発など、特定の納品物に適したプラン。",
        "services.plan1F1": "明確な仕様定義",
        "services.plan1F2": "2〜7営業日での迅速な納品",
        "services.plan1F3": "修正対応込み",
        "services.plan1F4": "ソースデータ完全納品（コード / ベクター）",
        "services.plan1Cta": "見積を依頼",
        "services.plan2Badge": "おすすめ",
        "services.plan2Name": "フルプロジェクト",
        "services.plan2Desc": "ERP・SaaS開発、総合リブランディング、社内インフラ構築など、設計から運用まで完結するプラン。",
        "services.plan2F1": "要件定義から設計・開発・テストまで一貫対応",
        "services.plan2F2": "本番デプロイ（Vercel, Docker, サーバー）",
        "services.plan2F3": "オフライン対応 & リレーショナルSQL構築",
        "services.plan2F4": "30日間の無償技術保証・サポート付き",
        "services.plan2Cta": "プロジェクトを開始 &rarr;",
        "services.plan3Name": "定期保守・顧問契約",
        "services.plan3Desc": "月次のシステム保守、定期的な販促物デザイン、IT運用支援を継続的に任せたい企業向けプラン。",
        "services.plan3F1": "優先テクニカルサポート（24〜48時間以内対応）",
        "services.plan3F2": "アプリケーション・IT機器の定期予防点検",
        "services.plan3F3": "各種キャンペーン向け印刷物・画像の継続制作",
        "services.plan3F4": "継続的なセキュリティおよび表示速度の改善",
        "services.plan3Cta": "プランを相談する",
        "services.faqBadge": "よくあるご質問",
        "services.faqTitlePre": "ご契約・制作に関する",
        "services.faqTitleOrange": "Q&A",
        "services.faqQ1": "納期の目安はどのくらいですか？",
        "services.faqA1": "ロゴやポスター、チラシ等のグラフィック制作は通常48〜72時間以内に初稿をご提案します。WebアプリケーションやERPシステムは規模に応じて2〜6週間程度となります。",
        "services.faqQ2": "遠隔（リモート）での依頼も可能ですか？",
        "services.faqA2": "ヤウンデおよびドゥアラでのオンサイト対応（配線・機器点検）はもちろん、ソフトウェア開発やデザインは国内外のクライアントと完全リモートで円滑に進行可能です。",
        "services.faqQ3": "データのセキュリティや機密保持はどうなっていますか？",
        "services.faqA3": "医療システム（Sister Schola）や業務ERP（AgroFlow）等において、最小権限の原則、通信暗号化、厳格な守秘義務を徹底しています。着手前の秘密保持契約（NDA）締結も対応可能です。",
        "services.faqQ4": "支払い方法には何がありますか？",
        "services.faqA4": "着手金と納品完了時の残金決済を基本としています。銀行振込、Orange Money、MTN Mobile Money、および海外送金に対応しています。",
        "services.ctaHeadlinePre": "開発・デザインのご相談は",
        "services.ctaHeadlineOrange": "お気軽にお問い合わせください",
        "services.ctaWaBtn": "WhatsAppで直接相談 &rarr;",
        "services.ctaFormBtn": "見積フォームへ進む",
        "exp.titlePre": "私の",
        "exp.titleOrange": "経歴・学歴",
        "exp.siantouDiploma": "BTS ソフトウェア工学・データベース上級技術者資格（GLBD）",
        "exp.siantouRole": "BTS ソフトウェア工学・データベース上級技術者（GLBD）",
        "exp.siantouDesc": "私立シァントゥ大学におけるソフトウェア工学・データベース（GLBD）の2年次高等教育課程（2024年–2025年）：リレーショナルデータベースモデリング（SQL、MERISE）、ソフトウェアプログラミング、応用アルゴリズム、システム管理。",
        "exp.iutDiploma": "ソフトウェア工学技術学士",
        "exp.iutRole": "ソフトウェア工学技術学士",
        "exp.iutDesc": "ドゥアラ大学技術研究所（IUT de Douala）におけるソフトウェア工学学士課程（2025年–2026年）：高度ソフトウェアアーキテクチャ、リレーショナルSQLモデリング（MERISE 3NF）、Dockerコンテナ化、高信頼性Webプラットフォーム。",
        "exp.leguideDiploma": "グラフィックデザイン・メディア・人事支援",
        "exp.leguideRole": "グラフィックデザイナー・映像制作・人事アシスタント",
        "exp.leguideDesc": "ブランドアイデンティティ、ベクターロゴ、ポスター制作。LeGuide Informatiqueでの映像メディア制作。Polytech-Valorでの人事管理支援。",
        "exp.ambamDiploma": "基礎数学 & バカロレアC（理数科）",
        "exp.ambamRole": "基礎数学の論理的素養 & Web制作の始動",
        "exp.ambamDesc": "ヤウンデ第1大学にて2年間の基礎数学履修（アルゴリズムの論理的基礎）。メンドン高校にてバカロレアC取得（2021年）。2017年にアンバムバイリンガル高校向けWebサイトを初制作。",
        "exp.cvBtn": "履歴書（PDF）をダウンロード",
        "portfolio.headPre": "実績・作品を",
        "portfolio.headSub": "ご覧",
        "portfolio.headOrange": "ください",
        "portfolio.seeAll": "すべて見る",
        "portfolio.tabAll": "すべてのプロジェクト",
        "portfolio.tabDev": "ソフトウェア & ERP",
        "portfolio.tabDesign": "グラフィック & デザイン",
        "portfolio.tabSystems": "システム & ネットワーク",
        "portfolio.liveBtn": "オンラインデモ →",
        "portfolio.sourceBtn": "GitHubソースコード",
        "portfolio.detailsBtn": "ケーススタディ 📖",
        "portfolio.heroBadge": "✦ 稼働中プロジェクト & 制作実績",
        "portfolio.pageTitlePre": "開発実績・",
        "portfolio.pageTitleOrange": "SaaS & 3Dパッケージ",
        "portfolio.pageSubtitle": "本番稼働ERP、厳密なリレーショナルSQL、ベクターブランド設計、および工業3Dパッケージモデリング。",
        "portfolio.stat1Label": "ケーススタディ & 稼働デモ",
        "portfolio.stat2Label": "11ブランド & 30件超のデザイン",
        "portfolio.stat3Label": "オフライン耐障害性 & SQL整合性",
        "portfolio.stat4Label": "2019年からの設計・開発実績",
        "portfolio.competenciesTitle": "実績を通じて実証された中核スキル",
        "portfolio.searchPlaceholder": "検索（ERP, Candace, Petit Colis, SQL, ロゴ...）",
        "portfolio.emptyTitle": "該当するプロジェクトが見つかりません",
        "portfolio.emptyText": "指定されたフィルターまたは検索キーワードに一致する実績はありません。",
        "portfolio.emptyReset": "すべてのフィルターをリセット",
        "portfolio.galleryTitle": "グラフィックデザイン・3Dパッケージ・ブランディング ギャラリー",
        "portfolio.gallerySubtitle": "企業や各種機関向けに制作された33点の実績をご覧ください。3Dボトルパッケージ、CI/VIブランド設計、イベントポスター、各種印刷物。",
        "portfolio.filterAll": "全作品 (33)",
        "portfolio.filterPackaging": "3Dパッケージモデリング",
        "portfolio.filterLogos": "ロゴ & ベクターアイデンティティ",
        "portfolio.filterAffiches": "ポスター・ロールアップ・印刷物",
        "portfolio.filterInfra": "ネットワーク & インフラ",
        "testi.titlePre": "推薦の",
        "testi.titleOrange": "声",
        "testi.sub": "大学教授、教育指導主事、エンジニア仲間、企業経営者から寄せられた評価の声。",
        "testi.autoScroll": "自動スクロール中",
        "testi.t1Role": "ネットワーク・セキュリティ担当教授",
        "testi.t1Text": "「Jordanはネットワークアーキテクチャ、アプリケーションセキュリティ、チーム協調において卓越した理解を示しています。極めて論理的で自走力のある技術者です。」",
        "testi.t2Role": "国家数学指導主事 · カメルーン中等教育省",
        "testi.t2Text": "「高度な数学的バックグラウンドに裏打ちされた類まれな論理的思考力と分析力を持っています。複雑な抽象モデルを実用的なソフトウェアへ落とし込む手腕は見事です。」",
        "testi.t3Role": "創業者 · Petit Colis",
        "testi.t3Text": "「Petit Colisの広報宣伝および採用キャンペーンにおいて、Jordanのデザイン力と傾聴力は決定打となりました。仕事が迅速で丁寧、非常にプロフェッショナルです。」",
        "testi.t4Role": "学生エンジニア · ヤウンデ工科大学",
        "testi.t4Text": "「Jordanとの共同作業は常に刺激的です。鋭い分析力、細部への配慮、数学的厳密さが、高度なソフトウェアモデリングにおいて決定的な差を生み出します。」",
        "testi.t5Role": "経営陣 · Egesol SARL",
        "testi.t5Text": "「Jordanはインパクトのあるグラフィックの創造性と、確かな技術的精度を併せ持っています。当社向けに制作された成果物は、高い要求水準を完璧に満たしてくれました。」",
        "testi.t6Role": "データアナリスト · データシステム",
        "testi.t6Text": "「JordanがERPプラットフォームで設計したSQLデータベース構造とデータモデルは模範的な明快さです。彼の構築したデータパイプラインでの作業は非常に快適です。」",
        "discuss.headPre": "プロジェクトのアイデアをお持ちですか？",
        "discuss.headOrange": "ぜひお気軽にご相談ください",
        "discuss.placeholder": "メールアドレスを入力...",
        "discuss.sendBtn": "送信",
        "discuss.b1": "堅牢な設計 & 品質管理",
        "discuss.b2": "全国技術コンテスト受賞",
        "discuss.b3Cert": "認定",
        "discuss.b3": "デジタルマーケティング（Google）",
        "blog.headPre": "最新の",
        "blog.headOrange": "技術記事・出版物",
        "blog.heroBadge": "✦ 実務現場の知見＆技術動向",
        "blog.pageTitlePre": "技術レポート &",
        "blog.pageTitleOrange": "技術記事",
        "blog.pageSubtitle": "通信制約下でのソフトウェアアーキテクチャ、高可用性データベース設計、実務エンジニアリングの考察。",
        "blog.readMore": "記事を読む &rarr;",
        "blog.readTime7": "読了目安：約7分",
        "blog.readTime9": "読了目安：約9分",
        "blog.readTime6": "読了目安：約6分",
        "blog.a1Date": "2026年10月18日",
        "blog.a2Date": "2026年9月24日",
        "blog.a3Date": "2026年8月12日",
        "blog.a1Tag": "ソフトウェアアーキテクチャ",
        "blog.a1Title": "断続的な通信環境におけるモジュール型高信頼性ソフトウェアアーキテクチャの設計手法",
        "blog.a1Desc": "回線断や停電が発生する環境下で、ブラウザ内IndexedDBと中央PostgreSQLデータベース間で競合のない双方向同期を実現する手法。",
        "blog.a2Tag": "アグリテック & SaaS ERP",
        "blog.a2Title": "AgroFlow：UML/SQLモデリングから高可用性農業SaaS ERPの実現まで",
        "blog.a2Desc": "農園区画リレーショナルスキーマの正規化、B-Treeインデックス設計、および協同組合向け経営レポートの即時生成に関する詳細技術レポート。",
        "blog.a3Tag": "医療 & 臨床システム",
        "blog.a3Title": "Sister Schola & 臨床LIMS：守秘義務の遵守と院内ワークフローの整合性確保",
        "blog.a3Desc": "患者カルテおよび受付フローの電子化において、厳格なセキュリティプロトコル（RBAC、改ざん防止監査ログ）を実装した実例。",
        "blog.discussBoxTitle": "システムのアーキテクチャ設計でお困りですか？",
        "blog.discussBoxDesc": "データベース設計、フレームワーク選定、セキュリティ対策について客観的な技術的助言が必要な場合は、お気軽にご相談ください。",
        "blog.discussBoxBtn": "相談を予約する &rarr;",
        "blog.langNotice": "[本記事はフランス語で執筆されています · 実務現場からの技術レポート]",
        "contact.heroBadge": "✦ 直接相談 & 無料見積",
        "contact.pageTitlePre": "あなたのプロジェクトを",
        "contact.pageTitleOrange": "形にしましょう",
        "contact.pageSubtitle": "アイデアの具体化、要件定義、ソフトウェア開発やデザインの専門知識が必要な際は、お気軽にご相談ください。",
        "contact.stayInTouch": "お問い合わせ窓口",
        "contact.stayInTouchDesc": "技術的なご質問からお見積りのご依頼まで、原則24時間以内に直接返答いたします。",
        "contact.whatsappDirect": "WhatsAppで直接チャットを開始",
        "contact.zoneTitle": "対応エリア",
        "contact.zoneSub": "カメルーン & 海外リモート対応",
        "contact.availTitle": "稼働状況：即時対応可能",
        "contact.availDesc": "ソフトウェア開発、データベースモデリング、デザイン制作のご依頼を承っております。",
        "contact.formTitle": "お問い合わせフォーム",
        "contact.formSub": "プロジェクトの概要をご記入ください。24時間以内に概算見積および提案をご返答いたします。",
        "contact.nameLabel": "お名前 *",
        "contact.namePlaceholder": "お名前をご入力ください",
        "contact.emailLabel": "メールアドレス *",
        "contact.emailPlaceholder": "name@example.com",
        "contact.phoneLabel": "電話・WhatsApp",
        "contact.phonePlaceholder": "例：+237 670 00 00 00",
        "contact.serviceLabel": "ご希望のサービス分野 *",
        "contact.serviceSelectDefault": "分野を選択してください...",
        "contact.serviceOptSoftware": "ソフトウェア工学・SaaS ERP",
        "contact.serviceOptInfographie": "グラフィックデザイン・ブランド構築",
        "contact.serviceOptSystems": "システム保守・ネットワーク",
        "contact.serviceOptConsulting": "ITコンサルティング・設計監査",
        "contact.serviceOptOther": "その他のご相談",
        "contact.budgetLabel": "ご予算の目安",
        "contact.budgetOptFlexible": "相談の上決定",
        "contact.budgetOptTier1": "150,000 FCFA未満（約3.5万円）",
        "contact.budgetOptTier2": "150,000〜500,000 FCFA（約3.5〜12万円）",
        "contact.budgetOptTier3": "500,000〜1,500,000 FCFA（約12〜36万円）",
        "contact.budgetOptTier4": "1,500,000 FCFA以上（大規模プロジェクト）",
        "contact.messageLabel": "ご相談内容・要件概要 *",
        "contact.messagePlaceholder": "希望される機能、開発納期、プロジェクトの背景などを具体的にお書きください...",
        "contact.fileLabel": "添付ファイル / 仕様書（任意）",
        "contact.fileDropText": "仕様書・ブリーフ・デザイン案をドラッグ＆ドロップ（PDF, DOCX, ZIP 最大15MB）または<strong style=\"color: var(--figma-orange); text-decoration: underline; cursor: pointer;\">ファイルを選択</strong>",
        "contact.privacyNote": "🔒 <strong>プライバシー保護：</strong>ご送信いただいた情報および添付資料は厳重に管理され、第三者へ開示・共有されることは一切ありません。",
        "contact.submitBtn": "送信する",
        "contact.faqBadge": "✦ よくあるご質問",
        "contact.collabTitlePre": "お取引・開発の",
        "contact.collabTitleOrange": "進め方",
        "contact.q1": "最初のご相談はどのように行われますか？",
        "contact.a1": "お問い合わせ確認後、30分程度のオンラインミーティング（Google Meet、WhatsApp、または現地対面）を実施し、要件の整理と透明性の高いお見積りを提示します。",
        "contact.q2": "納品後のシステム保守は対応していますか？",
        "contact.a2": "はい。すべての開発案件に納品後の無償保証期間が含まれます。また、安定稼働を維持するための月次保守契約もご用意しています。",
        "contact.q3": "海外からの依頼・開発受託は可能ですか？",
        "contact.a3": "もちろん可能です。Git、Jira、詳細な仕様ドキュメント、定期ミーティングを活用し、海外のクライアントとも時差を考慮して円滑に業務を進行します。",
        "contact.q4": "利用可能な決済方法は何ですか？",
        "contact.a4": "銀行振込、Orange Money、MTN Mobile Money、および海外送金サービスに対応しています。着手金、中間確認、納品検収の分割払いが一般的です。",
        "project.backLink": "&larr; ポートフォリオ一覧へ戻る",
        "project.sectionContext": "1. 背景とビジネス課題",
        "project.sectionArch": "2. 技術アーキテクチャ & 選定理由",
        "project.sectionGallery": "3. 画面キャプチャ & アーキテクチャ図",
        "project.sectionResults": "4. 導入成果 & 運用効果",
        "project.specsTitle": "プロジェクト基本情報",
        "project.clientLabel": "クライアント / 発注元",
        "project.industryLabel": "業種・事業領域",
        "project.durationLabel": "開発期間",
        "project.roleLabel": "担当領域",
        "project.techStackLabel": "使用技術スタック",
        "project.notFoundTitle": "プロジェクトが見つかりません",
        "project.notFoundSummary": "指定されたプロジェクトIDは存在しないか、移動した可能性があります。ポートフォリオ一覧より他の実績をご覧ください。",
        "project.notFoundBtn": "&larr; 実績カタログへ戻る",
        "article.authorRole": "ソフトウェア工学技術者 · ドゥアラ大学IUT",
        "article.relatedTitle": "✦ 関連プロジェクト・ケーススタディ",
        "article.demoBtn": "オンラインデモを試す ↗",
        "article.caseBtn": "詳細ケーススタディを読む &rarr;",
        "article.whatsappDiscuss": "💬 WhatsAppで相談する",
        "article.newsletterTitle": "最新の技術分析記事を受け取る",
        "article.newsletterSub": "ソフトウェア工学、ネットワークセキュリティ、システムアーキテクチャに関する最新の技術ノートをお届けします。",
        "article.newsletterPlaceholder": "メールアドレスを入力...",
        "article.subscribeBtn": "登録する",
        "article.notFoundTitle": "記事が見つかりません",
        "article.notFoundDesc": "指定された技術記事は存在しないか、移動した可能性があります。ブログ一覧より他の記事をご覧ください。",
        "article.notFoundBtn": "&larr; 記事一覧へ戻る",
        "footer.connectTitle": "お問い合わせ・協業のご相談",
        "footer.hireBtn": "プロジェクトを開始",
        "footer.bio": "ソフトウェア開発者・グラフィックデザイナー。ドゥアラ大学IUT卒業、Googleデジタルマーケティング認定。LaboGraphie創設者として、アプリ開発、ITインフラ、ブランドデザインを手掛ける。",
        "footer.navTitle": "ナビゲーション",
        "footer.contactTitle": "連絡先",
        "footer.location": "<span>📍 カメルーン、ヤウンデ</span>",
        "footer.stayConnected": "最新情報を受け取る",
        "footer.placeholder": "メールアドレス...",
        "footer.quickQuote": "クイック見積依頼",
        "footer.copyright": "Copyright © 2026 NDE Jordan L. · LaboGraphie Dev. All Rights Reserved.",
        "footer.terms": "利用規約",
        "footer.privacy": "プライバシーポリシー",
        "pageTitle.index": "NDE Jordan L. | フルスタック開発者＆ソフトウェア工学技術者",
        "pageTitle.services": "サービス＆ソリューション — NDE Jordan L. · フルスタック開発者",
        "pageTitle.portfolio": "実績・ポートフォリオ — NDE Jordan L. · フルスタック開発者",
        "pageTitle.blog": "技術ブログ・知見共有 — NDE Jordan L. · フルスタック開発者",
        "pageTitle.contact": "お問い合わせ・お見積り — NDE Jordan L. · フルスタック開発者",
        "why.m1Val": "オープンコード",
        "why.m2Val": "全国大会受賞",
        "exp.session2026": "2025年–2026年",
        "exp.session2025": "2024年–2025年",
        "portfolio.dom1Title": "ソフトウェア＆Web開発",
        "portfolio.dom1Desc": "SaaSアーキテクチャ、Vanilla JS、React、Node.js、リアクティブUI、オフライン同期（AgroFlow、Sister Schola）。",
        "portfolio.dom2Title": "インフラ、DevOps＆システム",
        "portfolio.dom2Desc": "リレーショナルデータベースPostgreSQL/MySQL（MERISE 3NF）、Dockerコンテナ化、Vercelホスティング、トランザクション整合性。",
        "portfolio.dom3Title": "UI/UX＆グラフィックデザイン",
        "portfolio.dom3Desc": "Illustratorベクター設計、ボトル・パッケージの3Dモデリング、製品モックアップ、ブランドアイデンティティ（Candace、LaboGraphie）。",
        "portfolio.dom4Title": "ITコンサルティング＆SI導入支援",
        "portfolio.dom4Desc": "要件定義、概念モデリング（MCD/MLD）、技術仕様書策定、環境に適したアーキテクチャ選定。",
        "portfolio.dom5Title": "デジタルマーケティング＆広報",
        "portfolio.dom5Desc": "コンテンツ戦略、Googleデジタルマーケティング認定、ビジュアルコミュニケーション、地域テックイベントの企画推進。",
        "portfolio.dom6Title": "IT保守＆ネットワーク管理",
        "portfolio.dom6Desc": "サーバーラック構造化配線、VLAN/Ciscoアドレッシング、ハードウェア予防・是正保守、Arduino組込み連携。",
        "portfolio.cardAgroBadge": "ERP・アグリテック（プロトタイプ）",
        "portfolio.cardAgroDesc": "農業生産者向けSaaS型ERPプロトタイプ。圃場管理、収穫追跡、リアルタイム収支分析、高耐障害性オフライン同期。",
        "portfolio.cardSisterBadge": "医療・LIMS（プロトタイプ）",
        "portfolio.cardSisterDesc": "病院ERP・臨床管理プロトタイプ。患者動線の完全追跡、受付管理、電子処方箋、院内データ整合性の確保。",
        "portfolio.cardCandaceBadge": "ブランディング＆3Dパッケージ",
        "portfolio.cardCandaceDesc": "アートディレクション、Candace化粧品向け3Dパッケージモデリング、物流スタートアップPetit Colis向け採用広報ポスター。",
        "portfolio.cardLaboBadge": "LaboGraphie共同体",
        "portfolio.cardLaboDesc": "学友と創設したLaboGraphieのインタラクティブポータルおよび技術ショーケース。Vanilla JSモジュール設計と高い描画性能。",
        "portfolio.cardAcuveraBadge": "クライアント実績 · Dr. Zemzi",
        "portfolio.cardAcuveraDesc": "Dr. Zemzi診療所向け公式サイトおよび生体検査追跡ポータル（40,000 FCFA受注納品）。検査結果の安全な照会。",
        "portfolio.cardArduinoBadge": "システム＆ネットワーク",
        "portfolio.cardArduinoDesc": "Arduinoマイコン開発、環境センサー連携、サーバー配線、ルーター/スイッチ設定、学生生体認証システムの検証実験。",
        "portfolio.btnCaseStudy": "事例詳細 &rarr;",
        "portfolio.btnFullGallery": "ギャラリーを見る &rarr;",
        "portfolio.btnDemo": "デモ <span>↗</span>",
        "portfolio.btnPreview": "プレビュー <span>🔍</span>",
        "contact.emailDirectLabel": "メールアドレス",
        "contact.locDirectLabel": "所在地・対応地域",
        "contact.locDirectSub": "対面対応および海外リモートワーク可能",
        "contact.availLabel": "稼働状況",
        "contact.availVal": "● プロジェクト・技術顧問 即時対応可能",
        "contact.zoneMain": "主要拠点",
        "contact.zoneHub": "経済拠点・IUT",
        "contact.zoneWorld": "グローバル対応",
        "contact.zoneNote": "インフラ監査や戦略会議のためのオンサイト訪問対応。長期プロジェクト向けツール完備のリモートワーク（Slack、GitHub、Zoom、Jira）。",
        "blog.authorBy": "✍️ 執筆：NDE Jordan L.",
        "blog.authorRole1": "ソフトウェア開発者・LaboGraphie創設者",
        "blog.authorRole2": "設計責任者・フルスタック開発者",
        "blog.authorRole3": "SIアーキテクト・システム統合者",
        "blog.btnWhatsappDirect": "WhatsAppで直接相談 💬",
        "project.galleryHint": "画像をクリックすると高解像度で拡大表示されます。",
        "project.methodologyLabel": "開発手法",
        "project.methodologyVal": "アジャイル・スクラム ／ MERISE・UMLモデリング",
        "project.requestQuoteBtn": "同様の案件を見積依頼",
        "project.bottomBackBtn": "&larr; すべてのプロジェクトを見る",
        "project.bottomContactBtn": "Jordanとプロジェクトを開始 &rarr;",
        "services.sch1Footer": "企業・組織向け予防保守および障害復旧支援",
        "services.sch2Footer": "実務チームへの実践的なAI導入伴走支援",
        "contact.alertSuccess": "✓ ありがとうございます！メッセージが準備されました。確認のためWhatsAppまたはメールへ移動します。",
        "portfolio.stat3Val": "ローカルファースト",
        "portfolio.stat4Val": "2019年より",
        "portfolio.btnTechStudy": "技術詳細 &rarr;",
        "portfolio.btnSchema": "配線図",
        "portfolio.ctaHeadlinePre": "同様のプロジェクトをご検討中ですか？",
        "portfolio.ctaHeadlineOrange": "共に形にしていきましょう。",
        "portfolio.ctaSubtext": "業務基幹ERPからモダンなWebサイト、高品質なブランドデザインまで、貴社の要件を直接お聞かせください。",
        "portfolio.btnDiscussWhatsapp": "WhatsAppで相談する &rarr;",
        "portfolio.btnDiscussQuote": "お見積もりを依頼する &rarr;",
        "aria.skipToContent": "本文へスキップ",
        "aria.searchProjects": "プロジェクトを検索",
        "aria.newsletterEmail": "お見積り用のメールアドレス",
        "exp.iutCompany": "ドゥアラ大学技術研究所（IUT de Douala）",
        "exp.siantouCompany": "私立シァントゥ大学（Université Privée Siantou）"
    }
};

  let currentLang = 'fr';
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && ['fr', 'en', 'ja'].includes(urlLang)) {
      currentLang = urlLang;
    } else {
      currentLang = localStorage.getItem('jordan_portfolio_lang') || 'fr';
    }
  } catch (e) {
    currentLang = 'fr';
  }
  if (!['fr', 'en', 'ja'].includes(currentLang)) currentLang = 'fr';
  let currentProjectIdx = 0;

  function applyLanguage(lang) {
    if (!translations[lang]) {
      console.warn(`[i18n] Langue '${lang}' non supportée, repli automatique sur 'fr'.`);
      lang = 'fr';
    }
    currentLang = lang;
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('jordan_portfolio_lang', lang);
      const url = new URL(window.location.href);
      if (url.searchParams.get('lang') !== lang) {
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
      }
    } catch (e) {}

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      const isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      } else if (translations['fr'] && translations['fr'][key]) {
        el.innerHTML = translations['fr'][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.placeholder = translations[lang][key];
      } else if (translations['fr'] && translations['fr'][key]) {
        el.placeholder = translations['fr'][key];
      }
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('aria-label', translations[lang][key]);
      } else if (translations['fr'] && translations['fr'][key]) {
        el.setAttribute('aria-label', translations['fr'][key]);
      }
    });

    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('title', translations[lang][key]);
      } else if (translations['fr'] && translations['fr'][key]) {
        el.setAttribute('title', translations['fr'][key]);
      }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.getAttribute('data-i18n-alt');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('alt', translations[lang][key]);
      } else if (translations['fr'] && translations['fr'][key]) {
        el.setAttribute('alt', translations['fr'][key]);
      }
    });

    // Balises META descriptives
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    let metaKey = 'meta.descHome';
    if (path.includes('services')) metaKey = 'meta.descServices';
    else if (path.includes('portfolio')) metaKey = 'meta.descPortfolio';
    else if (path.includes('blog')) metaKey = 'meta.descBlog';
    else if (path.includes('contact')) metaKey = 'meta.descContact';
    else if (path.includes('projet-detail')) metaKey = 'meta.descProject';
    else if (path.includes('article-detail')) metaKey = 'meta.descArticle';
    if (translations[lang] && translations[lang][metaKey]) {
      if (metaDesc) metaDesc.setAttribute('content', translations[lang][metaKey]);
      if (ogDesc) ogDesc.setAttribute('content', translations[lang][metaKey]);
    }

    if (typeof updateActiveProjectDetail === 'function') {
      try {
        updateActiveProjectDetail();
      } catch (err) {}
    }
    if (typeof renderCaseStudyDetail === 'function') {
      try {
        renderCaseStudyDetail(lang);
      } catch (err) {}
    }
    if (typeof renderArticleDetail === 'function') {
      try {
        renderArticleDetail(lang);
      } catch (err) {}
    }
  }

  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      applyLanguage(btn.getAttribute('data-lang'));
    });
  });

  applyLanguage(currentLang);


  /* =========================================================================
     3. VRAI CARROUSEL GLISSANT HORIZONTAL POUR LE PORTFOLIO & RECHERCHE
     ========================================================================= */
  const projectsData = [
    {
      id: "agroflow",
      title_fr: "AgroFlow SaaS — Plateforme ERP & Gestion Agricole Intelligente",
      title_en: "AgroFlow SaaS — Integrated Agricultural ERP Platform",
      title_ja: "AgroFlow SaaS — 農業統合ERP・スマート管理プラットフォーム",
      desc_fr: "ERP agricole de pointe digitalisant la gestion des parcelles, le suivi financier des récoltes, les stocks et la traçabilité en temps réel, conçu pour les exploitants avec mode hors-ligne résilient.",
      desc_en: "Cutting-edge AgriTech ERP platform digitizing plot management, harvest financial accounting, inventory, and real-time traceability, built with resilient offline sync.",
      desc_ja: "農業生産者・農協向けモジュール型ERP：圃場管理、収穫分析会計、在庫管理、オフライン同期対応。",
      live: "https://agroflowsaas.vercel.app",
      github: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/card_agroflow.webp", label: "Dashboard UI", title: "AgroFlow · Interface SaaS" },
        { img: "rsc/img/projets/shot_agroflow.webp", label: "Plein Écran", title: "AgroFlow · Capture Complète" },
        { img: "rsc/img/projets/dev/DC_Agroflow.webp", label: "Architecture SI", title: "AgroFlow · Modélisation Relationnelle" }
      ]
    },
    {
      id: "sisterschola",
      title_fr: "Sister Schola ERP — Pilotage Hospitalier & Clinique",
      title_en: "Sister Schola ERP — Healthcare & Clinical Management",
      title_ja: "Sister Schola ERP — 病院・クリニック総合管理システム",
      desc_fr: "Système de gestion et de suivi clinique complet pour centres de santé : centralisation des dossiers patients, admissions, consultations, prescription médicale, facturation et intégrité des flux cliniques.",
      desc_en: "Complete clinical records and health management system enabling patient history centralization, vital signs monitoring, and healthcare workflow orchestration.",
      desc_ja: "医療機関向け包括的診療管理システム：カルテ一元管理、受付、診療、処方、請求、生体検査の追跡性。",
      live: "https://sisterscholaerp.vercel.app",
      github: "https://github.com/Nadroj-ciol",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/dev/SisterSholaErp.webp", label: "Portail Médical", title: "Sister Schola · Système Clinique" },
        { img: "rsc/img/projets/consultant IT/consultation-sisterShola.webp", label: "Audit & Consultation", title: "Sister Schola · Audit IT" }
      ]
    },
    {
      id: "candace",
      title_fr: "Candace Distribution & Petit Colis — Identité Visuelle & Direction Artistique",
      title_en: "Candace Distribution & Petit Colis — Brand Identity & Art Direction",
      title_ja: "Candace Distribution & Petit Colis — ブランドアイデンティティ＆アートディレクション",
      desc_fr: "Direction artistique, typographie, affiches promotionnelles grand format et packagings produits (Candace Cosmétique, Petit Colis de Gautier Funga, Fosa'a Academy). Des créations vectorielles à fort impact commercial.",
      desc_en: "Full-scale art direction and graphic design: brand visual systems, high-impact promotional event posters (Petit Colis, Candace, Fosa'a Academy), tailored typography, and digital identity.",
      desc_ja: "アートディレクション、化粧品3Dパッケージ（Candace）、物流スタートアップ（Petit Colis）の広報ポスター・タイポグラフィ制作。",
      live: "rsc/img/projets/infographie/MockupCandace distribution.webp",
      github: "https://github.com/Nadroj-ciol",
      category: "infographie",
      type: "image",
      gallery: [
        { img: "rsc/img/projets/infographie/MockupCandace distribution.webp", label: "Packaging Candace", title: "Candace Distribution · Cosmétique" },
        { img: "rsc/img/projets/infographie/flyer  recruitement petit colis.webp", label: "Petit Colis Flyer", title: "Petit Colis · Flyer Recrutement" },
        { img: "rsc/img/projets/infographie/flyer produit Candace Lait de beauté.webp", label: "Lait de Beauté", title: "Candace Lait de Beauté" }
      ]
    },
    {
      id: "labographie",
      title_fr: "LaboGraphie Web — Plateforme d'Ingénierie & Prototypage Logiciel",
      title_en: "LaboGraphie Web — Software Engineering & Prototyping Platform",
      title_ja: "LaboGraphie Web — ソフトウェア工学＆プロトタイピング基盤",
      desc_fr: "Vitrine digitale et laboratoire pratique dédié aux développeurs et passionnés de tech camerounais : « Moins de théorie passive, plus de code en production ». Ergonomie moderne, fluidité mobile et performances optimisées.",
      desc_en: "High-performance immersive web platform for tech engineering and cybersecurity profiles, featuring fast load times and clean mobile ergonomics.",
      desc_ja: "LaboGraphie公式ポータル：ソフトウェア開発、グラフィックデザイン、保守、Web制作。軽量・高レスポンス設計。",
      live: "https://labographie.vercel.app",
      github: "https://github.com/Nadroj-ciol/LaboGraphie-web",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/dev/LaboGraphie-web.webp", label: "Vitrine Web", title: "LaboGraphie · Plateforme Digitale" },
        { img: "rsc/img/projets/dev/labographie-rpoject-map.webp", label: "Mapping Projet", title: "LaboGraphie · Cartographie" }
      ]
    },
    {
      id: "acuvera",
      title_fr: "Acuvera Clinical — Suivi Clinique & Traçabilité LIMS",
      title_en: "Acuvera Clinical — Clinical Follow-up & LIMS Traceability",
      title_ja: "Acuvera Clinical — 生体検査追跡ポータル＆公式サイト",
      desc_fr: "Plateforme cloud de gestion des analyses biomédicales et suivi des prélèvements : traçabilité stricte des échantillons, conformité des flux de laboratoire et édition de bilans de diagnostic.",
      desc_en: "Cloud-based biological sample and laboratory analysis tracking platform ensuring clinical traceability and regulatory medical compliance.",
      desc_ja: "Dr. Zemzi診療所向けWebサイト＆生体検査追跡ポータル（40,000 FCFA受注）：検査結果の安全な閲覧とクリニック紹介。",
      live: "https://acuvera-clinical.vercel.app",
      github: "https://github.com/Nadroj-ciol/Acuvera-clinical",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/card_acuvera.webp", label: "Portail LIMS", title: "Acuvera Clinical · Dashboard" },
        { img: "rsc/img/projets/shot_acuvera.webp", label: "Analyses", title: "Acuvera Clinical · Suivi Biologique" },
        { img: "rsc/img/projets/dev/baobab-rsd.webp", label: "BioBank Schema", title: "Baobab LIMS · Schéma Données" }
      ]
    },
    {
      id: "arduino",
      title_fr: "Systèmes Embarqués Arduino, Maintenance & Réseaux",
      title_en: "Arduino Embedded Systems, Maintenance & IT Infrastructure",
      title_ja: "Arduino 組込みシステム・保守＆ネットワークインフラ",
      desc_fr: "Programmation de microcontrôleurs Arduino, interfaçage de capteurs environnementaux, câblage d'armoires réseau, configuration de routeurs et switchboards, et validation biométrique d'étudiants (UP Siantou).",
      desc_en: "Arduino microcontroller programming, environmental sensor interfacing, patch panel cabling, switchboard setup, and student biometric validation.",
      desc_ja: "Arduinoマイコン開発、環境センサー連携、サーバー配線、ルーター/スイッチ設定、学生生体認証システム（UP Siantou）。",
      live: "rsc/img/projets/maintenance/tp arduino.webp",
      github: "https://github.com/Nadroj-ciol",
      category: "systems",
      type: "image",
      gallery: [
        { img: "rsc/img/projets/maintenance/tp arduino.webp", label: "Arduino IoT", title: "Prototypage Arduino · Systèmes Embarqués" },
        { img: "rsc/img/projets/Reseau & Sécu/pexels-brett-sayles-4716292.webp", label: "Baies de Brassage", title: "Infrastructures Réseaux & Switchboards" }
      ]
    }
  ];

  const portfolioTrack = document.getElementById('portfolioTrack');
  const cards = document.querySelectorAll('.portfolio-card');
  const dots = document.querySelectorAll('#portfolioDots span');
  const activeTitle = document.getElementById('activeProjectTitle');
  const activeDesc = document.getElementById('activeProjectDesc');
  const activeLink = document.getElementById('activeProjectLink');
  const activeGallery = document.getElementById('activeProjectGallery');
  const btnLive = document.getElementById('btnDetailLive');
  const btnGit = document.getElementById('btnDetailGit');
  const btnPortfolioPrev = document.getElementById('btnPortfolioPrev');
  const btnPortfolioNext = document.getElementById('btnPortfolioNext');

  function updateActiveProjectDetail() {
    if (typeof projectsData === 'undefined' || typeof currentProjectIdx === 'undefined') return;
    if (currentProjectIdx < 0 || currentProjectIdx >= projectsData.length) return;
    const p = projectsData[currentProjectIdx];
    if (!p) return;

    const title = (currentLang === 'ja' && p.title_ja) ? p.title_ja : (currentLang === 'en' && p.title_en) ? p.title_en : p.title_fr;
    const desc = (currentLang === 'ja' && p.desc_ja) ? p.desc_ja : (currentLang === 'en' && p.desc_en) ? p.desc_en : p.desc_fr;

    if (activeTitle) activeTitle.textContent = title;
    if (activeDesc) activeDesc.textContent = desc;

    if (p.type === 'image') {
      if (activeLink) activeLink.href = p.live;
      if (btnLive) {
        btnLive.href = p.live;
        btnLive.target = "_blank";
        btnLive.innerHTML = (currentLang === 'ja') ? '全画面表示 ↗' : (currentLang === 'en') ? 'View Full Image ↗' : 'Aperçu plein écran ↗';
      }
    } else {
      if (activeLink) activeLink.href = p.live;
      if (btnLive) {
        btnLive.href = p.live;
        btnLive.target = "_blank";
        btnLive.innerHTML = (currentLang === 'ja') ? 'オンラインデモ →' : (currentLang === 'en') ? 'Live Demo →' : 'Démo en ligne →';
      }
    }
    if (btnGit) btnGit.href = p.github;
    const btnCase = document.getElementById('btnDetailCase');
    if (btnCase) btnCase.href = `projet-detail.html?id=${p.id || 'agroflow'}`;

    // Mise à jour dynamique de la galerie miniature
    if (activeGallery && p.gallery) {
      activeGallery.innerHTML = p.gallery.map(item => `
        <div class="detail-thumb-item btn-zoom-img" data-img="${item.img}" title="${item.title}">
          <img src="${item.img}" alt="${item.label}">
          <span class="detail-thumb-badge">${item.label}</span>
        </div>
      `).join('');

      activeGallery.querySelectorAll('.btn-zoom-img').forEach(btn => {
        btn.addEventListener('click', () => {
          const src = btn.getAttribute('data-img');
          if (src) openLightbox(src);
        });
      });
    }
  }

  function setProject(idx, scrollToCard = true) {
    if (idx < 0 || idx >= projectsData.length) return;
    currentProjectIdx = idx;

    cards.forEach((c, i) => {
      if (i === idx) {
        c.classList.add('active');
        if (scrollToCard && portfolioTrack) {
          const cardLeft = c.offsetLeft - portfolioTrack.offsetLeft;
          portfolioTrack.scrollTo({ left: cardLeft - 10, behavior: 'smooth' });
        }
      } else {
        c.classList.remove('active');
      }
    });

    dots.forEach((d, i) => {
      if (i === idx) d.className = 'dot-bar active';
      else d.className = 'dot-circle';
    });

    updateActiveProjectDetail();
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => setProject(i));
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setProject(i));
  });

  function getVisibleProjectCards() {
    return Array.from(cards).filter(c => c.style.display !== 'none');
  }

  function getVisibleProjectIndices() {
    return getVisibleProjectCards().map(c => parseInt(c.getAttribute('data-index'), 10));
  }

  function updatePortfolioEmptyStates() {
    const visibleCards = getVisibleProjectCards();
    const emptyStateCarousel = document.getElementById('portfolioEmptyState');
    if (emptyStateCarousel) {
      emptyStateCarousel.style.display = (cards.length > 0 && visibleCards.length === 0) ? 'block' : 'none';
    }

    const visibleHub = Array.from(hubCards).filter(c => c.style.display !== 'none');
    const emptyStateHub = document.getElementById('portfolioHubEmptyState');
    if (emptyStateHub) {
      emptyStateHub.style.display = (hubCards.length > 0 && visibleHub.length === 0) ? 'block' : 'none';
    }
  }

  // Boutons flèches de défilement horizontal du carrousel (navigation parmi les cartes visibles uniquement)
  if (btnPortfolioNext) {
    btnPortfolioNext.addEventListener('click', () => {
      const visibleIndices = getVisibleProjectIndices();
      if (visibleIndices.length === 0) return;
      const currPos = visibleIndices.indexOf(currentProjectIdx);
      const nextPos = (currPos === -1 || currPos >= visibleIndices.length - 1) ? 0 : currPos + 1;
      setProject(visibleIndices[nextPos]);
    });
  }

  if (btnPortfolioPrev) {
    btnPortfolioPrev.addEventListener('click', () => {
      const visibleIndices = getVisibleProjectIndices();
      if (visibleIndices.length === 0) return;
      const currPos = visibleIndices.indexOf(currentProjectIdx);
      const prevPos = (currPos <= 0) ? visibleIndices.length - 1 : currPos - 1;
      setProject(visibleIndices[prevPos]);
    });
  }

  // Navigation accessible au clavier (Flèches gauche/droite)
  if (portfolioTrack) {
    portfolioTrack.setAttribute('tabindex', '0');
    portfolioTrack.setAttribute('role', 'region');
    portfolioTrack.setAttribute('aria-label', 'Carrousel des réalisations');

    portfolioTrack.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (btnPortfolioNext) btnPortfolioNext.click();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (btnPortfolioPrev) btnPortfolioPrev.click();
      }
    });
  }

  const sliderContainer = document.querySelector('.portfolio-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && document.activeElement !== portfolioTrack) {
        if (btnPortfolioNext) btnPortfolioNext.click();
      } else if (e.key === 'ArrowLeft' && document.activeElement !== portfolioTrack) {
        if (btnPortfolioPrev) btnPortfolioPrev.click();
      }
    });
  }

  // Filtrage par onglets (Supporte à la fois index.html et portfolio.html)
  const tagPills = document.querySelectorAll('.tag-pill');
  const hubCards = document.querySelectorAll('.portfolio-hub-card');

  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tagPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      
      // Filtrage du carrousel sur index.html
      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });

      // Filtrage de la grille sur portfolio.html
      hubCards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      updatePortfolioEmptyStates();

      if (portfolioTrack) portfolioTrack.scrollTo({ left: 0, behavior: 'smooth' });

      const firstVisible = Array.from(cards).find(c => c.style.display !== 'none');
      if (firstVisible) {
        const idx = parseInt(firstVisible.getAttribute('data-index'), 10);
        setProject(idx, false);
      }
    });
  });

  const btnToggleAllProjects = document.getElementById('btnToggleAllProjects');
  if (btnToggleAllProjects) {
    btnToggleAllProjects.addEventListener('click', () => {
      const allPill = document.querySelector('.tag-pill[data-filter="all"]');
      if (allPill) allPill.click();
    });
  }

  // Barre de recherche fluide avec autocomplétion (index.html & portfolio.html)
  const searchInput = document.getElementById('projectSearchInput');
  const searchClear = document.getElementById('projectSearchClear');
  const searchChips = document.querySelectorAll('.search-chip');

  function filterProjectsByQuery(query) {
    const q = query.trim().toLowerCase();
    if (searchClear) {
      if (q) searchClear.classList.add('visible');
      else searchClear.classList.remove('visible');
    }

    // Filtre des cartes du carrousel
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      if (!q || text.includes(q) || keywords.includes(q)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });

    // Filtre des cartes de la grille du hub
    hubCards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      if (!q || text.includes(q) || keywords.includes(q)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });

    updatePortfolioEmptyStates();

    const firstVisible = Array.from(cards).find(c => c.style.display !== 'none');
    if (firstVisible) {
      const idx = parseInt(firstVisible.getAttribute('data-index'), 10);
      setProject(idx, false);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterProjectsByQuery(e.target.value);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      filterProjectsByQuery('');
      const allPill = document.querySelector('.tag-pill[data-filter="all"]');
      if (allPill) allPill.click();
    });
  }

  searchChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-query');
      if (searchInput) searchInput.value = q;
      filterProjectsByQuery(q);
    });
  });

  // Gestion des boutons de réinitialisation dans les états vides
  const btnResetPortfolioEmpty = document.getElementById('btnResetPortfolioEmpty');
  if (btnResetPortfolioEmpty) {
    btnResetPortfolioEmpty.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      const allPill = document.querySelector('.portfolio-controls-bar .tag-pill[data-filter="all"]');
      if (allPill) allPill.click();
      else filterProjectsByQuery('');
    });
  }

  const btnResetHubEmpty = document.getElementById('btnResetHubEmpty');
  if (btnResetHubEmpty) {
    btnResetHubEmpty.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      const allPill = document.querySelector('.portfolio-controls-bar .tag-pill[data-filter="all"]');
      if (allPill) allPill.click();
      else filterProjectsByQuery('');
    });
  }

  // Prise en charge du deep linking URL ?filter= (ex: portfolio.html?filter=dev)
  const urlFilterParam = new URLSearchParams(window.location.search).get('filter');
  if (urlFilterParam) {
    const targetFilter = urlFilterParam.trim().toLowerCase();
    const matchingPill = document.querySelector(`.tag-pill[data-filter="${targetFilter}"]`);
    if (matchingPill) {
      matchingPill.click();
    }
  }


  /* =========================================================================
     4. CARROUSEL TÉMOIGNAGES (AUTO-PLAY & DÉFILEMENT FLUIDE — 6 RECOMMANDATIONS)
     ========================================================================= */
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDots = document.querySelectorAll('#testiDots span');
  const btnTestiPrev = document.getElementById('btnTestiPrev');
  const btnTestiNext = document.getElementById('btnTestiNext');
  const testiTrack = document.getElementById('testiTrack');
  const testiViewport = document.getElementById('testiViewport');
  const testiAutoplayStatus = document.getElementById('testiAutoplayStatus');

  let currentTesti = 0;
  let testiInterval = null;
  const TESTI_INTERVAL_MS = 5000;

  function showTestimonial(idx) {
    if (!testiCards.length) return;
    if (idx < 0) idx = testiCards.length - 1;
    if (idx >= testiCards.length) idx = 0;
    currentTesti = idx;

    const card = testiCards[0];
    const cardWidth = card ? card.offsetWidth : 420;
    const gap = 32; // 2rem = 32px
    const isMobile = window.innerWidth <= 900;
    const maxOffset = isMobile ? testiCards.length - 1 : Math.max(0, testiCards.length - 2);
    const safeIdx = Math.min(idx, maxOffset);

    if (testiTrack) {
      testiTrack.style.transform = `translateX(-${safeIdx * (cardWidth + gap)}px)`;
    }

    testiCards.forEach((c, i) => {
      if (i === idx || (!isMobile && i === idx + 1)) {
        c.classList.add('active');
        c.style.opacity = '1';
      } else {
        c.classList.remove('active');
        c.style.opacity = '0.45';
      }
    });

    testiDots.forEach((d, i) => {
      if (i === idx) d.className = 'dot-bar active';
      else d.className = 'dot-circle';
    });
  }

  function startTestiAutoPlay() {
    stopTestiAutoPlay();
    testiInterval = setInterval(() => {
      showTestimonial(currentTesti + 1);
    }, TESTI_INTERVAL_MS);
    if (testiAutoplayStatus) testiAutoplayStatus.classList.remove('paused');
  }

  function stopTestiAutoPlay() {
    if (testiInterval) {
      clearInterval(testiInterval);
      testiInterval = null;
    }
    if (testiAutoplayStatus) testiAutoplayStatus.classList.add('paused');
  }

  if (testiViewport) {
    testiViewport.addEventListener('mouseenter', stopTestiAutoPlay);
    testiViewport.addEventListener('mouseleave', startTestiAutoPlay);
  }

  window.addEventListener('resize', () => {
    showTestimonial(currentTesti);
  });

  if (btnTestiNext) {
    btnTestiNext.addEventListener('click', () => {
      showTestimonial(currentTesti + 1);
      startTestiAutoPlay();
    });
  }

  if (btnTestiPrev) {
    btnTestiPrev.addEventListener('click', () => {
      showTestimonial(currentTesti - 1);
      startTestiAutoPlay();
    });
  }

  testiDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showTestimonial(idx);
      startTestiAutoPlay();
    });
  });

  if (testiTrack) {
    testiTrack.addEventListener('mouseenter', stopTestiAutoPlay);
    testiTrack.addEventListener('mouseleave', startTestiAutoPlay);
  }

  startTestiAutoPlay();


  /* =========================================================================
     5. VISIONNEUSE LIGHTBOX (ZOOM PLEIN ÉCRAN UNIVERSEL DÉLÉGUÉ)
     ========================================================================= */
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Délégation d'événement universelle pour tout élément avec la classe .btn-zoom-img
  document.addEventListener('click', (e) => {
    const zoomTarget = e.target.closest('.btn-zoom-img');
    if (zoomTarget) {
      e.stopPropagation();
      const imgPath = zoomTarget.getAttribute('data-img');
      if (imgPath) openLightbox(imgPath);
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });


  /* =========================================================================
     6. ACCORDÉON FAQ (SERVICES & CONTACT)
     ========================================================================= */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(other => other.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });


  /* =========================================================================
     7. CHARGEMENT DYNAMIQUE DE L'ÉTUDE DE CAS (projet-detail.html)
     ========================================================================= */
  const caseStudiesData = {
    agroflow: {
      title: "AgroFlow SaaS ERP — Gestion Agricole & Traçabilité",
      title_en: "AgroFlow SaaS ERP — Agricultural Management & Traceability",
      title_ja: "AgroFlow SaaS ERP — 農業管理・トレーサビリティ",
      category: "SaaS ERP & AgriTech",
      category_en: "SaaS ERP & AgriTech",
      category_ja: "SaaS ERP・アグリテック",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Concepteur & Développeur Full-Stack",
      role_en: "Lead Designer & Full-Stack Developer",
      role_ja: "設計責任者・フルスタック開発者",
      status: "● Prototype Opérationnel",
      status_en: "● Operational Prototype",
      status_ja: "● 実稼働プロトタイプ",
      summary: "Conception intégrale d'une suite logicielle cloud et offline-first pour les exploitants agricoles et coopératives. Digitalisation des parcelles, suivi phytosanitaire, comptabilité analytique des récoltes et génération de rapports automatisés.",
      summary_en: "End-to-end design of a cloud and offline-first software suite for farmers and cooperatives. Plot digitization, phytosanitary tracking, crop cost accounting, and automated reporting.",
      summary_ja: "農業生産者・農協向けクラウド＆オフラインファースト統合ソフトウェアの設計開発。圃場のデジタル化、農薬・肥料管理、収穫分析会計、自動レポート生成。",
      mainBanner: "rsc/img/projets/card_agroflow.webp",
      liveUrl: "https://agroflowsaas.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      waText: "Bonjour Jordan, j'ai consulté l'étude de cas AgroFlow et souhaite un projet similaire.",
      waText_en: "Hello Jordan, I read the AgroFlow case study and would like to discuss a similar project.",
      waText_ja: "こんにちは、Jordan。AgroFlowの事例を拝見し、同様のシステム開発について相談したいです。",
      problem: "Dans le secteur agro-pastoral, les exploitants et coopératives font face à des pertes considérables dues à une gestion manuelle sur registres papier, à l'absence de traçabilité des intrants et à une connectivité Internet très instable dans les zones de plantation. L'objectif était de développer un outil intuitif, accessible sur mobile et desktop, capable de fonctionner sans interruption même en zone blanche.",
      problem_en: "In the agro-pastoral sector, farmers and cooperatives face major losses due to manual paper record-keeping, lack of input traceability, and unstable internet connectivity in plantation zones. The goal was to build an intuitive, mobile-ready tool functioning seamlessly in offline areas.",
      problem_ja: "農牧業分野において、生産者や農協は手書き台帳による二重管理、資材トレーサビリティの欠如、農園地帯での不安定なインターネット接続による大きな損失に直面していました。目標は、オフライン地域でも中断なく動作する直感的なモバイル・デスクトップ対応ツールの開発でした。",
      architecture: "Pour répondre aux contraintes du terrain, j'ai mis en place une architecture modulaire basée sur React en frontend avec synchronisation locale IndexedDB, couplée à un backend REST en Node.js et une base relationnelle PostgreSQL hautement optimisée. La modélisation a suivi la méthode MERISE (MCD/MLD) garantissant une 3ème forme normale stricte.",
      architecture_en: "To address field constraints, I implemented a modular architecture using React frontend with IndexedDB local caching, coupled with a Node.js REST backend and highly optimized PostgreSQL relational database. Modeling followed MERISE (MCD/MLD) ensuring strict Third Normal Form (3NF).",
      architecture_ja: "現場の制約に対応するため、ReactフロントエンドとIndexedDBによるローカル同期キャッシュを採用し、Node.js RESTバックエンドおよび最適化されたPostgreSQLリレーショナルデータベースを構築しました。MERISE手法（MCD/MLD）に基づく厳格な第3正規形（3NF）で設計されています。",
      results: "L'architecture d'AgroFlow permet de supprimer les erreurs de double saisie manuelle, d'automatiser la consolidation des stocks et de fournir aux exploitants une visibilité directe sur la rentabilité de chaque parcelle cultivée. Le moteur de synchronisation locale traite les écritures hors-ligne et les réconcilie sans perte dès le rétablissement du réseau.",
      results_en: "AgroFlow's architecture eliminates duplicate manual entries, automates inventory reconciliation, and provides operators with real-time profitability per cultivated plot. The local sync engine stores offline writes and reconciles them losslessly upon network reconnection.",
      results_ja: "AgroFlowのアーキテクチャにより、二重入力ミスを排除し、在庫集計を自動化し、栽培区画ごとの収益性をリアルタイムで可視化しました。ローカル同期エンジンがオフライン時の書込を安全に保持し、ネットワーク復帰時に整合性を担保します。",
      quoteText: "« L'architecture d'AgroFlow et sa prise en main intuitive ont transformé notre suivi des campagnes agricoles. Jordan a su anticiper toutes les contraintes de connectivité du terrain avec brio. »",
      quoteText_en: "“AgroFlow's architecture and intuitive handling transformed our agricultural campaign management. Jordan brilliantly anticipated all field connectivity constraints.”",
      quoteText_ja: "「AgroFlowの構造と直感的な操作性は、農業キャンペーン管理を一変させました。Jordanは現地の通信環境の制約を見事に見越して設計してくれました。」",
      quoteAuthor: "— Chanceline, Direction Opérationnelle EGESOL SARL",
      quoteAuthor_en: "— Chanceline, Operations Management, EGESOL SARL",
      quoteAuthor_ja: "— シャンスリーヌ、EGESOL SARL 運用責任者",
      client: "Exploitants & Coopératives (EGESOL)",
      client_en: "Farmers & Cooperatives (EGESOL)",
      client_ja: "農業生産者・農協 (EGESOL)",
      industry: "AgriTech & Agro-industrie",
      industry_en: "AgriTech & Agribusiness",
      industry_ja: "アグリテック・農業ビジネス",
      duration: "4 Mois (Conception & Déploiement)",
      duration_en: "4 Months (Design & Deployment)",
      duration_ja: "4ヶ月（設計および導入）",
      authorRole: "Concepteur & Développeur Full-Stack",
      authorRole_en: "Lead Designer & Full-Stack Developer",
      authorRole_ja: "設計責任者・フルスタック開発者",
      techs: ["React", "Node.js", "PostgreSQL", "IndexedDB", "Docker"],
      gallery: [
        { img: "rsc/img/projets/card_agroflow.webp", caption: "Tableau de bord & KPIs" },
        { img: "rsc/img/projets/shot_agroflow.webp", caption: "Interface d'exploitation" },
        { img: "rsc/img/projets/dev/DC_Agroflow.webp", caption: "Diagramme de Classes SQL" }
      ]
    },
    sisterschola: {
      title: "Sister Schola ERP — Système Hospitalier & LIMS Clinique",
      title_en: "Sister Schola ERP — Hospital & Clinical LIMS System",
      title_ja: "Sister Schola ERP — 病院・臨床LIMSシステム",
      category: "Santé & LIMS Clinique",
      category_en: "Healthcare & Clinical LIMS",
      category_ja: "医療・臨床LIMS",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Concepteur & Développeur Full-Stack",
      role_en: "Lead Designer & Full-Stack Developer",
      role_ja: "設計責任者・フルスタック開発者",
      status: "● Prototype ERP Clinique",
      status_en: "● Clinical ERP Prototype",
      status_ja: "● 臨床ERPプロトタイプ",
      summary: "Plateforme ERP sur-mesure pour établissements de santé, cliniques et laboratoires d'analyse médicale. Gestion complète des admissions, dossiers patients confidentiels, facturation des actes et traçabilité des prélèvements biologiques.",
      summary_en: "Custom ERP platform for clinics, healthcare facilities, and biomedical testing laboratories. Complete handling of admissions, confidential electronic medical records, invoicing, and biological specimen traceability.",
      summary_ja: "クリニック・医療機関・検査ラボ向けカスタムERP基盤。患者受付、機密電子カルテ、診療報酬請求、検体トレーサビリティの完全統合管理。",
      mainBanner: "rsc/img/projets/dev/SisterSholaErp.webp",
      liveUrl: "https://sisterscholaerp.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai consulté l'étude de cas Sister Schola et souhaite un projet similaire.",
      waText_en: "Hello Jordan, I read the Sister Schola case study and would like to discuss a similar project.",
      waText_ja: "こんにちは、Jordan。Sister Scholaの事例を拝見し、医療管理システムについて相談したいです。",
      problem: "Les centres hospitaliers et polycliniques gèrent des flux de patients complexes et des dossiers médicaux sensibles. Les retards dans la transmission des ordonnances et la perte de fiches d'admission physiques causaient des files d'attente importantes et des risques d'erreurs médicales.",
      problem_en: "Healthcare centers and clinics manage intricate patient workflows and sensitive medical records. Prescription delivery delays and paper admission sheet losses led to lengthy waiting times and clinical error risks.",
      problem_ja: "医療機関やクリニックでは複雑な患者動線と機密性の高い医療記録を扱っています。処方箋伝達の遅延や紙の受付票紛失により、長時間の待機列や医療過誤のリスクが生じていました。",
      architecture: "Conception d'une application React/TypeScript avec gestion des permissions par rôles (RBAC : médecins, infirmiers, caissiers, biologistes). Le backend Express et la base PostgreSQL intègrent un journal d'audit immuable conforme aux impératifs du secret médical.",
      architecture_en: "Architecture built with React/TypeScript and role-based access control (RBAC: doctors, nurses, cashiers, lab technicians). Express backend and PostgreSQL database feature an immutable audit log adhering to medical confidentiality standards.",
      architecture_ja: "React/TypeScriptによる役割ベースのアクセス制御（RBAC：医師、看護師、会計、臨床検査技師）を実装。ExpressバックエンドとPostgreSQLに医療守秘義務に適合した改ざん不可能な監査ログを統合。",
      results: "Fluidification du parcours patient dès l'admission, sécurisation des antécédents médicaux par contrôle d'accès strict (RBAC) et génération automatisée des fiches de liaison entre la caisse et la pharmacie.",
      results_en: "Streamlined patient journey from admission, hardened medical history security via strict RBAC, and automated routing between cashier and in-house pharmacy.",
      results_ja: "受付時からの患者動線の円滑化、厳格なRBACによる病歴データのセキュリティ保護、会計と院内薬局間の自動連携伝票発行を実現。",
      quoteText: "« Une fiabilité remarquable sur les dossiers patients. L'interface est claire, ergonomique et a été immédiatement adoptée par tout le personnel soignant. »",
      quoteText_en: "“Remarkable reliability for patient medical records. The interface is clear, ergonomic, and was instantly adopted by our clinical nursing staff.”",
      quoteText_ja: "「患者カルテ管理の信頼性が非常に高いです。インターフェースは明快かつ人間工学に基づいており、医療スタッフ全員に即座に受け入れられました。」",
      quoteAuthor: "— Dr. E. Ndoumbe, Consultant Médical",
      quoteAuthor_en: "— Dr. E. Ndoumbe, Medical Consultant",
      quoteAuthor_ja: "— Dr. E. Ndoumbe、医療コンサルタント",
      client: "Cliniques & Centres Hospitaliers Privés",
      client_en: "Private Clinics & Healthcare Centers",
      client_ja: "民間クリニック・総合医療施設",
      industry: "Santé, Médical & LIMS",
      industry_en: "Healthcare, Medical & LIMS",
      industry_ja: "ヘルスケア・医療LIMS",
      duration: "5 Mois (Audit, Conception, Recette)",
      duration_en: "5 Months (Audit, Design, QA)",
      duration_ja: "5ヶ月（監査・設計・受入テスト）",
      authorRole: "Concepteur & Développeur Full-Stack",
      authorRole_en: "Lead Designer & Full-Stack Developer",
      authorRole_ja: "設計責任者・フルスタック開発者",
      techs: ["React", "TypeScript", "Express", "PostgreSQL", "RBAC", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/dev/SisterSholaErp.webp", caption: "Interface d'Accueil & Admissions" },
        { img: "rsc/img/projets/consultant IT/consultation-sisterShola.webp", caption: "Module de Consultation Médicale" },
        { img: "rsc/img/projets/dev/rsd_biobank_architecture.webp", caption: "Cartographie Système & Flux" }
      ]
    },
    candace: {
      title: "Candace Distribution & Petit Colis — Branding & Packaging",
      title_en: "Candace Distribution & Petit Colis — Branding & Packaging",
      title_ja: "Candace Distribution & Petit Colis — ブランディング＆3Dパッケージ",
      category: "Branding, Packaging & Print",
      category_en: "Branding, Packaging & Print",
      category_ja: "ブランディング・パッケージ・印刷",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Infographe & Designer Graphique",
      role_en: "Graphic Designer & Art Director",
      role_ja: "グラフィックデザイナー・アートディレクター",
      status: "● Commercialisé",
      status_en: "● Commercialized",
      status_ja: "● 市場展開中",
      summary: "Création complète de l'identité de marque cosmétique Candace (lait de beauté, étiquettes réglementaires, modélisation 3D photoréaliste) et direction des campagnes de communication pour la startup logistique Petit Colis.",
      summary_en: "Comprehensive brand identity creation for Candace Cosmetics (beauty lotion, regulatory labeling, photorealistic 3D modeling) and communication campaign direction for logistics startup Petit Colis.",
      summary_ja: "Candace化粧品のブランドアイデンティティ全面制作（美肌ローション、法定ラベル、フォトリアル3Dモデリング）および物流スタートアップPetit Colisの広報キャンペーン統括。",
      mainBanner: "rsc/img/projets/infographie/MockupCandace distribution.webp",
      liveUrl: "rsc/img/projets/infographie/MockupCandace distribution.webp",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu votre travail de branding Candace et souhaite une identité visuelle.",
      waText_en: "Hello Jordan, I saw your Candace branding work and would like to discuss a visual identity.",
      waText_ja: "こんにちは、Jordan。Candaceのブランディング実績を拝見し、デザイン制作について相談したいです。",
      problem: "Se démarquer sur le marché concurrentiel des cosmétiques et des services de livraison urbaine exige une signature visuelle professionnelle et mémorable, conforme aux normes d'emballage et adaptée aux réseaux sociaux comme aux affichages urbains.",
      problem_en: "Standing out in competitive cosmetics and urban delivery markets requires a memorable, professional visual identity compliant with packaging standards and optimized for both social media and large-format print.",
      problem_ja: "競争の激しい化粧品市場および都市型配送サービスにおいて差別化を図るには、包装規制に準拠し、SNSと屋外広告の双方に最適化された記憶に残るプロフェッショナルな視覚表現が必要でした。",
      architecture: "Conception vectorielle sur Adobe Illustrator (tracés typographiques personnalisés, palette or et blanc premium), modélisation des flacons sur Adobe Photoshop et déclinaison des gabarits d'impression haute définition pour imprimeurs offset.",
      architecture_en: "Vector design in Adobe Illustrator (custom typography, premium gold/white palette), 3D bottle modeling in Adobe Photoshop, and high-resolution print-ready templates for offset printing.",
      architecture_ja: "Adobe Illustratorによるベクターデザイン（独自タイポグラフィ、高級感のあるゴールド＆ホワイト配色）、Photoshopによるボトル3Dモデリング、オフセット印刷用高解像度入稿データの制作。",
      results: "Succès commercial immédiat au lancement des gammes Candace, et forte visibilité sur les campagnes de recrutement de chauffeurs-livreurs pour Petit Colis à Douala et Yaoundé.",
      results_en: "Immediate commercial success at Candace product launch, and strong recruitment campaign visibility for Petit Colis delivery drivers across Douala and Yaoundé.",
      results_ja: "Candaceブランドの発売直後からの商業的成功、およびドゥアラ・ヤウンデにおけるPetit Colis配達員採用キャンペーンでの高い認知度獲得。",
      quoteText: "« Jordan a su capter l'ADN de notre marque avec des mockups et des affiches qui ont immédiatement séduit nos clients et nos partenaires. »",
      quoteText_en: "“Jordan captured our brand DNA with mockups and posters that instantly won over our customers and strategic partners.”",
      quoteText_ja: "「Jordanは、顧客やパートナーを即座に魅了するモックアップとポスターで、私たちのブランドDNAを見事に具現化してくれました。」",
      quoteAuthor: "— FUNGA Gautier, Co-fondateur Petit Colis",
      quoteAuthor_en: "— FUNGA Gautier, Co-founder, Petit Colis",
      quoteAuthor_ja: "— ガウティエ・フンガ、Petit Colis 共同創業者",
      client: "Candace Cosmetics & Petit Colis Express",
      client_en: "Candace Cosmetics & Petit Colis Express",
      client_ja: "Candace化粧品 & Petit Colis Express",
      industry: "Cosmétique, Logistique & Grande Distribution",
      industry_en: "Cosmetics, Logistics & Retail",
      industry_ja: "化粧品・物流・流通",
      duration: "2 Mois",
      duration_en: "2 Months",
      duration_ja: "2ヶ月",
      authorRole: "Infographe & Designer Graphique",
      authorRole_en: "Graphic Designer & Art Director",
      authorRole_ja: "グラフィックデザイナー・アートディレクター",
      techs: ["Adobe Illustrator", "Adobe Photoshop", "Modélisation 3D", "Pré-presse"],
      gallery: [
        { img: "rsc/img/projets/infographie/MockupCandace distribution.webp", caption: "Packaging Candace Lait de Beauté" },
        { img: "rsc/img/projets/infographie/flyer  recruitement petit colis.webp", caption: "Campagne Recrutement Petit Colis" },
        { img: "rsc/img/projets/infographie/flyer goldens pressing.webp", caption: "Flyer Commercial Golden Pressing" }
      ]
    },
    labographie: {
      title: "LaboGraphie Web Platform — Vitrine Tech & Cyber-Hub",
      title_en: "LaboGraphie Web Platform — Tech Showcase & Cyber-Hub",
      title_ja: "LaboGraphie Web Platform — 技術ポータル＆サイバーハブ",
      category: "Plateforme Web & Architecture",
      category_en: "Web Platform & Architecture",
      category_ja: "Webプラットフォーム・アーキテクチャ",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Fondateur & Développeur Web",
      role_en: "Founder & Web Developer",
      role_ja: "創設者・Web開発者",
      status: "● En Production",
      status_en: "● In Production",
      status_ja: "● 実稼働中",
      summary: "Portail officiel et vitrine technologique des solutions logicielles, infographiques et créatives du collectif LaboGraphie fondé avec des camarades. Architecture modulaire Vanilla JavaScript, accessibilité et performances optimales.",
      summary_en: "Official portal and technology showcase for software, graphic, and creative solutions developed by the LaboGraphie collective. Lightweight Vanilla JavaScript architecture, high accessibility, and peak performance.",
      summary_ja: "学友と創設したLaboGraphieの公式ポータルおよび技術ショーケース。Vanilla JavaScriptによる軽量モジュール構成、アクセシビリティ、最適化されたパフォーマンス。",
      mainBanner: "rsc/img/projets/dev/LaboGraphie-web.webp",
      liveUrl: "https://labographie.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai consulté LaboGraphie Web et souhaite une plateforme équivalente.",
      waText_en: "Hello Jordan, I explored LaboGraphie Web and would like to build a similar platform.",
      waText_ja: "こんにちは、Jordan。LaboGraphie Webを拝見し、同様のWeb基盤について相談したいです。",
      problem: "Présenter une offre pluridisciplinaire (développement web/SaaS, réseaux, infographie, maintenance) sans submerger l'utilisateur, tout en offrant une expérience interactive immersive et rapide sur les réseaux mobiles à faible débit.",
      problem_en: "Showcase multidisciplinary offerings (web/SaaS, networks, graphic design, IT maintenance) without cognitive overload, delivering an immersive, high-speed experience on bandwidth-constrained mobile networks.",
      problem_ja: "Web/SaaS開発、ネットワーク、グラフィック、IT保守にわたる多様なサービスを認知過負荷なく提示し、低帯域モバイル環境でも高速かつ没入感のある操作感を提供すること。",
      architecture: "Architecture Vanilla JavaScript ultra-légère sans overhead de frameworks lourds, modularisation CSS avec custom properties dynamiques, lazy-loading natif des assets graphiques et transitions CSS optimisées sur le GPU.",
      architecture_en: "Ultra-lightweight Vanilla JS architecture eliminating heavy framework overhead, CSS modularity via custom properties, native lazy loading, and GPU-accelerated CSS animations.",
      architecture_ja: "重量級フレームワークのオーバーヘッドを排したVanilla JavaScript設計、動的CSS変数によるモジュール化、メディアのネイティブ遅延読込、GPUアクセラレーションによる滑らかなアニメーション。",
      results: "Temps de chargement rapide sur réseaux mobiles, navigation fluide sans dépendances externes lourdes et vitrine technique accessible aux recruteurs et partenaires.",
      results_en: "Ultra-fast load times across 3G/4G networks, zero-dependency fluid navigation, and a high-impact technical portfolio for recruiters and enterprise partners.",
      results_ja: "低速モバイル環境での高速読込、外部依存ゼロの軽快なページ遷移、採用担当者やパートナー企業に対する信頼性の高い技術提示。",
      quoteText: "« Une vitrine qui allie élégance visuelle et rigueur technique. La clarté du code et l'expérience utilisateur sont irréprochables. »",
      quoteText_en: "“A portfolio that pairs visual elegance with engineering discipline. Clean code and smooth user experience throughout.”",
      quoteText_ja: "「視覚的な洗練さと技術的規律を兼ね備えたショーケースです。コードの明快さとUXの完成度は申し分ありません。」",
      quoteAuthor: "— Powo Arnold, Data Analyst & Partenaire Tech",
      quoteAuthor_en: "— Powo Arnold, Data Analyst & Tech Partner",
      quoteAuthor_ja: "— ポウォ・アーノルド、データアナリスト＆技術パートナー",
      client: "Collectif LaboGraphie (Prestations Entreprises & RSD Institute)",
      client_en: "LaboGraphie Collective (Enterprise Services & RSD Institute)",
      client_ja: "LaboGraphie共同体（企業向け受託＆RSD研究所）",
      industry: "Technologies de l'Information & Digital",
      industry_en: "Information Technology & Digital Media",
      industry_ja: "情報技術・デジタルメディア",
      duration: "3 Semaines",
      duration_en: "3 Weeks",
      duration_ja: "3週間",
      authorRole: "Fondateur & Développeur Web",
      authorRole_en: "Founder & Web Developer",
      authorRole_ja: "創設者・Web開発者",
      techs: ["HTML5 sémantique", "CSS3 GPU-accelerated", "Vanilla JS ES6+", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/dev/LaboGraphie-web.webp", caption: "Aperçu de la plateforme" },
        { img: "rsc/img/projets/dev/labographie-rpoject-map.webp", caption: "Cartographie des modules" },
        { img: "rsc/img/projets/infographie/mockup_logo_business labographie couleur.webp", caption: "Identité de marque LaboGraphie" }
      ]
    },
    acuvera: {
      title: "Acuvera Clinical LIMS — Gestion des Analyses Biomédicales",
      title_en: "Acuvera Clinical LIMS — Biomedical Analysis Management",
      title_ja: "Acuvera Clinical LIMS — 生体検査管理システム",
      category: "Biomédical & Suivi d'Analyses (Projet Client)",
      category_en: "Biomedical & Lab Tracking (Client Delivery)",
      category_ja: "生体医療・検査追跡（受託納品実績）",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Développeur Web & Concepteur",
      role_en: "Web Developer & Designer",
      role_ja: "Web開発者・設計者",
      status: "● Prestation Client Livrée (40 000 FCFA)",
      status_en: "● Delivered Client Project (40,000 FCFA)",
      status_ja: "● 納品済みクライアント案件（40,000 FCFA）",
      summary: "Site web vitrine et portail de suivi d'analyses biomédicales conçu pour le cabinet du Dr Zemzi (prestation facturée 40 000 FCFA). Présentation des examens de laboratoire et consultation sécurisée des résultats.",
      summary_en: "Showcase website and biomedical test tracking portal engineered for Dr. Zemzi's clinic (billed at 40,000 FCFA). Laboratory service showcase and secure result lookup.",
      summary_ja: "Dr. Zemzi診療所向けWebサイトおよび生体検査追跡ポータル（40,000 FCFAにて受注納品）。臨床検査メニューの案内と検査結果の安全な照会機能。",
      mainBanner: "rsc/img/projets/card_acuvera.webp",
      liveUrl: "https://acuvera-clinical.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu Acuvera Clinical et souhaite un système similaire.",
      waText_en: "Hello Jordan, I reviewed Acuvera Clinical and would like to build a similar health tracking system.",
      waText_ja: "こんにちは、Jordan。Acuvera Clinicalを拝見し、医療ポータル制作について相談したいです。",
      problem: "Le Dr Zemzi souhaitait doter son cabinet d'un site vitrine moderne et d'un portail léger permettant aux patients et praticiens de suivre l'état de leurs analyses biomédicales sans la lourdeur ni le coût d'un système hospitalier complexe.",
      problem_en: "Dr. Zemzi required a modern showcase website and lightweight portal enabling patients and clinicians to track biomedical test status without the cost or complexity of heavy hospital software.",
      problem_ja: "Dr. Zemzi医師は、高額で複雑な病院システムを導入することなく、患者や医療従事者が検査の進行状況を確認できる軽量ポータルと公式サイトを求めていました。",
      architecture: "Interface React modulaire avec espace de suivi d'analyses, validation des formulaires en temps réel et édition structurée des résultats de laboratoire prêts à l'impression.",
      architecture_en: "Modular React architecture featuring test status lookup, real-time client validation, and structured print-ready laboratory report generation.",
      architecture_ja: "検査追跡機能を備えたモジュール型Reactインターフェース、リアルタイムフォーム検証、印刷対応の構造化検査結果出力機能を構築。",
      results: "Livraison réussie d'une solution web sur-mesure pour le Dr Zemzi dans un budget maîtrisé (40 000 FCFA), garantissant un suivi clair des analyses et une présence professionnelle en ligne.",
      results_en: "Successful delivery of a tailored web solution for Dr. Zemzi within a controlled budget (40,000 FCFA), ensuring transparent analysis tracking and professional digital presence.",
      results_ja: "限られた予算内（40,000 FCFA）でDr. Zemzi医師の要望を満たすWebソリューションを納品し、確実な検査追跡と信頼性の高いWebプレゼンスを実現。",
      quoteText: "« La rigueur de conception d'Acuvera garantit une sécurité essentielle dans le traitement de nos résultats de laboratoire. »",
      quoteText_en: "“Acuvera's engineering rigor provides essential reliability in handling our laboratory test results.”",
      quoteText_ja: "「Acuveraの綿密な設計により、私たちの臨床検査結果の取り扱いに不可欠な信頼性が確保されています。」",
      quoteAuthor: "— Marlyse, Ingénieur Polytech Yaoundé",
      quoteAuthor_en: "— Marlyse, Engineer, Polytech Yaoundé",
      quoteAuthor_ja: "— マルリース、ヤウンデ工科大学 エンジニア",
      client: "Dr. Zemzi (Cabinet Médical · Prestation facturée 40 000 FCFA)",
      client_en: "Dr. Zemzi (Medical Clinic · Billed at 40,000 FCFA)",
      client_ja: "Dr. Zemzi（診療所・40,000 FCFAにて受託）",
      industry: "Biologie Médicale & Santé",
      industry_en: "Medical Biology & Healthcare",
      industry_ja: "臨床検査・医療ヘルスケア",
      duration: "3 Mois",
      duration_en: "3 Months",
      duration_ja: "3ヶ月",
      authorRole: "Développeur Web & Concepteur",
      authorRole_en: "Web Developer & Designer",
      authorRole_ja: "Web開発者・設計者",
      techs: ["React", "REST API", "TailwindCSS", "PDF Generation", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/card_acuvera.webp", caption: "Tableau de Bord Acuvera" },
        { img: "rsc/img/projets/shot_acuvera.webp", caption: "Gestion des Bilans Biologiques" },
        { img: "rsc/img/projets/dev/rsd_biobank_architecture.webp", caption: "Architecture des Données" }
      ]
    },
    arduino: {
      title: "Arduino IoT & Maintenance Réseaux — Électronique & Infrastructure",
      title_en: "Arduino IoT & Network Maintenance — Hardware & Infrastructure",
      title_ja: "Arduino IoT＆ネットワーク保守 — ハードウェアとITインフラ",
      category: "Systèmes, IoT & Réseaux",
      category_en: "Systems, IoT & Networks",
      category_ja: "システム・IoT・ネットワーク",
      year: "Année 2025 - 2026",
      year_en: "Year 2025 - 2026",
      year_ja: "2025 - 2026年度",
      role: "Technologue en Systèmes & Réseaux",
      role_en: "Systems & Network Technologist",
      role_ja: "システム＆ネットワーク技術者",
      status: "● Réalisation Technique & Labo",
      status_en: "● Technical & Lab Demonstration",
      status_ja: "● 実証実験＆技術研究",
      summary: "Conception de prototypes d'acquisition de données sur microcontrôleurs Arduino, programmation en C++, câblage et brassage de baies serveurs et configuration de switches/routeurs.",
      summary_en: "Prototyping data acquisition systems on Arduino microcontrollers in C++, patch panel and server rack structured cabling, and Cisco switch/router configuration.",
      summary_ja: "Arduinoマイコンを用いたデータ収集プロトタイプ開発（C++）、サーバーラック配線・パッチパネル施工、Ciscoスイッチ/ルーターの設定。",
      mainBanner: "rsc/img/projets/maintenance/tp arduino.webp",
      liveUrl: "rsc/img/projets/maintenance/tp arduino.webp",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu votre projet Arduino & Réseaux et souhaite échanger sur une infrastructure.",
      waText_en: "Hello Jordan, I reviewed your Arduino & Networks project and would like to discuss infrastructure.",
      waText_ja: "こんにちは、Jordan。Arduinoとネットワークの実績を拝見し、インフラ構築について相談したいです。",
      problem: "Relier les équipements physiques de terrain (capteurs de température, humidité, déclencheurs) aux réseaux d'entreprise nécessite une maîtrise conjointe du hardware, des protocoles de communication et de la sécurité des baies de brassage.",
      problem_en: "Connecting field hardware (temperature/humidity sensors, actuators) to enterprise IT networks requires comprehensive mastery of hardware interfaces, communication protocols, and physical rack security.",
      problem_ja: "現地の物理機器（温度・湿度センサー、アクチュエータ）を企業ネットワークに統合するには、ハードウェア、通信プロトコル、サーバーラックの物理的セキュリティに対する包括的な技術が不可欠でした。",
      architecture: "Programmation firmware Arduino en C/C++, communication série / bus I2C / SPI, segmentation des réseaux via VLANs et adressage IPv4/IPv6 sous environnement Cisco Packet Tracer.",
      architecture_en: "Arduino firmware programmed in C/C++, serial/I2C/SPI bus protocols, network segmentation via VLANs, and IPv4/IPv6 addressing simulated with Cisco Packet Tracer.",
      architecture_ja: "C/C++によるArduinoファームウェア開発、シリアル/I2C/SPIバス通信、VLANによるネットワークセグメンテーション、Cisco環境でのIPv4/IPv6アドレス設計。",
      results: "Automatisation de la collecte des métriques environnementales, zéro perte de paquets et sécurisation physique et logique des baies de données.",
      results_en: "Automated environmental metrics capture, zero packet loss across segmented subnets, and hardened physical/logical data cabinet security.",
      results_ja: "環境計測データの自動収集、パケット損失ゼロの安定通信、サーバーラックの物理的および論理的セキュリティの確立。",
      quoteText: "« Les compétences techniques de Jordan en réseaux et systèmes embarqués allient théorie rigoureuse et sens pratique du câblage et de la maintenance. »",
      quoteText_en: "“Jordan's technical expertise in networks and embedded systems blends rigorous theory with hands-on mastery of cabling and maintenance.”",
      quoteText_ja: "「Jordanのネットワークと組込みシステムにおける技術力は、厳格な理論と現場配線・保守の実践力を兼ね備えています。」",
      quoteAuthor: "— Pr. Edii, Professeur de Réseaux & Sécurité Informatique",
      quoteAuthor_en: "— Prof. Edii, Professor of Networks & Cybersecurity",
      quoteAuthor_ja: "— エディ教授、ネットワーク＆情報セキュリティ教授",
      client: "Département Informatique & Laboratoires Universitaires",
      client_en: "Computer Science Dept & University Labs",
      client_ja: "大学情報工学部＆研究室",
      industry: "Électronique, IoT & Réseaux Télécoms",
      industry_en: "Electronics, IoT & Telecom Networks",
      industry_ja: "エレクトロニクス・IoT・通信ネットワーク",
      duration: "4 Mois",
      duration_en: "4 Months",
      duration_ja: "4ヶ月",
      authorRole: "Technologue en Systèmes & Réseaux",
      authorRole_en: "Systems & Network Technologist",
      authorRole_ja: "システム＆ネットワーク技術者",
      techs: ["C / C++", "Arduino", "Cisco IOS", "VLANs", "Baies de Brassage", "Linux"],
      gallery: [
        { img: "rsc/img/projets/maintenance/tp arduino.webp", caption: "Prototypage Microcontrôleur Arduino" },
        { img: "rsc/img/projets/card_edii.webp", caption: "Topologie Réseau & Sécurité" },
        { img: "rsc/img/projets/maintenance/pexels-field-engineer-147254-442154.webp", caption: "Maintenance Baie Serveur" }
      ]
    }
  };

  function renderCaseStudyDetail(lang = currentLang) {
    const caseTitle = document.getElementById('caseTitle');
    if (!caseTitle) return;

    const urlParams = new URLSearchParams(window.location.search);
    const rawId = urlParams.get('id');
    const projectId = rawId ? rawId.trim().toLowerCase() : '';

    // Normalisation des clés & alias
    let projectKey = projectId;
    if (projectId === 'sister-schola' || projectId === 'sisterschola') {
      projectKey = 'sisterschola';
    } else if (projectId === 'petit-colis' || projectId === 'petitcolis') {
      projectKey = 'candace';
    }

    const d = (projectKey && caseStudiesData[projectKey]) ? caseStudiesData[projectKey] : null;

    if (!d) {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        document.title = "Projet non répertorié — NDE Jordan L.";
        mainEl.innerHTML = `
          <section class="project-detail-hero" style="min-height: 60vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 4rem 1.5rem;">
            <div class="container" style="max-width: 680px; margin: 0 auto;">
              <div style="background: var(--figma-dark-card, #1B1B1B); border: 1px solid #333; border-radius: 24px; padding: 3.5rem 2rem; color: #FFF; box-shadow: 0 20px 40px rgba(0,0,0,0.4);">
                <div style="font-size: 3.5rem; margin-bottom: 1.25rem;">🔍</div>
                <div class="project-meta-pills" style="justify-content: center; margin-bottom: 1.25rem;">
                  <span class="meta-pill highlight" style="color: var(--figma-orange, #FD6F00); border-color: rgba(253, 111, 0, 0.4);">${(lang === 'ja') ? '該当なし' : (lang === 'en') ? 'Route Not Found' : 'Routage Introuvable'}</span>
                </div>
                <h1 class="project-detail-title" style="font-size: 2.25rem; font-weight: 700; margin-bottom: 1rem; color: #FFF;">
                  Projet non répertorié
                </h1>
                <p class="project-detail-summary" style="font-size: 1.05rem; color: #A0A0A0; line-height: 1.6; margin-bottom: 2.25rem;">
                  ${(lang === 'ja') ? '指定されたプロジェクトは存在しないか移動された可能性があります。作品一覧をご覧ください。' : (lang === 'en') ? 'The requested project could not be found or has moved. Please browse our portfolio catalog.' : 'L\\'identifiant de projet demandé n\\'existe pas ou a été déplacé. Veuillez consulter notre catalogue complet pour découvrir toutes les réalisations disponibles.'}
                </p>
                <div class="project-detail-links" style="justify-content: center;">
                  <a href="portfolio.html" class="btn-primary-orange" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.9rem 2rem; font-weight: 600;">
                    &larr; ${(lang === 'ja') ? 'プロジェクト一覧に戻る' : (lang === 'en') ? 'Back to Portfolio Catalog' : 'Retourner au catalogue des projets'}
                  </a>
                </div>
              </div>
            </div>
          </section>
        `;
      }
    } else {
      const locTitle = (lang === 'ja' && d.title_ja) ? d.title_ja : (lang === 'en' && d.title_en) ? d.title_en : d.title;
      const locCat = (lang === 'ja' && d.category_ja) ? d.category_ja : (lang === 'en' && d.category_en) ? d.category_en : d.category;
      const locYear = (lang === 'ja' && d.year_ja) ? d.year_ja : (lang === 'en' && d.year_en) ? d.year_en : d.year;
      const locRole = (lang === 'ja' && d.role_ja) ? d.role_ja : (lang === 'en' && d.role_en) ? d.role_en : d.role;
      const locStatus = (lang === 'ja' && d.status_ja) ? d.status_ja : (lang === 'en' && d.status_en) ? d.status_en : d.status;
      const locSummary = (lang === 'ja' && d.summary_ja) ? d.summary_ja : (lang === 'en' && d.summary_en) ? d.summary_en : d.summary;
      const locProblem = (lang === 'ja' && d.problem_ja) ? d.problem_ja : (lang === 'en' && d.problem_en) ? d.problem_en : d.problem;
      const locArch = (lang === 'ja' && d.architecture_ja) ? d.architecture_ja : (lang === 'en' && d.architecture_en) ? d.architecture_en : d.architecture;
      const locResults = (lang === 'ja' && d.results_ja) ? d.results_ja : (lang === 'en' && d.results_en) ? d.results_en : d.results;
      const locQuoteText = (lang === 'ja' && d.quoteText_ja) ? d.quoteText_ja : (lang === 'en' && d.quoteText_en) ? d.quoteText_en : d.quoteText;
      const locQuoteAuthor = (lang === 'ja' && d.quoteAuthor_ja) ? d.quoteAuthor_ja : (lang === 'en' && d.quoteAuthor_en) ? d.quoteAuthor_en : d.quoteAuthor;
      const locClient = (lang === 'ja' && d.client_ja) ? d.client_ja : (lang === 'en' && d.client_en) ? d.client_en : d.client;
      const locIndustry = (lang === 'ja' && d.industry_ja) ? d.industry_ja : (lang === 'en' && d.industry_en) ? d.industry_en : d.industry;
      const locDuration = (lang === 'ja' && d.duration_ja) ? d.duration_ja : (lang === 'en' && d.duration_en) ? d.duration_en : d.duration;
      const locAuthorRole = (lang === 'ja' && d.authorRole_ja) ? d.authorRole_ja : (lang === 'en' && d.authorRole_en) ? d.authorRole_en : d.authorRole;
      const locWaText = (lang === 'ja' && d.waText_ja) ? d.waText_ja : (lang === 'en' && d.waText_en) ? d.waText_en : d.waText;

      document.title = `${locTitle} — NDE Jordan L.`;
      caseTitle.textContent = locTitle;
      
      const caseCatPill = document.getElementById('caseCatPill');
      if (caseCatPill) caseCatPill.textContent = locCat;
      const caseYearPill = document.getElementById('caseYearPill');
      if (caseYearPill) caseYearPill.textContent = locYear;
      const caseRolePill = document.getElementById('caseRolePill');
      if (caseRolePill) caseRolePill.textContent = (lang === 'ja' ? '役割 : ' : lang === 'en' ? 'Role: ' : 'Rôle : ') + locRole;
      const caseStatusPill = document.getElementById('caseStatusPill');
      if (caseStatusPill) caseStatusPill.textContent = locStatus;

      const caseSummary = document.getElementById('caseSummary');
      if (caseSummary) caseSummary.textContent = locSummary;

      const caseLiveBtn = document.getElementById('caseLiveBtn');
      if (caseLiveBtn) {
        if (d.liveUrl.startsWith('http')) {
          caseLiveBtn.href = d.liveUrl;
          caseLiveBtn.style.display = 'inline-flex';
          caseLiveBtn.innerHTML = (lang === 'ja') ? 'オンラインデモを試す ↗' : (lang === 'en') ? 'Test Live Demo ↗' : 'Tester la Démo en Ligne ↗';
        } else {
          caseLiveBtn.href = '#';
          caseLiveBtn.className = 'btn-primary-orange btn-zoom-img';
          caseLiveBtn.setAttribute('data-img', d.mainBanner);
          caseLiveBtn.innerHTML = (lang === 'ja') ? '全画面プレビュー 🔍' : (lang === 'en') ? 'Full Screen Preview 🔍' : 'Aperçu Plein Écran 🔍';
        }
      }

      const caseGitBtn = document.getElementById('caseGitBtn');
      if (caseGitBtn) caseGitBtn.href = d.gitUrl;

      const caseWaBtn = document.getElementById('caseWaBtn');
      if (caseWaBtn) {
        caseWaBtn.href = `https://wa.me/237679279447?text=${encodeURIComponent(locWaText)}`;
      }

      const caseMainBannerImg = document.getElementById('caseMainBannerImg');
      const caseMainBannerBox = document.getElementById('caseMainBannerBox');
      if (caseMainBannerImg) caseMainBannerImg.src = d.mainBanner;
      if (caseMainBannerBox) caseMainBannerBox.setAttribute('data-img', d.mainBanner);

      const caseProblem = document.getElementById('caseProblem');
      if (caseProblem) caseProblem.textContent = locProblem;
      const caseArchitecture = document.getElementById('caseArchitecture');
      if (caseArchitecture) caseArchitecture.textContent = locArch;
      const caseResults = document.getElementById('caseResults');
      if (caseResults) caseResults.textContent = locResults;

      const caseQuoteText = document.getElementById('caseQuoteText');
      if (caseQuoteText) caseQuoteText.textContent = locQuoteText;
      const caseQuoteAuthor = document.getElementById('caseQuoteAuthor');
      if (caseQuoteAuthor) caseQuoteAuthor.textContent = locQuoteAuthor;

      const caseClient = document.getElementById('caseClient');
      if (caseClient) caseClient.textContent = locClient;
      const caseIndustry = document.getElementById('caseIndustry');
      if (caseIndustry) caseIndustry.textContent = locIndustry;
      const caseDuration = document.getElementById('caseDuration');
      if (caseDuration) caseDuration.textContent = locDuration;
      const caseAuthorRole = document.getElementById('caseAuthorRole');
      if (caseAuthorRole) caseAuthorRole.textContent = locAuthorRole;

      const caseTechStack = document.getElementById('caseTechStack');
      if (caseTechStack) {
        caseTechStack.innerHTML = d.techs.map(t => `<span class="hub-tech-pill">${t}</span>`).join('');
      }

      const caseGalleryGrid = document.getElementById('caseGalleryGrid');
      if (caseGalleryGrid) {
        caseGalleryGrid.innerHTML = d.gallery.map(item => `
          <div class="case-study-thumb btn-zoom-img" data-img="${item.img}">
            <img src="${item.img}" alt="${item.caption}">
            <div class="case-thumb-caption">${item.caption}</div>
          </div>
        `).join('');
      }
    }
  }

  // Initialisation projet-detail
  if (document.getElementById('caseTitle')) {
    renderCaseStudyDetail(currentLang);
  }

  const articlesData = {
    "architecture-modulaire": {
      category: "✦ Génie Logiciel & Architecture",
      category_en: "✦ Software Engineering & Architecture",
      category_ja: "✦ ソフトウェア工学＆アーキテクチャ",
      title: "Concevoir une architecture logicielle modulaire et résiliente en milieu à connectivité intermittente",
      title_en: "Designing modular and resilient software architectures in intermittent connectivity environments",
      title_ja: "断続的接続環境におけるモジュール型高耐障害性ソフトウェアアーキテクチャの設計",
      breadcrumb: "Architecture Modulaire",
      breadcrumb_en: "Modular Architecture",
      breadcrumb_ja: "モジュール型アーキテクチャ",
      date: "18 Octobre 2026",
      date_en: "October 18, 2026",
      date_ja: "2026年10月18日",
      readTime: "7 min de lecture",
      readTime_en: "7 min read",
      readTime_ja: "読了目安：約7分",
      cover: "rsc/img/blog_architecture.webp",
      lead: "Dans les contextes d'exploitation où le réseau Internet et l'alimentation électrique connaissent des coupures fréquentes, concevoir une application critique requiert de repenser l'architecture système de fond en comble.",
      lead_en: "In operational environments where electrical power and internet connectivity suffer frequent outages, engineering mission-critical applications requires rethinking system architecture from the ground up.",
      lead_ja: "電力やインターネット接続が頻繁に途絶する運用環境において、ミッションクリティカルなシステムを構築するには、システムアーキテクチャを根本から再考する必要があります。",
      relatedTitle: "AgroFlow SaaS ERP",
      relatedTitle_en: "AgroFlow SaaS ERP",
      relatedTitle_ja: "AgroFlow SaaS ERP",
      relatedDesc: "Découvrez concrètement l'implémentation de cette architecture dans notre ERP agricole utilisé pour le suivi des exploitations et la synchronisation décentralisée.",
      relatedDesc_en: "Explore the practical implementation of this architecture in our agricultural ERP platform used for farm tracking and decentralized synchronization.",
      relatedDesc_ja: "農園管理および分散同期のために開発された農業ERPプラットフォームにおける本アーキテクチャの実践的実装をご覧ください。",
      relatedLive: "https://agroflowsaas.vercel.app",
      relatedCase: "projet-detail.html?id=agroflow"
    },
    "agroflow-erp": {
      category: "✦ AgriTech & SaaS ERP",
      category_en: "✦ AgriTech & SaaS ERP",
      category_ja: "✦ アグリテック＆SaaS ERP",
      title: "AgroFlow : De la modélisation UML/SQL à un ERP SaaS agricole haute disponibilité",
      title_en: "AgroFlow: From UML/SQL data modeling to a high-availability agricultural SaaS ERP",
      title_ja: "AgroFlow：UML/SQLモデリングから高可用性農業SaaS ERPの実現まで",
      breadcrumb: "AgroFlow ERP",
      breadcrumb_en: "AgroFlow ERP",
      breadcrumb_ja: "AgroFlow ERP",
      date: "24 Septembre 2026",
      date_en: "September 24, 2026",
      date_ja: "2026年9月24日",
      readTime: "9 min de lecture",
      readTime_en: "9 min read",
      readTime_ja: "読了目安：約9分",
      cover: "rsc/img/projets/card_agroflow.webp",
      lead: "Étude de cas approfondie sur la normalisation des schémas relationnels de parcelles agricoles, l'indexation B-Tree et la génération instantanée de bilans d'exploitation pour coopératives.",
      lead_en: "In-depth case study on relational schema normalization for agricultural plots, B-Tree index optimization, and real-time operational balance sheet generation for cooperatives.",
      lead_ja: "農業区画のリレーショナルスキーマ正規化、B-Treeインデックス最適化、農協向けリアルタイム収支決算書自動生成に関する詳細事例研究。",
      relatedTitle: "AgroFlow SaaS ERP",
      relatedTitle_en: "AgroFlow SaaS ERP",
      relatedTitle_ja: "AgroFlow SaaS ERP",
      relatedDesc: "Plateforme cloud et hors-ligne permettant aux coopératives de piloter la production, les ventes et la traçabilité des récoltes en temps réel.",
      relatedDesc_en: "Cloud and offline platform enabling farming cooperatives to monitor harvest production, sales, and supply chain traceability in real time.",
      relatedDesc_ja: "農協が収穫生産、販売、サプライチェーントレーサビリティをリアルタイムで追跡できるクラウド＆オフラインプラットフォーム。",
      relatedLive: "https://agroflowsaas.vercel.app",
      relatedCase: "projet-detail.html?id=agroflow"
    },
    "sister-schola": {
      category: "✦ Clinique & Santé LIMS",
      category_en: "✦ Clinical & Healthcare LIMS",
      category_ja: "✦ 臨床医療＆LIMS",
      title: "Sister Schola & Traçabilité LIMS : Garantir le secret médical et la cohérence des flux hospitaliers",
      title_en: "Sister Schola & LIMS Traceability: Guaranteeing medical confidentiality and clinical workflow integrity",
      title_ja: "Sister ScholaとLIMSトレーサビリティ：守秘義務と臨床データ整合性の両立",
      breadcrumb: "Sister Schola ERP",
      breadcrumb_en: "Sister Schola ERP",
      breadcrumb_ja: "Sister Schola ERP",
      date: "12 Août 2026",
      date_en: "August 12, 2026",
      date_ja: "2026年8月12日",
      readTime: "6 min de lecture",
      readTime_en: "6 min read",
      readTime_ja: "読了目安：約6分",
      cover: "rsc/img/projets/dev/SisterSholaErp.webp",
      lead: "Implémentation de protocoles de sécurité stricts (RBAC, audit logs infalsifiables) pour la numérisation des dossiers patients et des flux d'admission clinique.",
      lead_en: "Implementation of strict security protocols (RBAC, tamper-proof audit trails) for digitalizing confidential patient health records and clinic admission workflows.",
      lead_ja: "電子患者カルテおよび診療受付フローのデジタル化に向けた厳格なセキュリティプロトコル（RBAC、改ざん防止監査ログ）の実装。",
      relatedTitle: "Sister Schola ERP",
      relatedTitle_en: "Sister Schola ERP",
      relatedTitle_ja: "Sister Schola ERP",
      relatedDesc: "Système intégré hospitalier assurant la gestion des patients, admissions, facturations et traçabilité des analyses de laboratoire.",
      relatedDesc_en: "Integrated clinical management software streamlining patient care, admissions, billing, and biomedical test tracking.",
      relatedDesc_ja: "患者管理、受付、診療費請求、臨床検査追跡を円滑化する統合型病院管理システム。",
      relatedLive: "https://sisterscholaerp.vercel.app",
      relatedCase: "projet-detail.html?id=sisterschola"
    }
  };

  function renderArticleDetail(lang = currentLang) {
    const articleTitle = document.getElementById('articleTitle');
    if (!articleTitle) return;

    const urlParams = new URLSearchParams(window.location.search);
    const rawArticleId = urlParams.get('id');
    const articleId = rawArticleId ? rawArticleId.trim().toLowerCase() : '';
    const a = (articleId && articlesData[articleId]) ? articlesData[articleId] : null;

    if (!a) {
      document.title = 'Publication non répertoriée — NDE Jordan L.';
      const articleContainer = document.querySelector('.article-container');
      if (articleContainer) {
        articleContainer.innerHTML = `
          <div style="text-align: center; padding: 5rem 1rem;">
            <div style="display: inline-flex; align-items: center; justify-content: center; width: 80px; height: 80px; border-radius: 50%; background: rgba(253, 111, 0, 0.1); color: var(--figma-orange); font-size: 2.5rem; margin-bottom: 1.5rem;">
              📑
            </div>
            <h1 style="font-size: 2.25rem; font-weight: 800; color: #111; margin-bottom: 1rem;">
              Publication non répertoriée
            </h1>
            <p style="font-size: 1.05rem; color: #666; max-width: 600px; margin: 0 auto 2.5rem auto; line-height: 1.6;">
              ${(lang === 'ja') ? 'リクエストされた記事は存在しないか移動された可能性があります。ブログ一覧より最新の技術記事をご覧ください。' : (lang === 'en') ? 'The requested publication could not be found or has moved. Please browse our blog space for articles and field notes.' : 'L\\'article technique demandé n\\'existe pas ou a été déplacé. Veuillez consulter notre espace blog pour découvrir l\\'ensemble de nos publications et retours d\\'expérience.'}
            </p>
            <div>
              <a href="blog.html" class="btn-primary-orange" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; padding: 0.9rem 2rem; font-weight: 600; border-radius: 999px;">
                &larr; ${(lang === 'ja') ? '記事一覧に戻る' : (lang === 'en') ? 'Back to Blog' : 'Retourner aux publications'}
              </a>
            </div>
          </div>
        `;
      }
    } else {
      const locTitle = (lang === 'ja' && a.title_ja) ? a.title_ja : (lang === 'en' && a.title_en) ? a.title_en : a.title;
      const locCat = (lang === 'ja' && a.category_ja) ? a.category_ja : (lang === 'en' && a.category_en) ? a.category_en : a.category;
      const locBreadcrumb = (lang === 'ja' && a.breadcrumb_ja) ? a.breadcrumb_ja : (lang === 'en' && a.breadcrumb_en) ? a.breadcrumb_en : a.breadcrumb;
      const locDate = (lang === 'ja' && a.date_ja) ? a.date_ja : (lang === 'en' && a.date_en) ? a.date_en : a.date;
      const locReadTime = (lang === 'ja' && a.readTime_ja) ? a.readTime_ja : (lang === 'en' && a.readTime_en) ? a.readTime_en : a.readTime;
      const locLead = (lang === 'ja' && a.lead_ja) ? a.lead_ja : (lang === 'en' && a.lead_en) ? a.lead_en : a.lead;
      const locRelTitle = (lang === 'ja' && a.relatedTitle_ja) ? a.relatedTitle_ja : (lang === 'en' && a.relatedTitle_en) ? a.relatedTitle_en : a.relatedTitle;
      const locRelDesc = (lang === 'ja' && a.relatedDesc_ja) ? a.relatedDesc_ja : (lang === 'en' && a.relatedDesc_en) ? a.relatedDesc_en : a.relatedDesc;

      document.title = `${locTitle} — NDE Jordan L.`;
      articleTitle.textContent = locTitle;
      const catEl = document.getElementById('articleCategory');
      if (catEl) catEl.textContent = locCat;
      const crumbEl = document.getElementById('articleBreadcrumb');
      if (crumbEl) crumbEl.textContent = locBreadcrumb;
      const dateEl = document.getElementById('articleDate');
      if (dateEl) dateEl.textContent = locDate;
      const readEl = document.getElementById('articleReadTime');
      if (readEl) readEl.textContent = locReadTime;
      const coverEl = document.getElementById('articleCover');
      if (coverEl) coverEl.src = a.cover;
      const leadEl = document.getElementById('articleLead');
      if (leadEl) leadEl.textContent = locLead;

      const relTitle = document.getElementById('relatedProjectTitle');
      if (relTitle) relTitle.textContent = locRelTitle;
      const relDesc = document.getElementById('relatedProjectDesc');
      if (relDesc) relDesc.textContent = locRelDesc;
      const relLive = document.getElementById('relatedProjectLive');
      if (relLive) relLive.href = a.relatedLive;
      const relCase = document.getElementById('relatedProjectCase');
      if (relCase) relCase.href = a.relatedCase;
    }
  }

  // Initialisation article-detail
  if (document.getElementById('articleTitle')) {
    renderArticleDetail(currentLang);
  }


  /* =========================================================================
     6. COMPTEURS ANIMÉS (COUNT-UP EFFECT)
     ========================================================================= */
  const countUpElements = document.querySelectorAll('.count-up');
  let countUpTriggered = false;

  function runCountUp() {
    countUpElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : (el.textContent.includes('/5') ? '/5' : ''));
      const isFloat = (el.getAttribute('data-target') || '').includes('.');
      const duration = 1600;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const currentVal = (target * ease);

        if (isFloat) {
          el.textContent = currentVal.toFixed(1) + suffix;
        } else {
          el.textContent = Math.floor(currentVal) + suffix;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          if (isFloat) el.textContent = target.toFixed(1) + suffix;
          else el.textContent = target + suffix;
        }
      }
      requestAnimationFrame(update);
    });
  }

  const whySection = document.querySelector('.why-section');
  if (whySection) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countUpTriggered) {
          countUpTriggered = true;
          runCountUp();
        }
      });
    }, { threshold: 0.2 });
    countObserver.observe(whySection);
  }

  /* =========================================================================
     GESTION SÉCURISÉE DU GLISSER-DÉPOSER DE FICHIER (SÉCURITÉ DOM-XSS)
     ========================================================================= */
  const fileDropZone = document.getElementById('fileDropZone');
  const contactFileInput = document.getElementById('contactFile');
  const fileDropText = document.getElementById('fileDropText');

  // Mise à jour sécurisée du DOM sans innerHTML pour parer toute injection DOM-XSS via file.name
  function updateFileDropDisplay(file) {
    if (!fileDropText || !file) return;
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    fileDropText.textContent = '';
    fileDropText.appendChild(document.createTextNode('📄 '));
    const strongEl = document.createElement('strong');
    strongEl.textContent = file.name;
    fileDropText.appendChild(strongEl);
    fileDropText.appendChild(document.createTextNode(' (' + sizeMb + ' Mo sélectionné)'));
  }

  if (fileDropZone && contactFileInput) {
    fileDropZone.addEventListener('click', () => contactFileInput.click());
    contactFileInput.addEventListener('change', () => {
      if (contactFileInput.files && contactFileInput.files[0]) {
        const file = contactFileInput.files[0];
        updateFileDropDisplay(file);
        fileDropZone.style.borderColor = 'var(--figma-orange)';
        fileDropZone.style.background = 'rgba(253, 111, 0, 0.05)';
      }
    });
    ['dragenter', 'dragover'].forEach(evt => {
      fileDropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = 'var(--figma-orange)';
        fileDropZone.style.background = 'rgba(253, 111, 0, 0.08)';
      });
    });
    ['dragleave', 'drop'].forEach(evt => {
      fileDropZone.addEventListener(evt, (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = '#DDD';
        fileDropZone.style.background = '#FFF';
        if (evt === 'drop' && e.dataTransfer.files && e.dataTransfer.files[0]) {
          contactFileInput.files = e.dataTransfer.files;
          const file = e.dataTransfer.files[0];
          updateFileDropDisplay(file);
          fileDropZone.style.borderColor = 'var(--figma-orange)';
          fileDropZone.style.background = 'rgba(253, 111, 0, 0.05)';
        }
      });
    });
  }

  // Direct Manipulation & Fluid Physics (Apple Design — Emil Kowalski)
  if (portfolioTrack) {
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let lastX = 0;
    let velocity = 0;
    let lastTime = 0;

    portfolioTrack.addEventListener('pointerdown', (e) => {
      if (e.target.closest('a, button')) return;
      isDown = true;
      portfolioTrack.classList.add('is-dragging');
      startX = e.pageX - portfolioTrack.offsetLeft;
      scrollLeft = portfolioTrack.scrollLeft;
      lastX = e.pageX;
      lastTime = performance.now();
      velocity = 0;
      try { portfolioTrack.setPointerCapture(e.pointerId); } catch (err) {}
    });

    portfolioTrack.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - portfolioTrack.offsetLeft;
      const walk = (x - startX) * 1.15;
      portfolioTrack.scrollLeft = scrollLeft - walk;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocity = (e.pageX - lastX) / dt;
      }
      lastX = e.pageX;
      lastTime = now;
    });

    const stopDragging = (e) => {
      if (!isDown) return;
      isDown = false;
      portfolioTrack.classList.remove('is-dragging');
      try { portfolioTrack.releasePointerCapture(e.pointerId); } catch (err) {}

      if (Math.abs(velocity) > 0.3) {
        portfolioTrack.scrollBy({ left: -velocity * 200, behavior: 'smooth' });
      }
    };

    portfolioTrack.addEventListener('pointerup', stopDragging);
    portfolioTrack.addEventListener('pointercancel', stopDragging);
  }

});
