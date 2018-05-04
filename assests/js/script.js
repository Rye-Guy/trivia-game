//makes some globals

var correctAnswer;
var wrongAnswer;
var setTime = 30; 
var timeInterval;


rateOfClock = function(){
    clearInterval(timeInterval);
    timeInterval = setInterval(decrease, 1000);
}

decrease = function(){
    setTime--;
    document.getElementById('secondsRemaining').innerHTML = setTime;
}

stopClock = function(){
    clearInterval(timeInterval);
}

rateOfClock();





// startTime = function(){
//      timeInterval = setTimeout(, 30000);
//     // document.getElementById('')
// }
