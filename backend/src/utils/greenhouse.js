const buildGreenhouseJobsEndpoint = (
  url
) => {

  // Already an API endpoint
  if (url.includes("boards-api.greenhouse.io")) {
    return url;
  }

  // board page
  const slug = url
    .replace(/\/$/, "")
    .split("/")
    .pop();

  return `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`;
};

export {
  buildGreenhouseJobsEndpoint,
};