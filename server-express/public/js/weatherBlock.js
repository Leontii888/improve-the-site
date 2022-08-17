// погодный блок и карты
//============================================

const DEFAULT_CITY ="Anadyr";
const START_ZOOM =13;
const START_MAP_PLACE =[11.255, 43.77];



async function getWeather(point){
	try{
	point = point || DEFAULT_CITY;
	weatherBlock.innerHTML= null;

	const  {city,list} = await (await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${point}&APPID=2281c7fed03ac47a4b272784c3b8ea80&units=metric`)).json();
	
 	weatherBlock.innerHTML = `<span><font color="#f35">Weather in ${city.name}</font>
 	 (altitude ${city.coord.lat}, longitude ${city.coord.lon})</span>`
	
	// console.log(city,list)

	const drawWeather = (placeToShow, city,list) => {
			const days = [0,7,24,39],
					{
    				name,
    				coord:{lat: x},
    				coord:{lon:y}
			} = city;
					
					function getCondDifferentDays(day,data){
						const {
		        				dt_txt,
		        				clouds:{all:cl},
		        				main:{humidity:hm},
		        				main:{pressure:prs},
		        				main:{temp:tm},
		        				wind:{speed:windSp},
		        				weather

    					} = data[day],
    					{main} = weather[0];

    					return {
    							dt_txt,
		        				tm,
		        				prs,
		        				main,
		        				cl,
		        				hm,
		        				windSp
    					}
					}
						let weatherOnDays = days.map(day=> {
						return getCondDifferentDays(day,list)
					});
						// console.log(weatherOnDays);

						[...document.querySelectorAll('.mapsWeather__item-data')].forEach((el,i)=>{
									placeToShow =el; 
										placeToShow.innerHTML = `<p><span>On date:</span> ${weatherOnDays[i].dt_txt}</p>
										<p><span>Temperature:</span> <font color="#f35">${weatherOnDays[i].tm}</font></p>
										<p>Atmosphere pressure: ${(weatherOnDays[i].prs/1.333).toFixed(1)}</p>
										<p>Other: ${weatherOnDays[i].main}</p>
										<p>Cloudness: ${weatherOnDays[i].cl}</p>
										<p>Humidity: ${weatherOnDays[i].hm}</p>
										<p>Winds: ${weatherOnDays[i].windSp}</p>`
						})
	}
drawWeather(weatherBlock,city,list);

		mapboxgl.accessToken = 'pk.eyJ1IjoibGVvODg4IiwiYSI6ImNsNTJlZTJhYjBlbW0za3J5M3ozM3NmZ3IifQ.4IYOODVLOdWHJF8V4PAWsQ';
								//+++++++++++++++++1++++++++++++++++
								// const map = new mapboxgl.Map({
								// container: 'maps_mapBoxCom',
								// style: 'mapbox://styles/mapbox/streets-v11',
								// center: [12.550343, 55.665957],
								// zoom: 4
								// });
								 
								// // Create a default Marker and add it to the map.
								// const marker1 = new mapboxgl.Marker()
								// .setLngLat([12.554729, 55.70651])
								// .addTo(map);
								 
								// // Create a default Marker, colored black, rotated 45 degrees.
								// const marker2 = new mapboxgl.Marker({ color: 'black', rotation: 45 })
								// .setLngLat([12.65147, 55.608166])
								// .addTo(map);
								//+++++++++++++++++++++++++++
								const map = new mapboxgl.Map({
							container: 'mapsWeather__map', // container ID
							style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
							center:START_MAP_PLACE, // starting position
							zoom: START_ZOOM // starting zoom
							});
							 
							map.addControl(new mapboxgl.FullscreenControl());

                	console.log([city.coord.lat, city.coord.lon]);

	} catch (e) {
		console.warn(e.target)
	}
	
 };

// console.log(`Ввод координат [lat, lon]. Для поиска на карте вызвать функцию getMap()`)
