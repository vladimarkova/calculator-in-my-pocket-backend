const fs = require('fs');
const path = require('path');
console.log(`Setting base dir to ${__dirname}`);
const exists = fs.existsSync('./dist/src/index.js');
if (!exists) {
  const message = `No bootstrap file found! Make sure you have successfully compiled the project and ${path.resolve(__dirname, 'dist', 'index.js')} exist!`;
  throw new Error(message);
}

console.log(`Setting base dir to ${__dirname}`);
global.__basedir = __dirname;

require('./dist/src');
