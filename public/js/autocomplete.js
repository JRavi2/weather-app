inp = document.getElementById("input");

// Setting up the geocode function to get the autocomplete suggestions
const geocode = (address, callback) => {
    const url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoianJhdmkyNDgiLCJhIjoiY2p6ZWM2N2k2MDB4YTNocWZpY3pzaWxmdiJ9.Enc1s0Mal1UmnYm-tJqqyA";

    fetch(url)
        .then(res => {
            res.json()
                .then(locationData => {
                    const data = [];
                    locationData.features.forEach(place => {
                        data.push({
                            location: place.place_name,
                            latitude: place.center[1],
                            longitude: place.center[0]
                        });
                    });
                    return callback(data);
                })
                .catch(err => {
                    return callback([]);
                });
        })
        .catch(err => {
            return callback([]);
        });
};

var currentFocus;

inp.addEventListener("input", e => {
    var a,
        b,
        val = inp.value;

    closeAllLists();
    if (!val) {
        return false;
    }
    currentFocus = -1;
    const res = geocode(inp.value, data => {
        // Creating a container for the list of suggestions
        a = document.createElement("div");
        a.setAttribute("id", inp.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        inp.parentNode.appendChild(a);

        // Looping throgh the results from the geocode api and showing them on the DOM
        data.forEach(place => {
            b = document.createElement("div");
            b.innerHTML =
                "<strong>" + place.location.substr(0, val.length) + "<strong>";
            b.innerHTML += place.location.substr(val.length);
            b.innerHTML +=
                "<input type='hidden' value='" + place.location + "'>";

            b.addEventListener("click", e => {
                inp.value = e.target.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
        });
    });
});

// managing the Highlighting of the selected Option
inp.addEventListener("keydown", e => {
    var x = document.getElementById(inp.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");

    if (e.keyCode == 40) {
        currentFocus++;
        addActive(x);
    } else if (e.keyCode == 38) {
        currentFocus--;
        addActive(x);
    } else if (e.keyCode == 13) {
        e.preventDefault();
        if (currentFocus > -1) {
            if (x) x[currentFocus].click();
        }
    }
});

// Helper Functions
const addActive = x => {
    if (!x) return false;

    removeActive(x);

    if (currentFocus > x.length - 1) currentFocus = 0;
    else if (currentFocus < 0) currentFocus = x.length - 1;
    x[currentFocus].classList.add("autocomplete-active");
};

const removeActive = x => {
    Array.from(x).forEach(elem => {
        elem.classList.remove("autocomplete-active");
    });
};

const closeAllLists = elem => {
    var x = document.getElementsByClassName("autocomplete-items");
    if (x == undefined) return false;
    Array.from(x).forEach(item => {
        if (elem != item && elem != inp) {
            item.parentNode.removeChild(item);
        }
    });
};

document.addEventListener("click", e => {
    closeAllLists(e.target);
});
