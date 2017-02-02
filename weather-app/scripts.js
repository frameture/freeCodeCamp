$(document).ready(function() {
 getData();
 registerSwitchDegree();
});

function getData() {
  var API_KEY = '&APPID=95991f497c22a799ba55043e7e9d6a14';
  var SERVER = 'http://api.openweathermap.org/data/2.5/weather?';

  if (!navigator.geolocation) {
    alert("No weather will be displayed unless it has access to your location");
    return;
  }

  var pos = navigator.geolocation.getCurrentPosition(function(pos) {
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    getWeatherJSON(lat, lon);
  });

  function getWeatherJSON(lat, lon) {
    $.getJSON(SERVER + 'lat=' + lat + '&lon=' + lon + '&units=metric' + API_KEY, 
      function(json) { 
        $(".location").text(json.name + ', ' + json.sys.country);
        $(".value").text(json.main.temp); 
        $(".description").text(json.weather[0].description);
        $(".icon").prop('src', getIcon(json.weather[0].icon));
        animateColor(json.main.temp);
      });
  }
}

function registerSwitchDegree() {
  var $switch = $(".degree-switch");
  $switch.on("click", function() {
    if ($switch.text().includes("C")) {
      $(".value").text( Math.round($(".value").text() * 9 / 5 + 32) );
      $switch.html("<span>o</span>F");
    } else {
      $(".value").text( Math.round(($(".value").text() - 32 ) / 9 * 5) );
      $switch.html("<span>o</span>C");
    }
  });
}

function animateColor(temp) {
  $("body").animate( { backgroundColor: getColor() }, 2000);

  function getColor() {
    if (temp <= -20) return "#0066ff";
    else if (temp <= -10) return "#3399ff";
    else if (temp <= -5) return "#66ccff";
    else if (temp <= 0) return "#ccffff";
    else if (temp <= 10) return "#ffffcc";
    else if (temp <= 20) return "#ffff99";
    else return "#ffff66";
  }
}

function getIcon(id) {
  console.log("id:", id);
  var ICONS = {
    '01d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png',
    '02d': 'http://icons.iconarchive.com/icons/jaan-jaak/weather/128/cloudy-partly-icon.png',
    '03d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-many-clouds-icon.png',
    '04d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-icon.png',
    '09d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-icon.png',    
    '10d': 'http://icons.iconarchive.com/icons/robinweatherall/seasonal/128/cloud-icon.png',
    '11d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-storm-night-icon.png',
    '13d': 'http://icons.iconarchive.com/icons/mkho/christmas/128/Snow-flake-icon.png',    
    '50d': 'http://icons.iconarchive.com/icons/custom-icon-design/weather/128/fog-icon.png',
    '01n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-night-icon.png',
    '02n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-night-icon.png',
    '03n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-many-clouds-icon.png',
    '04n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-icon.png',
    '09n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-icon.png',    
    '10n': 'http://icons.iconarchive.com/icons/icons-land/weather/128/Night-Rain-icon.png',
    '11n': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-storm-night-icon.png',
    '13n': 'http://icons.iconarchive.com/icons/mkho/christmas/128/Snow-flake-icon.png',    
    '50n': 'http://icons.iconarchive.com/icons/custom-icon-design/weather/128/fog-icon.png'
  }
  return (id in ICONS) ? ICONS[id] : ICONS['01d'];
}