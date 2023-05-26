const path = require('path');
const express = require('express');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const publicDirPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname, '../views');

const geocodeApiKey = '31b2093bf3eea214a12119c21af63dc2';
const forecastApiKey = '456613819c794fabaf2110826231905';


//=== Initialize and configure Express ===//

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', viewsDirPath);

app.use(express.static(publicDirPath));


//=== Define Express routes ===//

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather',
        message: 'Use this site to get your local weather forecast.',
        name: 'James Bailey'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'James Bailey'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'James Bailey',
        helpText: 'Don\'t eat yellow snow'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, {
        apiKey: geocodeApiKey
    }, (geocodeError, geocodeData) => {
        if (geocodeError) {
            return res.send({ error: geocodeError });
        }

        const coordString = `${geocodeData.latitude}, ${geocodeData.longitude}`;
        forecast(coordString, {
            apiKey: forecastApiKey,
            days: 5
        }, (forecastError, forecastData) => {
            if (forecastError) {
                return res.send({ error: forecastError });
            }

            res.send({
                forecast: `${forecastData.current.condition.text}. The temperature is ${forecastData.current.temp_c} degrees celcius and the humidity is ${forecastData.current.humidity}`,
                location: forecastData.location,
                address: req.query.address
            })
        });
    });
});

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         });
//     }
//     res.send({ products: [] });
// });


//=== Error handling ===//

// Help article not found.
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article not found',
        errorMessage: 'Unable to find the help article you are looking for.',
        name: 'James Bailey'
    });
});

// Page not found.
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found',
        errorMessage: 'Unable to find the page you are looking for.',
        name: 'James Bailey'
    });
});


//=== Listen for connections ===//

app.listen(port, () => {
    console.log(`Listening on port ${port}..`);
});