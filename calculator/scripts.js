$(document).ready(function() {
  // Private state members.
  var MAX_WIDTH = 11; // Maximal length of the number that fits calculator's display.
  var _nextClickReset = false; // If the width of the result exceeded MAX_WIDTH, 
                               // next click will reset the state machine.
  var _display = {  // Object holding state variables as properties.
    main: '0',
    expression: '0',
    a: null,
    operator: null
  }
  var _twiceCE = 0; // Determines whether the CE button was double clicked.

  registerButtonHandlers(); // Actual logic.

  // Private functions. 

  function registerButtonHandlers() {
    $('.btn').on('click', buttonClickHandler);
    $('.btn').on('mousedown', function(e) { animateButton(e, 'down') });
    $('.btn').on('mouseup', function(e) { animateButton(e, 'up') });
  }

  function buttonClickHandler(e) {
    var value = e.delegateTarget.innerText.trim();
    if (_nextClickReset) {
      resetDisplay(true);
      updateDisplay();
      _nextClickReset = false;
      return;
    }
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
        _display.a = null;
      } else
        resetCE();

      function resetCE() {
        if (_display.main !== '0' && ! _display.operator) {
          _display.main = '0';
          _display.expression = '0';
        } else if (Number.isNaN(parseFloat(_display.main))) {
          _display.expression = _display.expression
              .substring(0, _display.expression.lastIndexOf(_display.main));
          _display.main = _display.a;
          _display.a = null;
          _display.operator = null;
        } else if (_display.main !== '0') {
          _display.expression = _display.expression
              .substring(0, _display.expression.lastIndexOf(_display.main));
          _display.main = _display.operator;
        } 
      }
    }

    function addDigit(d) {
      _twiceCE = 0;
      if (checkMaxWidth())
        return;
      if (_display.main === '0') {
        _display.main = d;
        _display.expression = d;
      } else if (Number.isNaN(parseFloat(_display.main))) {
        _display.main = d;
        _display.expression += d;
      } else {
        _display.main += d;
        _display.expression += d;
      }
    }

    function calculateExpression(operator) {
      _twiceCE = 0;
      if (_display.main === '0')
        return;
      if (Number.isNaN(parseFloat(_display.main)) && operator !== '=') {
        _display.main = operator;
        _display.operator = operator;
        _display.expression = _display.expression
          .substring(0, _display.expression.length - 1) + operator;
        return;
      }
      if (checkMaxWidth() && operator !== '=')
        return;

      operator === '=' ? equals() : expr(operator);

      // Private inner functions.
      function equals() {
        if ( ! _display.operator)
          return;
        if ( ! Number.isNaN(parseFloat(_display.main))) {
          var result = calc(_display.a, parseFloat(_display.main), _display.operator);
          if (result.toString().length > MAX_WIDTH) {
            _display.main = ':-)'
            _display.expression = '= THE RESULT HAS TOO MANY DIGITS';
            _display.a = null;
            _display.operator = null;
            _nextClickReset = true;
            return;
          }
          _display.main = result.toString();
          _display.a = null;
          _display.operator = null;
          _display.expression = result.toString();
        }
      }

      function expr() {
        var b = parseFloat(_display.main);
        if (_display.a) {
          var a = parseFloat(_display.a);
          var result = calc(a, b, _display.operator);
          _display.a = result;
        } else {
          _display.a = b;
        }
        _display.operator = operator;
        _display.main = operator;
        _display.expression += operator;
      }

      function calc(a, b, op) {
        switch (op) {
          case 'x': return a * b;
          case '/': return a / b;
          case '+': return a + b;
          case '-': return a - b;
          default: console.log('ERROR in calc()');
        }
      }
    }

    function addDot() {
      if (_display.main.includes('.'))
        return;
      _display.main += '.';
      _display.expression += '.';
    }
 
    function checkMaxWidth() {
      if (_display.main.length === MAX_WIDTH)
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