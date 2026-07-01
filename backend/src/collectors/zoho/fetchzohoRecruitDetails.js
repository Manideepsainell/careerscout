import axios from "axios";

const fetchZohoRecruitDetails = async (job) => {
  const response = await axios.get(job.jobUrl);

  const html = response.data;

 const match = html.match(
  /var jobs = JSON\.parse\('([\s\S]*?)'\);/
);

if (!match) return {};

const encoded = match[1];

// Let JS decode the string literal
const decoded = Function(`return '${encoded}'`)();

// Now this is valid JSON
const [data] = JSON.parse(decoded);

  return {
    description: data.Job_Description || "",

    experience: data.Work_Experience || "",

    jobType: data.Job_Type || "",

    department:
      data.Department_Name?.name || "",

    workplace: data.Remote_Job
      ? "REMOTE"
      : "ONSITE",

    postedDate: data.Date_Opened
      ? new Date(data.Date_Opened)
      : null,
  };
};

export default fetchZohoRecruitDetails;