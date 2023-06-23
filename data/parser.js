/** This is the data parser that converts a CSV file to JSON format */

const Papa = require('papaparse')
const fs = require('fs')
const process = require('process')

let data = []

// Read File
const dirPath = process.cwd()
const fileName = 'BJUT-CATS-cats.csv'
const fileContent = fs.readFileSync(`${dirPath}/data/${fileName}`, 'utf-8')

// Parse File
Papa.parse(fileContent, {
  header: true,
  dynamicTyping: true,
  complete: (result) => {
    data = result.data.filter((cat) => cat.Name != null)
    writeIntoFile(`${dirPath}/data/dataString.js`, data)
    console.log(data)
  },
})

// Write File

function writeIntoFile(filePath, jsonObj) {
  const content = JSON.stringify(jsonObj)
  fs.writeFileSync(filePath, `export default '${content}'`, 'utf-8')
}
