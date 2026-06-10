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
  const [search, setSearch] =
  useState("");
  let filteredJobs = jobs;

if (indiaOnly) {
  filteredJobs =
    filteredJobs.filter(
      (job) =>
        job.calculatedScore?.score > 0
    );
}

if (search) {
  filteredJobs =
    filteredJobs.filter((job) =>
      job.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );
}

 return (
  <div
    style={{
      maxWidth: "1000px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <input
  type="text"
  placeholder="Search jobs..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
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