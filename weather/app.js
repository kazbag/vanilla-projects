const api_key = "d9b6b27164757a07549519653faf6737";
const searchbox = document.querySelector("#searchbox");
const searchButton = document.querySelector("#search");
const cardContainer = document.querySelector(".card-container");
let city = "";
const getCityValue = e => {
  city = e.target.value;
};

const getWeather = async e => {
  e.preventDefault();
  const api_call = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric&lang=pl`
  );
  const response = await api_call.json();
  getCard(response);
};

const getCard = response => {
  response.cod === 200
    ? (cardContainer.innerHTML = `
    <div class="card">
        <div class="city">
        <img class="city-image" src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>
            <h3 class="city-name">${response.name}</h3>
        </div>
        <div class="city-info">
            <h6>${response.weather[0].description}</h6>
            <h6 class="city-temperature">
                ${response.main.temp}&deg;C
            </h6>
            <h6 class="city-temperature">
                Wilgotność: ${response.main.humidity}%
            </h6>
        </div>

    </div>
    `)
    : (cardContainer.innerHTML = "Podaj prawidłowe miasto");
};

searchbox.addEventListener("input", getCityValue);
searchButton.addEventListener("click", getWeather);
