$(document).ready(function() {
  getData();
  registerStatusHandler();

  function getData() {
    var STREAMERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
                     "noobs2ninjas"];
    
    STREAMERS.forEach(function(s) {
      getStreamerData(s);
    });

    function getStreamerData(streamer) {
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?", function(data) {
        console.log(data);
        processStreamerResponse(data);
      });

      function processStreamerResponse(response) {
        var $item = $('#0').clone();
        $item.attr('id', response._id); 
        $item.css('display', 'block'); 
        // $item.find('.streamer-image').attr('src', response.logo);
        // $item.find('.streamer-name').attr('href', response.url);  
        // $item.find('.streamer-name').html(response.display_name); 
        $item.find('.streamer-status').html(response.stream);
        $('body').append($item); 
      }
    }


  }

  function registerStatusHandler() {
    $('.status').on('click', function() {
      processStatusChange(this);
    });

    function processStatusChange(obj) {
      console.log($(obj).text());
      //
    }
  }

  
});