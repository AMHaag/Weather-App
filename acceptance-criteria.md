
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

1. form input search for city
2. return present and future weather for that city
3. add city to search history
4. when returning present weather data include
   - city name
   - the date
   - weather conditions represented with icons
   - tempeture
   - humidity
   - wind speed
   - UV index
5. color code UV index based on favorable, moderate, severe
6. when presenting future weather
   - 5 day forecast w/ date
   - weather condition icons
   - temp
   - wind speed
   - humidity
7. Clicking on a city in search history reloads their data


GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city