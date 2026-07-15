// test-csb-endpoints.mjs
//
// Standalone sanity check — run this BEFORE touching the DB.
// Uses your existing, unmodified getSuccessFactorsJobs() against each
// branded CSB domain to see which ones actually respond with real data
// vs 403/CAPTCHA/empty on the bare POST (no CSRF token).
//
// Usage:
//   node test-csb-endpoints.mjs
//
// Adjust the import path below to wherever your utils folder actually is
// relative to this file.

import getSuccessFactorsJobs from "../utils/successFactors.js";

const candidates = [
  { name: "Schindler",    url: "https://job.schindler.com/services/recruiting/v1/jobs" },
  { name: "Ingenico",     url: "https://jobs.ingenico.com/services/recruiting/v1/jobs" },
  { name: "Lear",         url: "https://jobs.lear.com/services/recruiting/v1/jobs" },
  { name: "Foundever",    url: "https://jobs.foundever.com/services/recruiting/v1/jobs" },
  { name: "Swiss Re",     url: "https://careers.swissre.com/services/recruiting/v1/jobs" },
  { name: "Worldline",    url: "https://jobs.worldline.com/services/recruiting/v1/jobs" },
  { name: "TechnipFMC",   url: "https://careers.technipfmc.com/services/recruiting/v1/jobs" },
  { name: "Birlasoft",    url: "https://jobs.birlasoft.com/services/recruiting/v1/jobs" },
  { name: "CommScope",    url: "https://jobs.commscope.com/services/recruiting/v1/jobs" },
];

const run = async () => {
  const results = [];

  for (const c of candidates) {
    console.log(`\n=== Testing ${c.name} (${c.url}) ===`);
    try {
      // categoryId 0, no location filter, cap at 5 jobs just to sanity check
      const jobs = await getSuccessFactorsJobs(c.url, 0, "", 5);
      results.push({ name: c.name, ok: jobs.length > 0, count: jobs.length, sample: jobs[0]?.response?.unifiedStandardTitle });
      console.log(`  -> ${jobs.length} jobs returned. Sample title: ${jobs[0]?.response?.unifiedStandardTitle || "(none)"}`);
    } catch (err) {
      results.push({ name: c.name, ok: false, error: err.message });
      console.log(`  -> FAILED: ${err.message}`);
    }
  }

  console.log("\n\n=== SUMMARY ===");
  console.table(results);
  console.log(
    "\nAny company with ok:false likely needs the CSRF pre-flight helper" +
    " (see csrf-preflight.mjs) before the bare POST will work — SAP's CSB" +
    " sites can enforce a session + x-csrf-token depending on tenant config."
  );
};

run();
