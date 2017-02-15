var app = getApp();

$(document).ready(app.main);

function getApp() {
  var app = {};
  app.main = main;

  // Other private members.
  var power = false;
  var started = false;
  var strict = false;
  var levels = [];
  // count = levels.length;

  function main() {
   registerControlsHandlers();
   registerQuartersHandler();
   registerAnimations();
  }

  function registerControlsHandlers() {
    $('.switch-container').on('click', powerSwitch);
    $('.start-display').on('click', startSwitch);
    $('.strict-display').on('click', strictSwitch);

    // Inner functions
    function powerSwitch() {
      power = ! power;
      switchDisplay(power);
      movePowerSwitch(power);

      // Inner functions
      function switchDisplay(on) {
        var visible = on ? 'visible' : 'hidden';
        $('.count-value').css('visibility', visible);
      }

      function movePowerSwitch(on) {
        var left = on ? '20px' : '0';
        $('.switch').css('left', left);
      }
    }

    function startSwitch() {
      if (! power)
        return;
      start = ! start;
      // TODO
    }

    function strictSwitch() {
      if (! power)
        return;
      strict = ! strict;
      // TODO
    }
  } 

  function registerQuartersHandler() {
    $('.path').on('click', quarterClick);

    // Inner functions
    function quarterClick() {
      if (! power || ! start)
        return;
      // TODO
    }

  }

  function registerAnimations() {
    $('.start-display').on('mousedown', function() { animateClick(this, 'down');});
    $('.strict-display').on('mousedown', function() { animateClick(this, 'down');});
    $('.start-display').on('mouseup', function() { animateClick(this, 'up');});
    $('.strict-display').on('mouseup', function() { animateClick(this, 'up');});

    // Inner function
    function animateClick(ele, down) {
      var move = '0';
      var shadow = '0px 2px 5px 0px';

      if (down === 'down') {
        move = '3px';
        shadow = 'none'; 
      }

      $(ele).css('top', move);
      $(ele).css('boxShadow', shadow);
    }
  }

  return app; 
}