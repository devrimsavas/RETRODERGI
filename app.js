//test probe script 
// change testurl for other archives


const axios = require("axios");
const fs = require("fs");
const path = require("path");

const testUrl =
  "https://retrodergi.com/Dergiler/Commodore/Commodore - Sayi 37 (Mart 1989).pdf";
const outputPath = path.join(__dirname, "Commodore - Sayi 37 (Mart 1989).pdf");

async function downloadPDF(url, outputPath) {
  try {
    const response = await axios({
      url,
      method: "GET",
      responseType: "stream",
    });

    const writer = fs.createWriteStream(outputPath);
    response.data.pipe(writer);

    writer.on("finish", () => {
      console.log(`✅ Downloaded: ${outputPath}`);
    });

    writer.on("error", (err) => {
      console.error("❌ Stream error:", err.message);
    });
  } catch (err) {
    console.error("❌ Download error:", err.message);
  }
}

downloadPDF(testUrl, outputPath);
