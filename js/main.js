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

  // Menu Mobile Toggle
  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const expanded = navbar.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
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
    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.services": "Services",
      "nav.resume": "Parcours",
      "nav.projects": "Projets",
      "nav.contact": "Contact",
      "hero.hello": "Bonjour !",
      "hero.intro": "Moi c'est",
      "hero.role": "Développeur Full-Stack",
      "hero.quote": "« L'excellence technique et l'architecture logicielle de Jordan garantissent le succès de nos projets en production. Hautement recommandé ! »",
      "hero.portfolioBtn": "Portfolio",
      "hero.hireBtn": "Me recruter",
      "hero.expLabel": "D'expérience & Conception",
      
      "why.titlePre": "Pourquoi",
      "why.titleOrange": "me choisir ?",
      "why.text": "Polyvalent et rigoureux, je mets mes compétences au service du développement applicatif, de la maintenance d'infrastructures et de la création graphique. Certifié par les Ateliers Google, je conçois des systèmes d'information pensés pour durer.",
      "why.m1Label": "Code en production vérifiable",
      "why.m2Label": "3e Prix National Concours Tech",
      "why.contactBtn": "Me contacter",

      "services.titlePre": "Mes",
      "services.titleOrange": "Services",
      "services.sub": "Technologue en Génie Logiciel certifié par les Ateliers Google : conception applicative robuste, bases de données relationnelles et créations graphiques.",
      "services.s1Title": "Génie Logiciel & Applications Web",
      "services.s1Desc": "Conception d'architectures SaaS et ERP complètes, modélisation de microservices, APIs RESTful et synchronisation hors-ligne résiliente.",
      "services.s2Title": "Bases de Données & Systèmes LIMS",
      "services.s2Desc": "Modélisation relationnelle SQL rigoureuse, intégrité transactionnelle, centralisation des dossiers patients et flux cliniques.",
      "services.s3Title": "Infographie & Direction Visuelle",
      "services.s3Desc": "Direction artistique, conception de chartes graphiques, logos vectoriels scalables, flyers et affiches de communication à fort impact.",
      
      "exp.titlePre": "Mon",
      "exp.titleOrange": "Parcours & Expérience",
      "exp.siantouDiploma": "BTS en Génie Logiciel",
      "exp.siantouRole": "Stagiaire Assistance Technique & Dev",
      "exp.siantouDesc": "Participation active à la conception et à la mise en œuvre du système intégré de gestion d’Université, avec validation de présence par système biométrique et gestion des étudiants.",
      "exp.iutDiploma": "Licence Tech en GL",
      "exp.iutRole": "Conception Logicielle, Modélisation & IA",
      "exp.iutDesc": "Spécialisation en modélisation logicielle avancée, bases de données relationnelles SQL, conteneurisation Docker et automatisation de processus complexes.",
      "exp.leguideDiploma": "Infographie & Multimédia",
      "exp.leguideRole": "Infographiste, Vidéographe & Assistant DRH",
      "exp.leguideDesc": "Création de chartes graphiques, logos et affiches professionnelles. Production multimédia et montage vidéo pour LeGuide Informatique. Gestion des processus RH chez Polytech-Valor.",
      "exp.ambamDiploma": "Mathématiques & Bac C",
      "exp.ambamRole": "Rigueur Mathématique & Débuts du Web",
      "exp.ambamDesc": "Deux années en Mathématiques fondamentales. Premier déploiement web dès 2017 avec la création du site web officiel du Lycée Bilingue d’AMBAM.",
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
      "discuss.headOrange": "Discutons-en ensemble",
      "discuss.placeholder": "Entrez votre adresse email...",
      "discuss.sendBtn": "Envoyer",
      "discuss.b1": "Note Moyenne Clients",
      "discuss.b2": "Concours National",
      "discuss.b3Cert": "Certifié",
      "discuss.b3": "Ateliers Google",

      "blog.headPre": "Mes articles &",
      "blog.headOrange": "publications",
      "blog.a1Tag": "Génie Logiciel",
      "blog.a1Title": "Dans les coulisses de l'architecture logicielle : concevoir des systèmes modulaires et scalables",
      "blog.a2Tag": "AgriTech & ERP",
      "blog.a2Title": "AgroFlow ERP : digitaliser la gestion des parcelles et la traçabilité en Afrique subsaharienne",
      "blog.a3Tag": "Systèmes Médicaux",
      "blog.a3Title": "Sister Schola & Baobab LIMS : traçabilité biologique et intégrité des données hospitalières",

      "footer.connectTitle": "Connectons-nous ici",
      "footer.hireBtn": "Me recruter",
      "footer.bio": "Technologue en Génie Logiciel & Systèmes d'Information, certifié Ateliers Google. Spécialisé dans la conception logicielle, la maintenance d'infrastructures et l'infographie.",
      "footer.navTitle": "Navigation",
      "footer.contactTitle": "Coordonnées",
      "footer.stayConnected": "Restons connectés",
      "footer.placeholder": "Votre adresse email...",
      "footer.copyright": "Copyright © 2026 NDE Jordan L. · LaboGraphie Dev. Tous droits réservés.",
      "footer.terms": "Conditions d'utilisation",
      "footer.privacy": "Politique de confidentialité"
    },
    en: {
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.resume": "Resume",
      "nav.projects": "Projects",
      "nav.contact": "Contact",
      "hero.hello": "Hello !",
      "hero.intro": "I'm",
      "hero.role": "Full-Stack Developer",
      "hero.quote": "“Jordan's technical excellence and software architecture ensure the success of our projects in production. Highly recommended!”",
      "hero.portfolioBtn": "Portfolio",
      "hero.hireBtn": "Hire me",
      "hero.expLabel": "Experience & Design",

      "why.titlePre": "Why",
      "why.titleOrange": "Hire Me?",
      "why.text": "Versatile and rigorous, I dedicate my expertise to application development, IT infrastructure maintenance, and visual creativity. Certified by Google Workshops, I build information systems designed to endure.",
      "why.m1Label": "Verifiable production code",
      "why.m2Label": "3rd National Tech Award (Palme d'Or)",
      "why.contactBtn": "Contact Me",

      "services.titlePre": "My",
      "services.titleOrange": "Services",
      "services.sub": "Software Engineering Technologist certified by Google Workshops: robust application architecture, databases, and visual creations.",
      "services.s1Title": "Software Engineering & Web Apps",
      "services.s1Desc": "Full-cycle SaaS and ERP architecture design, microservices, RESTful APIs, and responsive applications with resilient offline synchronization.",
      "services.s2Title": "Databases & LIMS Systems",
      "services.s2Desc": "Rigorous relational data modeling (SQL/PostgreSQL), clinical sample tracking, transactional integrity, and high-performance query optimization.",
      "services.s3Title": "Graphic Design & Art Direction",
      "services.s3Desc": "Art direction, design system development, scalable vector logos, event flyers, and high-impact digital marketing assets.",

      "exp.titlePre": "My",
      "exp.titleOrange": "Work Experience & Education",
      "exp.siantouDiploma": "Higher National Diploma in Software Eng.",
      "exp.siantouRole": "Technical Support & Software Intern",
      "exp.siantouDesc": "Active contribution to the design and rollout of an integrated University management system, featuring biometric student attendance and records management.",
      "exp.iutDiploma": "Bachelor of Tech in Software Eng.",
      "exp.iutRole": "Software Design, Data Modeling & AI",
      "exp.iutDesc": "Specialized in advanced software architecture, SQL databases, Docker containerization, and enterprise automation pipelines.",
      "exp.leguideDiploma": "Graphic Design & Media",
      "exp.leguideRole": "Graphic Designer, Videographer & HR Assistant",
      "exp.leguideDesc": "Created brand identities, logos, and promotional posters. Directed video productions for LeGuide Informatique. Managed HR workflows at Polytech-Valor.",
      "exp.ambamDiploma": "Mathematics & Bac C (Sciences)",
      "exp.ambamRole": "Mathematical Rigor & First Web Projects",
      "exp.ambamDesc": "Two foundational years in advanced mathematics. First production web deployment in 2017 with the official website of Ambam Bilingual High School.",
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
      "discuss.headOrange": "Let's Discuss Together",
      "discuss.placeholder": "Enter your email address...",
      "discuss.sendBtn": "Send",
      "discuss.b1": "Average Client Rating",
      "discuss.b2": "National Tech Award",
      "discuss.b3Cert": "Certified",
      "discuss.b3": "Google Workshops",

      "blog.headPre": "From my",
      "blog.headOrange": "blog & publications",
      "blog.a1Tag": "Software Eng.",
      "blog.a1Title": "Behind the scenes of software architecture: engineering modular and scalable systems",
      "blog.a2Tag": "AgriTech & ERP",
      "blog.a2Title": "AgroFlow ERP: digitizing crop tracking and supply chain transparency in Sub-Saharan Africa",
      "blog.a3Tag": "Clinical Systems",
      "blog.a3Title": "Sister Schola & Baobab LIMS: biological chain of custody and hospital data integrity",

      "footer.connectTitle": "Let's Connect Here",
      "footer.hireBtn": "Hire me",
      "footer.bio": "Software Engineering & Information Systems Technologist, certified by Google Workshops. Specialized in application architecture, network maintenance, and graphic design.",
      "footer.navTitle": "Navigation",
      "footer.contactTitle": "Contact Info",
      "footer.stayConnected": "Stay Connected",
      "footer.placeholder": "Your email address...",
      "footer.copyright": "Copyright © 2026 NDE Jordan L. · LaboGraphie Dev. All Rights Reserved.",
      "footer.terms": "Terms of Use",
      "footer.privacy": "Privacy Policy"
    }
  };

  let currentLang = 'fr';
  try {
    currentLang = localStorage.getItem('jordan_portfolio_lang') || 'fr';
  } catch (e) {
    currentLang = 'fr';
  }
  let currentProjectIdx = 0;

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    try {
      localStorage.setItem('jordan_portfolio_lang', lang);
    } catch (e) {}

    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    if (typeof updateActiveProjectDetail === 'function') {
      try {
        updateActiveProjectDetail();
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
      desc_fr: "ERP agricole de pointe digitalisant la gestion des parcelles, le suivi financier des récoltes, les stocks et la traçabilité en temps réel, conçu pour les exploitants avec mode hors-ligne résilient.",
      desc_en: "Cutting-edge AgriTech ERP platform digitizing plot management, harvest financial accounting, inventory, and real-time traceability, built with resilient offline sync.",
      live: "https://agroflowsaas.vercel.app",
      github: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/card_agroflow.png", label: "Dashboard UI", title: "AgroFlow · Interface SaaS" },
        { img: "rsc/img/projets/shot_agroflow.png", label: "Plein Écran", title: "AgroFlow · Capture Complète" },
        { img: "rsc/img/projets/dev/DC_Agroflow.png", label: "Architecture SI", title: "AgroFlow · Modélisation Relationnelle" }
      ]
    },
    {
      id: "sisterschola",
      title_fr: "Sister Schola ERP — Pilotage Hospitalier & Clinique",
      title_en: "Sister Schola ERP — Healthcare & Clinical Management",
      desc_fr: "Système de gestion et de suivi clinique complet pour centres de santé : centralisation des dossiers patients, admissions, consultations, prescription médicale, facturation et intégrité des flux cliniques.",
      desc_en: "Complete clinical records and health management system enabling patient history centralization, vital signs monitoring, and healthcare workflow orchestration.",
      live: "https://sisterscholaerp.vercel.app",
      github: "https://github.com/Nadroj-ciol",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/dev/SisterSholaErp.png", label: "Portail Médical", title: "Sister Schola · Système Clinique" },
        { img: "rsc/img/projets/consultant IT/consultation-sisterShola.png", label: "Audit & Consultation", title: "Sister Schola · Audit IT" }
      ]
    },
    {
      id: "candace",
      title_fr: "Candace Distribution & Petit Colis — Identité Visuelle & Direction Artistique",
      title_en: "Candace Distribution & Petit Colis — Brand Identity & Art Direction",
      desc_fr: "Direction artistique, typographie, affiches promotionnelles grand format et packagings produits (Candace Cosmétique, Petit Colis de Gautier Funga, Fosa'a Academy). Des créations vectorielles à fort impact commercial.",
      desc_en: "Full-scale art direction and graphic design: brand visual systems, high-impact promotional event posters (Petit Colis, Candace, Fosa'a Academy), tailored typography, and digital identity.",
      live: "rsc/img/projets/infographie/MockupCandace distribution.jpg",
      github: "https://github.com/Nadroj-ciol",
      category: "infographie",
      type: "image",
      gallery: [
        { img: "rsc/img/projets/infographie/MockupCandace distribution.jpg", label: "Packaging Candace", title: "Candace Distribution · Cosmétique" },
        { img: "rsc/img/projets/infographie/flyer  recruitement petit colis.jpg", label: "Petit Colis Flyer", title: "Petit Colis · Flyer Recrutement" },
        { img: "rsc/img/projets/infographie/flyer produit Candace Lait de beauté.jpg", label: "Lait de Beauté", title: "Candace Lait de Beauté" }
      ]
    },
    {
      id: "labographie",
      title_fr: "LaboGraphie Web — Plateforme d'Ingénierie & Prototypage Logiciel",
      title_en: "LaboGraphie Web — Software Engineering & Prototyping Platform",
      desc_fr: "Vitrine digitale et laboratoire pratique dédié aux développeurs et passionnés de tech camerounais : « Moins de théorie passive, plus de code en production ». Ergonomie moderne, fluidité mobile et performances optimisées.",
      desc_en: "High-performance immersive web platform for tech engineering and cybersecurity profiles, featuring fast load times and clean mobile ergonomics.",
      live: "https://labographie.vercel.app",
      github: "https://github.com/Nadroj-ciol/LaboGraphie-web",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/dev/LaboGraphie-web.png", label: "Vitrine Web", title: "LaboGraphie · Plateforme Digitale" },
        { img: "rsc/img/projets/dev/labographie-rpoject-map.png", label: "Mapping Projet", title: "LaboGraphie · Cartographie" }
      ]
    },
    {
      id: "acuvera",
      title_fr: "Acuvera Clinical — Suivi Clinique & Traçabilité LIMS",
      title_en: "Acuvera Clinical — Clinical Follow-up & LIMS Traceability",
      desc_fr: "Plateforme cloud de gestion des analyses biomédicales et suivi des prélèvements : traçabilité stricte des échantillons, conformité des flux de laboratoire et édition de bilans de diagnostic.",
      desc_en: "Cloud-based biological sample and laboratory analysis tracking platform ensuring clinical traceability and regulatory medical compliance.",
      live: "https://acuvera-clinical.vercel.app",
      github: "https://github.com/Nadroj-ciol/Acuvera-clinical",
      category: "dev",
      type: "link",
      gallery: [
        { img: "rsc/img/projets/card_acuvera.png", label: "Portail LIMS", title: "Acuvera Clinical · Dashboard" },
        { img: "rsc/img/projets/shot_acuvera.png", label: "Analyses", title: "Acuvera Clinical · Suivi Biologique" },
        { img: "rsc/img/projets/dev/baobab-rsd.jpeg", label: "BioBank Schema", title: "Baobab LIMS · Schéma Données" }
      ]
    },
    {
      id: "arduino",
      title_fr: "Systèmes Embarqués Arduino, Maintenance & Réseaux",
      title_en: "Arduino Embedded Systems, Maintenance & IT Infrastructure",
      desc_fr: "Programmation de microcontrôleurs Arduino, interfaçage de capteurs environnementaux, câblage d'armoires réseau, configuration de routeurs et switchboards, et validation biométrique d'étudiants (UP Siantou).",
      desc_en: "Arduino microcontroller programming, environmental sensor interfacing, patch panel cabling, switchboard setup, and student biometric validation.",
      live: "rsc/img/projets/maintenance/tp arduino.png",
      github: "https://github.com/Nadroj-ciol",
      category: "systems",
      type: "image",
      gallery: [
        { img: "rsc/img/projets/maintenance/tp arduino.png", label: "Arduino IoT", title: "Prototypage Arduino · Systèmes Embarqués" },
        { img: "rsc/img/projets/Reseau & Sécu/pexels-brett-sayles-4716292.jpg", label: "Baies de Brassage", title: "Infrastructures Réseaux & Switchboards" }
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

    const title = (currentLang === 'en' && p.title_en) ? p.title_en : p.title_fr;
    const desc = (currentLang === 'en' && p.desc_en) ? p.desc_en : p.desc_fr;

    if (activeTitle) activeTitle.textContent = title;
    if (activeDesc) activeDesc.textContent = desc;

    if (p.type === 'image') {
      if (activeLink) activeLink.href = p.live;
      if (btnLive) {
        btnLive.href = p.live;
        btnLive.target = "_blank";
        btnLive.innerHTML = (currentLang === 'en') ? 'View Full Image ↗' : 'Aperçu plein écran ↗';
      }
    } else {
      if (activeLink) activeLink.href = p.live;
      if (btnLive) {
        btnLive.href = p.live;
        btnLive.target = "_blank";
        btnLive.innerHTML = (currentLang === 'en') ? 'Live Demo →' : 'Démo en ligne →';
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

  // Boutons flèches de défilement horizontal du carrousel
  if (btnPortfolioNext) {
    btnPortfolioNext.addEventListener('click', () => {
      let nextIdx = currentProjectIdx + 1;
      if (nextIdx >= projectsData.length) nextIdx = 0;
      setProject(nextIdx);
    });
  }

  if (btnPortfolioPrev) {
    btnPortfolioPrev.addEventListener('click', () => {
      let prevIdx = currentProjectIdx - 1;
      if (prevIdx < 0) prevIdx = projectsData.length - 1;
      setProject(prevIdx);
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
      category: "SaaS ERP & AgriTech",
      year: "Année 2025 - 2026",
      role: "Lead Developer & Architecte SI",
      status: "● En Production",
      summary: "Conception intégrale d'une suite logicielle cloud et offline-first pour les exploitants agricoles et coopératives. Digitalisation des parcelles, suivi phytosanitaire, comptabilité analytique des récoltes et génération de rapports automatisés.",
      mainBanner: "rsc/img/projets/card_agroflow.png",
      liveUrl: "https://agroflowsaas.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      waText: "Bonjour Jordan, j'ai consulté l'étude de cas AgroFlow et souhaite un projet similaire.",
      problem: "Dans le secteur agro-pastoral, les exploitants et coopératives font face à des pertes considérables dues à une gestion manuelle sur registres papier, à l'absence de traçabilité des intrants et à une connectivité Internet très instable dans les zones de plantation. L'objectif était de développer un outil intuitif, accessible sur mobile et desktop, capable de fonctionner sans interruption même en zone blanche.",
      architecture: "Pour répondre aux contraintes du terrain, j'ai mis en place une architecture modulaire basée sur React en frontend avec synchronisation locale IndexedDB, couplée à un backend REST en Node.js et une base relationnelle PostgreSQL hautement optimisée. La modélisation a suivi la méthode MERISE (MCD/MLD) garantissant une 3ème forme normale stricte.",
      results: "Le déploiement d'AgroFlow a permis de réduire le temps de consolidation des stocks de 75%, de supprimer les erreurs de saisie manuelle et de fournir aux exploitants une visibilité immédiate sur leurs marges par parcelle cultivée. Le système de synchronisation offline traite les écritures locales et les résout instantanément dès le rétablissement du réseau.",
      quoteText: "« L'architecture d'AgroFlow et sa prise en main intuitive ont transformé notre suivi des campagnes agricoles. Jordan a su anticiper toutes les contraintes de connectivité du terrain avec brio. »",
      quoteAuthor: "— Chanceline, Direction Opérationnelle EGESOL SARL",
      client: "Exploitants & Coopératives (EGESOL)",
      industry: "AgriTech & Agro-industrie",
      duration: "4 Mois (Conception & Déploiement)",
      authorRole: "Lead Developer & Architecte SI",
      techs: ["React", "Node.js", "PostgreSQL", "IndexedDB", "Docker"],
      gallery: [
        { img: "rsc/img/projets/card_agroflow.png", caption: "Tableau de bord & KPIs" },
        { img: "rsc/img/projets/shot_agroflow.png", caption: "Interface d'exploitation" },
        { img: "rsc/img/projets/dev/DC_Agroflow.png", caption: "Diagramme de Classes SQL" }
      ]
    },
    sisterschola: {
      title: "Sister Schola ERP — Système Hospitalier & LIMS Clinique",
      category: "Santé & LIMS Clinique",
      year: "Année 2025 - 2026",
      role: "Lead Developer Full-Stack",
      status: "● En Production",
      summary: "Plateforme ERP sur-mesure pour établissements de santé, cliniques et laboratoires d'analyse médicale. Gestion complète des admissions, dossiers patients confidentiels, facturation des actes et traçabilité des prélèvements biologiques.",
      mainBanner: "rsc/img/projets/dev/SisterSholaErp.png",
      liveUrl: "https://sisterscholaerp.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai consulté l'étude de cas Sister Schola et souhaite un projet similaire.",
      problem: "Les centres hospitaliers et polycliniques gèrent des flux de patients complexes et des dossiers médicaux sensibles. Les retards dans la transmission des ordonnances et la perte de fiches d'admission physiques causaient des files d'attente importantes et des risques d'erreurs médicales.",
      architecture: "Conception d'une application React/TypeScript avec gestion des permissions par rôles (RBAC : médecins, infirmiers, caissiers, biologistes). Le backend Express et la base PostgreSQL intègrent un journal d'audit immuable conforme aux impératifs du secret médical.",
      results: "Réduction de 60% du temps d'attente à l'accueil, sécurisation totale des antécédents médicaux et génération automatisée des fiches de liaison entre la caisse et la pharmacie.",
      quoteText: "« Une fiabilité remarquable sur les dossiers patients. L'interface est claire, ergonomique et a été immédiatement adoptée par tout le personnel soignant. »",
      quoteAuthor: "— Dr. E. Ndoumbe, Consultant Médical",
      client: "Cliniques & Centres Hospitaliers Privés",
      industry: "Santé, Médical & LIMS",
      duration: "5 Mois (Audit, Conception, Recette)",
      authorRole: "Lead Developer Full-Stack",
      techs: ["React", "TypeScript", "Express", "PostgreSQL", "RBAC", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/dev/SisterSholaErp.png", caption: "Interface d'Accueil & Admissions" },
        { img: "rsc/img/projets/consultant IT/consultation-sisterShola.png", caption: "Module de Consultation Médicale" },
        { img: "rsc/img/projets/dev/rsd_biobank_architecture.png", caption: "Cartographie Système & Flux" }
      ]
    },
    candace: {
      title: "Candace Distribution & Petit Colis — Branding & Packaging",
      category: "Branding, Packaging & Print",
      year: "Année 2025 - 2026",
      role: "Directeur Artistique & Designer Graphique",
      status: "● Commercialisé",
      summary: "Création complète de l'identité de marque cosmétique Candace (lait de beauté, étiquettes réglementaires, modélisation 3D photoréaliste) et direction des campagnes de communication pour la startup logistique Petit Colis.",
      mainBanner: "rsc/img/projets/infographie/MockupCandace distribution.jpg",
      liveUrl: "rsc/img/projets/infographie/MockupCandace distribution.jpg",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu votre travail de branding Candace et souhaite une identité visuelle.",
      problem: "Se démarquer sur le marché concurrentiel des cosmétiques et des services de livraison urbaine exige une signature visuelle professionnelle et mémorable, conforme aux normes d'emballage et adaptée aux réseaux sociaux comme aux affichages urbains.",
      architecture: "Conception vectorielle sur Adobe Illustrator (tracés typographiques personnalisés, palette or et blanc premium), modélisation des flacons sur Adobe Photoshop et déclinaison des gabarits d'impression haute définition pour imprimeurs offset.",
      results: "Succès commercial immédiat au lancement des gammes Candace, et forte visibilité sur les campagnes de recrutement de chauffeurs-livreurs pour Petit Colis à Douala et Yaoundé.",
      quoteText: "« Jordan a su capter l'ADN de notre marque avec des mockups et des affiches qui ont immédiatement séduit nos clients et nos partenaires. »",
      quoteAuthor: "— FUNGA Gautier, Co-fondateur Petit Colis",
      client: "Candace Cosmetics & Petit Colis Express",
      industry: "Cosmétique, Logistique & Grande Distribution",
      duration: "2 Mois",
      authorRole: "Directeur Artistique & Infographe Senior",
      techs: ["Adobe Illustrator", "Adobe Photoshop", "Modélisation 3D", "Pré-presse"],
      gallery: [
        { img: "rsc/img/projets/infographie/MockupCandace distribution.jpg", caption: "Packaging Candace Lait de Beauté" },
        { img: "rsc/img/projets/infographie/flyer  recruitement petit colis.jpg", caption: "Campagne Recrutement Petit Colis" },
        { img: "rsc/img/projets/infographie/flyer goldens pressing.png", caption: "Flyer Commercial Golden Pressing" }
      ]
    },
    labographie: {
      title: "LaboGraphie Web Platform — Vitrine Tech & Cyber-Hub",
      category: "Plateforme Web & Architecture",
      year: "Année 2025 - 2026",
      role: "Lead Full-Stack & UI/UX Designer",
      status: "● En Production",
      summary: "Portail interactif et vitrine technologique des solutions logicielles, matérielles et créatives. Architecture modulaire, micro-interactions 60 FPS, accessibilité et scoring Lighthouse 98+.",
      mainBanner: "rsc/img/projets/dev/LaboGraphie-web.png",
      liveUrl: "https://labographie.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai consulté LaboGraphie Web et souhaite une plateforme équivalente.",
      problem: "Présenter une offre pluridisciplinaire (développement web/SaaS, réseaux, infographie, maintenance) sans submerger l'utilisateur, tout en offrant une expérience interactive immersive et rapide sur les réseaux mobiles à faible débit.",
      architecture: "Architecture Vanilla JavaScript ultra-légère sans overhead de frameworks lourds, modularisation CSS avec custom properties dynamiques, lazy-loading natif des assets graphiques et transitions CSS optimisées sur le GPU.",
      results: "Score Lighthouse de 99 sur desktop et 96 sur mobile, temps de chargement inférieur à 1,1 seconde et navigation fluide adoptée par les recruteurs et clients.",
      quoteText: "« Une vitrine qui allie élégance visuelle et rigueur technique. La clarté du code et l'expérience utilisateur sont irréprochables. »",
      quoteAuthor: "— Powo Arnold, Data Analyst & Partenaire Tech",
      client: "LaboGraphie Technologies",
      industry: "Technologies de l'Information & Digital",
      duration: "3 Semaines",
      authorRole: "Lead Full-Stack & Designer",
      techs: ["HTML5 sémantique", "CSS3 GPU-accelerated", "Vanilla JS ES6+", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/dev/LaboGraphie-web.png", caption: "Aperçu de la plateforme" },
        { img: "rsc/img/projets/dev/labographie-rpoject-map.png", caption: "Cartographie des modules" },
        { img: "rsc/img/projets/infographie/mockup_logo_business labographie couleur.jpg", caption: "Identité de marque LaboGraphie" }
      ]
    },
    acuvera: {
      title: "Acuvera Clinical LIMS — Gestion des Analyses Biomédicales",
      category: "Biomédical & LIMS",
      year: "Année 2025 - 2026",
      role: "Développeur Logiciel & Analyste",
      status: "● En Production",
      summary: "Plateforme web de gestion des analyses biologiques, suivi des échantillons de laboratoire et génération instantanée des comptes-rendus avec archivage sécurisé.",
      mainBanner: "rsc/img/projets/card_acuvera.png",
      liveUrl: "https://acuvera-clinical.vercel.app",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu Acuvera Clinical et souhaite un système similaire.",
      problem: "Les laboratoires d'analyses médicales doivent traiter des centaines de prélèvements quotidiens avec un risque d'erreur zéro dans la saisie des valeurs de référence et le calcul des bilans.",
      architecture: "Interface React modulaire avec validation des formulaires en temps réel, alertes visuelles sur les valeurs hors normes et stockage relationnel avec traçabilité par horodatage sécurisé.",
      results: "Zéro doublon de prélèvement constaté, gain de temps de 50% sur l'édition des bilans sanguins et export direct en PDF prêt à l'impression.",
      quoteText: "« La rigueur de conception d'Acuvera garantit une sécurité essentielle dans le traitement de nos résultats de laboratoire. »",
      quoteAuthor: "— Marlyse, Ingénieur Polytech Yaoundé",
      client: "Laboratoires d'Analyses Biomédicales",
      industry: "Biologie Médicale & Santé",
      duration: "3 Mois",
      authorRole: "Développeur Logiciel & Analyste",
      techs: ["React", "REST API", "TailwindCSS", "PDF Generation", "Vercel"],
      gallery: [
        { img: "rsc/img/projets/card_acuvera.png", caption: "Tableau de Bord Acuvera" },
        { img: "rsc/img/projets/shot_acuvera.png", caption: "Gestion des Bilans Biologiques" },
        { img: "rsc/img/projets/dev/rsd_biobank_architecture.png", caption: "Architecture des Données" }
      ]
    },
    arduino: {
      title: "Arduino IoT & Maintenance Réseaux — Électronique & Infrastructure",
      category: "Systèmes, IoT & Réseaux",
      year: "Année 2025 - 2026",
      role: "Technologue en Systèmes & Réseaux",
      status: "● Déployé",
      summary: "Conception de prototypes d'acquisition de données sur microcontrôleurs Arduino, programmation en C++, câblage et brassage de baies serveurs et configuration de switches/routeurs.",
      mainBanner: "rsc/img/projets/maintenance/tp arduino.png",
      liveUrl: "rsc/img/projets/maintenance/tp arduino.png",
      gitUrl: "https://github.com/Nadroj-ciol",
      waText: "Bonjour Jordan, j'ai vu votre projet Arduino & Réseaux et souhaite échanger sur une infrastructure.",
      problem: "Relier les équipements physiques de terrain (capteurs de température, humidité, déclencheurs) aux réseaux d'entreprise nécessite une maîtrise conjointe du hardware, des protocoles de communication et de la sécurité des baies de brassage.",
      architecture: "Programmation firmware Arduino en C/C++, communication série / bus I2C / SPI, segmentation des réseaux via VLANs et adressage IPv4/IPv6 sous environnement Cisco Packet Tracer.",
      results: "Automatisation de la collecte des métriques environnementales, zéro perte de paquets et sécurisation physique et logique des baies de données.",
      quoteText: "« Les compétences techniques de Jordan en réseaux et systèmes embarqués allient théorie rigoureuse et sens pratique du câblage et de la maintenance. »",
      quoteAuthor: "— Pr. Edii, Professeur de Réseaux & Sécurité Informatique",
      client: "Département Informatique & Laboratoires Universitaires",
      industry: "Électronique, IoT & Réseaux Télécoms",
      duration: "4 Mois",
      authorRole: "Technologue en Systèmes & Réseaux",
      techs: ["C / C++", "Arduino", "Cisco IOS", "VLANs", "Baies de Brassage", "Linux"],
      gallery: [
        { img: "rsc/img/projets/maintenance/tp arduino.png", caption: "Prototypage Microcontrôleur Arduino" },
        { img: "rsc/img/projets/card_edii.png", caption: "Topologie Réseau & Sécurité" },
        { img: "rsc/img/projets/maintenance/pexels-field-engineer-147254-442154.jpg", caption: "Maintenance Baie Serveur" }
      ]
    }
  };

  const caseTitle = document.getElementById('caseTitle');
  if (caseTitle) {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id') || 'agroflow';
    const d = caseStudiesData[projectId] || caseStudiesData['agroflow'];

    caseTitle.textContent = d.title;
    
    const caseCatPill = document.getElementById('caseCatPill');
    if (caseCatPill) caseCatPill.textContent = d.category;
    const caseYearPill = document.getElementById('caseYearPill');
    if (caseYearPill) caseYearPill.textContent = d.year;
    const caseRolePill = document.getElementById('caseRolePill');
    if (caseRolePill) caseRolePill.textContent = 'Rôle : ' + d.role;
    const caseStatusPill = document.getElementById('caseStatusPill');
    if (caseStatusPill) caseStatusPill.textContent = d.status;

    const caseSummary = document.getElementById('caseSummary');
    if (caseSummary) caseSummary.textContent = d.summary;

    const caseLiveBtn = document.getElementById('caseLiveBtn');
    if (caseLiveBtn) {
      if (d.liveUrl.startsWith('http')) {
        caseLiveBtn.href = d.liveUrl;
        caseLiveBtn.style.display = 'inline-flex';
      } else {
        caseLiveBtn.href = '#';
        caseLiveBtn.className = 'btn-primary-orange btn-zoom-img';
        caseLiveBtn.setAttribute('data-img', d.mainBanner);
        caseLiveBtn.innerHTML = 'Aperçu Plein Écran 🔍';
      }
    }

    const caseGitBtn = document.getElementById('caseGitBtn');
    if (caseGitBtn) caseGitBtn.href = d.gitUrl;

    const caseWaBtn = document.getElementById('caseWaBtn');
    if (caseWaBtn) {
      caseWaBtn.href = `https://wa.me/237679279447?text=${encodeURIComponent(d.waText)}`;
    }

    const caseMainBannerImg = document.getElementById('caseMainBannerImg');
    const caseMainBannerBox = document.getElementById('caseMainBannerBox');
    if (caseMainBannerImg) caseMainBannerImg.src = d.mainBanner;
    if (caseMainBannerBox) caseMainBannerBox.setAttribute('data-img', d.mainBanner);

    const caseProblem = document.getElementById('caseProblem');
    if (caseProblem) caseProblem.textContent = d.problem;
    const caseArchitecture = document.getElementById('caseArchitecture');
    if (caseArchitecture) caseArchitecture.textContent = d.architecture;
    const caseResults = document.getElementById('caseResults');
    if (caseResults) caseResults.textContent = d.results;

    const caseQuoteText = document.getElementById('caseQuoteText');
    if (caseQuoteText) caseQuoteText.textContent = d.quoteText;
    const caseQuoteAuthor = document.getElementById('caseQuoteAuthor');
    if (caseQuoteAuthor) caseQuoteAuthor.textContent = d.quoteAuthor;

    const caseClient = document.getElementById('caseClient');
    if (caseClient) caseClient.textContent = d.client;
    const caseIndustry = document.getElementById('caseIndustry');
    if (caseIndustry) caseIndustry.textContent = d.industry;
    const caseDuration = document.getElementById('caseDuration');
    if (caseDuration) caseDuration.textContent = d.duration;
    const caseAuthorRole = document.getElementById('caseAuthorRole');
    if (caseAuthorRole) caseAuthorRole.textContent = d.authorRole;

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

});
