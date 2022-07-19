// погодный блок и карты
//============================================

async function getWeather(point){
	point = point || "Anadyr";
	weatherBlock.innerHTML= null;
	const  {city,list} = await (await fetch(
		`https://api.openweathermap.org/data/2.5/forecast?q=${point}&APPID=2281c7fed03ac47a4b272784c3b8ea80&units=metric`)).json();
	
 	weatherBlock.innerHTML = `<span><font color="#f35">Погода в ${city.name}</font>
 	 (долгота ${city.coord.lat}, широта ${city.coord.lon})</span>`
	
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
						console.log(weatherOnDays);

						[...document.querySelectorAll('.maps-data_conditions')].forEach((el,i)=>{
									placeToShow =el; 
										placeToShow.innerHTML = `на дату: ${weatherOnDays[i].dt_txt}<br \/>
										Температура: <font color="#f35">${weatherOnDays[i].tm}</font><br \/>
										Давление: ${(weatherOnDays[i].prs/1.333).toFixed(1)}<br \/>
										Описание: ${weatherOnDays[i].main}<br \/>
										Облачность: ${weatherOnDays[i].cl}<br \/>
										Влажность: ${weatherOnDays[i].hm}<br \/>
										Ветер: ${weatherOnDays[i].windSp}<br \/>`
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
							container: 'maps_mapBoxCom', // container ID
							style: 'mapbox://styles/mapbox/outdoors-v11', // style URL
							center: [11.255, 43.77], // starting position
							zoom: 13 // starting zoom
							});
							 
							map.addControl(new mapboxgl.FullscreenControl());

                	console.log([city.coord.lat, city.coord.lon]);
 };

// console.log(`Ввод координат [lat, lon]. Для поиска на карте вызвать функцию getMap()`)
