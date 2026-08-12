import validateJobs from "./validateJobs.js";

const runPostDiscoveryPipeline = async () => {
  console.log("\n========== POST DISCOVERY PIPELINE ==========\n");

  await validateJobs({
    source: "WORKDAY",
    validity: "UNKNOWN",
  });

  console.log("\n========== POST DISCOVERY COMPLETE ==========\n");
};

export default runPostDiscoveryPipeline;