import React, { useEffect, useState } from 'react';
import axios from 'axios'
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,faPaperPlane,faCloud ,faTint,faCircle,faUmbrella,faWind,faCloudShowersHeavy} from '@fortawesome/free-solid-svg-icons';

const Weather = () => {
  const [data,setData] = useState({})
  const [city, setCity] = useState('');
const [hourly,setHourly] = useState([])

  const formatDate = (dateString) => {
    const formattedDate = moment.utc(dateString).format('dddd, D MMMM YYYY');
    return formattedDate;
  };
let REACT_APP_API_KEY = process.env.REACT_APP_API_KEY || "10151bf4adff49b48b493946231610"
  useEffect(() => {
    console.log("process.env.API_KEY",process.env.REACT_APP_API_KEY)
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_API_KEY}&q=chandigarh&days=7&aqi=yes&alerts=yes`);
            setData(response.data)
            setCity(response.data?.location?.name)
            setHourly(response.data.forecast.forecastday[0].hour)
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchData();
  }, data); 

  console.log("hourly",data)

  let days = ["TUE","WED","THU","FRI","SAT","SUN"]
  return (
    <div className='weather'>
      <div className="search-box">
      <FontAwesomeIcon icon={faSearch} className='search-icon'/>
        <input
          type="text"
          placeholder="Enter Location"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
              <button onClick={"getWeather"}>
        <FontAwesomeIcon icon={faPaperPlane} /> </button>

      </div>
       <p className='location-name'> {data?.location?.country} , {data?.location?.name}</p>
       <p>{formatDate(data?.location?.localtime)}</p>
       <div className='report'> 
       <p className='day'>Today</p>
        <div className='main'>
          <div className='forecast'>
         <FontAwesomeIcon icon={faCircle} style={{color:"#ffdc79", position:"absolute",fontSize:'33px',marginLeft:"30px",marginTop:"-8px",border:"2px solid #ccc",borderRadius:"20px" }}/>
         <FontAwesomeIcon icon={faCloud} style={{ color:"#fafafa", fontSize: '40px',position:"absolute", marginLeft:"-5px",marginTop:"-5px" }} />
         <FontAwesomeIcon icon={faCloud} style={{ color:"#fafafa", fontSize: '50px',position:"absolute", marginLeft:"38px" }} />
          <FontAwesomeIcon icon={faCircle} className='circle' />
            <p className='temperature'>{data?.current?.temp_c}°C <br></br>
            <span>Clouds</span>
            </p>
          </div>
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
          <div className='forecast-percentage'>
             <p>{data?.current?.wind_kph} km/hr</p>
             <p>{data?.current?.humidity}%</p>
             <p>{data?.current?.precip_mm}%</p>
          </div>
        </div>
       </div>
       <div className="hourly-container">
      {hourly.map((el, index) => {
        if (
          new Date(el.time) >  new Date().setHours(new Date().getHours() - 1)
        ) {
          return (
            <div className='hourly-column' key={index}>
              <p>{moment(el.time, "YYYY-MM-DD HH:mm").format("h A")} </p>
              <FontAwesomeIcon icon={faCloud} style={{ color: "#ffcc02" }} />
              <p>{el.temp_c}°C</p>
            </div>
          );
        }
        return null;
      })}
    </div>
    <div className='weekly-container'>
      {data?.forecast?.forecastday.map((el)=>{
        if(
          new Date(el.date) > new Date()
        ){
          return (
            <div className='weekly-column'>
            <p>{moment(el.date, 'YYYY-MM-DD').format('ddd')}</p>
            <p>{el.day.mintemp_c} | {el.day.maxtemp_c}°C</p>
            <FontAwesomeIcon icon={faCloudShowersHeavy}  />
          </div>
          )
        }
        return null
      }
      )}
    </div>
    </div>
  );
};

export default Weather;
