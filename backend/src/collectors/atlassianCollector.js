import axios from "axios";

async function collectAtlassianJobs(company) {
  const response = await axios.get(
    "https://www.atlassian.com/endpoint/careers/listings"
  );

  const relevantJobs = response.data.filter(
    (job) =>
      ["Engineering", "Analytics & Data Science", "Interns"].includes(
        job.category
      )
  );
 

  return relevantJobs.map((job) => ({
    title: job.title,
    company: company._id,
    location: job.locations?.join(", ") || "Not Specified",
    source: "CUSTOM",
    externalJobId: String(job.id),
    jobUrl: job.applyUrl,
   description: [
  job.overview,
  job.responsibilities,
  job.qualifications,
]
  .filter(Boolean)
  .join("\n\n"),
  }));
}



export default collectAtlassianJobs;