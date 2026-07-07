// Multi-word or punctuated keywords (e.g. "node.js", "full-stack",
// "machine learning") are safe to match as plain substrings - they're
// specific enough that false collisions are very unlikely.
// Single-word keywords need word-boundary matching instead, otherwise
// short ones collide with ordinary English words - e.g. "soc" matches
// inside "associate", and "ios" matches inside "scenarios"/"studios"/
// "ratios", silently miscategorizing completely unrelated jobs.
const hasKeyword = (text, keyword) => {
  if (/[\s.\-]/.test(keyword)) {
    return text.includes(keyword);
  }

  const escaped = keyword.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );

  return new RegExp(`\\b${escaped}\\b`).test(text);
};

const categorizeRole = (title = "", description = "") => {
  const normalizedTitle =
    title.toLowerCase();

  const hrKeywords = [
    "human resources",
    "hr",
    "recruiter",
    "talent acquisition",
  ];

  const salesKeywords = [
    "sales",
    "account manager",
    "business development",
    "customer success",
  ];

  const marketingKeywords = [
    "marketing",
    "content strategist",
    "events marketing",
    "campaign",
  ];

  const productKeywords = [
    "product manager",
    "product owner",
  ];

  const aiKeywords = [
    "machine learning",
    "ml engineer",
    "ml developer",
    "ai engineer",
    "artificial intelligence",
    "genai",
    "generative ai",
    "llm",
    "large language model",
    "computer vision",
    "nlp",
    "deep learning",
    "data scientist",
    "applied scientist",
  ];

  const securityKeywords = [
    "security",
    "cybersecurity",
    "application security",
    "cloud security",
    "security engineer",
    "offensive security",
  ];

  const devopsKeywords = [
    "devops",
    "sre",
    "site reliability",
    "reliability engineer",
    "platform engineer",
    "cloud engineer",
    "cloud engineering",
  ];

  const dataKeywords = [
    "data engineer",
    "data engineering",
    "analytics engineer",
    "big data",
    "etl",
    "spark",
    "hadoop",
    "data platform",
    "data warehouse",
  ];

  const embeddedKeywords = [
    "embedded",
    "firmware",
    "rtos",
    "kernel",
    "device driver",
    "bootloader",

    "asic",
    "fpga",
    "rtl",
    "soc",
    "vlsi",
    "eda",

    "physical design",
    "design verification",
    "verification",
    "dv engineer",
    "logic design",
    "mask",
  ];

  const hardwareKeywords = [
    "semiconductor",
    "silicon",
    "nand",
    "dram",
    "ddr",
    "hbm",
    "pcb",
    "electronics",
    "electrical engineer",
    "manufacturing engineer",
    "process engineer",
    "equipment engineer",
    "assembly",
    "packaging",
    "technology node",
    "wafer",
  ];

  const qaKeywords = [
    "qa",
    "quality assurance",
    "quality engineer",
    "automation engineer",
    "test engineer",
    "sdet",
    "software test",
  ];

  const mobileKeywords = [
    "android",
    "ios",
    "iphone",
    "swift",
    "swiftui",
    "kotlin",
    "flutter",
    "react native",
    "mobile developer",
    "mobile engineer",
  ];

  const frontendKeywords = [
    "frontend",
    "front end",
    "front-end",
    "react",
    "angular",
    "vue",
    "next.js",
    "nextjs",
    "ui engineer",
    "ui developer",
    "web developer",
  ];

  const fullStackKeywords = [
    "full stack",
    "fullstack",
    "full-stack",
    "mern",
    "mean",
  ];

  const backendKeywords = [
    "backend",
    "back-end",

    "backend engineer",
    "backend developer",

    "node.js",
    "nodejs",
    "node js",
    "express",
    "nestjs",

    "golang",
    "go developer",
    "go engineer",

    "java developer",
    "java engineer",

    "spring",
    "spring boot",

    "python developer",
    "python engineer",

    "api developer",
    "server-side",
    "server engineer",

    "microservices",
    "distributed systems",
  ];

  const generalSoftwareKeywords = [
    "software engineer",
    "software developer",
    "software programmer",

    "associate software engineer",
    "associate engineer",

    "graduate engineer",
    "graduate engineer trainee",

    "application developer",
    "application engineer",

    "member technical staff",
    "member of technical staff",
    "mts",
    "amts",

    "engineer i",
    "engineer ii",
    "engineer iii",

    "developer i",
    "developer ii",
    "developer iii",

    "wordpress engineer",
  ];

  // HR
  if (
    hrKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "HR";
  }

  // SALES
  if (
    salesKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "SALES";
  }

  // MARKETING
  if (
    marketingKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "MARKETING";
  }

  // PRODUCT
  if (
    productKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "PRODUCT";
  }

  // AI / ML
  if (
    aiKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "AI_ML";
  }

  // SECURITY
  if (
    securityKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "SECURITY";
  }

  // DEVOPS
  if (
    devopsKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "DEVOPS";
  }

  // DATA ENGINEERING
  if (
    dataKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "DATA_ENGINEERING";
  }

  // EMBEDDED / VLSI
  if (
    embeddedKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "EMBEDDED";
  }

  // HARDWARE
  if (
    hardwareKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "HARDWARE";
  }

  // QA
  if (
    qaKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "QA";
  }

  // MOBILE
  if (
    mobileKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "MOBILE";
  }

  // FRONTEND
  if (
    frontendKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "FRONTEND";
  }

  // FULLSTACK
  if (
    fullStackKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "FULLSTACK";
  }

  // BACKEND
  if (
    backendKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "BACKEND";
  }

  // Title is generic ("Software Engineer", "Member of Technical Staff", etc.)
  // or matched nothing so far. Many real backend/fullstack/etc roles are
  // posted under exactly these generic titles, so fall back to scanning the
  // job description for the same technical signals before giving up.
  const normalizedDescription =
    (description || "").toLowerCase();

  if (normalizedDescription) {
    // AI / ML
    if (
      aiKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "AI_ML";
    }

    // DEVOPS
    if (
      devopsKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "DEVOPS";
    }

    // DATA ENGINEERING
    if (
      dataKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "DATA_ENGINEERING";
    }

    // MOBILE
    if (
      mobileKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "MOBILE";
    }

    // FRONTEND
    if (
      frontendKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "FRONTEND";
    }

    // FULLSTACK
    if (
      fullStackKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "FULLSTACK";
    }

    // BACKEND
    if (
      backendKeywords.some(keyword => hasKeyword(normalizedDescription, keyword)
      )
    ) {
      return "BACKEND";
    }
  }

  // GENERAL SOFTWARE
  if (
    generalSoftwareKeywords.some(keyword => hasKeyword(normalizedTitle, keyword)
    )
  ) {
    return "GENERAL_SOFTWARE";
  }

  return "OTHER";
};

export default categorizeRole;