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
     var point = e.lngLat
     var lat = point.lat
    var lng = point.lng
 console.log(lat, lng)
 var url = `https://api.open-meteo.com/v1/forecast?latitude=` + lat + `&longitude=` + lng 
 fetch(url)
 .then((response) => response.json())
 .then((response) => {console.log(response)});
 })