$(document).ready(function() {

      function citysearch(nameOfCity) {

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + nameOfCity + "&units=imperial&appid=9c596b570aec8a175e86b3272dcaa420";
        
        // get request to the queryURL
        $.ajax({
          url: queryURL,
          method: 'GET'
          }).then(function (response) {
            // console.log(response);
            
          // where is currentDate?
          $("#currentDate").empty();
           // format eg 07/16/2021
          var firstDate = moment().format('L');
    
          var cityHeader = $("<h2>").text(response.name);
          var displayfirstDate = cityHeader.append(" " + firstDate);
          var windP = $("<p>").text("Wind Speed: " + response.wind.speed);
          var tempP = $("<p>").text("Tempraturer: " + response.main.temp);
          var humidityP = $("<p>").text("Humidity: " + response.main.humidity);
          var currentWeather = response.weather[0].main;
            
          // adding images to correlate with the weather
          if (currentWeather === "Rain") {
              var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
                
              } else if (currentWeather=== "Clouds") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
                
              } else if (currentWeather === "Clear") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");

              } else if (currentWeather === "Drizzle") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
                
              } else if (currentWeather === "Snow") {
                var currentIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                currentIcon.attr("style", "height: 60px; width: 60px");
              }
              
              var newDiv = $('<div>');
              newDiv.append(displayfirstDate, currentIcon, tempP, humidityP, windP);
              $("#current-weather").html(newDiv);
              
              // using another url to retrieve the UV Index
              var lat = response.coord.lat;
              var lon = response.coord.lon;
              var uviQuery = "https://api.openweathermap.org/data/2.5/uvi?&appid=9c596b570aec8a175e86b3272dcaa420&lat=" + lat  + "&lon=" + lon;
              

              // GET Request for the uv index, and appending that as a button to #uvi
              $.ajax({
                url: uviQuery,
                method: 'GET'
              }).then(function (response) {
                // console.log(response)
                $("#uvi").empty();
                var uvlEl = $("<button class='btn bg-success'>").html("UV Index: " + response.value);
                $('#uvi').html(uvlEl);
              });
            });
            
        // url for 5 day forecast
        var queryForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + nameOfCity + "&units=imperial&appid=9c596b570aec8a175e86b3272dcaa420";
        // get request for the 5 day forecast
        $.ajax({
            url: queryForecast,
            method: 'GET'
        }).then(function (response) {
            console.log(response)
            // accessing list from response, which holds the forecast for every 3 hours
            var results = response.list;
            $("#fiveForecast").empty();
            // setting i to increment by 8, we want the weather from the same time every day
            for (var i = 0; i < results.length; i += 8) {
                var fiveDayDiv = $("<div class='card shadow-lg text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>");
                
                var temp = results[i].main.temp;
                var hum = results[i].main.humidity;
                var date = results[i].dt_txt;
                var dateResults = date.substr(0,10)
       
                var dateHeader = $("<h5 class='card-title'>").text(dateResults);
                var tempTag = $("<p class='card-text'>").text("Temp: " + temp);;
                var humidityTag = $("<p class='card-text'>").text("Humidity " + hum);;
    
                var weather = results[i].weather[0].main
    
                if (weather === "Rain") {
                    var newIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/09d.png");
                    newIcon.attr("style", "height: 40px; width: 40px");
                } else if (weather === "Clouds") {
                    var newIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/03d.png");
                    newIcon.attr("style", "height: 40px; width: 40px");
                } 
                 else if (weather === "Clear") {
                    var newIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/01d.png");
                    newIcon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Drizzle") {
                    var newIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/10d.png");
                    newIcon.attr("style", "height: 40px; width: 40px");
                }
                 else if (weather === "Snow") {
                    var newIcon = $('<img>').attr("src", "http://openweathermap.org/img/wn/13d.png");
                    newIcon.attr("style", "height: 40px; width: 40px");
                }
    
                fiveDayDiv.append(dateHeader);
                fiveDayDiv.append(newIcon);
                fiveDayDiv.append(tempTag);
                fiveDayDiv.append(humidityTag);
                $("#fiveForecast").append(fiveDayDiv);
            }
        });
    }
    // first function call - retrieves last stored city search
    storedItems();

    // click event on the search button
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        var cityInput = $("#userInput").val().trim();
        var textContent = $(this).siblings("input").val();
        var array = [];
        array.push(textContent);
        localStorage.setItem('cityName', JSON.stringify(array));
      
        citysearch(cityInput);
        storedItems();
    });
    
    function storedItems () {
        var lastSearch = JSON.parse(localStorage.getItem("cityName"));
        var searchDiv = $("<button class='btn border text-muted mt-1 shadow-sm bg-white rounded' style='width: 12rem;'>").text(lastSearch);
        var lastDiv = $("<div>");
        lastDiv.append(searchDiv)
        $("#historySearch").prepend(lastDiv);
    }
    
    $("#historySearch").on('click', '.btn', function(event) {
        event.preventDefault();
        citysearch($(this).text());
    });
})

