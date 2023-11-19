import React, { useState } from 'react';
import "./WeatherApp.css";

//Icons are downloaded from Google//

import search_icon from "../Assests/search.png";
import clear_icon from "../Assests/clear.png";
import cloud_icon from "../Assests/cloud.png";
import drizzle_icon from "../Assests/drizzle.png";
import rain_icon from "../Assests/rain.png";
import snow_icon from "../Assests/snow.png";
import wind_icon from "../Assests/wind.png";
import humidity_icon from "../Assests/humidity.png";


const WeatherApp = () => {
  //API is taken from OpenWeatherApi.com //

  let api_key="5990b1e633bd464188b3567424ad1ec1";

  const[weatherIcon,setWeatherIcon] = useState(cloud_icon);

  const search = async () => {
    const element = document.getElementsByClassName("cityInput")
    if(element[0].value===""){
      return 0;
    }
    //URL is also taken from OpenWeatherApi.com //

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidity-percentage")
    const wind = document.getElementsByClassName("wind-rate")
    const temperature = document.getElementsByClassName("weather-temperature")
    const location = document.getElementsByClassName("weather-location")

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
    temperature[0].innerHTML = Math.floor(data.main.temp) + "°c";
    location[0].innerHTML = data.name;

  
    if(data.weather[0].icon === "01d"  || data.weather[0].icon === "01n"){
      setWeatherIcon(clear_icon);
    }
    else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n"){
      setWeatherIcon(cloud_icon);
    }
    else if(data.weather[0].icon === "03d" || data.weather[0].icon === "03n"){
      setWeatherIcon(drizzle_icon);
    }
    else if(data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
      setWeatherIcon(drizzle_icon)
    }
    else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n"){
      setWeatherIcon(rain_icon);
    }
    else if(data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
      setWeatherIcon(rain_icon);
    }
    else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
      setWeatherIcon(snow_icon);
    }
    else {
      setWeatherIcon(clear_icon);
    }
  }

  return (
    <div className='container'>
        <div className="top-bar">
            <input type="text" className="cityInput" placeholder='search'/>
            <div className="search-icon" onClick = {()=>{search()}}>
                <img src={search_icon} alt='' />
            </div>
        </div>  
        <div className="weather-image">
          <img src={weatherIcon} alt='' />
        </div> 
        <div className="weather-temperature">{"----"}</div>
        <div className="weather-location">{"----"}</div>
        <div className='data-container'>
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className='data'>
              <div className="humidity-percentage">{"----"}</div>
              <div className="text">Humidity</div>
            </div>
          </div>
          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className='data'>
              <div className="wind-rate">{"----"}</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default WeatherApp;
