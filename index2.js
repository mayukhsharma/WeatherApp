const api={
    key:"",
    base: "https://api.openweathermap.org/data/2.5/"
}

const sbox=document.querySelector('.search_box');
sbox.addEventListener('keydown',setQuery);

function setQuery(evt){
    if(evt.keyCode===13){
        getResults(sbox.value);
        console.log(sbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather=> weather.json()).then(displayResults);
}

const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function displayResults(weather){
console.log(weather);
let cityEl=document.querySelector('.container .location .city');
cityEl.innerText=weather.name + ', '+ weather.sys.country;

let now=new Date();
let date=now.getDate();
let month=now.getMonth();
let day=now.getDay();
let dateEl=document.querySelector('.container .location .date');
dateEl.innerHTML=days[day]  + ',' +'  '+  date + '  ' +months[month];

let tempEl=document.querySelector('.container .location .temp');
tempEl.innerHTML=`${Math.round(weather.main.temp)}<span>&#176C</span>`;

let feelsLikeEl=document.querySelector('.container .location .weather');
feelsLikeEl.innerHTML=weather.weather[0].main;

let hiLowEl=document.querySelector('.container .location .hilow');
hiLowEl.innerHTML=`${Math.round(weather.main.temp_min)}<span>&#176C</span><span>/</span> ${Math.round(weather.main.temp_max)}<span>&#176C</span>`;

}



