import humidity from '../assets/weather_humidity.png'
import weather_cloudy from '../assets/weather_cloudy.png'
import weather_drizzle from '../assets/weather_drizzle.png'
import weather_rain from '../assets/weather_rain.png'
import weather_snow from '../assets/weather_snow.png'
import weather_sunny from '../assets/weather_sunny.png'
import weather_clear_sky_night from '../assets/weather_clear_sky_night.png'
import weather_cloudy_night from '../assets/weather_cloudy_night.png'
import weather_drizzle_night from '../assets/weather_drizzle_night.png'
import weather_thunderstrom from '../assets/weather_thunderstrom.png'
import weather_thunderstrom_night from '../assets/weather_thunderstrom_night.png'

const allIcons = {
    "01d":weather_sunny,
    "01n":weather_clear_sky_night,
    "02d":weather_cloudy,
    "02n":weather_cloudy_night,
    "03d":weather_cloudy,
    "03n":weather_cloudy_night,
    "04d":weather_cloudy,
    "04n":weather_cloudy_night,
    "09d":weather_drizzle,
    "09n":weather_drizzle_night,
    "10d":weather_rain,
    "10n":weather_rain,
    "11d":weather_thunderstrom,
    "11n":weather_thunderstrom_night,
    "13d":weather_snow,
    "13n":weather_snow,
    "50d":humidity,
    "50n":humidity,

}


export function IconMapping(data) {
    const default_url = `https://openweathermap.org/img/wn/${data}@2x.png`;

  return (
    allIcons[data] || default_url
  )
}