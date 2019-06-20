const FILE_NAME = 'map1.html';
const FILE_PATH = './aaa.xlsx'
const AREA_NAME = '湖北省'



const INDEXMAP = {
    lIndex: "locate",
    cIndex: 'count'
}

const startTime = Date.now()
const { writeFile } = require('./util/writeFile')
const { readExcel } = require('./util/readExcel')
const { heatMapTemplate } = require('./util/getHeatMapTemplate')

console.log("数据处理中，请稍候...")
let excelData = readExcel(FILE_PATH);
let dataLen = 0
writeFile(FILE_NAME, handleData(excelData)).then(msg => {
    console.log(msg)
    console.log(`处理了：${dataLen}条数据，耗时：${Date.now() - startTime}ms`)
}).catch(err => {
    console.error(err)
})
// 处理数据
function handleData(excelData) {
    let listData = excelData[0].data
    let { lIndex, cIndex } = getIndex(listData.shift())
    let arr1 = []
    listData.forEach(item => {
        let obj = {}
        let str = item[lIndex].split(',')
        obj['lng'] = str[1]
        obj['lat'] = str[0]
        obj['count'] = item[cIndex]
        arr1.push(obj)
        dataLen++
    })
    return heatMapTemplate(`var points = ${JSON.stringify(arr1)}`, AREA_NAME)
}

//获取index
function getIndex(firstArr) {
    let lIndex = null,cIndex = null;
    firstArr.forEach((val,i) => {
        if (val == INDEXMAP.lIndex) lIndex = i
        if (val == INDEXMAP.cIndex) cIndex = i
    })
    return {
        cIndex, lIndex
    }
}