/** This is the data parser that converts a CSV file to JSON format */

const Papa = require('papaparse');
const fs = require('fs');
const process = require('process');

// const API_HOST = 'http://localhost:7070';
const API_HOST = 'https://animalwatch.codingkelvin.fun';

// Read File
const dirPath = process.cwd();
const fileNames = [
  'BJUT-CATS-benbu.csv',
  'BJUT-CATS-tongzhou.csv',
  'BJUT-CATS-zhonglan.csv',
];

// Main
(async () => {
  const data = await parse();
  await removeAllCats();
  await writeIntoDB(data);
})();

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

// Write Data into DB
async function writeIntoDB(cats) {
  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    await fetch(`${API_HOST}/api/cats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cat),
    });
    console.log(cat);
  }
  console.log('DONE');
}

// Remove All Cats
async function removeAllCats() {
  await fetch(`${API_HOST}/api/cats`, {
    method: 'DELETE',
  });
  console.log('All Cats Removed');
}
