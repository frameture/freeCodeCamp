var app = getApp();
$(document).ready(app.main);

function getApp() {
  // Private members
  var MODES = ['pl-one', 'pl-two'];
  var SIGNS = ['x', 'o'];
  var score = {
    'pl-one': 0,
    'pl-two': 0
  };
  var sign = [];
  var mode;
  var turn;
  var running = false;

  var app = {};
  app.main = main; // Public member.

  function main() {
    registerModesHandler();
    registerBackButton();
    registerSignPick();
    registerResetHandler();
    registerGridHandler();
  }

  // Inner functions.

  function registerGridHandler() {
    $('.cell').on('click', cellClickHandler);
  }

  function cellClickHandler(ele) {
    ele = ele.delegateTarget;
    var cN = ele.className;
    if (cN.includes('x-sign') || cN.includes('o-sign'))
      return;
    $(ele).addClass(sign[turn] + '-sign');
    turn = turn === 0 ? 1 : 0;
    showTurn();
  }

  function registerResetHandler() {
    $('.reset').on('click', resetHandler);
  }

  function resetHandler() {
    running = false;
    score = {
      'pl-one': null,
      'pl-two': null
    };
    sign = [];
    turn = null;
    mode = null;
    hideShow('.grid', '.intro');
    hideShow('.score-keeper');
    $('.cell').removeClass('x-sign o-sign');
  }

  function registerSignPick() {
    $('.sign').on('click', signHandler);
  }

  function signHandler(ele) {
    var id = ele.delegateTarget.id;
    if (id === 'x') {
      sign[0] = SIGNS[0];
      sign[1] = SIGNS[1];
    } else {
      sign[0] = SIGNS[1];
      sign[1] = SIGNS[0];
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
    turn = Math.random() > .49 ? 0 : 1;
    running = true;
    if (mode === MODES[0])
      vsComputer();
    else
      vsPlayer(); 
  }

  function vsComputer() {
    $('.player-two-name').text('computer');
    $('.player-one-turn').text("Your turn");
    $('.player-two-turn').text("Computer's turn");
    showTurn();
  }

  function vsPlayer() {
    $('.player-two-name').text('player II');
    $('.player-one-turn').text("First player turn");
    $('.player-two-turn').text("Second player turn");
    showTurn();
  }
  function showTurn() {
    var $toHide, $toShow;
    if (turn === 0) {
      $toHide = $('.player-two-turn');
      $toShow = $('.player-one-turn');
    } else {
      $toShow = $('.player-two-turn');
      $toHide = $('.player-one-turn');
    }
    if ($toHide.css('display') !== 'none') {
      $toHide.animate( { opacity: 0 }, 500 );
      $toHide.css('display', 'none');
    }
    $toShow.css('display', 'inline');
    $toShow.animate( { opacity: 1 }, 500 );
  }
  return app;
}