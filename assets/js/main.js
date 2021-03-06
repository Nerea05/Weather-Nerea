
window.onload = ()=>{


    let counter = 0;
    // search colapsable 
    let lupaIcon= document.querySelector(".lupa");
    let btnCerrar= document.querySelector(".close");
    let collapsibleSearch= document.querySelector(".collapsible-search");
    
    //let buscador = document.querySelector(".form");
    let searchInput= document.querySelector("#search_input");
    let searchBtn= document.querySelector(".btn_search");
     //let city ="";
    // lista de localizaciones
    let locList = document.querySelector(".name-locations");  


    // GUARDAR LOCALIZACIONES
    let btnLoc= document.querySelector(".btn-loc"); //  ver localizaciones 
    let btnMisLocs= document.querySelector(".btn-mis-locs"); // añadir localización
    let closebtn= document.querySelector("#close") // cerrar colapsable 

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


    // Pouch Db
    let cities;
    /** Crear / conectar bbdd */
    let db = new PouchDB('Cities');
    
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


    searchBtn.addEventListener("click", (e) =>{        
        getWeatherData(searchInput.value)
        console.log(searchInput.value)
    });
    

    // Sección deplegable 
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

    /** Escuchar eventos de los botones */
    btnMisLocs.addEventListener("click", addCity, false);
        
        
    /** Función para añadir ciudades */
    function addCity(){       
        let citytoadd = document.querySelector("span.city");
        // Añadir registro a la BBDD
        let doc = {
                "_id": `Ciudad${counter}`,
                "name": citytoadd.textContent,
                };
        db.put(doc);
        renderCities();
    };



    /** Función para pintar la lista de ciudades */
    function renderCities(){
        //Retrieving all the documents in PouchDB
        db.allDocs({include_docs: true}, function(err, docs) {
            if (err) {
                return console.log(err);
            } else {                
                cities = docs.rows;          
                counter = docs.rows.length;
                locList.innerHTML = "";
                cities.forEach(element => {     
                    let city = `<li class="loc-saved">
                                    <div>${element.doc.name}</div>
                                    <button class="delete">borrar</button>
                                </li> 
                                `;
                    locList.innerHTML += city;
                });

                let btnsBorrar = document.querySelectorAll(".delete");
                btnsBorrar.forEach(item => {
                    item.addEventListener("click", (e) => {
                        cities.forEach(element => {
                            if(element.doc.name == e.target.previousSibling.previousSibling.outerText){
                                db.get(element.doc._id).then(function(doc){
                                        return db.remove(doc)
                                });
                                item.parentElement.remove();
                            }
                        });
                    })
                });

            }
        });
     
    };
    
        
       

    
    //DECLARACIÓN DE FUNCIONES SECUNDARIAS
    //declaración cambio de fondo
    const cambiarFondo=(obj)=>{
        let weather= obj.weather[0].main;
    
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
                header.classList.add("default");
          };
        
    };
    
    //declaración display data
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
    let getWeatherData = "";
    getWeatherData= async (city)=>{
        //Hacer un request a la API y conseguir un objeto que contenga los datos de la ciudad escogida
          //fetch
          const res= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=sp&appid=606bd56aa4673083d775fd834a6b9a46`);
          const data = await res.json();
        
        //INVOCAR LA FUNCIÓN QUE MUESTRA LOS DATOS EN PANTALLA
          displayData(data);
        // Invocar a la función que cambiaa el fondo de pantalla según el tiempo
        cambiarFondo(data);
    };
    
    

    getWeatherData("Roma");

    /** Pintar la lista de ciudades*/
    renderCities();

    

}
