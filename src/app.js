function updateWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.city;

  let currentConditionElement = document.querySelector("#current-condition");
  currentConditionElement.innerHTML = response.data.condition.description;

  let currentHumidityElement = document.querySelector("#current-humidity");
  currentHumidityElement.innerHTML = response.data.temperature.humidity;

  let currentWindElement = document.querySelector("#current-wind");
  currentWindElement.innerHTML = response.data.wind.speed;

  let currentDateElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);
  currentDateElement.innerHTML = formatDate(date);

  let currentWeatherEmoji = document.querySelector("#current-weather-emoji");

  currentWeatherEmoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-weather-emoji" id="current-weather-emoji" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let dayOfMonth = date.getDate();
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let year = date.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[date.getMonth()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${dayOfMonth} ${month} ${year} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "5do93bc0b836c98t67cd86dfeaa4ff3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "5do93bc0b836c98t67cd86dfeaa4ff3f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
  <div class="weather-forecast-day">
    <div class="weather-forecast-date">Thu</div>
    <img
      src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
      width="45"
    />
    <div class="weather-forecast-temperatures">
      <span class="max-temperature">18</span>
      <span class="min-temperature">12</span>
    </div>
  </div>
  `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

searchCity("Bordeaux");
