const accessToken = 'pk.eyJ1IjoiamFpbWV0YW0iLCJhIjoiY2xzNDBtNDVsMGVlbDJsbzNtMHQ0MWY3ZyJ9.sG8PAbO7cdBBVwT-seUtuA';
 

mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
container: 'map', // container ID
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});

/* Still does not work properly
const script = document.getElementById('search-js');
script.onload = function() {
mapboxsearch.autofill({
accessToken
});
};  */

map.on('mousemove', (e) => {
   

    //console.log(lat, lng)
 
     document.getElementById('info').innerHTML =
     
     // `e.point` is the x, y coordinates of the `mousemove` event
     // relative to the top-left corner of the map.
     JSON.stringify(e.point) +
     '<br />' +
     // `e.lngLat` is the longitude, latitude geographical position of the event.
     JSON.stringify(e.lngLat.wrap());
     });
 
map.on('click',  (e) => {
    var point = e.lngLat;
    var lat = point.lat;
    var lng = point.lng;
    console.log(lat, lng);
    getWeather(lat, lng);
});
function getWeather(lat, lon){
    url = `https://api.open-meteo.com/v1/forecast`
    url += `?latitude=` + lat
    url += `&longitude=` + lon
    url += `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timeformat=unixtime&timezone=auto`
    if (localStorage.getItem("imperial")){
        url += `&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch`
    };
    fetch(url)
    .then((response) => response.json())
    .then(function(data){
        var temperature = data.current.temperature_2m + " " + data.current_units.temperature_2m;
        var relativeHumidity = data.current.relative_humidity_2m + " " + data.current_units.relative_humidity_2m;
        var weather = getWeatherByCode(data.current.weather_code);
        var windSpeed = data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m;
        var apparentTemperature = data.current.apparent_temperature + " " + data.current_units.apparent_temperature;
        console.log(temperature, relativeHumidity, weather, windSpeed, apparentTemperature)
    });
}
function getWeatherByCode(weatherCode){
    switch(weatherCode){
        case 0:
            return "Clear sky";
        case 1: 
            return "Mainly clear";
        case 2: 
            return "Partly cloudy";
        case 3:
            return "Overcast";
        case 45:
            return "Fog";
        case 48:
            return "Depositing rime fog";
        case 51:
            return "Light drizzle";
        case 53:
            return "Moderate drizzle";
        case 55:
            return "Dense drizzle";
        case 56:
            return "Light freezing drizzle";
        case 57:
            return "Dense freezing drizzle";
        case 61: 
            return "Slight rain";
        case 63:
            return "Moderate rain";
        case 65:
            return "Heavy rain"
        case 66:
            return "Light freezing rain"
        case 67:
            return "Heavy freezing rain"
        case 71:
            return "Slight snow fall"
        case 73:
            return "Moderate snow fall"
        case 75:
            return "Heavy snow fall"
        case 77:
            return "Snow grains"
        case 80:
            return "Slight rain showers"
        case 81: 
            return "Moderate rain showers"
        case 82:
            return "Violent rain showers"
        case 85: 
            return "Slight snow showers"
        case 86:
            return "Heavy snow showers"
        case 95:
            return "Slight or moderate thunderstorm"
        case 96:
            return "Thunderstorm with slight hail"
        case 99: 
            return "Thunderstorm with heavy hail"
        default:
            return "Error getting weather"
    }
}