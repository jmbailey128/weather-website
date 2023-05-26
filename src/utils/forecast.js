const request = require('postman-request');

const forecast = (location, config, callback) => {
    const apiBaseURL = 'http://api.weatherapi.com/v1';
    const apiKey = config.apiKey;

    const url = `${apiBaseURL}/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=5`;

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the weatherapi.com API', null);
        } else if (body.error) {
            callback(body.error.message, null);
        } else {
            callback(null, body);
        }
    });
}

module.exports = forecast;
