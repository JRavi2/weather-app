const searchForm = document.getElementById("search-form");
const inputField = document.getElementById("input");
const dynamicContent = document.getElementById("dynamic-content");
const startImg = document.getElementById("start-img");
const loadingSVG = document.getElementById("loading-svg");

const windSpeed = document.getElementById("wind-speed");
const humidity = document.getElementById("humidity");
const dewPt = document.getElementById("dew");
const uvIndex = document.getElementById("uv-index");
const visibility = document.getElementById("visibility");
const pressure = document.getElementById("pressure");
const currentSummary = document.getElementById("current-summary");
const lowTemp = document.getElementById("low-temp");
const highTemp = document.getElementById("high-temp");
const forecastImg = document.getElementById("forecast-image");
//const hourlyHeader = document.getElementById("hourly-header");

dynamicContent.style.display = "none";
startImg.hidden = false;
loadingSVG.style.visibility = "hidden";
forecastImg.hidden = true;

// Fetching the data from the "weather?address=" route
const submitForm = location => {
    dynamicContent.style.opacity = "0.25";
    startImg.hidden = true;
    loadingSVG.style.visibility = "visible";
    fetch("/weather?address=" + location)
        .then(res => {
            res.json()
                .then(data => {
                    renderData(data);
                })
                .catch(e => {
                    renderError(e);
                });
        })
        .catch(e => {
            renderError(e);
        });
};

const renderData = data => {
    windSpeed.innerText = data.currently.windSpeed + " m/s";
    humidity.innerText = Math.round(data.currently.humidity) * 100 + "%";
    dewPt.innerText = Math.round(data.currently.dewPoint) + "˚";
    uvIndex.innerText = data.currently.uvIndex;
    visibility.innerText = Math.round(data.currently.visibility) + " km";
    pressure.innerText = Math.round(data.currently.pressure) + "hPa";

    currentSummary.innerText =
        Math.round(data.currently.temperature) + "˚ " + data.currently.summary;
    lowTemp.innerText = Math.round(data.daily.data[0].temperatureLow) + "˚";
    highTemp.innerText = Math.round(data.daily.data[0].temperatureHigh) + "˚";
    switch (data.currently.summary) {
        case "Partly Cloudy":
            forecastImg.src = "/img/partly-cloudy-day.png";
            break;
        case "Light Rain":
            forecastImg.src = "/img/rain.png";
            break;
        case "Mostly Cloudy":
            forecastImg.src = "/img/cloudy.png";
            break;
        default:
            forecastImg.src = "/img/logo.png";
            break;
    }

    //hourlyHeader.innerText = data.hourly.summary;

    loadingSVG.style.visibility = "hidden";
    forecastImg.hidden = false;
    dynamicContent.style.opacity = "1";
    dynamicContent.style.display = "block";
};

const renderError = err => {};
