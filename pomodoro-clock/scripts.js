var app = app();
$(document).ready(app.main);

function app() {
  var app = {};
  app.main = main;

  function main() {
    var STATES = ['session', 'break'];
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

    //// Inner functions.

    function registerClockHandler() {
      var timerInterval;
      var pulseInterval;

      $('.clock').on('click', function() {
        running =  ! running;
        switchClock(running);
      });

      // Inner >>

      function switchClock(on) {
        if (on) {
          clearInterval(pulseInterval);
          interval = window.setInterval(timer, 1000); 
        }
        else {
          clearInterval(interval);
          pulsingClock();
          pulseInterval = window.setInterval(pulsingClock, 2000);
        }
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
        if (min === 0 && sec === 0) {
          changeState();
          return;
        }

        setTime(min.toString(), sec.toString());
      }

      function changeState() {
        if (state === STATES[0]) {
          state = STATES[1];
          updateEle('.state', 'Break');
          updateClock(breakTime);
        } else {
          state = STATES[0];
          updateEle('.state', 'Session');
          updateClock(sessionTime);
        }
      }

      function pulsingClock() {
        var $c = $('.clock');
        $c.animate({ opacity: '.25' }, 1000);
        $c.animate({ opacity: '1' }, 1000);
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

      $('.control').on('mousedown', function(e) { animateClick(e.delegateTarget, true); });
      $('.control').on('mouseup', function(e) { animateClick(e.delegateTarget, false); });


      // Inner of registerControlHandler.

      function animateClick(ele, down) {
        var value = down ? '1px' : '0';
        $(ele).css('top', value);
        $(ele).css('left', value);
      } 

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
      if (sec) {
        if (sec.length === 1)
          sec = '0' + sec;
      time.seconds = sec;
      } else {
        time.seconds = '00';
      }

      time.minutes = min;
    }

  }

  return app;
}