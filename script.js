$(document).ready(function() {
    
    
    
    $("#search-button").on("click", function() {
        cityName =  $(".form-control").val()
        renderInput()
    })
    
    
    var renderInput = function() {
        
        var apiKey = "9c596b570aec8a175e86b3272dcaa420"
        var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey
        
        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function(response) {
            console.log(response)
            
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
    
})

//not working mate