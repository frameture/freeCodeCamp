var app = getApp();
$(document).ready(app.main);

function getApp() {
  // Private members
  var MODES = ['pl-one', 'pl-two'];
  var SIGNS = ['x', 'o'];
  var sign = [];
  var mode;
  var turn;
  var running = false;
  var score = {
    'pl-one': 0,
    'pl-two': 0
  };
  var grid = [[], [], []];

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
    var row = parseInt(ele.parentElement.className.substr(3), 10);
    var col = parseInt(ele.className.substr(4), 10);
    
    if (taken(row, col))
      return;
    addToGrid(row, col);
  
    // TODO
    if (won(sign[turn])) {
      showWinner();
      resetGrid();
    } else if (fullGrid()) {
      showDraw();
      resetGrid();      
    }

    showTurn();
    if (mode === 'pl-one' && turn === 1) 
      computersMove();

    // Inner
    function fullGrid() {
      var total = 0;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (grid[i][j])
            total++;  
        }
      }
      return total === 9;
    }

    function won(sign) {
      if (checkVertically(sign))
        return true;
      if (checkHorizontally(sign))
        return true;
      if (checkDiagonally(sign))
        return true;
      return false
    }

    function checkVertically(sign) {
      for (var i = 0; i < 3; i++) {
        var total = 0;
        for (var j = 0; j < 3; j++) {
          if (grid[i][j] === sign)
            total++;
          if (total === 3) {
            highlightRow(i);
            return true;
          }
        }
      }
      return false;
    }

    function checkHorizontally(sign) {
    for (var i = 0; i < 3; i++) {
        var total = 0;
        for (var j = 0; j < 3; j++) {
          if (grid[j][i] === sign)
            total++;
          if (total === 3) {
            highlightCol(i);
            return true;
          }
        }
      }
      return false;
    }

    function checkDiagonally(sign) {
      // left to right
      var total = 0;
      for (var i = 0; i < 3; i++) {
        if (grid[i][i] === sign)
          total++;
        if (total === 3) {
          highlightDiagonal(true);
          return true;
        }
      }
      total = 0;
      for (var i = 0; i < 3; i++) {
        if (grid[i][2 - i] === sign)
          total++;
        if (total === 3) {
          highlightDiagonal();
          return true;
        }
      }
      return false;
    }

    function highlightCol(i) {
      var cell = '.cell-' + i; 
      console.log('won col:', i, $(cell));
      $(cell).css('backgroundColor', 'rgba(240, 180, 135, 1)');
    }
    function highlightRow(i) {
      var row = '#row-' + i.toString() + ' .cell';
      console.log('won col:', i, $(row));
      $(row).css('backgroundColor', 'rgba(240, 180, 135, 1)');
    }
    function highlightDiagonal(left) {
      console.log(true, $('#row-1 > cell-0'));
      if (left) {
        $('#row-0 > .cell-0').css('backgroundColor', 'rgba(240, 180, 135, 1)');
        $('#row-1 > .cell-1').css('backgroundColor', 'rgba(240, 180, 135, 1)');
        $('#row-2 > .cell-2').css('backgroundColor', 'rgba(240, 180, 135, 1)');
      } else {
        $('#row-0 > .cell-2').css('backgroundColor', 'rgba(240, 180, 135, 1)');
        $('#row-1 > .cell-1').css('backgroundColor', 'rgba(240, 180, 135, 1)');
        $('#row-2 > .cell-0').css('backgroundColor', 'rgba(240, 180, 135, 1)');
      }
    }

    function addToGrid(row, col) {
      $(ele).addClass(sign[turn] + '-sign');
      grid[row][col] = sign[turn];
    }
    
  }

  function taken(row, col) {
    if (grid[row] && grid[row][col])
      return true;
    return false;
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
    grid = [[], [], []];
    $('.cell').css('backgroundColor', 'rgba(0,0,0,0)');
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
    turn = turn === 0 ? 1 : 0;

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