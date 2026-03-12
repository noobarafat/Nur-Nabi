(function () {
  const STORAGE_KEY = "nurnabi_portfolio_v2";
  const LEGACY_KEY = "nurnabi_portfolio";

  const defaultData = {
    general: {
      logoText: "nur nabi.",
      navLabels: {
        home: "Home",
        about: "About",
        education: "Education",
        publications: "Publications",
        experience: "Leadership",
        skills: "Memberships",
        events: "Achievements",
        contact: "Contact"
      },
      footerText: "© 2026 Md. Nur Nabi. All rights reserved."
    },
    hero: {
      location: "CHITTAGONG, BANGLADESH",
      name: "Md. Nur Nabi",
      title: "Lecturer, Department of Bangladesh Studies, University of Chittagong",
      researchLine: "Researcher in Bengal's History",
      dynamicItems: [
        "Socio-cultural History",
        "Political History",
        "Intellectual History",
        "Historiography"
      ],
      intro: "Historian, lecturer, and researcher focused on Bengal's socio-cultural, political, and intellectual history.",
      buttons: {
        primaryText: "Publications",
        primaryLink: "#publications",
        secondaryText: "Download CV",
        secondaryLink: "#contact"
      },
      socials: {
        email: "nurnabi.bs@cu.ac.bd",
        linkedin: "https://linkedin.com/in/yourprofile",
        scholar: "https://scholar.google.com/",
        researchGate: "https://researchgate.net/"
      },
      profileImagePath: "assets/photos/profile.png"
    },
    about: {
      title: "About Nur Nabi",
      items: [
        {
          title: "Lecturer",
          subtitle: "Department of Bangladesh Studies, University of Chittagong",
          date: "05/10/2025 – Present",
          description: "Teaching and research in Bangladesh Studies with a focus on academic scholarship, critical inquiry, and higher education."
        },
        {
          title: "House Tutor",
          subtitle: "Bijoy 24 Hall, University of Chittagong",
          date: "12/09/2025 – Present",
          description: "Supporting residential student engagement, academic discipline, and campus mentoring within the university hall environment."
        },
        {
          title: "Head of Department",
          subtitle: "Islamic History and Culture, Ideal College, Dhanmondi, Dhaka",
          date: "12/09/2019 – 30/06/2025",
          description: "Led departmental academic planning, faculty coordination, student mentoring, and institutional responsibilities."
        },
        {
          title: "Lecturer",
          subtitle: "Department of Islamic History and Culture, Ideal College, Dhanmondi, Dhaka",
          date: "01/08/2019 – 04/10/2025",
          description: "Delivered lectures and guided students through historical studies, analytical thinking, and subject-based learning."
        },
        {
          title: "Moderator",
          subtitle: "Ideal College Debating Club, Ideal College, Dhanmondi, Dhaka",
          date: "08/02/2020 – 04/10/2025",
          description: "Mentored debate activities, student leadership, public speaking, and intellectual engagement beyond the classroom."
        }
      ]
    },
    education: {
      title: "Education",
      items: [
        {
          degree: "Master of Arts",
          department: "Department of Islamic History and Culture",
          institution: "University of Dhaka",
          result: "CGPA: 3.94 / 4.00",
          highlight: "Highest score of the Department till today",
          session: "2013–2014"
        },
        {
          degree: "Bachelor of Arts",
          department: "Department of Islamic History and Culture",
          institution: "University of Dhaka",
          result: "CGPA: 3.68 / 4.00",
          highlight: "2nd Highest score of the year",
          session: "2009–2010"
        }
      ]
    },
    publications: {
      title: "Publications",
      subtitle: "Research Articles & Books",
      summary: {
        journalArticles: "5",
        books: "3"
      },
      items: [
        {
          type: "Journal Article",
          title: "Analysis of the Character of the Faraizi Movement in Bengal",
          journalPublisher: "Itihas, Journal of Bangladesh Itihas Parishad",
          year: "2017",
          volume: "50",
          issue: "",
          pages: "49–57",
          status: "",
          note: "",
          authors: "",
          language: "In Bangla"
        },
        {
          type: "Journal Article",
          title: "The Evolution of Bengali Nationalism and the Formation of an Ethno-based Nation-State",
          journalPublisher: "Journal of Sociology, University of Dhaka",
          year: "2019",
          volume: "10",
          issue: "2",
          pages: "83–94",
          status: "",
          note: "",
          authors: "",
          language: "In Bangla"
        },
        {
          type: "Journal Article",
          title: "The Progressive Movement and the Muslim Literary Society in 1930s Dhaka: A Review",
          journalPublisher: "Itihas, Journal of Bangladesh Itihas Parishad",
          year: "2024",
          volume: "55",
          issue: "",
          pages: "145–156",
          status: "",
          note: "",
          authors: "",
          language: "In Bangla"
        },
        {
          type: "Accepted Article",
          title: "The University of Dhaka in the 1962 Student Movement: An Analysis of Its Nature",
          journalPublisher: "Itihas, Journal of Bangladesh Itihas Parishad",
          year: "",
          volume: "",
          issue: "",
          pages: "",
          status: "Accepted for publishing",
          note: "",
          authors: "",
          language: "In Bangla"
        },
        {
          type: "Submitted Article",
          title: "Exploring the Nature of Historiography in Colonial Bengal: A Review of Charles Stewart’s History of Bengal",
          journalPublisher: "The Chittagong University Journal of Arts and Humanities",
          year: "",
          volume: "",
          issue: "",
          pages: "",
          status: "Submitted",
          note: "",
          authors: "",
          language: "In Bangla"
        },
        {
          type: "Book",
          title: "Gopalpur Genocide",
          journalPublisher: "Centre for Research on Genocide, Torture and the Liberation War, 1971: Genocide–Torture Archive and Museum Trust, Khulna",
          year: "2017",
          volume: "",
          issue: "",
          pages: "",
          status: "",
          note: "",
          authors: "",
          language: ""
        },
        {
          type: "Book",
          title: "Bangabandhu and the Emergence of the Bengali Nation-State",
          journalPublisher: "Tamralipi",
          year: "2020",
          volume: "",
          issue: "",
          pages: "",
          status: "",
          note: "Included in the Bangabandhu Birth Centenary Book Series",
          authors: "",
          language: ""
        },
        {
          type: "Book",
          title: "Bangabandhu against Corruption: Speeches and Statements",
          journalPublisher: "Tamralipi",
          year: "2022",
          volume: "",
          issue: "",
          pages: "",
          status: "",
          note: "",
          authors: "Abdul Bashir and Md. Nur Nabi",
          language: ""
        }
      ]
    },
    memberships: {
      title: "Memberships",
      subtitle: "Academic & Professional Affiliations",
      items: [
        {
          label: "Membership",
          title: "Life Member",
          organization: "Bangladesh Itihas Parishad"
        },
        {
          label: "Membership",
          title: "Member",
          organization: "Islamic History and Culture Alumni Association, University of Dhaka"
        },
        {
          label: "Membership",
          title: "Member",
          organization: "Surjasen Hall Alumni Association, University of Dhaka"
        }
      ]
    },
    achievements: {
      title: "Achievements & Certifications",
      subtitle: "Recognition, Training & Academic Distinction",
      summary: {
        memberships: "3",
        certificates: "7"
      },
      items: [
        {
          label: "Achievement",
          title: "Dean’s Certificate of Merit",
          program: "",
          institution: "Faculty of Arts, University of Dhaka",
          featured: true
        },
        {
          label: "Certificate",
          title: "Certificate of Training Research",
          program: "",
          institution: "Center for Advanced Research in Arts and Social Sciences (CARASS), University of Dhaka",
          featured: false
        },
        {
          label: "Certificate",
          title: "Certificate of Attendance",
          program: "",
          institution: "Center for Research on Bangladesh Liberation War (CRBL)",
          featured: false
        },
        {
          label: "Certificate",
          title: "Certificate of Completion",
          program: "ICT Education in Secondary & Higher Secondary Level Project (Phase-II)",
          institution: "Ministry of Education, Government of the People’s Republic of Bangladesh",
          featured: false
        },
        {
          label: "Certificate",
          title: "Certificate for Successfully Participating a Workshop",
          program: "",
          institution: "National Academy for Planning and Development (NAPD), Ministry of Planning, Government of the People’s Republic of Bangladesh",
          featured: false
        },
        {
          label: "Certificate",
          title: "Certificate of Quantum Study",
          program: "Quantum Method Course for Mind Development and Self Improvement",
          institution: "Yoga Foundation, Dhaka",
          featured: false
        },
        {
          label: "Certificate",
          title: "Certificate of Participation",
          program: "Online HWPL Peace Education Training",
          institution: "HWPL",
          featured: false
        }
      ]
    },
    leadershipInterests: {
      title: "Leadership & Interests",
      leadershipTitle: "Leadership & Activities",
      interestsTitle: "Areas of Interest",
      items: [
        { category: "Leadership", text: "Former Vice-President, Surja Sen Bitarko Dhara" },
        { category: "Leadership", text: "Former Debater, Dhaka University Debating Society" },
        { category: "Leadership", text: "Former President, Surja Sen Hall Association of IHC" },
        { category: "Scholarship", text: "DU IHC Alumni Association Scholarship, 2017" },
        { category: "Scholarship", text: "National Professor Dr. Sufia Ahmed Scholarship, 2016" },
        { category: "Scholarship", text: "Professor A K M Abdul Alim Scholarship, 2016" },
        { category: "Achievement", text: "1st Runner-up — Shahid Rumi Smriti Inter-University Debate Competition, 2014" },
        { category: "Achievement", text: "Champion — Essay Competition 2014, Surja Sen Hall" },
        { category: "Academic Role", text: "Judge — BFDF 4th National Debate Fest, University of Rajshahi" },
        { category: "Participation", text: "Participant — 4th National Debate Competition, 2010" }
      ],
      interests: [
        "Religion & Ethics",
        "Education in Bangladesh",
        "Socio-cultural History of Bangladesh",
        "Politics and Governance",
        "Human Rights",
        "Historiography (South Asia)",
        "History of Education in Bengal",
        "Bangladesh Studies"
      ]
    },
    contact: {
      title: "Contact",
      subtitle: "Get in Touch",
      intro: "Open to academic collaboration, research discussion, and professional communication.",
      formHeading: "Inquiry Form",
      details: {
        email: "your@email.com",
        phone: "+8801XXXXXXXXX",
        location: "Chittagong, Bangladesh",
        linkedin: "linkedin.com/in/yourprofile",
        scholar: "scholar profile link",
        researchgate: "researchgate profile link"
      }
    }
  };

  function deepClone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function mergeDefaults(target, defaults) {
    if (Array.isArray(defaults)) {
      return Array.isArray(target) ? target : deepClone(defaults);
    }
    if (!defaults || typeof defaults !== "object") {
      return target ?? defaults;
    }

    const result = {};
    Object.keys(defaults).forEach((key) => {
      result[key] = mergeDefaults(target?.[key], defaults[key]);
    });
    return result;
  }

  function normalizeData(raw) {
    return mergeDefaults(raw, defaultData);
  }

  function getData() {
    try {
      const current = localStorage.getItem(STORAGE_KEY);
      if (current) return normalizeData(JSON.parse(current));

      const legacy = localStorage.getItem(LEGACY_KEY);
      if (legacy) {
        const migrated = normalizeData(JSON.parse(legacy));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }

      return deepClone(defaultData);
    } catch {
      return deepClone(defaultData);
    }
  }

  function setData(data) {
    const normalized = normalizeData(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
    window.dispatchEvent(new CustomEvent("portfolioUpdated", { detail: normalized }));
    return normalized;
  }

  function resetData() {
    localStorage.removeItem(STORAGE_KEY);
    const defaults = deepClone(defaultData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaults));
    window.dispatchEvent(new CustomEvent("portfolioUpdated", { detail: defaults }));
    return defaults;
  }

  window.PortfolioStore = {
    STORAGE_KEY,
    LEGACY_KEY,
    defaultData,
    getData,
    setData,
    resetData,
    normalizeData,
    deepClone
  };
})();
