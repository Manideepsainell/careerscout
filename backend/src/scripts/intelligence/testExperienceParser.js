import {
  parseStructuredExperience,
} from "../../src/intelligence/parsers/experienceParser.js";

const tests = [
  {
    input: "5",
    expected: { min: 5, max: 5 },
  },
  {
    input: "5 Years",
    expected: { min: 5, max: 5 },
  },
  {
    input: "5 yrs",
    expected: { min: 5, max: 5 },
  },
  {
    input: "5 years experience",
    expected: { min: 5, max: 5 },
  },
  {
    input: "0-2 Years",
    expected: { min: 0, max: 2 },
  },
  {
    input: "0 - 2 yrs",
    expected: { min: 0, max: 2 },
  },
  {
    input: "2 to 4 years",
    expected: { min: 2, max: 4 },
  },
  {
    input: "3+",
    expected: { min: 3, max: null },
  },
  {
    input: "10 + Years",
    expected: { min: 10, max: null },
  },
  {
    input: "Freshers",
    expected: { min: 0, max: 0 },
  },
  {
    input: "Fresher",
    expected: { min: 0, max: 0 },
  },
  {
    input: "Not Specified",
    expected: null,
  },
  {
    input: "",
    expected: null,
  },
];

let passed = 0;

console.log("\n========== Experience Parser Tests ==========\n");

for (const test of tests) {
  const actual = parseStructuredExperience(test.input);

  const success =
    JSON.stringify(actual) ===
    JSON.stringify(test.expected);

  if (success) {
    passed++;
  }

  console.log(
    `${success ? "✅ PASS" : "❌ FAIL"} | ${test.input}`
  );

  if (!success) {
    console.log("   Expected:", test.expected);
    console.log("   Actual  :", actual);
  }
}

console.log("\n=============================================");
console.log(`Passed: ${passed}/${tests.length}`);
console.log(`Failed: ${tests.length - passed}/${tests.length}`);

if (passed === tests.length) {
  console.log("\n🎉 All parser tests passed!");
} else {
  console.log("\n⚠️ Some parser tests failed.");
}