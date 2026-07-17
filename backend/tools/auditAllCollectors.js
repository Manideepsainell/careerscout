import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const collectorsDir = path.join(__dirname, "../src/collectors");
const resultsDir = path.join(__dirname, "../audit-results");

await fs.mkdir(resultsDir, { recursive: true });

function run(script, collector) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "node",
      [path.join(__dirname, script), collector],
      {
        stdio: "inherit",
        shell: true,
      }
    );

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${script} failed`));
      }
    });
  });
}

const entries = await fs.readdir(collectorsDir, {
  withFileTypes: true,
});

const collectors = [];

// Folder collectors
for (const entry of entries) {
  if (entry.isDirectory()) {
    collectors.push(entry.name);
  }
}

// Single-file collectors
for (const entry of entries) {
  if (
    entry.isFile() &&
    entry.name.endsWith("Collector.js")
  ) {
    collectors.push(
      entry.name.replace("Collector.js", "")
    );
  }
}

collectors.sort();

let completed = 0;
let skipped = 0;
let failed = 0;

for (const collector of collectors) {
  const output = path.join(
    resultsDir,
    `${collector}.json`
  );

  try {
    await fs.access(output);

    console.log(`⏭ Skipping ${collector}`);
    skipped++;

    continue;
  } catch {}

  console.log(
    `\n==================================================`
  );
  console.log(`Auditing ${collector}`);
  console.log(
    `==================================================`
  );

  try {
    await run(
      "prepareCollectorAudit.js",
      collector
    );

    await run(
      "auditCollector.js",
      collector
    );

    completed++;
  } catch (err) {
    console.error(
      `❌ Failed: ${collector}`
    );

    failed++;
  }
}

console.log("\n=================================");
console.log("Audit Complete");
console.log("=================================\n");

console.log(`Completed : ${completed}`);
console.log(`Skipped   : ${skipped}`);
console.log(`Failed    : ${failed}`);