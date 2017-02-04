$(document).ready(function() {
  animateSearch();
  formSubmit();

  function formSubmit() {
    $('form').on('submit', function(e) {
      console.log(this.elements.search.value);
      e.preventDefault();
    });
   }

  function animateSearch() {
    $('.search-icon').on('click', function () {
      hideShow('.search-activate', '.search-active');
    });
    $('.search-deactivate').on('click', function() {
      hideShow('.search-active', '.search-activate');
    });
  }

  function hideShow(toHide, toShow) {
    changeVisibility(toHide, 0);
    changeVisibility(toShow, 1);

    function changeVisibility(element, opacity) {
      var v = (opacity === 0) ? 'hidden' : 'visible';
      $(element).animate( { opacity: opacity }, 400 );
      $(element).css('visibility', v);
    }
  }

});



