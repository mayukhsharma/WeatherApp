const timeEl=document.getElementById('time');
const dateEl=document.getElementById('date');
const currentWeatherItemsEl=document.getElementById('current_weather');
const city=document.getElementById('city');
const countryEl=document.getElementById('country');
const weatherForecastEl=document.getElementById('weather_forecast');
const currentTempEl=document.getElementById('current_temp');

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const api_key='';

setInterval(  function()
{
    const today=new Date();
    const month=today.getMonth();
    const date=today.getDate();
    const day=today.getDay();
    const hour=today.getHours();
    const hoursIn12HrFormat= hour >= 13 ? hour%12 : hour;
    const min=today.getMinutes();
    const amPm=hour >=12 ? 'PM' : 'AM';

    timeEl.innerHTML= addZeros(hoursIn12HrFormat) + ':' + addZeros(min) + `<span id="am_pm">${amPm} </span>`  
    dateEl.innerHTML=days[day]  + ',' +'  '+  date + '  ' +months[month];

}
,1000);

function addZeros(n){
    return (parseInt(n,10)  <10 ? '0' : '')+n;
}

getWeatherData()
function getWeatherData(){
    navigator.geolocation.getCurrentPosition((success)=>
    {
        
        let{latitude,longitude}=success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourely,minutely&units=metric&appid=${api_key}`).then(res=>res.json()).then(data=>{
            console.log(data)
            showWeatherData(data);

        })
    })
}

function showWeatherData(data){
    let {humidity,pressure,sunrise,sunset,wind_speed}=data.current;

    city.innerHTML=data.timezone;
    countryEl.innerHTML=data.lat+' '+ 'N'+' '+ data.lon +' '+'E'

    currentWeatherItemsEl.innerHTML=
   `
   
   <div class="weather_item">
                           <div>Humidity</div>
                           <div>${humidity}</div>
                       </div>

                       <div class="weather_item">
                        <div>Pressure</div>
                       <div>${pressure}</div>
                        </div>

                    <div class="weather_item">
                       <div>Wind Speed</div>
                        <div>${wind_speed}</div>
                    </div>

                    <div class="weather_item">
                    <div>Sunrise</div>
                     <div>${window.moment(sunrise*1000).format('h:mm a')}</div>
                 </div>

                 <div class="weather_item">
                 <div>Sunset</div>
                  <div>${window.moment(sunset*1000).format('h:mm a')}</div>
              </div>   
              
              `;              



let otherDayForecast=' '

data.daily.forEach((day,idx)=>
{
    if(idx==0){

        currentTempEl.innerHTML= `
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather_icon" class="w_icon" id="w_icon">
        <div class="content" id="content">
        <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
        <div class="temp" >Night : ${day.temp.night}&#176; C</div>
        <div class="temp" >Day : ${day.temp.day}&#176; C</div> 
        </div>
        `

    }
    else{
        otherDayForecast += `
        <div class="weather_forecast_item">
               <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
               <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather_icon" class="w_icon">
             
               <div class="temp">Night - ${day.temp.night}&#176; C</div>
               <div class="temp">Day - ${day.temp.day}&#176; C</div> 
            </div>
            `
    }

})

weatherForecastEl.innerHTML=otherDayForecast;
}




