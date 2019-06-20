const xlsx2json = require("node-xlsx");
const path = require('path')
exports.readExcel = function readExcel(fileName) {
  return xlsx2json.parse(fileName);
}