import React, { useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPaperPlane,faTint,faCircle,faUmbrella,faWind} from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [data,setData] = useState({})
  const [city, setCity] = useState('chandigarh');
  const [hourly,setHourly] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  const formatDate = (dateString) => {
    const formattedDate = moment.utc(dateString).format('dddd, D MMMM YYYY');
    return formattedDate;
  };
let REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "10151bf4adff49b48b493946231610"

const APICALL = async()=>{
  return  axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`); 
}

const getWeather = async() => {
  try {
    const response = await APICALL()
    setData(response.data)
    setCity(response.data?.location?.name)
    setHourly(response.data.forecast.forecastday[0].hour)
    setTimeout(()=>{setIsLoading(false)},1000)
} catch (error) {
  console.error('Error fetching weather data:', error);
  alert("Please enter another location",)
}
};

    useEffect(() => {
      const fetchData = async () => {
        try {
            const response = await APICALL()
            setData(response.data)
            setCity(response.data?.location?.name)
            setHourly(response.data.forecast.forecastday[0].hour)
        } catch (error) {
          console.error('Error fetching weather data:', error);
         alert("Data not available on your location!",)
        }
      };
      fetchData()
      setTimeout(()=>{setIsLoading(false)},1000)
    }, []); 


  return (
    <div className='weather'>
      <div className="search-box">
      <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        <input
          type="text"
          placeholder="Enter Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              getWeather();
            }
          }}
        />
        <button onClick={getWeather}>
        <FontAwesomeIcon icon={faPaperPlane} /> </button>
      </div>
       {isLoading?(
       <div className='skeleton-location'>
         <p className='location-name'> {data?.location?.country} , {data?.location?.name}</p>
         <p>{formatDate(data?.location?.localtime)}</p>
       </div>
       ):(
       <div>
         <p className='location-name'> {data?.location?.country} , {data?.location?.name}</p>
         <p>{formatDate(data?.location?.localtime)}</p>
       </div>
       )}
       <div className='report'> 
       {isLoading?(
         <p className='day skeleton-day'>Today</p>
       ):(
         <p className='day'>Today</p>
       )}
        <div className='main'>
          {isLoading?(
            <div className='forecast skeleton-forecast'>
            {/* <img src= {"https:"+data?.current?.condition?.icon} alt="Weather Icon" /> */}
         {/* <FontAwesomeIcon icon={faCircle} className='circle' /> */}
          <p className='temperature'>{data?.current?.temp_c}°C <br></br>
          <span>{data?.current?.condition?.text}</span>
          </p>
        </div>
          ):(
            <div className='forecast'>
                <img src= {"https:"+data?.current?.condition?.icon} alt="Weather Icon" />
            <FontAwesomeIcon icon={faCircle} className='circle' />
              <p className='temperature'>{data?.current?.temp_c}°C <br></br>
              <span>{data?.current?.condition?.text}</span>
              </p>
            </div>
          )}
          {isLoading?(
            <div className='forecast-icon skeleton-forecast-icon'>
            <button>
            </button>
            <button>
            </button>
            <button>
            </button>
         </div>
          ):(
            <div className='forecast-icon'>
               <button>
               <FontAwesomeIcon icon={faWind} style={{ color: '#35c759',  }} />
               </button>
               <button>
               <FontAwesomeIcon icon={faTint} style={{ color: '#007aff',  }} />
               </button>
               <button>
               <FontAwesomeIcon icon={faUmbrella} style={{ color: '#ff3c2f',  }} />
               </button>
            </div>
          )}
          {isLoading?(
             <div className='forecast-percentage skeleton-forecast-percentage'>
             <p>{data?.current?.wind_kph} km/hr</p>
             <p>{data?.current?.humidity}%</p>
             <p>{data?.current?.precip_mm}%</p>
          </div>
          ):(
            <div className='forecast-percentage'>
            <p>{data?.current?.wind_kph} km/hr</p>
            <p>{data?.current?.humidity}%</p>
            <p>{data?.current?.precip_mm}%</p>
            </div>
          )}
         
        </div>
       </div>
       <div className="hourly-container">
        {isLoading?
        Array.from({length:5}).map((el,index)=>(
          <div className='hourly-column skeleton-placeholder' key={index}>
        </div>
        ))
        :
          hourly.map((el, index) => {
            if (
              new Date(el.time) >  new Date().setHours(new Date().getHours() - 1)
            ) {
              return (
                <div className='hourly-column' key={index}>
                  <p>{moment(el.time, "YYYY-MM-DD HH:mm").format("h A")} </p>
                  <img src= {"https:"+el.condition.icon} alt="Weather Icon" />
    
                  <p>{el.temp_c}°C</p>
                </div>
              );
            }
            return null;
          })
        }
    </div>
    <div className='weekly-container'>
      {isLoading?(
    Array.from({length:4}).map((el,index)=>{
        return (
          <div className='weekly-column skeleton-weekly-column' key={index}>
        </div>
        )
    }
    )
      ):
    data?.forecast?.forecastday.map((el,index)=>{
      if(
        new Date(el.date) > new Date()
      ){
        return (
          <div className='weekly-column' key={index}>
          <p>{moment(el.date, 'YYYY-MM-DD').format('ddd')}</p>
          <p>{el.day.mintemp_c} | {el.day.maxtemp_c}°C</p>
          <img src= {"https:"+el.day.condition.icon} alt="Weather Icon" />
        </div>
        )
      }
      return null
    }
    )
      }
    </div>
    </div>
  );
};

export default Weather;
