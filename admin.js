(function () {
  const store = window.PortfolioStore;
  if (!store) return;

  const AUTH_KEY = "nurnabi_admin_authenticated";
  const REQUIRED_PASSWORD = "1234";

  const loginView = document.getElementById("admin-login");
  const loginForm = document.getElementById("admin-login-form");
  const loginError = document.getElementById("admin-login-error");

  function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === "true";
  }

  if (!isAuthenticated()) {
    document.body.classList.add("is-locked");
    loginView?.classList.remove("is-hidden");

    loginForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const password = String(formData.get("password") || "").trim();

      if (password !== REQUIRED_PASSWORD) {
        if (loginError) loginError.textContent = "Incorrect password.";
        return;
      }

      sessionStorage.setItem(AUTH_KEY, "true");
      window.location.reload();
    });
    return;
  }

  document.body.classList.remove("is-locked");
  loginView?.classList.add("is-hidden");

  let state = store.deepClone(store.getData());

  const panelTitle = document.getElementById("panel-title");
  const toastEl = document.getElementById("status-toast");
  const navItems = Array.from(document.querySelectorAll(".admin-nav__item"));
  const panelEls = Array.from(document.querySelectorAll(".admin-panel"));

  const panelNames = {
    general: "General",
    hero: "Hero",
    about: "About",
    education: "Education",
    publications: "Publications",
    memberships: "Memberships",
    achievements: "Achievements",
    leadership: "Leadership & Interests",
    contact: "Contact",
    settings: "Settings"
  };

  const navOrder = ["home", "about", "education", "publications", "experience", "skills", "events", "contact"];

  const sectionResetMap = {
    general: "general",
    hero: "hero",
    about: "about",
    education: "education",
    publications: "publications",
    memberships: "memberships",
    achievements: "achievements",
    leadership: "leadershipInterests",
    contact: "contact"
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function showToast(message, isError = false) {
    toastEl.textContent = message;
    toastEl.style.borderColor = isError ? "rgba(180,80,96,0.65)" : "rgba(107,44,63,0.45)";
    toastEl.classList.add("is-visible");
    window.setTimeout(() => toastEl.classList.remove("is-visible"), 1800);
  }

  function confirmAction(message) {
    return window.confirm(message);
  }

  function activatePanel(target) {
    navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.target === target));
    panelEls.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === target));
    panelTitle.textContent = panelNames[target] || "Panel";
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => activatePanel(item.dataset.target));
  });

  function sectionActionsHTML(key) {
    return `
      <div class="inline-actions">
        <button class="btn btn--primary" data-save-section="${key}" type="button">Save ${panelNames[key]}</button>
        <button class="btn btn--ghost" data-reset-section="${key}" type="button">Reset ${panelNames[key]}</button>
      </div>
    `;
  }

  function makeField(label, key, value, type = "text", full = false) {
    if (type === "textarea") {
      return `
        <div class="field ${full ? "field--full" : ""}">
          <label>${label}</label>
          <textarea data-key="${key}">${escapeHtml(value)}</textarea>
        </div>
      `;
    }

    if (type === "checkbox") {
      return `
        <div class="field ${full ? "field--full" : ""}">
          <label>${label}</label>
          <select data-key="${key}">
            <option value="false" ${value ? "" : "selected"}>No</option>
            <option value="true" ${value ? "selected" : ""}>Yes</option>
          </select>
        </div>
      `;
    }

    return `
      <div class="field ${full ? "field--full" : ""}">
        <label>${label}</label>
        <input type="${type}" data-key="${key}" value="${escapeHtml(value)}" />
      </div>
    `;
  }

  function renderRepeatItems(items, schema, title) {
    return `
      <div class="repeat-list">
        ${!items.length ? `<p class="repeat-empty">No items yet. Add a new item to begin.</p>` : ""}
        ${items.map((item, index) => `
          <div class="repeat-item" data-index="${index}">
            <div class="repeat-item__header">
              <span class="repeat-item__title">${title} ${index + 1}</span>
              <div class="repeat-item__actions">
                <button type="button" data-action="up">↑</button>
                <button type="button" data-action="down">↓</button>
                <button type="button" data-action="delete">Delete</button>
              </div>
            </div>
            <div class="form-grid">
              ${schema.map((field) => makeField(field.label, field.key, item[field.key] ?? "", field.type || "text", field.full)).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  function hookRepeatEditor(wrapper, listRef, schema, emptyItemFactory, rerender) {
    wrapper.addEventListener("click", (event) => {
      const btn = event.target.closest("button[data-action]");
      if (!btn) return;
      const itemEl = btn.closest(".repeat-item");
      const index = Number(itemEl?.dataset.index ?? -1);
      if (index < 0) return;

      const action = btn.dataset.action;
      if (action === "delete") {
        listRef.splice(index, 1);
      } else if (action === "up" && index > 0) {
        [listRef[index - 1], listRef[index]] = [listRef[index], listRef[index - 1]];
      } else if (action === "down" && index < listRef.length - 1) {
        [listRef[index + 1], listRef[index]] = [listRef[index], listRef[index + 1]];
      }
      rerender();
    });

    wrapper.addEventListener("input", (event) => {
      const field = event.target.closest("[data-key]");
      if (!field) return;
      const itemEl = field.closest(".repeat-item");
      const index = Number(itemEl?.dataset.index ?? -1);
      const key = field.dataset.key;
      if (index < 0 || !key || !listRef[index]) return;
      listRef[index][key] = field.value;
    });

    const addBtn = wrapper.querySelector("[data-add-item]");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        listRef.push(emptyItemFactory());
        rerender();
      });
    }
  }

  function saveState(message) {
    state = store.setData(state);
    showToast(message || "Saved successfully");
  }

  function resetSection(sectionName) {
    const sectionLabel = panelNames[sectionName] || sectionName;
    if (!confirmAction(`Reset ${sectionLabel} to default content?`)) return;

    const sectionKey = sectionResetMap[sectionName] || sectionName;
    state[sectionKey] = store.deepClone(store.defaultData[sectionKey]);
    renderAllPanels();
    showToast(`${sectionLabel} reset`);
  }

  function panelByName(name) {
    return document.querySelector(`.admin-panel[data-panel="${name}"]`);
  }

  function bindSectionActions(panel, key) {
    panel.querySelector(`[data-save-section="${key}"]`)?.addEventListener("click", () => saveState(`${panelNames[key]} saved`));
    panel.querySelector(`[data-reset-section="${key}"]`)?.addEventListener("click", () => resetSection(key));
  }

  function renderGeneralPanel() {
    const panel = panelByName("general");
    const navFields = navOrder.map((key) => makeField(`Navbar: ${key}`, `nav-${key}`, state.general.navLabels[key] || "", "text", true)).join("");

    panel.innerHTML = `
      <div class="panel-group">
        <h3>Brand & Footer</h3>
        <div class="form-grid">
          ${makeField("Logo text", "logoText", state.general.logoText)}
          ${makeField("Footer text", "footerText", state.general.footerText, "text", true)}
        </div>
      </div>
      <div class="panel-group">
        <h3>Navbar Labels</h3>
        <div class="form-grid">${navFields}</div>
      </div>
      ${sectionActionsHTML("general")}
    `;

    panel.oninput = (event) => {
      const field = event.target.closest("[data-key]");
      if (!field) return;
      const key = field.dataset.key;
      if (key === "logoText") state.general.logoText = field.value;
      else if (key === "footerText") state.general.footerText = field.value;
      else if (key.startsWith("nav-")) state.general.navLabels[key.replace("nav-", "")] = field.value;
    };

    bindSectionActions(panel, "general");
  }

  function renderHeroPanel() {
    const panel = panelByName("hero");
    const dynamicItems = state.hero.dynamicItems.map((text) => ({ text }));

    function rerender() {
      panel.innerHTML = `
        <div class="panel-group">
          <h3>Hero Content</h3>
          <div class="form-grid">
            ${makeField("Location", "location", state.hero.location)}
            ${makeField("Name", "name", state.hero.name)}
            ${makeField("Title", "title", state.hero.title, "text", true)}
            ${makeField("Research line", "researchLine", state.hero.researchLine, "text", true)}
            ${makeField("Short intro", "intro", state.hero.intro, "textarea", true)}
            ${makeField("Profile image path", "profileImagePath", state.hero.profileImagePath, "text", true)}
          </div>
        </div>

        <div class="panel-group">
          <h3>Buttons & Links</h3>
          <div class="form-grid">
            ${makeField("Primary button text", "primaryText", state.hero.buttons.primaryText)}
            ${makeField("Primary button link", "primaryLink", state.hero.buttons.primaryLink)}
            ${makeField("Secondary button text", "secondaryText", state.hero.buttons.secondaryText)}
            ${makeField("Secondary button link", "secondaryLink", state.hero.buttons.secondaryLink)}
          </div>
        </div>

        <div class="panel-group">
          <h3>Social links</h3>
          <div class="form-grid">
            ${makeField("Email", "email", state.hero.socials.email)}
            ${makeField("LinkedIn", "linkedin", state.hero.socials.linkedin)}
            ${makeField("Google Scholar", "scholar", state.hero.socials.scholar)}
            ${makeField("ResearchGate", "researchGate", state.hero.socials.researchGate)}
          </div>
        </div>

        <div class="panel-group" id="hero-dynamic-wrapper">
          <h3>Dynamic text items</h3>
          ${renderRepeatItems(dynamicItems, [{ key: "text", label: "Text", full: true }], "Item")}
          <div class="inline-actions">
            <button class="btn btn--ghost" type="button" data-add-item>Add Dynamic Item</button>
          </div>
        </div>

        ${sectionActionsHTML("hero")}
      `;

      const wrapper = panel.querySelector("#hero-dynamic-wrapper");
      hookRepeatEditor(wrapper, dynamicItems, [{ key: "text", label: "Text", full: true }], () => ({ text: "" }), rerender);

      panel.querySelectorAll("[data-key]").forEach((field) => {
        if (field.closest(".repeat-item")) return;
        field.addEventListener("input", () => {
          const key = field.dataset.key;
          if (key in state.hero) state.hero[key] = field.value;
          if (key in state.hero.buttons) state.hero.buttons[key] = field.value;
          if (key in state.hero.socials) state.hero.socials[key] = field.value;
        });
      });

      panel.querySelector(`[data-save-section="hero"]`)?.addEventListener("click", () => {
        state.hero.dynamicItems = dynamicItems.map((item) => item.text).filter(Boolean);
        saveState("Hero saved");
      });

      panel.querySelector(`[data-reset-section="hero"]`)?.addEventListener("click", () => resetSection("hero"));
    }

    rerender();
  }

  function renderRepeatSection(panelName, stateKey, title, schema, emptyFactory) {
    const panel = panelByName(panelName);
    const model = state[stateKey];

    function rerender() {
      panel.innerHTML = `
        <div class="panel-group">
          <h3>${title}</h3>
          <div class="form-grid">
            ${makeField("Section title", "sectionTitle", model.title, "text", true)}
            ${model.subtitle !== undefined ? makeField("Section subtitle", "sectionSubtitle", model.subtitle, "text", true) : ""}
          </div>
        </div>

        <div class="panel-group" id="${stateKey}-items-wrapper">
          <h3>Items</h3>
          ${renderRepeatItems(model.items, schema, "Item")}
          <div class="inline-actions">
            <button class="btn btn--ghost" type="button" data-add-item>Add Item</button>
          </div>
        </div>

        ${sectionActionsHTML(stateKey)}
      `;

      panel.querySelector("[data-key='sectionTitle']")?.addEventListener("input", (e) => {
        model.title = e.target.value;
      });

      panel.querySelector("[data-key='sectionSubtitle']")?.addEventListener("input", (e) => {
        model.subtitle = e.target.value;
      });

      hookRepeatEditor(panel.querySelector(`#${stateKey}-items-wrapper`), model.items, schema, emptyFactory, rerender);
      bindSectionActions(panel, stateKey);
    }

    rerender();
  }

  function renderEducationPanel() {
    renderRepeatSection("education", "education", "Education Section", [
      { key: "degree", label: "Degree" },
      { key: "department", label: "Department" },
      { key: "institution", label: "Institution", full: true },
      { key: "result", label: "Result" },
      { key: "highlight", label: "Highlight" },
      { key: "session", label: "Session" }
    ], () => ({ degree: "", department: "", institution: "", result: "", highlight: "", session: "" }));
  }

  function renderPublicationsPanel() {
    const panel = panelByName("publications");
    const model = state.publications;
    const schema = [
      { key: "type", label: "Type" },
      { key: "title", label: "Title", full: true },
      { key: "journalPublisher", label: "Journal / Publisher", full: true },
      { key: "year", label: "Year" },
      { key: "volume", label: "Volume" },
      { key: "issue", label: "Issue" },
      { key: "pages", label: "Pages" },
      { key: "status", label: "Status" },
      { key: "note", label: "Note", full: true },
      { key: "authors", label: "Authors", full: true },
      { key: "language", label: "Language" }
    ];

    function rerender() {
      panel.innerHTML = `
        <div class="panel-group">
          <h3>Publications Header</h3>
          <div class="form-grid">
            ${makeField("Section title", "title", model.title, "text", true)}
            ${makeField("Section subtitle", "subtitle", model.subtitle, "text", true)}
            ${makeField("Summary: Journal Articles", "summary-journal", model.summary.journalArticles)}
            ${makeField("Summary: Books", "summary-books", model.summary.books)}
          </div>
        </div>

        <div class="panel-group" id="publications-items-wrapper">
          <h3>Publication Items</h3>
          ${renderRepeatItems(model.items, schema, "Publication")}
          <div class="inline-actions"><button class="btn btn--ghost" type="button" data-add-item>Add Publication</button></div>
        </div>

        ${sectionActionsHTML("publications")}
      `;

      panel.querySelector("[data-key='title']")?.addEventListener("input", (e) => { model.title = e.target.value; });
      panel.querySelector("[data-key='subtitle']")?.addEventListener("input", (e) => { model.subtitle = e.target.value; });
      panel.querySelector("[data-key='summary-journal']")?.addEventListener("input", (e) => { model.summary.journalArticles = e.target.value; });
      panel.querySelector("[data-key='summary-books']")?.addEventListener("input", (e) => { model.summary.books = e.target.value; });

      hookRepeatEditor(panel.querySelector("#publications-items-wrapper"), model.items, schema, () => ({ type: "Journal Article", title: "", journalPublisher: "", year: "", volume: "", issue: "", pages: "", status: "", note: "", authors: "", language: "" }), rerender);
      bindSectionActions(panel, "publications");
    }

    rerender();
  }

  function renderAchievementsPanel() {
    const panel = panelByName("achievements");
    const model = state.achievements;
    const schema = [
      { key: "label", label: "Label" },
      { key: "title", label: "Title", full: true },
      { key: "program", label: "Program", full: true },
      { key: "institution", label: "Institution", full: true },
      { key: "featured", label: "Featured", type: "checkbox" }
    ];

    function rerender() {
      panel.innerHTML = `
        <div class="panel-group">
          <h3>Achievements Header</h3>
          <div class="form-grid">
            ${makeField("Section title", "title", model.title, "text", true)}
            ${makeField("Section subtitle", "subtitle", model.subtitle, "text", true)}
            ${makeField("Summary: Memberships", "summary-memberships", model.summary.memberships)}
            ${makeField("Summary: Certificates", "summary-certificates", model.summary.certificates)}
          </div>
        </div>

        <div class="panel-group" id="achievements-items-wrapper">
          <h3>Achievements & Certificates</h3>
          ${renderRepeatItems(model.items, schema, "Achievement")}
          <div class="inline-actions"><button class="btn btn--ghost" type="button" data-add-item>Add Item</button></div>
        </div>

        ${sectionActionsHTML("achievements")}
      `;

      panel.querySelector("[data-key='title']")?.addEventListener("input", (e) => { model.title = e.target.value; });
      panel.querySelector("[data-key='subtitle']")?.addEventListener("input", (e) => { model.subtitle = e.target.value; });
      panel.querySelector("[data-key='summary-memberships']")?.addEventListener("input", (e) => { model.summary.memberships = e.target.value; });
      panel.querySelector("[data-key='summary-certificates']")?.addEventListener("input", (e) => { model.summary.certificates = e.target.value; });

      hookRepeatEditor(panel.querySelector("#achievements-items-wrapper"), model.items, schema, () => ({ label: "Certificate", title: "", program: "", institution: "", featured: false }), rerender);
      bindSectionActions(panel, "achievements");
    }

    rerender();
  }

  function renderLeadershipPanel() {
    const panel = panelByName("leadership");
    const model = state.leadershipInterests;
    const leadershipSchema = [
      { key: "category", label: "Category" },
      { key: "text", label: "Text", full: true }
    ];
    const interestsAsItems = model.interests.map((value) => ({ value }));

    function rerender() {
      panel.innerHTML = `
        <div class="panel-group">
          <h3>Leadership & Interests Header</h3>
          <div class="form-grid">
            ${makeField("Section title", "title", model.title, "text", true)}
            ${makeField("Leadership column title", "leadershipTitle", model.leadershipTitle)}
            ${makeField("Interests column title", "interestsTitle", model.interestsTitle)}
          </div>
        </div>

        <div class="panel-group" id="leadership-items-wrapper">
          <h3>Leadership, Scholarships, Awards & Activities</h3>
          ${renderRepeatItems(model.items, leadershipSchema, "Entry")}
          <div class="inline-actions"><button class="btn btn--ghost" type="button" data-add-item>Add Entry</button></div>
        </div>

        <div class="panel-group" id="interests-items-wrapper">
          <h3>Interest Tags</h3>
          ${renderRepeatItems(interestsAsItems, [{ key: "value", label: "Interest", full: true }], "Tag")}
          <div class="inline-actions"><button class="btn btn--ghost" type="button" data-add-item>Add Interest</button></div>
        </div>

        ${sectionActionsHTML("leadership")}
      `;

      panel.querySelector("[data-key='title']")?.addEventListener("input", (e) => { model.title = e.target.value; });
      panel.querySelector("[data-key='leadershipTitle']")?.addEventListener("input", (e) => { model.leadershipTitle = e.target.value; });
      panel.querySelector("[data-key='interestsTitle']")?.addEventListener("input", (e) => { model.interestsTitle = e.target.value; });

      hookRepeatEditor(panel.querySelector("#leadership-items-wrapper"), model.items, leadershipSchema, () => ({ category: "Leadership", text: "" }), rerender);
      hookRepeatEditor(panel.querySelector("#interests-items-wrapper"), interestsAsItems, [{ key: "value", label: "Interest", full: true }], () => ({ value: "" }), rerender);

      panel.querySelector(`[data-save-section="leadership"]`)?.addEventListener("click", () => {
        model.interests = interestsAsItems.map((item) => item.value).filter(Boolean);
        saveState("Leadership & Interests saved");
      });
      panel.querySelector(`[data-reset-section="leadership"]`)?.addEventListener("click", () => resetSection("leadership"));
    }

    rerender();
  }

  function renderContactPanel() {
    const panel = panelByName("contact");
    const details = state.contact.details;

    panel.innerHTML = `
      <div class="panel-group">
        <h3>Contact Header</h3>
        <div class="form-grid">
          ${makeField("Section title", "title", state.contact.title)}
          ${makeField("Section subtitle", "subtitle", state.contact.subtitle)}
          ${makeField("Intro heading", "intro", state.contact.intro, "textarea", true)}
          ${makeField("Form heading", "formHeading", state.contact.formHeading)}
        </div>
      </div>

      <div class="panel-group">
        <h3>Contact Details</h3>
        <div class="form-grid">
          ${makeField("Email", "email", details.email)}
          ${makeField("Phone", "phone", details.phone)}
          ${makeField("Location", "location", details.location)}
          ${makeField("LinkedIn", "linkedin", details.linkedin)}
          ${makeField("Google Scholar", "scholar", details.scholar)}
          ${makeField("ResearchGate", "researchgate", details.researchgate)}
        </div>
      </div>

      ${sectionActionsHTML("contact")}
    `;

    panel.querySelectorAll("[data-key]").forEach((field) => {
      field.addEventListener("input", () => {
        const key = field.dataset.key;
        if (["title", "subtitle", "intro", "formHeading"].includes(key)) {
          state.contact[key] = field.value;
        } else {
          state.contact.details[key] = field.value;
        }
      });
    });

    bindSectionActions(panel, "contact");
  }

  function renderSettingsPanel() {
    const panel = panelByName("settings");
    const quickResetButtons = Object.keys(sectionResetMap).map((key) => `
      <button class="btn btn--ghost" type="button" data-quick-reset="${key}">Reset ${panelNames[key]}</button>
    `).join("");

    panel.innerHTML = `
      <div class="panel-group">
        <h3>Data Management</h3>
        <p class="settings-note">Reset individual sections from their own panel, use quick resets below, or restore all default content at once.</p>
        <div class="inline-actions">${quickResetButtons}</div>
        <div class="inline-actions">
          <button class="btn btn--primary" type="button" id="reset-all-data">Reset All Content</button>
          <button class="btn btn--ghost" type="button" id="clear-legacy-data">Clear Legacy Key</button>
        </div>
      </div>
    `;

    panel.querySelectorAll("[data-quick-reset]").forEach((button) => {
      button.addEventListener("click", () => resetSection(button.dataset.quickReset));
    });

    panel.querySelector("#reset-all-data")?.addEventListener("click", () => {
      if (!confirmAction("Reset all portfolio data to defaults?")) return;
      state = store.resetData();
      renderAllPanels();
      showToast("All content reset to defaults");
    });

    panel.querySelector("#clear-legacy-data")?.addEventListener("click", () => {
      localStorage.removeItem(store.LEGACY_KEY);
      showToast("Legacy storage key cleared");
    });
  }

  function renderAllPanels() {
    renderGeneralPanel();
    renderHeroPanel();
    renderRepeatSection("about", "about", "About / Experience Cards", [
      { key: "title", label: "Title" },
      { key: "subtitle", label: "Subtitle", full: true },
      { key: "date", label: "Date" },
      { key: "description", label: "Description", full: true }
    ], () => ({ title: "", subtitle: "", date: "", description: "" }));
    renderEducationPanel();
    renderPublicationsPanel();
    renderRepeatSection("memberships", "memberships", "Membership Entries", [
      { key: "label", label: "Label" },
      { key: "title", label: "Title" },
      { key: "organization", label: "Organization", full: true }
    ], () => ({ label: "Membership", title: "", organization: "" }));
    renderAchievementsPanel();
    renderLeadershipPanel();
    renderContactPanel();
    renderSettingsPanel();
  }

  renderAllPanels();
  activatePanel("general");

  window.addEventListener("portfolioUpdated", (event) => {
    state = store.deepClone(event.detail || store.getData());
    renderAllPanels();
  });
})();
