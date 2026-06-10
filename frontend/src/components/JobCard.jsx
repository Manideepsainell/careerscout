function JobCard({ job }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        boxShadow:
          "0 2px 8px rgba(0,0,0,0.1)",
      }}
    >
      <h2>{job.title}</h2>

      <p>
        <strong>
          {job.company?.name}
        </strong>
      </p>

      <p>{job.location}</p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: "#e3f2fd",
          }}
        >
          {job.roleCategory}
        </span>

        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: "#e8f5e9",
          }}
        >
          {job.experienceBand}
        </span>

        <span
          style={{
            padding: "4px 8px",
            borderRadius: "6px",
            background: "#fff3cd",
          }}
        >
          Score:
          {" "}
          {job.calculatedScore?.score}
        </span>
      </div>

      <a
        href={job.jobUrl}
        target="_blank"
        rel="noreferrer"
      >
        <button
          style={{
            padding:
              "10px 16px",
            cursor: "pointer",
          }}
        >
          Apply
        </button>
      </a>
    </div>
  );
}

export default JobCard;