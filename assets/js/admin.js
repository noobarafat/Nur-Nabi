(function () {
  const store = window.PortfolioStore;
  const form = document.getElementById("admin-form");
  const saveStatus = document.getElementById("save-status");
  const resetDefaultsBtn = document.getElementById("btn-reset-defaults");

  // Field Mapping: formId -> data path
  const fieldMap = {
    "input-navbar-logo": "navbar.logo",
    "input-hero-location": "hero.location",
    "input-hero-name": "hero.name",
    "input-hero-title": "hero.title",
    "input-hero-mainline": "hero.mainLine",
    "input-hero-dynamic-items": "hero.dynamicItems",
    "input-hero-description": "hero.description",
    "input-btn-publications-label": "hero.buttons.publications.label",
    "input-btn-publications-link": "hero.buttons.publications.link",
    "input-btn-cv-label": "hero.buttons.cv.label",
    "input-btn-cv-link": "hero.buttons.cv.link",
    "input-hero-profile-image": "hero.profileImage",
    "input-social-email": "hero.socials.email",
    "input-social-linkedin": "hero.socials.linkedin",
    "input-social-scholar": "hero.socials.scholar",
    "input-social-researchgate": "hero.socials.researchGate",
    "input-section-about": "sections.about",
    "input-section-education": "sections.education",
    "input-section-publications": "sections.publications",
    "input-section-experience": "sections.experience",
    "input-section-skills": "sections.skills",
    "input-section-events": "sections.events",
    "input-section-contact": "sections.contact"
  };

  // Helper: Get nested value from object
  function getNestedValue(obj, path) {
    return path.split(".").reduce((current, prop) => current?.[prop], obj);
  }

  // Helper: Set nested value in object
  function setNestedValue(obj, path, value) {
    const parts = path.split(".");
    let current = obj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }

  // Fill form with data
  function fillForm(data) {
    Object.entries(fieldMap).forEach(([fieldId, path]) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      let value = getNestedValue(data, path);

      if (fieldId === "input-hero-dynamic-items" && Array.isArray(value)) {
        field.value = value.join("\n");
      } else {
        field.value = value || "";
      }
    });
  }

  // Get form data
  function getFormData() {
    const data = store.getData();
    const formData = JSON.parse(JSON.stringify(data));

    Object.entries(fieldMap).forEach(([fieldId, path]) => {
      const field = document.getElementById(fieldId);
      if (!field) return;

      let value = field.value || "";

      if (fieldId === "input-hero-dynamic-items") {
        value = value.split("\n").map(s => s.trim()).filter(s => s);
      }

      setNestedValue(formData, path, value);
    });

    return formData;
  }

  // Show status message
  function showStatus(message, isError = false) {
    saveStatus.textContent = message;
    saveStatus.className = `admin__status ${isError ? "admin__status--error" : "admin__status--success"}`;
    setTimeout(() => {
      saveStatus.textContent = "";
      saveStatus.className = "admin__status";
    }, 3000);
  }

  // Debounce auto-save
  let saveTimeout;
  function autoSaveOnChange() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const formData = getFormData();
      store.setData(formData);
      showStatus("? Auto-saved");
    }, 1000);
  }

  // Handle form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    try {
      const formData = getFormData();
      store.setData(formData);
      showStatus("? Portfolio updated successfully!");
    } catch (error) {
      showStatus("? Error saving: " + error.message, true);
    }
  });

  // Handle reset to defaults
  resetDefaultsBtn.addEventListener("click", () => {
    if (confirm("This will restore all portfolio content to default values. Continue?")) {
      store.resetData();
      fillForm(store.getData());
      showStatus("? Defaults restored");
    }
  });

  // Auto-save on input/textarea change
  document.querySelectorAll(".form-input, .form-textarea").forEach(field => {
    field.addEventListener("input", autoSaveOnChange);
  });

  // Initial load
  fillForm(store.getData());

  // Listen for external updates (cross-tab)
  window.addEventListener("portfolioUpdated", (event) => {
    fillForm(event.detail);
    showStatus("? Portfolio updated");
  });
})();
