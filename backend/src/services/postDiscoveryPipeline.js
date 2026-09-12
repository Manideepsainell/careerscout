import validateJobs from "./validateJobs.js";

const runPostDiscoveryPipeline = async () => {
  console.log(
    "\n========== ASHBY VALIDATION ==========\n"
  );

  await validateJobs({
    source: "ASHBY",
    validity: "UNKNOWN",
  });

  console.log(
    "\n========== ASHBY VALIDATION COMPLETE ==========\n"
  );
};

export default runPostDiscoveryPipeline;