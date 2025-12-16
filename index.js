const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Injected by Cloud Build
const secret = process.env.DEMO_SECRET || "SECRET_NOT_SET";
const filePath = process.env.TEST_FILE_PATH;

app.get("/", (req, res) => {
  res.send(`
    <h2>CA1 VM Deployment</h2>
    <p><strong>Secret:</strong> ${secret}</p>
  `);
});

app.get("/storage", (req, res) => {
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
