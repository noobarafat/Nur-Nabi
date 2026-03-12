(function () {
  const store = window.PortfolioStore;
  if (!store) return;

  // DOM Elements
  const navbar = document.getElementById("navbar");
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");
  const navbarLogo = document.getElementById("navbar-logo");
  const navbarLinks = document.querySelectorAll(".navbar__link");

  // Hero Elements
  const heroLocation = document.getElementById("hero-location");
  const heroName = document.getElementById("hero-name");
  const heroTitle = document.getElementById("hero-title");
  const heroMainline = document.getElementById("hero-mainline");
  const dynamicLine = document.getElementById("dynamic-line");
  const heroDescription = document.getElementById("hero-description");
  const btnPublications = document.getElementById("btn-publications");
  const btnCV = document.getElementById("btn-cv");
  const socialEmail = document.getElementById("social-email");
  const socialLinkedIn = document.getElementById("social-linkedin");
  const socialScholar = document.getElementById("social-scholar");
  const socialResearchGate = document.getElementById("social-researchgate");
  const profileImage = document.getElementById("profile-image");

  // Section Elements
  const sectionContents = {
    about: document.getElementById("about-content"),
    education: document.getElementById("education-content"),
    publications: document.getElementById("publications-content"),
    experience: document.getElementById("experience-content"),
    skills: document.getElementById("skills-content"),
    events: document.getElementById("events-content"),
    contact: document.getElementById("contact-content")
  };

  // Animation State
  let typingTimer = null;
  let pauseTimer = null;

  // Navbar Toggle
  navbarToggle.addEventListener("click", () => {
    navbarMenu.classList.toggle("active");
    navbarToggle.classList.toggle("active");
  });

  navbarLinks.forEach(link => {
    link.addEventListener("click", () => {
      navbarMenu.classList.remove("active");
      navbarToggle.classList.remove("active");
    });
  });

  // Navbar Scroll Effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.borderColor = "rgba(107, 44, 63, 0.4)";
    } else {
      navbar.style.borderColor = "rgba(107, 44, 63, 0.25)";
    }
  });

  // Dynamic Text Animation
  function startRotatingTyping(items) {
    if (typingTimer) window.clearInterval(typingTimer);
    if (pauseTimer) window.clearTimeout(pauseTimer);

    const queue = Array.isArray(items) && items.length ? items : [""];
    let itemIndex = 0;

    const typeOne = () => {
      const content = queue[itemIndex];
      let charIndex = 0;
      dynamicLine.textContent = "";

      typingTimer = window.setInterval(() => {
        if (charIndex <= content.length) {
          dynamicLine.textContent = content.slice(0, charIndex);
          charIndex += 1;
          return;
        }

        window.clearInterval(typingTimer);
        pauseTimer = window.setTimeout(() => {
          itemIndex = (itemIndex + 1) % queue.length;
          typeOne();
        }, 1500);
      }, 50);
    };

    typeOne();
  }

  // Render Data
  function render(data) {
    // Navbar
    navbarLogo.textContent = data.navbar.logo;

    const hero = data.hero;
    heroLocation.textContent = hero.location;
    heroName.textContent = hero.name;
    heroTitle.textContent = hero.title;
    heroMainline.textContent = hero.mainLine;
    heroDescription.textContent = hero.description;

    btnPublications.textContent = hero.buttons.publications.label;
    btnPublications.href = hero.buttons.publications.link;

    btnCV.textContent = hero.buttons.cv.label;
    btnCV.href = hero.buttons.cv.link;

    socialEmail.href = `mailto:${hero.socials.email}`;
    socialLinkedIn.href = hero.socials.linkedin;
    socialScholar.href = hero.socials.scholar;
    socialResearchGate.href = hero.socials.researchGate;

    profileImage.src = hero.profileImage;
    profileImage.alt = hero.name;

    startRotatingTyping(hero.dynamicItems);

    // Sections (skip hardcoded sections)
    Object.keys(sectionContents).forEach(key => {
      if (
        sectionContents[key] &&
        key !== "about" &&
        key !== "education" &&
        key !== "publications" &&
        key !== "skills" &&
        key !== "events"
      ) {
        sectionContents[key].textContent = data.sections[key];
      }
    });
  }

  // Initial Render
  render(store.getData());

  // Listen for Portfolio Updates
  window.addEventListener("portfolioUpdated", (event) => {
    render(event.detail);
  });
})();
