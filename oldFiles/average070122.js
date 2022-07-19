
const getId = (itemId)=>{
	return document.getElementById(itemId) 
},
fp = getId('firstPrice'),
myBody = document.getElementsByTagName('body'),
sp = getId('secondPrice'),
losscount = getId('loss'),
btn = getId('btn-count'),
btnCl = document.getElementsByClassName('btn-clearVal')[1],
inpr = getId('inpAvPr'),
modalCalc = document.querySelector('.modalCalc'),
gr= getId('bitcoin-rate'), 
myPoseBitcoin= getId('bitcoin-mypose'), 
topmenu = document.getElementsByClassName('topmenu'),
submenu = document.getElementsByClassName('submenu'),
links = document.getElementsByClassName('links'),
frontModal = getId('main-modal'),
burger = getId('burger'),
burgerBlock = getId('main-nav-block'),
mcl = getId('modal-close'),
burgercl = getId('burger-close'),
abp = getId('abp'),
headerSrc = getId('header-search'),
count = document.getElementById('getCount'),
dataBlock = document.getElementById('data'),
countInt = document.getElementById('getCountSingle'),
singleInt = document.getElementById('single');
fetchCurrencies = document.querySelector('.fetch-currencies');

let chart = document.getElementById('myChart'),
ctx = chart.getContext('2d');
chart = new Chart(ctx, data);


//---------------------------------
const arr = [],
weatherBlock = document.querySelector('.maps-data_show'),
getReqWeather = document.querySelector('#maps-data_city'),
mapsDataConditions = document.querySelector('.maps-data_conditions'),

	//ищу коллекцию по классу
	srchCollClassBeginWith = function(classBeginWith){
		let matched = new Array();
		 [...document.getElementsByTagName("*")].forEach(el=> {
				if( el.matches("[class^="+classBeginWith+"]")){
				matched = [...matched,el]
			};
		})
		return matched;
	},
	

	cleanInp = function(){
		document.querySelectorAll('input').forEach(function(el,i){
			if(el.id!=='loss'
				& el.id!=='getCount'
				& el.id!=='getCountSingle'
				& el.id!=='search'){
				console.log(`B ${i} поле было записано ${el.value}`);
				el.value = null;
			}
		})
	},
	lotCountMonitor = function(){
		const lot = Math.abs((losscount.value/(fp.value-sp.value)).toFixed(1)),
		fee = (fp.value*2*lot/1000000*330).toFixed(1),
		money = (fp.value*lot/1000000).toFixed(3);	

		modalCalc.innerHTML=`Искомый лот: ${lot}
		Стоимость сделки: ${money} млн.,
		в том числе комиссия ${fee} рублей`;
		console.log(`Лот ${lot}, стоимость  ${money} млн
		 и  комиссы  ${fee} руб`);
		
		modalCalc.style.display ='block';
	},
	getAverageLot = function(){
		modalCalc.innerHTML=``;
		if(inpr.value){
			const cleanArray   = inpr.value.split(',').filter(Boolean);
			const quantity= cleanArray.length;
					sum = cleanArray.map(Number).reduce((sum, el)=> sum+el,0);
			modalCalc.innerHTML = `Средняя цена лота:${(sum/quantity).toFixed(1)}`;
			modalCalc.style.display ='block';
			console.log(`Средняя цена лота:${(sum/quantity).toFixed(1)}`);
		} else {
			alert(`Введено неверное значение! Проверьте ввод цифр`)
		}
	},
	closeCalc= function(){
		modalCalc.style.display ='none';
	}

const  subMenuItems = srchCollClassBeginWith("sub-");

for (var i=0; i< subMenuItems.length; i++){
		subMenuItems[i].setAttribute('ind', i);
		subMenuItems[i].addEventListener('click', function(e){
			let pointed = this.getAttribute('ind');
			// console.log(this.getAttribute('ind'));
			e.target.style.color= '#C5A639FF';
			links[pointed].classList.toggle('visible');
		})
}
		
