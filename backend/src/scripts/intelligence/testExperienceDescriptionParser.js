import parseDescriptionExperience from "../../intelligence/parsers/experienceDescriptionParser.js";

const tests = [
  {
    input: "0-2 years of experience",
    expected: {
      min: 0,
      max: 2,
    },
  },
  {
    input: "2-4 years relevant experience",
    expected: {
      min: 2,
      max: 4,
    },
  },
  {
    input: "MS or PhD (5-10 years relevant experience)",
    expected: {
      min: 5,
      max: 10,
    },
  },
  {
  input: "4+ years of experience",
  expected: {
    min: 4,
    max: null,
  },
  
  
},
{
  input: "7+ years of relevant industry work experience",
  expected: {
    min: 7,
    max: null,
  },
},
{
  input: "Minimum 5+ years experience",
  expected: {
    min: 5,
    max: null,
  },
  
},
{
  input: "Minimum 2 years of experience",
  expected: {
    min: 2,
    max: null,
  },
},
{
  input: "Minimum of 5 years experience",
  expected: {
    min: 5,
    max: null,
  },
},
{
  input: "A minimum of 7 years of relevant industry work experience",
  expected: {
    min: 7,
    max: null,
  },
},
{
  input: "At least 3 years of experience",
  expected: {
    min: 3,
    max: null,
  },
},
];

let passed = 0;

console.log("\n========== Range Parser ==========\n");

for (const test of tests) {
  const actual = parseDescriptionExperience(
    test.input
  );

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
    console.log("Expected:", test.expected);
    console.log("Actual  :", actual);
  }
}

console.log("\n==================================");
console.log(
  `Passed ${passed}/${tests.length}`
);