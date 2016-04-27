var g_Interval = 1;
var g_PersonCount = 10;//参加抽奖人数
var g_Timer;
var running = false;
var historyNum = [];
var currentNum = 0;
function beginRndNum(trigger){
  if(running){
    historyNum.push(currentNum);
    running = false;
    clearTimeout(g_Timer);
    $(trigger).val("开始");
    $('#ResultNum').css('color','hotpink');
  }
  else{
    if(historyNum.length == g_PersonCount){
      alert("所有号码都抽完啦");
      return;
    }
    running = true;
    $('#ResultNum').css('color','hotpink');
    $(trigger).val("停止");
    beginTimer();
  }
}

function updateRndNum(){
  do {
    currentNum = Math.floor(Math.random()*g_PersonCount+1);
  } while(-1 != historyNum.indexOf(currentNum))
  $('#ResultNum').html(currentNum);
}

function beginTimer(){
  g_Timer = setTimeout(beat, g_Interval);
}

function beat() {
  g_Timer = setTimeout(beat, g_Interval);
  updateRndNum();
}
