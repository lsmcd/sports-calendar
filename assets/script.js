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
        console.log(temperature, relativeHumidity, weather, windSpeed, apparentTemperature, maxTemperature, minTemperature)
    });
}
function getWeatherByCode(weatherCode){
    switch(weatherCode){
        case 0:
            return "Clear sky";
            break;
        case 1: 
            return "Mainly clear";
            break;
        case 2: 
            return "Partly cloudy";
            break;
        case 3:
            return "Overcast";
            break;
        case 45:
            return "Fog";
            break;
        case 48:
            return "Depositing rime fog";
            break;
        case 51:
            break;
        // ill do the rest later
    }
}