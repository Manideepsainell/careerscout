const categorizeRole = (title = "") => {
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
    hrKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "HR";
  }

  // SALES
  if (
    salesKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "SALES";
  }

  // MARKETING
  if (
    marketingKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "MARKETING";
  }

  // PRODUCT
  if (
    productKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "PRODUCT";
  }

  // AI / ML
  if (
    aiKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "AI_ML";
  }

  // SECURITY
  if (
    securityKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "SECURITY";
  }

  // DEVOPS
  if (
    devopsKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "DEVOPS";
  }

  // DATA ENGINEERING
  if (
    dataKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "DATA_ENGINEERING";
  }

  // EMBEDDED / VLSI
  if (
    embeddedKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "EMBEDDED";
  }

  // HARDWARE
  if (
    hardwareKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "HARDWARE";
  }

  // QA
  if (
    qaKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "QA";
  }

  // MOBILE
  if (
    mobileKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "MOBILE";
  }

  // FRONTEND
  if (
    frontendKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "FRONTEND";
  }

  // FULLSTACK
  if (
    fullStackKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "FULLSTACK";
  }

  // BACKEND
  if (
    backendKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "BACKEND";
  }

  // GENERAL SOFTWARE
  if (
    generalSoftwareKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "GENERAL_SOFTWARE";
  }

  return "OTHER";
};

export default categorizeRole;