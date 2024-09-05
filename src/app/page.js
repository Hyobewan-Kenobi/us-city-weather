"use client"
import { useState } from 'react';

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},US&units=imperial&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div >
      <h1 className='font-bold text-4xl pt-4 flex flex-col justify-center items-center'>☀️ US Weather App</h1>
      <div className='flex flex-col justify-center items-center border-2 border-blue-500 max-w-[400px] mx-auto mt-4 p-6 rounded-xl'>
        <p className="pb-4 text-center">Real-time weather data for cities in the US, using the OpenWeather API</p>
        <div className='flex gap-2'>
          <input
            type="text"
            placeholder="Enter City / Zipcode"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={handleKeyPress}
            class="rounded-full border-0 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
          />
          <button className="rounded-full bg-blue-500 text-white font-bold px-4 py-2 text-l hover:bg-blue-700" onClick={fetchWeather}>Get Weather</button>
        </div>
        
        

        {error && <p className='pt-6' style={{ color: 'red' }}>{error}</p>}
        {weatherData && (
          <div className='pt-4'>
            <h2>City: {weatherData.name}</h2>
            <p>Temperature: {Math.round(weatherData.main.temp)}°F</p>
            <p>Weather: {weatherData.weather[0].description}</p>
            <p>Wind: {weatherData.wind.speed} meter/sec at {weatherData.wind.deg} degrees</p>
          </div>
        )}
      </div>
    </div>
  );
}
