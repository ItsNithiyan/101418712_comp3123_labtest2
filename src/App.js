import React, { useState } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b11f32ac9d1c70c279e311d795768acb
&units=metric`);
      const data = await response.json();
      if (data.weather && data.weather[0]) {
        setWeather(data);
      } else {
        alert("Weather information not available for this city");
        setWeather(null);
      }
    } catch (error) {
      alert("Failed to fetch weather data");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="weather-card">
        <div className="weather-header">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="search-bar"
          />
          <button onClick={fetchWeather} className="search-btn">Search</button>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          weather && (
            <div className="weather-info">
              <div className="location">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <h3>{new Date().toLocaleDateString()}</h3>
              </div>

              <div className="main-info">
                <div className="temp">
                  <h1>{Math.round(weather.main.temp)}°C</h1>
                  <p>{weather.weather[0].description}</p>
                </div>
                <div className="icon">
                  <img
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="weather icon"
                  />
                </div>
              </div>

              <div className="details">
                <div><strong>UV Index:</strong> {weather.uvi || 'N/A'}</div>
                <div><strong>Humidity:</strong> {weather.main.humidity}%</div>
                <div><strong>Wind Speed:</strong> {weather.wind.speed} km/h</div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
