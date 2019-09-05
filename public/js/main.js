const weatherForm = document.querySelector("form");
const searchElem = document.querySelector("input");
const servingMessage = document.querySelector("#serving-message");
const summary = document.querySelector("#summary");
const currTemp = document.querySelector("#curr-temp");
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const precipProb = document.querySelector("#precip-prob");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault(); // e.preventDefault() prevents the browser from refreshing the page after submitting the form

    const location = searchElem.value;

    servingMessage.textContent = "Loading...";
    summary.textContent = currTemp.textContent = highTemp.textContent = lowTemp.textContent = "";

    // Fetch can only be used for client side JavaScript, cannot be used with Node
    fetch("/weather?address=" + location).then((res) => {
        res.json().then((data) => {
            if(data.error) {
                return messageOne.textContent = data.error;
            }
            servingMessage.textContent = "Showing Weather for: " + data.location;
            summary.textContent = data.forecast.summary;
            currTemp.textContent = "It is currently " + data.forecast.currentTemp + " degree Celsius.";
            highTemp.textContent = "Highest Temperature will be " + data.forecast.highTemp + " degree Celsius";
            lowTemp.textContent = "Lowest Temperature will be " + data.forecast.lowTemp + " degree Celsius";
            precipProb.textContent = "There is " + data.forecast.precipProb * 100 + "% chance of " + data.forecast.precipType;
        });
    });
});