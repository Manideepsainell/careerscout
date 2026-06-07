const collectGreenHouseJobs = async (company) => {
  console.log(`GH collector running for ${company.name}`);

  return [
  {
    title: "Backend Engineer",
    source: "GREENHOUSE",
    company: company.name,
     jobUrl: "https://example.com/greenhouse-job",
  },
];
};

export default collectGreenHouseJobs;