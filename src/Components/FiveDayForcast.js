import React, { useState, useEffect } from 'react';
import './Modal.css';
import { RiCloseLine } from "react-icons/ri";
import { IconMapping } from './IconMapping';

function FiveDayForcast({ data, toggleModal, APP_KEY }) {

  const [forecastData, setForecastData] = useState(false);


  const datafetch = async () => {

    try {

      const url = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&lat=${data.lat}&lon=${data.lon}&appid=${APP_KEY}`;
      const response = await fetch(url);
      const forecast = await response.json();

      if (!response.ok) {
        alert(forecast.message);
        return;
      }
      setForecastData(forecast.list)
    } catch (error) {
        console.error('Error occurred:', error);
        setForecastData(false)
    }
  }


  const finalList = {};
  const keys = Object.keys(forecastData);

  for (let i = 7; i < keys.length; i += 8) {
    finalList[keys[i]] = forecastData[keys[i]];
  }

  let result = Object.values(finalList).map(entry => {
    return {
      icon: entry.weather[0].icon,
      temp: entry.main.temp,
      date: entry.dt_txt.split(" ")[0],
    };
  });

  useEffect(() => { datafetch() }, [])

  return (
    <>
      <div className="darkBG" onClick={() => toggleModal()} />
      <div className="centered">
        <div className="modal">
          <div className="modalHeader">
            <h5 className="heading">Five Day Forcast</h5>
          </div>
          <button className="closeBtn" onClick={() => toggleModal()}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modalContent">

            <div className='seal-items'>
              {result.map((item) =>
                <div className='items'>
                  <img src={IconMapping(item.icon)} alt=" " className='weather-icon1' />
                  <p className='weather-temp1'>{item.temp + `°C `}</p>
                  <p className='weather-date'>({item.date})</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default FiveDayForcast