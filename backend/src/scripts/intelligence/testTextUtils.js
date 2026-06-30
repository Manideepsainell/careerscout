import {
  stripHtml,
  decodeHtmlEntities,
  normalizeWhitespace,
  cleanText,
} from "../../intelligence/utils/textUtils.js";
const samples = [
  {
    name: "Workday HTML",
    input:
      "<p>Minimum&nbsp;3&nbsp;years of <strong>experience</strong>.</p>",
  },
  {
    name: "Lever HTML",
    input:
      "<li>4+ years of experience in partnerships</li>",
  },
  {
    name: "SmartRecruiters HTML",
    input:
      "<strong>Experience:</strong> A minimum of 7 years of relevant industry work experience.",
  },
  {
    name: "Oracle HTML",
    input:
      "<div>MS or PhD (5-10 years relevant experience)</div>",
  },
  {
    name: "Ashby HTML",
    input:
      "<h2>You Might Be a Good Fit If</h2><ul><li>You have experience working remotely.</li></ul>",
  },
];

for (const sample of samples) {
  console.log("\n========================================");
  console.log("Test:", sample.name);

  console.log("\nRaw:");
  console.log(sample.input);

  console.log("\nstripHtml():");
  console.log(stripHtml(sample.input));

  console.log("\ndecodeHtmlEntities():");
  console.log(
    decodeHtmlEntities(
      stripHtml(sample.input)
    )
  );

  console.log("\ncleanText():");
  console.log(cleanText(sample.input));
}

console.log("\n========================================");
console.log("Text Utils Test Complete");