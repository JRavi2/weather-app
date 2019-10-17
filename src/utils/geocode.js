const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=" + process.env.MAPBOX_ACCESS_TOKEN;

    request({ url, json: true }, (error, { body: locationData } = {}) => {
        if (error) {
            callback("Unable to connect to Location Services", undefined);
        } else if (locationData.features.length === 0) {
            callback("Unable to find the Location", undefined);
        } else {
            const data = {
                location: locationData.features[0].place_name,
                latitude: locationData.features[0].center[1],
                longitude: locationData.features[0].center[0]
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode;
