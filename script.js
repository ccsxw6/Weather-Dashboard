$(document).ready(function() {
<<<<<<< HEAD
    
    
    
    $("#search-button").on("click", function() {
        cityName =  $(".form-control").val()
        renderInput()
    })
    
    
    var renderInput = function() {
        
        var apiKey = "9c596b570aec8a175e86b3272dcaa420"
        var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey
        
=======

  $("#search-button").click(function() {
    userInput = $("#city-input").val() //global variable
    console.log(userInput)
    weatherApi()
  })
    
    var weatherApi = function() {
        var apiKey = "ed6e80c5dec753844794759a64cbcdee"
        var queryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + apiKey;

>>>>>>> 08091ea05a575cc1dae57245661423056dc47aca
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
<<<<<<< HEAD
            
            $("#city-name").html(response.city.name)
            
            //current day
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            $("#dateDiv").html(today)
            
        })
    }
    
=======
            $("#city-name").html(response.city.name)

            var today = new Date().toLocaleDateString()
            $("#city-name").append("</br>" + today)
        })
    }
>>>>>>> 08091ea05a575cc1dae57245661423056dc47aca
})

//not working mate