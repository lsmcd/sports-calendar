const accessToken = 'pk.eyJ1IjoiamFpbWV0YW0iLCJhIjoiY2xzNDBtNDVsMGVlbDJsbzNtMHQ0MWY3ZyJ9.sG8PAbO7cdBBVwT-seUtuA';


mapboxgl.accessToken = accessToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 0 // starting zoom
});

var searchBar = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    reverseGeocode: true
});


// Add the control to the map.
map.addControl(searchBar);
var city = document.getElementById('city');

searchBar.on('result', function (event) {
    var userInput = event.result.text;
    console.log('User input:', userInput);
    city.textContent = userInput;
});



$(document).ready(function () {
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

    map.on('click', (e) => {
        var point = e.lngLat;
        var lat = point.lat;
        var lng = point.lng;
        console.log(lat, lng);
        getWeather(lat, lng);
    });
    // Displays the settings menu
    $("#settings").on("click", function () {
        if ($("#settings-menu").css("display") === "none") {
            $("#settings-menu").css("display", "flex")
        } else {
            $("#settings-menu").css("display", "none")
        }
    });
    // These run on website init to make sure the displayed user settings are up to date
    if (localStorage.getItem("imperial")) {
        $("#imperial > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
    }
    if (localStorage.getItem("fahrenheit")) {
        $("#fahrenheit > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
    }
    if (localStorage.getItem("dateorder")) {
        $("#dateorder > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
    }
    // Click listeners that change local storage values and display them
    $("#imperial").on("click", function (event) {
        if (localStorage.getItem("imperial")) {
            localStorage.setItem("imperial", "")
            $("#imperial > span > i").toggleClass("mdi-checkbox-marked mdi-checkbox-blank");
        } else {
            localStorage.setItem("imperial", "true")
            $("#imperial > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
        }
    });
    $("#fahrenheit").on("click", function (event) {
        if (localStorage.getItem("fahrenheit")) {
            localStorage.setItem("fahrenheit", "")
            $("#fahrenheit > span > i").toggleClass("mdi-checkbox-marked mdi-checkbox-blank");
        } else {
            localStorage.setItem("fahrenheit", "true")
            $("#fahrenheit > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
        }
    });
    $("#dateorder").on("click", function (event) {
        if (localStorage.getItem("dateorder")) {
            localStorage.setItem("dateorder", "")
            $("#dateorder > span > i").toggleClass("mdi-checkbox-marked mdi-checkbox-blank");
        } else {
            localStorage.setItem("dateorder", "true")
            $("#dateorder > span > i").toggleClass("mdi-checkbox-blank mdi-checkbox-marked");
        }
    });
    function getWeather(lat, lon) {
        url = `https://api.open-meteo.com/v1/forecast`;
        url += `?latitude=` + lat;
        url += `&longitude=` + lon;
        url += `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&timeformat=unixtime&timezone=auto`;
        // If statements that get user settings and apply them
        if (localStorage.getItem("fahrenheit")) {
            url += `&temperature_unit=fahrenheit`;
        };
        if (localStorage.getItem("imperial")) {
            url += `&wind_speed_unit=mph`;
            url += `&precipitation_unit=inch`;
        };
        fetch(url)
            .then((response) => response.json())
            .then(function (data) {
                var temperature = data.current.temperature_2m + " " + data.current_units.temperature_2m;
                var relativeHumidity = data.current.relative_humidity_2m + " " + data.current_units.relative_humidity_2m;
                var apparentTemperature = data.current.apparent_temperature + " " + data.current_units.apparent_temperature;
                var precipitation = data.current.precipitation + " " + data.current_units.precipitation;
                var weather = getWeatherByCode(data.current.weather_code);
                var windSpeed = data.current.wind_speed_10m + " " + data.current_units.wind_speed_10m;
                var latitude = data.latitude;
                var longitude = data.longitude;
                // Date code that gets the current time and then converts it to the proper timezone
                var date = dayjs.unix(data.current.time).tz(data.timezone);
                // Code that converts the format depending on user setting
                if (localStorage.getItem("dateorder")) {
                    date = date.format("ha MM/D/YY");
                } else {
                    date = date.format("ha D/MM/YY");
                }
                // Displays text on the webpage
                $("#temperature").text("Temperature: " + temperature);
                $("#humidity").text("Relative Humidity: " + relativeHumidity);
                $("#feels-like").text("Feels like: " + apparentTemperature);
                $("#wind").text("Wind: " + windSpeed);
                $("#weather").text("Weather: " + weather);
                $("#precipitation").text("Precipitation: " + precipitation);
                $("#coordinates").text("Date: " + date + " Lat: " + latitude + " Lon: " + longitude);
            });
    }
    // Goes through WMO Codes and returns their meaning as a string
    function getWeatherByCode(weatherCode) {
        switch (weatherCode) {
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
});