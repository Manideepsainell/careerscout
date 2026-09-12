import axios from "axios";

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36";

const fetchAshbyPublicMetadata = async (job) => {
  try {
    const response = await axios.get(job.jobUrl, {
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
      },
      timeout: 20000,
      maxRedirects: 5,
      validateStatus: () => true,
    });

    if (response.status !== 200) {
      return {};
    }

    const html = response.data;

    // Ashby exposes JobPosting JSON-LD
    const jsonLdMatches = [
      ...html.matchAll(
        /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
      ),
    ];

    for (const match of jsonLdMatches) {
      try {
        const data = JSON.parse(match[1]);

        const candidates = Array.isArray(data)
          ? data
          : [data];

        for (const item of candidates) {
          if (
            item?.["@type"] === "JobPosting" &&
            item.datePosted
          ) {
            return {
              postedDate: item.datePosted,
            };
          }
        }
      } catch {
        // Ignore malformed JSON-LD blocks
      }
    }

    return {};
  } catch (error) {
    console.error(
      `[Ashby Public Metadata Failed] ${job.title}`
    );

    console.error(
      error.code || error.message
    );

    return {};
  }
};

export default fetchAshbyPublicMetadata;