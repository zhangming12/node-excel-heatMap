const {
  markerMapTemplate
} = require('../util/getMarkerMapTemplate')
const INDEXMAP = {
  lIndex: "locate",
  cIndex: 'count',
  sIndex: 'store_name'
}
//获取index
function getIndex(firstArr) {
  let lIndex = null,
    cIndex = null;
  firstArr.forEach((val, i) => {
    if (val == INDEXMAP.lIndex) lIndex = i
    if (val == INDEXMAP.cIndex) cIndex = i
    if (val == INDEXMAP.sIndex) sIndex = i
  })
  return {
    cIndex,
    lIndex,
    sIndex
  }
}
// 处理数据
exports.handleData = function handleData(excelData, dataLen, AREA_NAME) {
  let listData = excelData[0].data
  let {
    lIndex,
    sIndex
    // cIndex
  } = getIndex(listData.shift())
  let arr1 = [];

  listData.forEach(item => {
    let obj = {}
    let str = item[lIndex].split(',')
    obj['lng'] = str[1]
    obj['lat'] = str[0]
    obj['storeName'] = item[sIndex]
    arr1.push(obj)
    dataLen.count++
  })
  console.log(arr1, AREA_NAME)
  return markerMapTemplate(`var pointes = ${JSON.stringify(arr1)}`, AREA_NAME)
}
