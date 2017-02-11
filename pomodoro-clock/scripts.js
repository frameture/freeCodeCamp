var app = app();
$(document).ready(app.main);

function app() {
  var app = {};
  app.main = main;
  console.log(1);

  function main() {
    var STATES = ['session', 'break'];
    //var SECOND = 1000;
    var state = STATES[0];
    var running = false;
    var breakTime = 1;
    var sessionTime = 1;
    var time = {
      minutes: '1',
      seconds: '00' 
    };

    registerClockHandler();
    registerControlsHandler();

    //// Inner functions. ////

    function registerClockHandler() {
      var interval;

      $('.clock').on('click', function() {
        running =  ! running;
        switchClock(running);
      });

      // Inner

      function switchClock(on) {
        if (on)
          interval = window.setInterval(timer, 1000); 
        else 
          clearInterval(interval);
      }

      function timer() {
        subtractSecond();
        updateClock();
      }

      function subtractSecond() {
        var min = parseInt(time.minutes, 10);
        var sec = parseInt(time.seconds, 10);

        if (sec !== 0)
          sec -= 1;
        else {
          min -= 1;
          sec = 59;
        }

        setTime(min.toString(), sec.toString());
      }
    }

    function registerControlsHandler() {
      $('.break-control').on('click', function(e) {
        if (running)
          return;

        breakTime = applyChangeTo(breakTime, e.delegateTarget.innerText.trim());
        updateEle('.break-length', breakTime);
        if (state === STATES[1])
          updateClock(breakTime);
      });

      $('.session-control').on('click', function(e) {
        if (running)
          return;

        sessionTime = applyChangeTo(sessionTime, e.delegateTarget.innerText.trim());
        updateEle('.session-length', sessionTime);
        if (state === STATES[0])
          updateClock(sessionTime);
      });

      // Inner of registerControlHandler. 

      function applyChangeTo(toChange, operator) {
        if (toChange === 1 && operator === '-')
          return toChange;
        toChange += (operator === '+') ? 1 : (-1);

        return toChange;
      }
    }
 
    function updateEle(ele, value) {
      $(ele).text(value);
    }

    function updateClock(value) {
      if (value)
        setTime(value.toString());
      updateEle('.time', time.minutes + ':' + time.seconds);
    }

    function setTime(min, sec) {
      if (time.minutes === '0' && time.seconds === '00')
        changeState();
      if (sec) {
        time.seconds = sec;
        if (sec.length === 1)
          sec = '0' + sec;
      }
      
      time.minutes = min;
    }

    function changeState() {
      // TODO:
      console.log('changes state');
    }

  }

  return app;
}