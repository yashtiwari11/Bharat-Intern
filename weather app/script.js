let container = document.querySelector(".container");
let search = document.querySelector(".search-box button");
let weatherBox = document.querySelector(".weather-box");
let weatherDetails = document.querySelector(".weather-details");
let error404 = document.querySelector(".not-found");
let cityHide = document.querySelector(".city-hide");

search.addEventListener("click", () => {
  let APIKey = "b3cf1bc8a1d6b39c773a72ccfc6d7e33";
  let city = document.querySelector(".search-box input").value;

  if (city == "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        cityHide.textContent = city;
        container.style.height = "400px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      let image = document.querySelector(".weather-box img");
      let temperature = document.querySelector(".weather-box .temperature");
      let description = document.querySelector(".weather-box .description");
      let humidity = document.querySelector(".weather-details .humidity span");
      let wind = document.querySelector(".weather-details .wind span");

      if (cityHide.textContent == city) {
        return;
      } else {
        cityHide.textContent = city;

        container.style.height = "555px";
        container.classList.add('active');
        weatherBox.classList.add("active");
        weatherDetails.classList.add("active");
        error404.classList.remove("active");

        setTimeout(()=> {
          container.classList.remove('active'); 
        }, 2500)
      }

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "images/cloud.png";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)} <span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });
});
