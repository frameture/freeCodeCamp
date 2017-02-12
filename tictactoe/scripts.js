var app = getApp();
$(document).ready(app.main);

function getApp() {
  var MODES = ['pl-one', 'pl-two'];
  var SIGNS = ['x', 'o'];
  var score = {
    'pl-one': 0,
    'pl-two': 0
  };
  var sign = {
    'pl-one': null,
    'pl-two': null
  };
  var mode;
  var turn;
  var app = {};
  app.main = main;

  function main() {
    registerModesHandler();
    registerBackButton();
    registerSignPick();
    registerResetHandler();
  }

  // Inner functions.

  function registerResetHandler() {
    $('.reset').on('click', resetHandler);
  }

  function resetHandler() {
    score = {
      'pl-one': null,
      'pl-two': null
    };
    sign = {
    'pl-one': null,
    'pl-two': null
    };
    turn = null;
    mode = null;
    hideShow('.grid', '.intro');
    hideShow('.score-keeper');
  }

  function registerSignPick() {
    $('.sign').on('click', signHandler);
  }

  function signHandler(ele) {
    var id = ele.delegateTarget.id;
    if (id === 'x') {
      sign['pl-one'] = SIGNS[0];
      sign['pl-two'] = SIGNS[1];
    } else {
      sign['pl-one'] = SIGNS[1];
      sign['pl-two'] = SIGNS[0];
    }

    hideShow('.sign-pick', '.grid');
    hideShow(null, '.score-keeper')
    startGame();
  }

  function registerBackButton() {
    $('.back-btn').on('click', backBtnHandler);
  }

  function backBtnHandler() {
    mode = null;
    hideShow('.sign-pick', '.intro');
  }

  function registerModesHandler() {
    $('.mode').on('click', modeHandler);
  }

  function modeHandler(ele) {
    var id = ele.delegateTarget.id;
    mode = id;
    hideShow('.intro', '.sign-pick');
  }

  function hideShow(toHide, toShow) {
    if (toHide) {
      $(toHide).animate( { opacity: 0 }, 500 );
      $(toHide).css('display', 'none');
    }
    if (toShow) {
      $(toShow).css('display', 'block');
      $(toShow).animate( { opacity: 1 }, 500 );
    }
  }

  function startGame() {
    if (mode === MODES[0])
      vsComputer();
    else
      vsPlayer(); 
  }

  function vsComputer() {
    // TODO
  }

  function vsPlayer() {
    // TODO
  }

  return app;
}