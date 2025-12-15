const express = require("express");
const { Storage } = require("@google-cloud/storage");

const app = express();
const PORT = process.env.PORT || 3000;

const storage = new Storage();
const BUCKET_NAME = "ca1vm-storage";

app.get("/", (req, res) => {
  res.send("CA1 VM deployment via Cloud Build is LIVE 🚀");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/storage", async (req, res) => {
  try {
    const bucket = storage.bucket(BUCKET_NAME);
    const file = bucket.file(`demo-${Date.now()}.txt`);

    await file.save(
      "This file was created by the CA1 VM via Cloud Storage integration."
    );

    res.send("✅ File successfully written to Google Cloud Storage");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to write to Cloud Storage");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
