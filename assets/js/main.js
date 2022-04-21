    // Sección colapsable 
    let btnMas= document.querySelector(".btn-mas");
    let collapsibleSection= document.querySelector(".collapsible-section");
    btnMas.addEventListener('click', () => {
        if(collapsibleSection.style.display === 'none' ){
            collapsibleSection.style.display = 'block';

        } else{
            collapsibleSection.style.display = 'none';
            btnMas.style.display = 'block';
        }  
    })

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

   

    //Captura de elementos del DOM
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
    //const cambiarFondo=(obj)=>{}
    //declaración display data
    const displayData =(obj)=>{
        //cambiar los grados del día
        grados.textContent= Math.floor(obj.list[0].main.temp) + '°C';
        //cambiar el nombre de la ciudad
        ciudad.textContent= obj.list[1].name
        //cambiar weather
        tiempoActual.textContent= obj.list[0].weather[0].description;
        //cambiar temperatura maxima y minima
        maxTemp.textContent= Math.floor(obj.list[0].main.temp_max)+'° |';
        minTemp.textContent= Math.floor(obj.list[0].main.temp_min);
        // cambiar humedad 
        humidity.textContent= obj.list[0].main.humidity+'%';
        //cambiar la fecha
        let fecha= new Date(obj.list[0].dt * 1000).toLocaleString("ES",{ // se añade un método con dos parametros para modificar el formato de fecha 
            timeStyle:"short",
            dateStyle:"long"})
        //let fecha= new Date(obj.list[0].dt);
        console.log(fecha);
        date.innerHTML = fecha; 
        // cambiar viento
        wind.textContent= Math.floor(obj.list[0].wind.speed)+'km/h';
        // cambiar lluvia
        rain.textContent=Math.floor(obj.list[0].clouds.all)+ '%';

    };

    //Declaración de la función getWeatherData ( función principal)
    let getWeatherData =""
    getWeatherData= async (city)=>{
        //Hacer un request a la API y conseguir un objeto que contenga los datos de la ciudad escogida
          //fetch
          const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=606bd56aa4673083d775fd834a6b9a46`);
          const data = await res.json();
          console.log(data);
        //INVOCAR LA FUNCIÓN QUE MUESTRA LOS DATOS EN PANTALLA
          displayData(data);
        // Invocar a la función que cambiaa el fondo de pantalla según el tiempo
        //cambiarFondo(data);
    };
        // Cargar una ciudad por defecto 
         window.onload = ()=>{
        getWeatherData("Madrid");}
        

// guardar localizaciones 
let almacenLocs= document.querySelector(".btn-mis-locs");
let añadirLoc= document.querySelector(".btn-loc");



    

