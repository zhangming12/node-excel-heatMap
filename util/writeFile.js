const fs = require("fs");

exports.writeFile = function writeFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${fileName}`, data, {
      'flag': 'a'
    }, err => {
        err ? reject(err) : resolve(`${fileName}文件转换完成`)
    });
  })
}