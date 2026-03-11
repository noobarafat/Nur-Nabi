(function () {
  const STORAGE_KEY = "nurnabi_portfolio";

  const defaultData = {
    navbar: {
      logo: "nur nabi.",
      items: [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Education", id: "education" },
        { label: "Publications", id: "publications" },
        { label: "Experience", id: "experience" },
        { label: "Skills", id: "skills" },
        { label: "Events", id: "events" },
        { label: "Contact", id: "contact" }
      ]
    },
    hero: {
      location: "CHITTAGONG, BANGLADESH",
      name: "Md. Nur Nabi",
      title: "Lecturer, Department of Bangladesh Studies, University of Chittagong",
      mainLine: "Researcher in Bengal's History",
      dynamicItems: [
        "Socio-Cultural History",
        "Political History",
        "Intellectual History",
        "Historiography"
      ],
      description: "Historian, lecturer, and researcher focused on Bengal's socio-cultural, political, and intellectual history.",
      buttons: {
        publications: { label: "Publications", link: "#publications" },
        cv: { label: "Download CV", link: "#contact" }
      },
      socials: {
        email: "nurnabi@example.com",
        linkedin: "https://www.linkedin.com/",
        scholar: "https://scholar.google.com/",
        researchGate: "https://www.researchgate.net/"
      },
      profileImage: "Nur Nabi/assets/photos/profile.png"
    },
    sections: {
      about: "Add your about content here through the admin panel.",
      education: "Add your education details here.",
      publications: "Add your publications list here.",
      experience: "Add your professional experience here.",
      skills: "Add your skills and certifications here.",
      events: "Add your events and conferences here.",
      contact: "Add your contact information here."
    }
  };

  function sanitize(value, fallback) {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
  }

  function cloneDeep(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function normalizeData(raw) {
    if (!raw || typeof raw !== "object") return cloneDeep(defaultData);

    const normalized = cloneDeep(defaultData);
    
    if (raw.navbar) {
      if (raw.navbar.logo) normalized.navbar.logo = sanitize(raw.navbar.logo, defaultData.navbar.logo);
      if (Array.isArray(raw.navbar.items)) normalized.navbar.items = raw.navbar.items;
    }

    if (raw.hero) {
      const h = raw.hero;
      if (h.location) normalized.hero.location = sanitize(h.location, defaultData.hero.location);
      if (h.name) normalized.hero.name = sanitize(h.name, defaultData.hero.name);
      if (h.title) normalized.hero.title = sanitize(h.title, defaultData.hero.title);
      if (h.mainLine) normalized.hero.mainLine = sanitize(h.mainLine, defaultData.hero.mainLine);
      if (h.description) normalized.hero.description = sanitize(h.description, defaultData.hero.description);
      if (h.profileImage) normalized.hero.profileImage = sanitize(h.profileImage, defaultData.hero.profileImage);
      
      if (Array.isArray(h.dynamicItems)) {
        const cleaned = h.dynamicItems.map(i => typeof i === "string" ? i.trim() : "").filter(Boolean);
        normalized.hero.dynamicItems = cleaned.length ? cleaned : defaultData.hero.dynamicItems;
      }

      if (h.buttons) {
        if (h.buttons.publications) {
          normalized.hero.buttons.publications.label = sanitize(h.buttons.publications.label, defaultData.hero.buttons.publications.label);
          normalized.hero.buttons.publications.link = sanitize(h.buttons.publications.link, defaultData.hero.buttons.publications.link);
        }
        if (h.buttons.cv) {
          normalized.hero.buttons.cv.label = sanitize(h.buttons.cv.label, defaultData.hero.buttons.cv.label);
          normalized.hero.buttons.cv.link = sanitize(h.buttons.cv.link, defaultData.hero.buttons.cv.link);
        }
      }

      if (h.socials) {
        if (h.socials.email) normalized.hero.socials.email = sanitize(h.socials.email, defaultData.hero.socials.email);
        if (h.socials.linkedin) normalized.hero.socials.linkedin = sanitize(h.socials.linkedin, defaultData.hero.socials.linkedin);
        if (h.socials.scholar) normalized.hero.socials.scholar = sanitize(h.socials.scholar, defaultData.hero.socials.scholar);
        if (h.socials.researchGate) normalized.hero.socials.researchGate = sanitize(h.socials.researchGate, defaultData.hero.socials.researchGate);
      }
    }

    if (raw.sections) {
      Object.keys(raw.sections).forEach(key => {
        if (key in normalized.sections) {
          normalized.sections[key] = sanitize(raw.sections[key], defaultData.sections[key]);
        }
      });
    }

    return normalized;
  }

  function getData() {
    try {
      const fromStorage = localStorage.getItem(STORAGE_KEY);
      return fromStorage ? normalizeData(JSON.parse(fromStorage)) : cloneDeep(defaultData);
    } catch (e) {
      return cloneDeep(defaultData);
    }
  }

  function setData(data) {
    const normalized = normalizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent("portfolioUpdated", { detail: normalized }));
    return normalized;
  }

  function resetData() {
    const defaults = cloneDeep(defaultData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    window.dispatchEvent(new CustomEvent("portfolioUpdated", { detail: defaults }));
    return defaults;
  }

  window.PortfolioStore = {
    STORAGE_KEY,
    defaultData,
    getData,
    setData,
    resetData,
    normalizeData
  };
})();
