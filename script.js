(function () {
  const store = window.PortfolioStore;
  if (!store) return;

  const navbar = document.getElementById("navbar");
  const navbarToggle = document.getElementById("navbar-toggle");
  const navbarMenu = document.getElementById("navbar-menu");

  const heroRefs = {
    location: document.getElementById("hero-location"),
    name: document.getElementById("hero-name"),
    title: document.getElementById("hero-title"),
    mainline: document.getElementById("hero-mainline"),
    dynamic: document.getElementById("dynamic-line"),
    description: document.getElementById("hero-description"),
    btnPrimary: document.getElementById("btn-publications"),
    btnSecondary: document.getElementById("btn-cv"),
    socialEmail: document.getElementById("social-email"),
    socialLinkedIn: document.getElementById("social-linkedin"),
    socialScholar: document.getElementById("social-scholar"),
    socialResearchGate: document.getElementById("social-researchgate"),
    image: document.getElementById("profile-image")
  };

  const typingState = {
    timer: null,
    pause: null,
    index: 0
  };

  function updateNav(data) {
    document.getElementById("navbar-logo").textContent = data.general.logoText;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      const key = link.getAttribute("data-nav");
      link.textContent = data.general.navLabels[key] || link.textContent;
    });
  }

  function runHeroTyping(items) {
    if (typingState.timer) window.clearInterval(typingState.timer);
    if (typingState.pause) window.clearTimeout(typingState.pause);

    const queue = Array.isArray(items) && items.length ? items : [""];
    typingState.index = 0;

    const typeOne = () => {
      const text = queue[typingState.index];
      let charIndex = 0;
      heroRefs.dynamic.textContent = "";

      typingState.timer = window.setInterval(() => {
        if (charIndex <= text.length) {
          heroRefs.dynamic.textContent = text.slice(0, charIndex);
          charIndex += 1;
          return;
        }
        window.clearInterval(typingState.timer);
        typingState.pause = window.setTimeout(() => {
          typingState.index = (typingState.index + 1) % queue.length;
          typeOne();
        }, 1400);
      }, 42);
    };

    typeOne();
  }

  function renderHero(data) {
    const hero = data.hero;
    heroRefs.location.textContent = hero.location;
    heroRefs.name.textContent = hero.name;
    heroRefs.title.textContent = hero.title;
    heroRefs.mainline.textContent = hero.researchLine;
    heroRefs.description.textContent = hero.intro;

    heroRefs.btnPrimary.textContent = hero.buttons.primaryText;
    heroRefs.btnPrimary.href = hero.buttons.primaryLink;
    heroRefs.btnSecondary.textContent = hero.buttons.secondaryText;
    heroRefs.btnSecondary.href = hero.buttons.secondaryLink;

    heroRefs.socialEmail.href = `mailto:${hero.socials.email}`;
    heroRefs.socialLinkedIn.href = hero.socials.linkedin;
    heroRefs.socialScholar.href = hero.socials.scholar;
    heroRefs.socialResearchGate.href = hero.socials.researchGate;

    heroRefs.image.src = hero.profileImagePath;
    heroRefs.image.alt = hero.name;

    runHeroTyping(hero.dynamicItems);
  }

  function cardTemplate(item) {
    return `
      <article class="info-card">
        <h3 class="info-card__title">${item.title}</h3>
        <p class="info-card__subtitle">${item.subtitle}</p>
        <p class="info-card__meta">${item.date}</p>
        <p class="info-card__text">${item.description}</p>
      </article>
    `;
  }

  function renderAbout(data) {
    document.getElementById("about-title").textContent = data.about.title;
    document.getElementById("about-content").innerHTML = data.about.items.map(cardTemplate).join("");
  }

  function renderEducation(data) {
    document.getElementById("education-title").textContent = data.education.title;
    document.getElementById("education-content").innerHTML = data.education.items.map((item) => `
      <article class="education-card">
        <h3 class="education-card__degree">${item.degree}</h3>
        <p class="education-card__department">${item.department}</p>
        <p class="education-card__institution">${item.institution}</p>
        <p class="education-card__result"><strong>${item.result}</strong></p>
        <p class="education-card__highlight">${item.highlight}</p>
        <p class="education-card__session">${item.session}</p>
      </article>
    `).join("");
  }

  function renderPublications(data) {
    document.getElementById("publications-title").textContent = data.publications.title;
    document.getElementById("publications-subtitle").textContent = data.publications.subtitle;
    document.getElementById("publications-summary").innerHTML = `
      <div class="summary-chip"><span class="summary-chip__label">Journal Articles</span><span class="summary-chip__value">${data.publications.summary.journalArticles}</span></div>
      <div class="summary-chip"><span class="summary-chip__label">Books</span><span class="summary-chip__value">${data.publications.summary.books}</span></div>
    `;

    document.getElementById("publications-content").innerHTML = data.publications.items.map((item) => {
      const isStatus = item.type === "Accepted Article" || item.type === "Submitted Article";
      const badgeClass = isStatus ? "badge badge--alt" : "badge";
      const metaBits = [
        item.volume ? `Vol ${item.volume}` : "",
        item.issue ? `Issue ${item.issue}` : "",
        item.pages ? `Pages ${item.pages}` : "",
        item.status || ""
      ].filter(Boolean).join(" · ");

      const noteBits = [item.note, item.authors ? `Authors: ${item.authors}` : "", item.language].filter(Boolean).join(" · ");

      return `
        <article class="pub-card">
          <span class="${badgeClass}">${item.type}</span>
          <h3 class="pub-card__title">${item.title}</h3>
          <p class="pub-card__source">${item.journalPublisher}</p>
          ${metaBits ? `<p class="pub-card__meta">${metaBits}</p>` : ""}
          ${noteBits ? `<p class="pub-card__meta">${noteBits}</p>` : ""}
          <p class="pub-card__year">${item.year || "Status"}</p>
        </article>
      `;
    }).join("");
  }

  function renderMemberships(data) {
    document.getElementById("memberships-title").textContent = data.memberships.title;
    document.getElementById("memberships-subtitle").textContent = data.memberships.subtitle;
    document.getElementById("memberships-content").innerHTML = data.memberships.items.map((item) => `
      <article class="membership-card">
        <span class="badge">${item.label}</span>
        <h3 class="membership-card__title">${item.title}</h3>
        <p class="membership-card__org">${item.organization}</p>
      </article>
    `).join("");
  }

  function renderAchievements(data) {
    document.getElementById("achievements-title").textContent = data.achievements.title;
    document.getElementById("achievements-subtitle").textContent = data.achievements.subtitle;
    document.getElementById("achievements-summary").innerHTML = `
      <div class="summary-chip"><span class="summary-chip__label">Memberships</span><span class="summary-chip__value">${data.achievements.summary.memberships}</span></div>
      <div class="summary-chip"><span class="summary-chip__label">Certificates & Recognition</span><span class="summary-chip__value">${data.achievements.summary.certificates}</span></div>
    `;

    document.getElementById("achievements-content").innerHTML = data.achievements.items.map((item) => `
      <article class="achievement-card ${item.featured ? "achievement-card--featured" : ""}">
        <span class="badge">${item.label}</span>
        <h3 class="achievement-card__title">${item.title}</h3>
        ${item.program ? `<p class="achievement-card__program">${item.program}</p>` : ""}
        <p class="achievement-card__institution">${item.institution}</p>
      </article>
    `).join("");
  }

  function renderLeadershipInterests(data) {
    const model = data.leadershipInterests;
    document.getElementById("leadership-title").textContent = model.title;
    document.getElementById("leadership-activities-title").textContent = model.leadershipTitle;
    document.getElementById("interests-title").textContent = model.interestsTitle;

    document.getElementById("leadership-content").innerHTML = model.items.map((item) => `
      <li class="leadership-item">
        <span class="leadership-item__label">${item.category}</span>
        <p class="leadership-item__text">${item.text}</p>
      </li>
    `).join("");

    document.getElementById("interests-content").innerHTML = model.interests.map((interest) => `
      <span class="interest-chip">${interest}</span>
    `).join("");
  }

  function renderContact(data) {
    const contact = data.contact;
    document.getElementById("contact-title").textContent = contact.title;
    document.getElementById("contact-subtitle").textContent = contact.subtitle;
    document.getElementById("contact-intro-title").textContent = contact.intro;
    document.getElementById("contact-form-title").textContent = contact.formHeading;

    const detailMap = [
      ["✉", "Email", contact.details.email],
      ["☎", "Phone", contact.details.phone],
      ["⌖", "Location", contact.details.location],
      ["in", "LinkedIn", contact.details.linkedin],
      ["G", "Google Scholar", contact.details.scholar],
      ["R", "ResearchGate", contact.details.researchgate]
    ];

    document.getElementById("contact-info-list").innerHTML = detailMap.map(([icon, label, value]) => `
      <li class="contact-row">
        <span class="contact-row__icon">${icon}</span>
        <div>
          <p class="contact-row__label">${label}</p>
          <p class="contact-row__value">${value}</p>
        </div>
      </li>
    `).join("");
  }

  function renderFooter(data) {
    document.getElementById("footer-text").textContent = data.general.footerText;
  }

  function renderAll(data) {
    updateNav(data);
    renderHero(data);
    renderAbout(data);
    renderEducation(data);
    renderPublications(data);
    renderMemberships(data);
    renderAchievements(data);
    renderLeadershipInterests(data);
    renderContact(data);
    renderFooter(data);
  }

  function setupNavbarInteractions() {
    navbarToggle?.addEventListener("click", () => {
      navbarMenu.classList.toggle("active");
    });

    document.querySelectorAll(".navbar__link").forEach((link) => {
      link.addEventListener("click", () => navbarMenu.classList.remove("active"));
    });

    window.addEventListener("scroll", () => {
      navbar.style.borderColor = window.scrollY > 50 ? "rgba(107, 44, 63, 0.42)" : "rgba(107, 44, 63, 0.26)";
    });
  }

  function setupContactForm() {
    const form = document.getElementById("contact-form");
    const status = document.getElementById("contact-form-status");
    if (!form || !status) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = "Please complete all required fields correctly.";
        status.className = "form-status is-error";
        return;
      }
      status.textContent = "Thank you. Your message has been prepared for delivery.";
      status.className = "form-status is-success";
      form.reset();
    });
  }

  setupNavbarInteractions();
  setupContactForm();
  renderAll(store.getData());

  window.addEventListener("portfolioUpdated", (event) => {
    renderAll(event.detail || store.getData());
  });
})();
