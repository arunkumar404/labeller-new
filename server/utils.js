const fs = require("fs/promises");
const path = require("path");

const getFileNames = async (dirPath) => {
  try {
    const fileNames = await fs.readdir(dirPath);
    const fileInfos = fileNames.map((fileName) => {
      return {
        fileName: fileName.replace(".json", ""),
        filePath: path.join(dirPath, fileName),
      };
    });
    return fileInfos;
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
};

const updateFilesWithNewData = async (dirPath, newDataArray) => {
  try {
    const fileNames = await fs.readdir(dirPath);
    for (const fileName of fileNames) {
      const filePath = path.join(dirPath, fileName);
      const parsedJson = JSON.parse(await fs.readFile(filePath, "utf8"));

      const fileNameWithoutExt = fileName.replace(".json", "");
      for (const newData of newDataArray) {
        if (newData.fileName === fileNameWithoutExt) {
          parsedJson.component = newData.component;
          parsedJson.layout = newData.layout;
        }
      }

      await fs.writeFile(filePath, JSON.stringify(parsedJson));
    }
  } catch (err) {
    console.log(err);
  }
};
module.exports = { getFileNames, updateFilesWithNewData };
