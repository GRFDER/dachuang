/**
 *
 * 用于实现显示搜索项目中的各类功能
 * ①周边搜索（关键词+范围+提示词）
 * ②天气搜索
 * ③可以试试交通搜索？——事实证明没必要
 */


AMap.service(["AMap.PlaceSearch"]);//获取搜索的权限
var placeSearch;
var circleAll=[];//搜索范围的图上渲染集合，便于后续的清除

function clickToSearch(){
    var content1=document.getElementById("search_line").value;//关键词
    var content2=document.getElementById("search_line2").value;//范围大小

    console.info(content1+content2)

    map.clearLimitBounds();
    log.info('已取消显示范围限制，以获得任意视角');

    placeSearch = new AMap.PlaceSearch({
        pageSize: 5, // 单页显示结果条数
        pageIndex: 1, // 页码
        city: "010", // 兴趣点城市，即北京
        citylimit: true,  //是否强制限制在设置的城市内搜索
        map: map, // 展现结果的地图实例
        panel: "searchPanel", // 结果列表将在此容器中进行展示。
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
    });
    //设置bounds或者polygon才行必须的！！！！！！！！！！！！！！！！！！！！！！！！

    var circle = new AMap.Circle({
        center: [116.34839,39.991072],
        radius: content2, //半径
        strokeColor: "#FF33FF", //线颜色
        strokeOpacity: 0.2, //线透明度
        strokeWeight: 3,    //线宽
        fillColor: "#1791fc", //填充色
        fillOpacity: 0.25//填充透明度
    });
    //将圆在地图上显示出来,并获得对应的边界范围
    circleAll.push(circle)
    map.add(circleAll)
    var tmpBounds=circle.getBounds();
    // 缩放地图到合适的视野级别
    map.setFitView([ circle ]);
    //多边形+关键词搜索
    //console.info('圆搜索+关键词');
    //问题在于bounds为一个矩形，并非一个完整的圆
    placeSearch.searchInBounds(content1, tmpBounds);
}
//清除图上的搜索显示痕迹
function closeSearch(){
    console.info('删除搜索');
    if (circleAll.length!==0) {
         placeSearch.clear();//删除搜索信息
         map.remove(circleAll);//移除圆范围
         circleAll.splice(0,circleAll.length);//移除符号元素组内的所有符号
        log.info('已清除搜索的要素')
    }
    if (weatherInfoWin.getIsOpen()) {
        weatherInfoWin.close();
        log.info('已清除天气显示')
    }
}

var weatherInfoWin;

//显示实时的天气
function showWeather(webMap) {
    AMap.plugin('AMap.Weather', function () {
        var weather = new AMap.Weather();
        //查询实时天气信息
        weather.getLive('海淀区', function (err, data) {
            if (!err) {
                var str = [];
                str.push('<h4 >实时天气' + '</h4><hr>');
                str.push('<p>城市/区：' + data.city + '</p>');
                str.push('<p>天气：' + data.weather + '</p>');
                str.push('<p>温度：' + data.temperature + '℃</p>');
                str.push('<p>风向：' + data.windDirection + '</p>');
                str.push('<p>风力：' + data.windPower + ' 级</p>');
                str.push('<p>空气湿度：' + data.humidity + '</p>');
                str.push('<p>发布时间：' + data.reportTime + '</p>');

                weatherInfoWin = new AMap.InfoWindow({
                    content: '<div class="info" style="position:inherit;margin-bottom:0;">' + str.join('') + '</div><div class="weather"></div>',
                    isCustom: true,
                    offset: new AMap.Pixel(0, -37)
                });
                weatherInfoWin.open(webMap,[116.34839,39.991072]);//天气信息窗口打开位置
            }
        });
    });
}
//显示四日内的天气预报
function showForecast(webMap){
    AMap.plugin('AMap.Weather', function () {
        var weather = new AMap.Weather();
        //未来4天天气预报
        weather.getForecast('海淀区', function(err, data) {
            if (err) {return;}
            var str = [];
            for (var i = 0,dayWeather; i < data.forecasts.length; i++) {
                dayWeather = data.forecasts[i];
                str.push('日期：'+dayWeather.date+' <p class="weather">'+'大气状况：'+dayWeather.dayWeather +'   温度：'+ dayWeather.nightTemp + '~' + dayWeather.dayTemp + '℃'+'</p> ');
            }
            weatherInfoWin = new AMap.InfoWindow({
                content: '<div class="info" style="position:inherit;margin-bottom:0;">' + str.join('') + '</div><div class="weather"></div>',
                isCustom: true,
                offset: new AMap.Pixel(0, -37)
            });
            weatherInfoWin.open(webMap, [116.34839,39.991072]);
        });
    });
}