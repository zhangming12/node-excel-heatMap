/**
 * 打点地图 模板
 * @param {Array} data 源数据
 * @param {Array} markerObj 点击点 显示的数据集合
 * 
 * @param {String} areaName 边界区域
 */
// markerObj = [
//   {
//     title: '姓名',
//     key: 'name'
//   }
// ]
exports.markerMapTemplate = function heatMapTemplate(data, areaName) {
  console.log(data)
  return `<!DOCTYPE html>
<html lang="en">

<head>
  <!DOCTYPE html>
  <html>

  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <script src="http://api.map.baidu.com/api?v=2.0&ak=wB4K1krhWQEB3rdX5xVAr5h8QcTbj7OV"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
    <title>打点</title>
    <style type="text/css">
      ul,
      li {
        list-style: none;
        margin: 0;
        padding: 0;
        float: left;
      }

      html {
        height: 100%
      }

      body {
        height: 100%;
        margin: 0px;
        padding: 0px;
        font-family: "微软雅黑";
      }

      #container {
        height: 100%;
        width: 100%;
      }

      #r-result {
        width: 100%;
      }
    </style>
  </head>

<body>
  <div id="container"></div>
</body>

</html>
<script type="text/javascript">
  // pointes 点的位置信息
  ${data}
  var map = new BMap.Map("container"); // 创建地图实例

  var point = new BMap.Point(
    Number(113.46409335134084),
    Number(23.012171972775036)
  ); // 创建点坐标

  map.centerAndZoom(point, 12); // 设置地图的中心点 以及 大小级别
  getBoundary('${areaName}');


  // 画边界
  function getBoundary(areaName) {
    if (!areaName) return
    var bdary = new BMap.Boundary();
    bdary.get(areaName, function (rs) { //获取行政区域
      var count = rs.boundaries.length; //行政区域的点有多少个
      for (var i = 0; i < count; i++) {
        var ply = new BMap.Polygon(rs.boundaries[i], {
          strokeWeight: 2, //设置多边形边线线粗
          strokeOpacity: 1, //设置多边形边线透明度0-1 
          fillOpacity: 0.15,
          fillColor: "#ffffff",
          StrokeStyle: "solid", //设置多边形边线样式为实线或虚线，取值 solid 或 dashed
          strokeColor: "#ff0000", //设置多边形边线颜色 
        }); //建立多边形覆盖物 
        map.addOverlay(ply); //添加覆盖物
        map.setViewport(ply.getPath()); //调整视野 
        map.centerAndZoom(point, 8); // 初始化地图，设置中心点坐标和地图级别
      }
    });
  }
  function addMarker(points) {
    //循环建立标注点
    for (let i = 0, pointsLen = points.length; i < pointsLen; i++) {
      let thePoint = points[i];
      let point = new BMap.Point(thePoint.lng, thePoint.lat); //将标注点转化成地图上的点
      let marker = new BMap.Marker(point); //将点转化成标注点
      map.addOverlay(marker);  //将标注点添加到地图上
      // addTextLabel(marker, thePoint); // 给标注点添加文字信息
      
      //添加监听事件
      // (function () {
      //   marker.addEventListener("click",
      //     //显示信息的方法
      //     function () {
      //       showInfo(this, thePoint);
      //     });
      // })();
    }
  }

  // function addTextLabel(marker,point) {
  //   var label = new BMap.Label(point.storeName, { offset: new BMap.Size(20, 15) }); // 创建文字
  //   label.setStyle({
  //     color: "black",
  //     fontSize: "12px",
  //     height: "20px",
  //     lineHeight: "20px",
  //     fontFamily: "微软雅黑",
  //     border: "none",
  //   });
  //   marker.setLabel(label);
  // }
  addMarker(pointes);
  function showInfo(thisMarker, point) {
    //获取点的信息
    var sContent = getsContent(markerObj, point)
    // var sContent = 
    //     '<div>店铺名称：$ {point.storeName}</div> 
    //     <div>店主姓名: $ {point.name}</div> 
    //     <div>店铺地址：$ {point.address}</div>'
  var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
  thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
  }
  function getsContent(arr, point) {
    let sContent = ""
    arr.forEach(item => {
      sContent += '<div>'+ item.title+':' + point[item.key] +'</div>'
    })
    return sContent
  }
  map.enableScrollWheelZoom(true); 
  </script> </body>
  </html>`
}