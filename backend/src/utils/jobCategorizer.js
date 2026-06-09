const categorizeRole = (title = "") => {
  const normalizedTitle = title.toLowerCase();

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

  const devopsKeywords = [
    "devops",
    "sre",
    "site reliability",
    "reliability engineer",
    "cloud engineering",
    "platform engineer",
  ];
const dataKeywords = [
  "data engineer",
  "data engineering",
  "analytics engineer",
  "big data",
  "etl",
  "data platform",
  "data warehouse",
];

  const qaKeywords = [
    "qa",
    "quality assurance",
    "automation engineer",
    "test engineer",
  ];
const securityKeywords = [
  "security",
  "offensive security",
  "cybersecurity",
  "application security",
  "cloud security",
  "security engineer",
];

const embeddedKeywords = [
  "firmware",
  "embedded",
  "asic",
  "fpga",
  "rtos",
  "device driver",
  "kernel",
];
  const frontendKeywords = [
    "frontend",
    "front end",
    "front-end",
    "react",
    "angular",
    "vue",
    "ui engineer",
    "ui developer",
  ];

  const fullStackKeywords = [
    "full stack",
    "fullstack",
    "full-stack",
  ];

  const hardwareKeywords = [
    "dft",
    "nand",
    "dram",
    "hbm",
    "silicon",
    "semiconductor",
    "process engineer",
    "equipment engineer",
    "technology node",
    "node development",
    "assembly",
    "encapsulation",
  ];

const backendKeywords = [
  "backend",
  "back-end",

  "backend engineer",
  "backend developer",

  "node.js",
  "nodejs",
  "node js",
  "golang",
  "go developer",
  "go engineer",

  "spring",
  "spring boot",

  "api developer",
  "server-side",
  "server engineer",

  "microservices",
  "distributed systems",

  "software development engineer",
  "java full stack",
  "java developer",
"java engineer",
"python developer",
"python engineer",

];
  const generalSoftwareKeywords = [
    "software engineer",
    "software developer",
    "associate software engineer",
    "associate engineer",
    "graduate engineer",
    "graduate engineer trainee",
    "member technical staff",
    "application developer",
    "engineer i",
    "engineer ii",
    "engineer iii",
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

  // DEVOPS
  if (
    devopsKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "DEVOPS";
  }

  // DATA_ENGINEERING
  if (
    dataKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "DATA_ENGINEERING";
  }

  // QA
  if (
    qaKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "QA";
  }

  // SECURITY
  if (
    securityKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "SECURITY";
  }

  // EMBEDDED
  if (
    embeddedKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "EMBEDDED";
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

  // HARDWARE
  if (
    hardwareKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "HARDWARE";
  }

  // BACKEND
  if (
    backendKeywords.some(keyword =>
      normalizedTitle.includes(keyword)
    )
  ) {
    return "BACKEND";
  }

  // GENERAL_SOFTWARE
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