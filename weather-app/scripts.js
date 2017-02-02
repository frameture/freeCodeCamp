$(document).ready(function() {
 getData();
 $(".degree-switch").in("click", function() {
   // change from C to F or vice-versa;
 });
});

function getData() {
  var API_KEY = '&APPID=95991f497c22a799ba55043e7e9d6a14';
  var SERVER = 'http://api.openweathermap.org/data/2.5/weather?';

  if (!navigator.geolocation) {
    alert("No weather will be displayed unless it has no acces to your location");
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
      });
  }
}

function getIcon(id) {
  var ICONS = {
    '13d': 'http://icons.iconarchive.com/icons/mkho/christmas/128/Snow-flake-icon.png',
    '01d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png',
    '02d': 'http://openweathermap.org/img/w/02d.png',
    '09d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-icon.png',
    '03d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-many-clouds-icon.png',
    '04d': 'http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-icon.png',
    '10d': 'http://openweathermap.org/img/w/10d.png',
    '11d': 'http://openweathermap.org/img/w/11d.png',
    '50d': 'http://icons.iconarchive.com/icons/custom-icon-design/lovely-weather/128/wind-night-icon.png'
  }

  return (id in ICONS) ? ICONS[id] : ICONS['01d'];
}