$(document).ready(function() {
  animateSearch();
  formSubmit();

  function formSubmit() {
    $('form').on('submit', function(e) {
      if ( $('.list-item') )
        $('.list-item').remove();
      fetchJSON(this.elements.search.value);
      $('.search-active').animate( {
        top : '-70%',
      }, 400);
      e.preventDefault();
    });

    function fetchJSON(title) {
      var URL = 'https://en.wikipedia.org/w/api.php';
      $.ajax( {
          url: URL,
          data: {
            "action": "query",
            "format": "json",
            "prop": "",
            "list": "search",
            "meta": "",
            "srsearch": title,
            "srnamespace": "*",
            "srlimit": "20",
            "srqiprofile": "wsum_inclinks_pv",
            "srinfo": "totalhits|suggestion|rewrittenquery",
            "srprop": "titlesnippet|redirecttitle|redirectsnippet|snippet" 
          },
          type: 'GET',
          dataType: 'jsonp',
          headers: { 'Api-User-Agent': 'frameture/1.0' },
          success: function(data) {
            showList(true);
            processResponse(data.query.search);
          }
      } );
    }

    function processResponse(array) {
      array.forEach(function(v) {
        console.log(v);
        var href = 'https://en.wikipedia.org/wiki/' + v.title;
         $('.list').append('<a class="list-item"' + 'href="' + href 
           +'"><h2>' + v.title + '</h2>' 
           + '<p>' + v.snippet + '</p></a>');
      });
    }
  }

  function showList(showHide) {
    var displayValue = showHide ? 'block' : 'none';
    $('.list').css('display', displayValue);
    if (! showHide)
      $('.list-item').remove();
  }

  function animateSearch() {
    $('.search-icon').on('click', function () {
      hideShow('.search-activate', '.search-active');
    });
    $('.search-deactivate').on('click', function() {
      showList(false);
      hideShow('.search-active', '.search-activate');
      $('.search-active').css('top', '28%');
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



