// src/scripts/testKula.js

import axios from "axios";

const response = await axios.get(
  "https://careers.kula.ai/api/internal/ats_job_posts",
  {
    params: {
      accountName: "plumhq",
      page: 1,
      type: "ats_job_post.index",
      items: 99
    }
  }
);

console.log(
  JSON.stringify(
    response.data,
    null,
    2
  )
);
console.log(Array.isArray(response.data));
console.log(Object.keys(response.data));