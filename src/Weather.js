import React, { useState } from "react";
import axios from "axios";
import "./weather.css";

import logo from "./logos/shecodes-logo.png";

export default function Weather() {
  const [city, setCity] = useState("");
  const [showData, setShowData] = useState(false);
  const [weather, setWeather] = useState({});

  function tempCelsius(response) {
    setShowData(true);
    setWeather({
      coordinates: response.data.coordinates,
      temperature: response.data.temperature.current,
      humidity: response.data.temperature.humidity,
      date: new Date(response.data.time * 1000),
      icon: response.data.condition.icon_url,
      wind: response.data.wind.speed,
      city: response.data.city,
      description: response.data.condition.description,
    });
  }

  function putCity(event) {
    setCity(event.target.value);
  }

  function getDataAxios(event) {
    event.preventDefault();
    let apiKey = "4e4452b3b8e30dte63o4ebba04a0fef4";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(tempCelsius);
  }

  return (
    <div className="app">
      <div className="container">
        <img src={logo} alt="logo" className="icon" />

        <div className="weather">
          <form onSubmit={getDataAxios}>
            <input
              type="search"
              placeholder="Enter a city..."
              onChange={putCity}
            />
            <input type="submit" value="Search" />
          </form>

          {showData && (
            <>
              <h2>{weather.city}</h2>
              <ul>
                <li>Temperature: {Math.round(weather.temperature)}°C</li>
                <li>Description: {weather.description}</li>
                <li>Humidity: {weather.humidity}%</li>
                <li>Wind: {weather.wind} km/h</li>
                <li>
                  <img src={weather.icon} alt={weather.description} />
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
