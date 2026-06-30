
const extractWorkdayInfo = (url) => {
  const parsed = new URL(url);

  const tenant = parsed.hostname.split(".")[0];

  const siteName = parsed.pathname.replace("/", "");

  return {
    tenant,
    siteName,
  };
};

const buildWorkdayJobsEndpoint = (url) => {
  const parsed = new URL(url);

  const hostname = parsed.hostname;

  const { tenant, siteName } =
    extractWorkdayInfo(url);

  return `https://${hostname}/wday/cxs/${tenant}/${siteName}/jobs`;
};
const buildWorkdayDetailUrl = (
  url,
  externalPath
) => {
  const parsed = new URL(url);

  const hostname = parsed.hostname;

  const { tenant, siteName } =
    extractWorkdayInfo(url);

  return `https://${hostname}/wday/cxs/${tenant}/${siteName}${externalPath}`;
};
const buildWorkdayJobUrl = (
  careersUrl,
  externalPath
) => {
  const parsed = new URL(careersUrl);

  const { siteName } =
    extractWorkdayInfo(careersUrl);

  return `${parsed.origin}/en-US/${siteName}${externalPath}`;
};
export {
  extractWorkdayInfo,
  buildWorkdayJobsEndpoint,
  buildWorkdayJobUrl,
  buildWorkdayDetailUrl,
};