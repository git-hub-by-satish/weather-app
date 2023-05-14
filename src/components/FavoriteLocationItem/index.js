import {Component} from 'react'
import {TiWeatherShower} from 'react-icons/ti'
import {AiOutlineArrowUp, AiOutlineArrowDown} from 'react-icons/ai'
import {FaMapMarkerAlt} from 'react-icons/fa'

import './index.css'
const APIKey = "32223c79bafceac38aac99204a176642";


class FavoriteLocationItem extends Component {
    state = {weatherData:{}}

    componentDidMount() {
        this.getCurrentWeatherData()
    }

    getCurrentWeatherData = async () => {
        const {match} = this.props
        const {params} = match
        console.log(params)
        const {city} = params
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${APIKey}&units=metric`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    
        const { name, main, weather, wind } = data;
        const maxTemp = Math.round(parseInt(main.temp_max))
        const minTemp = Math.round(parseInt(main.temp_min))
        const weatherData = {
          location: name,
          temp: main.temp,
          maxTemp,
          minTemp,
          description: weather[0].description,
          humidity: main.humidity,
          wind: wind.speed,
          pressure: main.pressure,
        }
        this.setState({weatherData, city});
      };
     
    render() {
        const {weatherData, city} = this.state
        return (
            <div className="city-view-background">
                <div className='city-weather-card'>
                  <h1 className='heading'>Favorite City Weather</h1>
                <div className='location-name-container'>
                  <FaMapMarkerAlt color='#ed1556' size={25}/>
                  <h1 className='location'>{city}</h1>
                </div>
                  <div className='weather-container'>
                    <TiWeatherShower size={50} color='#ffffff'/>
                    <h1 className='city-current-temp'>
                      {weatherData.temp}
                    <sup className="unit">
                      <sup className="degree">0</sup>C
                    </sup>
                    </h1>
                    <p className='city-description'>Cloudy</p>
                    <div className='city-range'>
                      <p className='range-temp'><AiOutlineArrowUp color='red'/>{weatherData.maxTemp}</p>
                      <p className='range-temp'><AiOutlineArrowDown color='#0bf502'/>{weatherData.minTemp}</p>
                    </div>
                  </div>
                  <div className='more-weather'>
                      <p style={{border:'none'}} className='more-weather-item'>Wind: {weatherData.wind} km/h</p>
                      <p className='more-weather-item'>Humidity: {weatherData.humidity}%</p>
                      <p className='more-weather-item'>Pressure: {weatherData.pressure} mB</p>
                  </div>
                </div>
          </div>
        )
    }
}

export default FavoriteLocationItem