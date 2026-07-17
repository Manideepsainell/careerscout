import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import auditPrompt from "./auditPrompt.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collector = process.argv[2];

if (!collector) {
  console.log("Usage: node tools/prepareCollectorAudit.js <collector>");
  process.exit(1);
}

const collectorsRoot = path.join(__dirname, "../src/collectors");
const outputDir = path.join(__dirname, "../audit-output");

const folderPath = path.join(collectorsRoot, collector);
const filePath = path.join(collectorsRoot, `${collector}Collector.js`);

async function getJsFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  let files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...await getJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
}

async function getLocalImports(file) {
  const code = await fs.readFile(file, "utf8");

  const regex =
    /import\s+(?:[\s\S]*?)from\s+["'](.+?)["']/g;

  const imports = [];

  let match;

  while ((match = regex.exec(code)) !== null) {
    const importPath = match[1];

    if (importPath.startsWith(".")) {
      imports.push(
        path.resolve(path.dirname(file), importPath)
      );
    }
  }

  return imports;
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

async function expandImports(files) {
  const result = new Set(files);

  for (const file of files) {
    const imports = await getLocalImports(file);

    for (let imp of imports) {
      if (!imp.endsWith(".js")) {
        imp += ".js";
      }

      if (await exists(imp)) {
        result.add(imp);
      }
    }
  }

  return [...result];
}
async function buildMarkdown(files) {
  let md = auditPrompt;

  md += `# Collector Information

- **Collector:** ${collector.toUpperCase()}
- **Generated:** ${new Date().toLocaleString()}
- **Files Included:** ${files.length}

---

# Source Code

`;

  for (const file of files) {
    const relative = path.relative(
      path.join(__dirname, ".."),
      file
    );

    const content = await fs.readFile(file, "utf8");

    md += `
============================================================
FILE: ${relative}
============================================================

\`\`\`javascript
${content}
\`\`\`

`;
  }

  md += `

---

# Reminder

This is a research task.

Focus ONLY on discovering:

- Stable Job Identifier
- List Endpoint
- Detail Endpoint
- Job Status Field
- Closed Job Behaviour
- Dead Job Detection Strategy

Do not suggest code improvements.

Return ONLY the requested JSON.

`;

  return md;
}

let files = [];

try {
  const stat = await fs.stat(folderPath);

  if (stat.isDirectory()) {
    files = await getJsFiles(folderPath);
  }
} catch {}

if (!files.length) {
  try {
    const stat = await fs.stat(filePath);

    if (stat.isFile()) {
      files = [filePath];
    }
  } catch {}
}

if (!files.length) {
  console.log("Collector not found.");
  process.exit(1);
}

files = await expandImports(files);

const markdown = await buildMarkdown(files);

await fs.mkdir(outputDir, { recursive: true });

const outputFile = path.join(
  outputDir,
  `${collector}.md`
);

await fs.writeFile(outputFile, markdown);


console.log(`✅ Generated: ${outputFile}`);
console.log(`📄 Files included: ${files.length}\n`);

for (const file of files) {
  console.log(" -", path.relative(path.join(__dirname, ".."), file));
}