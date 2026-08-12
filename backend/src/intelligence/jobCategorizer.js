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
    "account executive",
"sales executive",
"sales representative",
"sales development",
"business development representative",
"account executive",
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
  "product management",
  "digital product",
  "product analyst",
  "product specialist",
  "digital product management",
];
const erpKeywords = [
  "oracle hcm",
  "oracle fusion",
  "oracle ebs",
  "oracle cloud",
  "sap",
  "abap",
  "successfactors",
  "peoplesoft",
  "workday",
  "oracle technical developer",
"hcm",
];
const aiKeywords = [
  "ai",
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
  "rag",
  "langchain",
  "langgraph",
  "hugging face",
  "huggingface",
  "embedding",
  "embeddings",
  "vector database",
  "pinecone",
  "weaviate",
  "milvus",
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
    "docker",
"kubernetes",
"k8s",
"helm",
"terraform",
"ansible",
"jenkins",
"github actions",
"azure devops",
"aws",
"gcp",
"kafka",
"rabbitmq",
"confluent",
"messaging",
"event streaming",
"swaggerhub",
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
    "snowflake",
"databricks",
"airflow",
"dbt",
"redshift",
"bigquery",
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
    
"svelte",
"nuxt",
"remix",
"vite",
"webpack",
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
    ".net",
"dotnet",
"asp.net",
"c#",

"django",
"flask",
"fastapi",

"php",
"laravel",

"ruby",
"ruby on rails",

"graphql",
"grpc",

"redis",

  ];
  const nonEngineeringKeywords = [
  "voice process",
  "voice support",
  "customer support",
  "customer service",
  "call center",
  "bpo",
  "process associate",
  "operations associate",
  "operations executive",
  "claims",
  "collections",
  "advisor",
  "analyst - operations",
  "chat support",
  "technical support",
  "service desk",
  "help desk",
  "desktop support",
  "it support",
  "document controller",
"document control",
"infrastructure support",
"infrastructure analyst",
"technical operations",
"operations engineer",
"noc engineer",
"network operations",
"system administrator",
"systems administrator",
"linux administrator",
"windows administrator",
"network administrator",
"it administrator",
];

if (
  nonEngineeringKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "OTHER";
}
const nonSoftwareEngineeringKeywords = [
  "manufacturing engineer",
  "process engineer",
  "industrial engineer",
  "production engineer",
  "quality engineer",
  "mechanical engineer",
  "electrical engineer",
  "electronics engineer",
  "civil engineer",
  "chemical engineer",
  "design engineer",
  "field engineer",
  "maintenance engineer",
  "plant engineer",
  "project engineer",
  "automation technician",
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
    "member of engineering staff",
"software analyst",
"software consultant",
"application programmer",
  ];
 const normalizedDescription =
    (description || "").toLowerCase();
    // BUSINESS ROLES — TITLE HAS PRIORITY
if (
  hrKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "HR";
}

if (
  salesKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "SALES";
}

if (
  marketingKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "MARKETING";
}

if (
  productKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "PRODUCT";
}
// NON-ENGINEERING
if (
  nonEngineeringKeywords.some(keyword =>
    hasKeyword(normalizedDescription, keyword)
  )
) {
  return "OTHER";
}
// NON-SOFTWARE ENGINEERING
if (
  nonSoftwareEngineeringKeywords.some(keyword =>
    hasKeyword(normalizedDescription, keyword)
  )
) {
  return "OTHER";
}
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
  // PRODUCT
if (
  productKeywords.some(keyword =>
    hasKeyword(normalizedDescription, keyword)
  )
) {
  return "PRODUCT";
}
// ERP
if (
  erpKeywords.some(keyword =>
    hasKeyword(normalizedDescription, keyword)
  )
) {
  return "ERP";
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
if (
  erpKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "ERP";
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
if (
  nonSoftwareEngineeringKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  )
) {
  return "OTHER";
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
  const isSoftwareRole =
  generalSoftwareKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  aiKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  securityKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  devopsKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  dataKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  embeddedKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  hardwareKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  qaKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  mobileKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  frontendKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  fullStackKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  ) ||
  backendKeywords.some(keyword =>
    hasKeyword(normalizedTitle, keyword)
  );
if (normalizedDescription && isSoftwareRole) {
  if (
    aiKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "AI_ML";
  }

  // BACKEND
  if (
    backendKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "BACKEND";
  }

  // FULL STACK
  if (
    fullStackKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "FULLSTACK";
  }

  // FRONTEND
  if (
    frontendKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "FRONTEND";
  }

  // MOBILE
  if (
    mobileKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "MOBILE";
  }

  // DEVOPS
  if (
    devopsKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "DEVOPS";
  }

  // DATA ENGINEERING
  if (
    dataKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "DATA_ENGINEERING";
  }

  // SECURITY
  if (
    securityKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "SECURITY";
  }

  // QA
  if (
    qaKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "QA";
  }

  // EMBEDDED / VLSI
  if (
    embeddedKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "EMBEDDED";
  }

  // HARDWARE
  if (
    hardwareKeywords.some(keyword =>
      hasKeyword(normalizedDescription, keyword)
    )
  ) {
    return "HARDWARE";
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