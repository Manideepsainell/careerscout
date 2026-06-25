
import "./JobCard.css";
import {
  markApplied,markExpired
} from "../services/jobService";
function JobCard({
  job,
  onHide,
  onSave,
  onStatusChange,
  isTop10k = false,
}){
  
   const score =
  job.calculatedScore?.score || 0;
const handleApply =
  async () => {

    try {

      await markApplied(
        job._id
      );

      window.open(
        job.jobUrl,
        "_blank"
      );

    onStatusChange();

    } catch (error) {

      console.error(error);

    }

};
const handleExpire =
  async () => {

    try {

      await markExpired(
        job._id
      );
onStatusChange();

    } catch (error) {

      console.error(error);

    }

};

 
const getFreshness = () => {

  if (!job.lastSeenAt) {
    return "";
  }

  const lastSeen =
    new Date(job.lastSeenAt);

  const today =
    new Date();

  const diffDays =
    Math.floor(
      (today - lastSeen) /
      (1000 * 60 * 60 * 24)
    );

  if (diffDays === 0) {
    return "👁 Seen Today";
  }

  if (diffDays <= 2) {
    return "🔄 Updated Recently";
  }

  return "";
};
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
   <div
  className={`job-card ${
    isTop10k ? "top10k-card" : ""
  }`}
>
  {
  isTop10k && (
    <div className="top10k-badge">
      🔥 10K Recommendation
    </div>
  )
}
    
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

{getFreshness() && (
  <>
    {" • "}
    {getFreshness()}
  </>
)}
</div>
   <div className="job-tags">
    <span className="tag source-tag">

  {job.source}

</span>

  <span className="tag role-tag">
    {job.roleCategory}
  </span>

{
job.experienceBand !== "UNKNOWN" &&
(
  <span className="tag exp-tag">
    {job.experienceBand}
  </span>
)
}

 <span
  className={`tag score-tag ${
    score >= 150
      ? "high-score"
      : score >= 80
      ? "medium-score"
      : "low-score"
  }`}
>
  Score: {score}
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

 <button
  className="apply-btn"
  onClick={handleApply}
>
  Apply ↗
</button>
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
<button
  className="expire-btn"
  onClick={handleExpire}
>
  Expired
</button>
</div>
    </div>
    
  );
  
}

export default JobCard;