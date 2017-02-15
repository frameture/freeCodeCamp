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
  var clicked = [];
  var clickable = false;

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
      started = false;
      strict = false;
      levels = [];
      clicked = [];
      clickable = false;

      endGame();
      updateDisplay('- -');
      switchDisplay(power);
      movePowerSwitch(power);
      switchStrictLamp(false);
      
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

      if (started)
        resetGame('- -', true, true);
      else
        startGame('- -', true);
    }

    function strictSwitch() {
      if (! power)
        return;

      strict = ! strict;
      switchStrictLamp(strict);
    }

    function switchStrictLamp(on) {
      var color = on ? 'red' : '#333';
      $('.strict-lamp').css('backgroundColor', color);
    }
  }

  function updateDisplay(value) {
    $('.count-value').text(value);
  }

  function resetGame(text, deepReset, next) {
    endGame(deepReset);
    startGame(text, next);
  }

  function endGame(deepReset) {
    clickable = false;
    clicked = [];

    if (deepReset) {
      levels = [];
    }
  }

  function startGame(text, next) {
    started = true;
    animateDisplay(text);
    if (next)
      setTimeout(addNextLevel, 1500);
    setTimeout(showLevels, 1700);
  }

  function animateDisplay(text) {
    var times = 2;
    animate();

    function animate() {
      if (!times)
        return;
      times--; 
      updateDisplay('');
      setTimeout(function() {
        updateDisplay(text);
        setTimeout(animate, 300);
      }, 300);
    }
  } 

  function showLevels() {
    var offset;
    levels.forEach(function(lvl, i) {
      offset = i;
      setTimeout(showQuarter, i * 1000, lvl);
    });
    updateDisplay(levels.length);
    setTimeout(function() {
      clickable = true;
    }, offset * 1000);
    clicked = [];
  }

  function showQuarter(id) {
    changeColor(id, 0);
    playSound(id);
    setTimeout(changeColor, 500, id, 1);

    //Inner functions
    function changeColor(id, saturation) {
      var COLORS = [
        ['rgb(0, 250, 0)', 'rgb(50, 170, 50)'],
        ['red', 'rgb(170, 50, 50)'],
        ['blue', 'rgb(50, 50, 170)'],
        ['yellow', 'rgb(170, 170, 50)']
      ];
      $('#' + id).css('fill', COLORS[id][saturation]);
    }

    function playSound(id, play) {
      var SOUNDS = [ 
        './sounds/simonSound1.mp3', 
        './sounds/simonSound2.mp3', 
        './sounds/simonSound3.mp3', 
        './sounds/simonSound4.mp3'
      ]

      new Audio(SOUNDS[id]).play();
    } 
  }


  function addNextLevel() {      
    var nextLevel = Math.floor((Math.random() * 4));
    levels.push(nextLevel);
  }

  function registerQuartersHandler() {
    $('path').on('click', quarterClick);

    // Inner functions
    function quarterClick(e) {
      if (! power || ! started || ! clickable)
        return;

      clicked.push(e.delegateTarget.id);
      showQuarter(e.delegateTarget.id);
      checkClickedOrder();
    }

    function checkClickedOrder() {
      // Check if failed
      for (var i = 0; i < clicked.length; i++) {
        if (clicked[i] != levels[i]) {
          clickable = false;
          clicked = [];
          if (strict)
            resetGame('! !', true, true);
          else
            resetGame('! !', false);
          return;
        }
      }

      if (clicked.length === levels.length) {
        clickable = false;
        if (levels.length === 20) {
          resetGame('*WIN*', true, true);
        } else {
          setTimeout(addNextLevel, 1500);
          setTimeout(showLevels, 1700);
        }
      }
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