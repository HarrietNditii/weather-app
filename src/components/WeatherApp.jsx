import React, { useState } from 'react';
import axios from 'axios';
import './WeatherApp.css';
import { FaSearch } from 'react-icons/fa';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name!');
            return;
        }
        setError('');

        const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await axios.get(url);
            setWeather(response.data);
        } catch (err) {
            setError('Unable to fetch weather data. Please try again.');
            setWeather(null);
        }
    };

    return (
        <div className="weather-container">
            <h1>Weather App</h1>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather}>
                    <FaSearch />
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-result">
                    <h2>{weather.name}</h2>
                    <p>Temperature: {weather.main.temp}°C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                    <p>Humidity: {weather.main.humidity}%</p>
                    <p>Wind Speed: {weather.wind.speed} m/s</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
