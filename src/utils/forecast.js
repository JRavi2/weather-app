const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/6d97589789afaa23ad723301f5d4bfb4/" +
        latitude +
        "," +
        longitude +
        "?units=si";

    request({ url, json: true }, (error, { body: forecastData }) => {
        if (error) {
            callback("Unable to connect to the Forecast Services", undefined);
        } else if (forecastData.error) {
            callback("Unable to find Location", undefined);
        } else {
            callback(undefined, forecastData);
        }
    });
};

module.exports = forecast;
