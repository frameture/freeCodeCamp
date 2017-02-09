// max chars in .input = 13;
$(document).ready(function() {
  // Private state members.
  var _display = {
    main: '0',
    expression: '0',
    last_operand: null
  }
  var _twiceCE = 0;

  registerButtonHandlers();  

  function registerButtonHandlers() {
    $('.btn').on('click', buttonClickHandler);
    $('.btn').on('mousedown', function(e) { animateButton(e, 'down') });
    $('.btn').on('mouseup', function(e) { animateButton(e, 'up') });

  }

  function buttonClickHandler(e) {
    var value = e.delegateTarget.innerText;
    switch (value) {
      case 'AC':
        resetDisplay(true);
        break;
      case 'CE':
        resetDisplay(false);
        break;
      case '/':
      case 'x':
      case '+':
      case '-':
      case '=':
        calculateExpression(value);
        break;
      case '.':
        addDot();
        break;
      default:
        addDigit(value);
    }
    updateDisplay();

    // Private methods.
    function resetDisplay(full) {
      if (!full) 
        _twiceCE++;
      else 
        _twiceCE = 0;

      if (_twiceCE === 2) // CE button clicked twice
        full = true;
      
      if (full) {
        _display.main = '0';
        _display.expression = '0';
        _display.last_operand = null;
      } else {
        // CE logic
      }
    }

    function addDigit(d) {
      if (checkMaxWidth())
        return;
      if (_display.main === '0') {
        _display.main = d;
        _display.expression = d;
      } else {
        _display.main += d;
        _display.expression += d;
      }
    }

    function calculateExpression(operator) {
      if (_display.main === '0')
        return;
      if (checkMaxWidth() && operator !== '=')
        return;

      operator === '=' ? equals() : calc(operator);

      // Private inner functions.
      function equals() {
        // equals logic
      }

      function calc() {
        // calc logic.
      }
    }

    function addDot() {
      //
    }
 
    function checkMaxWidth() {
      if (_display.main.length === 11)
        return true;
    }

    function updateDisplay() {
      $('.input').text(_display.main);
      $('.expression').text(_display.expression);
    }

  }

  function animateButton(e, action) {
    var top, shadow;
    if (action === 'up') {
      top = '0';
      shadow = '1';
    } else {
      top = '1px';
      shadow = '0';
    }
    $(e.delegateTarget).animate({ 
      top: top
     }, 10);
     $(e.delegateTarget).css('box-shadow', '1px 3px 1px 0px rgba(0,0,0,' 
        + shadow + ')');
  }

});