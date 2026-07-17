import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ai from "./gemini.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collector = process.argv[2];
const MODEL = "models/gemini-2.5-flash-lite";

if (!collector) {
  console.log("Usage: node tools/auditCollector.js <collector>");
  process.exit(1);
}

const auditFile = path.join(
  __dirname,
  "../audit-output",
  `${collector}.md`
);

const prompt = await fs.readFile(auditFile, "utf8");

console.log(`🤖 Auditing ${collector}...`);
console.log(`🧠 Model: ${MODEL}\n`);

try {
  const response = await ai.models.generateContent({
    model: MODEL,
    contents: prompt,
  });
  const json = response.text.trim();
const outputDir = path.join(__dirname, "../audit-results");

await fs.mkdir(outputDir, {
  recursive: true,
});

const outputFile = path.join(
  outputDir,
  `${collector}.json`
);
let audit;

try {
  audit = JSON.parse(json);
} catch (err) {
  console.error("❌ Gemini returned invalid JSON");
  process.exit(1);
}
await fs.writeFile(
  outputFile,
  JSON.stringify(audit, null, 2)
);

console.log("\n========== SUMMARY ==========\n");


console.log("Collector :", audit.collector);
console.log("Strategy  :", audit.recommendedStrategy);
console.log("Confidence:", audit.confidence);

console.log(`\n✅ Saved: ${outputFile}`);

  const VERBOSE = process.argv.includes("--verbose");

if (VERBOSE) {
  console.log("\n========== RESPONSE ==========\n");
  console.log(json);
}
} catch (err) {
  console.error("\n❌ Gemini API Error");
  console.error(err);
}