// max chars in .input = 13;
$(document).ready(function() {
  registerButtonHandlers();  

  function registerButtonHandlers() {
    $('.btn').on('click', buttonClickHandler);
    $('.btn').on('mousedown', function(e) { animateButton(e, 'down') });
    $('.btn').on('mouseup', function(e) { animateButton(e, 'up') });

  }

  function buttonClickHandler(e) {
    console.log(e.delegateTarget);
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