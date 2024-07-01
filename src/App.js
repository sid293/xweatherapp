import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
  let [city, setCity] = useState("");
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState({});

  let handleSubmit = (e) => {
    let key = "4185ba94a3064d918ca165521221103";
    let baseurl  = "https://api.weatherapi.com/v1/current.json";
    e.preventDefault();
    if (city === "") {
      alert("Please enter a city name");
    } else {
      fetch(`${baseurl}?key=${key}&q=${city}&aqi=no`)
        .then(response => response.json())
        .then(data => {
          console.log("data is ",data);
          setData({
            temp: data.current.temp_c,
            humidity: data.current.humidity,
            condition: data.current.condition.text,
            wind: data.current.wind_kph
          });
          setLoading(false);
        })
        .catch(err => alert("Failed to fetch weather data"));
    }
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input required type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
        <button type="submit">Submit</button>
      </form>
      {loading && <p>Loading data...</p>}
      {Object.keys(data).length > 0 &&
        <div className="weather-cards">
          <div className='weather-card'>
            <h3>Weather</h3>
            <p>{data.temp}°C</p>
          </div>
          <div className='weather-card'>
            <h3>Humidity</h3>
            <p>{data.humidity}%</p>
          </div>
          <div className='weather-card'>
            <h3>Condition</h3>
            <p>{data.condition}</p>
          </div>
          <div className='weather-card'>
            <h3>Wind Speed</h3>
            <p>{data.wind} kph</p>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
