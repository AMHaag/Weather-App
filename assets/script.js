//----Global Varibale----//
let searchQuery = "rockwell";
var lat = "";
var lon = "";
let weatherData;
var cityName = "";
var stateName = "";
var country = "";
var searchHistory = document.getElementById("search-history");
function appendToSearchHistroy(textArg) {
  var option = document.createElement("option");
  option.text = textArg;
  searchHistory.add(option);
}

//----API URLs----//
const myApiKey = "586433eee22d8b739edbf12ad12b2ae0";

/*Search Button event triggers the geodecode to turn city name into
lat and lon, it passes those to the loadWeather function with the
APi and writes teh resonse to weatherData */
$(".city-search").on("submit", function (e) {
  e.preventDefault();
  let searchQuery = $("#city").val();
  appendToSearchHistroy(searchQuery);
  $("#search-history").css("display", "unset");
  decodeSearchTerm(searchQuery);
});
//selecting history search from dropdown loads it again
searchHistory.addEventListener("change", () => {
  let selectedIndex = searchHistory.selectedIndex;
  let selectQuery = searchHistory.options[selectedIndex].text;
  decodeSearchTerm(selectQuery);
});

//this decodes the city name and passes it to the weather api
function decodeSearchTerm(query) {
  var geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${myApiKey}`;
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
        "Location decode successful!" +
          cityName +
          ", " +
          stateName +
          ", " +
          country
      );
      loadWeather(lat, lon);
    });
}
//this takes the lat/lon from the geodecode and retrieves the weatherData
function loadWeather(lat, lon) {
  var oneCallApi = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hour&appid=${myApiKey}`;
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

//setting all of the DOM elements of today's weather as an object
let today = {
  city: $(".city-name")[0],
  date: $(".today-date")[0],
  condition: $(".weather-condition-today")[0],
  wind: $(".wind-speed")[0],
  temp: $(".today-temp")[0],
  humidity: $(".today-humidity")[0],
  uvIndex: $(".today-UV-index")[0],
};
//setting all of the forecast DOM elements as a n object
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
//objectifying the weather condition icon ids
let condition = {
  thunderstorm: {
    icon: "11d",
  },
  drizzle: {
    icon: "09d",
  },
  rain: {
    icon: "10d",
  },
  snow: {
    icon: "13d",
  },
  atmostphere: {
    icon: "50d",
  },
  clear: {
    icon: "01d",
  },
  clouds: {
    few: {
      icon: "02d",
    },
    scattered: {
      icon: "03d",
    },
    moderate: {
      icon: "04d",
    },
  },
};
//UV Index Scale
let uvIndexScale = {
  low: {
    alert: "UV index: low",
  },
  moderate: {
    alert: "UV index: moderate to high",
  },
  high: {
    level: "high",
    alert: "UV index: very high",
  },
};

//parsing the weather condition ids to return the proper icon
function loadConditionIcon(weatherId) {
  let id = Math.floor(weatherId / 100);
  if (weatherId === 800) {
    return (
      "https://openweathermap.org/img/wn/" + condition.clear.icon + "@2x.png"
    );
  }
  if (weatherId === 801) {
    return (
      "https://openweathermap.org/img/wn/" +
      condition.clouds.few.icon +
      "@2x.png"
    );
  }
  if (weatherId === 802) {
    return (
      "https://openweathermap.org/img/wn/" +
      condition.clouds.scattered.icon +
      "@2x.png"
    );
  }
  if (weatherId > 802) {
    return (
      "https://openweathermap.org/img/wn/" +
      condition.clouds.moderate.icon +
      "@2x.png"
    );
  }
  if (id < 3) {
    return (
      "https://openweathermap.org/img/wn/" +
      condition.thunderstorm.icon +
      "@2x.png"
    );
  }
  if (id < 5) {
    return (
      "https://openweathermap.org/img/wn/" + condition.drizzle.icon + "@2x.png"
    );
  }
  if (id < 6) {
    return (
      "https://openweathermap.org/img/wn/" + condition.rain.icon + "@2x.png"
    );
  }
  if (id < 7) {
    return (
      "https://openweathermap.org/img/wn/" + condition.snow.icon + "@2x.png"
    );
  }
  if (id < 8) {
    return (
      "https://openweathermap.org/img/wn/" +
      condition.atmostphere.icon +
      "@2x.png"
    );
  }
}
//fill the page with data from the API
function writeWeatherData() {
  //this sets ll of the elemenst of today's weather to match the current data from OWM
  today.city.innerText = cityName + ", " + stateName + "   ";
  today.date.innerText = moment().format("dddd, MMMM Do YYYY");
  today.wind.innerText =
    "Wind: " + Math.round(weatherData.current.wind_speed) + " MPH";
  today.condition.src = loadConditionIcon(weatherData.current.weather[0].id);
  today.temp.innerHTML = Math.round(weatherData.current.temp) + "°";
  today.humidity.innerHTML = "Humidity% " + weatherData.current.humidity + "% ";
  function styleTodayUv(uvIndexArg) {
    if (uvIndexArg <= 3) {
      today.uvIndex.innerText = "UV index: low";
      today.uvIndex.style.background = "#4DFF6A";
      return;
    } else if (uvIndexArg <= 7) {
      today.uvIndex.innerText = "UV index: moderate";
      today.uvIndex.style.background = "FFBB33";
      return;
    } else if (uvIndexArg > 8) {
      today.uvIndex.innerText = "UV index: high";
      today.uvIndex.style.background = "E60000";
    } else {
      today.uvIndex.innerText = "error";
      // today.uvIndex.css("background-color", "#4DFF6A");
      return;
    }
  }
  styleTodayUv(Math.floor(weatherData.current.uvi));
  // styleTodayUv(1);

  //this loops through each of the next 4 days and matches them to OMW Data
  for (let i = 0; i < forecast.day.length; i++) {
    forecast.day[i].date.innerText = moment().add(i, "d").format("dddd");
    forecast.day[i].temp.innerText =
      Math.round(weatherData.daily[i + 1].temp.max) + "°";
    forecast.day[i].condition.src = loadConditionIcon(
      weatherData.daily[i + 1].weather[0].id
    );
    forecast.day[i].wind.innerText =
      "Wind: " + Math.round(weatherData.daily[i + 1].wind_speed) + " MPH";
    forecast.day[i].humidity.innerText =
      "Humidity% " + weatherData.daily[i + 1].humidity;

    function styleForecastUv(forecastUVindex) {
      if (forecastUVindex <= 3) {
        forecast.day[i].uv.innerText = "UV index: low";
        forecast.day[i].uv.style.background = "#4DFF6A";
        return;
      } else if (forecastUVindex <= 7) {
        forecast.day[i].uv.innerText = "UV index: moderate";
        forecast.day[i].uv.style.background = "#FFBB33";
        return;
      } else if (forecastUVindex >= 8) {
        forecast.day[i].uv.innerText = "UV index: high";
        forecast.day[i].uv.style.background = "#E60000";
      } else {
        forecast.day[i].uv.innerText = "error";
        return;
      }
    }
    styleForecastUv(Math.floor(weatherData.daily[i + 1].uvi));
  }
  $(".main-grid").css("display", "grid");
}
