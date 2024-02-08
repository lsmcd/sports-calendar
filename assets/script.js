
mapboxgl.accessToken = 'pk.eyJ1IjoiamFpbWV0YW0iLCJhIjoiY2xzNDBtNDVsMGVlbDJsbzNtMHQ0MWY3ZyJ9.sG8PAbO7cdBBVwT-seUtuA';
const map = new mapboxgl.Map({
container: 'map', // container ID
center: [-74.5, 40], // starting position [lng, lat]
zoom: 9 // starting zoom
});


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

    console.log(latitude)
}


map.on('mousemove', (e) => {
    document.getElementById('info').innerHTML =
    // `e.point` is the x, y coordinates of the `mousemove` event
    // relative to the top-left corner of the map.
    JSON.stringify(e.point) +
    '<br />' +
    // `e.lngLat` is the longitude, latitude geographical position of the event.
    JSON.stringify(e.lngLat.wrap());
    });

 