const express = require("express");
const app = express();
const cors = require("cors");
const {
  getFileNames,
  updateFilesWithNewData,
  getDepths,
  updateAllFiles,
} = require("./utils.js");
const path = require("path");
const fs = require("fs/promises");

app.use(cors());
app.use(express.json());

app.get("/api/data", async (req, res) => {
  const depths = await getDepths("../src/data/fuse/index.json");
  const data = [];
  const fileInfos = await getFileNames(
    path.resolve(__dirname, "..", "src", "data", "fuse", "boundingBox")
  );
  for (const fileInfo of fileInfos) {
    try {
      const fileContents = await fs.readFile(fileInfo.filePath, "utf-8");
      data.push({
        fileName: fileInfo.fileName,
        depth: depths[fileInfo.fileName],
        ...JSON.parse(fileContents),
      });
    } catch (err) {
      console.error('Error reading file:', err);
      continue;
    }
  }
  res.json(data);
});
app.post("/api/changes", async (req, res) => {
  try {
    await updateFilesWithNewData(
      path.resolve(__dirname, "..", "src", "data", "fuse", "boundingBox"),
      req.body
    );
    
    await updateAllFiles(
      path.resolve(__dirname, "..", "src", "data"),
      req.body
    );

    res.json({ status: 200, message: "Data saved successfully" });
  } catch (err) {
    res.json({
      status: 500,
      message: "There was an error while saving the data",
      error: err.message,
    });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

