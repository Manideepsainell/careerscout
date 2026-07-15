import getSuccessFactorsJobs from "../utils/successFactors.js";
import enrichSuccessFactorsJob from "../utils/enrichSuccessFactorsJob.js";
import pLimit from "p-limit";

const parseSFDate = (str) => {
  if (!str) return null;
  const [m, d, y] = str.split("/").map(Number);
  if (!m || !d || !y) return null;
  const fullYear = y < 100 ? 2000 + y : y;
  return new Date(fullYear, m - 1, d);
};

const extractCountry = (data) =>
  data?.jobLocationCountry?.[0] ||
  data?.custCountryRegion?.[0] ||
  "";

const extractLocationString = (data) =>
  [
    data?.sfstd_jobLocation_obj?.[0],
    data?.custprimecity,
    data?.jobLocationShort?.[0],
    data?.jobLocationState?.[0],
  ]
    .filter(Boolean)
    .join(" ");

const isLikelyIndia = (data) => {
  const country = extractCountry(data);
  const locationStr = extractLocationString(data);

  if (/india/i.test(country)) return true;
  if (/india/i.test(locationStr)) return true;

  // fallback for sparsely-tagged records with no location fields at all
  if (!country && !locationStr && data?.currency?.[0] === "INR") return true;

  return false;
};

const collectSuccessFactorsJobs = async (company) => {
  const baseUrl = new URL(company.openPositionsUrl).origin;

  const jobs = await getSuccessFactorsJobs(
    company.openPositionsUrl,
    company.categoryId ?? 0,
    company.locationFilter || "",
    company.successFactorsConfig?.maxJobs
  );

  const mapped = jobs.map((job) => {
    const data = job.response;
    const postedDate = data?.unifiedStandardStart
      ? parseSFDate(data.unifiedStandardStart)
      : null;

    const country = extractCountry(data);
    const location = extractLocationString(data) || country || "India";

    return {
      title: data?.unifiedStandardTitle,
      company: company._id,
      location,
      country,
      isIndiaGuess: isLikelyIndia(data),
      source: "SUCCESSFACTORS",
      externalJobId: String(data?.id),
      jobUrl: `${baseUrl}/job/${data?.urlTitle}/${data?.id}-en_US`,
      description: "",
      jobType: "Full Time",
      team: data?.custRMKMappingPicklist?.[0] || "",
      postedDate,
    };
  });

  const recencyDays = company.successFactorsConfig?.recencyDays ?? 30;
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - recencyDays);
const indiaCount = mapped.filter((j) => j.isIndiaGuess).length;
const recentCount = mapped.filter((j) => {
  return !j.postedDate || j.postedDate >= cutoff;
}).length;

console.log(
  `SF ${company.name} breakdown: ${mapped.length} total, ${indiaCount} India, ${recentCount} recent`
);
  const filtered = mapped.filter((job) => {
    const isRecent = !job.postedDate || job.postedDate >= cutoff;
    return job.isIndiaGuess && isRecent;
  });

  console.log(
    `SF ${company.name}: ${mapped.length} total -> ${filtered.length} after India+recency filter`
  );

  const limit = pLimit(5);
  const enriched = await Promise.all(
    filtered.map((job) => limit(() => enrichSuccessFactorsJob(job)))
  );

  // strip internal-only field before returning
  return enriched.map(({ isIndiaGuess, ...job }) => job);
};

export default collectSuccessFactorsJobs;