var exp = require('express');

var weather = require('npm-openweathermap');
// my APPID
weather.api_key = '**********';
weather.temp = 'c';

var app = exp();

// mi creo una chiamata API di tipo GET che mi restituisce le API del meteo attraverso la città
app.get('/cities/:cityName', function (request, response) {
    weather.get_weather_custom('city', request.params.cityName, 'forecast').then(function (res) {
        response.json(res);
    }, function (error) {
        console.log(error)
    })
});

// mi creo una chiamata API di tipo GET che mi restituisce le API del meteo attraverso lo zip della città ( ex 95030 )
app.get("/zips/:zipCode", function (request, response) {
    weather.get_weather_custom('zip', request.params.zipCode, 'weather').then(function (res) {
        response.json(res);
    }, function (error) {
        console.log(error)
    })
});

// setto la porta di ascolto del server nella 3001
app.listen(3001);
