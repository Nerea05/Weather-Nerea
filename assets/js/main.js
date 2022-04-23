// search colapsable 
    let lupaIcon= document.querySelector(".lupa");
    let btnCerrar= document.querySelector(".close");
    let collapsibleSearch= document.querySelector(".collapsible-search");
    lupaIcon.addEventListener('click', () => {
        if(collapsibleSearch.style.display === 'none' ){
            collapsibleSearch.style.display = 'block';

        } else{
            collapsibleSearch.style.display = 'none';
            lupaIcon.style.display = 'block';
        }  
    });
    btnCerrar.addEventListener('click', () => {
        if(collapsibleSearch.style.display === 'none' ){
            collapsibleSearch.style.display = 'block';

        } else{
            collapsibleSearch.style.display = 'none';
            lupaIcon.style.display = 'block';
        }  
    });

    let buscador=  document.querySelector(".form");
    let searchInput= document.querySelector("#search_input");
    let searchBtn= document.querySelector(".btn_search");

    
    searchBtn.addEventListener("click", (e) =>{
        
        getWeatherData(searchInput.value)
        console.log(searchInput.value)


    });
// saved locs colapsables
let btnLoc= document.querySelector(".btn-loc"); //  ver localizaciones 
let btnMisLocs= document.querySelector(".btn-mis-locs"); // añadir localización
let locList= document.querySelector(".loc-list"); // lista de localizaciones
let closebtn= document.querySelector("#close") // cerrar colapsable 

btnLoc.addEventListener('click', () => {
    if(locList.style.display === 'none' ){
        locList.style.display = 'block';

    } else{
        locList.style.display = 'none';
        btnLoc.style.display = 'block';
    }  
});
closebtn.addEventListener('click', () => {
    if(locList.style.display === 'none' ){
        locList.style.display = 'block';

    } else{
        locList.style.display = 'none';
        btnLoc.style.display = 'block';
    }  
});





   

    //Captura de elementos del DOM
    let header= document.querySelector(".imagen-cabecera-box")
    let cabecera= document.querySelector(".imagen-cabecera-box");
    let grados=  document.querySelector(".grados");
    let ciudad=  document.querySelector(".city");  
    let date=  document.querySelector(".date");
    let tiempoActual=  document.querySelector(".loc-weather"); 
    let maxTemp=  document.querySelector("#max-temp"); 
    let minTemp=  document.querySelector("#min-temp");
    let humidity=  document.querySelector("#humidity-number");
    let rain=  document.querySelector("#rain-number"); 
    let wind=  document.querySelector("#wind-number");
    //DECLARACIÓN DE FUNCIONES SECUNDARIAS
    //declaración cambio de fondo
    //declaración display data
    const cambiarFondo=(obj)=>{
        let weather= obj.weather[0].main;
        console.log(weather);
        switch (weather) {
            case 'weather== clear':
                header.classList.add("night-sunny")
              break;
            case 'weather= clouds':
                header.classList.remove("night-sunny");
                header.classList.add("sun-cloudy");
              break;
            case 'weather== Rain':
                header.classList.remove("sun-cloudy");
                header.classList.add("night-cloudy-rain");
              break;
            case 'weather= snow':
                header.classList.remove("night-cloudy-rain");
                header.classList.add("night-snow");
              break;
            case 'weather== Thunderstorm':
                header.classList.remove("night-snow");
                header.classList.add("night-thunder");
              break;
            default:
                header.classList.remove("night-thunder");
                header.classList.add("night-sun-cloudy");
          };
        
    }
    const displayData =(obj)=>{
        //cambiar los grados del día
        grados.textContent= Math.floor(obj.main.temp) + '°C';
        //cambiar el nombre de la ciudad
        ciudad.textContent= obj.name
        //cambiar weather
        tiempoActual.textContent= obj.weather[0].description;
        //cambiar temperatura maxima y minima
        maxTemp.textContent= Math.floor(obj.main.temp_max)+'° |';
        minTemp.textContent= Math.floor(obj.main.temp_min)+'°';
        // cambiar humedad 
        humidity.textContent= obj.main.humidity+'%';
        //cambiar la fecha
        let fecha= new Date(obj.dt * 1000).toLocaleString("ES",{ // se añade un método con dos parametros para modificar el formato de fecha 
            timeStyle:"short",
            dateStyle:"long"})
        //let fecha= new Date(obj.list[0].dt);        
        date.innerHTML = fecha; 
        // cambiar viento
        wind.textContent= Math.floor(obj.wind.speed)+'km/h';
        // cambiar lluvia
        rain.textContent=Math.floor(obj.clouds.all)+ '%';
        
    };

    //Declaración de la función getWeatherData ( función principal)
    let getWeatherData =""
    getWeatherData= async (city)=>{
        //Hacer un request a la API y conseguir un objeto que contenga los datos de la ciudad escogida
          //fetch
          const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=606bd56aa4673083d775fd834a6b9a46`);
          const data = await res.json();
          console.log(data);
        //INVOCAR LA FUNCIÓN QUE MUESTRA LOS DATOS EN PANTALLA
          displayData(data);
        // Invocar a la función que cambiaa el fondo de pantalla según el tiempo
        cambiarFondo(data);
    };
        // Cargar una ciudad por defecto 
         window.onload = ()=>{
        getWeatherData("Madrid");}
        

// guardar localizaciones 
let almacenLocs= document.querySelector(".btn-mis-locs");
let añadirLoc= document.querySelector(".btn-loc");



    

//mapbox 
let map = document.querySelector("#map");
mapboxgl.accessToken = 'pk.eyJ1IjoibmVyZWEwNSIsImEiOiJjbDEzeTd4YnQwMWlhM2JwNzEzNW82dGJwIn0.sFplNCWbKL7xPZuDFDKeLQ';
var tileset = 'mapbox.streets';
map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v8',
    center: [-95.7, 37.1], // starting position
    zoom: 3}); // starting zoom

 map.on('load', function () {
        map.addSource('aerisweather-radar', {
            "type": 'raster',
            "tiles": [
                'https://maps1.aerisapi.com/[clientId]_[clientKey]/radar/{z}/{x}/{y}/current.png',
                'https://maps2.aerisapi.com/[clientId]_[clientKey]/radar/{z}/{x}/{y}/current.png',
                'https://maps3.aerisapi.com/[clientId]_[clientKey]/radar/{z}/{x}/{y}/current.png',
                'https://maps4.aerisapi.com/[clientId]_[clientKey]/radar/{z}/{x}/{y}/current.png'
            ],
            "tileSize": 256,
            "attribution": "<a href='https://www.aerisweather.com/'>AerisWeather</a>"
        });
        map.addLayer({
            "id": "radar-tiles",
            "type": "raster",
            "source": "aerisweather-radar",
            "minzoom": 0,
            "maxzoom":22
        });
    });