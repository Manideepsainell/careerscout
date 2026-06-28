const buildGreenhouseJobsEndpoint = (
  url
) => {

  // Already an API endpoint
  if (
    url.includes(
      "boards-api.greenhouse.io"
    )
  ) {
    return url;
  }

  const parsed = new URL(url);

  let slug =
    parsed.searchParams.get("for");

  if (!slug) {
    slug = parsed.pathname
      .replace(/\/$/, "")
      .split("/")
      .pop();
  }

  return `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`;
};

export {
  buildGreenhouseJobsEndpoint,
};