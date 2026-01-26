var title = "MC编辑器";
var header_html = '<div class="layui-logo" style="width:120px"><a href="https://mcbjq.com/" style="color:#009688">' + title + '</a></div><ul class="layui-nav layui-layout-left" style="left:100px">';
for (var i = 0; i < menu.length; i++) {
  header_html += '<li class="layui-nav-item ';
  if (menu[i].choose) {
    header_html += "layui-this"

  }
  header_html += '"><a href="' + menu[i].href + '">' + menu[i].name;
  if (menu[i].dot) {
    header_html += '<span class="layui-badge-dot"></span>'
  }
  header_html += "</a></li>"

}
header_html += "</ul>";
header_html += '<ul class="layui-nav layui-layout-right">';
header_html += '<li class="layui-nav-item"><a href="javascript:;">常用工具</a><dl class="layui-nav-child"><dd><div class="layui-btn layui-btn-primary" id="color_btn" type="button" >颜色列表</div></dd><dd><div class="layui-btn layui-btn-primary" id="sound_btn" type="button" >声音列表</div></dd><dd><div class="layui-btn layui-btn-primary" id="item_btn" type="button" >物品列表</div></dd></dl></li>'
// header_html+='<li class="layui-nav-item"><a href="https://mcbjq.com/shop/">在线编辑器</a></li>';
header_html += '<li class="layui-nav-item"><a href="https://mcbjq.com/shop/donate.html">赞助<span class="layui-badge-dot"></span></a></li>';
header_html += '<li class="layui-nav-item"><a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=JwPSJA956497Hq4dPHMhOkBt5TvI5Yup&jump_from=webapi"><img border="0" src="//pub.idqqimg.com/wpa/images/group.png" alt="『月界』 技术交流群" title="『月界』 技术交流群"></a></li></ul>';
document.getElementById("header").innerHTML = header_html;

layui.use(['element', 'jquery', 'layer'], function () {
  var element = layui.element;
  var layer = layui.layer;
  var $ = layui.$;

  $(document).ready(function () {
    $('#color_btn').on('click', function () {
      layer.open({
        type: 2,
        title: '颜色列表',
        shade: 0,
        area: ['300px', '470px'],
        shadeClose: false,
        moveOut: true,
        content: 'https://mcbjq.com/tool/color.php' //iframe的url
      });
    })
  });

  $(document).ready(function () {
    $('#item_btn').on('click', function () {
      layer.open({
        type: 2,
        title: '物品列表',
        shade: 0,
        area: ['300px', '470px'],
        shadeClose: false,
        moveOut: true,
        content: 'https://mcbjq.com/tool/item.php' //iframe的url
      });
    })
  });

  $(document).ready(function () {
    $('#sound_btn').on('click', function () {
      layer.open({
        type: 2,
        title: '声音列表',
        shade: 0,
        area: ['450px', '470px'],
        shadeClose: false,
        moveOut: true,
        content: 'https://mcbjq.com/tool/sound.php' //iframe的url
      });
    })
  });

});