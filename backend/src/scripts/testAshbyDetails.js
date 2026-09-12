import axios from "axios";

const url =
  "https://jobs.ashbyhq.com/zapier/38434b88-086c-424b-8d18-8d006e0b71b8";

const testAshbyPublicPage = async () => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/138.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language":
        "en-US,en;q=0.9",
    },
    timeout: 20000,
    maxRedirects: 5,
    validateStatus: () => true,
  });

  console.log(
    "\n========== ASHBY PUBLIC PAGE ==========\n"
  );

  console.log("HTTP Status:", response.status);

  console.log(
    "\n========== HTML LENGTH ==========\n"
  );

  console.log(response.data?.length);

  console.log(
    "\n========== DATE-RELATED TEXT ==========\n"
  );

  const html = response.data || "";

  const matches = html.match(
    /.{0,100}(posted|date|days ago|ago|application deadline|closing).{0,150}/gi
  );

  if (matches?.length) {
    matches.forEach((match) =>
      console.log(match)
    );
  } else {
    console.log(
      "No obvious date-related text found."
    );
  }

  console.log(
    "\n========== RAW HTML SAMPLE ==========\n"
  );

  console.log(html.slice(0, 5000));
};

try {
  await testAshbyPublicPage();
} catch (error) {
  console.error(
    "\nAshby public page test failed:"
  );

  console.error(
    error.response?.data ||
      error.message
  );
}