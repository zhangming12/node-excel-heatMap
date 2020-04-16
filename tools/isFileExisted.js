const fs = require('fs')

/**
 * 判断文件是否存在
 * @param {String} fileName //文件路径
 * @returns {Promise}
 */
exports.isFileExisted = function isFileExisted(fileName) {
  return new Promise((resolve, reject) => {
    fs.access(fileName, err => {
      err ? reject(err.message) : resolve();

    })
  })
}