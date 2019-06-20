const fs = require("fs");

exports.writeFile = function writeFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${fileName}`, data, {
      'flag': 'a'
    }, err => {
      if (err) {
        reject(err)
        return
      }
      resolve(`${fileName}文件转换完成`)
    });
  })
}