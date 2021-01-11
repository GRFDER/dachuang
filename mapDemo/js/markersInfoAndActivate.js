/*此js用于创建所有的点标记详细弹窗信息，须在调用前加载完成！！！！！！！！！！！
* 总共分成了3个部分
* 1：teachBuildInfo
* 2：stuBuildInfo
* 3：funBuildInfo
* 分别加以实现，注意对应的循序*/
//存储位置数据的集合,理论包含了教学楼、生活区、娱乐区
var markers=[];
//执行预设函数
teachBuildInfo();
//添加多个教学楼点标记
// const techPosition = [
//     [116.352628, 39.989375],//南翼楼
//     [116.352065, 39.990928],//实验楼
//     [116.351582, 39.990116],//教五楼
//     [116.350991, 39.989187],//测试楼
//     [116.35229, 39.991435],//教三楼
//     [116.350734, 39.991374],//教四楼
//     [116.351431, 39.991826],//教2楼
//     [116.351512, 39.992726],//教一楼
//     [116.350562, 39.992266],//综合楼
//     [116.350262, 39.992775],//科研楼
//     [116.349908, 39.992422],//教12
//     [116.349704, 39.991756],//图书馆
//     [116.349039, 39.992257],//教14
// ];//13个
//实现所有教学楼信息接口
function teachBuildInfo(){
    teachInfo=[
        {
            x:116.352628,y: 39.989375,titles:'马克思主义学院&南翼楼&教10楼',
            txt:"<img src='https://taojin-his.cdn.bcebos.com/8b13632762d0f703c0fa794c0bfa513d2797c5d2.jpg' alt='教10楼' height='80%' width='50%'/>教10楼主要用于马克思主义学院的教学，非马院学生交作业的场所<br/>"
            +"特点：用于自行前往交相关的作业<br/>"
            +"<a href='http://www.sm.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教10楼
        {
            x:116.352065,y: 39.990928,titles:'实验楼&逸夫楼&地质化石馆',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18090226k49o.png' alt='实验楼' height='80%' width='50%'/>实验楼是cugb地质化石馆的所在点，内部装修豪华，有诸多高精密的仪器设备，本科生接触机会少，但进出容易<br/>"
                +"特点：地大对外的牌面大楼，看起来很高端<br/>"
                +"<a href='https://www.cugb.edu.cn/xyfg2/39103.jhtml' target='_blank'>详细信息</a>"
        },//实验
        {
            x:116.351582,y: 39.990116,titles:'教五楼&外国语学院&地球物理与信息技术学院',
            txt:"<img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1667102040,1937406923&fm=26&gp=0.jpg' alt='教五楼' height='60%' width='50%'/>教五楼是地大保留的’古‘建筑之一，内部经过了多次装修，负一楼有打印店<br/>"
                +"特点：大一学年英语课集中教学的地方，周围环境较好，近期地信院转来至此<br/>"
                +"<a href='http://www.sfl.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教五
        {
            x:116.350991,y:39.989187,titles:'测试楼&能源学院&材料科学与工程学院',
            txt:"<img src='https://imgsa.baidu.com/forum/w%3D580/sign=69911da9e824b899de3c79305e071d59/3af3992bd40735faa76479109f510fb30d2408e9.jpg' alt='实验楼' height='80%' width='50%'/>实验楼是能源、石油等本科学生学习专业课程，进行实验操作的地方<br/>"
            +"特点：隐蔽，工科学子实验产生，一般情况接触机会较少<br/>"
            +"<a href='http://www.smst.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//测试楼
        {
            x:116.35229,y:39.991435,titles: '教三楼&信息工程学院&数理学院',
            txt: "<img src='https://lbsugc.cdn.bcebos.com/images/H6a63f6246b600c33433794311c4c510fd8f9a1f9.jpg' alt='教三楼' height='90%' width='50%'/>教三楼如同其它学院的楼层一样，外貌普通，但内部别有洞天，是机器人、ACM等各类信工竞赛组织的大本营<br/>"
            +"特点：内有大型自习室和开会场所，有少许学术交流茶吧，常有大佬凌晨出没‘也是GIS专业所在地’<br/>"
            +"<a href='http://www.sie.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教三楼
        {
            x:116.350734,y:39.991374,titles: '教四楼&人文经管学院',
            txt: "<img src='https://taojin-his.cdn.bcebos.com/4034970a304e251f4e4e0868a486c9177e3e53e1.jpg' alt='教四楼' height='80%' width='50%'/>教四楼是人文景观学院所在地，正面即是体育场和学校的贯穿主干道，春秋季景色宜人<br/>"
            +"特点：内有大型自习室，非专业人员接触机会极少<br/>"
            +"<a href='http://www.sem.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教四楼
        {
            x:116.351431,y:39.991826,titles: '教二楼&地球科学与资源学院',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/180922575h3x.png' alt='教二楼' height='80%' width='50%'/>教二楼是地球科学与资源学院所在地，位置相对较好，周围空旷，四周被草坪树木环绕<br/>"
            +"特点：内有图书借阅室，借书相对图书馆更为方便<br/>"
            +"<a href='http://www.sesr.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//较二楼
        {
            x:116.351512,y:39.992726,titles: '教一楼&水资源与环境学院',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092231rjjc.png' alt='教一楼' height='80%' width='50%'/>教一楼是水资源与环境学院所在地，与学院路仅一墙之隔，其正前方为秋日公园<br/>"
            +"特点：内含很多自习室，但设备相对较为老旧,志愿活动多在此培训<br/>"
            +"<a href='http://www.swre.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教一楼
        {
            x:116.350562,y:39.992266,titles: '综合楼',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092408goxg.png' alt='综合楼' height='80%' width='50%'/>综合楼是本科生上课学习考试的核心场所，地上9层，地下一层<br/>"
            +"特点：综合楼是诸多本科生自习喜爱的场所，教室宽敞，共有3部电梯，负一层为图书阅览室<br/>"
            +"<a href='https://www.cugb.edu.cn/xyfg2/39114.jhtml' target='_blank'>详细信息</a>"
        },//综合楼
        {
            x:116.350262,y:39.992775,titles: '科研楼&海洋楼',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092041bqqs.png' alt='科研楼' height='60%' width='50%'/>科研楼地上12层，地下3层，上层包含了自习室，教室，机房等，环境较为优秀，且是海洋学院所在地<br/>"
            +"特点：科研楼一层大厅多为考研自习场所，2-4层主要为上课教室，以上均为实验室和机房，负一楼为大型计算机房，负2-3为停车场<br/>"
            +"<a href='http://www.sos.cugb.edu.cn/' target=_blank>详细信息</a>"
        },//科研楼
        {
            x:116.349908,y:39.992422,titles: '教十二&探工楼',
            txt:"<img src='http://yuanxi.cugb.edu.cn/gcjsxy/upload/resources/image/2016/04/28/16969.jpg' alt='教十二' height='80%' width='50%'/>教十二为工程技术学院的所在地，其左侧即为阶梯教室<br/>"
            +"特点：临近工程实验室，接触机会较少<br/>"
            +"<a href='http://www.set.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//教十二
        {
            x:116.349704,y:39.991756,titles: '图书馆',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092159db2y.png' alt='图书馆' height='80%' width='50%'/>图书馆内含大量藏书，但借书难度相对较大<br/>"
            +"特点：环境较好，内含两个大型自习室，且楼内有咖啡厅<br/>"
            +"<a href='https://www.cugb.edu.cn/xyfg2/39110.jhtml' target='_blank'>详细信息</a>"
        },//图书馆
        {
            x:116.349039,y:39.992257,titles: '地质调查楼',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092325azro.png' alt='地质调查楼' height='80%' width='50%'/>地调楼市珠宝学院的所在地，与综合办公楼邻接<br/>"
                +"特点：一般学生接触机会较少，多为珠宝学院学生出入的场所<br/>"
                +"<a href='http://www.sg.cugb.edu.cn/' target='_blank'>详细信息</a>"
        }//教十四
    ]
}

//增加教学区显示与监听
function addTeachListener() {
    for (var i = 0, marker; i < teachInfo.length; i++) {
        var loc = [teachInfo[i].x, teachInfo[i].y];
        marker = new AMap.Marker({
            map: map,
            position: loc,
            icon: myIconBlue,
            offset: new AMap.Pixel(-13, -30),
            teachTitle: teachInfo[i].titles,
            teachContent: teachInfo[i].txt,
        });
        marker.setMap(map);
        markers.push(marker);
        AMap.event.addListener(marker,'click',function (e){
            outputInfo(e.target.w.teachTitle,e.target.w.teachContent,map,e.target)
        })
    }
    log.info(`已添加教学区点标记（蓝色）`);
}


// const stuPostion = [
//         //     [116.348932, 39.99288],//学19
//         //     [116.348052, 39.990724],//16
//         //     [116.347789, 39.991296],//9
//         //     [116.347784, 39.991571],//15
//         //     [116.347977, 39.992068],//29
//         //     [116.347762, 39.992775],//17
//         //     [116.346534, 39.991304],//10
//         //     [116.347081, 39.99176],//留学生
//         //     [116.345128, 39.992496],// 18
//         // ];//9个
//增加学生的生活区

//执行该函数
stuBuildInfo()

function stuBuildInfo(){
    stuInfo=[
        {
            x:116.348932,y:39.99288,titles:'男生宿舍19楼&自习室&购物区',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092614ou7b.png' alt='学19楼' height='80%' width='50%'/>学19楼是一个兼并了男生住宿（3—17层），教学（1-2层），自习室、洗衣房、小超市等区域的多功能中心<br/>"+
                "特点：宿舍+自习+教学+生活四合一<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39118.jhtml' target='_blank'>详细信息</a>"
        },//学19楼
        {
            x:116.348052,y:39.990724,titles:'学16楼',
            txt:"<img src='https://www.dxsbb.com/upFiles/infoImg/2020081242303453.jpg' alt='学16楼' height='80%' width='50%'/>学16楼是男生宿舍之一，靠近体育场和秋日公园<br/>"+
                "特点：宿周围环境相对较好，临近体育场和体育馆<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//16
        {
            x:116.347789,y:39.991296,titles:'学9楼',
            txt:"<img src='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1236566481,716391448&fm=26&gp=0.jpg' alt='学9楼' height='80%' width='50%'/>学9楼是研究生宿舍之一，靠近体育场，前有学校象征之一‘摇篮石’<br/>"+
                "特点：临近体育场，前有摇篮石<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//16
        {
            x:116.347784,y:39.991571,titles:'学15楼',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603864633067&di=8d1529590e6e1549c51a169f231c7503&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1303%2F20%2Fc4%2F19078625_19078625_1363761677837_mthumb.jpg' alt='学9楼' height='80%' width='50%'/>学15楼是女生宿舍之一，前有小广场<br/>"+
                "特点：有小广场，适合晾晒衣物，附近有猫出没<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//16
        {
            x:116.347977,y:39.992068,titles:'学29楼',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1603865049096&di=607a9e4d8844418d0b42f113df3626dc&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1303%2F20%2Fc4%2F19078452_19078452_1363761452868_mthumb.jpg' alt='学29楼' height='80%' width='50%'/>学29楼是女生宿舍之一，前有小广场<br/>"+
                "特点：靠近食堂和夏日广场，实际由1号和2号楼合并而成<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//29
        {
            x:116.347762,y:39.992775,titles:'学17楼',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092516ikq1.jpg' alt='学17楼' height='80%' width='50%'/>学17楼是女生宿舍之一，是地大最豪华的宿舍楼，楼内设备齐全<br/>"+
                "特点：最为现代化的宿舍大楼，内庭院式公寓布局<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39116.jhtml' target='_blank'>详细信息</a>"
        },//17
        {
            x:116.346534,y:39.991304,titles:'学10楼',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604296361376&di=85088287c3d2fcae629723387d53a19c&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1303%2F20%2Fc4%2F19078573_19078573_1363761583118_mthumb.jpg' alt='学10楼' height='80%' width='50%'/>学10楼是女生学生宿舍之一<br/>"+
                "特点：邻近夏日广场和食堂，背靠体育馆<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//10
        {
            x:116.347081, y:39.99176,titles:'留学生楼',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604297065861&di=ce800a29760fd02ad65c60dde232d5ab&imgtype=0&src=http%3A%2F%2Fpic4.zhimg.com%2F50%2Fv2-b393e58df377ae969152e7bdb356d0f8_hd.jpg' alt='留学生楼' height='80%' width='50%'/>留学生宿舍楼供留学生住宿<br/>"+
                "特点：邻近夏日广场和食堂<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//留学生
        {
            x:116.345128, y:39.992496,titles:'学18楼',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092548r7gk.png' alt='学18楼' height='80%' width='50%'/>学18楼是男生宿舍楼之一，位于家属区附近<br/>"+
                "特点：邻近食堂，楼内宿舍含有小阳台，各型设备齐全<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39117.jhtml' target='_blank'>详细信息</a>"
        },//学18
    ]
}

//增加学生生活区显示与监听
function addStuListener() {
    for (var i = 0, marker; i < stuInfo.length; i++) {
        var loc = [stuInfo[i].x, stuInfo[i].y];
        marker = new AMap.Marker({
            map: map,
            position: loc,
            icon: myIconGreen,
            offset: new AMap.Pixel(-13, -30),
            liveTitle: stuInfo[i].titles,
            liveContent: stuInfo[i].txt,
        });
        marker.setMap(map);
        markers.push(marker);
        AMap.event.addListener(marker,'click',function (e){
            outputInfo(e.target.w.liveTitle,e.target.w.liveContent,map,e.target)
        })
    }
    log.info(`已添加生活区点标记（绿色）`);
}

// const funPostion = [
//     [116.346507, 39.991742],//夏日广场
//     [116.347032, 39.992418],//食堂
//     [116.345804, 39.992307],//校医院
//     [116.349983, 39.99003],//运动场
//     [116.346287, 39.990667],//体育馆
//          [116.345198,39.99189]//国际会议中心
//     [116.350557, 39.991826],//秋日
// ];//7个
//点标记的设置

funBuildInfo()

function funBuildInfo() {
    funInfo=[
        {
            x:116.346507, y:39.991742,titles:'夏日广场',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604302049235&di=f94308b2504e3d4739546cf70aed72d8&imgtype=0&src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fwh%3D450%2C600%2Fsign%3D3f0655fb67600c33f02cd6cc2f7c7d39%2Fcefc1e178a82b9011ef555dc7f8da9773812ef81.jpg' alt='夏日广场' height='80%' width='50%'/>夏日广场是供学生进行中小型活动的场所<br/>"+
                "特点：适合举行各类活动，人流量较大的地区<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//夏日广场
        {
            x:116.347032, y:39.992418,titles:'餐饮中心',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18092440vksa.png' alt='餐饮中心' height='80%' width='50%'/>餐饮中心共四层，是学生用餐的中心<br/>"+
                "特点：1-2层为普通食堂，3层为点餐式食堂，4层是可进行集会的餐厅<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39115.jhtml' target='_blank'>详细信息</a>"
        },//食堂
        {
            x:116.345804, y:39.992307,titles:'校医院',
            txt:"<img src='https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=407025830,1418274375&fm=26&gp=0.jpg' alt='校医院' height='80%' width='50%'/>校医院可为学生提供简单的医疗救护，也为附近居民提供医疗帮助<br/>"+
                "特点：校医院内的药价十分便宜，一般为1-2折，外出就医也可在校医处转院报销<br/>"+
                "<a href='http://xyy.cugb.edu.cn/' target='_blank'>详细信息</a>"
        },//校医院
        {
            x:116.349983, y:39.99003,titles:'运动场',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18091715umdw.png' alt='运动场' height='80%' width='50%'/>运动场为学生日常进行体育活动的主要场所，内部设备较为齐全<br/>"+
                "特点：场地较大，篮球场较多，夜间跑步活动的人很多，偶尔会有演唱会或社团活动<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39104.jhtml' target='_blank'>详细信息</a>"
        },//运动场
        {
            x:116.346287, y:39.990667,titles:'体育馆',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/18091831sqd4.png' alt='体育馆' height='80%' width='50%'/>体育馆内健身设备齐全，整体环境较好，其中羽毛球馆和游泳馆最受欢迎<br/>"+
                "特点：地大周边较好的室内运动场所，但需要额外收费，面向学生的价格较低<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39105.jhtml' target='_blank'>详细信息</a>"
        },//体育馆
        {
            x:116.350557, y:39.991826,titles:'秋日公园',
            txt:"<img src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604303551306&di=bda24df211021249f3049afe43df99a1&imgtype=0&src=http%3A%2F%2Fupfile.cuepa.cn%2Fnewspics%2F2017%2F11%2Fs_91adfa9a47ad3c3a56713b107063196a497666.jpg' alt='秋日公园' height='80%' width='50%'/>秋日公园位于体育场一侧，靠近男生宿舍，日常人流量少，适合晨读<br/>"+
                "特点：较为安静，靠近男生宿舍，适合宿舍内学生进行活动<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2.jhtml' target='_blank'>详细信息</a>"
        },//秋日广场
        {
            x:116.345198,y:39.99189,titles:'国际会议中心',
            txt:"<img src='https://www.cugb.edu.cn/u/cms/www/202008/180919561ffp.png' alt='国际会议中心' height='80%' width='50%'/>地大国际会议中心为超大型重要会议的举办场所，不仅是个礼堂，也是个星级酒店<br/>"+
                "特点：装修豪华，整体规模较大，校内学生预订有优惠<br/>"+
                "<a href='https://www.cugb.edu.cn/xyfg2/39107.jhtml' target='_blank'>详细信息</a>"
        },//国际会议中心
    ]
}


//增加娱乐区显示与监听
function addFunListener() {
    for (var i = 0, marker; i < funInfo.length; i++) {
        var loc = [funInfo[i].x, funInfo[i].y];
        marker = new AMap.Marker({
            map: map,
            position: loc,
            icon: myIconRed,
            offset: new AMap.Pixel(-13, -30),
            funTitle: funInfo[i].titles,
            funContent: funInfo[i].txt,
        });
        marker.setMap(map);
        markers.push(marker);
        AMap.event.addListener(marker,'click',function (e){
            outputInfo(e.target.w.funTitle,e.target.w.funContent,map,e.target)
        })
    }
    log.info(`已添加文娱区点标记（红色）`);
}



