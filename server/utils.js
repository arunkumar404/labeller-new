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
        } else if ( newData.classNames === parsedJson.classNames && newData.elementType === parsedJson.elementType ){
          console.warn({
            parsedJson,
            filePath
          })
          parsedJson.component = newData.component;
        }
      }

      await fs.writeFile(filePath, JSON.stringify(parsedJson));
    }
  } catch (err) {
    console.log(err);
  }
};

const updateAllFiles = async (dirPath, newDataArray) => {
  try {
    const fileNames = await fs.readdir(dirPath);
    const fileInfos = fileNames.map(async(fileName) => {
      return await updateFilesWithNewData(path.resolve(dirPath, fileName, "boundingBox"), newDataArray)
    })
    return await Promise.all(fileInfos);
  } catch (err) {
    console.log(err);
  }
};

const getDepths = async (filePath) => {
  let tree;
  function computeDepths(tree) {
    const depths = {};
    function dfs(node, depth) {
      depths[node] = depth;
      for (const child of tree[node].children) {
        dfs(child, depth + 1);
      }
    }

    for (const node in tree) {
      if (tree[node].parent === "") {
        dfs(node, 0);
      }
    }

    return depths;
  }
  const temp = await fs.readFile(filePath, "utf-8");
  tree = JSON.parse(temp);
  const depths = computeDepths(tree);
  return depths;
};


const depthFirstTraversal = (parentChildObj, parentKey, resultArray, isRoot=false) => {
  if (!isRoot) { 
    resultArray.push(parentKey);
  }
  const children = parentChildObj[parentKey].children;

  for (const child of children) {
    depthFirstTraversal(parentChildObj, child, resultArray);
  }
}

const getOrderArray = async (hierarchyFilePath) => {
  
  const temp = await fs.readFile(hierarchyFilePath, "utf-8");

  const parentChildObj = JSON.parse(temp)

  const resultArray = [];

  for (const key in parentChildObj) {
    if (parentChildObj.hasOwnProperty(key) && !parentChildObj[key].parent) {
      depthFirstTraversal(parentChildObj, key, resultArray,true);
    }
  }

  return resultArray;
}


module.exports = { getFileNames, updateFilesWithNewData, getDepths, updateAllFiles,getOrderArray };

