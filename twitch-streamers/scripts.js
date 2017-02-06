$(document).ready(function() {
  getData();
  registerStatusHandler();

  function getData() {
    var STREAMERS = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", 
                     "noobs2ninjas", "comster404"];
    
    STREAMERS.forEach(function(s) {
      getStreamerData(s);
    });

    function getStreamerData(streamer) {
      $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + streamer + "?callback=?",
      function(data) {
        if (data.stream)
          processStreamerResponse(data.stream.channel, true);
        else {
          $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + streamer + "?callback=?",
          function(data) {
             processStreamerResponse(data, false, data.error);
          });
        }
      });

      function processStreamerResponse(response, online, error) {
        var $item = $('#0').clone();

         if (error) {
          processError($item, response);
          return;
        }

        processStreamerStatus($item, response, online);

        $item.attr('id', response.name);
        $item.css('display', 'block'); 
        $item.find('.streamer-image').attr('src', response.logo);
        $item.find('.streamer-name').attr('href', response.url);  
        $item.find('.streamer-name').html(response.display_name);

        $('body').append($item); 
      }

      function processStreamerStatus(item, response, online) {
        var status = online ? 'Online' : 'Offline';
        item.addClass(status.toLowerCase()); 
        item.find('.streamer-status').html(status);

        if (online) {
          var href = response._links.self;
          item.find('.col-xs-6').append('<p class="streamer-work">' 
            + response.status + '</p>');
        }
      }

      function processError($item, response) { 
        $item.addClass('offline');
        $item.attr('id', 'error');
        $item.css('display', 'block'); 
        $item.find('.box').addClass('error');
        $item.find('img').addClass('error');
        $item.append('<p class="col-xs-12 error-message">' 
          + response.message + '</p>');
        $('body').append($item);
      }
    }
  }

  function registerStatusHandler() {
    $('.status').on('click', function() {
      processStatusChange(this);
    });

    function processStatusChange(obj) {
      $('.selected').removeClass('selected')
      $(obj).addClass('selected');
      var status = $(obj).text().toLowerCase();
      if (status === 'online') {
        $('.online').fadeIn('slow');
        $('.offline').fadeOut('slow');
      } else if (status === 'offline'){ 
        $('.offline').fadeIn('slow');
        $('.online').fadeOut('slow');
      } else {
        $('.online').fadeIn('slow');
        $('.offline').fadeIn('slow');
      }
    }
  }

});