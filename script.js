$(document).ready(function() {

var cityName = "festus, missouri"
var apiKey = "ed6e80c5dec753844794759a64cbcdee"
var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;

$.ajax({
    url: queryUrl,
    method: "GET"
}).then(function(response) {
    console.log(response)
})

})

//not working mate