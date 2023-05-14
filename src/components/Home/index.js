import {Link} from 'react-router-dom'

import {format} from 'date-fns'

import { Component } from "react";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { TiWeatherPartlySunny, TiWeatherStormy} from "react-icons/ti";

import "./index.css";

const APIKey = "32223c79bafceac38aac99204a176642";

const initialFavoriteLocations = [
    {
        id: 0,
        city: 'Hyderabad',
        countryCode: 'IN'
    },
    {
        id: 1,
        city: 'Warangal',
        countryCode: 'IN'
    },
    {
        id: 2,
        city: 'Mumbai',
        countryCode: 'IN'
    },
    {
        id: 3,
        city: 'Chennai',
        countryCode: 'IN'
    },
    {
        id: 4,
        city: 'Bengaluru',
        countryCode: 'IN'
    },
]

class Home extends Component {
  state = {
    weatherData:{}, favoriteLocationsList:initialFavoriteLocations,time:""
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((data) => {
      const lat = data.coords.latitude;
      const lon = data.coords.longitude;
      const time = format(new Date(), 'p')
      console.log(time)
      this.setState({time})
      this.getCurrentWeatherData(lat, lon)
    });
  }

  getCurrentWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    const { name, main, weather, wind} = data;
    const maxTemp = Math.round(parseInt(main.temp_max))
    const minTemp = Math.round(parseInt(main.temp_min))
    const weatherData = {
      location: name,
      temp: main.temp,
      maxTemp,
      minTemp,
      description: weather[0].description,
      humidity: main.humidity,
      wind: wind.speed
    }
    this.setState({weatherData});
  };


  render() {
    const { weatherData, favoriteLocationsList, time} = this.state;
    return (
      <div className="home-background">
        <div className="weather-card">
          <h1 className='home-heading'>Weather App</h1>
          <div className="current-weather-section">
            <div className="left-side">
              <div className="location-container">
                <p className="current-location-heading">Location :</p>
                <p className="current-location-name">{weatherData.location}</p>
              </div>
              <div className="current-temp-container">
                <TiWeatherPartlySunny size={30} color="#eff218"/>
                <h1 className="current-temp">
                  {weatherData.temp}
                  <sup className="unit">
                    <sup className="degree">0</sup>C
                  </sup>
                </h1>
                <p className='weather-description'>{weatherData.description}</p>
              </div>
              <div className="temp-range">
                <p className="max-min-temp">
                  <AiOutlineArrowUp color="#d6185a"/>
                  {weatherData.maxTemp}
                </p>
                <p className="max-min-temp">
                  <AiOutlineArrowDown color="green"/>
                  {weatherData.minTemp}
                </p>
              </div>
            </div>
            <div className="right-side">
              <p className="weather-heading">Weather</p>
              <p className="time">{time}</p>
              <p className="humidity">Humidity: {weatherData.humidity}%</p>
              <p className="humidity">Wind: {weatherData.wind} km/h</p>
            </div>
          </div>
          <hr className="line"/>
          <div>
            <h1 className="favorite-locations-heading">My Favorite Locations:</h1>
          <ul className="favorite-location-list">
                {favoriteLocationsList.map(eachItem => <Link to={`/${eachItem.city}`} style={{textDecoration: 'none', color:"#36454F"}}><div className="favorite-list-item" key={eachItem.id}><TiWeatherStormy color="#058876"/><p className="favorite-city-name">{eachItem.city}</p></div></Link>)}
          </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
