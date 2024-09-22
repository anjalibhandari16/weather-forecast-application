import React, { useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png'
import wind from '../assets/weather_wind.png'
import humidity from '../assets/weather_humidity.png'
import { IconMapping } from './IconMapping';

const APP_KEY = "048a89f3830ebc2527090fe483a23b25"

function Weather() {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);


    const search = async (city) => {

        if (city.trim() === "") {
            alert("Please Enter a City Name to Search");
            return;
        }
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APP_KEY}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }


            setWeatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temprature: Math.floor(data.main.temp),
                city: data.name,
                icon: IconMapping({ data })
            })

        } catch (error) {
            console.error('Error occurred:', error);
            setWeatherData(false)
        }
    }

    return (
        <div className='weather-box'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search City' />
                <img src={search_icon} alt=" " onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ?
                <><img src={weatherData.icon} alt=" " className='weather-icon' />
                    <p className='weather-temp'>{weatherData.temprature}°C</p>
                    <p className='weather-city'>{weatherData.city}</p>

                    <div className='weather-data'>
                        <div className='col'>
                            <img src={humidity} alt=" " />
                            <div>
                                <p>{weatherData.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className='col'>
                            <img src={wind} alt=" " />
                            <div>
                                <p>{weatherData.wind} Km/H</p>
                                <span>Wind</span>
                            </div>
                        </div>
                    </div></> : <></>}


        </div>
    )
}

export default Weather