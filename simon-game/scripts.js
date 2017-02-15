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
  var clickable = false;
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
      started = false;
      strict = false;

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
        resetGame();
      
      started = true;
      startGame();
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
    console.log(value);
    $('.count-value').text(value);
  }

  function resetGame() {
    // reset current game
    console.log('resetting current game');
    endGame();
    startGame();
  }

  function endGame() {
    clickable = false;
    console.log('ending current game');    
  }

  function startGame() {
    // TODO
    console.log('starting current game');    
    
    levels = [];
    animateDisplay();
    setTimeout(addNextLevel, 1500);
    setTimeout(showLevels, 1700);

    // Inner functions
    function animateDisplay() {
      var times = 2;

      animate();

      function animate() {
        if (!times)
          return;
        times--; 
        updateDisplay('');
        setTimeout(function() {
          updateDisplay('- -');
          setTimeout(animate, 300);
        }, 300);
      }
    }

    function showLevels() {
      levels.forEach(function(lvl) {
        showLvl(lvl);
      });
      updateDisplay(levels.length);
      clickable = true;

      // Inner function
      function showLvl(lvl) {
        changeColor(lvl, 1);
        playSound(lvl, 1);
        setTimeout(function() {
          changeColor(lvl, 0);
          playSound(lvl, 0);
        }, 500);
      }
    }

    function addNextLevel() {      
      var nextLevel = Math.ceil((Math.random() * 4));
      levels.push(nextLevel);
    }
  } 

  function registerQuartersHandler() {
    $('.path').on('click', quarterClick);

    // Inner functions
    function quarterClick() {
      if (! power || ! started || ! clickable)
        return;
      // TODO

      // consider strict

      // clickable = false;
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