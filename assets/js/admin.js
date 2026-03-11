(function () {
  const store = window.PortfolioStore;
  if (!store) return;

  const form = document.getElementById("admin-form");
  const resetButton = document.getElementById("reset-btn");
  const status = document.getElementById("status");

  const fields = {
    name: document.getElementById("name"),
    title: document.getElementById("title"),
    location: document.getElementById("location"),
    tagline: document.getElementById("tagline"),
    dynamicLine: document.getElementById("dynamicLine"),
    intro: document.getElementById("intro"),
    profileImage: document.getElementById("profileImage"),
    publicationLabel: document.getElementById("publicationLabel"),
    publicationLink: document.getElementById("publicationLink"),
    cvLabel: document.getElementById("cvLabel"),
    cvLink: document.getElementById("cvLink"),
    email: document.getElementById("email"),
    linkedin: document.getElementById("linkedin"),
    scholar: document.getElementById("scholar"),
    researchGate: document.getElementById("researchGate")
  };

  function fillForm(data) {
    fields.name.value = data.name;
    fields.title.value = data.title;
    fields.location.value = data.location;
    fields.tagline.value = data.tagline;
    fields.dynamicLine.value = data.dynamicLine;
    fields.intro.value = data.intro;
    fields.profileImage.value = data.profileImage;
    fields.publicationLabel.value = data.buttons.publicationLabel;
    fields.publicationLink.value = data.buttons.publicationLink === "#" ? "" : data.buttons.publicationLink;
    fields.cvLabel.value = data.buttons.cvLabel;
    fields.cvLink.value = data.buttons.cvLink === "#" ? "" : data.buttons.cvLink;
    fields.email.value = data.socials.email;
    fields.linkedin.value = data.socials.linkedin;
    fields.scholar.value = data.socials.scholar;
    fields.researchGate.value = data.socials.researchGate;
  }

  function showStatus(message) {
    status.textContent = message;
    window.setTimeout(() => {
      if (status.textContent === message) status.textContent = "";
    }, 2600);
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nextData = {
      name: fields.name.value,
      title: fields.title.value,
      location: fields.location.value,
      tagline: fields.tagline.value,
      dynamicLine: fields.dynamicLine.value,
      intro: fields.intro.value,
      profileImage: fields.profileImage.value,
      buttons: {
        publicationLabel: fields.publicationLabel.value,
        publicationLink: fields.publicationLink.value || "#",
        cvLabel: fields.cvLabel.value,
        cvLink: fields.cvLink.value || "#"
      },
      socials: {
        email: fields.email.value,
        linkedin: fields.linkedin.value || "#",
        scholar: fields.scholar.value || "#",
        researchGate: fields.researchGate.value || "#"
      }
    };

    store.setData(nextData);
    showStatus("Hero content saved successfully.");
  });

  resetButton.addEventListener("click", () => {
    const reset = store.resetData();
    fillForm(reset);
    showStatus("Default content restored.");
  });

  fillForm(store.getData());
})();