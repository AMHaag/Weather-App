//----Global Varibale----//
let searchQuery = "rockwell";
var lat = "";
var lon = "";
let weatherData;
var cityName = "";
var stateName = "";
var country = "";

//----API URLs----//
const myApiKey = "586433eee22d8b739edbf12ad12b2ae0";

//!!!!!!!!!!!delete this, its for debugging!!!!!!!!!!
// decodeSearchTerm(searchQuery);

/*Search Button event triggers the geodecode to turn city name into
  lat and lon, it passes those to the loadWeather function with the
  APi and writes teh resonse to weatherData */
$(".city-search").on("submit", function (e) {
  let searchQuery = $("#city").val();
  console.log(searchQuery);
  decodeSearchTerm(searchQuery);
});
//this decodes the city name and passes it to the weather api
function decodeSearchTerm(query) {
  var geocodeApi = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${myApiKey}`;
  console.log(geocodeApi);
  fetch(geocodeApi)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      lat = data[0].lat;
      lon = data[0].lon;
      cityName = data[0].name;
      stateName = data[0].state;
      country = data[0].country;
      console.log(
        "location decode successful " +
          cityName +
          " " +
          stateName +
          " " +
          country
      );
      loadWeather(lat, lon);
    });
}
//this takes the lat/lon from the geodecode and retrieves the weatherData
function loadWeather(lat, lon) {
  var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hour&appid=${myApiKey}`;
  console.log(oneCallApi);
  fetch(oneCallApi)
    .then(function (data) {
      return data.json();
    })
    .then((json) => (weatherData = json))
    .then((res) => {
      writeWeatherData();
    });
}

//----Objectifying the DOM----//
/* Today's Weather */

let today = {
  city: $(".city-name")[0],
  date: $(".today-date")[0],
  condition: $(".weather-condition-today")[0],
  wind: $(".wind-speed")[0],
  temp: $(".today-temp")[0],
  humidity: $(".today-humidity")[0],
  uvIndex: $(".today-UV-index")[0],
};

let forecast = {
  day: [
    {
      date: $(".day-1 > .forecast-date")[0],
      condition: $(".day-1 > .forecast-condition")[0],
      temp: $(".day-1 > .forecast-temp")[0],
      visilibility: $(".day-1 > .forecast-visibility")[0],
      wind: $(".day-1>.forecast-wind-speed")[0],
      humidity: $(".day-1 > .forecast-humidity")[0],
      uv: $(".day-1 > .forecast-UV-Index")[0],
    },
    {
      date: $(".day-2 > .forecast-date")[0],
      condition: $(".day-2 > .forecast-condition")[0],
      temp: $(".day-2 > .forecast-temp")[0],
      visilibility: $(".day-2 > .forecast-visibility")[0],
      wind: $(".day-2>.forecast-wind-speed")[0],
      humidity: $(".day-2 > .forecast-humidity")[0],
      uv: $(".day-2 > .forecast-UV-Index")[0],
    },
    {
      date: $(".day-3 > .forecast-date")[0],
      condition: $(".day-3 > .forecast-condition")[0],
      temp: $(".day-3 > .forecast-temp")[0],
      visilibility: $(".day-3 > .forecast-visibility")[0],
      wind: $(".day-3>.forecast-wind-speed")[0],
      humidity: $(".day-3 > .forecast-humidity")[0],
      uv: $(".day-3 > .forecast-UV-Index")[0],
    },
    {
      date: $(".day-4 > .forecast-date")[0],
      condition: $(".day-4 > .forecast-condition")[0],
      temp: $(".day-4 > .forecast-temp")[0],
      visilibility: $(".day-4 > .forecast-visibility")[0],
      wind: $(".day-4>.forecast-wind-speed")[0],
      humidity: $(".day-4 > .forecast-humidity")[0],
      uv: $(".day-4 > .forecast-UV-Index")[0],
    },
  ],
};

console.log(forecast);

var label = {
  hum: '<span><i class="fa-solid fa-water"></i></span>',
};

function writeWeatherData() {
  //this sets ll of the elemenst of today's weather to match the current data from OWM
  today.city.innerText = cityName + ", " + stateName + "   ";
  today.date.innerText = moment().format("dddd, MMMM Do YYYY");
  //condition
  today.wind.innerText = Math.round(weatherData.current.wind_speed) + " MPH";
  today.temp.innerHTML = Math.round(weatherData.current.temp) + "°";
  today.humidity.innerHTML =
    label.hum + " " + weatherData.current.humidity + "% ";
  today.uvIndex.innerText = Math.round(weatherData.current.uvi);

  //this loops through each of the next 4 days and matches them to OMW Data
  for (i = 0; i < forecast.day.length; i++) {
    forecast.day[i].date.innerText = moment().add(i, "d").format("dddd");
    //cond
    forecast.day[i].temp.innerText =
      Math.round(weatherData.daily[i + 1].temp.max) + "°";
    forecast.day[i].visilibility.innerText = "";
    forecast.day[i].wind.innerText =
      Math.round(weatherData.daily[i + 1].wind_speed) + " MPH";
    forecast.day[i].humidity.innerText =
      "Humidity% " + weatherData.daily[i + 1].humidity;
    forecast.day[i].uv.innerText = Math.round(weatherData.daily[i + 1].uvi);
  }
}
