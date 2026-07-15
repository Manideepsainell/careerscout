import { chromium } from "playwright";

const getDarwinboxJobs = async (
  openPositionsUrl,
  companyId = "main"
) => {
  const browser = await chromium.launch({
    headless: false,
  });

  try {
    const page = await browser.newPage();

    await page.goto(openPositionsUrl, {
      waitUntil: "networkidle",
      timeout: 60000,
    });

    const result = await page.evaluate(
      async ({ companyId }) => {
        const limit = 10;
        let currentPage = 1;
        let allJobs = [];

        while (true) {
          const response = await fetch(
            `/ms/candidateapi/job/alljobs?companyId=${companyId}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                companyId,
                page: currentPage,
                sort_option: "new",
                limit,
              }),
            }
          );

          const data = await response.json();

          const jobs = data.data || [];

          if (!jobs.length) {
            break;
          }

          allJobs.push(...jobs);

          const totalPages = Math.ceil(
            (data.job_counts || 0) / limit
          );

          if (currentPage >= totalPages) {
            break;
          }

          currentPage++;
        }

        return allJobs;
      },
      { companyId }
    );

    return result;
  } finally {
    await browser.close();
  }
};

export default getDarwinboxJobs;