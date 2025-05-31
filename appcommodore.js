const axios = require("axios");
const fs = require("fs");
const path = require("path");

const turkishMonths = [
  "Ocak",
  "Subat",
  "Mart",
  "Nisan",
  "Mayis",
  "Haziran",
  "Temmuz",
  "Agustos",
  "Eylul",
  "Ekim",
  "Kasim",
  "Aralik",
];

const startYear = 1986;
const startMonthIndex = 2; // Mart = index 2
const endYear = 1992;
const endMonthIndex = 6; // Temmuz = index 6
const downloadDir = "./commodore-pdfs";

if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

function pad(n) {
  return n.toString().padStart(2, "0");
}

function generateIssueList() {
  const issues = [];
  let issueNumber = 1;

  for (let year = startYear; year <= endYear; year++) {
    const monthStart = year === startYear ? startMonthIndex : 0;
    const monthEnd = year === endYear ? endMonthIndex : 11;

    for (let monthIndex = monthStart; monthIndex <= monthEnd; monthIndex++) {
      const monthName = turkishMonths[monthIndex];
      const paddedIssue = pad(issueNumber);
      const filename = `Commodore - Sayi ${paddedIssue} (${monthName} ${year}).pdf`;
      const url = `https://retrodergi.com/Dergiler/Commodore/${encodeURIComponent(
        filename
      )}`;

      issues.push({ issueNumber: paddedIssue, filename, url });
      issueNumber++;
    }
  }

  return issues;
}

async function downloadPDF(url, filename) {
  const filepath = path.join(downloadDir, filename);

  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
      validateStatus: (status) => status < 400,
    });

    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on("finish", () => {
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
      writer.on("error", reject);
    });
  } catch (err) {
    console.warn(`⚠️ Skipped: ${filename} (${err.message})`);
  }
}

async function main() {
  const issues = generateIssueList();

  for (const { url, filename } of issues) {
    console.log(`🔗 Trying: ${url}`);
    await downloadPDF(url, filename);
  }

  console.log("🎉 All done.");
}

main();
