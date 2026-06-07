const collectSmartRecruitersJobs = async (company) => {
  console.log(`Smart Recruiter collector running for ${company.name}`);
  return [
  {
    title: "Frontend Engineer",
    source: "SMARTRECRUITERS",
    company: company.name,
     jobUrl: "https://example.com/smartrecruiter-job",
  },
];
};

export default collectSmartRecruitersJobs;