modalCalc.onclick= closeCalc; 
btn.onclick= getAverageLot; 
btnCl.onclick= cleanInp;		//очистка инпутов
abp.onclick= getmodal;			// открыть модальное окно
burger.onclick= getburgerBlock;	// открыть навигацию под бургером
mcl.onclick= closemodal;		// иконка закрытия модального окна
burgercl.onclick= closeBurger;	// иконка закрытия ббургера
count.onclick = showChart;
countInt.onclick = getSingleChartForInterest;
fetchCurrencies.onclick = showBitcoinRate;


losscount.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		lotCountMonitor();
	}
});
getReqWeather.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		getWeather(getReqWeather.value);
	}
});

function showBitcoinRate(){
	getRate();
	setTimeout(()=> {
		gr.innerHTML= ``;
		myPoseBitcoin.innerHTML= ``;
	},60000)
}
async function getRateUsd(){
 const {rates}= await (await fetch("https://openexchangerates.org/api/latest.json?app_id=950e7939546942c5b62a3bd284959545")).json();
	console.log(`Смотрите также исторические данные getRateUsd`)

		const {RUB} = rates;
		//  типа привожу к наличному доллару в обменнике (купить за рубли)
		 let usd = (RUB*1.015).toFixed(1);
		 return usd;
};
	async function getRate(){
		const {bpi,time} = await (await fetch("https://api.coindesk.com/v1/bpi/currentprice.json")).json();
		// денег у меня в долларах,сколько могу купить биткойнов,процент моей позы
					let bitcoinRate =  bpi.USD.rate_float;
						
					getRateUsd().then(rate=> {
								let myCurMoneyUsd =  150000/rate,
								myPoseMayBe= myCurMoneyUsd/bitcoinRate,
								procentFromOldPose = (myCurMoneyUsd*100/(bitcoinRate*0.334)).toFixed(1);

								gr.innerHTML= `<font color="#f35">today\`s stock prise of bitcoin:</font> $${(bitcoinRate).toFixed(0)} ($${rate})`;
								myPoseBitcoin.innerHTML= `Could get (from RUB150_000)
								  <font color="#f35">${time.updated}:</font>
								<b>BTC${(myCurMoneyUsd/bitcoinRate).toFixed(8)}</b>
								(${procentFromOldPose}%)`;
								}).catch(e=> e);
						 
		console.log(`Смотрите также исторические данные getHistoryBitcoinRate(mydate)`)
};

//  исторические данные по битку

