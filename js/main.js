/**
 * MAIN.JS — Portfolio NDE Jordan Loïc
 * Design System Figma JCREA 5+ & Motion Design
 * Fonctionnalités :
 * 1. Moteur i18n Bilingue (Français / Anglais) avec persistance localStorage
 * 2. Carrousel Témoignages avec Défilement Automatique, pause au hover & contrôles
 * 3. Filtrage du Portfolio multi-catégories (Dev, Infographie, Maintenance, Tous)
 * 4. Visionneuse Lightbox pour les affiches, logos & photos d'infrastructures
 * 5. Compteurs animés (Count-Up) pour les statistiques
 * 6. Micro-interactions magnétiques & Tilt 3D digne de Framer Motion
 * 7. Scroll-spy & animations de reveal au défilement
 */

document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================================
     1. DICTIONNAIRE I18N BILINGUE (FRANÇAIS & ANGLAIS)
     ========================================================================= */
  const translations = {
    fr: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.services": "Services",
      "nav.resume": "Parcours",
      "nav.projects": "Projets",
      "nav.contact": "Contact",
      "hero.status": "Disponible pour missions, dev & opportunités",
      "hero.hello": "Bonjour !",
      "hero.intro": "Moi c'est",
      "hero.role": "Développeur Full-Stack",
      "hero.quote": "« L'excellence technique et l'architecture logicielle de Jordan garantissent le succès de nos projets en production. Hautement recommandé ! »",
      "hero.portfolioBtn": "Portfolio",
      "hero.hireBtn": "Me recruter",
      "hero.cvDownload": "Télécharger CV",
      "hero.expLabel": "D'expérience & Conception",
      
      "services.titlePre": "Mes",
      "services.titleOrange": "Services",
      "services.sub": "Technologue en Génie Logiciel certifié par les Ateliers Google : conception applicative robuste, bases de données, maintenance systèmes & infographie.",
      "services.s1Title": "Génie Logiciel & Applications Web",
      "services.s1Desc": "Conception d'architectures SaaS et ERP complètes, microservices, APIs RESTful et applications réactives avec synchronisation offline.",
      "services.s2Title": "Bases de Données & Systèmes LIMS",
      "services.s2Desc": "Modélisation relationnelle rigoureuse (SQL/PostgreSQL), traçabilité biologique, intégrité transactionnelle et optimisation de requêtes complexes.",
      "services.s3Title": "Maintenance, Réseaux & Infographie",
      "services.s3Desc": "Câblage structuré, baies de brassage, bornes biométriques, dépannage hardware/software et création graphique professionnelle (logos, flyers).",
      
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

      "why.titlePre": "Pourquoi",
      "why.titleOrange": "me choisir ?",
      "why.text": "Polyvalent et rigoureux, je mets mes compétences au service du développement, de la maintenance d'infrastructures et de la création visuelle. Certifié par les Ateliers Google, je conçois des systèmes d'information pensés pour durer.",
      "why.m1Label": "Code en production vérifiable",
      "why.m2Label": "3e Prix National Concours Tech",
      "why.contactBtn": "Me contacter",
      "why.downloadCvBtn": "Télécharger mon CV (PDF)",

      "portfolio.headPre": "Découvrez",
      "portfolio.headSub": "mon",
      "portfolio.headOrange": "Portfolio",
      "portfolio.seeAll": "Voir tout",
      "portfolio.tabAll": "Tous les projets",
      "portfolio.tabDev": "Génie Logiciel & ERP",
      "portfolio.tabDesign": "Infographie & Logos",
      "portfolio.tabMaintenance": "Maintenance & Réseaux",
      "portfolio.liveBtn": "Démo en ligne →",
      "portfolio.sourceBtn": "Code Source GitHub",

      "testi.titlePre": "Des témoignages qui",
      "testi.titleSub": "parlent de",
      "testi.titleOrange": "mes résultats",
      "testi.sub": "Appréciations de collaborateurs et partenaires ayant expérimenté ma rigueur dans la conception logicielle, le design et l'encadrement technique.",
      "testi.autoScroll": "Auto-scroll actif",
      "testi.t1Role": "Génie Logiciel · U.P. SIANTOU",
      "testi.t1Text": "« Jordan possède une rigueur technique exemplaire et une capacité rare à modéliser des systèmes d'information complexes. Son encadrement sur nos projets a élevé les standards de toute l'équipe. »",
      "testi.t2Role": "Collaboratrice Tech & Frontend",
      "testi.t2Text": "« Collaborer avec Jordan sur des plateformes comme AgroFlow et Sister Schola prouve sa maîtrise : le souci du détail dans l'UI se combine toujours à une robustesse backend irréprochable. »",
      "testi.t3Role": "Direction Technique · LeGuide Informatique",
      "testi.t3Text": "« Qu'il s'agisse de la maintenance de nos équipements réseau ou de la création de nos supports graphiques, Jordan fait preuve d'une autonomie et d'une réactivité exceptionnelles. »",

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
      "footer.cvLink": "📄 Télécharger CV (PDF)",
      "footer.contactTitle": "Coordonnées",
      "footer.stayConnected": "Restons connectés",
      "footer.placeholder": "Votre adresse email...",
      "footer.copyright": "Copyright © 2026 NDE Jordan Loïc · LaboGraphie Dev. Tous droits réservés.",
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
      "hero.status": "Available for contracts, dev & opportunities",
      "hero.hello": "Hello !",
      "hero.intro": "I'm",
      "hero.role": "Full-Stack Developer",
      "hero.quote": "“Jordan's technical excellence and software architecture ensure the success of our projects in production. Highly recommended!”",
      "hero.portfolioBtn": "Portfolio",
      "hero.hireBtn": "Hire me",
      "hero.cvDownload": "Download CV",
      "hero.expLabel": "Experience & Engineering",

      "services.titlePre": "My",
      "services.titleOrange": "Services",
      "services.sub": "Software Engineering Technologist certified by Google Workshops: robust application architecture, databases, IT maintenance & graphic design.",
      "services.s1Title": "Software Engineering & Web Apps",
      "services.s1Desc": "Full-cycle SaaS and ERP architecture design, microservices, RESTful APIs, and responsive applications with resilient offline synchronization.",
      "services.s2Title": "Databases & LIMS Systems",
      "services.s2Desc": "Rigorous relational data modeling (SQL/PostgreSQL), clinical sample tracking, transactional integrity, and high-performance query optimization.",
      "services.s3Title": "IT Maintenance, Networks & Design",
      "services.s3Desc": "Structured network cabling, patch panels, biometric access terminals, hardware/software troubleshooting, and professional visual branding (logos, flyers).",

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

      "why.titlePre": "Why",
      "why.titleOrange": "Hire Me?",
      "why.text": "Versatile and rigorous, I dedicate my expertise to software development, IT infrastructure maintenance, and visual creativity. Certified by Google Workshops, I build information systems designed to endure.",
      "why.m1Label": "Verifiable production code",
      "why.m2Label": "3rd National Tech Award (Palme d'Or)",
      "why.contactBtn": "Contact Me",
      "why.downloadCvBtn": "Download My Resume (PDF)",

      "portfolio.headPre": "Explore",
      "portfolio.headSub": "my",
      "portfolio.headOrange": "Portfolio",
      "portfolio.seeAll": "View All",
      "portfolio.tabAll": "All Projects",
      "portfolio.tabDev": "Software Eng. & ERP",
      "portfolio.tabDesign": "Graphic Design & Logos",
      "portfolio.tabMaintenance": "Maintenance & Networks",
      "portfolio.liveBtn": "Live Demo →",
      "portfolio.sourceBtn": "GitHub Source Code",

      "testi.titlePre": "Testimonials That",
      "testi.titleSub": "Speak to",
      "testi.titleOrange": "My Results",
      "testi.sub": "Feedback from partners and teammates who experienced my technical precision in software design, visual branding, and IT supervision.",
      "testi.autoScroll": "Auto-scroll active",
      "testi.t1Role": "Software Engineering · U.P. SIANTOU",
      "testi.t1Text": "“Jordan demonstrates exemplary technical rigor and a rare ability to model complex information systems. His mentorship raised the standards of the entire team.”",
      "testi.t2Role": "Tech Collaborator & Frontend",
      "testi.t2Text": "“Collaborating with Jordan on platforms like AgroFlow and Sister Schola proves his craft: extreme attention to UI detail always pairs with rock-solid backend stability.”",
      "testi.t3Role": "Technical Direction · LeGuide Informatique",
      "testi.t3Text": "“From network hardware servicing to creating striking promotional graphics, Jordan displays outstanding autonomy and responsiveness.”",

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
      "footer.cvLink": "📄 Download Resume (PDF)",
      "footer.contactTitle": "Contact Info",
      "footer.stayConnected": "Stay Connected",
      "footer.placeholder": "Your email address...",
      "footer.copyright": "Copyright © 2026 NDE Jordan Loïc · LaboGraphie Dev. All Rights Reserved.",
      "footer.terms": "Terms of Use",
      "footer.privacy": "Privacy Policy"
    }
  };

  let currentLang = localStorage.getItem('jordan_portfolio_lang') || 'fr';

  function applyLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('jordan_portfolio_lang', lang);

    // Update active state on language buttons
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Translate all tagged elements with a smooth micro-fade
    const i18nElements = document.querySelectorAll('[data-i18n]');
    i18nElements.forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang][key]) {
        el.style.opacity = '0.7';
        setTimeout(() => {
          el.innerHTML = translations[lang][key];
          el.style.opacity = '1';
        }, 120);
      }
    });

    // Translate placeholder attributes
    const placeholderEls = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderEls.forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang][key]) {
        el.placeholder = translations[lang][key];
      }
    });

    // Update portfolio detail with current language
    updateActiveProjectDetail();
  }

  // Setup language toggle click handlers
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = btn.getAttribute('data-lang');
      applyLanguage(targetLang);
    });
  });

  // Apply on startup
  applyLanguage(currentLang);


  /* =========================================================================
     2. DONNÉES DU PORTFOLIO MULTI-CATÉGORIES (DEV, DESIGN, MAINTENANCE)
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
      title_fr: "Identité Visuelle & Chartes Graphiques — LeGuide Informatique",
      title_en: "Brand Identity & Design System — LeGuide Informatique",
      desc_fr: "Direction artistique complète, conception de logos vectoriels scalables, déclinaisons typographiques et guides d'utilisation de marque pour la promotion d'outils et services numériques.",
      desc_en: "Comprehensive art direction, scalable vector logo design, typography pairings, and complete brand identity guidelines for technology publications.",
      live: "rsc/img/projets/infographie_branding.jpg",
      github: "https://github.com/Nadroj-ciol",
      category: "infographie",
      type: "image"
    },
    {
      title_fr: "Campagnes Visuelles & Flyers Événementiels Haute Résolution",
      title_en: "Visual Campaigns & High-Resolution Event Posters",
      desc_fr: "Conception infographique avancée de supports de communication imprimés et digitaux : affiches pour conférences tech, bannières pour réseaux sociaux et flyers promotionnels à fort impact visuel.",
      desc_en: "Advanced graphic design for print and digital marketing campaigns: high-impact event flyers, social media banners, and promotional tech conference posters.",
      live: "rsc/img/projets/infographie_flyer.jpg",
      github: "https://github.com/Nadroj-ciol",
      category: "infographie",
      type: "image"
    },
    {
      title_fr: "Architecture Réseau, Baie de Brassage & Câblage Structuré",
      title_en: "Network Architecture, Server Racks & Structured Cabling",
      desc_fr: "Déploiement et organisation d'armoires serveurs, adressage IP, brassage de câbles Ethernet catégorie 6, configuration de switches administrables et sécurisation de passerelles réseau.",
      desc_en: "Deployment and structuring of data center racks, IP addressing schemas, Cat6 structured cabling, managed switch configuration, and network security gateways.",
      live: "rsc/img/projets/reseau_datacenter.jpg",
      github: "https://github.com/Nadroj-ciol",
      category: "maintenance",
      type: "image"
    },
    {
      title_fr: "Maintenance Hardware, Systèmes & Bornes Biométriques",
      title_en: "Hardware Maintenance, OS Systems & Biometric Terminals",
      desc_fr: "Diagnostic matériel au composant, installation et calibrage de bornes biométriques d'émargement universitaire (U.P. Siantou), et maintenance préventive/curative de parcs informatiques.",
      desc_en: "Component-level hardware diagnostics, university biometric clock-in terminal calibration (U.P. Siantou), and preventive/curative enterprise IT fleet maintenance.",
      live: "rsc/img/projets/maintenance_hardware.jpg",
      github: "https://github.com/Nadroj-ciol",
      category: "maintenance",
      type: "image"
    }
  ];

  let currentProjectIdx = 0;
  const cards = document.querySelectorAll('.portfolio-card');
  const dots = document.querySelectorAll('#portfolioDots span');
  const activeTitle = document.getElementById('activeProjectTitle');
  const activeDesc = document.getElementById('activeProjectDesc');
  const activeLink = document.getElementById('activeProjectLink');
  const btnLive = document.getElementById('btnDetailLive');
  const btnGit = document.getElementById('btnDetailGit');

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

  function setProject(idx) {
    if (idx < 0 || idx >= projectsData.length) return;
    currentProjectIdx = idx;

    cards.forEach((c, i) => {
      if (i === idx) {
        c.classList.add('active');
        c.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        c.classList.remove('active');
      }
    });

    dots.forEach((d, i) => {
      if (i === idx) {
        d.className = 'dot-bar active';
      } else {
        d.className = 'dot-circle';
      }
    });

    updateActiveProjectDetail();
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => setProject(i));
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setProject(i));
  });

  // Filtres de tags sous le carrousel
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
          card.style.animation = 'scaleCardIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        } else {
          card.style.display = 'none';
        }
      });

      // Synchroniser avec le premier projet visible
      const firstVisible = Array.from(cards).find(c => c.style.display !== 'none');
      if (firstVisible) {
        const idx = parseInt(firstVisible.getAttribute('data-index'), 10);
        setProject(idx);
      }
    });
  });

  // Bouton "Voir tout" : réinitialise le filtre
  const btnToggleAllProjects = document.getElementById('btnToggleAllProjects');
  if (btnToggleAllProjects) {
    btnToggleAllProjects.addEventListener('click', () => {
      const allPill = document.querySelector('.tag-pill[data-filter="all"]');
      if (allPill) allPill.click();
    });
  }


  /* =========================================================================
     3. CARROUSEL TÉMOIGNAGES AVEC DÉFILEMENT AUTOMATIQUE (AUTO-PLAY)
     ========================================================================= */
  const testiCards = document.querySelectorAll('.testi-card');
  const testiDots = document.querySelectorAll('#testiDots span');
  const btnTestiPrev = document.getElementById('btnTestiPrev');
  const btnTestiNext = document.getElementById('btnTestiNext');
  const testiTrack = document.getElementById('testiTrack');
  const testiAutoplayStatus = document.getElementById('testiAutoplayStatus');

  let currentTesti = 0;
  let testiInterval = null;
  const TESTI_INTERVAL_MS = 4800;

  function showTestimonial(idx) {
    if (idx < 0) idx = testiCards.length - 1;
    if (idx >= testiCards.length) idx = 0;
    currentTesti = idx;

    testiCards.forEach((card, i) => {
      if (i === idx) {
        card.classList.add('active');
        card.style.transform = 'translateY(0) scale(1)';
        card.style.opacity = '1';
      } else {
        card.classList.remove('active');
        card.style.opacity = '0.35';
        card.style.transform = 'translateY(12px) scale(0.97)';
      }
    });

    testiDots.forEach((d, i) => {
      if (i === idx) {
        d.className = 'dot-bar active';
      } else {
        d.className = 'dot-circle';
      }
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

  if (btnTestiNext) {
    btnTestiNext.addEventListener('click', () => {
      showTestimonial(currentTesti + 1);
      startTestiAutoPlay(); // Restart timer
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

  // Pause au survol (hover) pour confort de lecture
  if (testiTrack) {
    testiTrack.addEventListener('mouseenter', stopTestiAutoPlay);
    testiTrack.addEventListener('mouseleave', startTestiAutoPlay);
  }

  startTestiAutoPlay();


  /* =========================================================================
     4. VISIONNEUSE LIGHTBOX (IMAGE ZOOM MODAL)
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
     5. COMPTEURS ANIMÉS (COUNT-UP EFFECT)
     ========================================================================= */
  const countUpElements = document.querySelectorAll('.count-up');
  let countUpTriggered = false;

  function runCountUp() {
    countUpElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : (el.textContent.includes('/5') ? '/5' : ''));
      const isFloat = el.getAttribute('data-target').includes('.');
      const duration = 1800; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic
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


  /* =========================================================================
     6. SCROLL REVEAL & NAVIGATION SCROLL-SPY
     ========================================================================= */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');
  const reveals = document.querySelectorAll('.reveal-on-scroll');

  const checkScroll = () => {
    const scrollY = window.pageYOffset;
    const windowH = window.innerHeight;

    // Highlight menu
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-item[href*="${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(i => i.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });

    // Reveal animations
    reveals.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < windowH - 60) {
        el.classList.add('revealed');
      }
    });

    // Count-up on scroll
    const whySection = document.querySelector('.why-section');
    if (whySection && !countUpTriggered) {
      const rect = whySection.getBoundingClientRect();
      if (rect.top < windowH - 80) {
        countUpTriggered = true;
        runCountUp();
      }
    }
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  window.addEventListener('load', checkScroll);
  checkScroll(); // Trigger immediately at script execution
  setTimeout(checkScroll, 250); // Fallback after font load


  /* =========================================================================
     7. MENU MOBILE TOGGLE
     ========================================================================= */
  const mobileToggle = document.getElementById('mobileToggle');
  const navbar = document.getElementById('navbar');

  if (mobileToggle && navbar) {
    mobileToggle.addEventListener('click', () => {
      navbar.classList.toggle('open');
      const expanded = navbar.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });

    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navbar.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* =========================================================================
     8. MICRO-INTERACTION TILT 3D DIGNE DE FRAMER MOTION
     ========================================================================= */
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (window.innerWidth > 992) {
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `perspective(1000px) rotateY(${x * 0.035}deg) rotateX(${-y * 0.035}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
        card.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
      });
    });

    // Tilt sur le dôme Hero
    const heroDome = document.querySelector('.hero-dome-wrapper');
    if (heroDome) {
      heroDome.addEventListener('mousemove', (e) => {
        const rect = heroDome.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        heroDome.style.transform = `perspective(1000px) rotateY(${x * 0.03}deg) rotateX(${-y * 0.03}deg)`;
      });

      heroDome.addEventListener('mouseleave', () => {
        heroDome.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
        heroDome.style.transition = 'transform 0.5s ease';
      });

      heroDome.addEventListener('mouseenter', () => {
        heroDome.style.transition = 'none';
      });
    }
  }

});
