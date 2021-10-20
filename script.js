let time = new Date();
let currentDate = time.getDate();

let days = time.getDay();
let dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = dayName[days];

let month = time.getMonth();
let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = monthName[month];

let hour = time.getHours();
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentHour = `${hour}:${minutes}`;

let date = document.querySelector("#date");
date.innerHTML = `${currentDay}, ${currentMonth} ${currentDate} <br> ${currentHour}`;

function getForecast(coordinate) {
  let apiKey = "7a5a34d388b2cd71a89ab6f315490084";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let currentCity = document.querySelector("#location");
  let degree = document.querySelector("#degree");
  let tempMax = document.querySelector("#highTemp");
  let tempMin = document.querySelector("#lowTemp");
  let feels = document.querySelector("#feel-like");
  let humidityValue = document.querySelector("#humidity");
  let pressureValue = document.querySelector("#pressure");
  let windValue = document.querySelector("#wind");
  let weatherDescription = document.querySelector("#description");
  let icon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  currentCity.innerHTML = response.data.name;
  degree.innerHTML = Math.round(response.data.main.temp);
  tempMax.innerHTML = Math.round(response.data.main.temp_max);
  tempMin.innerHTML = Math.round(response.data.main.temp_min);
  feels.innerHTML = Math.round(response.data.main.feels_like);
  humidityValue.innerHTML = Math.round(response.data.main.humidity);
  pressureValue.innerHTML = Math.round(response.data.main.pressure);
  windValue.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function getDayWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastDay = response.data.daily;
  console.log(forecastDay);

  let forecast = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecastDay.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col ps-0 pe-2 ">              
                <div class="text-center forecast-each-day shadow-sm">
                  ${getDayWeek(forecastDay.dt)}
                  <br />
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" width="30px">
                  </img>
                  <p class="number-color fw-bolder">
                     <span id="max">${Math.round(
                       forecastDay.temp.max
                     )}</span>º <span id="min">${Math.round(
          forecastDay.temp.min
        )}</span>º</p>
                </div>          
            </div>`;
    }
  });

  forecast.innerHTML = forecastHTML;
}

function changeCity(cityInput) {
  let unit = "metric";
  let apiKey = "7a5a34d388b2cd71a89ab6f315490084";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  changeCity(cityInput);
}

let search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

function showTemperatureLocation(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let apiKey = "7a5a34d388b2cd71a89ab6f315490084";
  let apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;

  axios.get(apiWeather).then(showTemperature);
}

function showCurrentTempLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showTemperatureLocation);
}

let cityPosition = document.querySelector("#current-location");
cityPosition.addEventListener("click", showCurrentTempLocation);

changeCity("Curitiba");

function convertFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#degree");
  fahrenheitTemp.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);

  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
}

function convertCelsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#degree");
  celsiusTemp.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
let celsiusTemperature = null;

displayForecast();

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertCelsius);
