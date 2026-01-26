
$(document).ready(function () {
    $.get("https://mcbjq.com/api/pv.php",function (data) {
        document.getElementById("pv").innerHTML=data;
    })
});

function getDateDiff(startTime, endTime) {
    //将日期字符串转换为时间戳
    var sTime = new Date(startTime).getTime(); //开始时间
    var eTime = new Date(endTime).getTime();  //结束时间
    //作为除数的数字
    var divNumSecond = 1000;
    var divNumMinute = 1000 * 60;
    var divNumHour = 1000 * 3600;
    var divNumDay = 1000 * 3600 * 24;
    var divNumYear = 1000 * 3600 * 24 *365;
    
    const year = parseInt((eTime - sTime) / parseInt(divNumYear))
    const day = parseInt(((eTime - sTime) % parseInt(divNumYear))/ parseInt(divNumDay))
    const hour = parseInt(((eTime - sTime) % parseInt(divNumDay)) / parseInt(divNumHour))
    const minute = parseInt(((eTime - sTime) % parseInt(divNumHour)) / parseInt(divNumMinute))
    const second =  parseInt(((eTime - sTime) % parseInt(divNumMinute)) / parseInt(divNumSecond))
    const str = year +'年'+ day + '天' + hour + '小时' + minute + '分' + second + '秒'
    return str
}

var myVar=setInterval(function(){myTimer()},1000);
function myTimer()
{
    var t1=new Date("2021-01-30 12:00:00").getTime();
    var t2=new Date();
    document.getElementById("time").innerHTML=getDateDiff(t1, t2);
}

var footer_html='<div class="layui-card" style="width:100%;margin:auto;text-align:center;font-size:10px;">'+'  <div class="layui-card-body"><p>Copyright © 2020-2022  <a href="https://mfmc.cc/" target="_blank">月界MC</a>  All Rights Reserved</p><p><a target="_blank" href="https://beian.miit.gov.cn/">粤ICP备2020096117号</a></p><p>本站已安静的运行了<span id="time">...</span> | 访问量:<span id="pv">...</span></p></div></div>'
document.getElementById("footer").innerHTML=footer_html;