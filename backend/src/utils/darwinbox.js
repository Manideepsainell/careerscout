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
        const response = await fetch(
          `/ms/candidateapi/job/alljobs?companyId=${companyId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              companyId,
              page: 1,
              sort_option: "new",
              limit: 10,
            }),
          }
        );

        return response.json();
      },
      { companyId }
    );

    return result.data || [];
  } finally {
    await browser.close();
  }
};

export default getDarwinboxJobs;