document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const weatherResult = document.getElementById('weatherResult');

    if (!city) {
        weatherResult.textContent = 'Please enter a city name!';
        return;
    }

    try {
        const response = await fetch(`/weather?city=${city}`);
        const data = await response.json();

        if (data.error) {
            weatherResult.textContent = data.error;
        } else {
            weatherResult.innerHTML = `
        <p>City: ${data.name}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
      `;
        }
    } catch (error) {
        weatherResult.textContent = 'Error fetching weather data.';
    }
});
