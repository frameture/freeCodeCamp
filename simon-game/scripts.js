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
  }

  function registerControlsHandlers() {
    $('.switch-container').on('click', powerSwitch);
    $('.start-display').on('click', startSwitch);
    $('.strict-display').on('click', strictSwitch);

    // Inner functions
    function powerSwitch() {
      power = ! power;
      // TODO
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

  return app; 
}