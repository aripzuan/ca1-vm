const express = require("express");
const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

// Secret from Secret Manager
const secret = process.env.DEMO_SECRET;

// File from Cloud Storage
const filePath = process.env.TEST_FILE_PATH;

app.get("/", (req, res) => {
  res.send("CA1 VM deployment via Cloud Build is LIVE");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Show Cloud Storage file content
app.get("/storage", (req, res) => {
  if (!filePath) {
    return res.status(500).send("Storage file path not set");
  }

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("Unable to read storage file");
    }
    res.send(`Cloud Storage file content: ${data}`);
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
