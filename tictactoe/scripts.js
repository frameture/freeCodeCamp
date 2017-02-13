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
  var score = [0, 0];
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

  function computersMove() {
    if (! running)
      return;
    window.setTimeout(function() {
      var cell;

      if (findWin()) {
        cell = findWin();
      } else if (checkH(sign[0]) !== false && findNextInRow(checkH(sign[0]))) {
        cell = findNextInRow(checkH(sign[0]));
      } else if (checkV(sign[0]) !== false && findNextInCol(checkV(sign[0]))) {
        cell = findNextInCol(checkV(sign[0]));
      } else if (checkD(sign[0]) && findNextInDiagonal(checkD(sign[0]))) {
        cell = findNextInDiagonal(checkD(sign[0]));
      } else {
        cell = findNextEmpty();
      }

      if (! grid[1][1]) // try to get the middle
        addToGrid($('#row-1 > .cell-1'), 1, 1);
      else 
        addToGrid(cell.cell, cell.row, cell.col);

      if (won(sign[turn])) {
        console.log('won', sign[turn]);
        running = false;
        showWinner();
        resetGrid();
      } else if (fullGrid()) {
        running = false;
        showDraw();
        resetGrid();      
      }

      showTurn();
    }, 1000);

    // Inner.

    function findNextEmpty() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (! grid[i][j])
            return {
              cell: $('#row-' + i + ' > .cell-' + j),
              row: i,
              col: j
            }
        }
      }
      fullGrid();
    }

    function findWin() {
      var cell;
      if (checkH(sign[1]) !== false && findNextInRow(checkH(sign[1]))) {
        cell = findNextInRow(checkH(sign[1]));
      } else if (checkV(sign[1]) !== false && findNextInCol(checkV(sign[1]))) {
        cell = findNextInCol(checkV(sign[1]));
      } else if (checkD(sign[1]) && findNextInDiagonal(checkD(sign[1]))) {
        cell = findNextInDiagonal(checkD(sign[1]));
      }
      console.log('findWin:', cell);
      return cell;
    }

    function findNextInDiagonal(obj) {
      console.log('findNextInDiag', obj);
      if (obj.left) {
        for (var i = 0; i < 3; i++) {
          if (! grid[i][i])
            return {
              cell: $('#row-' + i + ' > .cell-' + i),
              row: i,
              col: i
            };   
        }
      } else {
        for (var i = 0; i < 3; i++) {
          if (! grid[i][2 - i])
            return {
              cell: $('#row-' + i + ' > .cell-' + (2 - i)),
              row: i,
              col: 2 - i
            };   
        }
      }
    }

    function findNextInCol(c) {
      console.log('findNextInCol', c);
      
      if (c === false)
        return;
      for (var k = 0; k < 3; k++) {
        if (! grid[k][c]) {
          console.log('foundEmptyinCol:', k, c);
          return {
            cell: $('#row-' + k + ' > .cell-' + c),
            row: k,
            col: c
          };
        }
      }
    }

    function findNextInRow(row) {
      console.log('findNextInRow', row);
      if (row === false)
        return;
      for (var i = 0; i < 3; i++) {
        console.log(row, i, grid[row][i]);
        if (! grid[row][i]) {
          console.log('foundEmptyinRow:', row, i);          
          return {
            cell: $('#row-' + row + ' > .cell-' + i),
            row: row,
            col: i
          };
        }
      }
    }

    function checkV(sign) {
      for (var o = 0; o < 3; o++) {
        var total = 0;
        var taken = 0;
        for (var j = 0; j < 3; j++) {
          if (grid[j][o] === sign)
            total++;
          else if (grid[j][o])
            taken++;  
        }
        if (total === 2 && taken === 0) {
          console.log('checkV - found 2:', o, j);
          return o;
        }
      }
      return false;
    }

    function checkH(sign) {
      console.log('checkH');
    for (var i = 0; i < 3; i++) {
        var total = 0;
        var taken = 0;
        for (var j = 0; j < 3; j++) {
          if (grid[i][j] === sign)
            total++;
          else if (grid[i][j])
            taken++;
        }
        if (total === 2 && taken === 0)
          return i;
      }
      return false;
    }

    function checkD(sign) {
      // left to right
      var total = 0;
      var taken = 0;
      for (var i = 0; i < 3; i++) {
        if (grid[i][i] === sign)
          total++;
        else if (grid[i][i])
          taken++;
      }
      if (total === 2 && taken === 0)
        return { left: true };
      total = 0;
      taken = 0;
      for (var i = 0; i < 3; i++) {
        if (grid[i][2 - i] === sign)
          total++;
        else if (grid[i][2 - i])
          taken++;
      }
      if (total === 2 && taken === 0)
        return { left: false };
      return undefined;
    }
  }

  function cellClickHandler(ele) {
    if (! running || (mode === MODES[0] && turn === 1))
      return;
       
    ele = ele.delegateTarget;
    var row = parseInt(ele.parentElement.className.substr(3), 10);
    var col = parseInt(ele.className.substr(4), 10);
    
    if (taken(row, col))
      return;
    addToGrid(ele, row, col);
  
    if (won(sign[turn])) {
      console.log('won', sign[turn]);
      running = false;
      showWinner();
      resetGrid();
    } else if (fullGrid()) {
      running = false;
      showDraw();
      resetGrid();      
    }

    showTurn();
    if (mode === 'pl-one' && turn === 1) 
      computersMove();
 
  }

  function showDraw() {
      $('.player-one-turn').animate( { display: 'none', opacity: 0 }, 500);
      $('.player-two-turn').animate( { display: 'none', opacity: 0 }, 500);
      if (turn == 0) {
        $('.player-two-turn').text('It was a draw!');
        $('.player-two-turn').animate( { display: 'inline', opacity: 1 }, 500);
      } else {
        $('.player-one-turn').text('It was a draw!');
        $('.player-one-turn').animate( { display: 'inline', opacity: 1 }, 500);
      }
    }

    function showWinner() {
      $('.player-one-turn').animate( { display: 'none', opacity: 0 }, 500);
      $('.player-two-turn').animate( { display: 'none', opacity: 0 }, 500);
      if (turn == 0) {
        var winner = mode === 'pl-one' ? 'You' : 'First player';
        $('.player-two-turn').text(winner + ' won!');
        $('.player-two-turn').animate( { display: 'inline', opacity: 1 }, 500);
      } else {
        var winner = mode === 'pl-one' ? 'Computer' : 'Second player';
        $('.player-one-turn').text(winner + ' won!');
        $('.player-one-turn').animate( { display: 'inline', opacity: 1 }, 500);
      }

      updatePlayer();

      function updatePlayer() {
        console.log('update', turn);
        var pl;
        if (turn === 0)
          pl = '.player-one-score';
        else 
          pl = '.player-two-score';
        score[turn] += 1;
        $(pl).text(score[turn]);

      }
      
    }

    function resetGrid() {
      window.setTimeout(function() {
        $('.grid').animate({ opacity: 0 }, 500);
        $('.cell').removeClass('x-sign o-sign');
        grid = [[], [], []];
        $('.cell').css('backgroundColor', 'rgba(0,0,0,0)');

        if (mode === 'pl-one') {
          $('.player-one-turn').text('Your turn');
          $('.player-two-turn').text("Computer's turn");
        } else {
          $('.player-one-turn').text('First player turn');
          $('.player-two-turn').text('Second player turn');
        }

        window.setTimeout(function() { 
          $('.grid').animate({ opacity: 1 }, 500);
          running = true;
          turn = turn === 0 ? 1 : 0;
          showTurn();
          if (mode === 'pl-one' && turn === 1) 
            computersMove();
        }, 500);

      }, 3000);

    }

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

  function addToGrid(ele, row, col) {
    $(ele).addClass(sign[turn] + '-sign');
    grid[row][col] = sign[turn];
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
    score = [0, 0];
    sign = [];
    turn = null;
    mode = null;
    hideShow('.grid', '.intro');
    hideShow('.score-keeper');
    $('.player-one-score').text(0);
    $('.player-two-score').text(0);
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
    if (mode === 'pl-one' && turn === 1) 
      computersMove();
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