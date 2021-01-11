/*
用于辅助工具代码的编写
实现的功能有：
①距离的测量
②面积的测量
③三维显示区块地物的分类

相关符号来源
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
 */

//获得鼠标绘制工具权限
var mouseTool = new AMap.MouseTool(map);

//距离测量的工具
function activateRulerTool(){
    console.log('激活距离工具')
    log.info('距离量测工具激活')
    drawMarks('ruler')
}

//面积测量工具
function activateAreaMeasure() {
    log.info('面积测量工具激活')
    drawMarks('areaMeasure')
}

//关闭所有辅助结果
function closeToolMarks() {
    log.info('已清除图上工具标记')
    mouseTool.close(true)//清除鼠标绘制图形
    map.clearMap();//清除标记符号
    buildingLayers.hide();//隐藏建筑渲染
    map.setPitch(1)//恢复视角-上帝视角
    map.setRotation(0)//正面视角
    object3Dlayer.remove(wall)//移除三维墙体
}

//图上绘制
function drawMarks(type){
    switch(type){
        case 'ruler':{
            mouseTool.rule({
                startMarkerOptions : {//起点的图标设置
                    icon: new AMap.Icon({
                        size: new AMap.Size(35, 35),//图标大小
                        imageSize:new AMap.Size(35, 35),
                        image: "./images/go.png"
                    }),
                    offset: new AMap.Pixel(-17, -35)
                },
                endMarkerOptions : {//终点的图标设置
                    icon: new AMap.Icon({
                        size: new AMap.Size(35, 35),//图标大小
                        imageSize:new AMap.Size(35, 35),
                        image: "./images/end.png"
                    }),
                    offset: new AMap.Pixel(-19, -37)
                },
                midMarkerOptions : {//可中间部分
                    icon: new AMap.Icon({
                        size: new AMap.Size(35, 35),//图标大小
                        imageSize:new AMap.Size(35, 35),
                        image: "./images/mid.png"
                    }),
                    offset: new AMap.Pixel(-19, -37)
                },
                lineOptions : {//线颜色
                    strokeStyle: "solid",
                    strokeColor: "#8B0000",
                    strokeOpacity: 1,
                    strokeWeight: 3
                }
            });
            break;
        }
        case 'areaMeasure':{
            mouseTool.measureArea({
                strokeColor:'#8B0000',
                fillColor:'#80d8ff',
                fillOpacity:0.3
                //同 Polygon 的 Option 设置
            });
            break;
        }
    }
}

//三维罗盘
var tDcontrolBar=new AMap.ControlBar({
    showZoomBar:false,
    showControlButton:true,
    position:{
        left:'0px',
        top:'10px'
    }
})
map.addControl(tDcontrolBar);

//三维地块建筑群代码编辑
var buildingLayers=new AMap.Buildings({zIndex:130,merge:false,sort:false,zooms:[17,20]});
var options={
    hideWithoutStyle:false,//是否隐藏设定区域外的楼块
    areas:[{ //围栏1
        visible:true,//是否可见
        rejectTexture:true,//是否屏蔽自定义地图的纹理
        color1: 'FFFF7F00',//楼顶颜色
        color2: 'ffffcc00',//楼面颜色'ffffcc00'
        //文娱区
        path: [[116.348482,39.98894],[116.348262,39.990403],[116.345403,39.990334],[116.345349,39.991073],[116.344786,39.991057],[116.344732,39.992068],[116.345515,39.992138],[116.34559,39.991427],[116.345676,39.991016],[116.348321,39.991098],[116.351191,39.991127],[116.351223,39.990477],[116.351121,39.990428],[116.351142,39.989499],[116.350611,39.989479],[116.350622,39.989006],[116.349667,39.988957],[116.348482,39.98894]]
    }, { //围栏2
        color1: 'FF4D4DFF',
        color2: 'FF38B0DE',
        //教学区
        path: [[116.353036,39.98908],[116.350654,39.988998],[116.350638,39.989446],[116.351325,39.98954],[116.351271,39.990535],[116.351239,39.991164],[116.34883,39.991135],[116.348814,39.992475],[116.349485,39.992491],[116.349458,39.993141],[116.350697,39.993165],[116.351904,39.993174],[116.35192,39.992919],[116.352108,39.992906],[116.352108,39.992779],[116.352838,39.992767],[116.352934,39.991267],[116.35302,39.98984],[116.353036,39.98908]
        ]
    },{ //围3
        color1: 'FF6B8E23',
        color2: 'FF32CD32',
        //生活区（学生）
        path:[[116.348251,39.993112],[116.347361,39.993046],[116.347382,39.992742],[116.344786,39.992738],[116.344748,39.992084],[116.345606,39.992187],[116.345633,39.991628],[116.345773,39.991057],[116.348294,39.991147],[116.348664,39.991151],[116.348696,39.991591],[116.348761,39.991628],[116.348718,39.992512],[116.349469,39.99252],[116.349453,39.993087],[116.348541,39.993108],[116.348251,39.993112]]
    },{//围4
        color1: 'FFBC1717',
        color2: 'FFCC3299',
        //家属区
        path:[[116.343509,39.991028],[116.343461,39.992952],[116.347264,39.993058],[116.347285,39.992841],[116.344668,39.992721],[116.344727,39.991069],[116.344024,39.99104]]
    }
    ]};

