//More parameters to be added
async function getWeather(latitude, longitude){
    var url = `https://api.open-meteo.com/v1/forecast?latitude=` + 
    latitude + 
    `&longitude=` + 
    longitude + 
    `&hourly=temperature_2m&forecast_days=1`
    var weather;
    fetch(url)
    .then((response) => response.json())
    .then((response) => {console.log(response)});
}