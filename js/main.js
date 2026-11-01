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

  let currentLang = localStorage.getItem('jordan_portfolio_lang') || 'fr';

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('jordan_portfolio_lang', lang);

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

    updateActiveProjectDetail();
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
      title_fr: "AgroFlow SaaS — Solution Intégrée de Gestion Agricole",
      title_en: "AgroFlow SaaS — Integrated Agricultural ERP Platform",
      desc_fr: "ERP agricole de pointe digitalisant la gestion des parcelles, le suivi financier des récoltes, les stocks et la traçabilité en temps réel, conçu pour les exploitants avec mode hors-ligne résilient.",
      desc_en: "Cutting-edge AgriTech ERP platform digitizing plot management, harvest financial accounting, inventory, and real-time traceability, built with resilient offline sync.",
      live: "https://agroflowerp.vercel.app",
      github: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      category: "dev",
      type: "link"
    },
    {
      title_fr: "Sister Schola ERP — Pilotage Intelligent des Établissements & Cliniques",
      title_en: "Sister Schola ERP — Smart Clinical & School Management",
      desc_fr: "Système de gestion et de suivi clinique complet permettant la centralisation des dossiers patients, la gestion des constantes médicales et l'orchestration des flux de consultations pour structures de santé.",
      desc_en: "Complete clinical records and health management system enabling patient history centralization, vital signs monitoring, and healthcare workflow orchestration.",
      live: "https://acuvera-clinical.vercel.app",
      github: "https://github.com/Nadroj-ciol/Acuvera-clinical",
      category: "dev",
      type: "link"
    },
    {
      title_fr: "Infographie & Créations Graphiques — NDE Jordan L.",
      title_en: "Graphic Design & Visual Artwork — NDE Jordan L.",
      desc_fr: "Direction artistique et réalisations infographiques complètes : chartes visuelles, affiches événementielles promotionnelles (Petit Colis, Candace, Fosa'a Academy), typographie soignée et identité de marque numérique.",
      desc_en: "Full-scale art direction and graphic design: brand visual systems, high-impact promotional event posters (Petit Colis, Candace, Fosa'a Academy), tailored typography, and digital identity.",
      live: "rsc/img/projets/infographie_jordan.png",
      github: "https://github.com/Nadroj-ciol",
      category: "infographie",
      type: "image"
    },
    {
      title_fr: "LaboGraphie Web — Plateforme d'Ingénierie & CyberTech",
      title_en: "LaboGraphie Web — Engineering & CyberTech Platform",
      desc_fr: "Plateforme web immersive haute performance pour profils tech et télécoms/cybersécurité, temps de chargement éclair et fluidité mobile chirurgicale.",
      desc_en: "High-performance immersive web platform for tech engineering and cybersecurity profiles, featuring fast load times and clean mobile ergonomics.",
      live: "https://portfolio-edii.vercel.app",
      github: "https://github.com/Nadroj-ciol/portfolio-edii",
      category: "dev",
      type: "link"
    },
    {
      title_fr: "Consultant IT & Systèmes Cliniques — Sister Schola",
      title_en: "IT Consultant & Clinical Systems — Sister Schola",
      desc_fr: "Audit technique, modélisation des flux d'admission et intégration de bornes d'authentification pour structures médicales et scolaires.",
      desc_en: "Technical auditing, patient intake workflow modeling, and authentication terminal integration for clinical and school organizations.",
      live: "rsc/img/projets/consultant IT/consultation-sisterShola.png",
      github: "https://github.com/Nadroj-ciol",
      category: "systems",
      type: "image"
    },
    {
      title_fr: "Cartographie de Projet & Architecture Logicielle",
      title_en: "Project Architecture Mapping & Systems Engineering",
      desc_fr: "Conception de schémas d'architecture logicielle, diagrammes relationnels, flux de données transactionnels et mapping fonctionnel de modules complexes.",
      desc_en: "Architectural blueprint design, relational database schematics, transactional data pipelines, and full modular functional mapping.",
      live: "rsc/img/projets/dev/labographie-rpoject-map.png",
      github: "https://github.com/Nadroj-ciol",
      category: "dev",
      type: "image"
    }
  ];

  let currentProjectIdx = 0;
  const portfolioTrack = document.getElementById('portfolioTrack');
  const cards = document.querySelectorAll('.portfolio-card');
  const dots = document.querySelectorAll('#portfolioDots span');
  const activeTitle = document.getElementById('activeProjectTitle');
  const activeDesc = document.getElementById('activeProjectDesc');
  const activeLink = document.getElementById('activeProjectLink');
  const btnLive = document.getElementById('btnDetailLive');
  const btnGit = document.getElementById('btnDetailGit');
  const btnPortfolioPrev = document.getElementById('btnPortfolioPrev');
  const btnPortfolioNext = document.getElementById('btnPortfolioNext');

  function updateActiveProjectDetail() {
    if (currentProjectIdx < 0 || currentProjectIdx >= projectsData.length) return;
    const p = projectsData[currentProjectIdx];

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

  // Filtrage par onglets
  const tagPills = document.querySelectorAll('.tag-pill');
  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tagPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      
      cards.forEach((card) => {
        const cat = card.getAttribute('data-cat');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
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

  // Barre de recherche fluide avec autocomplétion
  const searchInput = document.getElementById('projectSearchInput');
  const searchClear = document.getElementById('projectSearchClear');
  const searchChips = document.querySelectorAll('.search-chip');

  function filterProjectsByQuery(query) {
    const q = query.trim().toLowerCase();
    if (searchClear) {
      if (q) searchClear.classList.add('visible');
      else searchClear.classList.remove('visible');
    }

    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      if (!q || text.includes(q) || keywords.includes(q)) {
        card.style.display = 'block';
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
     5. VISIONNEUSE LIGHTBOX (ZOOM PLEIN ÉCRAN)
     ========================================================================= */
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const zoomBtns = document.querySelectorAll('.btn-zoom-img');

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

  zoomBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgPath = btn.getAttribute('data-img');
      if (imgPath) openLightbox(imgPath);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });


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
