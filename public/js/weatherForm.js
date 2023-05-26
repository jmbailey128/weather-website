console.log('Hello from weatherForm.js');

const weatherForm = document.querySelector('#weatherForm');
const addressInput = document.querySelector('#addressInput');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formResultsId = e.target.getAttribute('data-form-results');
    const formResults = document.querySelector('#' + formResultsId);

    formResults.textContent = '';

    const address = addressInput.value;
    if (!address) {
        return formResults.textContent = `Please enter an address.`;
    }

    formResults.textContent = 'Loading...';

    fetch('/weather?address=' + address).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                formResults.textContent = `Error: ${data.error}`;
            } else {
                let htmlContent = `<strong>Forecast for:</strong> ${data.location.name}, ${data.location.country}<br>${data.forecast}`;
                formResults.innerHTML = htmlContent;
            }
        }).catch((error) => {
            formResults.textContent = `Error: ${error}`;
        })
    });
});