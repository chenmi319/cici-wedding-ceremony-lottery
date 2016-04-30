var maxNum = 0;
var numPool = [];
var running = false;
var currentIndex;
var historyNums = [];
var g_Interval = 1;
var g_Timer;
var firework_interval;
var filterArray = [13, 38, 62, 162];

function setMaxNum(trigger){
  maxNum = parseInt($("#maxNum").val());
  if(maxNum > 0){
    $("#maxNumText").html("中奖号码最大值");
    $("#maxNum").prop("readonly", "readonly");
    $("#confirmBtn").hide();
    for(i = 1; i <= maxNum; i++){
      if((i.toString().indexOf("4") === -1) && (filterArray.indexOf(i) === -1)){
        numPool.push(i);
      }
    }
    $("#resetBtn").show();
  }
}

function beginRndNum(trigger){
  if(!maxNum){
    alert("请先输入并确认中奖号码最大值");
    return;
  }
  if(numPool.length === 0){
    alert("所有号码都已抽中过啦");
    return;
  }
  if(running){
    historyNums.push(numPool[currentIndex]);
    numPool.splice(currentIndex, 1);
    running = false;
    clearTimeout(g_Timer);
    $(trigger).val("开始");
    $('#ResultNum').css('color','red');
    $("#history").html(historyNums.join(" "));
    $("#music")[0].play();
    firework_interval = setInterval(happyNewYear_keleyi_com,400);
  }else{
    running = true;
    $('#ResultNum').css('visibility','visible');
    $('#ResultNum').css('color','hotpink');
    $(trigger).val("停止");
    beginTimer();
    clearInterval(firework_interval);
    $("#music")[0].pause();
    $("#music")[0].currentTime = 0;
  }
}

function beginTimer(){
  g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
  g_Timer = setTimeout(beat, g_Interval);
  updateRndNum();
}

function updateRndNum(){
  currentIndex = parseInt(Math.random() * numPool.length);
  $('#ResultNum').html(numPool[currentIndex]);
}

function reset(){
  maxNum = 0;
  numPool = [];
  running = false;
  historyNums = [];
  $("#history").html(historyNums.join(" "));
  g_Timer;
  $("#maxNum").prop("readonly", false);
  $("#confirmBtn").show();
  if(g_Timer){
    clearTimeout(g_Timer);
  }
  if(firework_interval){
    clearInterval(firework_interval);
  }
  $("#startBtn").val("开始");
  $("#resetBtn").hide();
  $('#ResultNum').css('visibility','hidden');
  $("#music")[0].pause();
  $("#music")[0].currentTime = 0;
  $("#maxNumText").html("请输入中奖号码最大值");
}

function happyNewYear_keleyi_com() {
  new fireworks();
}




var yanhua = "yanhua.keleyi.com";
var fireworks = function () {
  this.size = 20;
  this.rise();
}
fireworks.prototype = {
  color: function () {
    var c = ['0', '3', '6', '9', 'c', 'f'];
    var t = [c[Math.floor(Math.random() * 100) % 6], '0', 'f'];
    if (yanhua === 'yanhua.ke' + 'leyi.' + 'com')
      t.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
    return '#' + t.join('');
  },
  aheight: function () {
    var h = document.documentElement.clientHeight - 250;
    return Math.abs(Math.floor(Math.random() * h - 200)) + 201;
  },
  firecracker: function () {
    var b = document.createElement('div');
    var w = document.documentElement.clientWidth;
    b.style.position = 'absolute';
    b.style.color = this.color();
    b.style.bottom = 0;
    b.style.left = Math.floor(Math.random() * w) + 1 + 'px';
    document.body.appendChild(b);
    return b;
  },
  rise: function () {
    var o = this.firecracker();
    var n = this.aheight();
    var c = this.color;
    var e = this.expl;
    var s = this.size;
    var k = n;
    var m = function () {
      o.style.bottom = parseFloat(o.style.bottom) + k * 0.1 + 'px';
      k -= k * 0.1;
      if (k < 2) {
        clearInterval(clear);
        e(o, n, s, c);
      }
    }
    o.innerHTML = '.';
    if (parseInt(o.style.bottom) < n) {
      var clear = setInterval(m, 20);
    }
  },
  expl: function (o, n, s, c) {
    var R = n / 3, Ri = n / 6, Rii = n / 9;
    var r = 0, ri = 0, rii = 0;
    if (yanhua === 'yanhua.ke' + 'leyi.' + 'com')
      for (var i = 0; i < s; i++) {
        var span = document.createElement('span');
        var p = document.createElement('i');
        var a = document.createElement('a');
        span.style.position = 'absolute';
        span.style.fontSize = n / 10 + 'px';
        span.style.left = 0;
        span.style.top = 0;
        span.innerHTML = '*';
        p.style.position = 'absolute';
        p.style.left = 0;
        p.style.top = 0;
        p.innerHTML = '*';
        a.style.position = 'absolute';
        a.style.left = 0;
        a.style.top = 0;
        a.innerHTML = '*';
        o.appendChild(span);
        o.appendChild(p);
        o.appendChild(a);
      }
    function spr() {
      r += R * 0.1;
      ri += Ri * 0.06;
      rii += Rii * 0.06;
      sp = o.getElementsByTagName('span');
      p = o.getElementsByTagName('i');
      a = o.getElementsByTagName('a');
      for (var i = 0; i < sp.length; i++) {
        sp[i].style.color = c();
        p[i].style.color = c();
        a[i].style.color = c();
        sp[i].style.left = r * Math.cos(360 / s * i) + 'px';
        sp[i].style.top = r * Math.sin(360 / s * i) + 'px';
        sp[i].style.fontSize = parseFloat(sp[i].style.fontSize) * 0.96 + 'px';
        p[i].style.left = ri * Math.cos(360 / s * i) + 'px';
        p[i].style.top = ri * Math.sin(360 / s * i) + 'px';
        p[i].style.fontSize = parseFloat(sp[i].style.fontSize) * 0.96 + 'px';
        a[i].style.left = rii * Math.cos(360 / s * i) + 'px';
        a[i].style.top = rii * Math.sin(360 / s * i) + 'px';
        a[i].style.fontSize = parseFloat(sp[i].style.fontSize) * 0.96 + 'px';
      }
      R -= R * 0.1;
      if (R < 2) {
        o.innerHTML = '';
        o.parentNode.removeChild(o);
        clearInterval(clearI);
      }
    }if(yanhua==='yanhua.ke'+'leyi.'+'com')
    var clearI = setInterval(spr, 20);
  }
}

