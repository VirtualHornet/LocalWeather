function App (){

    const URL = "https://fcc-weather-api.glitch.me/api/current?";

    const [data, setData] = React.useState({});
    const [celsius, setCelsius] = React.useState(true);
    const [weather, setWeather] = React.useState("");

    React.useEffect(()=>{
        getWeather();
        changeTemp();
        componentDidMount();
    },[]);

    function componentDidMount() {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = "lat=" + position.coords.latitude;
            const lon = "lon=" + position.coords.longitude;
            getWeather(lat, lon);
          });
      }
    function changeTemp(){
        if(celsius){
            setWeather(Math.round(data.celsius)+ "°C");
            setCelsius(false);
        }else{
            setWeather(Math.round(data.celsius * 9 / 5 + 32)+"°F");
            setCelsius(true);
            
        }
    }  

    const getWeather=(lat, lon)=>{
        const urlString = URL + lat + "&" + lon;
        fetch(urlString)
            .then(response=>{
                return response.json();
            })
            .then(data=>{
                console.log(data)
                setData({
                    city: data.name,
                    country: data.sys.country,
                    celsius: data.main.temp,
                    icon: data.weather[0].icon,
                    description: data.weather[0].description
                })
                setWeather(Math.round(data.main.temp)+ "°C") ; 
            })
          
            
    }



    return(
        <div id="container">
            <h1>Weather App</h1>
            <h3>{data.city}, {data.country}</h3>
            <h3>{weather}</h3>
            <button onClick={()=>changeTemp()}>Change temp</button>
            <h3>{data.description}</h3>
            <img src={data.icon} alt="icon" width="150" height="160"></img>
           
        </div>

    );
}


const root = ReactDOM.createRoot(
    document.getElementById('root')
  );

root.render(<App/>)