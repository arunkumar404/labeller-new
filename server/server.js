const express = require("express");
const app = express();
const cors = require("cors");
const { getFileNames, updateFilesWithNewData } = require("./utils.js");
const path = require("path");
const fs = require("fs/promises");
const { log } = require("console");

app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  const data = [];
  const fileInfos = await getFileNames(
    path.resolve(__dirname, "..", "src", "data", "MUI", "boundingBox")
  );
  for (const fileInfo of fileInfos) {
    const fileContents = await fs.readFile(fileInfo.filePath, "utf-8");
    data.push({ fileName: fileInfo.fileName, ...JSON.parse(fileContents) });
  }
  res.json(data);
});
app.post("/api/changes", async (req, res) => {
  try {
    await updateFilesWithNewData(
      path.resolve(__dirname, "..", "src", "data", "MUI", "boundingBox"),
      req.body
    );
    res.json({ status:200,message: "Data saved successfully" });
  } catch (err) {
    res.json({ status:500,message: "There was an error while saving the data" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
