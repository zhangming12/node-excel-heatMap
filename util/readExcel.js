const { isFileExisted } = require('../tools/isFileExisted')
const xlsx2json = require("node-xlsx");
exports.readExcel = function readExcel(fileName) {
  return isFileExisted(fileName).then(() => {
    console.log(`find ${fileName}`)
    return xlsx2json.parse(fileName)
  }).catch((err) => {
    console.error(err)
    console.log(`not find ${fileName}`)
  })
}

