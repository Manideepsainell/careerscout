import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
function JobsPage() {
  const [jobs, setJobs] = useState([]);
const [indiaOnly, setIndiaOnly] =
  useState(false);
    const [days, setDays] = useState("");
    const [role, setRole] =
  useState("");
    const [location, setLocation] =
  useState("");
  const [
  experienceBand,
  setExperienceBand
] = useState("");
  useEffect(() => {
    const fetchJobs = async () => {
      try {
    const data =
  await getJobs({
  days,
  location,
  experienceBand,
  role,
});
        setJobs(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
 }, [
  days,
  location,
  experienceBand,
  role
]);
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
    <select
  value={role}
  onChange={(e) =>
    setRole(e.target.value)
  }
>
  <option value="">
    All Roles
  </option>

  <option value="BACKEND">
    Backend
  </option>

  <option value="FULLSTACK">
    Full Stack
  </option>

  <option value="GENERAL_SOFTWARE">
    Software Engineer
  </option>

  <option value="FRONTEND">
    Frontend
  </option>

  <option value="DEVOPS">
    DevOps
  </option>

  <option value="DATA_ENGINEERING">
    Data Engineering
  </option>

  <option value="QA">
    QA
  </option>
</select>
    <select
  value={experienceBand}
  onChange={(e) =>
    setExperienceBand(
      e.target.value
    )
  }
>
  <option value="">
    All Experience
  </option>

  <option value="FRESHER">
    Fresher
  </option>

  <option value="JUNIOR">
    Junior
  </option>

  <option value="MID">
    Mid
  </option>

  <option value="SENIOR">
    Senior
  </option>
</select>
    <select
  value={days}
  onChange={(e) =>
    setDays(e.target.value)
  }
>
  <option value="">
    Any Time
  </option>

  <option value="1">
    Last 24 Hours
  </option>

  <option value="7">
    Last 7 Days
  </option>

  <option value="30">
    Last 30 Days
  </option>
</select>
<select
  value={location}
  onChange={(e) =>
    setLocation(e.target.value)
  }
>
  <option value="">
    All Locations
  </option>

  <option value="Hyderabad">
    Hyderabad
  </option>

  <option value="Remote">
    Remote
  </option>

  <option value="Bangalore">
    Bangalore
  </option>

  <option value="Pune">
    Pune
  </option>

  <option value="Noida">
    Noida
  </option>

  <option value="Chennai">
    Chennai
  </option>

  <option value="Gurgaon">
    Gurgaon
  </option>
  <option value="Remote">
  Remote
</option>

<option value="Hybrid">
  Hybrid
</option>
</select>
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