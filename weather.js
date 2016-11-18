document.addEventListener('DOMContentLoaded', function() {
  get_location();
  var temperature = document.getElementById('t_unit');
  temperature.onclick = change_temperature_unit;
});

function get_location ()
{
  $.getJSON(('https://freegeoip.net/json/?callback=?'), function(data) {
    get_weather(data);
  });
}

function get_weather (data)
{
  var weather_id = '28ff6e61618bc2901d472e94b023212f',
      lat = data.latitude,
      lon = data.longitude,
      KtoC = -273.15;

  var weather_url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=';

  $.ajax( {
    url: weather_url + weather_id,
    success: function(data) {
      var weather = data,
          element = null;
      console.error(weather);
      element = document.getElementById('t_unit');
      element.innerHTML = ' °C';
      element = document.getElementById('current_location');
      element.innerHTML = weather.name + ', ' + weather.sys.country;
      element = document.getElementById('temperature');
      element.innerHTML = Math.ceil(weather.main.temp + KtoC);
      element = document.getElementById('description');
      element.innerHTML = weather.weather[0].main;
    },
    cache: false
  });
}

function change_temperature_unit()
{

  var temperature = document.getElementById('temperature').innerText,
      t_unit = document.getElementById('t_unit').innerText,
      e = null;

  temperature = parseInt(temperature);

  if (t_unit[1] === 'C') {
    temperature = Math.round(temperature * (9/5) + 32);
    e = document.getElementById('temperature');
    e.innerHTML = temperature;
    e = document.getElementById('t_unit');
    e.innerHTML = ' °F';
  } else {
    temperature = Math.round((temperature - 32)*(5/9));
    e = document.getElementById('temperature');
    e.innerHTML = temperature;
    e = document.getElementById('t_unit');
    e.innerHTML = ' °C';
  }
}