buildingLayers.setStyle(options); //此配色优先级高于自定义mapStyle
var teachPolygon;
var stuPolygon;
var funPolygon;
var familyMemberPolygon;


//设置地块区面的颜色分类
function addPolygonBuiding() {
    //文娱区地块（健身、公园之类）
    funPolygon=new AMap.Polygon({
        bubble:true,//浮于表面
        fillColor: '#f5a623',//橙色
        fillOpacity:0.5,//透明度
        strokeWeight:1,//线宽
        path:options.areas[0].path,//对应范围
        map:map
    })
    //教学区地块
    teachPolygon=new AMap.Polygon({
        bubble:true,
        fillColor:'#7aa7df',
        fillOpacity:0.5,
        strokeWeight:1,
        path:options.areas[1].path,
        map:map
    })
    //学生生活区地块
    stuPolygon=new AMap.Polygon({
        bubble:true,
        fillColor:'#5ca00d',
        fillOpacity:0.5,
        strokeWeight:1,
        path:options.areas[2].path,
        map:map
    })
    //家属区地块
    familyMemberPolygon=new AMap.Polygon({
        bubble:true,
        fillColor:'#ba172a',
        fillOpacity:0.5,
        strokeWeight:1,
        path:options.areas[3].path,
        map:map
    })

}

//设置显示三维视角，并激活三维区块的显示
function set3DMap() {
    //设置观察显示的style
    buildingLayers.setMap(map);
    map.setRotation(0)
    setZoomToCUGB()
    map.setPitch(30);//设置视角
    //激活地物区块的显示
    buildingLayers.show();
    addPolygonBuiding();
    log.info('蓝色：教学区；绿色：生活区'+'</br>'+'橙色：文娱区；红色：家属区')
}



//设置三维边界的代码片段
var object3Dlayer = new AMap.Object3DLayer({ zIndex: 1 });
map.add(object3Dlayer);//给地图添加三维地物
//地大经纬坐标集合
var schoolArr =
    [
        [116.348251, 39.993102],
        [116.351926, 39.993201],
        [116.351926, 39.992901],
        [116.352076, 39.992901],
        [116.352108, 39.992769],
        [116.352881, 39.992798],
        [116.353069, 39.989091],
        [116.348369, 39.988918],
        [116.348251, 39.990402],
        [116.345387, 39.990345],
        [116.345344, 39.991064],
        [116.343488, 39.991031],
        [116.343461, 39.992942],
        [116.346631, 39.993057]
    ];

var shcoolWall=[];
for (var i=0;i<schoolArr.length;i++){
    shcoolWall.push(new AMap.LngLat(schoolArr[i][0],schoolArr[i][1],true))//获得经纬度数组
}
//激活墙面
var wall = new AMap.Object3D.Wall({
    path:shcoolWall,
    height: 300,//高度
    color: '#2afae1'//rgba颜色编码
});
wall.backOrFront = 'both';//墙双面
wall.transparent = true;//透明

function setWall() {
    object3Dlayer.add(wall);
    log.info('已添加三维墙面边界线')
}



