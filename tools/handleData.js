const { heatMapTemplate } = require('../util/getHeatMapTemplate')
const INDEXMAP = {
  lIndex: "locate",
  cIndex: 'count'
}
//获取index
function getIndex(firstArr) {
  let lIndex = null, cIndex = null;
  firstArr.forEach((val, i) => {
    if (val == INDEXMAP.lIndex) lIndex = i
    if (val == INDEXMAP.cIndex) cIndex = i
  })
  return {
    cIndex, lIndex
  }
}
 // 处理数据
exports.handleData = function handleData(excelData, dataLen, AREA_NAME) {
  let listData = excelData[0].data
  let { lIndex, cIndex } = getIndex(listData.shift())
  let arr1 = [];

  listData.forEach(item => {
    let obj = {}
    let str = item[lIndex]
    if(str) {
      str = str.split(',')
      obj['lng'] = str[1]
      obj['lat'] = str[0]
      obj['count'] = item[cIndex] || 1
      arr1.push(obj)
      dataLen.count++
    }

  })

  return heatMapTemplate(`var points = ${JSON.stringify(arr1)}`, AREA_NAME)
}
