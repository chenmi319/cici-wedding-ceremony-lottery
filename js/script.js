var maxNum = 0;
var numPool = [];
var running = false;
var currentIndex;
var historyNums = [];
var g_Interval = 1;
var g_Timer;

function setMaxNum(trigger){
  maxNum = parseInt($("#maxNum").val());
  if(maxNum > 0){
    $("#maxNum").prop("readonly", "readonly");
    $("#confirmBtn").hide();
    for(i = 1; i <= maxNum; i++){
      if(i.toString().indexOf("4") === -1){
        numPool.push(i);
      }
    }
    $("#resetBtn").show();
  }
}

function beginRndNum(trigger){
  if(!maxNum){
    alert("请先输入中奖号码最大值");
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
  }else{
    running = true;
    $('#ResultNum').css('visibility','visible');
    $('#ResultNum').css('color','hotpink');
    $(trigger).val("停止");
    beginTimer();
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
  $("#startBtn").val("开始");
  $("#resetBtn").hide();
  $('#ResultNum').css('visibility','hidden');
}
