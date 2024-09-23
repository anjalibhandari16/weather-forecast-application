import React, { useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png'
import wind from '../assets/weather_wind.png'
import humidity from '../assets/weather_humidity.png'
import { IconMapping } from './IconMapping';
import FiveDayForcast from './FiveDayForcast';

const APP_KEY = "048a89f3830ebc2527090fe483a23b25"

function Weather() {

    const inputRef = useRef();
    const [weatherData, setWeatherData] = useState(false);
    const [modal,setModal] = useState(false)
    const [isToggleOn, setIsToggleOn] = useState(false);

    const toggleModal = () =>{
        setModal(!modal)
    }

    
    const handleToggle = () => {
        setIsToggleOn(!isToggleOn);
    };

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
                temprature_celcius: Math.floor(data.main.temp),
                temprature_fahrenheit: Math.floor((data.main.temp * 9 / 5) + 32),
                city: data.name,
                icon: IconMapping(data.weather[0].icon),
                lon:  data.coord.lon,
                lat:  data.coord.lat,
            })

        } catch (error) {
            console.error('Error occurred:', error);
            setWeatherData(false)
        }
    }

    const fahrenheit_temp = (i) => { return (i * 9 / 5) + 32 }


    return (
        <div className='weather-box'>
            <div className='search-bar'>
                <input ref={inputRef} type="text" placeholder='Search City' />
                <img src={search_icon} alt=" " onClick={() => search(inputRef.current.value)} />
            </div>

            {weatherData ?
                <>
                    {/* toggle for next 5 days forecast */}
                    <button onClick={toggleModal} className='button-action'>Next 5 Days Forcast</button>
                    {modal?<FiveDayForcast data={weatherData} modal setModal={setModal} toggleModal={toggleModal} APP_KEY={APP_KEY} />:<></>}

                    <img src={weatherData.icon} alt=" " className='weather-icon' />


                    <p className='weather-temp'>{!isToggleOn ? weatherData.temprature_celcius + `°C ` : fahrenheit_temp(weatherData.temprature_fahrenheit) + `°F`}</p>
                    <p className='weather-city'>{weatherData.city}</p>

                     {/* toggle for temp change */}
                     <div className="slider-toggle">
                        <div className={`slider ${isToggleOn ? 'on' : 'off'}`} onClick={handleToggle}>
                            <div className="circle"></div>
                        </div>
                    </div>

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