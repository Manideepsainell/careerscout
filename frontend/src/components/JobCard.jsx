
import "./JobCard.css";
function JobCard({
  job,
  onHide,
  onSave,
}){
  const getDaysAgo = (date) => {
  if (!date) {
    return "Unknown";
  }

  const postedDate =
    new Date(date);

  const today =
    new Date();

  const diffTime =
    today - postedDate;

  const diffDays =
    Math.floor(
      diffTime /
      (1000 * 60 * 60 * 24)
    );

  if (diffDays === 0) {
    return "Today";
  }

  if (diffDays === 1) {
    return "1 day ago";
  }

  return `${diffDays} days ago`;
};
  return (
   <div className="job-card">
    
      <h2 className="job-title">{job.title}</h2>

      <p className="job-company">
  🏢 {job.company?.name} • {job.company?.category}
</p>
<div className="job-meta">
  📍 {job.location}
  {" • "}
  🏆 {job.tier}
  {" • "}
  🕒 {getDaysAgo(job.postedDate)}
</div>
   <div className="job-tags">

  <span className="tag role-tag">
    {job.roleCategory}
  </span>

  <span className="tag exp-tag">
    {job.experienceBand}
  </span>

  <span className="tag score-tag">
    Score: {job.calculatedScore?.score}
  </span>

</div>

<div className="reasons">

  {job.calculatedScore?.reasons
    ?.slice(0, 3)
    .map(
      (reason, index) => (
        <span
          key={index}
          className="reason-chip"
        >
          {reason}
        </span>
      )
    )}

</div>

     <div className="job-actions">

  <a
    href={job.jobUrl}
    target="_blank"
    rel="noreferrer"
  >
    <button className="apply-btn">
      Apply ↗
    </button>
  </a>

  <button
    className="save-btn"
    onClick={() =>
      onSave(job)
    }
  >
    Save
  </button>

  <button
    className="hide-btn"
    onClick={() =>
      onHide(job._id)
    }
  >
    Hide
  </button>

</div>
    </div>
    
  );
  
}

export default JobCard;