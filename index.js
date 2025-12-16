const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  const secret = process.env.DEMO_SECRET;

  res.send(`
    CA1 VM deployment via Cloud Build is LIVE<br/><br/>
    <strong>Secret from Secret Manager:</strong> ${
      secret ? secret : "Secret not loaded"
    }
  `);
});

app.get("/storage", (req, res) => {
  const filePath = process.env.TEST_FILE_PATH;

  if (!filePath) {
    return res.status(500).send("Storage file path not set");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read storage file");
    }
    res.send(`<pre>${data}</pre>`);
  });
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
