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

function showTemperature(response) {
  let cityLocation = response.data.name;
  let currentCity = document.querySelector("#location");
  currentCity.innerHTML = cityLocation;

  let currentTemperature = Math.round(response.data.main.temp);
  let degree = document.querySelector("#degree");
  degree.innerHTML = currentTemperature;

  let highTemp = Math.round(response.data.main.temp_max);
  let tempMax = document.querySelector("#highTemp");
  tempMax.innerHTML = highTemp;

  let lowTemp = Math.round(response.data.main.temp_min);
  let tempMin = document.querySelector("#lowTemp");
  tempMin.innerHTML = lowTemp;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feels = document.querySelector("#feel-like");
  feels.innerHTML = feelsLike;

  let humidity = Math.round(response.data.main.humidity);
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = humidity;

  let pressure = Math.round(response.data.main.pressure);
  let pressureValue = document.querySelector("#pressure");
  pressureValue.innerHTML = pressure;

  let wind = Math.round(response.data.wind.speed);
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = wind;

  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = description;
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

changeCity("Curitiba", "metric");
