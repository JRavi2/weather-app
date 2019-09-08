const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Define Paths for Express Config
const publicDirPath = path.join(__dirname, "..", "public");
const viewPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Telling Express to use the hbs View Engine
app.set("view engine", "hbs");

// Telling Express to use viewPath to look for Views (Otherwise the default lookup is for views directory in the root folder)
app.set("views", viewPath);

// Setting up the Partials Path
hbs.registerPartials(partialsPath);

// Setting up the Static Web Pages
app.use(express.static(publicDirPath));


// Routes
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Ravi Jain"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "Ravi Jain"
    });
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Ravi Jain"
    })
});


app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Please provide an address"
        });
    };

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send(error);
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Error!",
        error: "Help Article Not Found",
        name: "Ravi Jain"
    });
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "Error!",
        error: "404 Page Not Found",
        name: "Ravi Jain"
    })
})

app.listen(PORT, () => {
    console.log("Server Running on PORT " + PORT);
});