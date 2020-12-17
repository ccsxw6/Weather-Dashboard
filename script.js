$(document).ready(function() {

  $("#search-button").click(function() {
    userInput = $("#city-input").val() //global variable
    console.log(userInput)
    weatherApi()
  })
    
    var weatherApi = function() {
        var apiKey = "ed6e80c5dec753844794759a64cbcdee"
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + apiKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            $("#city-name").html(response.city.name)

            var today = new Date().toLocaleDateString()
            $("#city-name").append("</br>" + today)
        })
    }
})

//not working mate