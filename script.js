const Key="a6d889a6a5398ff90453eb8df4760427";
const url="https://api.openweathermap.org/data/2.5/weather?units=metric";

const query = document.querySelector(".search input");
const btn = document.querySelector(".search button");

async function checkWeather(city) {
    
    const response = await fetch(url + `&q=${city}` + `&appid=${Key}`)

    if(response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } 
    else {
        var data = await response.json();

        const icon = document.querySelector(".weather_icon");

        console.log(data);

        const countryCode = data.sys.country;

        // Updates data
        document.querySelector(".city").innerHTML = `${data.name}, ${countryCode}`;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        document.querySelector(".weather").style.display = "block";

        // Update weather icon
        if(data.weather[0].main == "Clouds") {
            icon.src = "images/clouds.png";
        } else if(data.weather[0].main == "Clear") {
            icon.src = "images/clear.png";
        } else if(data.weather[0].main == "Rain") {
            icon.src = "images/rain.png";
        } else if(data.weather[0].main == "Drizzle") {
            icon.src = "images/drizzle.png";
        } else if(data.weather[0].main == "Mist") {
            icon.src = "images/mist.png";
        } 

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    }
}

// Handle button click
btn.addEventListener("click", () => {
    checkWeather(query.value);  
});

// Handle Enter click
query.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(query.value);
    }
});
