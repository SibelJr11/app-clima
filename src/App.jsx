import { useEffect, useState } from 'react'

function App() {

   const [location,setLocation] = useState('');
   const [data,setData] = useState({});
   const [imageSrc, setImageSrc] = useState('');
   const [actualizar,setActualizar] = useState(false);
   const APIKey = '961517d3958e5ee83b4c773980021ee3';
   
   useEffect(()=>{
      findLocation();
      setWeatherIcon();
      navigator.geolocation.getCurrentPosition(function (position) {
         const latitud = position.coords.latitude;
         const longitud = position.coords.longitude;
       
         // Hacer una solicitud a OSM Nominatim
         fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitud}&lon=${longitud}`)
           .then(response => response.json())
           .then(data => {
            // Extraer el nombre de la ciudad
            const ciudad = data.address.city || data.address.village || data.address.town;
            
            // Mostrar el nombre de la ciudad
            console.log(`Ciudad: ${ciudad}`);
          })
           .catch(error => {
             console.error('Error al obtener el nombre de la ciudad:', error);
           });
       });
       
   },[actualizar])

    const findLocation = () => {
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIKey}`)
          .then(res=>res.json())
          .then(res=>setData(res))
          console.log(data);

    }

    const setWeatherIcon = () =>{
      switch(data?.weather?.[0]?.main){
              case 'Clear':
             setImageSrc('images/clear.png');
             break;
      
           case 'Rain':
             setImageSrc('images/rain.png');
             break;
      
           case 'Snow':
             setImageSrc('images/snow.png');
             break;
      
           case 'Clouds':
             setImageSrc('images/cloud.png');
             break;
      
           case 'Haze':
             setImageSrc('images/mist.png');
             break;
      
           default:
             setImageSrc('');
      }
    }

    const handleChange = (e ) => {
        setLocation(e.target.value)
    }


    const capitalizarIniciales = (cadena) => {
      return cadena.replace(/(^|\s)\S/g, (letra) => {
        return letra.toUpperCase();
      });
    }
    
    const handleKeyPress = (e) => {
      if(e.key === 'Enter'){
         setActualizar(!actualizar)
      }

    }
    
  return (
     <div className='h-screen w-full bg-green-950 grid justify-center content-center'>
       

        <div className='w-72 h-auto  p-7 sm:w-96 bg-white rounded-lg lg:p-10 font-bold font-mono text-green-950'>
            <div className='w-full'>
                <i className='fa-solid fa-location-dot text-lg sm:text-3xl text-center items-center'></i>
                <input onKeyDown={handleKeyPress} onChange={handleChange} className='w-3/4 text-sm  sm:w-3/4 h-14 lg:text-2xl  pl-2 text-green-950 focus:outline-none focus:ring-0'  placeholder='Ingresa tu Ubicación'/>
                <button onClick={()=>setActualizar(!actualizar)} className='fa-solid fa-magnifying-glass text-lg p-2 sm:text-2xl text-center  hover:bg-green-950 p-3 rounded-full hover:text-white'></button>
            </div>
            {data.cod === '400' || data.cod === '404' ?  (
               <div className='w-full text-center'>
                   <img src='/images/404.png'  className='m-auto w-36 sm:w-48 md:w-64 lg:w-64 xl:w-64'/>
                   <p className='mt-5'>¡Ups! Ubicación no encontrada 😕</p>
               </div>):(
            <>
            <div  className='w-full flex justify-center '>
              <div className='text-center'>
                  <img src={imageSrc}  className='m-auto w-36 sm:w-40 md:w-44 lg:w-52 xl:w-52'/>
                  <p className='text-5xl sm:text-7xl md:text-7xl lg:text-7xl mt-6'>{Math.round(data?.main?.temp)}<span className='text-xl absolute'>°C</span></p>
                  <p className='text-1xl sm:text-2xl md:text-2xl lg:text-2xl'>{data?.weather?.[0]?.description ? capitalizarIniciales(data.weather[0].description) : null}</p>
               </div>
            </div>

            <div className='w-full flex justify-between mt-7 sm:mt-9'>
               <div className='w-1/2 flex items-center justify-center'>
                  <i className='fa-solid fa-water text-2xl sm:text-3xl md:text-3xl lg:text-3xl'></i>
                  <div className='text-center pl-3'>
                     <span className ='text-1xl sm:text-2xl md:text-2xl lg:text-2xl'>{data?.main?.humidity} %</span>
                     <p className='text-xs sm:text-1xl  md:text-1xl  lg:text-1xl'>Humedad</p>
                   </div>
                <div>

                </div>
               </div>
               <div className='w-1/2 flex items-center justify-center '>
                  <i className='fa-solid fa-wind text-2xl sm:text-3xl md:text-3xl lg:text-3xl'></i>
                  <div className='text-center pl-3'>
                     <span className='text-1xl sm:text-2xl md:text-2xl lg:text-2xl'>{Math.round(data?.wind?.speed)}Km/h</span>
                     <p className='text-xs sm:text-1xl  md:text-1xl  lg:text-1xl'>Velocidad</p>
                   </div>
                <div>

                </div>
               </div>

            </div>
            </> )}
              
        </div>

        <p className='font-bold text-white mt-5 font-mono text-center '>😎 by <a href="https://github.com/SibelJr11" >Sibel Jr11</a></p>
    </div>
  )
}

export default App
