/**
 * 命令参数说明
 * node app.js FILE_PATH FILE_NAME AREA_NAME
 * @param {String} FILE_PATH 要处理的excel文件的相对地址
 * @param {String} FILE_NAME 要输出的html的文字名
 * @param {String} AREA_NAME 要画边框的省分名字
 * @example node app.js ./aaa.xlsx demo.html 湖北省
 */
const argv = process.argv
if (argv.length < 4) {
  console.log('请指定待处理的文件地址和输出的文件名')
  return
}

const FILE_NAME = argv[3];
const FILE_PATH = argv[2];
const AREA_NAME = argv[4] ? argv[4] : ''

const startTime = Date.now()
const { writeFile } = require('./util/writeFile')
const { readExcel } = require('./util/readExcel')
const { handleData } = require('./tools/handleData')
console.log("数据处理中，请稍候...")
let dataLen = {
  count:0
}

readExcel(FILE_PATH).then(excelData => {
  return handleData(excelData, dataLen, AREA_NAME)
}).then(data => {
  writeFile(FILE_NAME, data).then(msg => {
    console.log(msg)
    console.log(`处理了：${dataLen.count}条数据，耗时：${Date.now() - startTime}ms`)
  }).catch(err => {
    console.error(err)
  })
})
.catch(() => {
  console.error(`生成失败，请检查文件是否存在，excel文件格式是否正确`)
})

