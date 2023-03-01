const fs = require('node:fs');
const { readFile } = require('node:fs/promises');

const readFromFile = readFile;

const writeToFile = (filePath, data) =>
    fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${filePath}`)
    );

const appendToFile = (filePath, jsObj) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const jsDataList = JSON.parse(data);
            jsDataList.push(jsObj); 
            writeToFile(filePath, jsDataList);
        }
    });
};

module.exports = { readFromFile, writeToFile, appendToFile };