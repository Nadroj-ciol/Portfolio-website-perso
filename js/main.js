/**
 * MAIN.JS — Reproduction Interactive du Template Figma JCREA
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Menu Mobile Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navbar = document.getElementById('navbar');
  const navItems = document.querySelectorAll('.nav-item');

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

  // 2. Active link highlight on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-item[href*="${sectionId}"]`);

      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItems.forEach(i => i.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }, { passive: true });

  // 3. Carrousel Portfolio interactif & mise à jour du détail projet
  const projectsData = [
    {
      title: "AgroFlow — Smart Farm Management Solution",
      desc: "ERP agricole de pointe digitalisant la gestion des parcelles, le suivi financier des récoltes, les stocks et la traçabilité en temps réel, conçu pour les exploitants avec mode hors-ligne résilient.",
      live: "https://agroflowerp.vercel.app",
      github: "https://github.com/Nadroj-ciol/AgroFlowErp-V1",
      category: "erp"
    },
    {
      title: "Acuvera Clinical — Intelligent Health Systems",
      desc: "Système de suivi clinique complet permettant la centralisation des dossiers patients, la gestion des constantes médicales et l'orchestration des flux de consultations pour structures hospitalières.",
      live: "https://acuvera-clinical.vercel.app",
      github: "https://github.com/Nadroj-ciol/Acuvera-clinical",
      category: "health"
    },
    {
      title: "CyberEdii — High Performance Cyber Portfolio",
      desc: "Interface web immersive haute performance pour ingénieur télécoms et cybersécurité, développée avec une esthétique terminal néon, temps de chargement éclair et fluidité mobile chirurgicale.",
      live: "https://portfolio-edii.vercel.app",
      github: "https://github.com/Nadroj-ciol/portfolio-edii",
      category: "ui"
    }
  ];

  const cards = document.querySelectorAll('.portfolio-card');
  const dots = document.querySelectorAll('.portfolio-dots span');
  const activeTitle = document.getElementById('activeProjectTitle');
  const activeDesc = document.getElementById('activeProjectDesc');
  const activeLink = document.getElementById('activeProjectLink');
  const btnLive = document.getElementById('btnDetailLive');
  const btnGit = document.getElementById('btnDetailGit');

  function setProject(idx) {
    if (idx < 0 || idx >= projectsData.length) return;
    const p = projectsData[idx];

    cards.forEach((c, i) => {
      if (i === idx) c.classList.add('active');
      else c.classList.remove('active');
    });

    dots.forEach((d, i) => {
      if (i === idx) {
        d.className = 'dot-bar active';
      } else {
        d.className = 'dot-circle';
      }
    });

    if (activeTitle) activeTitle.textContent = p.title;
    if (activeDesc) activeDesc.textContent = p.desc;
    if (activeLink) activeLink.href = p.live;
    if (btnLive) btnLive.href = p.live;
    if (btnGit) btnGit.href = p.github;
  }

  cards.forEach((card, i) => {
    card.addEventListener('click', () => setProject(i));
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => setProject(i));
  });

  // 4. Filtres de tags sous le carrousel
  const tagPills = document.querySelectorAll('.tag-pill');
  tagPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tagPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter');
      let foundIndex = 0;
      if (filter === 'all') foundIndex = 0;
      else if (filter === 'erp') foundIndex = 0;
      else if (filter === 'health') foundIndex = 1;
      else if (filter === 'ui') foundIndex = 2;

      setProject(foundIndex);
    });
  });
});
