import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
function JobsPage() {
  const [jobs, setJobs] = useState([]);
const [indiaOnly, setIndiaOnly] =
  useState(false);
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data =
          await getJobs();

        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);
  const filteredJobs = indiaOnly
  ? jobs.filter((job) => {
      console.log(
        job.title,
        job.calculatedScore?.score
      );

      return (
        job.calculatedScore?.score > 0
      );
    })
  : jobs;
  console.log(
  "indiaOnly:",
  indiaOnly
);

console.log(jobs[0]);

 return (
  <div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
  <label>
  <input
    type="checkbox"
    checked={indiaOnly}
    onChange={(e) =>
      setIndiaOnly(e.target.checked)
    }
  />
  Hide Low Priority Jobs
</label>

    <h1>CareerScout Jobs</h1>

    {filteredJobs.map((job) => (
      <JobCard
        key={job._id}
        job={job}
      />
    ))}
  </div>
);
}

export default JobsPage;