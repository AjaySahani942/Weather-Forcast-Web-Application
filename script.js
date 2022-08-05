let weather = {
    API_KEY: "0bfe43e1dfdf435b856143226220308",
    fetchWeather: function (city) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=0bfe43e1dfdf435b856143226220308&q=${city}&aqi=yes`)
            .then((response) => {
                if (!response.ok) {
                    alert("No weather found.");
                    throw new Error("No weather found.");
                }
                return response.json();
            })
            .then((data) => this.displayWeather(data));
    },

    dayofTheweek: function (day, month, year) {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return weekday[new Date(`${day}/${month}/${year}`).getDay()];
    },

    displayWeather: function (data) {
        const { name, country, localtime } = data.location;
        const { temp_c, wind_kph, humidity, cloud } = data.current;
        const { text, icon } = data.current.condition;
        document.querySelector(".name").innerText = name;
        document.querySelector(".country").innerText = country;
        document.querySelector(".temp").innerText = temp_c + "°";
        document.getElementById("img").src = icon;
        document.getElementById("condition").textContent = text;
        document.querySelector(".cloud").innerText = cloud + "%";
        document.querySelector(".humidity").innerText = humidity + "%";
        document.querySelector(".wind").innerText = wind_kph + "km/h";

        const year = parseInt(localtime.substr(0, 4));
        const month = parseInt(localtime.substr(5, 2));
        const day = parseInt(localtime.substr(8, 2));
        const time = localtime.substr(11);

        document.querySelector(".date").innerHTML = `${this.dayofTheweek(day, month, year)} ${day}, ${month}, ${year}`;
        document.querySelector(".time").innerHTML = time;

        //Set deafault time of day
        let timeofDay = "day";

        // Get the unique id for each weather condition
        const code = data.current.condition.code;

        //Change to night  if its night time in the city

        if (!data.current.is_day) {
            timeofDay = "night";
        }

        const app = document.querySelector(".weather-app");

        if (code == 100) {
            app.style.backgroundImage = `url( ./images/${timeofDay}/clear.jpg)`;
        }
        // Something for Cloudy weather
        else if (
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1279 ||
            code == 1282
        ) {
            app.style.backgroundImage = `url(./images/${timeofDay}/cloudy.jpg)`;
        }

        //Add rain
        else if (
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 ||
            code == 1204 ||
            code == 1207 ||
            code == 1240 ||
            code == 1243 ||
            code == 1246 ||
            code == 1249 ||
            code == 1276 ||
            code == 1252
        ) {
            app.style.backgroundImage = `url(./images/${timeofDay}/rainy.jpg)`;
        } else {
            app.style.backgroundImage = `url(./images/${timeofDay}/snowy.jpg)`;
        }
    },

    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".cities").addEventListener("click", function (e) {
    if (e.target && e.target.matches("li.city")) {
        cityInput = e.target.innerHTML;
        weather.fetchWeather(cityInput);
    }
});

weather.fetchWeather("New Delhi");
