import fs from "fs";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Company from "../models/Company.js";

dotenv.config();

await connectDB();

const companies = await Company.find({})
  .sort({ name: 1 })
  .lean();

const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>CareerScout Companies</title>
<style>
body{
  font-family: Arial, sans-serif;
  margin:40px;
}
table{
  border-collapse:collapse;
  width:100%;
}
th,td{
  border:1px solid #ddd;
  padding:8px;
  font-size:13px;
}
th{
  background:#f5f5f5;
}
</style>
</head>
<body>

<h1>CareerScout Companies (${companies.length})</h1>

<table>
<tr>
<th>#</th>
<th>Company</th>
<th>ATS</th>
<th>Career URL</th>
</tr>

${companies
  .map(
    (c, i) => `
<tr>
<td>${i + 1}</td>
<td>${c.name}</td>
<td>${c.ats || ""}</td>
<td>${c.careersUrl || ""}</td>
</tr>`
  )
  .join("")}

</table>

</body>
</html>
`;

fs.writeFileSync("companies.html", html);

console.log("✅ companies.html created");
process.exit();