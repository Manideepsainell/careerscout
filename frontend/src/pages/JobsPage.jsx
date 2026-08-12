import { useEffect, useState } from "react";
import { getJobs } from "../services/jobService";
import JobCard from "../components/JobCard";
import "./JobsPage.css";
import {
  refresh10kJobs
} from "../services/tenkService";
import {
  getStats
} from "../services/statsService";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiTrendingUp
} from "react-icons/fi";
function JobsPage() {
const [indiaOnly, setIndiaOnly] =
  useState(false);
    const [days, setDays] = useState("");
    const [role, setRole] =
  useState("");
    const [location, setLocation] =
  useState("");
  const [jobs, setJobs] =
  useState([]);
  const [top10kJobs, setTop10kJobs] =
  useState([]);
  const [sort, setSort] =
  useState("latest");
  const [hiddenJobs, setHiddenJobs] =
  useState([]);
const [savedJobs, setSavedJobs] =
  useState([]);
  const [
  showSavedOnly,
  setShowSavedOnly
] = useState(false);
const [
  refreshing10k,
  setRefreshing10k
] = useState(false);
const [serviceJobs, setServiceJobs] = useState([]);
const [
  last10kRefresh,
  setLast10kRefresh
] = useState(null);
const [totalJobs, setTotalJobs] =
  useState(0);

const [totalPages, setTotalPages] =
  useState(1);
const [stats, setStats] =
  useState(null);
  useEffect(() => {

  const fetchStats =
    async () => {

      try {

        const data =
          await getStats();

        setStats(data);

      } catch (error) {

        console.error(error);

      }

    };

  fetchStats();

}, []);
const [page, setPage] =
  useState(1);
  
  const [
  experienceBand,
  setExperienceBand
] = useState("");
  const fetchJobs = async () => {
      console.trace("FETCH JOBS CALLED");

      try {
const response = await getJobs({
  days,
  location,
  experienceBand,
  role,
  page,
  sort,
  source: "GREENHOUSE"
});

setJobs(response.data);

setServiceJobs(
  response.serviceJobs || []
);

setTop10kJobs(
  response.top10kJobs || []
);
console.log(
  "Top10k jobs:",
  response.top10kJobs
);

setTotalJobs(
  response.totalJobs
);

setTotalPages(
  response.totalPages
);
      } catch (error) {
        console.error(error);
      }
    };

 useEffect(() => {

  fetchJobs();

}, [
  days,
  location,
  experienceBand,
  role,
  page,
  sort
]);
  const [search, setSearch] =
  useState("");
  
  let filteredJobs = jobs;
  filteredJobs =
  filteredJobs.filter(
    (job) =>
      !hiddenJobs.includes(
        job._id
      )
  );
if (showSavedOnly) {
  filteredJobs = savedJobs;
}
  

if (indiaOnly) {
  filteredJobs =
    filteredJobs.filter(
      (job) =>
        job.calculatedScore?.score >= 40
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
const hideJob = (jobId) => {
  setHiddenJobs([
    ...hiddenJobs,
    jobId,
  ]);
};
const saveJob = (job) => {
  if (
    savedJobs.some(
      (saved) =>
        saved._id === job._id
    )
  ) {
    return;
  }

  setSavedJobs([
    ...savedJobs,
    job,
  ]);
};
let filteredTop10kJobs = top10kJobs;

filteredTop10kJobs =
  filteredTop10kJobs.filter(
    (job) =>
      !hiddenJobs.includes(
        job._id
      )
  );

if (indiaOnly) {
  filteredTop10kJobs =
    filteredTop10kJobs.filter(
      (job) =>
        job.calculatedScore?.score >= 40
    );
}

if (search) {
  filteredTop10kJobs =
    filteredTop10kJobs.filter(
      (job) =>
        job.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );
}
const handleRefresh10k =
  async () => {

    try {

      setRefreshing10k(true);

      await refresh10kJobs();

      setLast10kRefresh(
        new Date()
      );

      window.location.reload();

    } catch (error) {

      console.error(error);

    } finally {

      setRefreshing10k(false);

    }

};
 return (

  
  <div className="page-container">
  
<div className="header-card">

  <h1>CareerScout</h1>

  <p className="hero-text">
    Fresh software jobs. Less searching. More applying.
  </p>

  <div className="dashboard-cards">

    <div className="dashboard-card">
      <h2>{stats?.newJobsToday}</h2>
      <p>Fresh Today</p>
    </div>

    <div className="dashboard-card">
      <h2>{stats?.activeJobs?.toLocaleString()}</h2>
      <p>Active Jobs</p>
    </div>

    <div className="dashboard-card">
      <h2>{savedJobs.length}</h2>
      <p>Saved</p>
    </div>
    <button
  className="refresh10k-btn"
  onClick={handleRefresh10k}
  disabled={refreshing10k}
>

{
  refreshing10k
    ? "🔄 Refreshing..."
    : "🔄 Refresh 10K Jobs"
}

</button>
{
  last10kRefresh && (

    <div className="refresh-status">

      ✓ Updated at {" "}

      {
        last10kRefresh.toLocaleTimeString()
      }

    </div>

  )
}

  </div>

</div>
<div className="filters-container">

<select className="sort-select"
  value={sort}
  onChange={(e) => {
  setSort(e.target.value);
  setPage(1);
}}
>
  <option value="latest">
    Latest
  </option>

  <option value="recommended">
    Recommended
  </option>
</select>
<div className="filter-group">
<label>
    <FiBriefcase />
Role</label>
    <select
  value={role}
  onChange={(e) => {
  setRole(e.target.value);
  setPage(1);
}}
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
</div>
<div className="filter-group">
<label>
    <FiTrendingUp />
    Expereince</label>

    <select
  value={experienceBand}
  onChange={(e) => {
  setExperienceBand(
    e.target.value
  );
  setPage(1);
}}
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
</div>
<div className="filter-group">
<label>
    <FiClock />
    Days</label>
    <select
  value={days}
  onChange={(e) => {
  setDays(e.target.value);
  setPage(1);
}}
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
</div>

<div className="filter-group">
<label>
    <FiMapPin />Location</label>
<select
  value={location}
 onChange={(e) => {
  setLocation(e.target.value);
  setPage(1);
}}
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
</div>
<div className="filter-group">
    <FiSearch />

    <input
  type="text"
  placeholder="Search jobs..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
</div>
<div className="checkbox-group">

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
<label>
  <input
    type="checkbox"
    checked={showSavedOnly}
    onChange={(e) =>
      setShowSavedOnly(
        e.target.checked
      )
    }
  />
  Show Saved Only
</label>
</div>
</div>
{
  !showSavedOnly &&
  top10kJobs.length > 0 && (
    <div className="top10k-section">

     <h2 className="section-title">
  🔥 Top Recommendations from 10K Coders
</h2>

     {
  filteredTop10kJobs.map(
    (job) => (
<JobCard
  key={job._id}
  job={job}
  onHide={hideJob}
  onSave={saveJob}
  onStatusChange={fetchJobs}
  isTop10k={true}
/>
    )
  )
}
  

    </div>
  )
}
{
  !showSavedOnly &&
 
  serviceJobs.length > 0 && (
    <>
      <h2 className="section-title">
        🏢 Service Companies
      </h2>

     {serviceJobs.slice(0, 10).map((job) => (
  <div
    key={job._id}
    className="service-company-card"
  >
    
    <JobCard
      job={job}
      onHide={hideJob}
      onSave={saveJob}
      onStatusChange={fetchJobs}
    />
  </div>
))}
    </>
  )
}
{
  !showSavedOnly && (
    <h2 className="section-title">
      ⭐ Recommended Jobs
    </h2>
  )
}
    {filteredJobs.map((job) => (
   <JobCard
  key={job._id}
  job={job}
  onHide={hideJob}
  onSave={saveJob}
  onStatusChange={fetchJobs}
/>
    ))}
 <div className="pagination">
  <button
    disabled={page === 1}
    onClick={() =>
      setPage(page - 1)
    }
  >
    Previous
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={
      page === totalPages
    }
    onClick={() =>
      setPage(page + 1)
    }
  >
    Next
  </button>
</div>
  </div>
  
);
}

export default JobsPage;