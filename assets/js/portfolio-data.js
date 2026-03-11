(function () {
  const STORAGE_KEY = "nurnabi_portfolio_hero";

  const defaultData = {
    name: "Md. Nur Nabi",
    title: "Lecturer, Department of Bangladesh Studies, University of Chittagong",
    location: "Chittagong, Bangladesh",
    tagline: "Researcher in Bengal’s Socio-Cultural, Political, and Intellectual History",
    dynamicLine: "Researching Bengal’s past, teaching for the future.",
    intro:
      "University lecturer and historian of Bengal with peer-reviewed publications in historiography, Bangladesh studies, and intellectual history. Dedicated to connecting archival inquiry, classroom teaching, and interdisciplinary research.",
    buttons: {
      publicationLabel: "View Publications",
      publicationLink: "#",
      cvLabel: "Download CV",
      cvLink: "#"
    },
    socials: {
      email: "nurnabi@example.com",
      linkedin: "https://www.linkedin.com/",
      scholar: "https://scholar.google.com/",
      researchGate: "https://www.researchgate.net/"
    },
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80"
  };

  function sanitize(value, fallback) {
    return typeof value === "string" && value.trim() ? value.trim() : fallback;
  }

  function normalizeData(raw) {
    const source = raw && typeof raw === "object" ? raw : {};

    return {
      name: sanitize(source.name, defaultData.name),
      title: sanitize(source.title, defaultData.title),
      location: sanitize(source.location, defaultData.location),
      tagline: sanitize(source.tagline, defaultData.tagline),
      dynamicLine: sanitize(source.dynamicLine, defaultData.dynamicLine),
      intro: sanitize(source.intro, defaultData.intro),
      buttons: {
        publicationLabel: sanitize(source.buttons?.publicationLabel, defaultData.buttons.publicationLabel),
        publicationLink: sanitize(source.buttons?.publicationLink, defaultData.buttons.publicationLink),
        cvLabel: sanitize(source.buttons?.cvLabel, defaultData.buttons.cvLabel),
        cvLink: sanitize(source.buttons?.cvLink, defaultData.buttons.cvLink)
      },
      socials: {
        email: sanitize(source.socials?.email, defaultData.socials.email),
        linkedin: sanitize(source.socials?.linkedin, defaultData.socials.linkedin),
        scholar: sanitize(source.socials?.scholar, defaultData.socials.scholar),
        researchGate: sanitize(source.socials?.researchGate, defaultData.socials.researchGate)
      },
      profileImage: sanitize(source.profileImage, defaultData.profileImage)
    };
  }

  function getData() {
    try {
      const fromStorage = localStorage.getItem(STORAGE_KEY);
      if (!fromStorage) {
        return { ...defaultData, buttons: { ...defaultData.buttons }, socials: { ...defaultData.socials } };
      }
      return normalizeData(JSON.parse(fromStorage));
    } catch (error) {
      return { ...defaultData, buttons: { ...defaultData.buttons }, socials: { ...defaultData.socials } };
    }
  }

  function setData(data) {
    const normalized = normalizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    return normalized;
  }

  function resetData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return getData();
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