
export function decodeSearchTerm(query) {
  var geocodeApi = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${myApiKey}`;
  fetch(geocodeApi)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.dir(data);
      lat = data[0].lat;
      lon = data[0].lon;
      cityName = data[0].name;
      stateName = data[0].state;
      country = data[0].country;
      console.log(
        'Location decode successful!' +
          cityName +
          ', ' +
          stateName +
          ', ' +
          country
      );
      loadWeather(lat, lon);
    });
}
