const request = require("request");

const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoianJhdmkyNDgiLCJhIjoiY2p6ZWM2N2k2MDB4YTNocWZpY3pzaWxmdiJ9.Enc1s0Mal1UmnYm-tJqqyA&limit=1";

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
