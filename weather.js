/*global document:true $:true*/
document.addEventListener('DOMContentLoaded', function() {
  GetLocation();
  var temperature = document.getElementById('t_unit');
  temperature.onclick = ChangeTemperatureUnit;
});

function GetLocation()
{
  $.getJSON(('https://freegeoip.net/json/?callback=?'), function(data) {
    GetWeather(data);
  });
}

function GetWeather(data)
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
      SelectWeatherAnimation(weather);
    },
    cache: false
  });
}

function ChangeTemperatureUnit()
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

function SelectWeatherAnimation(data)
{
  var weatherID = data.weather[0].id.toString();

  switch (weatherID) {
    case "200":
    case "201":
    case "202":
    case "210":
    case "211":
    case "212":
    case "221":
    case "230":
    case "231":
    case "232":
      document.getElementById("weather-chk").className = "stormy";
      document.body.style.backgroundColor = "#444444";
      break;
    case "300":
    case "301":
    case "302":
    case "310":
    case "311":
    case "312":
    case "313":
    case "314":
    case "321":
    case "500":
    case "501":
    case "502":
    case "503":
    case "504":
    case "511":
    case "520":
    case "521":
    case "522":
    case "531":
      document.getElementById("weather-chk").className = "rainy";
      document.body.style.backgroundColor = "#E6E6E6";
      break;
    case "600":
    case "601":
    case "602":
    case "611":
    case "612":
    case "615":
    case "616":
    case "620":
    case "621":
    case "622":
      document.getElementById("weather-chk").className = "snowy";
      document.body.style.backgroundColor = "#85DB8C";
      break;
    case "800":
      document.getElementById("weather-chk").className = "sunny";
      document.body.style.backgroundColor = "#00BBFF";
      break;
    case "801":
    case "802":
    case "803":
    case "804":
      document.getElementById("weather-chk").className = "cloudy";
      document.body.style.backgroundColor = "#2EB5E5";
      break
    default:
      document.getElementById("weather-chk").className = "sunny";
      document.body.style.backgroundColor = "#00BBFF";
  }
}
