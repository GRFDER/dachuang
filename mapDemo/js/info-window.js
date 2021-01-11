/*实现可点击标记符号信息窗口的打开
以及对应信息的显示
和关闭事件
 */


//导引信息的弹窗函数
function outputInfo(title,content,map,marker){
    var infoWindow = new AMap.InfoWindow({
        isCustom: true,  //使用自定义窗体
        content: createInfoWindow(title, content),
        offset: new AMap.Pixel(16, -45)
    });
    //打开窗口
    infoWindow.open(map, marker.getPosition());
}

//构建自定义信息窗体
function createInfoWindow(title, content) {
    var info = document.createElement("div");
    info.className = "custom-info input-card content-window-card";

    //弹窗的宽高
    info.style.width = "350px";
    info.style.height="150px";
    // 定义顶部标题的样式
    var top = document.createElement("div");
    var titleD = document.createElement("div");
    var closeX = document.createElement("img");
    top.className = "info-top";
    titleD.innerHTML = title;
    closeX.src="../mapDemo/gif/closeInforWindow.gif";
    closeX.onclick = closeInfoWindow;

    top.appendChild(titleD);//承载标题
    top.appendChild(closeX);//承载关闭的特效
    info.appendChild(top);//info承载top

    // 定义中部内容
    var middle = document.createElement("div");
    middle.className = "info-middle";
    middle.style.backgroundColor = 'white';
    middle.innerHTML = content;//主体内容
    info.appendChild(middle);

    // 定义底部内容
    var bottom = document.createElement("div");
    bottom.className = "info-bottom";
    bottom.style.position = 'relative';
    bottom.style.top = '0px';
    bottom.style.margin = '0 auto';
    info.appendChild(bottom);
    return info;
}

//关闭信息窗体
function closeInfoWindow() {
    map.clearInfoWindow();
}
