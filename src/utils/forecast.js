const request = require("request");
require("dotenv").config();

const forecast = (latitude, longitude, callback) => {
    const url =
        "https://api.darksky.net/forecast/" +
        process.env.DARKSKY_API_KEY +
        "/" +
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