async function  getHistoryBitcoinRate(mydate){
  mydate = mydate ||"2019-01-01";
  	const startUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=`,
  		 endUrl = `&end=2021-12-07`,
  		 url = startUrl+mydate+endUrl;
			const  data = await (await fetch(url)).json();
			console.log(data)
};

// getHistoryBitcoinRate("2019-01-01")


function getmodal() {
	frontModal.style.display = 'block';
}

function getburgerBlock() {
	burgerBlock.style.display = 'block';
	// burgerBlock.style.display = 'block';
}

function closemodal() {
	frontModal.style.display = 'none';
}
function closeBurger() {
	burgerBlock.style.display = 'none';
}

// function searchSome() {
// 	alert ('Пока не работает, братан!')
// }
// блок для сохранения ссылок в Сторедже
let newlink = document.getElementById('newLinks'),
buts__putLink = document.getElementById('buts__putLink'),
buts__getLink = document.getElementById('buts__getLink'),
buts__clearBase = document.getElementById('buts__clearBase'),
buts__setStorage = document.getElementById('buts__setStorage'),
wholeListbox = document.getElementById('wholeListbox'),
wholeListbox__Text = document.getElementById('wholeListbox__Text'),
wholeListbox__close = document.getElementById('wholeListbox__close');

const arrayBaseLinks = [],
saveLinkTime = `${new Date()}`;





const putSomelinks = () => {
	wholeListbox__Text.innerHTML += `${newlink.value}<br \/>`;
	arrayBaseLinks.push(newlink.value);

};
const showBaseLinks = () => {
	wholeListbox.style.display = 'block';

};
const closeBaseBox = () => {
	wholeListbox.style.display = 'none';

};
const clearLinksInBox = () => {
	wholeListbox__Text.innerHTML = ``;

};
const saveIntoStorage = () => {

	localStorage.setItem(`myLinks (${saveLinkTime})`, JSON.stringify(arrayBaseLinks));
	const data = JSON.parse(localStorage.getItem(`myLinks (${saveLinkTime})`));

	console.log(data);

};

buts__putLink.addEventListener('click', putSomelinks);
buts__getLink.addEventListener('click', showBaseLinks);
wholeListbox__close.addEventListener('click', closeBaseBox);
buts__clearBase.addEventListener('click', clearLinksInBox);
buts__setStorage.addEventListener('click', saveIntoStorage);




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



//Миннервини расчеты  и графики
//==============================================================
//

let buffer;
let objInitial = getObjInitial();

function getObjInitial (sucsessTradesProportion=40, samples=10,ratio=2, deposit=100000,fee=720/1000000) {

	let trades= [],
	sucsess= sucsessTradesProportion*samples/100;
	for (let i = 1; i<=sucsess; i++) {
		trades= [...trades,true]
	} 
	for (let i = 1; i<=(samples-sucsess); i++) {
		trades= [...trades,false];
	} 
	return {
		sucsessTradesProportion,
		deposit,
		fee,
		samples,
		trades: trades.sort(()=> Math.random()-0.5),
		ratio
	}
};


function getCountMainTaskArray ({sucsessTradesProportion,samples, trades,ratio,deposit,fee}) {
	let 
	chartCountData=[],
	interest = 1,
	oneInterestResults,
	feeTrade = fee*deposit,
	isNextInterest =true;
	
	while (interest <= 100){

		let depo= deposit,
			depoProgressArray = [],
			earnProgressArray = [];
			//депозит всегда один и тот же
			function getTradeConstDepoArray(step){
					depoProgressArray = (step)?
					[...depoProgressArray, +deposit * (1 + interest / 100)-feeTrade]
						:
						[...depoProgressArray, +(deposit * (1 - interest / (100 * ratio))-feeTrade).toFixed(1)];

							earnProgressArray = (step)?
							 [...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)]
								:
								[...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)];
			}
			// депозитом является последняя сумма 
			function getTradeArray(step){
					depo = isNextInterest? depo: depoProgressArray[depoProgressArray.length-1];
					depoProgressArray = (step)?
					[...depoProgressArray, +depo * (1 + interest / 100)-feeTrade]
						:
						[...depoProgressArray, +(depo * (1 - interest / (100 * ratio))-feeTrade).toFixed(1)];

							earnProgressArray = (step)?
							 [...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)]
								:
								[...earnProgressArray,+(100 * ( depoProgressArray[depoProgressArray.length-1] - deposit) /deposit).toFixed(2)];
							
							isNextInterest =false;
			}
			// trades.map(trade => getTradeConstDepoArray(trade));
			trades.map(trade => getTradeArray(trade));

			chartCountData = [...chartCountData,{interest,depoProgressArray,earnProgressArray}];
			isNextInterest = true;
			interest++
	}
	return chartCountData		
};
function putDataToChart(scaleXArray,scaleYArray,label,textLine){
	const {
					sucsessTradesProportion,
					samples,
					trades,
					ratio
					} = buffer;
					// 0,170,255,
		let data = {
					type: 'bar',
					data: {
			    	//ось Х
			    	labels: scaleXArray,
			    	datasets: [{
			    		label: label,
			    		// ось Y
			    		data: scaleYArray,
			    		backgroundColor: [
			    		'rgba(0,170,255,, 0.2)'
			    		],

			    		borderColor: [
			    		'rgba(0,170,255, 100)'
			    		],
			    		borderWidth: 1
			    	}]
			    },
			    options: {
			    	maintainAspectRatio: false,
			    	plugins: {
			    		title: {
			    			display: true,
			    			text:textLine
			    		}
			    	}
			    },
			    scales: {
			    	x: {
			    		title: {
			    			display: true,
			    			color: '#f35',
			    			text: `interes`
			    		},
			    		backgroundColor: 'rgba(255, 255, 255, 0.75)'
			    	},
			    	y: {
			    		title: {
			    			display: true,
			    			text: `earnings`
			    		},
			    		beginAtZero: true,

			    	}
			    }
			};
			return data
};
function showChart (){
	let newInputData = dataBlock.value.split(',').map(c=> Number(c)),
		newobjInitial;
				
			newobjInitial = dataBlock.value
			? getObjInitial(...newInputData)
			: objInitial;
			 console.log(objInitial,newobjInitial)
				const {
					sucsessTradesProportion,
					samples,
					trades,
					ratio
					} = newobjInitial;
					console.log(trades)
						const {
							interestscale,
							earningsSamplesFinalValues,
							earningsBestValue,
							bestInterestValue
							} = prepareObjForChartData(newobjInitial);
								buffer= newobjInitial;
				chart.destroy();
				chart = new Chart(ctx, putDataToChart(interestscale,earningsSamplesFinalValues,"% earnings",
					`% earnings at ${sucsessTradesProportion }% succsess trades (ratio ${ratio}) and best result  ${earningsBestValue} at ${bestInterestValue}% at samples ${samples} `));
				chart.canvas.parentNode.style.width = "100%";
				chart.canvas.parentNode.style.height ='40rem';
};
function getSingleChartForInterest(){
	let interestRate = +singleInt.value;
	const {sucsessTradesProportion,ratio,deposit} = buffer;
	const interestAllCountsArray = getCountMainTaskArray(buffer);
	let scaleX =Array.from({ length: interestAllCountsArray[0].depoProgressArray.length }, (i,j) => j);
	console.log(interestAllCountsArray[interestRate-1].depoProgressArray);
	console.log(interestAllCountsArray[interestRate-1].earnProgressArray);
	let maxDepo =((Math.max.apply(null,interestAllCountsArray[interestRate-1].depoProgressArray) - deposit)*100/deposit).toFixed(1);
	let minDepo =((Math.min.apply(null,interestAllCountsArray[interestRate-1].depoProgressArray) - deposit)*100/deposit).toFixed(1);

		chart.destroy();
		chart = new Chart(ctx, putDataToChart(scaleX,interestAllCountsArray[interestRate-1].depoProgressArray,"depo",`Changing the deposit max/min = ${maxDepo}/${minDepo}  at ${sucsessTradesProportion }% succsess trades (ratio ${ratio}) to ${interestAllCountsArray[interestRate-1].depoProgressArray[scaleX.length-1].toFixed(1)} at samples ${scaleX.length} `));
		chart.canvas.parentNode.style.width = "100%";
		chart.canvas.parentNode.style.height ='40rem';
};
function prepareObjForChartData (chartCountData){

	let resArr = getCountMainTaskArray(chartCountData),
		interestscale = resArr.map(c=> c.interest),
		earningsSamplesFinalValues = resArr
										.map(c=> c.earnProgressArray)
											.map(i=> i[chartCountData.samples-1]),
		earningsBestValue = Math.max.apply(null, earningsSamplesFinalValues),
		bestInterestValue = resArr.filter(c=> c.earnProgressArray
									.find(c => c===earningsBestValue))[0].interest;
	return {
				interestscale,
				earningsSamplesFinalValues,
				earningsBestValue,
				bestInterestValue
			}
};
console.log('average070122.js')
console.log((new Date).toLocaleDateString() );
