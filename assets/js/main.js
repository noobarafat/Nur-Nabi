(function () {
  const store = window.PortfolioStore;
  if (!store) return;

  const elements = {
    name: document.getElementById("hero-name"),
    title: document.getElementById("hero-title"),
    location: document.getElementById("hero-location"),
    tagline: document.getElementById("hero-tagline"),
    intro: document.getElementById("hero-intro"),
    dynamicLine: document.getElementById("dynamic-line"),
    publicationsBtn: document.getElementById("btn-publications"),
    cvBtn: document.getElementById("btn-cv"),
    socialEmail: document.getElementById("social-email"),
    socialLinkedIn: document.getElementById("social-linkedin"),
    socialScholar: document.getElementById("social-scholar"),
    socialResearchGate: document.getElementById("social-researchgate"),
    profileImage: document.getElementById("profile-image")
  };

  function ensureLink(url) {
    if (!url || url === "#") return "#";
    return url;
  }

  function render(data) {
    elements.name.textContent = data.name;
    elements.title.textContent = data.title;
    elements.location.textContent = data.location;
    elements.tagline.textContent = data.tagline;
    elements.intro.textContent = data.intro;

    elements.publicationsBtn.textContent = data.buttons.publicationLabel;
    elements.publicationsBtn.href = ensureLink(data.buttons.publicationLink);

    elements.cvBtn.textContent = data.buttons.cvLabel;
    elements.cvBtn.href = ensureLink(data.buttons.cvLink);

    elements.socialEmail.href = `mailto:${data.socials.email}`;
    elements.socialLinkedIn.href = ensureLink(data.socials.linkedin);
    elements.socialScholar.href = ensureLink(data.socials.scholar);
    elements.socialResearchGate.href = ensureLink(data.socials.researchGate);

    elements.profileImage.src = data.profileImage;
    elements.profileImage.alt = `Portrait of ${data.name}`;

    startTyping(data.dynamicLine);
  }

  let typingTimer = null;

  function startTyping(text) {
    if (typingTimer) clearInterval(typingTimer);

    const content = text || "";
    let index = 0;
    elements.dynamicLine.textContent = "";

    typingTimer = setInterval(() => {
      if (index <= content.length) {
        elements.dynamicLine.textContent = content.slice(0, index);
        index += 1;
      } else {
        clearInterval(typingTimer);
        setTimeout(() => startTyping(content), 2200);
      }
    }, 50);
  }

  render(store.getData());
})();