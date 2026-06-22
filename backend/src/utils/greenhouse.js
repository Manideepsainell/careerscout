const buildGreenhouseJobsEndpoint = (
  careersUrl
) => {
 const slug = careersUrl
  .replace(/\/$/, "")
  .split("/")
  .pop();
  return `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`;
};

export {
  buildGreenhouseJobsEndpoint,
};