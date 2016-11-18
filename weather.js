document.addEventListener('DOMContentLoaded', function() {
  get_location();
  var temperature = document.getElementById('temperature');
  temperature.onclick = change_temperature_unit;
});

function get_location ()
{
  $.getJSON(('https://freegeoip.net/json/?callback=?'), function(data) {
    //data = JSON.stringify(data, null, 2);
    //console.error(data["city"]);
    get_weather(data);
  });
}

function get_weather (data) {

  var weather_id = '28ff6e61618bc2901d472e94b023212f',
      lat = data.latitude,
      lon = data.longitude,
      KtoC = -273.15;

  //console.error(lat + "     " + lon);
  var weather_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=';
  //console.error(weather_url + weather_id);
  $.ajax( {
    url: weather_url + weather_id,
    success: function(data) {
      var weather = data,
          element = null;
      console.error(weather);
      element = document.getElementById('current_location')
      element.innerHTML = weather.name + ', ' + weather.sys.country;
      element = document.getElementById('temperature')
      element.innerHTML = Math.ceil(weather.main.temp + KtoC) + ' °C';
      element = document.getElementById('description')
      element.innerHTML = weather.weather[0].main;
    },
    cache: false
  });
}

function change_temperature_unit()
{
  alert("Unit Changed!");
}
