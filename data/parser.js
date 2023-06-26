/** This is the data parser that converts a CSV file to JSON format */

const Papa = require('papaparse');
const fs = require('fs');
const process = require('process');

// Read File
const dirPath = process.cwd();
const fileNames = [
  'BJUT-CATS-benbu.csv',
  'BJUT-CATS-tongzhou.csv',
  'BJUT-CATS-zhonglan.csv',
];

parse().then((data) => {
  console.log(data);
  writeIntoFile(`${dirPath}/data/dataString.js`, data);
});

// Parse all file
async function parse() {
  let data = [];
  for (let i = 0; i < fileNames.length; i++) {
    const fileName = fileNames[i];
    const fileContent = fs.readFileSync(`${dirPath}/data/${fileName}`, 'utf-8');
    const result = await toJson(fileContent);
    const filtered = result.filter((cat) => cat.name != null);
    data = [...data, ...filtered];
  }
  return data;
}

// Parse .csv to JSON
function toJson(file) {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete(results) {
        resolve(results.data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

// Write File
function writeIntoFile(filePath, jsonObj) {
  const content = JSON.stringify(jsonObj);
  fs.writeFileSync(filePath, `export default '${content}'`, 'utf-8');
}
