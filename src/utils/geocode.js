const request = require('postman-request');

const geocode = (location, config, callback) => {
    const apiBaseURL = 'http://api.positionstack.com/v1/forward';
    const apiKey = config.apiKey;
    
    const url = `${apiBaseURL}?access_key=${apiKey}&query=${encodeURIComponent(location)}`;

    request({
        url,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to the positionstack.com API', null);
        } else if (body.error) {
            callback(body.error.message, null);
        } else if (body.data.length === 0) {
            callback('Unable to find location.', null);
        } else {
            callback(null, body.data[0]);
        }
    });
};

module.exports = geocode;