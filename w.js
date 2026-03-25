const API_KEY = "64f60853740a1ee3ba20d0fb595c97d5";
let cityName = "Mumbai";

// selectors
const city = document.querySelector(".city");
const dateEl = document.querySelector(".date");
const icon = document.querySelector(".icon");
const temp = document.querySelector(".temp");
const condition = document.querySelector(".condition");
const min = document.querySelector(".min");
const max = document.querySelector(".max");

const feels = document.querySelector(".feels");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const pressure = document.querySelector(".pressure");
const visibility = document.querySelector(".visibility");
const clouds = document.querySelector(".clouds");
const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");

// search
document.querySelector(".search").addEventListener("submit", e => {
    e.preventDefault();
    cityName = e.target[0].value;
    getWeather();
    e.target.reset();
});

function formatTime(sec){
    return new Date(sec * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},IN&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            city.innerHTML = `${data.name}, ${data.sys.country}`;
            dateEl.innerHTML = new Date().toDateString();

            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png">`;
            temp.innerHTML = `${Math.round(data.main.temp)}°C`;
            condition.innerHTML = data.weather[0].description;

            min.innerHTML = `Min: ${Math.round(data.main.temp_min)}°C`;
            max.innerHTML = `Max: ${Math.round(data.main.temp_max)}°C`;

            feels.innerHTML = `Feels: ${Math.round(data.main.feels_like)}°C`;
            humidity.innerHTML = `Humidity: ${data.main.humidity}%`;
            wind.innerHTML = `Wind: ${data.wind.speed} m/s`;
            pressure.innerHTML = `Pressure: ${data.main.pressure} hPa`;
            visibility.innerHTML = `Visibility: ${data.visibility/1000} km`;
            clouds.innerHTML = `Clouds: ${data.clouds.all}%`;
            sunrise.innerHTML = `Sunrise: ${formatTime(data.sys.sunrise)}`;
            sunset.innerHTML = `Sunset: ${formatTime(data.sys.sunset)}`;
        })
        .catch(() => alert("City not found in India"));
}

window.onload = getWeather;
