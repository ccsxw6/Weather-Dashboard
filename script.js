$(document).ready(function() {

      function searchCity(cityname) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=imperial&appid=9c596b570aec8a175e86b3272dcaa420";
        var queryURLforcast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=9c596b570aec8a175e86b3272dcaa420";
    
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            console.log(response);
           
           $("#currentDate").empty();
           var firstDate = moment().format('L');
           console.log(firstDate)
     
    
           var displayfirstDate = cityHeader.append(" " + firstDate);
            var cityHeader = $("<h2>").text(response.name);
            var windP = $("<p>").text("Wind Speed: " + response.wind.speed);
            var tempP = $("<p>").text("Tempraturer: " + response.main.temp);
            var humidityP = $("<p>").text("Humidity: " + response.main.humidity);
            var currentWeather = response.weather[0].main;
    
            if (currentWeather === "Rain") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");

            } else if (currentWeather=== "Clouds") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");

            } else if (currentWeather === "Drizzle") {
                  var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                  currentIcon.attr("style", "height: 60px; width: 60px");
            } else if (currentWeather === "Clear") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
             else if (currentWeather === "Snow") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
            }
            

            var newDiv = $('<div>');
            newDiv.append(displayfirstDate, currentIcon, tempP, humidityP, windP);
            $("#current-weather").html(newDiv);
            
    
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var uviQuery = "https://api.openweathermap.org/data/2.5/uvi?&appid=9c596b570aec8a175e86b3272dcaa420&lat=" + lat  + "&lon=" + lon;
    
            $.ajax({
                url: uviQuery,
                method: 'GET'
            }).then(function (response) {
                $("#uvi").empty();
                var uvlEl = $("<button class='btn bg-success'>").html("UV Index: " + response.value);
                $('#uvi').html(uvlEl);
        
            });
        });
    
    
    //--------------------------------------------5 Day frocast call ---------------------------------------//
    
        $.ajax({
            url: queryURLforcast,
            method: 'GET'
        }).then(function (response) {
            // Storing an array of results in the results variable
            var results = response.list;
            //empty 5day div--------
            $("#5day").empty();
            //create HTML for 5day forcast................
            for (var i = 0; i < results.length; i += 8) {
                // Creating a div
                var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
                
                //Storing the responses date temp and humidity.......
                var date = results[i].dt_txt;
                var setD = date.substr(0,10)
                var temp = results[i].main.temp;
                var hum = results[i].main.humidity;
       
                //creating tags with the result items information.....
                var h5date = $("<h5 class='card-title'>").text(setD);
                var pTemp = $("<p class='card-text'>").text("Temp: " + temp);;
                var pHum = $("<p class='card-text'>").text("Humidity " + hum);;
    
                var weather = results[i].weather[0].main
    
                if (weather === "Rain") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                } else if (weather === "Clouds") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                } 
                 else if (weather === "Clear") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Drizzle") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Snow") {
                    var icon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                    icon.attr("style", "height: 40px; width: 40px");
                }
    
                //append items to.......
                fiveDayDiv.append(h5date);
                fiveDayDiv.append(icon);
                fiveDayDiv.append(pTemp);
                fiveDayDiv.append(pHum);
                $("#5day").append(fiveDayDiv);
            }
    
        });
    
    
    
    }
    pageLoad();
    //----------------------------------------Event handler for user city search-----------------------//
    
    $("#select-city").on("click", function (event) {
        // Preventing the button from trying to submit the form......
        event.preventDefault();
        // Storing the city name........
        var cityInput = $("#city-input").val().trim();
    
        //save search term to local storage.....
        var textContent = $(this).siblings("input").val();
        var storearr = [];
        storearr.push(textContent);
        localStorage.setItem('cityName', JSON.stringify(storearr));
      
        searchCity(cityInput);
        pageLoad();
    });
    
    //---------------------------Call stored items on page load-------------------------------------//
    function pageLoad () {
        var lastSearch = JSON.parse(localStorage.getItem("cityName"));
        var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
        var psearch = $("<div>");
        psearch.append(searchDiv)
        $("#searchhistory").prepend(psearch);
    }
    
    //Event deligation...
    $("#searchhistory").on('click', '.btn', function(event) {
    event.preventDefault();
        console.log($(this).text());
        searchCity($(this).text());
    
    });
}
})